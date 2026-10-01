// Výpis všech TODO(klient), TODO(lukas) a NÁVRH v src/ (npm run todo).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pattern = /TODO\((klient|lukas)\)|NÁVRH/;
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(astro|ts|js|mjs|md|mdx|yaml|yml|json|css)$/.test(name)) {
      readFileSync(path, 'utf8')
        .split(/\r?\n/)
        .forEach((line, i) => {
          if (pattern.test(line))
            hits.push(`${relative(process.cwd(), path)}:${i + 1}  ${line.trim()}`);
        });
    }
  }
}

walk(decodeURIComponent(root));
console.log(hits.length ? hits.join('\n') : 'Žádné TODO ani NÁVRH.');
console.log(`\nCelkem: ${hits.length}`);
