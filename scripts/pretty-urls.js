import { promises as fs } from 'fs';
import { join, dirname, basename } from 'path';

async function collectHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip include artifacts
      if (entry.name.startsWith('_')) continue;
      files.push(...await collectHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

async function toPrettyUrls(root) {
  const files = await collectHtmlFiles(root);
  for (const file of files) {
    const relative = file.replace(`${root}/`, '');
    // keep root index.html as-is
    if (relative === 'index.html') continue;
    // keep existing directory index.html
    if (basename(file) === 'index.html') continue;
    const content = await fs.readFile(file, 'utf8');
    const targetDir = join(root, relative.replace(/\.html$/, ''));
    const targetFile = join(targetDir, 'index.html');
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetFile, content, 'utf8');
    await fs.unlink(file);
  }
}

const root = process.argv[2] || 'dist';
await toPrettyUrls(root);
console.log(`[pretty-urls] rewritten HTML into directories under ${root}`);
