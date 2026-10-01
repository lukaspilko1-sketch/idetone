// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adresa a podsložka webu se berou z proměnných prostředí (nastavené v GitHub Actions).
// Testovací provoz: SITE_URL=https://lukaspilko1-sketch.github.io, BASE_PATH=/idetone
// Ostrý provoz:     SITE_URL=https://idetone.cz, BASE_PATH=/
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
