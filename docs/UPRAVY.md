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

---

## Dávka 2 – logo, nové hero s kresbou, modely bez specifikací, texty ze starého úvodu, animace

**Stav:** SCHVÁLENO
**Datum:** 2. 10. 2026
**Podklady:** `podklady/obrazky/` (připraveno v Cowork):
- `kresba-sara-podpis-original.png` – originální screenshot kresby s podpisem (488 × 732 px, pozadí #EAE2DA)
- `kresba-sara.png` – kresba Sary s průhledným pozadím, tah v barvě grafit (378 × 561 px)
- `podpis-petr-kocourek.png` – podpis s průhledným pozadím (294 × 82 px)
- Rozlišení je nízké (výřez ze starého webu). Použij je max. v nativní velikosti × 1,5, zapiš `TODO(klient): originál kresby a podpisu ve vysokém rozlišení / vektor`.

### 2.1 Logo menší a „vcelku“ (priorita: vysoká)
- Značka **ideTone se píše vcelku, bez prostrkání** (`letter-spacing: 0`, případně −0,01 em). Platí všude: hlavička, patička, mobilní menu, OG obrázky, favicon text.
- Desktop nahoře menší než teď: cca `clamp(32px, 3.4vw, 48px)`, řez 600, písmo IBM Plex Mono beze změny. Po scrollu 22 px vlevo, mobil 26 px (po scrollu 20 px).
- Barvy zůstávají: „ide“ grafit, „Tone“ dub.
- Upravit `CLAUDE.md` a design tokeny (logo bylo popsané jako prostrkané).

### 2.2 Hero: kresba s podpisem místo fotky, bez tlačítek (priorita: vysoká)
- **Odstranit obě tlačítka** (Prohlédnout modely, Domluvit poslech).
- **Místo tmavého panelu s fotkou** světlé hero na `--c-len`: vlevo štítek „Reprosoustavy s citem pro hudbu“, H1 a úvodní věta (beze změny), vpravo `kresba-sara.png` a pod ní `podpis-petr-kocourek.png` (podpis menší, mírně vpravo, jako autorský podpis pod kresbou).
- Tmavý panel, skleněný štítek „Sara · sloupová reprosoustava“ a Ken Burns pozadí z hero zrušit. Ilustrace dílny se přesune do sekce Proces vývoje (2.5).
- Místo tlačítek jemná výzva ke scrollu: strojopis malými písmeny „Modely ↓“ (odkaz na `#modely`), ne tlačítko.
- Mobil: štítek, H1, věta, pod tím kresba (šířka cca 80 %), podpis.
- Hero zabírá max. jednu obrazovku (1280 × 800 i 375 × 812), kresba se nesmí oříznout.
- Data do `home.yaml` (obrázek, podpis, alt texty), ať jdou vyměnit v adminu.
- Alt: kresba „Tužková kresba páru reprosoustav Sara“, podpis „Podpis Petr Kocourek“.

### 2.3 Animace hero – kresba se „nakreslí“ (priorita: střední)
- Kresba se při načtení odkryje maskou zdola nahoru jako tah tužky (`mask-image` s posouvaným gradientem, 1,4 s, ease-out).
- Po ní se **podpis „napíše“**: maska zleva doprava, 1,1 s, start 0,9 s.
- Text vlevo nastoupí jako teď (fade + 12 px, rozestup 80 ms).
- Bez JS i při `prefers-reduced-motion` je vše vidět hned.

### 2.4 Modely: vedle sebe, fotka z hero, bez specifikací (priorita: vysoká)
- **Desktop (≥ 1024 px): Sara a Reva vedle sebe** ve dvou stejně širokých sloupcích, fotky zarovnané na spodní hranu (stejná „podlaha“), názvy na stejné výšce.
- **Sara: použij fotku, která byla dosud v hero** (pár Sary šikmo, dřevěné boky, `DSC_0800i`). Současná fotka Sary v sekci Modely se přesune do galerie detailu.
- Reva: obrysová kresba zůstává do dodání fotky.
- **Odstranit technické specifikace** (spodní kmitočet, citlivost, rozměry) u obou modelů. Zůstává: typ (štítek), název, úvodní věta, odkaz „Detail modelu →“. Specifikace jen na detailu a ve srovnání.
- Tlačítko „Porovnat modely“ zůstává pod sekcí.
- Opravit: velký produkt z hero už nepřesahuje do sekce Modely (rezervu ~180 px pod hero zrušit).

### 2.5 Texty ze starého úvodu idetone.cz (priorita: vysoká)
Zdroj: https://idetone.cz/ (staženo 2. 10. 2026, texty níže). Redakčně učesat jako v F2, neměnit význam ani první osobu.

**a) Nová sekce úvodu „Koncept“** (místo dosavadního samotného citátu, citát se stane jejím zvýrazněním):
> Vše souvisí se vším, rovnováha a synergie, snaha o konstruktérsky elegantní a čisté řešení, to jsou základní principy, které uplatňuji při vývoji, protože některé volby na začátku potom určují možnosti a řešení v pozdější fázi.
>
> Za základní atributy reprosoustav ideTone považuji výborné chování v poslechovém prostoru a z toho plynoucí univerzálnost. Další vlastností je, že reprosoustavy jsou neunavující pro dlouhodobý poslech. Zde upřednostňuji klid, hladkost a přirozený detail před efektností na první poslech. Ucelený a propojený charakter s pocitem jednopásmovosti je dalším neoddělitelným kritériem při vývoji reprosoustav.

Rozvržení: vlevo velký výrok „Klid, hladkost a přirozený detail před efektností na první poslech.“ (Familjen, velikost citátu), vpravo oba odstavce a podpis Petr Kocourek (lze použít `podpis-petr-kocourek.png` v menší velikosti). Odkaz „O ideTone →“.

**b) Nová sekce úvodu „Proces vývoje“** (skutečný postup → číslování 1–3 je zde v pořádku), tři kroky vedle sebe, každý s ilustrační fotkou:
1. **CAD design** – foto `dilna-hero.png`
   > Mechanický design a konstrukce probíhá v CAD systému. V této fázi je třeba vyřešit technické aspekty, ale zároveň i estetické nároky a výrobní postupy. Několik variant prochází důkladným výběrovým procesem a postupnou optimalizací. Akustický design je ovlivněn poznatky a nároky danými CT2034A a zároveň zkušenostmi.
   - `TODO(klient)`: „CT2034A“ je nejspíš norma **CTA-2034-A** (měření „spinorama“). Ověřit a opravit.
2. **Akustická měření** – foto `mereni.png`
   > Akustická měření a charakterizace měničů je nedílnou součástí procesu, stejně jako získání dat pro návrh frekvenčních filtrů jak v ose, tak i mimo osu. Návrh frekvenčních filtrů zohledňuje i vyzařování reprosoustavy mimo osu, protože to je určující pro zvuk reprosoustavy v reálných poslechových podmínkách.
3. **Poslechové testy** – foto `poslech-mistnost.png` nebo `hudba-gramofon.png`
   > Každá verze prochází poslechovými testy a je třeba mnoho iterací pro nalezení optima, které vyhovuje pro rozmanité hudební žánry a dlouhodobý poslech.

Na úvodu stačí zkrácené verze (1–2 věty), plné texty na stránce Technologie (sekce „Proces vývoje“).

**c) Stránka Technologie – nová kapitola „Principy konstrukce“** (před stávající kapitoly):
- **Měniče**
  > Kvalitní měniče, dobré měření, souběh parametrů, spolehlivost výrobce, to vše je základ. Technicky se zaměřuji na měniče s vynikající linearitou, bez breakupů, s nízkým zkreslením. Po zvukové stránce vybírám měniče spíše neutrálního, ale zároveň příjemného a bohatšího či barevnějšího charakteru. Důraz je kladen na sladění charakterů měničů v reprosoustavě.
- **Frekvenční filtry**
  > Frekvenční výhybka má být jen tak složitá, jak je nezbytně nutné. Strmost filtrů a kompenzace jsou určovány daným měničem, proto volím měniče bez breakupů, nevyžadující složité kompenzace a umožňující použití filtrů optimálně druhého řádu, které poskytují dobré prolnutí charakterů měničů, zvukově působí přirozeně a mají pěkný prostor bez tendence vypichovat detaily. Upřednostňuji kvalitní součástky a především jejich vhodné doplnění se zvukovým charakterem měničů.
- **Ozvučnice a doplňky**
  > Ozvučnice zásadním způsobem ovlivňuje chování měničů, proto je její návrh řešen již v úplném začátku. Kloubí se zde požadavky na akustické chování, ale i estetiku a vizuální dojem. Vhodný návrh zde podporuje dobré vlastnosti měničů, návrh filtrů a výsledné akustické vlastnosti.

**d) Pruh Poslech na úvodu + stránka Poslech – sestava ve studiu:**
> Reprosoustavy jsou ke slyšení v poslechovém studiu v Brně na zesilovači Pass Labs INT-25, CD/SACD zdroji Esoteric K-01XD, síťovém zdroji Accuphase PS-1200 a vše je propojeno kabeláží Ansuz. Vaše oblíbená CD a SACD s sebou!
- `TODO(klient)`: na starém webu „pračce Accuphase PS-1200“ – ověřit správné označení (síťový zdroj / regenerátor). Ověřit přesné názvy modelů.
- Sestavu dát do `settings.yaml` (studio.system) jako seznam, ať jde měnit v adminu. Na stránce Poslech jako tabulka strojopisem (Zesilovač / Zdroj / Napájení / Kabeláž).
- Tlačítko v pruhu: „Zarezervujte si poslech →“.

**Nové pořadí úvodu:** Hero → Modely → Koncept → Proces vývoje → Technologie (3 sloupce) → Poslech → patička. Hlídat délku stránky, sekce stručně.

### 2.6 Animace a nastavení systému (priorita: vysoká – vysvětlení)
- Animace z dávky 1 jsou na webu, ale v prohlížeči Lukáše se nezobrazují, protože systém hlásí `prefers-reduced-motion: reduce` (ve Windows vypnuté **Nastavení → Přístupnost → Vizuální efekty → Efekty animace**). Web to správně respektuje.
- Úprava: při `reduce` vypnout jen **pohyb** (posuny, parallax, Ken Burns, maska kresby), ale ponechat **jemné prolnutí průhlednosti** (opacity 300 ms) a hover stavy. To je v souladu s doporučením WCAG.
- Výsledek ověř v obou režimech (Playwright `reducedMotion: 'reduce'` i `'no-preference'`).

### Výstup dávky 2
1. Screenshoty úvodu na 375 / 768 / 1280 px (hero, modely, koncept, proces).
2. Záznam nebo popis animace kresby a podpisu.
3. Seznam nových `TODO(klient)`.
4. Lighthouse mobil pro úvod a Technologie.
