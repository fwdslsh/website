// Lists the unify templates published on npm: every package named unify-<name>-template,
// scoped or not. The registry's search is fuzzy, so the name pattern does the real filtering.
const root = document.querySelector('.template-browser');
const status = root.querySelector('#templates-status');
const grid = root.querySelector('#templates-npm');
const pattern = /^(@[^/]+\/)?unify-[^/]+-template$/;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c]);

const card = pkg => `<a class="card" href="https://www.npmjs.com/package/${encodeURIComponent(pkg.name).replace('%40', '@').replace('%2F', '/')}" target="_blank" rel="noopener">
  <h3>${escape(pkg.name)}</h3>
  <p>${escape(pkg.description || 'No description yet.')}</p>
  <p class="card-meta">v${escape(pkg.version)}${pkg.publisher?.username ? ` · ${escape(pkg.publisher.username)}` : ''}</p>
</a>`;

try {
  const response = await fetch('https://registry.npmjs.org/-/v1/search?text=unify%20template&size=250');
  if (!response.ok) throw new Error(`npm answered ${response.status}`);
  const { objects } = await response.json();
  const templates = objects.map(entry => entry.package).filter(pkg => pattern.test(pkg.name))
    .sort((a, b) => a.name.localeCompare(b.name));
  grid.innerHTML = templates.map(card).join('');
  status.textContent = templates.length
    ? `${templates.length} template${templates.length === 1 ? '' : 's'} on npm`
    : 'None published yet. Name yours unify-<name>-template and it lists here.';
} catch {
  status.innerHTML = 'Could not reach npm. <a href="https://www.npmjs.com/search?q=unify-template" target="_blank" rel="noopener">Search npm directly</a>.';
}
