const { test, expect } = require('@playwright/test');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const snapshot = JSON.parse(readFileSync(path.join(__dirname, '../src/assets/model-ledger.json'), 'utf8'));
const url = '/references/model-ledger/';
const postUrl = '/blog/posts/model-benchmark-ledger/';

async function ready(page) {
  await page.goto(url);
  await expect(page.locator('#ledger-status')).toHaveText('129 of 129 rows · 45 unique complete evaluations');
}

test('public snapshot preserves rows, duplicates and cited measurements without private data', () => {
  expect(snapshot.runs).toHaveLength(129);
  expect(new Set(snapshot.runs.map(run => run.id)).size).toBe(129);
  expect(snapshot.hardware).toHaveLength(5);
  expect(snapshot.runs.filter(run => run.duplicate_of)).toHaveLength(2);
  expect(snapshot.runs.filter(run => run.status === 'complete' && !run.duplicate_of)).toHaveLength(45);
  expect(snapshot.runs.find(run => run.id === 'run-6')).toMatchObject({quality:91.837,decode:47.31,prefill:611.0971703544069});
  expect(snapshot.runs.find(run => run.id === 'run-81')).toMatchObject({quality:91.837,decode:40.23});
  expect(snapshot.runs.find(run => run.id === 'run-7')).toMatchObject({quality:84.626,decode:46.62,prefill:2054.719661918467});
  expect(snapshot.source_sha256).toMatch(/^[a-f0-9]{64}$/);
  for (const run of snapshot.runs) {
    for (const key of ['source', 'records', 'artifacts', 'config', 'attribution']) expect(run).not.toHaveProperty(key);
    expect(snapshot.hardware.some(system => system.name === run.hardware)).toBe(true);
  }
  expect(JSON.stringify(snapshot)).not.toMatch(/\/home\/|\/opt\/|\.lab\.fwdslsh\.dev|192\.168\.|founder3|authorization|api[_-]?key\s*[:=]/i);
});

test('filters combine without mixing unscored rows into a quality threshold', async ({page}) => {
  await ready(page);
  await page.getByLabel('Evaluation suite', {exact:true}).selectOption('public123');
  await page.getByLabel('Run status', {exact:true}).selectOption('complete');
  await page.getByLabel('Hide exact duplicates', {exact:true}).check();
  await page.getByLabel('Minimum quality %', {exact:true}).fill('90');
  const rows = snapshot.runs.filter(run => run.suite === 'public123' && run.status === 'complete' && !run.duplicate_of && run.quality >= 90);
  await expect(page.locator('#ledger-status')).toHaveText(`${rows.length} of 129 rows · ${rows.length} unique complete evaluations`);
  await page.getByLabel('System', {exact:true}).selectOption('Ryzen · dual RTX 4060 Ti');
  await expect(page.locator('#ledger-status')).toHaveText('1 of 129 rows · 1 unique complete evaluations');
  await expect(page.locator('#ledger-body')).toContainText('91.84');
});

test('invalid quality, empty search and reset recover cleanly', async ({page}) => {
  await ready(page);
  await page.getByLabel('Minimum quality %', {exact:true}).fill('101');
  await expect(page.locator('#ledger-quality')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#ledger-body')).toContainText('Enter a minimum quality between 0 and 100');
  await page.getByRole('button', {name:'Reset filters',exact:true}).click();
  await page.getByLabel('Search runs',{exact:true}).fill('definitely-no-such-run');
  await expect(page.locator('#ledger-body')).toContainText('No matching runs');
  await page.getByRole('button', {name:'Reset filters',exact:true}).click();
  await expect(page.locator('#ledger-status')).toContainText('129 of 129');
});

test('numeric sorting is reversible, missing values stay last and keyboard focus survives', async ({page}) => {
  await ready(page);
  const button = page.getByRole('button', {name:'Quality %',exact:true});
  await button.focus();
  await button.press('Enter');
  await expect(page.locator('th[aria-sort=ascending]')).toContainText('Quality %');
  const values = await page.locator('#ledger-body > tr > td:nth-child(8)').allTextContents();
  const scores = values.filter(value => value !== '—').map(Number);
  expect(scores).toEqual([...scores].sort((a,b)=>a-b));
  await expect(page.locator('#ledger-body > tr').last()).toContainText('—');
  await expect(page.locator('[data-sort=quality]')).toBeFocused();
  await page.locator('[data-sort=quality]').press('Enter');
  await expect(page.locator('th[aria-sort=descending]')).toContainText('Quality %');
  const descending = (await page.locator('#ledger-body > tr > td:nth-child(8)').allTextContents()).filter(value => value !== '—').map(Number);
  expect(descending).toEqual([...descending].sort((a,b)=>b-a));
});

test('details expose metrics and hardware with accessible keyboard controls', async ({page}) => {
  await ready(page);
  await page.getByLabel('Search runs',{exact:true}).fill('run-6');
  const toggle = page.getByRole('button',{name:'Show details for run-6',exact:true});
  await toggle.press('Enter');
  await expect(page.getByRole('button',{name:'Hide details for run-6',exact:true})).toHaveAttribute('aria-expanded','true');
  await expect(page.locator('.ledger-detail')).toContainText('Recorded settings and allocation');
  await page.locator('.ledger-detail summary').filter({hasText:'Metrics, distributions'}).click();
  await expect(page.locator('.ledger-detail')).toContainText('checks_earned');
  await page.locator('.ledger-detail summary').filter({hasText:'Captured hardware'}).click();
  await expect(page.locator('.ledger-detail')).toContainText('AMD Ryzen 5 9600X');
});

test('filtered exports contain the selected rows only', async ({page}) => {
  await ready(page);
  await page.getByLabel('Search runs',{exact:true}).fill('run-129');
  for (const format of ['JSON','CSV']) {
    const download = page.waitForEvent('download');
    await page.getByRole('button',{name:`Export filtered ${format}`,exact:true}).click();
    const result = await download;
    const body = readFileSync(await result.path(),'utf8');
    if (format === 'JSON') {
      expect(JSON.parse(body).runs.map(run=>run.id)).toEqual(['run-129']);
    } else {
      expect(body.split('\r\n')).toHaveLength(2);
      expect(body).toContain('"run-129"');
    }
  }
});

test('no-JavaScript and failed-fetch readers retain the static download', async ({browser,page,request}) => {
  const context = await browser.newContext({javaScriptEnabled:false});
  try {
    const plain = await context.newPage();
    await plain.goto('http://localhost:3000' + url);
    await expect(plain.getByRole('link',{name:'Download the full public snapshot (JSON)',exact:true})).toBeVisible();
    await expect(plain.getByText('Enable JavaScript to filter and sort the table, or use the downloadable snapshot above.',{exact:true})).toBeVisible();
  } finally { await context.close(); }
  expect((await request.get('/assets/model-ledger.json')).ok()).toBe(true);
  await page.route('**/assets/model-ledger.json', route=>route.abort());
  await page.goto(url);
  await expect(page.locator('#ledger-status')).toContainText('could not load');
  await expect(page.getByRole('link',{name:'Download the full public snapshot (JSON)',exact:true})).toBeVisible();
  await expect(page.locator('.ledger-controls')).toBeHidden();
});

test('post is discoverable through the blog, homepage and feed and fits small screens', async ({page,request}) => {
  await page.goto('/blog/');
  await page.getByRole('link',{name:"A model leaderboard wasn't enough. We kept the ledger.",exact:true}).click();
  await expect(page.locator('h1')).toHaveText("A model leaderboard wasn't enough. We kept the ledger.");
  await expect(page.locator('.site-nav')).toHaveCount(1);
  await expect(page.locator('.model-ledger')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('The ledger is dated September 30');
  await expect(page.locator('main')).not.toContainText('not proof that one CPU is universally faster');
  await expect(page.locator('main')).not.toContainText('A hardware comparison should keep those caveats');
  await expect(page.getByRole('link',{name:'AKM Model Eval',exact:true})).toHaveAttribute('href','https://github.com/itlackey/akm-model-eval');
  await expect(page.getByRole('link',{name:'public test corpus',exact:true})).toHaveAttribute('href','https://github.com/itlackey/akm-model-eval/tree/main/corpus');
  await page.getByRole('link',{name:'full-width interactive ledger',exact:true}).click();
  await expect(page).toHaveURL(new RegExp(url + '$'));
  await expect(page.getByRole('link',{name:'Read the article',exact:true})).toHaveAttribute('href',postUrl);
  expect(await (await request.get('/feed.xml')).text()).toContain(postUrl);
  await page.goto('/');
  await expect(page.locator('.post-list a').filter({hasText:'We kept the ledger.'})).toHaveAttribute('href',postUrl);
  await page.setViewportSize({width:1600,height:900});
  await ready(page);
  const desktop = await page.evaluate(()=>({viewport:innerWidth,main:document.querySelector('main').getBoundingClientRect().width,table:document.querySelector('.ledger-scroll').getBoundingClientRect().width}));
  expect(desktop.main).toBe(desktop.viewport);
  expect(desktop.table).toBeGreaterThan(desktop.viewport * 0.95);
  await page.setViewportSize({width:320,height:740});
  await ready(page);
  const widths = await page.evaluate(()=>({viewport:innerWidth,page:document.documentElement.scrollWidth,scroll:document.querySelector('.ledger-scroll').scrollWidth,box:document.querySelector('.ledger-scroll').clientWidth}));
  expect(widths.page).toBeLessThanOrEqual(widths.viewport);
  expect(widths.scroll).toBeGreaterThan(widths.box);
});
