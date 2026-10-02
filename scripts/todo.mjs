// Výpis všech TODO(klient), TODO(lukas), NÁVRH a dočasných fotek (placeholder: true) v src/ (npm run todo).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src', import.meta.url));
const pattern = /TODO\((klient|lukas)\)|NÁVRH/;
const hits = [];
const photos = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(astro|ts|js|mjs|md|mdx|yaml|yml|json|css)$/.test(name)) {
      const lines = readFileSync(path, 'utf8').split(/\r?\n/);
      lines.forEach((line, i) => {
        const where = `${relative(process.cwd(), path)}:${i + 1}`;
        if (pattern.test(line)) hits.push(`${where}  ${line.trim()}`);
        if (/^\s*placeholder:\s*true/.test(line)) {
          // nejbližší „src:“ nad řádkem = soubor fotky
          const src = lines
            .slice(Math.max(0, i - 6), i)
            .reverse()
            .find((l) => /^\s*-?\s*src:/.test(l));
          photos.push(`${where}  ${src ? src.trim().replace(/^-\s*/, '') : '(fotka)'}`);
        }
      });
    }
  }
}

walk(root);
console.log(hits.length ? hits.join('\n') : 'Žádné TODO ani NÁVRH.');
console.log(`\nCelkem TODO/NÁVRH: ${hits.length}`);
console.log(`\nDočasné fotky k výměně (placeholder: true): ${photos.length}`);
if (photos.length) console.log(photos.join('\n'));
