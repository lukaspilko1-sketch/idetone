# CLAUDE.md – web ideTone.cz

Web českého výrobce high-end reprosoustav ideTone (Petr Kocourek, Brno). Spravuje Lukáš (webmaster).

## Nejdřív si přečti
- `idetone-rozhodnuti.md`: stav projektu a všechna rozhodnutí (jediný zdroj pravdy)
- `SUPERPROMPT.md`: kompletní zadání webu (design, stránky, obsah, formuláře, fáze)
- `podklady/old-web/`: texty a fotky ze starého webu (needitovat)

## Pravidla
- Komunikace s Lukášem česky, stručně, kroky číslované.
- Nic si nevymýšlej (parametry, ceny, citace, reference). Chybějící údaje označ `TODO(klient): …`, navržené texty `<!-- NÁVRH: ke schválení -->`.
- Pracuj po fázích ze `SUPERPROMPT.md` kap. 12, po každé fázi se zastav a ukaž screenshoty (390 / 768 / 1440 px).
- Na konci každé fáze aktualizuj tento soubor a `idetone-rozhodnuti.md` (stav, historie rozhodnutí, otevřené body).
- Commity malé, česky: `feat:`, `fix:`, `content:`, `style:`, `docs:`.

## Technologie
- Astro, statický výstup, vlastní CSS s tokeny (bez Tailwindu), minimum vanilla JS
- Content Collections: `products`, `pages`, `references` (skryté), `journal` (skryté)
- Písma self-hosted přes @fontsource: Familjen Grotesk (nadpisy), Figtree (text), IBM Plex Mono (data, logo)
- Formuláře: Formspree (ID v `src/config/site.ts`)
- Hosting: GitHub Pages přes GitHub Actions (`.github/workflows/deploy.yml`). Teď testovací provoz na `https://lukaspilko1-sketch.github.io/idetone/` s `noindex`; `public/CNAME` (idetone.cz) se přidá až při přepnutí domény
- Astro 7, Node 24 LTS (`.nvmrc`)
- `site` / `base` / indexace z proměnných prostředí `SITE_URL`, `BASE_PATH`, `PUBLIC_INDEXING` (viz `.env.example`); v Actions z proměnných repozitáře
- Všechny interní odkazy a cesty přes `url()` z `src/utils/url.ts` (kvůli podsložce `/idetone/`), nikdy natvrdo `/…`
- `robots.txt` generuje `src/pages/robots.txt.ts` podle `PUBLIC_INDEXING`
- Nasazení na Pages se zapne proměnnou repozitáře `PAGES_DEPLOY=true` (fáze F4)

## Design tokeny (verze 0.2, mění se jen v `src/styles/tokens.css`)
- Len `#E9E6DF` (pozadí) · Papír `#F5F3EE` (karty) · Jedle `#24342D` (těžké plochy, CTA, patička)
- Dub `#A8743F` (akcent, „Tone“ v logu; text v odkazech `#8A5C2E`) · Grafit `#1F2421` (text) · Šalvěj `#8E9B88`
- Zaoblení 0–2 px, bez gradientů, bez emoji, bez stínů všude, jen světlý režim
- Logo: „ideTone“ strojopisem, prostrkané, „ide“ grafit + „Tone“ dub; komponenta `Logo.astro`

## Kde co je
- Kontakty, adresa, Formspree ID, navigace, feature flagy: `src/config/site.ts`
- Produkty (ceny, specifikace, galerie): `src/content/products/*.md`
- UI texty CZ/EN: `src/i18n/`
- Feature flagy: `journal`, `references`, `english` (vše zatím `false`)

## Příkazy
- `npm run dev`: vývojový server
- `npm run build` / `npm run preview`: produkční build a náhled
- `npm run check`: astro check + Prettier (kontrola), `npm run format`: Prettier přepíše soubory
- `npm run todo`: výpis všech `TODO(klient)`, `TODO(lukas)` a `NÁVRH` v `src/`
- `npx playwright test`: testy a screenshoty (Playwright se doinstaluje ve fázi F1)

Markdown (`*.md`) a `podklady/` Prettier neformátuje (kvůli typografii a nedotknutelným podkladům).
