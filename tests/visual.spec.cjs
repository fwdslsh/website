const { test, expect } = require('@playwright/test');

test('visual inspection of home page', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/fwdslsh/);
  await page.screenshot({ path: `tests/visual/home-${testInfo.project.name}.png`, fullPage: true });
});

test('visual inspection of unify page', async ({ page }, testInfo) => {
  await page.goto('/unify/');
  await expect(page.locator('h1')).toHaveText('unify');
  await page.screenshot({ path: `tests/visual/unify-${testInfo.project.name}.png`, fullPage: true });
});
