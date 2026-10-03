const { test, expect } = require('@playwright/test');

const paths = [
  '/',
  '/tools/',
  '/members/',
  '/about/',
  '/blog/',
  '/blog/posts/how-this-site-is-built/',
  '/rabit/',
  '/rabit/getting-started/',
  '/rabit/docs/',
  '/rabit/examples/',
  '/unify/',
  '/unify/getting-started/',
  '/unify/concepts/',
  '/unify/examples/',
  '/akm/',
  '/akm/getting-started/',
  '/akm/concepts/',
  '/akm/examples/',
  '/gutterpress/',
  '/gutterpress/getting-started/',
  '/gutterpress/concepts/',
  '/gutterpress/examples/',
  '/404.html',
];

// Same-site links in the top nav, the section sub-navs, and the footer.
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

test('tools menu lists every tool, opens from the keyboard, and stays on screen', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hover/focus menu is a desktop interaction');
  await page.goto('/');
  await page.locator('.site-nav .nav-dropdown > a').focus();
  const menu = page.locator('.nav-dropdown-content');
  await expect(menu).toBeVisible();
  await expect(menu.locator('.nav-tool-name')).toHaveText(['unify', 'rabit', 'akm', 'gutterpress']);
  const unify = menu.locator('a', { hasText: 'unify' });
  await expect(unify).toHaveAttribute('href', '/unify/');
  const box = await menu.boundingBox();
  const width = page.viewportSize().width;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
});

// The current section is marked by a body class plus CSS (no script), so compare colors.
const color = (locator) => locator.evaluate((el) => getComputedStyle(el).color);

test('the nav marks the current section', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop links are hidden on phones');
  await page.goto('/rabit/docs/');
  await expect(page.locator('body')).toHaveClass(/\btools\b/);
  const tools = await color(page.locator('.site-nav .nav-links .nav-tools'));
  expect(tools).not.toBe(await color(page.locator('.site-nav .nav-links .nav-blog')));
  const spec = await color(page.locator('.subnav .tab-spec'));
  expect(spec).toBe(tools);
  expect(spec).not.toBe(await color(page.locator('.subnav .tab-overview')));
});

test('the section tabs collapse into a menu on phones', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'the tab row stays visible on wide screens');
  await page.goto('/unify/concepts/');
  const tabs = page.locator('.subnav ul');
  await expect(tabs).toBeHidden();
  const summary = page.locator('.subnav summary');
  await expect(summary).toContainText('unify');
  await summary.click();
  await expect(tabs).toBeVisible();
  await expect(page.locator('.subnav .tab-examples')).toBeVisible();
  const width = page.viewportSize().width;
  const box = await tabs.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(width);
});

test('the blog lists the post that the generator found', async ({ page }) => {
  await page.goto('/blog/');
  await expect(page.locator('.post-list a').first()).toHaveAttribute('href', '/blog/posts/how-this-site-is-built/');
  await expect(page.locator('.post-list .post-by').first()).toHaveText('by fwdslsh');
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
