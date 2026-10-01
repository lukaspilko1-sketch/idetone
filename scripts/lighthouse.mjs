// Lighthouse (mobil) nad produkčním buildem: npm run build && npm run lighthouse
// Spustí astro preview, změří všechny stránky a vypíše skóre. Reporty HTML do lighthouse/.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';

const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const port = 4322;
const pages = [
  '',
  'reprosoustavy/',
  'reprosoustavy/sara/',
  'reprosoustavy/reva/',
  'zakazkove-projekty/',
  'technologie/',
  'poslech/',
  'o-idetone/',
  'kontakt/',
  'obchodni-podminky/',
  'ochrana-osobnich-udaju/',
];

const preview = spawn(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'preview', '--port', String(port)],
  {
    stdio: 'ignore',
  },
);
const origin = `http://localhost:${port}`;
for (let i = 0; i < 60; i++) {
  try {
    await fetch(`${origin}${base}`);
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}

// Prohlížeč z Playwrightu s ladicím portem, Lighthouse se k němu připojí
const debugPort = 9333;
const browser = await chromium.launch({ args: [`--remote-debugging-port=${debugPort}`] });
mkdirSync('lighthouse', { recursive: true });

const rows = [];
try {
  for (const page of pages) {
    const url = `${origin}${base}${page}`;
    const result = await lighthouse(url, {
      port: debugPort,
      output: 'html',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    });
    const c = result.lhr.categories;
    const score = (k) => Math.round(c[k].score * 100);
    rows.push({
      stránka: `/${page}`,
      výkon: score('performance'),
      přístupnost: score('accessibility'),
      'best practices': score('best-practices'),
      seo: score('seo'),
      'LCP (s)': (result.lhr.audits['largest-contentful-paint'].numericValue / 1000).toFixed(1),
      CLS: result.lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3),
      'váha (kB)': Math.round(result.lhr.audits['total-byte-weight'].numericValue / 1024),
    });
    writeFileSync(`lighthouse/${page.replace(/\//g, '_') || 'uvod'}.html`, result.report);
  }
} finally {
  await browser.close();
  preview.kill();
}

console.table(rows);
// SEO je v testovacím provozu sníženo kvůli noindex (záměr), proto se nehodnotí jako chyba.
