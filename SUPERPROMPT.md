# SUPERPROMPT – nový web ideTone.cz

> Zadání pro Claude Code. Verze 1.1 · 1. 10. 2026 (přidán admin panel a testovací provoz na github.io) · připravil Lukáš (webmaster) s Claude (Cowork)
> Vizuální směr je pracovní verze 0.2. Až klient dodá inspirační weby, upraví se jen tokeny v `src/styles/tokens.css`, struktura zůstane.

---

## 0. Než začneš

1. Přečti `CLAUDE.md` a `idetone-rozhodnuti.md` v kořeni repozitáře. `idetone-rozhodnuti.md` je jediný zdroj pravdy o rozhodnutích. Když se něco v tomto zadání liší, platí `idetone-rozhodnuti.md` a upozorni mě na rozpor.
2. Projdi složku `old-web/`: zdrojové kódy starých stránek (texty, specifikace, ceny) a obrázky.
3. Pracuj po fázích (kapitola 12). Na konci každé fáze se zastav, ukaž výsledek (screenshoty 390 / 768 / 1440 px) a počkej na schválení.
4. **Nic si nevymýšlej.** Parametry, ceny, adresy, citace a reference ber jen z podkladů. Co chybí, označ v kódu `TODO(klient): …` a zapiš do seznamu otevřených bodů v `idetone-rozhodnuti.md`.
5. Komunikuj se mnou česky, stručně, kroky číslované.

---

## 1. Kontext a cíl

**ideTone** je český výrobce high-end reprosoustav. Za značkou stojí Petr Kocourek z Brna, který po letech vývoje pod DIY značkou PKAudio začíná s komerční výrobou a prodejem. Claim: **„Reprosoustavy s citem pro hudbu“**.

- **Cíl webu:** získat poptávky a objednávky, domluvit poslech ve studiu v Brně, vysvětlit technické řešení a budovat důvěru v novou značku.
- **Cílová skupina:** audiofilové a milovníci hudby v ČR (později i v zahraničí), 35–65 let, technicky zdatní, rozhodují se dlouho, čtou specifikace a chtějí slyšet, než koupí. Kupují pár za 130–230 tisíc Kč.
- **Tón značky:** klidný, poctivý, řemeslný, technicky přesný bez marketingových superlativů. Petr píše v první osobě jednotného čísla („zohledňuji“, „přeji příjemný poslech“), tenhle hlas zachovej.
- **Kdo web spravuje:** webmaster (Lukáš). Klient obsah needituje sám, ale texty a produkty musí jít upravit v Markdownu bez zásahu do komponent.

---

## 2. Technologie a repozitář

| Oblast | Řešení |
|---|---|
| Framework | **Astro** (aktuální stabilní verze), čistě statický výstup (`output: 'static'`) |
| Styly | Vlastní CSS s custom properties (žádný Tailwind ani UI kit). Soubory `src/styles/tokens.css`, `base.css`, styly komponent ve `<style>` v `.astro` |
| JavaScript | Minimum, vanilla. Bez Reactu nebo Vue, pokud to není nutné. Web musí fungovat i bez JS (kromě galerie a odesílání formuláře přes fetch, kde je fallback klasický POST) |
| Obsah | Astro Content Collections: `products`, `pages`, `references` (skrytá), `journal` (skrytá) se Zod schématem |
| Obrázky | `astro:assets` (`<Image>` / `<Picture>`), AVIF + WebP, `srcset`, lazy loading mimo první obrazovku |
| Písma | **Self-hosting** přes `@fontsource` (žádné Google Fonts CDN, kvůli GDPR). Jen použité řezy, `font-display: swap`, preload hlavního řezu |
| Hosting | **GitHub Pages** na osobním účtu Lukáše, deploy přes GitHub Actions (`withastro/action`). Viz „Testovací provoz a přepnutí domény“ níže |
| Formuláře | **Formspree** (ID formulářů v `src/config/site.ts`, ne natvrdo v komponentách) |
| Kvalita | Prettier, `astro check`, Playwright pro screenshoty a základní testy |
| Node | LTS, verze zapsaná v `.nvmrc` a `package.json` (`engines`) |

**Repozitář:** založil ho Lukáš, ty pracuješ v existujícím. Kořen repozitáře = složka `idetone`.
- Složku `old-web/` přesuň do `podklady/old-web/` (zůstává v repu kvůli dohledatelnosti, nesmí jít do buildu).
- Na začátku zkontroluj, že nadřazená složka `Weby` (sama je git repo) má `idetone/` v `.gitignore`. Když ne, upozorni mě, sám to neměň.
- Commity malé, česky, ve tvaru `feat: …`, `fix: …`, `content: …`, `style: …`.

**Testovací provoz a přepnutí domény:**
1. **Teď:** veřejné repo na osobním GitHub účtu Lukáše, web běží jako testovací na `https://<uzivatel>.github.io/<repo>/`.
   - Projektová stránka běží v podsložce, proto `site` a `base` v `astro.config` ber z proměnných prostředí (`SITE_URL`, `BASE_PATH`), nastavených v GitHub Actions. Všechny odkazy a cesty k obrázkům generuj přes `import.meta.env.BASE_URL` (žádné natvrdo psané `/…`).
   - Testovací verze má `noindex, nofollow` (meta + `robots.txt` `Disallow: /`) a nesmí se dostat do vyhledávačů. Řízeno proměnnou `PUBLIC_INDEXING=false`.
   - Soubor `CNAME` zatím **nevytvářej**.
2. **Při přepnutí na idetone.cz** (udělá Lukáš, ty připravíš návod v `docs/SPRAVA.md`): `BASE_PATH=/`, `SITE_URL=https://idetone.cz`, `PUBLIC_INDEXING=true`, přidat `public/CNAME` s `idetone.cz`, nastavit DNS (A záznamy GitHub Pages + `www` CNAME), v GitHubu zapnout Custom domain a Enforce HTTPS. Přepnutí musí jít udělat změnou proměnných a jednoho souboru, bez úprav kódu.

**Struktura:**
```
src/
  config/site.ts          # kontakt, adresa, Formspree ID, feature flagy, navigace
  content/
    products/sara.md, reva.md
    pages/…               # delší texty (o-idetone, technologie, zakazkove-projekty, poslech)
    references/           # skryté
    journal/              # skryté
  components/             # Header, Footer, Logo, ProductCard, SpecTable, Gallery,
                          # CompareTable, ContactForm, ImageSlot, Section, Button, Quote
  layouts/BaseLayout.astro
  pages/                  # routy, CZ v kořeni, EN pod /en/ (zatím bez obsahu, vypnuté flagem)
  styles/tokens.css, base.css
  i18n/cs.ts, en.ts       # UI řetězce (tlačítka, labely formulářů, navigace)
public/robots.txt, favicon   # CNAME až při přepnutí domény
public/admin/                 # admin panel (fáze F5)
src/content/home.yaml         # sekce úvodní stránky jako data (kvůli adminu)
podklady/old-web/
```

---

## 3. Vizuální identita (pracovní verze 0.2)

**Směr: severské řemeslo – dřevo, len, klid.** Web má působit jako uklizená dílna a poslechová místnost zároveň. Žádná high-tech okázalost, žádné černé „gaming“ pozadí, žádné gradienty.

### 3.1 Barvy (tokeny v `tokens.css`)

| Token | Hex | Použití |
|---|---|---|
| `--c-len` | `#E9E6DF` | Pozadí stránek |
| `--c-papir` | `#F5F3EE` | Karty, formuláře, tabulky |
| `--c-jedle` | `#24342D` | Jediná „těžká“ barva: hero plocha s produktem, pruh Poslech, patička, primární tlačítko |
| `--c-dub` | `#A8743F` | Akcent: „Tone“ v logu, ceny, odkazy při hoveru, drobné detaily. Nepoužívat na plochy |
| `--c-grafit` | `#1F2421` | Text |
| `--c-salvej` | `#8E9B88` | Doplňková: štítky, linky grafů |
| `--c-line` | `#CFCAC0` | Linky, rámečky |
| `--c-muted` | `#5C635E` | Sekundární text |

- Kontrast textu min. WCAG AA. `--c-dub` na `--c-len` nesplňuje AA pro malý text, používej ho jen pro velký text a dekorativní prvky, pro odkazy v textu použij tmavší variantu `--c-dub-text: #8A5C2E`.
- Tmavý režim web **nemá** (vědomé rozhodnutí kvůli věrnosti barev dřeva). Nastav `color-scheme: light`.

### 3.2 Typografie

| Role | Písmo | Použití |
|---|---|---|
| Nadpisy | **Familjen Grotesk** 500 (600 jen výjimečně) | H1–H3, názvy modelů, velké citáty |
| Text | **Figtree** 400/500 | Odstavce, UI, formuláře |
| Data | **IBM Plex Mono** 400/500 | Specifikace, ceny, technické hodnoty, štítky, logo |

- Typová škála (fluid přes `clamp()`): 13 / 16 / 20 / 26 / 35 / 50 px (H1 na desktopu max. ~56 px).
- Šířka odstavce max. 65 znaků, `line-height` 1.6, nadpisy `text-wrap: balance`.
- Štítky (eyebrow) jsou strojopisem, verzálkami, s mírným prostrkáním (`letter-spacing: .06em`).
- Jednotky ve specifikacích typograficky správně: `41 Hz`, `87 dB/2,83 V/1 m`, `4 Ω`, `š 240 × v 1000 × h 383 mm`, česká desetinná čárka, nezlomitelná mezera mezi číslem a jednotkou.

### 3.3 Logo

- Převezmi stávající wordmark z hlavičky starého webu: text **„ideTone“** strojopisem, prostrkaný (`letter-spacing` ~0,42 em), **„ide“ v barvě `--c-grafit`, „Tone“ v `--c-dub`**.
- Vytvoř komponentu `Logo.astro` jako **inline SVG** (text převedený na křivky nebo `<text>` s fallbackem). Varianty: tmavá (na lnu) a světlá (na jedli, „ide“ v `#EDEAE3`).
- Grafik později dodá finální logo. Výměna musí znamenat přepsání jediného souboru.
- Favicon: „iT“ nebo „T“ v dubové barvě na jedlovém čtverci (SVG + PNG 32/180/192).

### 3.4 Obrázky

- Produktové fotky v `podklady/old-web/` jsou **vyříznuté s průhledným pozadím** (PNG RGBA). Pokládej je přímo na plochu (len nebo jedle) bez rámečků, s jemným `drop-shadow`.
- Kreslené ilustrace ze starého webu (tužkové skici reprosoustav) můžeš použít jako tichý doplněk, např. v sekci O ideTone nebo jako vodoznak. Ne v hero.
- **Komponenta `ImageSlot.astro`**: místo pro budoucí fotku s pevným poměrem stran (`4/5`, `16/9`, `1/1`, `3/2`). Když fotka chybí, zobrazí se jemný placeholder v barvě `--c-papir` s popiskem strojopisem (např. „Foto: Sara v obývacím pokoji, 16:9“). Výměna fotky = jen nový soubor a změna cesty v Markdownu.
- Ve frontmatteru produktu budou pole pro galerii (cesta + alt + poměr).
- Graf impedance (`Sara-Impedance.png`) zobraz jako obrázek se zvětšením. Výhledově SVG.

### 3.5 Layout a detaily, které web odliší od „AI šablony“

- **Ne všechno na střed a ne všechno stejný grid.** Základ je 12sloupcový grid s max. šířkou ~1200 px, ale:
  - Hero je asymetrický: text na lnu vlevo (~55 %), vpravo jedlová plocha, ze které produkt vyčnívá přes spodní hranu sekce.
  - Sekce Technologie střídá strany (text/obrázek, obrázek/text) a má jiný rytmus mezer.
  - Sara a Reva na úvodu **nejsou dvě stejné karty**: větší a menší blok s odlišným rozvržením podle tvaru produktu (Sara vysoká sloupová, Reva kompaktní na stojanu).
- **Karty jen tam, kde dávají smysl** (formulář, tabulka specifikací). Ostatní sekce jsou otevřené, oddělené linkou `1px var(--c-line)` a mezerou.
- **Zaoblení minimální** (0–2 px). Žádné `rounded-xl` všude, žádné stíny u každého bloku.
- **Tlačítka:** primární = plná jedle, sekundární = obrys grafitem. Hover: šipka `→` se posune o 4 px, jemná změna pozadí. Žádné gradienty, žádné „glow“.
- **Specifikace** jako tabulka strojopisem (label šedě vlevo, hodnota vpravo), jako měřicí protokol.
- **Bez emoji, bez ikon v kolečkách, bez „01 / 02 / 03“**, pokud nejde o skutečný postup (číslování smí mít jen kroky spolupráce u zakázkových projektů).
- **Pohyb jen dvakrát:**
  1. Jemné odkrytí sekcí při scrollu (opacity + posun 12 px, 400 ms, jednou). Obsah musí být viditelný i bez JS.
  2. Mikroanimace šipky na tlačítkách.
  - Vše vypnuté při `prefers-reduced-motion: reduce`.

---

## 4. Sitemapa a navigace

| URL | Stránka | V menu | Stav |
|---|---|---|---|
| `/` | Úvod | logo | spustit |
| `/reprosoustavy/` | Přehled modelů + srovnání | ano („Reprosoustavy“, podmenu Sara, Reva, Zakázkové projekty) | spustit |
| `/reprosoustavy/sara/` | Detail Sara | podmenu | spustit |
| `/reprosoustavy/reva/` | Detail Reva (+ stojany) | podmenu | spustit |
| `/zakazkove-projekty/` | Info + formulář | podmenu | spustit |
| `/technologie/` | Technologie | ano | spustit |
| `/poslech/` | Poslechové studio Brno + formulář | ano | spustit |
| `/o-idetone/` | O značce a autorovi | ano | spustit |
| `/kontakt/` | Kontakt + objednávkový formulář | ano (tlačítko „Objednat“ zvýrazněné) | spustit |
| `/obchodni-podminky/` | Obchodní podmínky | patička | placeholder `TODO(klient)` |
| `/ochrana-osobnich-udaju/` | GDPR | patička | připravit základní text, `TODO(klient)` na doplnění firemních údajů |
| `/denik/`, `/denik/[slug]/` | Novinky / deník vývoje | **ne** | **skryté**, viz kap. 9 |
| `/en/…` | Anglická verze | **ne** | **skryté**, viz kap. 9 |
| `/404` | Chybová stránka | – | spustit, s odkazy na modely a kontakt |

**Hlavička:** logo vlevo, menu vpravo, tlačítko „Objednat“ (sekundární styl). Hlavička je sticky, při scrollu se zmenší a dostane pozadí `--c-len` s linkou.
**Mobil:** logo vlevo, vpravo textové tlačítko „Menu“ (ne hamburger ikona), menu přes celou obrazovku na jedlovém pozadí.
**Patička (jedle):** logo (světlá varianta), claim, kontakt (Petr Kocourek, e-mail), adresa studia, Facebook, odkazy na právní stránky, © rok automaticky.

**Přesměrování ze starých URL** (GitHub Pages nemá serverové redirecty, použij `redirects` v `astro.config` → meta refresh + canonical):
- `/index.php/sara/` → `/reprosoustavy/sara/`
- `/index.php/reva/` → `/reprosoustavy/reva/`
- `/index.php/o-idetone/` → `/o-idetone/`
- `/index.php/technologie/` → `/technologie/`
- `/index.php/kontakty/` → `/kontakt/`
- `/index.php/objednat/` → `/kontakt/#objednavka`

---

## 5. Obsah stránek

Texty vytáhni z `podklady/old-web/*.html` (viditelný obsah stránek Elementoru). Redakčně je učeš (překlepy, interpunkce, jednotky, rozdělení na kratší odstavce), ale **neměň význam ani hlas autora**. Kde text chybí, napiš návrh, označ ho `<!-- NÁVRH: ke schválení -->` a dej ho do seznamu ke schválení.

### 5.1 Úvod `/`
1. **Hero**: štítek „Reprosoustavy s citem pro hudbu“, H1 (návrh: „Ručně laděné reprosoustavy z Brna“), jedna věta v první osobě (návrh: „Navrhuji, ladím a vyrábím dvoupásmové reprosoustavy, které nechají vyniknout hudbě i s jejím emočním nábojem.“), tlačítka „Prohlédnout modely →“ (primární) a „Domluvit poslech“. Vpravo jedlová plocha s vyříznutou fotkou (`DSC_0800i-1.png`), u ní strojopisem název modelu a cena.
2. **Modely**: Sara a Reva, fotka, jedna věta o zvukovém charakteru, 3 klíčové parametry strojopisem, cena za pár, odkaz na detail. Pod tím odkaz „Porovnat modely“.
3. **Přístup**: výrazný citát z textu O ideTone („Reprosoustava je složitý celek, ve kterém se protínají nejen čistě technické, ale i emoční a estetické aspekty.“), podpis Petr Kocourek, odkaz na O ideTone.
4. **Technologie**: tři řešení se střídáním stran: zvukovod u výškového reproduktoru, regulace výšek −1/0/+1 dB, bassreflex vyvedený dolů. Detail `DSC_0834-1.png` + `ImageSlot`. Odkaz na Technologie.
5. **Poslech**: jedlový pruh přes celou šířku: „Než se rozhodnete, poslechněte si je“ (návrh), adresa studia, tlačítko „Domluvit poslech“.
6. **Reference**: komponenta připravená, sekce **skrytá** (flag), dokud nebudou skutečné citace.
7. Patička.

### 5.2 Přehled `/reprosoustavy/`
- Krátký úvod, dvě produktové sekce (ne stejné karty), odkaz na Zakázkové projekty.
- **Srovnávací tabulka Sara × Reva**, generovaná z dat kolekce `products` (ne ručně psaná): koncept, výškový reproduktor, středobas, spodní kmitočet, citlivost, impedance, rozměry, hmotnost, regulace výšek, cena. Na mobilu se tabulka posouvá vodorovně a první sloupec zůstává na místě.
- Krátké doporučení „Který model pro mě?“ (podle velikosti místnosti a umístění). Text jako `NÁVRH`, ke schválení klientem.

### 5.3 Detail produktu `/reprosoustavy/[slug]/`
Šablona společná pro všechny modely, data z Markdownu:
1. Galerie vlevo (hlavní fotka + miniatury, ovládání šipkami i swipem, lightbox), vpravo název, popis, cena, tlačítko „Objednat“ (odkaz na `/kontakt/?model=sara#objednavka`, model se předvyplní) a „Domluvit poslech“.
2. Zvukový charakter jednou větou, velkým písmem (závěrečná věta „Výsledkem je reprosoustava, která…“).
3. Konstrukce: bloky Středobasový reproduktor, Výškový reproduktor, Ozvučnice, Konstrukce (texty ze starého webu).
4. Specifikace (komponenta `SpecTable`).
5. Měření: graf impedance (u Sary), u Revy `ImageSlot` „Graf impedance – dodá klient“.
6. U Revy blok **Stojany** (doplněk, 25 000 Kč/pár, stojany se prodávají jen k Revě).
7. Odkaz na srovnání a na jiný model.
8. Mobil: lišta s cenou a tlačítkem „Objednat“ přichycená dole.

### 5.4 Data produktů (frontmatter, schéma Zod)

| Pole | Sara | Reva |
|---|---|---|
| `name` | Sara | Reva |
| `type` | sloupová reprosoustava | kompaktní reprosoustava na stojan `TODO(klient): ověřit, na starém webu uvedeno „sloupová“, ale výška 440 mm a samostatné stojany` |
| `concept` | sloupová reprosoustava se zvukovodem, bassreflex | reprosoustava se zvukovodem, bassreflex |
| `ways` | 2 | 2 |
| `woofer` | středobasový 6,5″, ultra nízké zkreslení, papírová membrána `TODO(klient): v textu uvedeno „sedmipalcový“` | středobasový 7″, nízké zkreslení, papírová membrána |
| `tweeter` | páskový 7 cm², unikátní konstrukce pásku s komorou a zvukovodem, ultra nízké zkreslení, výborná linearita a uniformní vyzařování mimo osu | 1″ textilní kalota, zvukovod, ultra nízké zkreslení, výborná linearita a uniformní vyzařování mimo osu |
| `lowFrequency` | F−3 dB 41 Hz, F−6 dB 36 Hz (anechoic) | F−3 dB 44 Hz, F−6 dB 37 Hz (anechoic) |
| `impedance` | nominální 4 Ω, minimální 4 Ω na 170 Hz | nominální 4 Ω, minimální 4 Ω na 170 Hz |
| `crossover` | 3000 Hz, akustický druhý řád | 3000 Hz, akustický druhý řád |
| `sensitivity` | 87 dB/2,83 V/1 m | 87 dB/2,83 V/1 m |
| `dimensions` | š 240 × v 1000 × h 383 mm | š 240 × v 440 × h 360 mm |
| `weight` | 26 kg | 18 kg |
| `amplifier` | třída A, AB, D, výkon > 25 W | třída A, AB, D, výkon > 25 W |
| `trebleControl` | ano, −1 / 0 / +1 dB nad 2000 Hz | ne |
| `price` | 227 000 Kč / pár | 132 000 Kč / pár |
| `accessories` | – | stojany 25 000 Kč / pár |
| `tagline` | „…uchvátí čistotou, lehkostí, plností a transparentností zvukového projevu.“ | „…uchvátí hladkým, plným a energickým projevem.“ |

Cena se ukládá jako číslo (`227000`) a formátuje přes `Intl.NumberFormat('cs-CZ')`, ať jde později přepnout měnu pro EN.

**Text Revy:** úvodní odstavec je na starém webu skoro shodný se Sarou. Použij ho, ale označ `TODO(klient): vlastní popis Revy, čím se liší od Sary`.

### 5.5 Technologie `/technologie/`
Tři kapitoly s texty ze starého webu:
1. **Zvukovod ve spojení s výškovým reproduktorem**: problém přímovyzařujících výškových reproduktorů, kritické pásmo 2000–6000 Hz (ostrost, dopřednost, detailnost, srozumitelnost, klid), řešení zvukovodem, přínosy (lehkost a přirozenost bez ostrosti, menší nároky na akustiku místnosti). Doplň jednoduché **SVG schéma** vyzařování (přímovyzařující vs. zvukovod), čisté linky v barvách `--c-grafit` a `--c-dub`, bez vymyšlených čísel na osách.
2. **Nastavení úrovně výšek** (Sara): otočný přepínač vzadu, −1 / 0 / +1 dB nad 2000 Hz, přepínač mimo přímou signálovou cestu, kvalitní čtyřkontaktní přepínač.
3. **Bassreflex vyvedený dolů**: méně citlivá na umístění u stěny, netrpí zaduněním (text ze stránky Sara).
Po stranách `ImageSlot` pro detailní fotky.

### 5.6 O ideTone `/o-idetone/`
Text Petra Kocourka ze starého webu (cesta od DIY značky PKAudio, cíl značky, reprosoustava jako součást systému a prostoru), podpis „Přeji příjemný poslech, Petr Kocourek“. `ImageSlot` 4:5 pro portrét Petra a 3:2 pro dílnu. Opravit nedokončenou větu „…zkušeností získaných během.“ → `TODO(klient)`, navrhni „…získaných během let.“

### 5.7 Zakázkové projekty `/zakazkove-projekty/`
- Krátký úvod (NÁVRH): reprosoustava na míru prostoru, sestavě a vzhledu interiéru.
- Postup spolupráce (číslování zde dává smysl): 1. Konzultace, 2. Návrh, 3. Ladění v prostoru, 4. Výroba a předání. Texty jako NÁVRH.
- Formulář Zakázka (kap. 6).

### 5.8 Poslech `/poslech/`
- Poslechové studio: **Filipínského 59, Brno**, parkování v areálu Kaláb nebo na ulici.
- Mapa: **ne iframe** (GDPR, výkon). Statický obrázek mapy nebo jen odkaz „Otevřít v Mapy.cz“ a „Google Maps“.
- Možnost poslechu ve studiu nebo u zákazníka doma (NÁVRH, ověřit s klientem).
- Formulář Poslech (kap. 6).

### 5.9 Kontakt `/kontakt/`
- Kontaktní osoba: **pouze Petr Kocourek**, e-mail **pkocourek@idetone.cz**, telefon `TODO(klient)`.
- Adresa studia (viz výše), Facebook: https://www.facebook.com/profile.php?id=61573306168822
- Firemní údaje: název, IČO, DIČ → `TODO(klient)`. Řádky se nezobrazí, dokud jsou prázdné.
- Objednávkový formulář s kotvou `#objednavka` (kap. 6).

Všechny kontaktní údaje drž **na jednom místě** v `src/config/site.ts`.

---

## 6. Formuláře (Formspree)

Tři formuláře, jedna komponenta `ContactForm.astro` s typem (`order`, `listening`, `custom`):

| Formulář | Pole |
|---|---|
| **Objednávka** | Model (select Sara / Reva, předvyplněný z URL `?model=`), Stojany ano/ne (zobrazí se jen u Revy), Povrch/dýha (textové pole, `TODO` až budou varianty), Jméno a příjmení*, E-mail*, Telefon*, Poznámka |
| **Poslech** | Model (Sara / Reva / oba), Kde (ve studiu / u mě doma), Preferovaný termín (text, ne date picker), Jméno*, E-mail*, Telefon, Zpráva |
| **Zakázka** | Popis místnosti (rozměry, plocha), Současná sestava, Představa a rozpočet, Jméno*, E-mail*, Telefon, Zpráva |

Požadavky:
- Odeslání přes `fetch` na Formspree s JSON, bez reloadu. Fallback bez JS: klasický POST s `_next` na děkovací stránku.
- Stavy: odesílám (zablokované tlačítko), úspěch (text v místě formuláře: „Děkuji, ozvu se do 2 pracovních dnů.“ – NÁVRH), chyba (konkrétní, co se stalo a co udělat, s e-mailem jako záložní cestou).
- Validace HTML5 + vlastní hlášky česky, chyby u konkrétních polí, `aria-live`.
- Antispam: honeypot pole `_gotcha`, žádná CAPTCHA.
- Povinný checkbox souhlasu se zpracováním osobních údajů s odkazem na `/ochrana-osobnich-udaju/`.
- Předmět e-mailu podle typu: „ideTone – objednávka Sara“, „ideTone – poslech“, „ideTone – zakázka“.
- Formspree ID v `site.ts` jako placeholder `TODO(lukas): Formspree ID`. Do doby vyplnění formulář ukáže hlášku, že odesílání není aktivní (jen v dev režimu).

---

## 7. SEO, metadata, analytika

- Každá stránka: unikátní `<title>` („Sara – sloupová reprosoustava | ideTone“), meta description (do 155 znaků), canonical, Open Graph + Twitter karta (OG obrázek 1200×630 vygenerovaný ve stylu webu: len, logo, název modelu, produkt).
- `lang="cs"`, `hreflang` připravené pro EN (aktivní až po zapnutí EN).
- Schema.org JSON-LD: `Organization` + `LocalBusiness` (studio), `Product` s `Offer` (cena v CZK, `availability: PreOrder` – `TODO(klient)` ověřit), `BreadcrumbList`.
- `@astrojs/sitemap`, `robots.txt`.
- Analytika: zatím žádná. Připrav místo v `BaseLayout` pro budoucí nástroj bez cookies (Plausible / Umami). Žádná cookie lišta, pokud se nepoužijí cookies.

---

## 8. Kvalita, přístupnost, výkon

- **Lighthouse (mobil):** Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- **WCAG 2.2 AA:** sémantické HTML, jeden H1 na stránku, viditelný focus (`outline` v `--c-dub`), skip-link, alt texty u všech fotek (popisné, česky), ovládání galerie a menu klávesnicí, `aria-expanded` u menu.
- **Bez layout shiftu:** obrázky s rozměry, písma s fallback metrikami (`size-adjust`).
- Celková váha úvodní stránky do 1 MB (bez lazy obrázků).
- Funkční od 320 px šířky, bez vodorovného scrollu.

---

## 9. Skryté a budoucí funkce (feature flagy)

V `src/config/site.ts`:
```ts
export const features = {
  journal: false,     // Deník / novinky – stránky se negenerují, nejsou v menu ani sitemapě
  references: false,  // Sekce referencí na úvodu a u produktů
  english: false,     // /en/ verze + přepínač jazyka
};
```
- **Deník:** připrav kolekci `journal` (title, date, excerpt, cover, draft) a šablony výpisu a článku. Při `journal: false` se stránky nebuildí. Jeden ukázkový článek jako `draft: true`.
- **Reference:** kolekce `references` (jméno, město, model, citace, zdroj/odkaz). Prázdná.
- **EN:** Astro i18n (`defaultLocale: 'cs'`, `locales: ['cs','en']`, `prefixDefaultLocale: false`). UI řetězce v `src/i18n/`. Obsah EN zatím neexistuje, při `english: false` se `/en/` negeneruje.

---

## 9A. Admin panel pro klienta (fáze F5, až bude web hotový)

**Cíl:** Petr Kocourek si sám upraví texty, ceny, fotky a sekce bez znalosti kódu a bez Lukáše. Každá úprava se uloží jako commit do repozitáře a web se sám znovu sestaví a nasadí (GitHub Actions). Žádná databáze ani server, web zůstává statický.

### Příprava už od fáze F2 (důležité, jinak se admin nepovede napojit)
- **Veškerý obsah, který má klient měnit, musí být v datech, ne v komponentách:**
  - produkty: `src/content/products/*.md` (frontmatter + text),
  - delší stránky: `src/content/pages/*.md`,
  - **úvodní stránka jako seznam sekcí** v `src/content/home.yaml`: každá sekce má `type` (hero, models, quote, technology, listening, references), `visible: true/false`, pořadí dané pořadím v seznamu a vlastní pole (nadpis, text, tlačítka, obrázek),
  - kontakty, adresa, otevírací doba poslechů, sociální sítě: `src/content/settings.yaml` (ne natvrdo v `site.ts`; `site.ts` je jen načte),
  - UI řetězce zůstávají v `src/i18n/` (nemění klient).
- Obrázky nahrávané klientem jdou do `src/assets/uploads/` (zpracuje je `astro:assets`).
- Schémata Zod musí sedět s poli v adminu: nepovinná pole jako nepovinná, rozumné výchozí hodnoty, aby build nespadl kvůli prázdnému poli.
- Build musí selhat srozumitelně (název souboru a pole), když klient uloží nevalidní data. Nasazená verze zůstane ta předchozí.

### Doporučené řešení
| Varianta | Jak funguje | Plusy | Minusy |
|---|---|---|---|
| **Sveltia CMS** (doporučeno) | Admin na `idetone.cz/admin/`, konfigurace `public/admin/config.yml` (kompatibilní s Decap CMS), přihlášení přes GitHub | Běží přímo na webu, moderní a rychlé rozhraní, náhledy, nahrávání obrázků, zdarma | Na GitHub Pages potřebuje malý OAuth proxy (Cloudflare Worker `sveltia-cms-auth`, zdarma), nebo přihlášení osobním tokenem |
| **Pages CMS** (záloha) | Hostovaná služba pagescms.org, konfigurace `.pages.yml` v repu | Nulová infrastruktura, velmi jednoduché pro laika | Admin běží na cizí doméně, závislost na třetí straně |

Ve fázi F5 nejdřív ověř aktuální stav obou nástrojů (verze, podpora Astro Content Collections, čeština v rozhraní) a předlož mi krátké srovnání. Implementuj až po mém schválení.

### Co má admin umět
- **Úvodní stránka:** upravit texty sekcí, zapnout/vypnout sekci (`visible`), změnit pořadí sekcí, vyměnit obrázek.
- **Produkty:** cena, popisy, specifikace (pole odpovídají schématu z kap. 5.4), galerie (nahrát, seřadit, alt text), přidat nový model (šablona se stejnými poli).
- **Stránky:** O ideTone, Technologie, Poslech, Zakázkové projekty (Markdown editor s náhledem).
- **Nastavení:** kontakty, adresa studia, sociální sítě.
- **Reference a Deník:** přidávat položky; zapnutí sekce zůstává na Lukášovi (feature flag).
- Popisky polí a nápověda **česky** (`label`, `hint`), pole, která klient nemá měnit (slug, typ sekce), skrýt nebo zamknout.
- Validace v adminu: povinná pole, cena jako číslo, maximální délka meta popisu, povinný alt text u obrázků.
- Volitelně **editorial workflow** (koncept → ke schválení → publikovat), aby Lukáš mohl změny před zveřejněním zkontrolovat. Zapnout podle domluvy.

### Přístupy a bezpečnost
- Klient dostane vlastní GitHub účet a bude přidán do repozitáře jako collaborator (role Write). Lukáš zůstává vlastníkem.
- Větev `main` chráněná: žádné force-push ani mazání.
- Žádné tokeny ani tajné klíče v repozitáři. Údaje OAuth proxy jen v nastavení Cloudflare Workeru.
- Admin `/admin/` má `noindex` a je vyřazený ze sitemapy.

### Výstup fáze F5
- Funkční admin na testovací adrese, ukázka úpravy textu, ceny, obrázku a vypnutí sekce, a to celé až po nasazení.
- `docs/NAVOD-ADMIN.md` pro klienta: česky, krok za krokem, se screenshoty (přihlášení, úprava textu, výměna fotky, změna ceny, co dělat, když se změna neprojeví).
- Doplnění `docs/SPRAVA.md` pro Lukáše (správa přístupů, OAuth proxy, vrácení chybné změny přes git).

---

## 10. Co nedělat

- Žádné Inter, Roboto, Poppins, Space Grotesk ani systémový font jako hlavní písmo.
- Žádné fialové, modré ani neonové akcenty, žádné gradienty, glassmorphism, „glow“ efekty.
- Žádné stock fotky, AI generované obrázky reprosoustav ani vymyšlené reference, recenze či ocenění.
- Žádné vymyšlené technické parametry, čísla v grafech ani ceny.
- Žádné marketingové superlativy („nejlepší“, „revoluční“, „dokonalý zážitek“).
- Žádné iframy (mapy, YouTube) bez souhlasu, žádné externí trackery.
- Žádný carousel na úvodní stránce, žádné automatické přehrávání.
- Neupravuj `podklady/old-web/`.

---

## 11. Údržba dokumentace

- Na konci každé fáze aktualizuj:
  - `CLAUDE.md`: technická pravidla, struktura, příkazy, jak přidat produkt nebo fotku.
  - `idetone-rozhodnuti.md`: stav projektu, nová rozhodnutí do historie, otevřené body.
- Vytvoř `docs/SPRAVA.md` pro Lukáše: jak změnit cenu, přidat fotku, vyměnit logo, zapnout deník / EN / reference, vyplnit Formspree ID, nasadit.
- Seznam všech `TODO(klient)` a `NÁVRH` generuj skriptem `npm run todo` (grep přes `src/`).

---

## 12. Postup po fázích

| Fáze | Obsah | Výstup ke schválení |
|---|---|---|
| **F0 – Příprava** | Kontrola repa a `.gitignore` v nadřazené složce, Astro projekt, struktura složek, přesun `old-web/` do `podklady/`, Prettier, GitHub Actions workflow (zatím bez nasazení), `CNAME` | Strom projektu, `npm run dev` běží |
| **F1 – Design system** | Tokeny, písma, `base.css`, Logo, Button, Section, ImageSlot, Header, Footer, BaseLayout, stránka `/_styleguide` (jen v dev) se všemi komponentami | Screenshoty styleguide a hlavičky/patičky (390/768/1440) |
| **F2 – Obsah a stránky** | Content collections, extrakce textů z `old-web`, všechny stránky ze sitemapy, galerie, SpecTable, CompareTable, SVG schéma zvukovodu | Screenshoty všech stránek + seznam `TODO` a `NÁVRH` |
| **F3 – Formuláře, SEO, redirecty** | ContactForm (3 typy), děkovací stavy, JSON-LD, OG obrázky, sitemap, redirecty ze starých URL, 404 | Ukázka formulářů ve všech stavech, výpis meta tagů |
| **F4 – QA a nasazení** | Playwright testy (navigace, formuláře, redirecty), Lighthouse, kontrola přístupnosti (axe), kontrola odkazů, `docs/SPRAVA.md` včetně návodu na přepnutí domény, nasazení na testovací `https://<uzivatel>.github.io/<repo>/` s `noindex` | Report: skóre Lighthouse, výsledky testů, URL náhledu, otevřené body |
| **F5 – Admin panel** | Až po schválení hotového webu: srovnání Sveltia CMS / Pages CMS, implementace vybraného řešení podle kap. 9A, OAuth proxy, `docs/NAVOD-ADMIN.md` | Ukázka úprav v adminu až po nasazení, návod pro klienta |

Na konci každé fáze napiš:
1. Co je hotové (stručně).
2. Screenshoty.
3. Co je `TODO(klient)` / `NÁVRH`.
4. Rozhodnutí, která jsi udělal sám, a proč.
5. Otázky na mě.

---

## 13. Otevřené body (k 1. 10. 2026)

- Inspirační weby od klienta → úprava tokenů (barvy, písma, mezery).
- Nové fotky (atmosféra, interiér, dílna, detaily dřeva, portrét Petra) a logo od grafika.
- Vlastní text Revy, typ Revy (sloupová vs. kompaktní na stojan).
- Sara: středobas 6,5″ (specifikace) vs. „sedmipalcový“ (text).
- Telefon, firemní údaje (název, IČO, DIČ), obchodní podmínky.
- Formspree účet a ID formulářů (Lukáš).
- Graf impedance Revy.
- Dostupnost / dodací lhůta (pro schema.org a texty).
- Název repozitáře na GitHubu (Lukáš) → testovací URL a `BASE_PATH`.
- GitHub účet pro klienta (kvůli adminu, fáze F5).
