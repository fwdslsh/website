import { chromium } from 'playwright';

const baseURL = 'http://localhost:3000';
const rounds = 3;
const toolPaths = ['/ecosystem/', '/hyphn/', '/rabit/', '/dispatch/', '/disclose/', '/gather/', '/catalog/', '/inform/'];

async function navigateAll(page, selector, label) {
  const hrefs = await page.locator(selector).evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  if (!hrefs.length) {
    console.log(`[skip] ${label}: no links`);
    return;
  }
  for (const href of hrefs) {
    if (!href || href.startsWith('#') || href.startsWith('http')) continue; // skip anchors/external
    const target = new URL(href, page.url()).toString();
    console.log(`[nav] ${label}: ${target}`);
    await page.goto(target, { waitUntil: 'domcontentloaded' });
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (let i = 0; i < rounds; i++) {
    console.log(`\n=== Round ${i + 1} ===`);
    for (const path of toolPaths) {
      await page.goto(new URL(path, baseURL).toString(), { waitUntil: 'domcontentloaded' });
      await navigateAll(page, '.unify-nav-links a', `tool ${path}`);
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
