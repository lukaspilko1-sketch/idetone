// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adresa a podsložka webu se berou z proměnných prostředí (nastavené v GitHub Actions).
// Testovací provoz: SITE_URL=https://lukaspilko1-sketch.github.io, BASE_PATH=/idetone
// Ostrý provoz:     SITE_URL=https://idetone.cz, BASE_PATH=/
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';
// Cíl přesměrování s podsložkou (Astro ji k cíli redirectu sám nepřidá)
const withBase = (/** @type {string} */ path) => `${base.replace(/\/$/, '')}${path}`;

// Písma: soubory z balíčků @fontsource, servírované z vlastní domény (GDPR).
// Jen použité řezy a subsety latin + latin-ext (čeština). Astro k nim vygeneruje
// záložní písma se size-adjust (bez layout shiftu) a font-display: swap.
const subsets = {
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext':
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};

/**
 * @param {string} pkg název balíčku @fontsource
 * @param {number[]} weights
 */
function fontsource(pkg, weights) {
  const variants = weights.flatMap((weight) =>
    Object.entries(subsets).map(([subset, range]) => ({
      src: /** @type {[string]} */ ([
        `./node_modules/@fontsource/${pkg}/files/${pkg}-${subset}-${weight}-normal.woff2`,
      ]),
      weight,
      style: /** @type {'normal'} */ ('normal'),
      unicodeRange: /** @type {[string]} */ ([range]),
    })),
  );
  return {
    provider: fontProviders.local(),
    options: { variants: /** @type {[(typeof variants)[0], ...typeof variants]} */ (variants) },
  };
}

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  // Mimo sitemapu: děkovací stránka po odeslání formuláře
  integrations: [sitemap({ filter: (page) => !page.includes('/dekujeme/') })],
  // Staré URL z WordPressu → nové (GitHub Pages nemá serverové redirecty, Astro vygeneruje
  // stránky s meta refresh + canonical)
  redirects: {
    '/index.php/sara/': withBase('/reprosoustavy/sara/'),
    '/index.php/reva/': withBase('/reprosoustavy/reva/'),
    '/index.php/o-idetone/': withBase('/o-idetone/'),
    '/index.php/technologie/': withBase('/technologie/'),
    '/index.php/kontakty/': withBase('/kontakt/'),
    '/index.php/objednat/': withBase('/kontakt/#objednavka'),
  },
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      ...fontsource('familjen-grotesk', [500, 600]),
      name: 'Familjen Grotesk',
      cssVariable: '--font-heading',
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      ...fontsource('figtree', [400, 500]),
      name: 'Figtree',
      cssVariable: '--font-text',
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      ...fontsource('ibm-plex-mono', [400, 500]),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      fallbacks: ['Courier New', 'monospace'],
    },
  ],
});
