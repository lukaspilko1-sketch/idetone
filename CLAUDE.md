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

## Design tokeny (verze 0.3, mění se jen v `src/styles/tokens.css`)
- Len `#E9E6DF` (pozadí) · Papír `#F5F3EE` (karty) · Uhel `#262422` (teplý antracit; těžké plochy, CTA, patička; token `--c-uhel`, `Section tone="uhel"`)
- Dub `#A8743F` (akcent, „Tone“ v logu; text v odkazech `#8A5C2E`) · Grafit `#1F2421` (text) · Šalvěj `#8E9B88`
- Zaoblení 0–2 px, bez gradientů, bez emoji, bez stínů všude, jen světlý režim
- Logo: „ideTone“ strojopisem, prostrkané, „ide“ grafit + „Tone“ dub; komponenta `Logo.astro` (inline SVG, varianty `dark` / `light`). Výměna loga = přepsat jen `Logo.astro`
- Favicon: `public/favicon.svg` (T dubem na tmavé ploše), PNG verze generuje `npm run favicons`
- Pohyb jen dvakrát: odkrytí sekcí (`data-reveal`, řeší `Section`) a posun šipky v `Button`; vše vypnuté při `prefers-reduced-motion`

## Komponenty (`src/components/`)
- `Logo`, `Button` (`variant` primary/secondary, `tone` light/dark, `arrow`), `Section` (`tone` len/papir/uhel, `divider`, `space`, `width`), `ImageSlot` (`ratio` 4/5, 16/9, 1/1, 3/2, `label`, volitelně `src` + `alt`), `Header` (sticky, zmenšení po scrollu, mobilní menu přes celou obrazovku, bez JS vede „Menu“ do patičky), `Footer`
- Obsahové: `ProductFeature` (blok modelu, `variant` tall/compact – záměrně ne dvě stejné karty), `SpecTable`, `CompareTable` (generovaná z kolekce products, sticky první sloupec), `Gallery` (šipky, miniatury, swipe, lightbox `<dialog>`, bez JS odkazy na velké fotky; bez fotek ImageSlot), `Quote`, `WaveguideFigure` (SVG schéma zvukovodu), `PageHeader`, `TextBlock` (odstavce/seznam/podsekce z frontmatteru), `ContactForm` (`type` order/listening/custom; Formspree přes fetch + JSON, české validační hlášky, stavy odesílám/úspěch/chyba, honeypot `_gotcha`, souhlas GDPR, `?model=` předvyplní model, stojany jen u Revy; bez JS klasický POST)
- `BaseLayout` (`title`, `description` povinný, `noindex`, `image` OG, `ogType`, `crumbs` pro BreadcrumbList, `jsonLd`), `ProsePage` (právní stránky z Markdownu)
- SEO: canonical, OG + Twitter, JSON-LD (Organization na všech stránkách, LocalBusiness na úvodu/Poslech/Kontakt, Product + Offer u modelů, BreadcrumbList) v `src/utils/seo.ts`; hreflang se vypíše až s `features.english`
- OG obrázky 1200×630: `public/og/<id>.png`, předloha `/og-nahled/<id>/` (jen dev), generuje `npm run og` (po změně ceny, názvu nebo fotky modelu spustit znovu; nový model doplnit do `tests/og.gen.ts`)
- Přesměrování starých URL `/index.php/…`: `redirects` v `astro.config.mjs` (cíl přes `withBase()`, Astro k cíli podsložku nepřidá)
- Stránky mimo sitemapu / noindex: `/dekujeme/`, `/404`
- Přehled všech komponent: `/_styleguide/` (jen `npm run dev`, v produkčním buildu se negeneruje)

## Kde co je
- Schémata obsahu (Zod): `src/content.config.ts`
- Úvodní stránka – sekce, pořadí, `visible`: `src/content/home.yaml`
- Kontakty, adresa studia, firemní údaje, sociální sítě: `src/content/settings.yaml` (čte `getSettings()` z `src/utils/content.ts`; prázdné hodnoty se nezobrazí)
- Produkty (ceny, specifikace, galerie, texty Konstrukce jako `### bloky` v těle): `src/content/products/*.md`
- Stránky (texty, sekce, kroky): `src/content/pages/*.md`; šablony v `src/pages/`
- Feature flagy, navigace, Formspree ID: `src/config/site.ts`
- UI texty CZ/EN: `src/i18n/`
- Feature flagy: `journal`, `references`, `english` (vše zatím `false`); deník `src/pages/denik/` se při `false` negeneruje
- Pomocné funkce: `formatPrice()`, `typo()` (nezlomitelné mezery u jednotek a předložek), `paragraphs()`, `headedBlocks()` v `src/utils/format.ts`
- Fotky produktů: `src/assets/products/<model>/`, nahrávky z adminu `src/assets/uploads/`. Obrázky vždy přes `<Picture formats={['avif','webp']} fallbackFormat="webp">` (bez toho vznikají MB velké PNG)

## Jak na to
- **Změnit cenu**: `price` v `src/content/products/<model>.md` (číslo bez mezer)
- **Přidat fotku do galerie**: soubor do `src/assets/products/<model>/`, do `gallery` přidat `src` (relativní cesta) a `alt` (povinný)
- **Nahradit ImageSlot fotkou**: u stránek pole `imageSlot` vyměnit za `image: { src, alt }`; u produktu bez fotek doplnit `image` a `gallery`
- **Přidat model**: zkopírovat `sara.md` pod novým názvem (= URL), upravit data, přidat do `products` v `home.yaml` a do `nav` v `site.ts`
- **Skrýt sekci úvodu**: `visible: false` v `home.yaml`
- **Zapnout formuláře**: Formspree ID do `formspree` v `src/config/site.ts` (jen ID, ne celá URL)

## Příkazy
- `npm run dev`: vývojový server
- `npm run build` / `npm run preview`: produkční build a náhled
- `npm run check`: astro check + Prettier (kontrola), `npm run format`: Prettier přepíše soubory
- `npm run todo`: výpis všech `TODO(klient)`, `TODO(lukas)` a `NÁVRH` v `src/`
- `npx playwright test`: všechny testy (proti dev serveru na portu 4321, spustí ho sám)
- `npm run screenshots`: screenshoty 390 / 768 / 1440 px do `screenshots/` (mimo git)
- `npm run favicons`: PNG favicony z `public/favicon.svg`
- `npm run og`: OG obrázky do `public/og/`

Pozor v Git Bashi: proměnné začínající `/` (např. `BASE_PATH=/idetone`) přepisuje na Windows cesty, spouštěj s `MSYS_NO_PATHCONV=1`.

Markdown (`*.md`) a `podklady/` Prettier neformátuje (kvůli typografii a nedotknutelným podkladům).
