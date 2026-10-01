# Správa webu ideTone.cz

Návod pro webmastera (Lukáš). Technické detaily a pravidla pro Claude Code jsou v `CLAUDE.md`, rozhodnutí a stav projektu v `idetone-rozhodnuti.md`.

## Rychlý přehled

| Co | Kde |
|---|---|
| Ceny, specifikace, texty modelů, fotky modelů | `src/content/products/sara.md`, `reva.md` |
| Úvodní stránka (texty, pořadí a skrytí sekcí) | `src/content/home.yaml` |
| Kontakty, adresa studia, firma, Facebook | `src/content/settings.yaml` |
| Texty stránek (Technologie, O ideTone, Poslech…) | `src/content/pages/*.md` |
| Formspree ID, navigace, feature flagy | `src/config/site.ts` |
| Barvy, písma, mezery, sklo | `src/styles/tokens.css` |
| Logo | `src/components/Logo.astro` |
| Fotky | `src/assets/products/<model>/` |

Po každé změně: commit + push do `main`. GitHub Actions web zkontroluje, sestaví a (je-li nasazení zapnuté) nasadí za 1–2 minuty. Když build spadne (např. chybí povinné pole), nasazená verze zůstane ta předchozí a v záložce **Actions** je u neúspěšného běhu napsané, který soubor a pole je špatně.

## Lokální práce

```bash
npm install
npm run dev
```

Web běží na http://localhost:4321/, přehled komponent na http://localhost:4321/_styleguide/.

Kontroly před pushem:

```bash
npm run check
```

```bash
npx playwright test
```

Pokud se změna stylu v prohlížeči neprojeví, restartujte `npm run dev` (na Windows s diakritikou v cestě se to občas stává).

## Časté úpravy

### Změnit cenu
V `src/content/products/<model>.md` upravte `price` – jen číslo bez mezer a měny (`227000`). Formát „227 000 Kč“ doplní web sám. Cenu stojanů najdete v `reva.md` u `accessories`.
Potom přegenerujte OG obrázek (náhled při sdílení), protože obsahuje cenu: `npm run og`.

### Přidat nebo vyměnit fotku modelu
1. Soubor (PNG s průhledným pozadím nebo JPG, ideálně 1500 px+) uložte do `src/assets/products/<model>/`.
2. V `src/content/products/<model>.md` přidejte do `gallery`:
   ```yaml
   - src: ../../assets/products/sara/nova-fotka.png
     alt: Popis, co je na fotce (povinné, česky)
   ```
3. Hlavní fotku karty určuje pole `image`. Revě zatím fotky chybí – po dodání doplňte `image` a `gallery` a smažte `imageSlotLabel` a `gallerySlots`.

Web fotky sám zmenší a převede na AVIF/WebP, originál velikost nehraje roli.

### Nahradit šedé místo pro fotku (ImageSlot)
Na stránkách (`src/content/pages/*.md`, `home.yaml`) vyměňte `imageSlot: { label, ratio }` za `image: { src, alt }`. Portrét Petra, dílna a studio jsou zatím přímo v šablonách (`src/pages/o-idetone.astro`, `poslech.astro`) – po dodání fotek je převedu do obsahu.

### Upravit texty úvodní stránky / skrýt sekci
`src/content/home.yaml` – každá sekce má `visible: true/false`, pořadí odpovídá pořadí v souboru. Pole `type` neměňte.

### Kontakty, telefon, IČO
`src/content/settings.yaml`. Prázdné hodnoty (`''`) se na webu nezobrazí – stačí doplnit a řádek se objeví (patička, Kontakt, strukturovaná data).

### Vyměnit logo
Přepište `src/components/Logo.astro` (dodané SVG vložte místo `<text>`, zachovejte varianty `dark` a `light`). Favicon: `public/favicon.svg`, potom `npm run favicons` a `npm run og`.

### Změnit barvy, písma, sklo
Jen v `src/styles/tokens.css`. Tmavá barva je `--c-uhel`, efekt skla řídí proměnné `--glass-*` (síla prosvítání dřeva `--glass-glow-opacity`, tmavost `--glass-tint`). Pozor na kontrast textu – po změně spusťte `npx playwright test tests/a11y.spec.ts`.

### Přidat nový model
1. Zkopírujte `src/content/products/sara.md` na `<nazev>.md` (název souboru = adresa `/reprosoustavy/<nazev>/`), upravte data a `order`.
2. Přidejte ho do `products` v `src/content/home.yaml` a do `nav` v `src/config/site.ts`.
3. Do `tests/og.gen.ts` přidejte id a spusťte `npm run og`.
Srovnávací tabulka, formuláře i sitemap se doplní samy.

## Formuláře (Formspree)

1. Na formspree.io (free tarif stačí) založte 3 formuláře: Objednávka, Poslech, Zakázka. Jako příjemce nastavte pkocourek@idetone.cz.
2. ID formuláře (část adresy za `/f/`, např. `xyzabcde`) vložte do `src/config/site.ts`:
   ```ts
   export const formspree = { order: 'xyzabcde', listening: '…', custom: '…' };
   ```
3. Commit + push. Do té doby formulář po odeslání zobrazí, že odesílání není aktivní, a odkáže na e-mail.

Poznámky:
- Free tarif: s JavaScriptem funguje vše (odeslání bez opuštění stránky, poděkování). Bez JavaScriptu skončí návštěvník po odeslání na stránce Formspree – vlastní děkovací stránku `/dekujeme/` použije Formspree jen v placeném tarifu.
- Antispam: skryté pole `_gotcha` (Formspree ho rozpozná sám). Pokud by chodil spam, zapněte v nastavení formuláře reCAPTCHA až jako poslední možnost (zadání ji nechce).
- V textu Ochrany osobních údajů je Formspree uvedený jako zpracovatel – ověřte podmínky (TODO v `ochrana-osobnich-udaju.md`).

## Feature flagy (`src/config/site.ts`)

| Flag | Co zapne |
|---|---|
| `journal: true` | Deník `/denik/` a články (`src/content/journal/*.md`, `draft: false`). Do menu je pak potřeba přidat odkaz v `nav`. |
| `references: true` | Sekci referencí (až budou skutečné citace v `src/content/references/`; komponentu je pak potřeba dokončit) |
| `english: true` | Odkazy `hreflang`; anglické stránky pod `/en/` zatím neexistují (UI texty jsou v `src/i18n/en.ts`) |

## Nasazení (GitHub Pages)

### Testovací provoz – první zapnutí
1. GitHub → repozitář `idetone` → **Settings → General**: repozitář musí být **Public** (GitHub Pages na soukromém repozitáři vyžaduje placený účet).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. **Settings → Secrets and variables → Actions → Variables → New repository variable**: `PAGES_DEPLOY` = `true`.
4. **Actions → Build a nasazení → Run workflow** (nebo jakýkoli push do `main`).
5. Web poběží na https://lukaspilko1-sketch.github.io/idetone/ s `noindex` (nebude ve vyhledávačích).

Proměnné, které workflow čte (když nejsou nastavené, platí výchozí testovací hodnoty):

| Proměnná | Testovací provoz | Ostrý provoz |
|---|---|---|
| `SITE_URL` | `https://lukaspilko1-sketch.github.io` | `https://idetone.cz` |
| `BASE_PATH` | `/idetone` | `/` |
| `PUBLIC_INDEXING` | `false` | `true` |
| `PAGES_DEPLOY` | `true` | `true` |

### Přepnutí na idetone.cz
Bez úprav kódu – jen proměnné, jeden soubor a DNS:
1. **Variables**: `SITE_URL` = `https://idetone.cz`, `BASE_PATH` = `/`, `PUBLIC_INDEXING` = `true`.
2. Vytvořte soubor `public/CNAME` s jediným řádkem `idetone.cz`, commit + push.
3. **DNS u registrátora** (doména idetone.cz):
   - 4× záznam **A** pro `idetone.cz`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - volitelně 4× **AAAA**: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - **CNAME** pro `www` → `lukaspilko1-sketch.github.io` (bez názvu repozitáře)
   - staré záznamy směřující na původní hosting (WordPress) odstraňte
4. **Settings → Pages → Custom domain**: `idetone.cz` → Save, po ověření DNS zaškrtněte **Enforce HTTPS** (certifikát může trvat až 24 h).
5. Ověřte: https://idetone.cz/ (bez `noindex`), https://idetone.cz/robots.txt (`Allow`), přesměrování https://idetone.cz/index.php/sara/ → `/reprosoustavy/sara/`.
6. V Google Search Console přidejte doménu a odešlete `https://idetone.cz/sitemap-index.xml`.

## Kontroly kvality

| Příkaz | Co dělá |
|---|---|
| `npm run check` | TypeScript/Astro kontrola + Prettier |
| `npx playwright test` | všechny testy (navigace, formuláře, přesměrování, přístupnost axe, layout od 320 px, screenshoty) |
| `npm run screenshots` | jen screenshoty 390 / 768 / 1440 px do `screenshots/` |
| `npm run build` + `npm run links` | kontrola interních odkazů a kotev v buildu |
| `npm run build` + `npm run lighthouse` | Lighthouse (mobil) pro všechny stránky, reporty do `lighthouse/` |
| `npm run todo` | seznam `TODO(klient)`, `TODO(lukas)` a `NÁVRH` |

Pro `links` a `lighthouse` s podsložkou: v Git Bashi `MSYS_NO_PATHCONV=1 BASE_PATH=/idetone npm run build` a stejně pro `npm run links` / `npm run lighthouse`.

## Vrácení chybné změny

```bash
git log --oneline
```

```bash
git revert <hash-commitu>
```

Potom push – web se vrátí do stavu před chybnou změnou. Nepoužívejte `git push --force`.
