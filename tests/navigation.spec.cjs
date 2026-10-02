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

// Same-site links in the top nav, the rabit sub-nav, and the footer.
const linkSelector = '.site-nav a, .subnav a, .site-footer a';

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

      await expect(page.locator('.site-nav')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }
});

test('every top-bar icon link has an accessible name and a 20px icon', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('.site-nav .nav-icons a');
  await expect(links).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    const link = links.nth(i);
    await expect(link).toHaveAttribute('aria-label', /.+/);
    const box = await link.locator('svg').boundingBox();
    expect(box?.width).toBe(20);
    expect(box?.height).toBe(20);
  }
});

test('tools menu lists all three tools, opens from the keyboard, and stays on screen', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hover/focus menu is a desktop interaction');
  await page.goto('/');
  await page.locator('.site-nav .nav-dropdown > a').focus();
  const menu = page.locator('.nav-dropdown-content');
  await expect(menu).toBeVisible();
  await expect(menu.locator('.nav-tool-name')).toHaveText(['unify', 'rabit', 'akm']);
  const unify = menu.locator('a', { hasText: 'unify' });
  await expect(unify).toHaveAttribute('href', 'https://unify.fwdslsh.dev/');
  await expect(unify).toHaveAttribute('target', '_blank');
  const box = await menu.boundingBox();
  const width = page.viewportSize().width;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
});

test('the nav marks the current section', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop links are hidden on phones');
  await page.goto('/rabit/docs/');
  await expect(page.locator('.site-nav .nav-links a[aria-current]')).toHaveText(/tools/);
  await expect(page.locator('.subnav a[aria-current]')).toHaveText('Specification');
});

test('the phone menu opens and lists every section', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone-only menu');
  await page.goto('/');
  await page.locator('.site-nav .nav-menu summary').click();
  const panel = page.locator('.site-nav .nav-menu-panel');
  await expect(panel).toBeVisible();
  for (const name of ['tools', 'blog', 'members', 'about']) {
    await expect(panel.locator('.nav-link', { hasText: name })).toBeVisible();
  }
  const box = await panel.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
});

test('code blocks get a copy button', async ({ page }) => {
  await page.goto('/tools/');
  const blocks = page.locator('main pre');
  await expect(page.locator('.copy-btn')).toHaveCount(await blocks.count());
});
