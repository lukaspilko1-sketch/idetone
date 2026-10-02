# Úpravy webu ideTone – zadání pro Claude Code

Úpravy se ladí v Cowork (Lukáš + Claude) a sem se zapisují po dávkách. Claude Code provádí jen dávky se stavem **SCHVÁLENO**.
Po dokončení dávky: zapsat do `idetone-rozhodnuti.md` (historie rozhodnutí), u dávky změnit stav na **HOTOVO** a doplnit stručný výsledek.

Pokyn pro Claude Code: *„Přečti docs/UPRAVY.md a proveď dávku N.“*

---

## Dávka 1 – hlavička, modely, animace, typografie na mobilu, ilustrační fotky

**Stav:** HOTOVO (2. 10. 2026)
**Datum:** 2. 10. 2026

**Výsledek:**
- 1.1 Hlavička pevně nahoře (obsah má rezervu, zmenšení nic neposouvá): desktop velké logo na střed (Plex Mono 600, `clamp(40px, 5.4vw, 68px)`, prostrkání 0,3 em), vpravo Objednat, pod tím menu verzálkami 14 px; po scrollu jeden řádek s logem 22 px vlevo, světlé sklo 0,88 + blur 16 px + linka. Mobil logo 28 → 18 px na střed, vpravo „Menu“. Hero na 1280×800 ukazuje nadpis i tlačítka.
- 1.2 `showPrices: false` v `home.yaml` (ceny na úvodu vypnuté, štítek v hero „Sara · sloupová reprosoustava“); název modelu `--fs-model` 48 → 96 px; Sara a Reva vedle sebe (7 : 5, Reva odsazená s linkou), sekce na 1280 px 1 148 px (z toho ~180 px rezerva pod produktem přesahujícím z hero, dříve ~1 700 px); Reva = obrysová kresba „Foto připravujeme“ (úvod, přehled, detail).
- 1.3 Ken Burns pozadí hero (28 s, max. 1,08), nástup prvků hero (80 ms rozestup, do 700 ms), produkt se vynoří a má parallax; odhalení fotek clip-path; hover modelů; View Transitions (fotka modelu přejde do galerie detailu); komponenta `HeroMedia` s podporou videa. Vše bez knihoven, vypnuté při `prefers-reduced-motion`.
- 1.4 Sémantické tokeny písma (`--fs-body`, `--fs-lead`, `--fs-data`, `--fs-small`, `--fs-label`, `--fs-legal`, `--fs-quote`, `--fs-model`) na všech stránkách; citát v Figtree 400 s větším řádkováním.
- 1.5 7 ilustrací v `src/assets/uploads/ai/` s `placeholder: true` (výpis v `npm run todo`), jemné sjednocení `--photo-ai-filter`; Technologie na úvodu = jedna fotka + tři sloupce s odkazy. Na produktových místech AI fotky nejsou.
- Lighthouse mobil: úvod 98 / 100 / 100 / 100, Sara 96 / 100 / 100 / 100; axe bez nálezů; 97 funkčních testů zelených.
**Kontext:** design se bude dál ladit podle oblíbených webů klienta. Úpravy dělej přes tokeny a komponenty, ať jde vzhled později snadno měnit.

### 1.1 Hlavička: velké logo na střed, menu pod ním (priorita: vysoká)
Inspirace: focal.com, dynaudio.com. Nový brand je potřeba výrazně ukázat.
- **Desktop (≥ 1024 px), nahoře na stránce:** dvouřádková hlavička.
  - 1. řádek: logo uprostřed, výrazně větší než teď (výška písma cca 40–48 px, prostrkání zachovat). Vpravo tlačítko „Objednat“, vlevo nic nebo jen prázdné místo (symetrie).
  - 2. řádek: hlavní menu uprostřed (Reprosoustavy ▾, Technologie, Poslech, O ideTone, Kontakt), verzálky nebo kapitálky, mírné prostrkání, tenká linka pod hlavičkou přes celou šířku (`--c-line`).
- **Po scrollu (sticky):** hlavička se zmenší do jednoho řádku: menší logo **vlevo** (schváleno Lukášem), menu vpravo, „Objednat“. Plynulý přechod (výška, velikost loga), žádné skákání obsahu.
- **Vizuální předloha:** artifact „ideTone – náhled hlavičky“ (Cowork, 2. 10. 2026). Hodnoty z náhledu: logo nahoře **výrazné jako Focal / Dynaudio** – IBM Plex Mono (písmo beze změny) řez 600, `font-size: clamp(40px, 5.4vw, 68px)`, prostrkání 0,3 em; po scrollu 22 px; menu 14 px verzálky, prostrkání 0,09 em; hlavička po scrollu světlé sklo `rgb(233 230 223 / .88)` + blur 16 px + spodní linka; mobil: logo 28 px na střed, vpravo „Menu“, po scrollu logo 18 px. Náhled je orientační, výsledek dolaď v rámci tokenů.
- **Čitelnost po scrollu:** světlé sklo zesílit nebo dát plnou barvu `--c-len` + spodní linku. Logo ani menu nesmí splývat s obsahem pod hlavičkou.
- **Mobil:** logo uprostřed (větší než teď, ale do jednoho řádku), vpravo „Menu“, vlevo nic. Menu přes celou obrazovku zůstává.
- Logo zůstává komponenta `Logo.astro` (budoucí výměna za logo od grafika = jeden soubor).
- Hero se posune o výšku hlavičky, na první obrazovce musí zůstat vidět nadpis i tlačítka (1280×800).

### 1.2 Modely na úvodu bez cen, výraznější název (priorita: vysoká)
- Na úvodní stránce **nezobrazovat ceny** (sekce Modely ani štítek v hero). Cena jen na detailu produktu, v přehledu `/reprosoustavy/` a ve srovnávací tabulce.
- Řídit přepínačem v `home.yaml` (např. `showPrices: false`), ať to jde v adminu vrátit.
- Štítek v hero: místo ceny jen název modelu + krátký typ („Sara · sloupová reprosoustava“).
- **Název modelu jako značka:** výrazně větší (na desktopu cca 72–96 px, na mobilu 48–56 px), Familjen Grotesk 500, mírně zúžené prostrkání (`letter-spacing: -0.02em`). Typ modelu nad názvem jako štítek strojopisem.
- Sekci Modely zhustit: menší fotky, Sara a Reva blíž u sebe, dva odlišné bloky (Sara vysoká, Reva kompaktní). Cílová výška sekce na desktopu do ~1100 px (teď ~1700 px).
- Dokud chybí fotka Revy: místo šedého rámečku decentní obrysová kresba (SVG silueta kompaktní reprosoustavy na stojanu, tenká linka `--c-line`), popisek „Foto připravujeme“.

### 1.3 Oživení webu: animace (priorita: střední)
Cíl: živější a modernější dojem, ale klidný a prémiový. Žádné efekty pro efekt.
- **Hero – živé pozadí:** rozostřená fotka dřeva za sklem se velmi pomalu posouvá a zvětšuje (Ken Burns, smyčka 25–30 s, max. scale 1.08). Produkt v hero při scrollu jemný parallax (pomalejší posun než text).
- **Hero – nástup při načtení:** štítek, nadpis, text a tlačítka postupně (fade + posun 12 px, rozestup 80 ms, celkem do 700 ms). Produkt se „vynoří“ zespodu (translate + opacity).
- **Připravit komponentu `HeroMedia`** s podporou krátkého videa (webm/mp4, `muted autoplay loop playsinline`, poster obrázek). Až budou záběry z dílny, nahradí fotku jednou změnou v `home.yaml`.
- **Fotky produktů při scrollu:** odhalení clip-path zdola nahoru (600 ms), jednou.
- **Hover na modelech:** fotka se jemně zvětší (scale 1.03), u názvu se posune šipka.
- **Přechody mezi stránkami:** Astro View Transitions (`<ClientRouter />`), fotka modelu na úvodu plynule přejde do galerie na detailu (`transition:name`).
- Vše čisté CSS + IntersectionObserver, žádná těžká knihovna (GSAP jen pokud bez ní nejde, nejdřív se zeptej).
- `prefers-reduced-motion: reduce` = vše vypnuto, obsah viditelný hned. Obsah musí být viditelný i bez JS.
- Lighthouse Performance nesmí klesnout pod 95 (mobil), žádný layout shift.

### 1.4 Typografie na mobilu: sjednotit velikosti (priorita: vysoká)
Změřeno na 375 px (úvodní stránka):

| Prvek | Teď | Problém |
|---|---|---|
| Úvodní text hero, popisy modelů | 18,1 px | jiná velikost než ostatní odstavce |
| Texty technologií, pruh Poslech, patička | 16 px | – |
| Parametry modelů (strojopis) | 13 px | na mobilu příliš malé, špatně čitelné |
| Poznámka „Parkování…“ | 13 px | příliš malé |
| Citát | 28 px, název sekce H2 také 28 px | citát splývá s nadpisy |
| Název modelu | 36 px = stejně jako H1 | po úpravě 1.2 bude větší |

Pravidla (platí pro celý web, nastavit v tokenech):
- **Odstavce:** jedna velikost všude, 17 px na mobilu / 18 px na desktopu (`--fs-body`). Perex (úvodní věta stránky) jen o stupeň větší (`--fs-lead`, 19–20 px), používat jen pro první odstavec stránky.
- **Strojopis (parametry, štítky):** minimálně 14 px na mobilu, štítky verzálkami 13 px s prostrkáním jen pro krátké popisky (1–3 slova).
- **Drobný text** (poznámky, patička): minimálně 14 px. 13 px jen pro copyright a právní odkazy.
- **Citát:** odlišit od nadpisů (větší řádkování, kurzíva nebo lehčí řez, nebo velikost mezi H1 a H2).
- Projít **všechny stránky** (ne jen úvod) a nahradit natvrdo zadané velikosti tokeny. Výsledek doložit tabulkou velikostí na 375 px.

### 1.5 Ilustrační fotky místo prázdných rámečků (priorita: střední)
- Fotky jsou vygenerované v `podklady/ai-obrazky/` (zkontrolováno v Cowork 2. 10. 2026: obsah odpovídá promptům, žádné reprosoustavy, obličeje ani nápisy). Pořadí odpovídá číslům v `PROMPTY-CHATGPT.md`. **Nejdřív je přejmenuj** a zkopíruj do `src/assets/uploads/ai/`:

| Původní soubor | Nový název | Obsah | Použití |
|---|---|---|---|
| `Obrázek ChatGPT … 09_12_42-1.png` | `dilna-hero.png` | dílna, ponk s dýhami, okno vlevo | pozadí hero (rozostřené), O ideTone |
| `… 09_12_43-2.png` | `dilna-vyhybka.png` | ruce pájí cívky a kondenzátory | úvod – Technologie, stránka Technologie, O ideTone |
| `… 09_12_44-3.png` | `drevo-detail.png` | hrana ořechové desky, len, tužka | Zakázkové projekty, dekorace |
| `… 09_12_45-4.png` | `poslech-mistnost.png` | křeslo, gramofon, prázdná stěna | pruh Poslech, stránka Poslech |
| `… 09_12_45-5.png` | `mereni.png` | měřicí mikrofon, notebook s grafem | stránka Technologie |
| `… 09_12_46-6.png` | `hudba-gramofon.png` | detail přenosky a desky | sekce s citátem, O ideTone |
| `… 09_12_47-7.png` | `zakazka-navrh.png` | skici, vzorky dýh, pravítko | Zakázkové projekty |

- Rozlišení je 1122–1672 px (méně, než žádaly prompty). Nepoužívej je přes celou šířku nad ~1600 px, v hero jen rozostřené pod sklem.
- Fotky jsou teplejší a sytější než paleta webu. Sjednoť je jemně v CSS (např. `filter: saturate(.85)`) nebo při zpracování, ne ruční úpravou souborů.
- Zapoj je místo `ImageSlot` placeholderů podle sloupce „Použití“ v souboru s prompty. Fotky zpracuj přes `astro:assets` jako ostatní.
- Každá taková fotka má v datech `placeholder: true` a `source: "AI ilustrace – nahradit"`. Skript `npm run todo` je vypíše jako fotky k výměně.
- **Na produktových místech (Sara, Reva, přepínač, bassreflex) AI fotky nepoužívat**, zůstávají současné fotky nebo SVG silueta z 1.2.
- Úvodní stránka – sekce Technologie: zkrátit na tři sloupce (krátký text + odkaz), jedna skutečná fotka (detail výškového reproduktoru `DSC_0834`) nebo AI fotka „ruce při ladění výhybky“. Plné střídání stran nechat jen na stránce `/technologie/`.

### Výstup dávky 1
1. Screenshoty úvodu na 375 / 768 / 1280 px (nahoře i po scrollu, hlavička v obou stavech).
2. Krátké video nebo GIF animací v hero (nebo popis, pokud nejde nahrát).
3. Tabulka velikostí písma na 375 px po úpravě.
4. Lighthouse mobil pro úvod a detail Sary.
5. Seznam rozhodnutí, která jsi udělal sám.
