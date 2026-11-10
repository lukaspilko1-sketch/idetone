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

**Stav:** HOTOVO (2. 10. 2026)
**Datum:** 2. 10. 2026

**Výsledek:**
- 2.1 Logo vcelku (bez prostrkání), desktop `clamp(32px, 3.4vw, 48px)`, po scrollu 22 px, mobil 26 → 20 px; OG obrázky přegenerované.
- 2.2 Světlé hero bez tlačítek: štítek, H1, věta, „Modely ↓“; vpravo kresba Sary (nativní velikost, nezvětšená) a podpis. Tmavý panel, štítek a Ken Burns zrušené (komponenta `HeroMedia` odstraněna). Hero se vejde na 1280 × 800 i 375 × 812.
- 2.3 Kresba se „nakreslí“ maskou zdola (1,4 s), podpis se „napíše“ zleva (1,1 s od 0,9 s), text nastupuje postupně. Čisté CSS.
- 2.4 Modely ve dvou stejných sloupcích, fotka i silueta na stejné podlaze, názvy ve stejné výšce, bez specifikací (i v přehledu modelů – srovnávací tabulka je hned pod tím). Sara = fotka z hero (DSC_0800i), v galerii detailu první. Rezerva pod hero zrušena.
- 2.5 Nové sekce Koncept a Proces vývoje (nové pořadí úvodu), Principy konstrukce a plný Proces vývoje na Technologiích, sestava studia v `settings.yaml` (`studio.system`) a jako tabulka na Poslechu, tlačítko „Zarezervujte si poslech“.
- 2.6 Při `prefers-reduced-motion: reduce` jen prolnutí průhlednosti (300 ms) a hover, bez posunů a masek; ověřeno testy v obou režimech.
- Lighthouse mobil: úvod 99 / 100 / 100 / 100, Technologie 99 / 100 / 100 / 100; 99 funkčních testů zelených.
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

---

## Dávka 3 – doladění úvodu (CTA, hero, zaoblení, sklo)

**Stav:** HOTOVO (2. 10. 2026) – varianty vybral Lukáš: 3.3 a), 3.4 A+B

**Výsledek:**
- 3.1 V hlavičce primární tlačítko „Domluvit poslech →“ (`/poslech/#formular`), desktop vpravo v obou stavech, na mobilu první položka menu. Řídí `headerCta` v `site.ts` (`showHeaderOrder` zrušeno).
- 3.2 Text v hero svisle na střed vůči kresbě; hero max. jedna obrazovka, kresba se neořízne (1280 × 800, 1536 × 864, 375 × 812, 768 × 1024).
- 3.3 Druhý řádek: „Emoce i klid. Hodiny poslechu bez únavy.“ (`home.yaml`).
- 3.4 Varianta A+B: zrnitost papíru (jen hero), teplé světlo za kresbou, jemná mřížka 32 px v oválu a kóty 1000 mm / 240 mm z `sara.md` (`dimensions`), kóty se objeví po dokreslení (600 ms od 3,2 s). Každou vrstvu lze vypnout v `home.yaml` (`decor`). Na mobilu menší kóty. **Kóty následně na pokyn Lukáše vypnuté** (`decor.dimensions: false`), mřížka zůstává.
- 3.5 Tokeny `--radius-m` 12 px a `--radius-s` 6 px (+ `--radius-xs` 4 px pro checkboxy) na celém webu, `--radius` a `--radius-btn` odstraněny. Produkty a kresba bez zaoblení.
- 3.6 Sklo hlavičky po scrollu 0,94 a blur 20 px.
- Lighthouse mobil úvod: 100 / 100 / 100 / 100 (Technologie 98 / 100 / 100 / 100); 99 funkčních testů zelených.
**Datum:** 2. 10. 2026
**Poznámka:** podstránky (detail modelů, Technologie, Poslech, Kontakt) budou až v další dávce, po zpětné vazbě klienta na prototyp.

### 3.1 CTA v hlavičce „Domluvit poslech“ (priorita: vysoká, schváleno)
- Místo skrytého „Objednat“ zobrazit v hlavičce tlačítko **„Domluvit poslech →“** (primární styl, plná barva `--c-uhel`), odkaz na `/poslech/#formular`.
- Desktop: vpravo v obou stavech hlavičky (nahoře i po scrollu). Mobil: v hlavičce jen „Menu“, tlačítko „Domluvit poslech“ jako první položka v mobilním menu.
- Řídit v `site.ts` (`headerCta: { label, href }`), `showHeaderOrder` nahradit.

### 3.2 Hero: text svisle na střed (priorita: vysoká, schváleno)
- Levý sloupec (štítek, nadpis, věta) **svisle vycentrovat** vůči kresbě. Žádný další výplňový text.
- Výška hero: na desktopu max. jedna obrazovka pod hlavičkou, kresba se nesmí oříznout.

### 3.3 Druhý řádek nadpisu místo „Na celý život.“ (priorita: vysoká)
- Varianty (vybere Lukáš, případně klient):
  - a) „Emoce i klid. Hodiny poslechu bez únavy.“ (doporučeno – vychází z Petrova textu „neunavující pro dlouhodobý poslech“)
  - b) „Emoce i klid.“
  - c) „Emoce i klid. Navrženo a laděno v Brně.“
  - d) „Emoce i klid. Hudba, která neunaví.“
- Vybraná varianta: **a)**. Text v `home.yaml`.

### 3.4 Decentní pozadí hero (priorita: střední)
- Varianty v náhledu:
  - 0 – bez pozadí (současný stav)
  - A – **papír a světlo**: jemná zrnitost papíru (SVG šum, `mix-blend-mode: multiply`, opacity cca 0,2) + teplé světlo za kresbou (radiální gradient `rgb(255 251 243)`)
  - B – **technický výkres**: jemná mřížka 32 px (6 % grafit) maskovaná do oválu za kresbou + kóty se skutečnými rozměry Sary (výška 1000 mm, šířka 240 mm) strojopisem v `--c-dub-text`
  - C – **A + kóty** (doporučeno): papír, světlo a kóty bez mřížky
- Vybraná varianta: **A+B** (papír, světlo, mřížka i kóty).
- Kóty brát z dat produktu (`dimensions` v `sara.md`), ne natvrdo. Kóty se objeví až po dokreslení kresby (fade 600 ms, od cca 3 s).
- Zrnitost jen v hero (ne na celém webu), musí jít vypnout v `home.yaml`.
- Na mobilu světlo a kóty pod textem u kresby; kóty zmenšit nebo skrýt, pokud by překážely.

### 3.5 Sjednocené zaoblení (priorita: střední, schváleno)
- Manufaktura = měkčí, přátelštější dojem (zaoblené hrany dřeva Sary). Dvě hodnoty pro celý web:
  - `--radius-m: 12px` – tlačítka, karty, fotky (i AI ilustrace a zástupná místa), galerie, lightbox, srovnávací tabulka (obal)
  - `--radius-s: 6px` – štítky, pole formuláře, checkboxy (4 px), drobné prvky
- Vyříznuté produkty na průhledném pozadí a kresba **bez** zaoblení. Linky a oddělovače beze změny.
- Odstranit `--radius: 2px` a `--radius-btn`, nahradit novými tokeny všude.

### 3.6 Zesílit sklo hlavičky (priorita: nízká, schváleno)
- Po scrollu `--glass-light` z 0,88 na cca 0,94 a blur 20 px, aby přes hlavičku neprosvítal obsah (např. podpis z hero na tabletu). Spodní linka zůstává.

### Výstup dávky 3
1. Screenshoty úvodu na 375 / 768 / 1280 px.
2. Lighthouse mobil úvodu.

---

## Dávka 4 – výraznější dubový akcent

**Stav:** HOTOVO (2. 10. 2026) – schváleno pokynem Lukáše „proveď dávku 4“

**Výsledek:**
- 4.1 Primární tlačítka (hlavička „Domluvit poslech“, odeslání formulářů, hlavní CTA) v `--c-dub-text` #8A5C2E s textem #F5F0E8 (5,07 : 1), hover `--c-dub-deep` (7,07 : 1). Sekundární beze změny.
- 4.2 Pruh Poslech na úvodu a pruh s adresou na stránce Poslech z ořechového dřeva (`Section tone="dub"`). **Odchylka:** světlý konec gradientu ztmaven z #9C6A3A na #8A5C2E – s #9C6A3A měl text #F5F0E8 jen 3,95 : 1 (AA vyžaduje 4,5). Nový gradient `#8A5C2E → #74492A → #5E3D22`, text 5,07–6,78 : 1. Malý text na dubu v plné #F5F0E8 (`--c-on-wood-muted` #E3D3BF má na dubu jen 3,93 : 1 – jen pro velký text). Tlačítko na dubu #F5F0E8 / #6E4826 (7,07 : 1), skleněná karta 7 % / hrana 18 %. Patička zůstává antracit. Ilustrace poslechové místnosti za sklem pruhu odstraněna.
- 4.3 Štítky sekcí a typy modelů v `--c-dub-text` (4,61 : 1 na lnu), čísla kroků Procesu 40 px Familjen v `--c-dub`, nad krokem linka 2 px `color-mix(dub 45 %, linka)`, šipky u názvů modelů a podtržení odkazů v dubu. Teplé světlo v hero nechané beze změny (do dubu působilo žlutě).
- 4.4 Tokeny `--c-dub-deep`, `--c-on-wood`, `--c-on-wood-muted`, `--wood-gradient`, `--btn-primary-*`, `--c-eyebrow`, `--c-link-underline`, `--c-step-line`, `--glass-*-wood` – dub jde ztlumit jen v `tokens.css`.
- axe (WCAG 2.2 AA) bez nálezů na všech stránkách (390 i 1440 px); 99 testů zelených.
**Datum:** 2. 10. 2026
**Cíl:** víc teplé hnědé barvy z loga („Tone“), web živější a víc „dřevěný“. Dub zůstává akcentem, ne hlavní barvou: max. **jedna dubová plocha na stránce**, kotvou zůstává antracit (patička).

### 4.1 Primární tlačítka v dubu
- Primární CTA (hlavička „Domluvit poslech“, odeslat formulář, hlavní tlačítka sekcí): pozadí `--c-dub-text` #8A5C2E, text `#F5F0E8`, hover `--c-dub-deep` #6E4826.
- Pozor na kontrast: světlý dub #A8743F s bílým textem **nesplňuje** AA (cca 3,3 : 1), proto tmavší #8A5C2E (cca 5,3 : 1). Ověřit axe.
- Sekundární tlačítka (obrys grafitem) beze změny.

### 4.2 Pruh Poslech jako ořechové dřevo
- Pozadí pruhu Poslech na úvodu (a hero/pruh na stránce Poslech): gradient `linear-gradient(135deg, #9C6A3A 0%, #7C522D 55%, #5E3D22 100%)` místo antracitu.
- Text `#F5F0E8`, sekundární text `#E3D3BF`, skleněná karta s adresou zůstává (bílá 7 %, hrana 18 %). Tlačítko na dubu světlé (`#F5F0E8`) s textem `#6E4826`.
- Kontrast textu změřit v nejsvětlejším místě gradientu (min. 4,5 : 1 pro běžný text).
- Patička zůstává antracit `--c-uhel` (tmavá kotva pod dubovým pruhem).

### 4.3 Drobné dubové detaily
- Štítky sekcí (eyebrow: „Modely“, „Proces vývoje“…) a typy modelů v `--c-dub-text`.
- Čísla kroků v Procesu vývoje velká (cca 40 px Familjen) v `--c-dub`; nad krokem linka 2 px v namíchané barvě dub/linka (`color-mix(in srgb, var(--c-dub) 45%, var(--c-line))`).
- Šipky u názvů modelů a odkazy „Detail modelu“ v dubu (už jsou), podtržení odkazů v dubu.
- Volitelně: teplé světlo v hero lehce do dubu (jen pokud nebude působit žlutě).

### 4.4 Tokeny
- Nové tokeny: `--c-dub-deep: #6E4826`, `--c-on-wood: #F5F0E8`, `--c-on-wood-muted: #E3D3BF`, `--wood-gradient`.
- Vše jen přes tokeny, ať jde dub snadno ztlumit, pokud klient řekne, že je ho moc.

### Výstup dávky 4
1. Screenshoty úvodu a stránky Poslech (375 / 1280 px).
2. Výsledky axe (kontrast tlačítek a textu na dubu).

---

## Dávka 5 – druhý řádek hero, prémiově pomalejší animace

**Stav:** HOTOVO (2. 10. 2026) – zadání Lukáše přímo v Claude Code
**Datum:** 2. 10. 2026

### 5.1 Hero – druhý řádek nadpisu
- Text „Emoce i klid. Hodiny poslechu bez únavy.“ → **„Emoce | Klid | Hodiny poslechu bez únavy“** (`home.yaml`).
- Menší písmo (0,56 × hlavní nadpis), barva dub (`--c-dub-text`, oddělovače `|` v `--c-dub`), větší mezera nad řádkem (`--space-4`).
- Části se nezalamují uvnitř, řádek se láme jen za oddělovačem (na mobilu „Emoce | Klid |“ / „Hodiny poslechu bez únavy“).

### 5.2 Pomalejší animace mimo hero (prémiový, klidný dojem)
- Odkrytí sekcí 0,7 → 1,4 s a posun 12 → 24 px, odkrytí fotek 1 → 1,8 s, zvětšení fotky modelu 0,7 → 1,2 s, hover tlačítek / odkazů / šipek 180 → 450 ms, přechod mezi stránkami 0,4 → 0,7 s, změna hlavičky 320 → 500 ms, prolnutí při omezeném pohybu 0,5 → 0,9 s.
- Měkčí dojezd `--ease-calm`. Animace v hero beze změny.
- Vše v tokenech (`tokens.css`), testy (99) zelené.

---

## Dávka 6 – navázání podpisu, pomalejší menu a CTA, Proces vývoje bez čísel

**Stav:** HOTOVO (2. 10. 2026) – zadání Lukáše přímo v Claude Code
**Datum:** 2. 10. 2026

- 6.1 Podpis v hero začíná dřív (`--delay-sign` 2,6 → 1,9 s), aby navázal na dokreslování kresby (3,2 s).
- 6.2 Pomalejší přechody: horní menu – podtržení, barva a podmenu 700 ms (`--dur-menu`); všechna CTA tlačítka včetně odeslání formuláře a posunu šipky 800 ms (`--dur-cta`); fotky v sekci Modely – zvětšení při najetí 1,8 s a odkrytí fotek 2,4 s. Měkký dojezd `--ease-calm`.
- 6.3 Proces vývoje (úvod i Technologie, komponenta `ProcessSteps`) bez číslování a bez oddělovacích čar. Číslovaný „Postup spolupráce“ na Zakázkových projektech ponechán (není to Proces vývoje).
- Testy (99) zelené.

---

## Dávka 7 – zkrácený druhý řádek hero

**Stav:** HOTOVO (2. 10. 2026) – zadání Lukáše přímo v Claude Code
**Datum:** 2. 10. 2026

- „Hodiny poslechu bez únavy“ → **„Poslech bez únavy“** – druhý řádek hero je teď „Emoce | Klid | Poslech bez únavy“ (`home.yaml`).
- Řádek se nezalamuje ani na mobilu: písmo max. 0,56 × nadpis, zmenší se jen pokud by se nevešel do šířky (`min(0.56em, 5.8cqi)`). Ověřeno na 320 / 375 / 768 / 1536 px (na 375 px plná velikost cca 20 px, na 320 px 17 px).
- Testy (99) zelené.

---

## Dávka 8 – větší logo na mobilu

**Stav:** HOTOVO (2. 10. 2026) – zadání Lukáše přímo v Claude Code
**Datum:** 2. 10. 2026

- Logo v hlavičce na mobilu o 50 % větší: nahoře 32 → 48 px, po scrollu 24 → 36 px. Na velmi úzkých displejích se zmenší podle šířky (`min(48px, 13vw)`, na 320 px 42 px), aby nekolidovalo s „Menu“.
- Hlavička na mobilu úměrně vyšší (5,25 rem, po scrollu 4 rem). Desktop beze změny.
- Ověřeno na 320 / 375 / 430 px (logo vždy aspoň 8 px od „Menu“), testy (99) zelené.


---

## Dávka 9 – symetrie, patička, formulář Kontakt, podpis O ideTone, mezery na mobilu, SEO texty, obchodní podmínky

**Stav:** HOTOVO 9.1–9.8 (záloha) a 9.10 (6. 11. 2026); 9.8 nasazení textů a 9.9 čekají – viz Výsledek. Původně: SCHVÁLENO vcelku (Lukáš, 6. 11. 2026). Body 9.1–9.7 a 9.10 provést hned; 9.8 nasadit jen položky se Schváleno = ANO v `docs/SEO-TEXTY.md` (dokud nejsou vyplněné, udělat jen zálohu); 9.9 až po doplnění údajů klientem.
**Datum:** 6. 11. 2026
**Podklady (Cowork):** `docs/SEO-TEXTY.md` (porovnání textů, sloupec Schváleno), `docs/OBCHODNI-PODMINKY-NAVRH.md` (návrh obchodních podmínek), zdroj `docs/Obchodní podmínky.txt`.

### 9.1 Modely na úvodu – popisy a odkazy na stejné výšce (desktop)
- Změřeno na 1280 px: popis Sary má 2 řádky, Revy 1 řádek → „Detail modelu Sara“ je na y 1656, „Detail modelu Reva“ na y 1627 (rozdíl 29 px).
- Řešení rozvržením, ne zkracováním textu: oba bloky jako grid s řádky `štítek / název / popis / odkaz` přes **subgrid** (nebo `grid-template-rows` sdílené mezi sloupci), popis zabere stejnou výšku v obou sloupcích, odkaz zarovnaný na společnou linku.
- Na mobilu (jeden sloupec) beze změny.

### 9.2 Technologie na úvodu – „Víc o řešení“ na stejné výšce (desktop)
- Změřeno: odkazy na y 3669 / 3612 / 3589 (rozdíl až 80 px).
- Stejné řešení jako 9.1: tři sloupce se sdílenými řádky (nadpis / text / odkaz), odkaz `align-self: end`. Nadpisy na stejné základní lince, i když se některý zalomí na dva řádky.

### 9.3 Patička – symetrie a rozvržení
- Teď: značka 475 px, sloupce 171 / 171 / 272 px, různé výšky obsahu.
- Nově na desktopu **4 stejně široké sloupce** (`repeat(4, 1fr)`, stejná mezera): 1) logo + claim, 2) Kontakt (Petr Kocourek, e-mail, telefon, až bude), 3) Poslechové studio (adresa + odkaz na mapu), 4) Stránky – odkazy **ve dvou sloupcích** (8 odkazů → 2 × 4), aby sloupec nebyl vyšší než ostatní.
- Nadpisy sloupců na stejné lince a stejným stylem (štítek strojopisem), obsah zarovnaný nahoře.
- Spodní řádek: vlevo `© 2026 ideTone`, vpravo Obchodní podmínky · Ochrana osobních údajů · Facebook, svisle na střed, linka nad ním přes celou šířku obsahu.
- Tablet: 2 × 2 sloupce. Mobil: jeden sloupec, menší mezery (viz 9.7).

### 9.4 O ideTone – podpis
- Pod „Přeji příjemný poslech, Petr Kocourek“ přidat `podpis-petr-kocourek.png` stejně jako v sekci Koncept na úvodu (stejná velikost, stejná animace „napíše se“ při vjetí do obrazovky, alt „Podpis Petr Kocourek“). Jméno textem zůstává (kvůli čitelnosti a SEO).

### 9.5 Kontakt – jednoduchý obecný formulář
- Na stránce Kontakt nahradit objednávkový formulář **obecným formulářem na dotaz**, co nejjednodušším:
  - Jméno a příjmení * · E-mail * · Telefon (nepovinné) · Zpráva * · souhlas se zpracováním osobních údajů * · tlačítko „Odeslat zprávu →“.
  - Žádný výběr modelu, stojanů ani povrchu. Petr Kocourek vše doladí se zákazníkem individuálně.
- Odkazy „Objednat“ z detailu Sary a Revy vedou na Kontakt s parametrem `?model=sara`. Formulář pak jen **předvyplní zprávu** („Mám zájem o reprosoustavy Sara.“), zákazník ji může upravit. Předmět e-mailu „ideTone – dotaz (Sara)“.
- Formuláře na stránkách Poslech a Zakázkové projekty zjednodušit také (viz 9.10).
- Nadpis a texty stránky podle `docs/SEO-TEXTY.md` (K1–K3).

### 9.6 Symetrie na desktopu (všechny stránky)
- Projít všechny stránky na 1280 a 1536 px a sjednotit:
  - levý okraj nadpisů sekcí, štítků a obsahu na jednu linku (žádné „odskočené“ bloky),
  - bloky vedle sebe vždy se stejnou výškou nebo zarovnané na společnou spodní linku (karty, kroky, sloupce s odkazy),
  - mezery mezi sekcemi přes jeden token (`--section-space`), ne ručně.
- Výstup: seznam nalezených míst před a po (screenshoty).

### 9.7 Mobil – méně zbytečných mezer
- Změřeno na 375 px (úvod): mezi koncem obsahu jedné sekce a začátkem další je **190–225 px** (spodní padding 64 px + prázdné místo ~40 px + odsazení prvního obsahu 65–122 px). Výška úvodu 7 618 px.
- Cíl na ≤ 768 px: mezera mezi obsahem sekcí cca **80–96 px**, uvnitř sekce mezi nadpisem a obsahem 24–32 px, mezi bloky (modely, kroky) 40–48 px. Hero: zmenšit horní odsazení obsahu.
- Cíl výšky úvodu na mobilu cca −20 % (≈ 6 000 px), bez zmenšování písma.
- Platí pro všechny stránky (tokeny mezer pro mobil).

### 9.8 SEO texty (až po schválení v `docs/SEO-TEXTY.md`)
1. **Nejdřív záloha:** zkopírovat celý `src/content/` do `podklady/texty-puvodni/2026-11-06/` (mimo build) a vytvořit git tag `texty-puvodni-2026-11-06`. Do `docs/SPRAVA.md` doplnit, jak texty obnovit.
2. Nasadit **jen položky se Schváleno = ANO** (nebo s vlastní úpravou Lukáše). Položky NE nechat.
3. Titulky stránek: zkontrolovat, že se k `seoTitle` nepřidává „| ideTone“ dvakrát a že je výsledek do ~65 znaků.
4. V3 (vlastní text Revy) nasadit jen pokud ho schválí Petr Kocourek, jinak ponechat TODO.

### 9.9 Obchodní podmínky (až po schválení a doplnění údajů)
- Text z `docs/OBCHODNI-PODMINKY-NAVRH.md` (část „Obchodní podmínky“, bez tabulky změn) vložit do `src/content/pages/obchodni-podminky.md`.
- Dokud v textu zůstávají `[…]` (IČO, sídlo, datum, záruka), stránka ukazuje současnou hlášku „Obchodní podmínky připravujeme…“ a `npm run todo` je vypíše.
- Formulář pro odstoupení od smlouvy jako samostatná příloha (stránka nebo PDF ke stažení), podle návrhu.

### 9.10 Zjednodušit formuláře Poslech a Zakázkové projekty
- Stejná komponenta a stejná pole jako na Kontaktu: Jméno a příjmení * · E-mail * · Telefon (nepovinné) · Zpráva * · souhlas *.
- Lišit se smí jen nadpis, text tlačítka a předvyplněná zpráva / nápověda v poli Zpráva:
  - Poslech: tlačítko „Domluvit poslech →“, nápověda „Napište, kdy by se vám poslech hodil a co rádi posloucháte.“, předmět „ideTone – poslech“.
  - Zakázkové projekty: tlačítko „Odeslat poptávku →“, nápověda „Popište místnost, současnou sestavu a vaši představu.“, předmět „ideTone – zakázka“.
- Zrušit pole pro termín, studio / doma, rozměry místnosti, sestavu a rozpočet. Petr vše doladí se zákazníkem individuálně.
- Formspree může zůstat jeden formulář pro všechny tři stránky (rozlišení podle předmětu), nebo tři ID – podle toho, co je teď v `site.ts`.

### Výstup dávky 9
1. Screenshoty úvodu, O ideTone, Kontaktu a patičky na 375 / 1280 px.
2. Výška úvodu na 375 px před a po.
3. Lighthouse mobil a axe pro úvod a Kontakt.
4. Na konci commitnout i `docs/UPRAVY.md`, `docs/SEO-TEXTY.md` a `docs/OBCHODNI-PODMINKY-NAVRH.md`.

### Výsledek dávky 9 (Claude Code, 6. 11. 2026)
- **9.1** Sloupce modelů na úvodu stejně vysoké (`.pf--column`: tělo jako flex sloupec, odkaz `margin-top: auto`). Na 1280 px: popisy Sara / Reva y 1683 / 1683, „Detail modelu“ 1740 / 1740 (dřív rozdíl 29 px). Místo subgridu flex, protože tělo bloku má animaci odkrytí (`display: contents` by ji zrušil). Mobil beze změny.
- **9.2** Technologie: `.tech__col` jako subgrid (nadpis / text / odkaz) od 768 px. Na 1280 px nadpisy 3556 ×3, texty 3613 ×3, „Víc o řešení“ 3769 ×3 (dřív rozdíl až 80 px).
- **9.3** Patička: desktop 4 stejné sloupce (272 px), nadpisy štítkem strojopisem na jedné lince (logo 1 px rozdíl), obsah nahoře; u studia odkaz „Mapa (Mapy.cz)“; Stránky ve dvou sloupcích po 4 (řazení po sloupcích). Spodní řádek svisle na střed, linka přes celou šířku. Tablet 2 × 2, mobil 1 sloupec s menšími mezerami. **Odchylka:** mezi 1024 a 1279 px se dva sloupce odkazů do 1/4 šířky nevejdou („Zakázkové projekty“ + „Technologie“) → tam jsou odkazy pod sebou.
- **9.4** O ideTone: pod jménem podpis `podpis-petr-kocourek.png` (10 rem jako v Konceptu, alt „Podpis Petr Kocourek“, pole `signature.image` v `o-idetone.md`). Animace „napíše se“ při vjetí do obrazovky je nová společná `[data-reveal-sign]` (maska jako u podpisu v hero, `--dur-sign`, zpoždění `--delay-reveal-sign` 600 ms) – stejná i v Konceptu na úvodu, kde dřív animace nebyla. Při omezeném pohybu jen prolnutí, bez JS vidět hned.
- **9.5** Kontakt: obecný formulář „Napište mi“ (NÁVRH nadpisu) – jméno*, e-mail*, telefon (nepovinné), zpráva*, souhlas*, „Odeslat zprávu →“. `?model=sara` předvyplní „Mám zájem o reprosoustavy Sara.“ a předmět „ideTone – dotaz (Sara)“. Kotva `#objednavka` → `#formular` (odkazy Objednat z detailů, přesměrování `/index.php/objednat/`, `orderLink`). Titulek a popis stránky podle K1–K2 (`docs/SEO-TEXTY.md`; nasazeno, protože 9.5 je výslovně odkazuje a starý text mluvil o objednávce), K3 beze změny.
- **9.6** Audit 1280 a 1536 px (všechny stránky, dočasný test): levý okraj nadpisů a štítků všude na linii kontejneru (40 / 168 px), odskoky nenalezeny (jen skryté nadpisy pro čtečky). Bloky vedle sebe s různou výškou jen tam, kde je záměrně lepivý panel (detail modelu: galerie × informace; Zakázkové projekty: fotka u formuláře). Opraveno: modely a technologie na úvodu (9.1, 9.2), patička (9.3). Mezery sekcí `space="s"` a `space="m"` jsou nově odvozené z `--section-space` (½ a ¾), už ne ručně.
- **9.7** Nové tokeny `--head-space` (nadpis → obsah: 48 px, mobil 28 px), `--block-space` (bloky: 48 / 40 px), `--block-space-l` (modely: 96 / 44 px); `--section-space` na mobilu 44 px. Mezera mezi obsahem sekcí na 375 px **89–93 px** (dřív 190–225 px s nedokončeným odkrytím, ve skutečnosti ~130 px). Hero na mobilu bez centrování na výšku obrazovky (horní odsazení 16 px). Na mobilu nižší fotky: kroky Procesu 16 : 9, fotka Technologií 3 : 2 (místo 4 : 5), scéna modelů 15 rem. **Výška úvodu na 375 px: 7 618 → 6 597 px (−13 %)**, písmo beze změny. Cíl −20 % (≈ 6 000) by vyžadoval zkrátit texty nebo vyřadit fotky – nechávám na rozhodnutí.
- **9.8** Záloha hotová (texty nasazeny v dávce 9b): `podklady/texty-puvodni/2026-11-06/content/` (stav před dávkou 9) a git tag `texty-puvodni-2026-11-06`, postup obnovy v `docs/SPRAVA.md`. Titulky: nová funkce `pageTitle()` přidá „| ideTone“ jen tam, kde značka v titulku chybí (opraveno i dřívější „O ideTone – Petr Kocourek | ideTone“). **Texty nenasazeny** – sloupec Schváleno v `docs/SEO-TEXTY.md` je prázdný (kromě K1–K2, viz 9.5).
- **9.9** Nasazeno s dočasnými údaji v dávce 9b (zvýrazněná `[doplnit …]`, build na ostrém webu selže, dokud nejsou doplněná). Dříve: čekalo na údaje klienta.
- **9.10** Poslech a Zakázkové projekty: stejná komponenta a pole jako Kontakt; tlačítka „Domluvit poslech →“ / „Odeslat poptávku →“, nápověda u Zprávy (navázaná přes `aria-describedby`), předměty „ideTone – poslech“ / „ideTone – zakázka“. Zrušeny výběr modelu, studio / doma, termín, místnost, sestava, rozpočet. Formspree: klíče `contact` / `listening` / `custom` v `site.ts` (může být jedno ID u všech tří).
- Ověření: Lighthouse mobil (`dist/`) úvod výkon 99 / přístupnost 100 / best practices 100, Kontakt 100 / 100 / 100 (SEO 66–69 jen kvůli `noindex` v testovacím provozu); axe WCAG 2.2 AA bez chyb (všechny stránky); testy 101 zelené (formuláře přepsané na nová pole); `npm run links` v pořádku. Screenshoty `screenshots/davka9-*` (úvod, O ideTone, Kontakt, patička na 375 / 1280).



## Dávka 9b – dočištění mobilu, test formuláře, SEO texty a obchodní podmínky

Stav: **HOTOVO** (6. 11. 2026; 9b.2 jen částečně – chybí Formspree ID, viz Výstup). Původně SCHVÁLENO (Lukáš, 6. 11. 2026). Kontrola dávky 9 na živém webu (Cowork) byla v pořádku, zbývá níže uvedené.

### 9b.1 Mobil – výška úvodu
- Naměřeno na 375 px: výška úvodu **6 597 px** (cíl dávky 9.7 byl ≈ 6 000 px, tedy −20 % z 7 618 px; dosaženo −13 %).
- Sekce mají `padding-bottom` 44 px, ale mezi obsahem zbývá hodně prázdna. Změřit skutečné mezery mezi koncem obsahu jedné sekce a nadpisem další (cíl 80–96 px) a zkrátit tak, aby výška úvodu byla **≤ 6 100 px**. Texty nezkracovat.
- Po úpravě znovu změřit výšku a doplnit hodnotu do výsledku. Desktop se změnit nesmí.

### 9b.2 Formuláře – ověřit odesílání
- Živé `<form>` na Kontaktu nemá atribut `action` (podle DOM). Ověřit, že odeslání jde na Formspree (ID v `site.ts`), že funguje stav „odesláno / chyba“ a že u Poslechu a Zakázek se liší jen předmět.
- Testovací odeslání dělat **jen s e-mailem Lukáše a textem „TEST“**, ne zákaznický dotaz. Do výsledku napsat, zda e-mail dorazil.

### 9b.3 SEO texty – nasadit
- Ve `docs/SEO-TEXTY.md` je sloupec Schváleno vyplněn: **ANO** u všech řádků kromě **V3 (úvod Revy)**, které je **ČEKÁ (Petr)** – V3 **nenasazovat**, ponechat původní text.
- Zálohy a tag `texty-puvodni-2026-11-06` už existují (viz 9.8). Nasadit pouze řádky se Schváleno = ANO, titulky přes `pageTitle()` jak je.
- Ověřit unikátní `<title>` a description na každé stránce a že žádná description neobsahuje cenu.

### 9b.4 Obchodní podmínky – nasadit rozpracovanou verzi
- Zdroj: `docs/OBCHODNI-PODMINKY-NAVRH.md` (část od „# Obchodní podmínky“ po „---“, bez poznámek pro Lukáše). Do `src/content/pages/obchodni-podminky.md`.
- V návrhu jsou už doplněná rozhodnutí: **bez nadstandardní záruky** (jen zákonných 24 měsíců, bod 7.2) a **záloha se u zakázek dohodne ve smlouvě** (bod 4.3).
- Zůstávají údaje klienta jako `[doplnit …]`: IČO, sídlo, živnostenský úřad, plátce DPH, telefon, datum účinnosti, odkaz na formulář pro odstoupení. Na testovací verzi je zobrazit **viditelně zvýrazněné** (např. `<mark>`) a vypsat je v `npm run todo` jako `TODO(klient)`.
- **Pojistka:** při `PUBLIC_INDEXING=true` musí build **selhat**, pokud v obchodních podmínkách zůstane `[`. Na ostrém webu se tak neobjeví nedokončený text.
- Odkaz „Obchodní podmínky“ v patičce a ve formulářích (souhlas) zůstane aktivní.
- Formulář pro odstoupení od smlouvy je samostatný krok, zatím neřešit.

### Výstup dávky 9b
1. Výška úvodu na 375 px před a po.
2. Výsledek testu formuláře (dorazil / nedorazil).
3. Tabulka `title` / `description` všech stránek po nasazení SEO textů.
4. Screenshot Obchodních podmínek 375 / 1280 px se zvýrazněnými `[doplnit]`.
5. Commit včetně `docs/*`; v `docs/UPRAVY.md` označit 9b jako HOTOVO a 9.9 jako „nasazeno s dočasnými údaji“.

### Výsledek dávky 9b (Claude Code, 6. 11. 2026)

**9b.1 Mobil – výška úvodu.** Výška úvodu na 375 px (`scrollHeight`): **6 597 → 6 091 px** (cíl ≤ 6 100 splněn; −20 % z původních 7 618 px by bylo 6 094 px). Mezery mezi obsahem sekcí: 81 px (modely → koncept → proces → technologie), hero → modely 73 px, technologie → pruh Poslech 72 px; kolem pruhu je padding 32 px. Texty se nezkracovaly, písmo se nezměnilo. Změny jen pod 768 px (desktop a tablet beze změny, výška úvodu na 1280 px se změnila jen o 11 px kvůli delší hero větě ze SEO textu U4):
- `--section-space` 40 px, mezery uvnitř sloupců (hero, modely, koncept, technologie, poslech) 24–32 px, mezery mezi modely 32 px,
- scéna fotek modelů 12 rem (dřív 15 rem), kresba v hero 29 svh (dřív 33 svh), horní padding hero 16 px, spodní 32 px,
- fotky kroků Procesu 2 : 1, fotka Technologií 2 : 1 (dřív 4 : 5), pás Poslech padding 32 px,
- patička: Kontakt a Poslechové studio vedle sebe (výška patičky 771 → 610 px).
Dřívější změřené „190–225 px“ (9.7) i „130 px“ byly zkreslené nedokončeným odkrytím sekcí (posun 24 px); skutečná mezera byla už po dávce 9 kolem 89 px, zbytek úspory byl proto uvnitř bloků.

**9b.2 Formuláře – NEODESLÁNO, nelze ověřit.** `formspree.contact / listening / custom` v `src/config/site.ts` jsou prázdné (žádné Formspree ID nikde v repozitáři, ani v dokumentaci), proto živé `<form>` nemá `action` a odeslání končí hláškou „Odesílání formuláře zatím není aktivní…“. **Testovací zpráva (e-mail Lukáše + „TEST“) se neodeslala, e-mail nedorazil ani nemohl** – ID jsem si nevymýšlel. Ověřeno proti simulovanému endpointu (Playwright, 101 testů zelených): kód pošle JSON na `https://formspree.io/f/<ID>`, stavy odesílám / úspěch („Děkuji, ozvu se do 2 pracovních dnů.“) / chyba služby / výpadek sítě fungují, a u Kontaktu, Poslechu a Zakázek se liší jen předmět (`ideTone – dotaz` [+ `(Sara)`], `ideTone – poslech`, `ideTone – zakázka`), nadpis, tlačítko a nápověda u Zprávy. **Co udělat (Lukáš):** založit formulář na formspree.io (příjemce pkocourek@idetone.cz), ID vložit do `site.ts` (jedno stačí pro všechny tři klíče), pushnout a odeslat jedno testovací odeslání s vlastním e-mailem a textem „TEST“ na Kontaktu; potom doplnit výsledek sem.

**9b.3 SEO texty.** Nasazeny všechny řádky se Schváleno = ANO (U1, U2, U4, U6, R1–R3, S1–S3, V1, V2, T1, T2, O1, O2, P1, P2, Z1, K1, K2; U3, U5, U7, K3 jsou beze změny). **V3 (vlastní úvod Revy) nenasazen**, původní text zůstal, v `reva.md` je poznámka. Titulky přes `pageTitle()` (přípona „| ideTone“ jen kde chybí). Všechny `<title>` i `description` na webu jsou unikátní (ověřuje test `meta: unikátní title a description`), žádný popis neobsahuje cenu. Poznámky:
- Popisy U2 (162 znaků), V2 (173) a P2 (174) přesahují původní limit 155 znaků – nasazeno tak, jak je schváleno, limit ve schématu a v testu zvýšen na 180 / 175. Google je v náhledu může zkrátit (hranice ~155–160).
- Titulek Sary (S1) má s příponou 79 znaků, ostatní ≤ 63 – Google ho zkrátí, hlavní slova jsou na začátku (schváleno).
- V YAML úvodech jsou popisy s dvojtečkou (R2, T2) v uvozovkách.

**9b.4 Obchodní podmínky.** `src/content/pages/obchodni-podminky.md` obsahuje celý text z návrhu (část od „# Obchodní podmínky“ po „---“, bez nadpisu H1 a bez poznámek pro Lukáše; bod 7.2 jen zákonná záruka, bod 4.3 záloha dle smlouvy). Chybějící údaje jsou jako `[doplnit …]` ve zvýrazněném `<mark class="todo">` (žlutý podklad, čárkovaný rám), celkem 9 míst: datum (2×), IČO, sídlo, živnostenský úřad, plátce DPH, telefon, sazba DPH v bodě 4.1, odkaz na formulář pro odstoupení. `npm run todo` je vypisuje. **Pojistka:** při `PUBLIC_INDEXING=true` build selže (`Obchodní podmínky obsahují nedoplněné údaje (9×)`, ověřeno), běžný build projde. Odkaz na Ochranu osobních údajů v textu je relativní (`../ochrana-osobnich-udaju/`), `npm run links` ho nově umí vyhodnotit. Odkaz v patičce zůstává. Formulář pro odstoupení se neřešil.
- **9.9 nasazeno s dočasnými údaji** (viz výše).

### Tabulka title / description po nasazení SEO textů (z buildu)
| Stránka | title (znaků) | description (znaků) |
|---|---|---|
| / | ideTone – ručně laděné hi-fi reprosoustavy z Brna (49) | Hi-fi reprosoustavy Sara a Reva, navržené a ručně laděné v Brně. Zvukovod u výškového reproduktoru, přirozený zvuk pro dlouhý poslech a vlastní poslechové studio. (162) |
| /reprosoustavy/ | Hi-fi reprosoustavy Sara a Reva – srovnání modelů \| ideTone (59) | Sloupová Sara a kompaktní Reva na stojanu: dvoupásmové high-end reprosoustavy ideTone. Srovnání parametrů a doporučení podle velikosti místnosti. (145) |
| /reprosoustavy/sara/ | Sara – sloupová hi-fi reprosoustava s páskovým výškovým reproduktorem \| ideTone (79) | Sara je dvoupásmová sloupová reprosoustava s páskovým výškovým reproduktorem ve zvukovodu a bassreflexem vyvedeným dolů. Navržená a ručně laděná v Brně. (152) |
| /reprosoustavy/reva/ | Reva – kompaktní hi-fi reprosoustava na stojan \| ideTone (56) | Reva je kompaktní dvoupásmová reprosoustava se sedmipalcovým středobasovým reproduktorem a textilní kalotou ve zvukovodu. Volitelně s vlastními stojany. Ručně laděná v Brně. (173) |
| /technologie/ | Technologie reprosoustav – zvukovod, výhybka a měření \| ideTone (63) | Jak vznikají reprosoustavy ideTone: zvukovod (waveguide) u výškového reproduktoru, výhybky druhého řádu, měření v ose i mimo osu a poslechové testy. (148) |
| /poslech/ | Poslech hi-fi reprosoustav v Brně – poslechové studio ideTone (61) | Poslechněte si reprosoustavy Sara a Reva v poslechovém studiu v Brně na sestavě Pass Labs, Esoteric a Ansuz. Termín domluvíme individuálně, vezměte s sebou vlastní CD a SACD. (174) |
| /zakazkove-projekty/ | Reprosoustavy na míru – zakázková výroba \| ideTone (50) | Reprosoustava navržená a naladěná na míru vašemu prostoru, sestavě a interiéru. Postup spolupráce a nezávazná poptávka. (119) |
| /o-idetone/ | O ideTone – Petr Kocourek, konstruktér reprosoustav z Brna (58) | Od DIY značky PKAudio k ideTone. Petr Kocourek navrhuje a ručně ladí hi-fi reprosoustavy v Brně s důrazem na přirozený zvuk a dlouhodobý poslech. (145) |
| /kontakt/ | Kontakt – Petr Kocourek, ideTone Brno (37) | Napište mi dotaz k reprosoustavám Sara a Reva, poslechu nebo zakázce. Petr Kocourek, pkocourek@idetone.cz, poslechové studio Filipínského 59, Brno. (147) |
| /obchodni-podminky/ | Obchodní podmínky \| ideTone (27) | Obchodní podmínky ideTone – prodej reprosoustav Sara a Reva a zakázková výroba. Cena, dodání, odstoupení od smlouvy, reklamace. (127) |
| /ochrana-osobnich-udaju/ | Ochrana osobních údajů \| ideTone (32) | Jak ideTone zpracovává osobní údaje z formulářů a e-mailové komunikace. (71) |
(Počty znaků titulků včetně přípony „| ideTone“ – u řádků bez ní ji titulek už obsahuje.)

### Ověření dávky 9b
- `npm run check` bez chyb a varování, Prettier v pořádku; 101 Playwright testů (layout, formuláře, axe WCAG 2.2 AA na všech stránkách včetně Obchodních podmínek) zelených; `npm run links` v pořádku.
- Screenshoty: `screenshots/davka9-obchodni-podminky-375.png` / `-1280.png` (zvýrazněná `[doplnit …]`), `davka9-uvod-375.png`.


## Dávka 10 – jemné barevné pásy sekcí a sklo na kartách

Stav: **HOTOVO** (7. 11. 2026). Původně SCHVÁLENO (Lukáš, 6. 11. 2026). Výběr v náhledu „ideTone – barvy sekcí“ (Cowork): varianta **Pískový dub**, sklo **Jemné**. Dřevěné fotografické pozadí se **nepoužije** (Lukáš zamítl). Jde jen o změnu barevných tokenů a pozadí pásů; texty, rozvržení ani obrázky se nemění. Dávka 9b má přednost, dělat až po ní.

### 10.1 Tokeny barev (light, `src/styles/tokens.css`)
| Token | Dnes | Nově | Použití |
|---|---|---|---|
| pozadí stránky (`--bg` / podklad pod pásy) | #E9E6DF (Len) | **#EADFCB** | pozadí `body` |
| pás 1 (`--band-1`) | #F5F3EE (Papír) | **#F3EBDD** | světlejší pásy sekcí (`section--len` lichá) |
| pás 2 (`--band-2`) | #EFE3D3 (dub-soft) | **#E7D8BE** | sudé pásy sekcí |
- Pásy v sekcích na úvodu i podstránkách se střídají 1 / 2 / 1 / 2 podle pořadí, pruh **Poslech zůstává ořechový** (gradient beze změny), hero ponechat jak je (papír + perokresba + zrno). Zkontrolovat přechod hero → první pás, aby nevznikla ostrá hrana.
- Nepřidávat obrázek dřeva ani texturu. Jen barvy a záře níže.

### 10.2 Záře na pozadí pásů (aby měl sklo co rozostřit)
Na každém pásu 1 / 2 (nikoli Poslech) pseudoelement `::before` (`position:absolute; inset:0; z-index:-1; pointer-events:none`), rodič `position:relative; overflow:hidden; isolation:isolate`:
```
background:
  radial-gradient(480px 340px at 10% 35%, rgba(168,116,63,var(--glow)), transparent 70%),
  radial-gradient(560px 380px at 88% 75%, rgba(255,255,255,calc(var(--glow)*2.4)), transparent 70%),
  radial-gradient(300px 220px at 55% 10%, rgba(138,92,46,calc(var(--glow)*.7)), transparent 70%);
```
Token `--glow: .14` (Jemné).

### 10.3 Sklo na kartách (modely, Technologie, formuláře, bloky na podstránkách)
- Tokeny: `--glass-bg: rgba(255,255,255,.56)`, `--glass-line: rgba(255,255,255,.8)`, `--glass-blur: 12px`.
- Karta: `background: var(--glass-bg); border: 1px solid var(--glass-line); border-radius: var(--radius-m); backdrop-filter: blur(var(--glass-blur)) saturate(1.25); -webkit-backdrop-filter: …; box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 14px 34px -18px rgba(70,45,20,.45);`
- Platí pro **všechny** karty (modely, Technologie, formuláře Kontakt / Poslech / Zakázky, ostatní bloky v kartách). Pole formulářů uvnitř mají pozadí `rgba(255,255,255,.7)`.
- Záloha bez podpory: `@supports not (backdrop-filter: blur(1px))` → `--glass-bg: rgba(255,255,255,.82)`.
- Mobil (< 768 px): `--glass-blur: 8px` kvůli výkonu.
- Tokeny pojmenovat tak, aby šla síla skla později změnit jednou hodnotou (`--glow`, `--glass-bg`, `--glass-blur`). Podobné stupně z náhledu: Bez skla (`--glow:0`, bg .7, blur 0), **Jemné (zvoleno)**, Znatelné (`--glow:.3`, bg .4, blur 18 px), Výrazné (`--glow:.5`, bg .28, blur 26 px).

### 10.4 Kontrast (pozor)
- Dubový text `#8A5C2E` na pásu 2 (#E7D8BE) má poměr zhruba **4,1 : 1**, tedy pod AA (4,5) pro malý text (štítky, odkazy „Víc o řešení“, „Detail modelu“).
- Řešení: pro malý dubový text použít tmavší token **#6E4826** (≈ 5,7 : 1) všude, kde leží na pásu 2 nebo na kartě nad zářím; velké nadpisy a tlačítka (bílý text na #8A5C2E) beze změny.
- Změřit axe WCAG 2.2 AA na úvodu, Reprosoustavách, Technologii, Kontaktu, Poslechu a Zakázkových projektech a opravit, co vyjde pod 4,5 : 1 (u velkého textu 3 : 1).
- Muted text `#4F5651` na pásech musí zůstat ≥ 4,5 : 1.

### Výstup dávky 10
1. Screenshoty úvodu, Technologie a Kontaktu na 1280 a 375 px před a po.
2. Výsledek axe a Lighthouse (úvod mobil: výkon ≥ 95, přístupnost 100). Pozadí s `backdrop-filter` nesmí zhoršit výkon o více než 3 body.
3. Tabulka použitých barev a poměrů kontrastu dubových textů.
4. Commit včetně `docs/UPRAVY.md` a `docs/idetone-rozhodnuti.md` (doplnit rozhodnutí: barvy Pískový dub, sklo Jemné, žádné dřevo na pozadí, tmavší dubový text na pásu 2). Dávku označit HOTOVO.

### Výsledek dávky 10 (Claude Code, 7. 11. 2026)
- **10.1 Barvy.** `--c-len` (pozadí `body`) #EADFCB, nové `--band-1` #F3EBDD a `--band-2` #E7D8BE, `--c-papir` je teď alias na `--band-1`. Pásy se střídají podle pořadí sekcí v `<main>` (`main > .section--len / --papir:nth-of-type`, na úvodu s obrácenou paritou, aby první pás po hero byl světlejší) – žádná změna v šablonách. Pruh Poslech zůstal ořechový, hero beze změny; přechod hero → první pás je plynulý (gradient z pozadí do pásu na 6 rem), bez ostré hrany. Žádný obrázek ani textura dřeva. Linky mezi sekcemi (`divider`) zůstaly, aby se nezměnilo rozvržení.
- **10.2 Záře.** `.section--len` a `.section--papir` mají `::before` se třemi radiálními přechody podle zadání, `--glow: .14`. **Odchylka:** místo `overflow: hidden` je `overflow: clip` (stejné ořezání záře, ale nerozbije lepivé panely `position: sticky` na detailu modelu a u poptávky).
- **10.3 Sklo.** Tokeny `--glass-bg` .56, `--glass-line` .8, `--glass-blur` 12 px (mobil < 768 px 8 px; bez `backdrop-filter` `--glass-bg` .82), třída `.glass-card` v `base.css` (blur + saturate 1,25, vnitřní světlo a stín podle zadání). Použito na kartách, které na webu existují: formuláře (Kontakt, Poslech, Zakázky), srovnávací tabulka, specifikace, tabulka sestavy studia, schéma zvukovodu. Pole formulářů `rgba(255,255,255,.7)`. Stupně síly skla jsou popsané v komentáři u tokenů (`--glow`, `--glass-bg`, `--glass-blur`). **Poznámka:** modely na úvodu a tři sloupce Technologií na úvodu nejsou karty (jen text a fotka na pásu), a protože se rozvržení nemělo měnit, karty jsem k nim nepřidával; sklo by tam šlo doplnit samostatně. Dosavadní tmavé sklo (hero panel, pruh Poslech, lišta s cenou) mělo token `--glass-blur`, přejmenoval jsem ho na `--glass-blur-dark`, vzhled beze změny.
- **10.4 Kontrast.** Nový token `--c-dub-ink` #6E4826 pro malý dubový text: štítky sekcí (`--c-eyebrow`), odkazy v textu, druhý řádek hero, kóty, podnadpisy kroků, aktivní položka podmenu, hlášky formuláře. Tlačítka a plochy zůstávají v `--c-dub-text` #8A5C2E (bílý text na nich 5,07 : 1), velký dekorativní dub #A8743F beze změny. Zjistil jsem, že i #8A5C2E má na samotném podkladu #EADFCB jen 4,36 : 1, proto je tmavší text všude na světlých plochách, ne jen na pásu 2. `--c-muted` ztmaven z #5C635E na #4F5651 (na pásu 2 by měl jen 4,40 : 1).
- **Změny mimo zadání, nutné kvůli barvám:** `--glass-header` a `--glass-light` přebarveny na #EADFCB (hlavička a lišta s cenou musí odpovídat novému pozadí).

### Výstup dávky 10
1. Screenshoty před / po (úvod, Technologie, Kontakt; 1280 a 375 px): `screenshots/davka10-pred-*.png` a `screenshots/davka10-po-*.png` (složka je mimo git).
2. Axe WCAG 2.2 AA bez chyb na všech stránkách a šířkách (testy 101 zelených), Lighthouse mobil: úvod **výkon 100 / přístupnost 100 / best practices 100** (před dávkou 99 / 100 / 100, tedy bez zhoršení), ostatní stránky výkon 96–99, přístupnost 100 (SEO 66–69 jen kvůli `noindex`).
3. Kontrast (poměr, WCAG; sklo nad září a záře s dubem jsou odhad nejhoršího místa):

| Text | Podklad len #EADFCB | Pás 1 #F3EBDD | Pás 2 #E7D8BE | Sklo nad pásem 2 (~#F2E9D6) | Záře dub na pásu 2 (~#DCC7A4) |
|---|---|---|---|---|---|
| Dub tmavý #6E4826 (malý text) | 6,08 | 6,78 | 5,72 | 6,65 | 4,87 |
| Dub #8A5C2E (jen plochy, velký text) | 4,36 | 4,86 | 4,10 | 4,77 | 3,49 |
| Tlumený #4F5651 | 5,72 | 6,38 | 5,38 | 6,25 | 4,58 |
| Tlumený #5C635E (dříve) | 4,68 | 5,21 | 4,40 | 5,12 | 3,75 |
| Grafit #1F2421 | 11,94 | 13,31 | 11,23 | 13,06 | 9,57 |
| Dub #A8743F (dekorace, ne text) | 3,04 | 3,39 | 2,86 | 3,32 | 2,44 |

4. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md` (soubor je v kořeni projektu, ne v `docs/`), rozhodnutí doplněno.



## Dávka 11 – světlejší paleta s grafitovým pruhem, vzdušnější rozvržení, jednotná tlačítka

Stav: **HOTOVO** (8. 11. 2026). Původně SCHVÁLENO (Lukáš, 8. 11. 2026). Výběr v náhledu „ideTone – kontrast a tlačítka“ (Cowork): paleta **Světlá + grafit**, vzdušnost **Vzdušnější**. Důvod: po dávce 10 jsou pásy příliš tmavé a málo od sebe odlišné a tlačítka nemají systém. Dávka **nahrazuje barvy z 10.1**; sklo a záře z dávky 10 zůstávají (úpravy v 11.5). **Texty se nemění** (ani texty tlačítek). Soubor `NAVRHOVANE-ZMENY.md` z kořene repozitáře se **nepoužívá** (jen Lukášův nápad, vybrané položky jsou už v této dávce).

### 11.1 Barvy a pásy (`src/styles/tokens.css`)
| Token | Dnes (dávka 10) | Nově |
|---|---|---|
| pozadí stránky (`--c-len`) | #EADFCB | **#F7F3EA** |
| pás 1 (`--band-1`) | #F3EBDD | **#FCFAF5** |
| pás 2 (`--band-2`) | #E7D8BE | **#F0E6D2** |
| tmavý pruh (`--band-dark`) | nové | **#262422** |
- Pásy se střídají 1 / 2 / 1 / 2 podle pořadí; tmavý pruh a ořechový Poslech jsou výjimky. Dva stejné pásy vedle sebe nesmí být.
- **Tmavý pruh = sekce Technologie na úvodu** (jako v náhledu). Na úvodu však po Technologii následuje ořechový Poslech, takže dvě sytá pásma sousedí. Zkontrolovat na screenshotu 1280 a 375 px. Pokud to působí těžce, **použít tmavý pruh na „Proces vývoje“** a Technologii nechat světlou (pás 2); varianta se musí v „Výsledku“ popsat. Nic jiného nevymýšlet.
- Na podstránkách tmavý pruh **nepřidávat** (jen Poslech zůstává ořechový, patička zůstává světlá na `--band-2` s linkou nahoře).
- Tmavý pruh: text #F1ECE2, tlumený text #CFC8BA, štítky #E5C9A2, nadpisy #FFFFFF, karty `rgba(255,255,255,.06)` s okrajem `rgba(255,255,255,.12)` bez stínu, záře `radial-gradient(520px 360px at 85% 20%, rgba(201,149,96,.22), transparent 70%)`.
- Hlavička: sklo `rgba(247,243,234,.9)` (token `--glass-header`), `--glass-light` stejně.
- Nic dalšího nepřebarvovat, hero zůstává (papír, kresba, zrno).

### 11.2 Vzdušnost (jen od 768 px; mobil se nezvětšuje)
- `--section-space` (svislé odsazení sekcí): **`clamp(56px, 9vw, 128px)`** od 768 px. **Pod 768 px zůstává 44 px** jako po dávce 9.7 (výška úvodu na mobilu nesmí vzrůst o víc než 3 %).
- Mezery mezi kartami a sloupci: **28 px** (dnes 20 px). Odsazení v kartě **26 px**.
- Mezera nadpis sekce → obsah (`--head-space`): **`calc(28px * 1.6)`** ≈ 45 px na desktopu.
- Řádkování odstavců v sekcích **1,7** (dnes 1,6), max. šířka řádku **56ch**.
- Nechat jemnou dubovou linku nad sekcemi (`linear-gradient(90deg, var(--c-dub), transparent 40%)`, průhlednost .5), kde už je `divider`.
- Texty nezkracovat, rozvržení sekcí neměnit.

### 11.3 Systém tlačítek (jednotně na všech stránkách)
Tři druhy, každý s jedním úkolem. Všechny: výška **48 px**, padding **0 22px**, poloměr `--radius-s` (6 px), písmo Figtree 600 15 px, `border: 1.5px solid`, `white-space: nowrap`, `gap: 8px`, viditelný `:focus-visible`, `prefers-reduced-motion` bez přechodu.

| Druh | Světlý podklad | Tmavý a ořechový podklad | Kdy |
|---|---|---|---|
| **Plné** (`.btn--primary`) | pozadí #8A5C2E, text #FFFFFF, hover #5E3D22 | pozadí #F5F0E8, text #5E3D22, hover #FFFFFF | Hlavní akce stránky, **max. jedna na obrazovku** |
| **Obrys** (`.btn--secondary`) | průhledné, text #1F2421, okraj #1F2421, hover pozadí #1F2421 text #FFFFFF | text #FFFFFF, okraj `rgba(255,255,255,.75)`, hover pozadí #FFFFFF text #262422 | Druhá volba vedle plného nebo vedlejší akce |
| **Textový** (`.link`, sjednotit `.arrow-link` a `.pf__link`) | text #6E4826, `border-bottom: 1px solid #8A5C2E`, `padding-bottom: 3px`, hover okraj průhledný | text #F1DFC6, okraj #E5C9A2 | Přechod na detail uvnitř obsahu |

Přiřazení (podle současného stavu webu; texty tlačítek neměnit):
- Hlavička „Domluvit poslech →“: plné.
- Karty modelů „Detail modelu Sara / Reva →“: textový. „Porovnat modely →“: obrys.
- Technologie „Víc o řešení →“, „O ideTone →“, „Proces vývoje podrobně“: textový. „Jak to funguje →“: obrys.
- Pruh Poslech: „Zarezervujte si poslech…“ plné (světlé na ořechu), případná vedlejší akce obrys.
- Odeslání formulářů (Kontakt, Poslech, Zakázky): plné.
- Projít **všechny stránky** (úvod, Reprosoustavy, Sara, Reva, Technologie, Poslech, Zakázky, O ideTone, Kontakt, 404, Obchodní podmínky) a každé tlačítko a odkaz s šipkou přiřadit k jednomu ze tří druhů. Zrušit zbylé vlastní styly tlačítek. Výsledek zapsat jako tabulku (stránka · text · druh).
- Na žádné obrazovce nesmí být dvě plná tlačítka vedle sebe.

### 11.4 Kontrast
- Znovu změřit axe WCAG 2.2 AA na všech stránkách a šířkách. Malý dubový text na světlém podkladu zůstává `--c-dub-ink` #6E4826.
- Na tmavém pruhu změřit text #F1ECE2, #CFC8BA a #E5C9A2 (požadavek ≥ 4,5 : 1, velký text ≥ 3 : 1) a poměry zapsat do tabulky.
- Plné tlačítko #8A5C2E s bílým textem musí zůstat ≥ 4,5 : 1.

### 11.5 Sklo a záře (úpravy proti dávce 10)
- Sklo zůstává stupně Jemné (`--glass-bg` .56 → na světlejším podkladu zvýšit na **.62**, okraj `rgba(255,255,255,.9)`, blur 12 px, na mobilu 8 px).
- Záře `--glow` na světlých pásech **.12** (dnes .14).
- Modely na úvodu a tři sloupce Technologie nejsou karty, proto tam sklo zatím není. **Nepřidávat** bez dalšího zadání.

### Výstup dávky 11
1. Screenshoty úvodu (celý), Technologie a Kontaktu na 1280 a 375 px před a po (`screenshots/davka11-*`, mimo git).
2. Výška úvodu na 375 px před a po (nárůst max. 3 %).
3. Axe a Lighthouse (úvod mobil: výkon ≥ 95, přístupnost 100; bez zhoršení o víc než 3 body).
4. Tabulky kontrastu (světlé pásy, tmavý pruh, plné tlačítko) a tabulka přiřazení tlačítek (11.3).
5. Popis, zda tmavý pruh zůstal na Technologii, nebo se přesunul na Proces vývoje.
6. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md` (je v kořeni projektu, ne v `docs/`) (doplnit rozhodnutí: paleta Světlá + grafit, vzdušnější od 768 px, systém tlačítek). Dávku označit HOTOVO.

### Výsledek dávky 11 (Claude Code, 8. 11. 2026)
- **11.1 Barvy a pásy.** `--c-len` #F7F3EA, `--band-1` #FCFAF5, `--band-2` #F0E6D2, nový `--band-dark` #262422; `--glass-header` a `--glass-light` `rgba(247,243,234,.9)`. Nový tón `Section tone="dark"` (grafitový pruh bez fotky): text #F1ECE2, tlumený #CFC8BA, štítky #E5C9A2, nadpisy #FFF, karty `rgba(255,255,255,.06)` s okrajem `.12` bez stínu, záře podle zadání. Pásy se střídají 1 / 2 / 1 / 2 (dark a ořechový Poslech parity neovlivňují), dva stejné vedle sebe nejsou.
- **Varianta tmavého pruhu: přesunut na „Proces vývoje“.** Nejdřív jsem ho dal na Technologii podle zadání. Na screenshotu 1280 px ale pod ním následoval ořechový Poslech a hned za ním tmavá patička, tedy tři těžké plochy po sobě. Podle dohodnuté záložní varianty je proto tmavý pruh na Procesu vývoje a Technologie je světlá (pás 2); pořadí je světlý pás 1 (Modely) → pás 2 (Koncept) → **grafit (Proces)** → pás 2 (Technologie) → ořech (Poslech) → patička. Na mobilu (375 px) stejné pořadí. Na podstránkách žádný tmavý pruh nepřibyl (Technologie už měla vlastní tmavý pruh s tlačítkem Domluvit poslech z dřívějška, beze změny).
- **Rozpor v zadání: patička.** Zadání říká, že patička „zůstává světlá na `--band-2` s linkou nahoře“, ale patička na webu je tmavá (antracit se sklem, od dávky se sklem a dávky 9.3). Podle pravidla „nic dalšího nepřebarvovat“ jsem ji nechal tmavou. Pokud ji chcete světlou, je to samostatná změna.
- **11.2 Vzdušnost (jen od 768 px).** `--section-space` `clamp(56px, 9vw, 128px)`, mezery mezi kartami a sloupci `--grid-gap` nejméně 28 px (`max(1.75rem, 2.5vw)`; na 1280 px je to 32 px, proto ne přesně 28 – dřívější hodnota nebyla 20 px, ale 32 px, a zmenšovat vzdušnost by bylo proti smyslu dávky), odsazení v kartě 26 px (`--card-pad`, formuláře a schéma zvukovodu; na mobilu beze změny), `--head-space` 2,8 rem (≈ 45 px, dřív 48 px; mobil 28 px beze změny), řádkování odstavců 1,7 (`main p, main li`, od 768 px) a `--measure` 56ch. Dělicí linka sekcí je nově jemná dubová `linear-gradient(90deg, var(--c-dub), transparent 40%)` s průhledností .5. Pod 768 px zůstává `--section-space` 40 px jako po dávce 9b (zadání uvádí 44 px, ale 9b ho snížila na 40 px, aby výška úvodu vyšla ≤ 6 100 px).
- **11.3 Systém tlačítek.** Styly `.btn` přesunuty z `Button.astro` do `base.css` (jedno místo): výška 48 px, padding 0 22 px, `--radius-s`, Figtree 600 15 px, `border: 1.5px solid`, `nowrap`, mezera 8 px, `:focus-visible`, při `prefers-reduced-motion` bez přechodu i posunu šipky. Plné = #8A5C2E / bílý text / hover #5E3D22; na tmavém a ořechovém #F5F0E8 / #5E3D22 / hover #FFF. Obrys = grafit, hover plný grafit s bílým textem; na tmavém bílý s okrajem `rgba(255,255,255,.75)`, hover bílý s tmavým textem. Textový odkaz `.link` (globální, v `base.css`): #6E4826, spodní linka #8A5C2E (na tmavém #F1DFC6 / #E5C9A2), hover linka zmizí; sjednoceny `.arrow-link` a `.pf__link`, přidány odkazy Quote a „Otevřít v Mapy.cz / Google Maps“. Odeslání formulářů používá `.btn` místo vlastního stylu. Texty tlačítek beze změny. Tabulka přiřazení:

| Stránka | Text | Druh |
|---|---|---|
| všechny (hlavička, desktop) | Domluvit poslech → | plné |
| všechny (mobilní menu) | Domluvit poslech → | plné (na tmavém podkladu) |
| Úvod | Detail modelu Sara →, Detail modelu Reva → | textový |
| Úvod | Porovnat modely → | obrys |
| Úvod | O ideTone → (Koncept) | textový |
| Úvod | Proces vývoje podrobně → (grafitový pruh) | textový (na tmavém) |
| Úvod | Víc o řešení → (3×) | textový |
| Úvod | Jak to funguje → | obrys |
| Úvod | Zarezervujte si poslech… (pruh Poslech) | plné (na ořechu) |
| Reprosoustavy | Zakázkové projekty → | obrys |
| Sara, Reva | Objednat → (také lišta s cenou na mobilu) | plné |
| Sara, Reva | Domluvit poslech → | obrys |
| Sara, Reva | Porovnat modely →, název druhého modelu → (odkazové karty „další“) | beze změny, viz poznámka |
| Technologie | Domluvit poslech → (tmavý pruh) | plné (na tmavém) |
| Zakázkové projekty | Odeslat poptávku → | plné |
| Poslech | Domluvit poslech → (formulář) | plné |
| Poslech | Otevřít v Mapy.cz →, Otevřít v Google Maps → (pruh na ořechu) | textový (na tmavém) |
| O ideTone | Prohlédnout modely → | plné |
| O ideTone | Technologie → | obrys |
| Kontakt | Odeslat zprávu → | plné |
| Děkujeme | Prohlédnout modely → / Úvodní stránka → | plné / obrys |
| 404 | odkazové karty (Sara, Reva, Reprosoustavy, Kontakt) | beze změny, viz poznámka |
| Obchodní podmínky | – | bez tlačítek |
- Poznámka: odkazové karty (404 a „další modely“ pod detailem) jsou bloky se štítkem a velkým názvem se šipkou, nikoli tlačítka ani odkazy v textu, proto zůstaly beze změny. Na desktopu je na detailu modelu vidět plné „Domluvit poslech“ v hlavičce i plné „Objednat“ v obsahu, ale nejsou vedle sebe (hlavička vs. obsah).
- **11.4 Kontrast.** Axe WCAG 2.2 AA na všech stránkách a šířkách bez chyb (101 testů zelených). Tabulky níže.
- **11.5 Sklo a záře.** `--glass-bg` .62, `--glass-line` `rgba(255,255,255,.9)`, blur 12 px (mobil 8 px) beze změny, `--glow` .12. Modely a sloupce Technologie bez skla (nepřidáno).

### Výstup dávky 11
1. Screenshoty před / po (úvod celý, Technologie, Kontakt; 1280 a 375 px): `screenshots/davka11-pred-*.png` a `screenshots/davka11-po-*.png` (složka je mimo git).
2. Výška úvodu na 375 px (výška snímku celé stránky): **6 116 → 6 150 px (+0,6 %, limit +3 %)**; na 1280 px 4 792 → 5 082 px (+6,1 %, záměrná vzdušnost od 768 px).
3. Axe bez chyb na všech stránkách a šířkách; Lighthouse mobil: úvod **výkon 100 / přístupnost 100 / best practices 100** (před dávkou 100 / 100 / 100), ostatní stránky výkon 96–100, přístupnost 100 (SEO 66–69 jen kvůli `noindex`).
4. Kontrast (WCAG, poměr):

| Text | len #F7F3EA | pás 1 #FCFAF5 | pás 2 #F0E6D2 |
|---|---|---|---|
| dub tmavý #6E4826 (malý text) | 7,24 | 7,69 | 6,48 |
| dub #8A5C2E (plochy, velký text) | 5,19 | 5,51 | 4,64 |
| tlumený #4F5651 | 6,82 | 7,24 | 6,09 |
| grafit #1F2421 | 14,23 | 15,11 | 12,72 |

| Na tmavém pruhu #262422 | poměr |
|---|---|
| text #F1ECE2 | 13,14 |
| tlumený #CFC8BA | 9,30 |
| štítky #E5C9A2 | 9,73 |
| nadpisy #FFFFFF | 15,47 |
| textový odkaz #F1DFC6 | 11,86 |

| Tlačítka | poměr |
|---|---|
| plné: bílá na #8A5C2E | 5,75 |
| plné hover: bílá na #5E3D22 | 9,69 |
| plné na tmavém: #5E3D22 na #F5F0E8 | 8,54 |
| obrys hover: bílá na #1F2421 | 15,76 |
| obrys na tmavém hover: #262422 na #FFF | 15,47 |
5. Tabulka přiřazení tlačítek je výše (11.3).
6. Tmavý pruh **nezůstal na Technologii, přesunul se na Proces vývoje** (důvod výše).
7. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md`; rozhodnutí doplněno. `NAVRHOVANE-ZMENY.md` jsem nepoužil ani nečetl.



## Dávka 12 – nové pozadí hero „Kruhy a dub“

Stav: **HOTOVO, nahrazeno dávkou 13** (8. 11. 2026). Původně SCHVÁLENO (Lukáš, 8. 11. 2026). Výběr v náhledu „ideTone – pozadí hero“ (druhé kolo, varianta **Kruhy a dub**). Důvod: dosavadní hero je šedavé a monotónní, další sekce jsou kontrastní. Mění se **jen pozadí hero**. Texty, perokresba, podpis, jejich animace a ostatní sekce zůstávají. Hero **nemá tlačítka** (jako dosud).

### 12.1 Pozadí a motiv
- Základ hero: **#F7F1E4** (teplejší než dnešní šedobéžová, `--c-len` ani pásy se nemění).
- **Dubový kruh** za kresbou: plný kruh **#E5CDA0**, střed ve středu kresby (ne v procentech hero, ale na obalu kresby `position: relative`, pseudoelement `::before`, vystředěný `inset: 50% auto auto 50%` + `translate(-50%,-50%)`). Průměr **`clamp(320px, 38vw, 500px)`**, nejvýš 120 % šířky sloupce s kresbou, aby kruh nezasahoval pod text.
- **Soustředné kruhy** kolem kruhu: `repeating-radial-gradient(circle, transparent 0 38px, rgba(138,92,46,.16) 38px 39px)`, vystředěné stejně, s maskou, která je k okrajům vytrácí: `mask: radial-gradient(circle, #000 0 28%, transparent 72%)` (+ `-webkit-mask`). Pseudoelement `::after` obalu, `pointer-events: none`, `z-index` pod kresbou.
- Zachovat jemné **papírové zrno** (opacity .16, `mix-blend-mode: multiply`, jako v náhledu).
- **Zrušit**: 32px mřížku a dosavadní teplou záři za kresbou (nahrazuje je kruh).
- Kresba i podpis zůstávají v grafitu (průhledné PNG), nijak se neupravují. Nic neinvertovat.
- Přechod hero → první pás (Modely #FCFAF5) nechat plynulý, bez ostré hrany.

### 12.2 Animace (jemná, pomalá)
- Kruh se při načtení **zobrazí pozvolna** (opacity 0 → 1 a `scale(.96 → 1)`, 1,2 s), soustředné kruhy za ním o 0,4 s později (opacity 0 → 1, 0,8 s). Pak běží stávající odkrytí kresby a psaní podpisu beze změny času.
- `prefers-reduced-motion: reduce`: bez animace, jen konečný stav.

### 12.3 Responzivita a kontrast
- Do 820 px: kresba nad textem nebo dosavadní uspořádání; kruh se zmenší na `min(78vw, 360px)`, soustředné kruhy zůstávají jemné. Výška hero nejvýš 780 px (pravidlo z dřívějška).
- Text v hero (nadpis grafit #1F2421, štítek #5E3D22, druhý řádek #6E4826, perex #2F3531) musí mít na #F7F1E4 kontrast ≥ 4,5 : 1 (velký text ≥ 3 : 1). Změřit axe a poměry zapsat.
- Soustředné kruhy nesmí sahat pod text tak, aby zhoršily čitelnost (kruhy jsou prakticky neviditelné pod 28 % poloměru; zkontrolovat na 1024 a 1280 px).

### Výstup dávky 12
1. Screenshoty hero před a po na 1280, 1024 a 375 px.
2. Axe a Lighthouse (úvod mobil: výkon ≥ 95, přístupnost 100, bez zhoršení o víc než 3 body).
3. Tabulka kontrastu textů v hero.
4. Potvrdit, že se nezměnily texty, kresba, podpis ani sekce pod hero.
5. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md` (je v kořeni projektu): rozhodnutí „hero: Kruhy a dub, základ #F7F1E4, kruh #E5CDA0, bez mřížky“. Dávku označit HOTOVO.

### Výsledek dávky 12 (Claude Code, 8. 11. 2026)
- **12.1 Pozadí a motiv.** Základ hero `--hero-bg` #F7F1E4 (`--c-len` a pásy beze změny). Dubový kruh `--hero-circle-color` #E5CDA0 je `::before` obalu kresby `.hero__drawing-wrap` (`inset: 50% auto auto 50%` + `translate(-50%,-50%)`), průměr `--hero-circle` = `min(clamp(320px, 38vw, 500px), 120cqi)` (`cqi` = šířka sloupce s kresbou, proto kruh nepřesáhne 120 % sloupce). Soustředné kruhy jsou `::after` stejného obalu: `repeating-radial-gradient(circle, transparent 0 38px, rgba(138,92,46,.16) 38px 39px)` s maskou `radial-gradient(circle, #000 0 28%, transparent 72%)` (+ `-webkit-mask`), `pointer-events: none`, pod kresbou i kruhem. Prvek kruhů je 2× větší než kruh, aby se vlny vytrácely kolem něj. Zrno papíru zůstalo, `--paper-grain-opacity` .16 s `multiply`. **Zrušeno:** mřížka (`grid: false` v `home.yaml`, CSS odstraněno), teplé světlo za kresbou (CSS odstraněno), nepoužité tokeny `--c-light-warm` a `--grid-line`. Kresba a podpis se nijak neupravují, nic se neinvertuje.
- **Přechod do prvního pásu.** Přechod hero → Modely nově začíná barvou hero (`--hero-bg`). Aby po zrnu (které hero opticky ztmavuje) nevznikla ostrá hrana, zrno dole mizí (maska `#000 70% → transparent`) – drobná úprava nad rámec zadání, jen pozadí hero.
- **12.2 Animace.** Kruh: opacity 0 → 1 a `scale(.96 → 1)`, 1,2 s (`--dur-hero-circle`), soustředné kruhy opacity 0 → 1, 0,8 s s odstupem 0,4 s (`--dur-hero-rings`, `--delay-hero-rings`). Odkrytí kresby a psaní podpisu beze změny času. Při `prefers-reduced-motion: reduce` bez animace (jen konečný stav).
- **12.3 Responzivita.** Do 820 px kruh `min(78vw, 360px)`, uspořádání hero beze změny (kresba pod textem). Výška hero nejvýš 780 px (`min-height` omezeno na 48,75 rem i na desktopu, dřív tam strop nebyl); změřeno na obrazovce 900 px: 1280 px ≈ 751 px, 1024 px ≈ 760 px, 375 px ≈ 690 px. Soustředné kruhy zasahují do textového sloupce jen jako velmi slabé čáry (16 % dubu, k okraji mizí); na 1024 i 1280 px je čitelnost textu beze změny (viz screenshoty a poměry níže).

### Výstup dávky 12
1. Screenshoty hero před / po (1280, 1024, 375 px): `screenshots/davka12-pred-hero-*.png` a `screenshots/davka12-po-hero-*.png` (složka je mimo git).
2. Axe WCAG 2.2 AA bez chyb na všech stránkách a šířkách (101 testů zelených). Lighthouse mobil: úvod **výkon 100 / přístupnost 100 / best practices 100** (před dávkou 100 / 100 / 100), CLS úvodu 0,010 (dřív 0,030).
3. Kontrast textů v hero (základ #F7F1E4; „se zrnem“ = odhad nejtmavšího místa po vynásobení zrnem, ~#EBE5D8):

| Text | základ #F7F1E4 | se zrnem |
|---|---|---|
| nadpis grafit #1F2421 | 14,00 | 12,56 |
| perex (dědí grafit #1F2421) | 14,00 | 12,56 |
| štítek #6E4826 (skutečná barva `--c-eyebrow`; zadání uvádí #5E3D22 = 8,61 / 7,72) | 7,13 | 6,39 |
| druhý řádek #6E4826 | 7,13 | 6,39 |
| kresba grafit na kruhu #E5CDA0 | 10,18 | – |
Všechny hodnoty ≥ 4,5 : 1. Barvy textů v hero jsem neměnil (štítek a perex mají jiné odstíny než ve zadání, ale poměry vyhovují).
4. **Potvrzeno:** texty hero, kresba, podpis a jejich animace i všechny sekce pod hero jsou beze změny. V `home.yaml` se změnil jen komentář a `decor.grid: false`; v kódu jen pozadí hero (`index.astro`, `tokens.css`, jeden přechodový řádek v `base.css`).
5. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md`; rozhodnutí doplněno.



## Dávka 13 – hero „Velký výrok“ (nahrazuje pozadí z dávky 12)

Stav: **HOTOVO** (8. 11. 2026). Původně SCHVÁLENO (Lukáš, 8. 11. 2026). Výběr v náhledu „ideTone – pozadí hero“ (třetí kolo, varianta **Velký výrok**). Důvod: hero po dávce 12 je pořád málo kontrastní a bez výrazné kompozice. **Nahrazuje kruh za kresbou z dávky 12.** Texty se nemění (jen se jedno slovo v nadpisu zvýrazní barvou), kresba a podpis zůstávají, hero **nemá tlačítka**.

### 13.1 Pozadí a oblouk
- Základ hero: **#F7F1E4** (jako dávka 12), jemné papírové zrno (`opacity .16`, `mix-blend-mode: multiply`).
- **Zrušit** kruh a soustředné kruhy středěné na kresbě (z dávky 12) i mřížku.
- **Dubový oblouk v pravém dolním rohu hero** (kotvený k hero, ne ke kresbě): `radial-gradient(circle 430px at 86% 108%, #DDBB82 0 99%, transparent 100%)`. Do hero je zasunutý jako velký kruh, který přesahuje dolní okraj a je oříznutý (`overflow: clip`).
- **Soustředné kruhy** kolem oblouku: `repeating-radial-gradient(circle at 86% 108%, transparent 0 44px, rgba(138,92,46,.18) 44px 45px)` s maskou `radial-gradient(circle at 86% 108%, #000 0 40%, transparent 80%)` (+ `-webkit-mask`). `pointer-events: none`, `z-index` pod obsahem.
- Kresba (`.hero__art`) stojí nad obloukem, její spodek (podstavy) leží zhruba na horním okraji oblouku. Doladit pozici podle screenshotu 1280 px.

### 13.2 Typografie hero (hlavní změna)
- **Nadpis „Reprosoustavy s citem pro hudbu.“** výrazně větší: `font-size: clamp(44px, 8.4vw, 116px)`, `line-height: .96`, `letter-spacing: -.035em`, `max-width: 9ch` (zalamuje se zhruba na „Reprosoustavy / s citem pro / hudbu.“). Familjen Grotesk 500 jako dosud.
- Slovo **„citem“** v dubu `#8A5C2E` (velký text, kontrast ≥ 3 : 1 splněn). Realizace: nové pole v `home.yaml` hero, např. `titleAccent: citem`, komponenta slovo obalí `<em>` (`font-style: normal; color: var(--c-dub-text)`). Nepoužívat značkování v textu nadpisu (kvůli pozdějšímu CMS). Pokud pole chybí, nadpis se vykreslí bez zvýraznění.
- **Druhý řádek „Emoce | Klid | Poslech bez únavy“**: nově jako štítek v IBM Plex Mono 500, 14 px, verzálky, prostrkání `.1em`, barva `#6E4826` (ne velký dubový řádek jako dosud). Texty a oddělovače „|“ zůstávají.
- Štítek nad nadpisem „Ručně laděné reprosoustavy“ beze změny barvy `#5E3D22`.
- Perex beze změny (18 px, `#2F3531`, max. 46ch).

### 13.3 Rozvržení a responzivita
- Desktop: dvousloupcově `grid-template-columns: 1.4fr .6fr`, text vlevo, kresba vpravo menší: kresba `min(100%, 300px)`, podpis 170 px.
- Do 820 px: jeden sloupec, kresba pod textem vystředěná, oblouk menší (`circle 260px at 100% 106%`, kruhy 36 px), výška hero nejvýš 780 px na desktopu.
- Na 375 a 320 px nesmí slovo „Reprosoustavy“ přetékat ani se rozdělit; pokud ano, snížit minimum z 44 px (např. na 40 px).
- Animace: stávající odkrytí kresby a psaní podpisu beze změny. Oblouk se při načtení pozvolna objeví (opacity 0 → 1, `scale(.96 → 1)`, 1,2 s, `transform-origin` ke středu oblouku), soustředné kruhy o 0,4 s později. `prefers-reduced-motion`: bez animace.

### 13.4 Kontrast a kontrola
- Axe WCAG 2.2 AA na úvodu (1440, 1280, 1024, 375, 320 px). Změřit poměry: nadpis #1F2421, „citem“ #8A5C2E, štítek #6E4826, perex #2F3531 na #F7F1E4; text nesmí ležet na dubovém oblouku.
- Lighthouse úvod mobil: výkon ≥ 95, přístupnost 100.

### Výstup dávky 13
1. Screenshoty hero před a po na 1440, 1280, 1024, 375 a 320 px.
2. Axe a Lighthouse, tabulka kontrastu.
3. Potvrdit, že se nezměnily texty (jen styl slova „citem“ a druhého řádku), kresba, podpis ani sekce pod hero.
4. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md` (kořen projektu): hero „Velký výrok“, základ #F7F1E4, oblouk #DDBB82, `titleAccent`. V UPRAVY dávku 12 označit „nahrazeno dávkou 13“ a dávku 13 HOTOVO.

### Výsledek dávky 13 (Claude Code, 8. 11. 2026)
- **13.1 Pozadí a oblouk.** Základ #F7F1E4 a zrno (.16, `multiply`) beze změny. Kruh a soustředné kruhy z dávky 12 i mřížka jsou pryč. Dubový oblouk `--hero-arc-color` #DDBB82 je kotvený k hero: nový dekorativní prvek `.hero__arc` (`aria-hidden`, `inset: 0`, `z-index: -2`) s `radial-gradient(circle 430px at 86% 108%, #DDBB82 0 99%, transparent 100%)`, přesahující dolní okraj a oříznutý přes `overflow-x: clip` na hero. Soustředné kruhy `.hero__rings`: `repeating-radial-gradient(circle at 86% 108%, transparent 0 44px, rgba(138,92,46,.18) 44px 45px)` s maskou `radial-gradient(circle at 86% 108%, #000 0 40%, transparent 80%)` (+ `-webkit-mask`), `pointer-events: none`. Hodnoty jsou tokeny (`--hero-arc-r/x/y`, `--hero-ring-step`, `--hero-ring-color`). **Kresba:** sloupec s kresbou je `align-self: start` (kresba stojí co nejvýš), podstavy reprosoustav leží na horním okraji oblouku a o zhruba 100 px do něj zasahují. Přesně „na okraji“ nejde, protože při výšce hero ≤ 780 px a kresbě 300 px široké (≈ 445 px vysoké) horní okraj oblouku (y ≈ 380 px od vršku hero) leží níž než spodek kresby, která začíná u horního okraje.
- **13.2 Typografie.** `--fs-hero` `clamp(44px, 8.4vw, 116px)`, `line-height: .96`, `letter-spacing: -.035em`, první řádek `max-width: 9ch` (zalamuje se „Reprosoustavy / s citem pro / hudbu.“ na všech šířkách), Familjen Grotesk 500. Slovo „citem“ je v `<em class="hero__accent">` (`font-style: normal`, `--c-dub-text` #8A5C2E); nové pole `titleAccent: citem` v `home.yaml` (schéma `content.config.ts`, nepovinné; bez pole se nadpis vykreslí bez zvýraznění, nadpis v textu zůstává bez značkování). Druhý řádek je štítek: IBM Plex Mono 500, 14 px, verzálky, `letter-spacing .1em`, `#6E4826`; texty i oddělovače „|“ beze změny. Štítek nad nadpisem a perex beze změny.
- **13.3 Rozvržení a responzivita.** Od 1024 px dva sloupce `1.4fr .6fr`, kresba `min(100%, 300px)`, podpis 170 px. Do 820 px jeden sloupec, kresba pod textem vystředěná, oblouk `circle 260px at 100% 106%` a kruhy po 36 px (`--hero-arc-*` přepsané na hero). Slovo „Reprosoustavy“ nepřetéká ani na 320 px (min. 44 px stačí; test to hlídá). **Doplněk:** druhý řádek (štítek) se na 320 px nevešel na jeden řádek, proto je do 360 px 12 px s prostrkáním .06em (jinak by byl useknutý). Výška hero nejvýš 780 px (hlídá test). Animace: oblouk se zobrazí opacity 0 → 1 a `scale(.96 → 1)` za 1,2 s (`transform-origin` ve středu oblouku), kruhy o 0,4 s později za 0,8 s; kresba a podpis beze změny; při `prefers-reduced-motion: reduce` bez animace.
- **13.4 Kontrola.** Axe WCAG 2.2 AA na úvodu na 1440, 1280, 1024, 375, 320 px (a 390 px) bez chyb; testy 105 zelených (4 nové pro úvod/hero). Žádný text neleží na dubovém oblouku; na oblouku je jen kresba a podpis (grafit, 8,63 : 1).

### Výstup dávky 13
1. Screenshoty hero před a po (1440, 1280, 1024, 375, 320 px): `screenshots/davka13-pred-hero-*.png` a `screenshots/davka13-po-hero-*.png` (složka je mimo git).
2. Axe bez chyb (výše), Lighthouse mobil: úvod **výkon 99 / přístupnost 100 / best practices 100** (před dávkou 100 / 100 / 100, tedy −1 bod), CLS 0,006.
3. Kontrast (základ #F7F1E4; „se zrnem“ = odhad nejtmavšího místa po vynásobení zrnem ~#EBE5D8):

| Text | základ #F7F1E4 | se zrnem |
|---|---|---|
| nadpis #1F2421 | 14,00 | 12,56 |
| „citem“ #8A5C2E (velký text, limit 3 : 1) | 5,11 | 4,58 |
| štítek druhého řádku #6E4826 (skutečná barva; zadání #5E3D22 = 8,61 / 7,72) | 7,13 | 6,39 |
| perex #1F2421 (skutečná barva; zadání #2F3531 = 11,14 / 9,99) | 14,00 | 12,56 |
| kresba a podpis (grafit) na oblouku #DDBB82 | 8,63 | – |
Barvy štítku a perexu se liší od zadání (viz dávka 12), poměry vyhovují; barvy jsem neměnil.
4. **Potvrzeno:** texty (jen styl slova „citem“ a druhého řádku), kresba, podpis ani sekce pod hero se nezměnily. V `home.yaml` přibylo jen `titleAccent: citem`.
5. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md`; dávka 12 označena „nahrazeno dávkou 13“.



## Dávka 13b – hero: menší nadpis na dva řádky, celé hero nad ohybem

Stav: **HOTOVO** (8. 11. 2026). Původně SCHVÁLENO (Lukáš, 8. 11. 2026). Doladění dávky 13. Po nasazení je hero výrazné, ale nadpis se na širokém okně zalomí na tři řádky („hudbu.“ samo), takže perex a podpis zůstanou pod ohybem. Mění se **jen velikost a zalomení nadpisu a svislé rozměry hero**. Texty, barvy, oblouk, kresba, podpis ani animace se nemění.

### 13b.1 Nadpis
- `font-size: clamp(40px, 6.6vw, 96px)` (dnes až 116 px, minimum 44 px).
- Zalomení: od **1024 px** přesně **dva řádky**: „Reprosoustavy“ / „s citem pro hudbu.“ Řešení zvolit robustní (například `text-wrap: balance` s `max-width` kolem 19ch, případně druhá část v `white-space: nowrap` od 1024 px). Slovo „citem“ zůstává v dubu přes `titleAccent`.
- 821–1023 px: dva až tři řádky, přijatelné. Do 820 px: tři řádky („Reprosoustavy“ / „s citem pro“ / „hudbu.“) jsou v pořádku, ale nesmí přetéct ani se rozdělit slovo na **375 a 320 px** (pokud ano, snížit minimum 40 px).
- `line-height` .98, `letter-spacing` -.03em.

### 13b.2 Celé hero nad ohybem
- Cíl: na **1920 × 1080** (okno asi 950 px) je vidět celé hero včetně perexu a podpisu; na **1440 × 900** (okno asi 780 px) je celý perex vidět a podpis smí být částečně pod ohybem. Hlavička se na desktopu před scrollem nemění.
- Svislé odsazení hero `clamp(32px, 5vw, 72px)`, mezery mezi štítkem, nadpisem, druhým štítkem a perexem 14 px.
- Kresba: `max-height: clamp(320px, 52vh, 520px)`, šířka podle poměru stran, podpis úměrně menší. Oblouk zůstává zakotvený v pravém dolním rohu hero (poloměr úměrně k výšce).
- Výška hero nejvýš 780 px (pravidlo z dávky 13).

### 13b.3 Kontrola
- Screenshoty hero před a po na 1920 × 1080, 1440 × 900, 1366 × 768, 1024 × 768, 375 a 320 px (celá výška okna, ne celá stránka).
- Axe a Lighthouse beze zhoršení (výkon ≥ 95, přístupnost 100). Změřit, že v 1920 × 1080 i 1440 × 900 jsou splněné cíle z 13b.2.

### Výstup dávky 13b
1. Screenshoty podle 13b.3.
2. Počet řádků nadpisu na každé šířce (tabulka šířka · počet řádků).
3. Potvrdit, že se nezměnily texty, barvy a pozadí hero.
4. Commit včetně `docs/UPRAVY.md`; dávku 13b označit HOTOVO.

### Výsledek dávky 13b (Claude Code, 8. 11. 2026)
- **13b.1 Nadpis.** `--fs-hero` `clamp(40px, 6.6vw, 96px)`, `line-height: .98`, `letter-spacing: -.03em`. Zalomení řeší `text-wrap: balance` s `max-width: 19ch` na prvním řádku nadpisu: „s citem“ drží pohromadě nezlomitelná mezera z `typo()`, takže nejvyváženější dvouřádkové zalomení je „Reprosoustavy“ / „s citem pro hudbu.“ (ověřeno screenshoty). Slovo „citem“ zůstává v dubu přes `titleAccent`. Dřívější `max-width: 9ch` je pryč.
- **13b.2 Hero nad ohybem.** Svislé odsazení hero `clamp(32px, 5vw, 72px)` (od 1024 px a na tabletu; mobil beze změny), mezery štítek → nadpis → druhý štítek → perex 14 px. Kresba má šířku `min(100cqi, 300px, clamp(320px, 52vh, 520px) × 0,674)` (poměr stran 378 : 561), tedy výšku nejvýš `clamp(320px, 52vh, 520px)`; podpis je úměrně menší (`0,567 ×` šířka kresby, tj. 170 px při 300 px). Poloměr oblouku `--hero-arc-r` `clamp(300px, (100svh − výška hlavičky) × .57, 430px)` je úměrný výšce hero (oblouk zůstal v pravém dolním rohu). Výška hero nejvýš 780 px.
- **Změřeno (okno = obrazovka bez lišt prohlížeče):** 1920 × 1080 (okno 950 px): perex končí na 723 px, podpis na 788 px, hero 780 px vysoké → celé hero včetně perexu a podpisu je v okně. 1440 × 900 (okno 780 px): perex 646 px, podpis 690 px → oboje v okně (cíl splněn i pro podpis). 1366 × 768 (okno 650 px): perex 581 px, podpis 593 px; 1024 × 768 (okno 650 px): perex 547 px, podpis 581 px. Před úpravou (dávka 13) byl na 1440 × 780 perex na 731 px, tedy pod ohybem. Hlavička se před scrollem nezměnila.
- Hlídá to nový test (`layout.spec.ts`): od 1024 px dva řádky nadpisu, perex v okně na 1920 × 950, 1440 × 780, 1366 × 650 a 1024 × 650, hero ≤ 780 px, podpis na 1920 × 950 v okně.

### Výstup dávky 13b
1. Screenshoty (výška okna, ne celá stránka) před a po: `screenshots/davka13b-pred-*.png` a `screenshots/davka13b-po-*.png` pro 1920 × 1080 (okno 950), 1440 × 900 (okno 780), 1366 × 768 (okno 650), 1024 × 768 (okno 650), 375 (okno 812) a 320 px (okno 700). Složka je mimo git.
2. Počet řádků nadpisu (změřeno prohlížečem, výchozí text):

| Šířka | řádků | písmo |
|---|---|---|
| 1920 | 2 | 96 px |
| 1600 | 2 | 96 px |
| 1440 | 2 | 95 px |
| 1366 | 2 | 90 px |
| 1280 | 2 | 84 px |
| 1100 | 2 | 73 px |
| 1024 | 2 | 68 px |
| 900 | 2 | 59 px |
| 821 | 2 | 54 px |
| 768 | 2 | 51 px |
| 414 | 2 | 40 px |
| 375 | 2 | 40 px |
| 320 | 3 („Reprosoustavy“ / „s citem pro“ / „hudbu.“) | 40 px |
Na 375 a 320 px slovo „Reprosoustavy“ nepřetéká ani se nedělí (minimum 40 px stačí), na 320 px zbývá do okraje 46 px.
3. Axe a Lighthouse: testy 109 zelených včetně axe WCAG 2.2 AA na úvodu na 1440, 1280, 1024, 390, 375 a 320 px; Lighthouse mobil úvod **výkon 100 / přístupnost 100 / best practices 100**, CLS 0,011.
4. **Potvrzeno:** texty, barvy a pozadí hero (základ, zrno, barva a tvar oblouku, kruhy) se nezměnily; změnila se jen velikost a zalomení nadpisu, svislé odsazení, mezery, velikost kresby a podpisu a poloměr oblouku úměrně výšce (podle zadání).
5. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md`; dávka 13b označena HOTOVO.



## Dávka 14 – jednotná tlačítka: pilulka, hnědá na světlém, světlá na tmavém

Stav: **HOTOVO** (10. 11. 2026). Původně SCHVÁLENO (Lukáš, 10. 11. 2026). Výběr v náhledu „ideTone – tlačítka“ (Cowork): zaoblení **pilulka**, barevné pravidlo **světlý podklad = vše hnědě, tmavý podklad = vše světle**, platí i pro textové odkazy. Doplňuje a upravuje systém tlačítek z dávky 11.3 (tvar, barvy obrysu a odkazů). **Texty a popisky tlačítek se nemění.** Karty, pole formulářů a ostatní prvky zůstávají s dosavadním zaoblením.

### 14.1 Tvar
- Nový token `--radius-btn: 999px` (pilulka) v `tokens.css`; používá **každé** tlačítko (`.btn`): hlavička, mobilní menu, hero (pokud je tlačítko), karty, pruhy, formuláře (odeslat), lišta s cenou na detailu modelu, stránky Děkujeme.
- `padding: 0 26px` (dnes 22 px), výška 48 px beze změny, `white-space: nowrap`.
- Na šířkách 320–420 px: pokud některý text tlačítka přetéká (např. „Zarezervujte si poslech…“), povolit zalomení, vystředit text a použít poloměr 28 px (aby nevznikla deformovaná pilulka). Texty nezkracovat.
- Textový odkaz `.link` je bez rámečku, poloměr se ho netýká.

### 14.2 Barvy podle podkladu
Tokeny `--btn-*` nastavit na `:root` pro světlý podklad a **přepsat** v tmavých kontextech (`.section--dark`, ořechový pruh Poslech / `.section--dub`, tmavý pruh na Technologii, patička, mobilní menu). Komponenta tlačítka čte jen tokeny, nikoli vlastnosti per instance.

| Druh | Světlý podklad (len, pás 1, pás 2, hero, karty) | Tmavý a ořechový podklad |
|---|---|---|
| **Plné** `.btn--primary` | pozadí #8A5C2E, text #FFFFFF, okraj #8A5C2E; hover pozadí a okraj #5E3D22 | pozadí #F5F0E8, text #4A2F1A, okraj #F5F0E8; hover pozadí a okraj #FFFFFF |
| **Obrys** `.btn--secondary` | průhledné, text a okraj **#8A5C2E**; hover pozadí #8A5C2E, text #FFFFFF | průhledné, text a okraj #F5F0E8; hover pozadí #F5F0E8, text #4A2F1A |
| **Textový** `.link` | text #6E4826, podtržení `1px solid #8A5C2E`; hover podtržení zmizí | text #F5F0E8, podtržení `1px solid #F5F0E8`; hover podtržení zmizí |

- **Obrys už není grafitový** (dnes #1F2421), je hnědý. **Textové odkazy a odkazy se šipkou** (`.arrow-link`, `.pf__link`, odkazy v obsahu typu „Detail modelu“, „Víc o řešení →“, „O ideTone →“, „Proces vývoje podrobně“, „Otevřít v Mapy.cz →“) jsou všude hnědé na světlém a světlé na tmavém. Žádný odkaz v grafitu.
- Pokud axe naměří u obrysu #8A5C2E (malý text 15 px) kontrast pod 4,5 : 1 na některém podkladu (například na zářích nebo v kartách), použít pro **text** obrysu #6E4826, okraj nechat #8A5C2E, a toto místo uvést ve výsledku.
- `:focus-visible` viditelný na všech podkladech (na tmavém světlý obrys), `prefers-reduced-motion` bez přechodu.
- Dosud použité barvy tlačítek v tmavých kontextech (#F1DFC6, #E5C9A2 u odkazů) nahradit #F5F0E8.

### 14.3 Projít všechna místa
- Znovu projít všechny stránky podle tabulky přiřazení z dávky 11 (úvod, Reprosoustavy, Sara, Reva, Technologie, Poslech, Zakázkové projekty, O ideTone, Kontakt, Děkujeme, 404, Obchodní podmínky) a ověřit, že každé tlačítko a odkaz se šipkou odpovídá druhu a podkladu. Zbylé vlastní styly zrušit.
- **Odkazové karty** (404, „další modely“ pod detailem) nejsou tlačítka a zůstávají beze změny.

### 14.4 Kontrola
- Axe WCAG 2.2 AA na všech stránkách a šířkách; změřit poměry textu a okraje tlačítek na všech podkladech (světlý len, pás 1, pás 2, sklo, grafit, ořech) a zapsat do tabulky.
- Lighthouse beze zhoršení.

### Výstup dávky 14
1. Screenshoty tlačítek na úvodu na 1280 a 375 px (světlý pás, grafitový pruh, ořechový Poslech, patička, mobilní menu) a na detailu modelu (lišta s cenou).
2. Tabulka kontrastu (druh · podklad · text · okraj · poměr).
3. Tabulka přiřazení (stránka · text · druh · podklad).
4. Potvrdit, že se nezměnily texty, rozvržení ani karty a pole formulářů.
5. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md` (kořen projektu): rozhodnutí „tlačítka: pilulka, hnědé na světlém, světlé na tmavém“. Dávku 14 označit HOTOVO.

### Výsledek dávky 14 (Claude Code, 10. 11. 2026)
- **14.1 Tvar.** Token `--radius-btn: 999px` v `tokens.css`, `.btn` ho používá (hlavička, mobilní menu, karty, pruhy, odeslání formulářů, lišta s cenou, Děkujeme), `padding: 0 26px`, výška 48 px a `nowrap` beze změny. Do 420 px se text tlačítka smí zalomit (`white-space: normal`, vystředěný, `padding: 12px 26px`, poloměr 28 px, výška aspoň 48 px); texty se nezkracovaly. Textový odkaz `.link` zůstal bez rámečku. Karty, pole formulářů a ostatní prvky mají dosavadní zaoblení.
- **14.2 Barvy podle podkladu.** Tokeny `--btn-*` (plné, obrys, textový odkaz, `--btn-focus`) jsou na `:root` pro světlý podklad a přepisují se v `.section--dark`, `.section--dub`, `.section--uhel`, `.footer` (konec `tokens.css`) a v překryvu mobilního menu (`Header.astro`). Komponenta čte jen tokeny: `.btn--on-light/dark/wood` už barvy neřeší (prop `tone` zůstal jen kvůli zpětné kompatibilitě, v dokumentaci komponenty uvedeno). Hodnoty přesně podle tabulky ze zadání (světlý: plné #8A5C2E / bílá, hover #5E3D22, obrys #8A5C2E, hover plná #8A5C2E s bílým textem, odkaz #6E4826 s podtržením #8A5C2E; tmavý: plné #F5F0E8 / #4A2F1A, hover #FFF, obrys a odkaz #F5F0E8, hover obrysu #F5F0E8 / #4A2F1A). Obrys už není grafitový. Dřívější barvy #F1DFC6 a #E5C9A2 jsou nahrazené #F5F0E8. `:focus-visible` je viditelný na všech podkladech (hnědý na světlém, #F5F0E8 na tmavém, odsazení 3 px); při `prefers-reduced-motion` bez přechodu i posunu šipky. **Záložní tmavší text obrysu (#6E4826) nebyl potřeba:** i nejhorší místo (pás 2, kontrast textu #8A5C2E 4,64 : 1; hero se zrnem 4,58 : 1) vyhovuje 4,5 : 1, axe nic nehlásí.
- **14.3 Místa.** Prošel jsem všechna místa z tabulky dávky 11 (viz tabulka přiřazení níže). Žádný odkaz v grafitu: odkazy „Detail modelu“, „Víc o řešení →“, „O ideTone →“, „Proces vývoje podrobně →“, „Otevřít v Mapy.cz / Google Maps →“ jsou `.link` (hnědé na světlém, #F5F0E8 na tmavém). Odkazové karty (404, „další modely“) beze změny.
- **14.4 Kontrola.** Axe WCAG 2.2 AA bez chyb (109 testů zelených), Lighthouse mobil: úvod **výkon 99 / přístupnost 100 / best practices 100** (před dávkou 100 / 100 / 100, −1 bod), Kontakt 97 / 100 / 100.

### Výstup dávky 14
1. Screenshoty před a po: `screenshots/davka14-pred-*.png` a `screenshots/davka14-po-*.png` – úvod celý na 1280 a 375 px (světlý pás, grafitový pruh Proces vývoje, ořechový Poslech, patička), mobilní menu 375 px, detail modelu 375 px (lišta s cenou) a 1280 px. Složka je mimo git.
2. Kontrast (WCAG poměr; okraj tlačítka má stejnou barvu jako jeho text, limit pro okraj je 3 : 1):

| Druh | Podklad | Text | Okraj | Poměr |
|---|---|---|---|---|
| plné | libovolný světlý | #FFF na #8A5C2E | #8A5C2E | 5,75 (hover #FFF na #5E3D22: 9,69) |
| obrys | len #F7F3EA | #8A5C2E | #8A5C2E | 5,19 |
| obrys | pás 1 #FCFAF5 | #8A5C2E | #8A5C2E | 5,51 |
| obrys | pás 2 #F0E6D2 | #8A5C2E | #8A5C2E | 4,64 |
| obrys | hero #F7F1E4 (se zrnem ~#EBE5D8) | #8A5C2E | #8A5C2E | 5,11 (4,58) |
| obrys | sklo nad pásem 2 (~#F6EFE0) | #8A5C2E | #8A5C2E | 5,02 |
| obrys hover | – | #FFF na #8A5C2E | – | 5,75 |
| odkaz | len / pás 1 / pás 2 / hero | #6E4826 | podtržení #8A5C2E | 7,24 / 7,69 / 6,48 / 7,13 |
| plné | grafit #262422, patička ~#2A2623 | #4A2F1A na #F5F0E8 (10,81; hover na #FFF 12,26) | #F5F0E8 | 13,63 / 13,22 (okraj vs. podklad) |
| obrys, odkaz | grafit #262422 | #F5F0E8 | #F5F0E8 | 13,63 |
| obrys, odkaz, plné (okraj) | ořech světlý konec #8A5C2E | #F5F0E8 | #F5F0E8 | 5,07 |
| obrys, odkaz, plné (okraj) | ořech střed #74492A / tmavý #5E3D22 | #F5F0E8 | #F5F0E8 | 6,78 / 8,54 |
| obrys hover | tmavý | #4A2F1A na #F5F0E8 | – | 10,81 |
3. Tabulka přiřazení (stránka · text · druh · podklad):

| Stránka | Text | Druh | Podklad |
|---|---|---|---|
| všechny, desktop (hlavička) | Domluvit poslech → | plné | světlý (hlavička) |
| všechny, mobil (menu) | Domluvit poslech → | plné | tmavý překryv |
| Úvod | Detail modelu Sara →, Detail modelu Reva → | textový | pás 1 |
| Úvod | Porovnat modely → | obrys | pás 1 |
| Úvod | O ideTone → | textový | pás 2 |
| Úvod | Proces vývoje podrobně → | textový | grafit |
| Úvod | Víc o řešení → (3×) | textový | pás 2 |
| Úvod | Jak to funguje → | obrys | pás 2 |
| Úvod | Zarezervujte si poslech… | plné | ořech |
| Reprosoustavy | Zakázkové projekty → | obrys | světlý pás |
| Sara, Reva | Objednat → (i lišta s cenou na mobilu) | plné | světlý / sklo |
| Sara, Reva | Domluvit poslech → | obrys | světlý |
| Technologie | Domluvit poslech → | plné | grafit (`uhel`) |
| Zakázkové projekty | Odeslat poptávku → | plné | karta (sklo) |
| Poslech | Domluvit poslech → (formulář) | plné | karta (sklo) |
| Poslech | Otevřít v Mapy.cz →, Otevřít v Google Maps → | textový | ořech |
| O ideTone | Prohlédnout modely → | plné | světlý |
| O ideTone | Technologie → | obrys | světlý |
| Kontakt | Odeslat zprávu → | plné | karta (sklo) |
| Děkujeme | Prohlédnout modely → / Úvodní stránka → | plné / obrys | světlý |
| 404, další modely pod detailem | odkazové karty | beze změny | – |
| Obchodní podmínky | – | bez tlačítek | – |
4. **Potvrzeno:** texty a popisky tlačítek, rozvržení, karty a pole formulářů se nezměnily (změnil se jen tvar a barva tlačítek a barva textových odkazů).
5. Commit včetně `docs/UPRAVY.md` a `idetone-rozhodnuti.md`; dávka 14 označena HOTOVO.

