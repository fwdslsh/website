const { test, expect } = require('@playwright/test');

const paths = [
  '/',
  '/tools/',
  '/members/',
  '/about/',
  '/blog/',
  '/rabit/',
  '/rabit/getting-started/',
  '/rabit/docs/',
  '/rabit/examples/',
];

// Same-site links in the top nav, the rabit section nav, and the footer.
const linkSelector = 'nav a, .tool-nav-links a, footer a';

test.describe('site navigation', () => {
  for (const path of paths) {
    test(`same-site links resolve from ${path}`, async ({ page, request }) => {
      const resp = await page.goto(path);
      expect(resp?.ok()).toBeTruthy();

      const hrefs = await page.locator(linkSelector).evaluateAll((anchors) =>
        anchors.map((a) => a.getAttribute('href')),
      );
      const targets = [...new Set(hrefs.filter((h) => h && h.startsWith('/')))]
        .map((h) => new URL(h, page.url()));

      expect(targets.length).toBeGreaterThan(0);
      for (const url of targets) {
        url.hash = '';
        const res = await request.get(url.toString());
        expect(res.ok(), `${url} from ${path}`).toBeTruthy();
      }
    });

    test(`page renders without errors on ${path}`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => {
        // External fonts/CSS may be unreachable in CI; only report errors about our own markup and scripts.
        if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text());
      });
      await page.goto(path, { waitUntil: 'load' });

      await expect(page.locator('nav')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }
});

test('every top-bar icon link has an accessible name and a visible icon', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('nav .nav-links a, nav .nav-dropdown > a');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    await expect(link).toHaveAttribute('aria-label', /.+/);
    const box = await link.locator('svg').boundingBox();
    expect(box?.width).toBe(20);
    expect(box?.height).toBe(20);
  }
});

test('tools menu lists rabit and unify and opens from the keyboard', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hover/focus menu is a desktop interaction');
  await page.goto('/');
  await page.locator('nav .nav-dropdown > a').focus();
  const menu = page.locator('.nav-dropdown-content');
  await expect(menu).toBeVisible();
  await expect(menu.locator('.nav-tool-name')).toHaveText(['rabit', 'unify']);
  const unify = menu.locator('a', { hasText: 'unify' });
  await expect(unify).toHaveAttribute('href', 'https://unify.fwdslsh.dev/');
  await expect(unify).toHaveAttribute('target', '_blank');
});
