import { test } from '@playwright/test';

// Po přidání modelu doplnit id sem (a spustit npm run og).
const ids = ['default', 'sara', 'reva'];

for (const id of ids) {
  test(`og ${id}`, async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 630 });
    await page.goto(`/og-nahled/${id}/`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: `public/og/${id}.png` });
  });
}
