import { test, expect, type Page } from '@playwright/test';

const ENDPOINT = 'https://formspree.io/f/testovaci';

/** Nastaví formuláři testovací endpoint (skutečné Formspree ID zatím není). */
async function useEndpoint(page: Page, selector: string) {
  await page.locator(`${selector} form`).evaluate((form, url) => {
    (form as HTMLFormElement).dataset.endpoint = url;
  }, ENDPOINT);
}

async function fillContact(page: Page) {
  const form = page.locator('#formular');
  await form.getByLabel('Jméno a příjmení').fill('Jan Novák');
  await form.getByLabel('E-mail').fill('jan@example.com');
  await form.getByLabel('Telefon').fill('+420 777 123 456');
  await form.getByLabel('Zpráva').fill('Dobrý den, mám dotaz.');
  await form.getByRole('checkbox').check();
}

test.describe('formulář Kontakt (obecný dotaz)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
  });

  test('jen základní pole, bez výběru modelu a stojanů', async ({ page }) => {
    await page.goto('/kontakt/');
    const form = page.locator('#formular');
    await expect(form.locator('select, [type="radio"]')).toHaveCount(0);
    // jméno, e-mail, telefon, zpráva, souhlas + skryté antispamové pole
    await expect(form.locator('input:not([type="hidden"]), textarea')).toHaveCount(6);
    await expect(form.getByLabel('Zpráva')).toHaveValue('');
    await expect(form.locator('[data-subject]')).toHaveValue('ideTone – dotaz');
  });

  test('?model= předvyplní zprávu a model v předmětu', async ({ page }) => {
    await page.goto('/kontakt/?model=sara#formular');
    const form = page.locator('#formular');
    await expect(form.getByLabel('Zpráva')).toHaveValue('Mám zájem o reprosoustavy Sara.');
    await expect(form.locator('[data-subject]')).toHaveValue('ideTone – dotaz (Sara)');
  });

  test('odkaz Objednat z detailu modelu vede na Kontakt s modelem', async ({ page }) => {
    await page.goto('/reprosoustavy/reva/');
    const href = await page.getByRole('link', { name: 'Objednat' }).first().getAttribute('href');
    expect(href).toContain('/kontakt/?model=reva#formular');
  });

  test('validace: české hlášky u polí a souhrn', async ({ page }) => {
    await page.goto('/kontakt/');
    const form = page.locator('#formular');
    await form.getByRole('button', { name: 'Odeslat zprávu' }).click();
    await expect(form.getByRole('alert')).toContainText('Opravte prosím zvýrazněná pole');
    await expect(form.getByText('Vyplňte prosím pole „Jméno a příjmení“.')).toBeVisible();
    await expect(form.getByText('Vyplňte prosím pole „Zpráva“.')).toBeVisible();
    await expect(form.getByText('Bez souhlasu se zpracováním údajů')).toBeVisible();
    await expect(form.getByLabel('Jméno a příjmení')).toBeFocused();
    await expect(form.getByLabel('Jméno a příjmení')).toHaveAttribute('aria-invalid', 'true');

    await form.getByLabel('E-mail').fill('neplatny-email');
    await expect(form.getByText('Zadejte e-mail ve tvaru jmeno@domena.cz.')).toBeVisible();
    await form.getByLabel('Jméno a příjmení').fill('Jan Novák');
    await expect(form.getByText('Vyplňte prosím pole „Jméno a příjmení“.')).toBeHidden();
  });

  test('bez Formspree ID: hláška, že odesílání není aktivní', async ({ page }) => {
    await page.goto('/kontakt/');
    await fillContact(page);
    await page.locator('#formular').getByRole('button', { name: 'Odeslat zprávu' }).click();
    await expect(page.locator('#formular').getByRole('alert')).toContainText(
      'Odesílání formuláře zatím není aktivní',
    );
  });

  test('úspěch: JSON na Formspree, poděkování místo formuláře', async ({ page }) => {
    let payload: Record<string, string> = {};
    await page.route(ENDPOINT, async (route) => {
      payload = route.request().postDataJSON();
      await new Promise((r) => setTimeout(r, 300));
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto('/kontakt/?model=sara');
    await useEndpoint(page, '#formular');
    await fillContact(page);
    const button = page.locator('#formular [data-submit]');
    await button.click();
    await expect(button).toBeDisabled();
    await expect(button).toContainText('Odesílám…');
    await expect(page.locator('#formular [data-success]')).toBeFocused();
    await expect(page.locator('#formular [data-success]')).toContainText(
      'Děkuji, ozvu se do 2 pracovních dnů.',
    );
    await expect(page.locator('#formular form')).toBeHidden();
    expect(payload._subject).toBe('ideTone – dotaz (Sara)');
    expect(payload.email).toBe('jan@example.com');
    expect(payload['Zpráva']).toBe('Dobrý den, mám dotaz.');
    expect(payload._gotcha).toBe('');
    expect(payload._next).toBeUndefined();
  });

  test('chyba služby: konkrétní hláška s e-mailem', async ({ page }) => {
    await page.route(ENDPOINT, (route) =>
      route.fulfill({ status: 500, json: { error: 'Server error' } }),
    );
    await page.goto('/kontakt/');
    await useEndpoint(page, '#formular');
    await fillContact(page);
    await page.locator('#formular [data-submit]').click();
    const alert = page.locator('#formular').getByRole('alert');
    await expect(alert).toContainText('chyba na straně služby');
    await expect(alert).toContainText('pkocourek@idetone.cz');
    await expect(page.locator('#formular [data-submit]')).toBeEnabled();
  });

  test('výpadek sítě: hláška o připojení', async ({ page }) => {
    await page.route(ENDPOINT, (route) => route.abort('internetdisconnected'));
    await page.goto('/kontakt/');
    await useEndpoint(page, '#formular');
    await fillContact(page);
    await page.locator('#formular [data-submit]').click();
    await expect(page.locator('#formular').getByRole('alert')).toContainText('výpadku připojení');
  });
});

for (const { path, id, button, subject, hint } of [
  {
    path: '/poslech/',
    id: '#formular',
    button: 'Domluvit poslech',
    subject: 'ideTone – poslech',
    hint: 'kdy by se vám poslech hodil',
  },
  {
    path: '/zakazkove-projekty/',
    id: '#poptavka',
    button: 'Odeslat poptávku',
    subject: 'ideTone – zakázka',
    hint: 'Popište místnost',
  },
]) {
  test(`formulář ${path}: stejná pole, nápověda a předmět`, async ({ page }) => {
    let payload: Record<string, string> = {};
    await page.route(ENDPOINT, async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto(path);
    await useEndpoint(page, id);
    const form = page.locator(id);
    await expect(form.locator('select, [type="radio"]')).toHaveCount(0);
    await expect(form.locator('input:not([type="hidden"]), textarea')).toHaveCount(6);
    await expect(form.getByLabel('Zpráva')).toHaveAccessibleDescription(new RegExp(hint));
    await form.getByLabel('Jméno a příjmení').fill('Jan Novák');
    await form.getByLabel('E-mail').fill('jan@example.com');
    await form.getByLabel('Zpráva').fill('Text zprávy');
    await form.getByRole('checkbox').check();
    await form.getByRole('button', { name: button }).click();
    await expect(page.getByText('Děkuji, ozvu se do 2 pracovních dnů.')).toBeVisible();
    expect(payload._subject).toBe(subject);
  });
}

test('bez JS: formulář používá validaci prohlížeče', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/kontakt/');
  const form = page.locator('#formular form');
  expect(await form.evaluate((f) => (f as HTMLFormElement).noValidate)).toBe(false);
  await expect(form.getByLabel('Zpráva')).toHaveAttribute('required', '');
  await context.close();
});

test.describe('přesměrování ze starého webu', () => {
  const map = {
    '/index.php/sara/': '/reprosoustavy/sara/',
    '/index.php/reva/': '/reprosoustavy/reva/',
    '/index.php/o-idetone/': '/o-idetone/',
    '/index.php/technologie/': '/technologie/',
    '/index.php/kontakty/': '/kontakt/',
    '/index.php/objednat/': '/kontakt/#formular',
  };
  for (const [from, to] of Object.entries(map)) {
    test(`${from} → ${to}`, async ({ page }) => {
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`${to.replace(/[#/]/g, '\\$&')}$`));
    });
  }
});

test('404: odkazy na modely a kontakt', async ({ page }) => {
  const res = await page.goto('/neexistujici-stranka/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tahle stránka tu není');
  await expect(page.getByRole('link', { name: /Sara/ }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Kontakt/ }).last()).toBeVisible();
});

test('meta: unikátní title a description na všech stránkách', async ({ page }) => {
  const paths = [
    '/',
    '/reprosoustavy/',
    '/reprosoustavy/sara/',
    '/reprosoustavy/reva/',
    '/zakazkove-projekty/',
    '/technologie/',
    '/poslech/',
    '/o-idetone/',
    '/kontakt/',
    '/obchodni-podminky/',
    '/ochrana-osobnich-udaju/',
  ];
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    // schválené SEO texty (dávka 9b): tři popisy mají 162–174 znaků, Google je může v náhledu zkrátit
    expect(description?.length, `${path}: description`).toBeLessThanOrEqual(175);
    expect(await page.locator('h1').count(), `${path}: jeden H1`).toBe(1);
    expect(await page.locator('meta[property="og:image"]').count()).toBe(1);
    titles.add(title);
    descriptions.add(description ?? '');
  }
  expect(titles.size).toBe(paths.length);
  expect(descriptions.size).toBe(paths.length);
});
