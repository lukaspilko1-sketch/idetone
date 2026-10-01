import { test, expect } from '@playwright/test';

// Web musí fungovat od 320 px bez vodorovného scrollu (SUPERPROMPT kap. 8).
for (const path of ['/', '/_styleguide/']) {
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
