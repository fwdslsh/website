// The unify templates on npm: every package named unify-<name>-template, scoped or not.
// The registry's full-text ranking buries a new package under thousands of unrelated ones,
// but a search for the one token "unify" is a finite list of every package with that word
// in its name, so the script reads every page of it and keeps the names that fit the pattern.
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

const page = async from => {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=unify&size=250&from=${from}`);
  if (!response.ok) throw new Error(`npm answered ${response.status}`);
  return response.json();
};

try {
  const first = await page(0);
  const pages = Math.min(Math.ceil(first.total / 250), 20);
  const rest = await Promise.all(Array.from({ length: pages - 1 }, (_, i) => page((i + 1) * 250)));
  const found = [first, ...rest].flatMap(result => result.objects.map(entry => entry.package));
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
  status.innerHTML = 'Could not reach npm, so only the built-ins are listed. <a href="https://www.npmjs.com/search?q=unify-template" target="_blank" rel="noopener">Search npm directly</a>.';
}
