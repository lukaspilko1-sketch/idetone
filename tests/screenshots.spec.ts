// Screenshoty ke schválení fáze (npm run screenshots) → složka screenshots/ (není v gitu).
import { test, type Page } from '@playwright/test';

const widths = [390, 768, 1440];
const pages = [
  { name: 'uvod', path: '/' },
  { name: 'reprosoustavy', path: '/reprosoustavy/' },
  { name: 'sara', path: '/reprosoustavy/sara/' },
  { name: 'reva', path: '/reprosoustavy/reva/' },
  { name: 'zakazkove-projekty', path: '/zakazkove-projekty/' },
  { name: 'technologie', path: '/technologie/' },
  { name: 'poslech', path: '/poslech/' },
  { name: 'o-idetone', path: '/o-idetone/' },
  { name: 'kontakt', path: '/kontakt/' },
  { name: 'obchodni-podminky', path: '/obchodni-podminky/' },
  { name: 'ochrana-osobnich-udaju', path: '/ochrana-osobnich-udaju/' },
  { name: 'styleguide', path: '/_styleguide/' },
];

async function ready(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  // Projet stránku kvůli lazy obrázkům, pak zpět nahoru
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}

for (const width of widths) {
  for (const { name, path } of pages) {
    test(`${name} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await ready(page);
      await page.screenshot({ path: `screenshots/${name}-${width}.png`, fullPage: true });
    });
  }

  test(`hlavicka po scrollu @ ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 600 });
    await page.goto('/_styleguide/');
    await ready(page);
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/hlavicka-scroll-${width}.png` });
  });
}

test('mobilni menu @ 390', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await ready(page);
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.screenshot({ path: 'screenshots/menu-390.png' });
});

test('podmenu @ 1440', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 600 });
  await page.goto('/');
  await ready(page);
  await page
    .getByRole('navigation', { name: 'Hlavní navigace' })
    .getByRole('link', { name: 'Reprosoustavy', exact: true })
    .hover();
  await page.waitForTimeout(250);
  await page.screenshot({ path: 'screenshots/podmenu-1440.png' });
});

// Stavy formuláře (objednávka) ke schválení
test.describe('formular stavy', () => {
  const endpoint = 'https://formspree.io/f/testovaci';
  const shot = (page: Page, name: string) =>
    page.locator('#objednavka').screenshot({ path: `screenshots/formular-${name}.png` });

  async function prepare(page: Page, fill = true) {
    await page.setViewportSize({ width: 1280, height: 1200 });
    await page.goto('/kontakt/?model=reva');
    await ready(page);
    await page
      .locator('#objednavka form')
      .evaluate((f, url) => ((f as HTMLFormElement).dataset.endpoint = url), endpoint);
    if (!fill) return;
    const form = page.locator('#objednavka');
    await form.getByLabel('Jméno a příjmení').fill('Jan Novák');
    await form.getByLabel('E-mail').fill('jan@example.com');
    await form.getByLabel('Telefon').fill('+420 777 123 456');
    await form.getByRole('checkbox').check();
  }

  test('vychozi a chyby validace', async ({ page }) => {
    await prepare(page, false);
    await shot(page, 'vychozi');
    await page.locator('#objednavka [data-submit]').click();
    await shot(page, 'validace');
  });

  test('odesilam', async ({ page }) => {
    await page.route(endpoint, () => new Promise(() => {}));
    await prepare(page);
    await page.locator('#objednavka [data-submit]').click();
    await shot(page, 'odesilam');
  });

  test('uspech', async ({ page }) => {
    await page.route(endpoint, (r) => r.fulfill({ status: 200, json: { ok: true } }));
    await prepare(page);
    await page.locator('#objednavka [data-submit]').click();
    await page.locator('#objednavka [data-success]').waitFor();
    await shot(page, 'uspech');
  });

  test('chyba', async ({ page }) => {
    await page.route(endpoint, (r) => r.fulfill({ status: 500, json: {} }));
    await prepare(page);
    await page.locator('#objednavka [data-submit]').click();
    await page.locator('#objednavka [data-status]:not([hidden])').waitFor();
    await shot(page, 'chyba');
  });
});

// Dávka 1 (docs/UPRAVY.md): úvod 375 / 768 / 1280 – nahoře a po scrollu (hlavička v obou stavech)
for (const [width, height] of [
  [375, 812],
  [768, 1024],
  [1280, 800],
]) {
  test(`davka1 uvod @ ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await ready(page);
    await page.screenshot({ path: `screenshots/davka1-uvod-nahore-${width}.png` });
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `screenshots/davka1-uvod-scroll-${width}.png` });
    await page.screenshot({ path: `screenshots/davka1-uvod-cela-${width}.png`, fullPage: true });
  });
}

// Dávka 2: úvod 375 / 768 / 1280 – hero, modely, koncept, proces; oba režimy pohybu
for (const [width, height] of [
  [375, 812],
  [768, 1024],
  [1280, 800],
]) {
  for (const motion of ['no-preference', 'reduce'] as const) {
    test(`davka2 uvod @ ${width} ${motion}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: motion });
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(2500); // dokončení animace kresby a podpisu
      const tag = motion === 'reduce' ? '-reduce' : '';
      await page.screenshot({ path: `screenshots/davka2-hero-${width}${tag}.png` });
      if (motion === 'reduce') return;
      for (const [name, sel] of [
        ['modely', '#modely'],
        ['koncept', 'section[aria-labelledby="koncept-title"]'],
        ['proces', 'section[aria-labelledby="proces-title"]'],
      ]) {
        const el = page.locator(sel);
        await el.evaluate(async (node) => {
          const box = node.getBoundingClientRect();
          for (let y = 0; y < box.height; y += 300) {
            window.scrollTo(0, window.scrollY + box.top + y - 200);
            await new Promise((r) => setTimeout(r, 120));
          }
        });
        await page.waitForTimeout(900);
        await el.screenshot({ path: `screenshots/davka2-${name}-${width}.png` });
      }
    });
  }
}
