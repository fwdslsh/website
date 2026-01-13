const { test, expect } = require('@playwright/test');

const paths = [
  '/',
  '/ecosystem/',
  '/hyphn/',
  '/rabit/',
  '/dispatch/',
  '/disclose/',
  '/gather/',
  '/catalog/',
  '/inform/',
];

test.describe('tool navigation links', () => {
  for (const path of paths) {
    test(`nav links reachable from ${path}`, async ({ page }) => {
      const resp = await page.goto(path);
      console.log(`visited ${path} ->`, resp?.status());
      expect(resp?.ok()).toBeTruthy();

      const hrefs = await page.locator('ul.unify-nav-links a').evaluateAll((anchors) =>
        anchors.map((a) => a.getAttribute('href')),
      );

      const unique = [...new Set(hrefs.filter((href) => href && href.startsWith('/') && !href.startsWith('/#')))]
        // keep navigation within this site, avoid locking server on fragments/external
        .map((href) => new URL(href, page.url()).toString());

      for (const href of unique) {
        const res = await page.goto(href);
        console.log(`nav ${href} ->`, res?.status());
        expect(res?.ok()).toBeTruthy();
        await expect(page.locator('body')).not.toBeEmpty();
      }
    });
  }
});
