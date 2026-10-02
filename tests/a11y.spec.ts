import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Kontrola přístupnosti (axe, WCAG 2.2 AA) na všech stránkách, desktop i mobil.
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
  '/dekujeme/',
  '/neexistujici-stranka/',
];

for (const width of [390, 1440]) {
  for (const path of paths) {
    test(`axe ${path} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      // Kontrast se měří v konečném stavu: bez prolínání a animací, vše odkryté
      // (uprostřed prolnutí je text částečně průhledný a axe by hlásil falešné chyby)
      await page.addStyleTag({
        content:
          '*, *::before, *::after { transition: none !important; animation: none !important; }',
      });
      await page.evaluate(() =>
        document
          .querySelectorAll('[data-reveal], [data-reveal-img]')
          .forEach((el) => el.classList.add('is-revealed')),
      );
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
      );
      expect(summary, summary.join('\n')).toEqual([]);
    });
  }
}

test('klávesnice: skip-link a viditelný focus', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Přeskočit na obsah' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  const outline = await skip.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe('none');
});

test('navigace: všechny odkazy v menu a patičce vedou na existující stránky', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const hrefs = await page
    .locator('header a[href^="/"], footer a[href^="/"]')
    .evaluateAll((links) => [...new Set(links.map((a) => a.getAttribute('href')!.split('#')[0]))]);
  expect(hrefs.length).toBeGreaterThan(8);
  for (const href of hrefs) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});
