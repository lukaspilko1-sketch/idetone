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
