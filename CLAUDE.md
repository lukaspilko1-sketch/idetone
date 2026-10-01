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
- Písma self-hosted přes @fontsource: Familjen Grotesk 500/600 (nadpisy), Figtree 400/500 (text), IBM Plex Mono 400/500 (data, logo). Načítá je Astro Fonts API (`fonts` v `astro.config.mjs`, provider `local` se soubory z `node_modules/@fontsource`, subsety latin + latin-ext). CSS proměnné `--font-heading`, `--font-text`, `--font-mono`; komponenta `<Font>` v `BaseLayout`. Nový řez = přidat váhu do `fontsource(…)` v configu
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
- Logo: „ideTone“ strojopisem, prostrkané, „ide“ grafit + „Tone“ dub; komponenta `Logo.astro` (inline SVG, varianty `dark` / `light`). Výměna loga = přepsat jen `Logo.astro`
- Favicon: `public/favicon.svg` (T dubem na jedli), PNG verze generuje `npm run favicons`
- Pohyb jen dvakrát: odkrytí sekcí (`data-reveal`, řeší `Section`) a posun šipky v `Button`; vše vypnuté při `prefers-reduced-motion`

## Komponenty (`src/components/`)
- `Logo`, `Button` (`variant` primary/secondary, `tone` light/dark, `arrow`), `Section` (`tone` len/papir/jedle, `divider`, `space`, `width`), `ImageSlot` (`ratio` 4/5, 16/9, 1/1, 3/2, `label`, volitelně `src` + `alt`), `Header` (sticky, zmenšení po scrollu, mobilní menu přes celou obrazovku, bez JS vede „Menu“ do patičky), `Footer`
- `BaseLayout` (`title`, `description`, `noindex`)
- Přehled všech komponent: `/_styleguide/` (jen `npm run dev`, v produkčním buildu se negeneruje)

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
- `npx playwright test`: všechny testy (proti dev serveru na portu 4321, spustí ho sám)
- `npm run screenshots`: screenshoty 390 / 768 / 1440 px do `screenshots/` (mimo git)
- `npm run favicons`: PNG favicony z `public/favicon.svg`

Pozor v Git Bashi: proměnné začínající `/` (např. `BASE_PATH=/idetone`) přepisuje na Windows cesty, spouštěj s `MSYS_NO_PATHCONV=1`.

Markdown (`*.md`) a `podklady/` Prettier neformátuje (kvůli typografii a nedotknutelným podkladům).
