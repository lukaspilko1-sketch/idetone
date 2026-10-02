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

