import { test, expect } from '@playwright/test';

// Web musí fungovat od 320 px bez vodorovného scrollu (SUPERPROMPT kap. 8).
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
  '/_styleguide/',
];

for (const path of paths) {
  for (const width of [320, 390, 768, 1440]) {
    test(`bez vodorovného scrollu ${path} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

test('mobilní menu: aria-expanded, Escape zavře', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu' });
  await toggle.click();
  await expect(page.locator('[data-nav-toggle]')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Hlavní navigace' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-nav-toggle]')).toHaveAttribute('aria-expanded', 'false');
});

test('bez JS: obsah viditelný, Menu vede do patičky', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/_styleguide/');
  await expect(page.getByRole('heading', { name: 'Barvy' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Menu' })).toHaveAttribute(
    'href',
    '#navigace-paticka',
  );
  await context.close();
});

test('galerie: šipky, miniatury a lightbox', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/reprosoustavy/sara/');
  const count = page.locator('[data-count]');
  await expect(count).toHaveText('1 / 5');
  await page.getByRole('button', { name: 'Další fotka' }).first().click();
  await expect(count).toHaveText('2 / 5');
  await page.locator('[data-thumb="4"]').click();
  await expect(count).toHaveText('5 / 5');
  await page.locator('[data-slide]:not([hidden])').click();
  const dialog = page.locator('[data-lightbox]');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(count).toHaveText('1 / 5');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('srovnávací tabulka: první sloupec zůstává při posunu na mobilu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/reprosoustavy/');
  const region = page.locator('.compare');
  const firstCell = region.locator('tbody tr').first().locator('th');
  const before = await firstCell.boundingBox();
  await region.evaluate((el) => (el.scrollLeft = 200));
  const after = await firstCell.boundingBox();
  expect(after?.x).toBeCloseTo(before?.x ?? 0, 0);
});

// Dávka 2.6: při omezeném pohybu bez posunů a masek, ale s prolnutím; obsah musí být vidět
for (const motion of ['no-preference', 'reduce'] as const) {
  test(`pohyb ${motion}: hero a sekce se zobrazí`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const drawing = page.locator('.hero__drawing');
    await expect(drawing).toBeVisible();
    const animation = await drawing.evaluate((el) => getComputedStyle(el).animationName);
    expect(animation).toBe(motion === 'reduce' ? 'fade-in' : 'draw-up');
    await page.waitForTimeout(2200);
    expect(await drawing.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');

    const step = page.locator('.process__text').first();
    await step.scrollIntoViewIfNeeded();
    await expect(step).toHaveCSS('opacity', '1', { timeout: 3000 });
    if (motion === 'reduce') {
      expect(await step.evaluate((el) => getComputedStyle(el).transform)).toBe('none');
    }
  });
}
