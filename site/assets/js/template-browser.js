// The unify templates on npm: every package named unify-<name>-template, scoped or not.
// Two registry searches, merged: the unify-template keyword (what the built-ins carry, and an
// exact match) and the name itself (fuzzy, a second net for a package without the keyword).
// A built-in already on the page gets its npm version; any other package gets a card.
const root = document.querySelector('.template-browser');
const status = root.querySelector('#templates-status');
const grid = root.querySelector('#templates');
const pattern = /^(@[^/]+\/)?unify-[^/]+-template$/;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c]);
const when = iso => new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
const meta = pkg => `v${escape(pkg.version)}${pkg.date ? ` · ${when(pkg.date)}` : ''}`;

const card = pkg => `<a class="card template" href="https://www.npmjs.com/package/${escape(pkg.name)}" target="_blank" rel="noopener">
  <h3>${escape(pkg.name)}</h3>
  <p>${escape(pkg.description || 'No description yet.')}</p>
  <code class="install">unify init ${escape(pkg.name)}</code>
  <p class="card-meta">${meta(pkg)}</p>
</a>`;

const search = async text => {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(text)}&size=250`);
  if (!response.ok) throw new Error(`npm answered ${response.status}`);
  return (await response.json()).objects.map(entry => entry.package);
};

try {
  const found = (await Promise.all([search('keywords:unify-template'), search('unify-template')])).flat();
  const templates = [...new Map(found.filter(pkg => pattern.test(pkg.name)).map(pkg => [pkg.name, pkg])).values()]
    .sort((a, b) => a.name.localeCompare(b.name));
  let added = 0;
  for (const pkg of templates) {
    const known = grid.querySelector(`[data-package="${pkg.name}"] .template-npm`);
    if (known) known.insertAdjacentHTML('afterend', ` · ${meta(pkg)}`);
    else { grid.insertAdjacentHTML('beforeend', card(pkg)); added++; }
  }
  const builtIn = grid.querySelectorAll('[data-package]').length;
  status.textContent = `${builtIn + added} templates · ${builtIn} built into the CLI · ${templates.length} on npm`;
} catch {
  status.innerHTML = 'Could not reach npm, so only the built-ins are listed. <a href="https://www.npmjs.com/search?q=keywords:unify-template" target="_blank" rel="noopener">Search npm directly</a>.';
}
