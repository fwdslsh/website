// One static snapshot; no services, dependencies, or private lab URLs.
const root = document.querySelector('.model-ledger');
const $ = name => root.querySelector(`#ledger-${name}`);
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[c]);
const format = value => value == null ? '—' : typeof value === 'number'
  ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : escape(value);
const columns = [
  ['details', 'Details'], ['hardware', 'System'], ['model', 'Model'], ['suite', 'Suite'],
  ['status', 'Status'], ['cases', 'Cases'], ['success', 'Success %'], ['quality', 'Quality %'],
  ['decode', 'Decode t/s'], ['prefill', 'Prefill t/s'], ['ttft', 'TTFT s'], ['latency', 'Latency s'],
];
const numeric = new Set(['cases', 'success', 'quality', 'decode', 'prefill', 'ttft', 'latency']);
let data, filtered = [], sortKey = 'hardware', direction = 1;
const expanded = new Set();

function compare(a, b) {
  const x = a[sortKey], y = b[sortKey];
  if (x == null && y == null) return a.id.localeCompare(b.id, undefined, { numeric: true });
  if (x == null) return 1;
  if (y == null) return -1; // Unrecorded values stay last in either direction.
  return direction * (typeof x === 'number' && typeof y === 'number' ? x - y
    : String(x).localeCompare(String(y), undefined, { numeric: true }));
}

function detail(run) {
  const settings = Object.fromEntries(['id', 'run', 'date', 'gpu_count', 'gpu_used', 'placement_basis',
    'context', 'slots', 'kv', 'runtime', 'quant', 'expected', 'unique_cases', 'structure', 'strict',
    'wall', 'requests', 'retries', 'truncated', 'cache', 'notes', 'duplicate_of']
    .filter(key => Object.hasOwn(run, key)).map(key => [key, run[key]]));
  const hardware = data.hardware.find(system => system.name === run.hardware);
  return `<tr class="ledger-detail"><td colspan="${columns.length}">
    <p><strong>${escape(run.id)} · ${escape(run.model)}</strong></p>
    <details open><summary>Recorded settings and allocation</summary><pre>${escape(JSON.stringify(settings, null, 2))}</pre></details>
    <details><summary>Metrics, distributions and telemetry coverage</summary><pre>${escape(JSON.stringify(run.summary, null, 2))}</pre></details>
    <details><summary>Per-group results</summary><pre>${escape(JSON.stringify(run.groups, null, 2))}</pre></details>
    <details><summary>Captured hardware configuration</summary><pre>${escape(JSON.stringify(hardware, null, 2))}</pre></details>
  </td></tr>`;
}

function render() {
  const terms = $('search').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const valid = $('quality').checkValidity();
  const minimum = $('quality').value === '' ? null : $('quality').valueAsNumber;
  $('quality').setAttribute('aria-invalid', String(!valid));
  filtered = data.runs.filter(run => valid &&
    [['system', 'hardware'], ['model', 'model_family'], ['suite', 'suite'], ['state', 'status']]
      .every(([control, key]) => !$(control).value || run[key] === $(control).value) &&
    (!$('gpu').value || ($('gpu').value === 'unknown' ? run.gpu_count == null : run.gpu_count === Number($('gpu').value))) &&
    (minimum == null || (Number.isFinite(run.quality) && run.quality >= minimum)) &&
    (!$('duplicates').checked || !run.duplicate_of) &&
    terms.every(term => [run.id, run.run, run.model, run.model_family, run.hardware, run.runtime, run.notes, run.gpu_used]
      .join(' ').toLowerCase().includes(term))).sort(compare);
  $('head').innerHTML = columns.map(([key, title]) => `<th scope="col"${key === 'details' ? ''
    : ` aria-sort="${key === sortKey ? direction === 1 ? 'ascending' : 'descending' : 'none'}"`}>${key === 'details' ? title
    : `<button type="button" data-sort="${key}">${escape(title)}${key === sortKey ? direction === 1 ? ' ↑' : ' ↓' : ''}</button>`}</th>`).join('');
  $('body').innerHTML = filtered.length ? filtered.map(run => `<tr>${columns.map(([key]) =>
    `<td${numeric.has(key) ? ' class="ledger-number"' : ''}>${key === 'details'
      ? `<button type="button" data-run="${escape(run.id)}" aria-expanded="${expanded.has(run.id)}" aria-label="${expanded.has(run.id) ? 'Hide' : 'Show'} details for ${escape(run.id)}">${expanded.has(run.id) ? '−' : '+'}</button>`
      : key === 'status' ? `${escape(run.status)}${run.duplicate_of ? ' · duplicate' : ''}`
      : format(run[key])}</td>`).join('')}</tr>${expanded.has(run.id) ? detail(run) : ''}`).join('')
    : `<tr><td colspan="${columns.length}">${valid ? 'No matching runs. Reset filters or broaden your search.' : 'Enter a minimum quality between 0 and 100.'}</td></tr>`;
  $('status').textContent = `${filtered.length} of ${data.runs.length} rows · ${filtered.filter(run => run.status === 'complete' && !run.duplicate_of).length} unique complete evaluations`;
}

function download(name, type, text) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const link = document.createElement('a');
  link.href = url; link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

try {
  const response = await fetch(new URL('../model-ledger.json', import.meta.url));
  if (!response.ok) throw new Error('Snapshot unavailable');
  data = await response.json();
  if (!Array.isArray(data.runs) || !Array.isArray(data.hardware)) throw new Error('Invalid snapshot');
  for (const [control, key] of [['system', 'hardware'], ['model', 'model_family'], ['suite', 'suite'], ['state', 'status']]) {
    for (const value of [...new Set(data.runs.map(run => run[key]))].filter(Boolean).sort()) $(control).add(new Option(value, value));
    $(control).addEventListener('change', render);
  }
  for (const control of ['gpu', 'duplicates']) $(control).addEventListener('change', render);
  for (const control of ['search', 'quality']) $(control).addEventListener('input', render);
  root.addEventListener('click', event => {
    const sort = event.target.closest('[data-sort]');
    if (sort) {
      direction = sort.dataset.sort === sortKey ? -direction : 1;
      sortKey = sort.dataset.sort;
      render();
      // Sorting rebuilds the header. Keep keyboard focus on the activated button.
      root.querySelector(`[data-sort="${sortKey}"]`).focus({ preventScroll: true });
    }
    const toggle = event.target.closest('[data-run]');
    if (toggle) {
      const id = toggle.dataset.run;
      expanded.has(id) ? expanded.delete(id) : expanded.add(id);
      render();
      root.querySelector(`[data-run="${id}"]`).focus({ preventScroll: true });
    }
  });
  $('reset').addEventListener('click', () => {
    for (const control of ['system', 'model', 'suite', 'state', 'gpu', 'search', 'quality']) $(control).value = '';
    $('duplicates').checked = false;
    expanded.clear(); sortKey = 'hardware'; direction = 1; render();
  });
  $('json').addEventListener('click', () => download('model-ledger-filtered.json', 'application/json', JSON.stringify({ ...data, runs: filtered }, null, 2)));
  $('csv').addEventListener('click', () => {
    const keys = ['id', 'run', 'hardware', 'gpu_count', 'gpu_used', 'model', 'quant', 'runtime', 'suite', 'status', 'cases', 'success', 'quality', 'structure', 'strict', 'decode', 'prefill', 'ttft', 'latency', 'wall', 'requests', 'retries', 'truncated', 'cache', 'context', 'slots', 'kv', 'date', 'duplicate_of'];
    const quote = value => {
      let text = String(value ?? '');
      if (/^[=+@-]/.test(text)) text = "'" + text; // Spreadsheet formula injection.
      return '"' + text.replace(/"/g, '""') + '"';
    };
    download('model-ledger-filtered.csv', 'text/csv;charset=utf-8', keys.map(quote).join(',') + '\r\n' + filtered.map(run => keys.map(key => quote(run[key])).join(',')).join('\r\n'));
  });
  root.querySelector('.ledger-controls').hidden = false;
  root.querySelector('.ledger-actions').hidden = false;
  render();
} catch {
  $('status').textContent = 'The interactive table could not load. Download the public snapshot above instead.';
}
