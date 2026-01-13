const { test, expect } = require('@playwright/test');

test('visual inspection of home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/fwdslsh/);
  await page.screenshot({ path: 'tests/visual/home-desktop.png', fullPage: true });
});

test('visual inspection of ecosystem page', async ({ page }) => {
  await page.goto('/ecosystem/index.html');
  await expect(page.locator('h1')).toContainText('fwdslsh');
  await page.screenshot({ path: 'tests/visual/ecosystem-desktop.png', fullPage: true });
});

test('visual inspection of hyphn tool page', async ({ page }) => {
  await page.goto('/hyphn/index.html');
  await expect(page.locator('h1')).toBeVisible();
  await page.screenshot({ path: 'tests/visual/hyphn-desktop.png', fullPage: true });
});

test('mobile visual inspection of home page', async ({ page, isMobile }) => {
  if (isMobile) {
    await page.goto('/');
    await page.screenshot({ path: 'tests/visual/home-mobile.png', fullPage: true });
  }
});
