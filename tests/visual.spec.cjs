const { test, expect } = require('@playwright/test');

test('visual inspection of home page', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/fwdslsh/);
  await page.screenshot({ path: `tests/visual/home-${testInfo.project.name}.png`, fullPage: true });
});

test('visual inspection of rabit page', async ({ page }, testInfo) => {
  await page.goto('/rabit/');
  await expect(page.locator('h1')).toHaveText('rabit');
  await page.screenshot({ path: `tests/visual/rabit-${testInfo.project.name}.png`, fullPage: true });
});
