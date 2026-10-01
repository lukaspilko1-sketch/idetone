// Kontrola odkazů v buildu (npm run links, po npm run build): interní odkazy, obrázky, skripty
// a kotvy (#id) musí existovat. Externí odkazy jen vypíše.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
if (!existsSync(dist)) {
  console.error('Chybí dist/ – nejdřív spusťte npm run build.');
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) pages.push(path);
  }
})(dist);

const ids = new Map();
const getIds = (file) => {
  if (!ids.has(file)) {
    const html = readFileSync(file, 'utf8');
    ids.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return ids.get(file);
};

const toFile = (pathname) => {
  if (!pathname.startsWith(base)) return null;
  let p = decodeURIComponent(pathname.slice(base.length));
  if (p === '' || p.endsWith('/')) p += 'index.html';
  return join(dist, p);
};

const errors = [];
const external = new Set();

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const from = relative(dist, page);
  for (const [, attr, value] of html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
    const urls =
      attr === 'srcset' ? value.split(',').map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const raw of urls) {
      if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
      if (/^https?:\/\//.test(raw)) {
        if (!raw.includes('lukaspilko1-sketch.github.io') && !raw.includes('idetone.cz'))
          external.add(raw);
        continue;
      }
      const [pathPart, hash] = raw.split('#');
      // Odkaz jen na kotvu na stejné stránce
      if (!pathPart) {
        if (hash && !getIds(page).has(hash))
          errors.push(`${from}: kotva #${hash} na stránce neexistuje`);
        continue;
      }
      const file = toFile(pathPart.split('?')[0]);
      if (!file) {
        errors.push(`${from}: odkaz mimo base ${base}: ${raw}`);
        continue;
      }
      if (!existsSync(file)) {
        errors.push(`${from}: neexistuje ${raw}`);
        continue;
      }
      if (hash && file.endsWith('.html') && !getIds(file).has(hash)) {
        errors.push(`${from}: kotva #${hash} neexistuje v ${raw}`);
      }
    }
  }
}

console.log(`Zkontrolováno stránek: ${pages.length}`);
console.log(`Externí odkazy (nekontrolují se):\n  ${[...external].sort().join('\n  ')}`);
if (errors.length) {
  console.error(`\nChyby (${errors.length}):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log('\nVšechny interní odkazy a kotvy jsou v pořádku.');
