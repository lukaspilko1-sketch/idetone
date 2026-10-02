# ideTone – stav projektu a rozhodnutí

Poslední aktualizace: 1. 10. 2026
Fáze: **Ladění designu – dávka 4 (výraznější dub) hotová, čeká na kontrolu**. Další dávka: podstránky po zpětné vazbě klienta. Web běží na testovací adrese https://lukaspilko1-sketch.github.io/idetone/ (noindex). F5 – Admin panel odložena.

Tento soubor je jediný zdroj pravdy o stavu projektu. Kopie je v Claude projektu „WEB - ideTone“ (claude/idetone-rozhodnuti.md) a ve složce webu na PC. Při změně aktualizovat obě.

## Platforma a provoz
- Statický web: Astro, texty v Markdownu / content collections
- Hosting: GitHub Pages, deploy přes GitHub Actions. Teď testovací provoz na https://lukaspilko1-sketch.github.io/idetone/ (noindex); doména idetone.cz + public/CNAME až při přepnutí (změna proměnných repozitáře SITE_URL, BASE_PATH, PUBLIC_INDEXING + jeden soubor)
- Repozitář: github.com/lukaspilko1-sketch/idetone (veřejný); old-web/ přesunut do podklady/old-web/ (v repu, mimo build)
- Astro 7.3, Node 24 LTS
- Písma self-hosted (@fontsource) kvůli GDPR, mapy bez iframe
- Přesměrování starých URL /index.php/… na nové
- Lokální složka: C:\Users\lukas\Documents\PRACOVNÍ\Weby\idetone (podklady starého webu v podklady/old-web/)
- Pozor: nadřazená složka Weby je sama git repozitář a nemá .gitignore; idetone/ se v ní ukazuje jako nesledovaná složka → Lukáš doplní `idetone/` do Weby/.gitignore
- Formuláře: Formspree (GitHub Pages nemá server), honeypot + souhlas GDPR
- Jazyky: CZ při spuštění, struktura připravená na EN (/en/), zatím skrytá
- Postup: zadání a texty ladíme v Cowork, web staví Claude Code. V repozitáři bude CLAUDE.md vygenerovaný z tohoto souboru.

## Identita (návrh 0.1, doladit podle inspiračních webů)
- Směr: severské řemeslo – dřevo, len, klid
- Sklo: tmavé plochy jako matné sklo nad rozostřeným dřevem (od 1. 10. 2026)
- Paleta: Len #E9E6DF (pozadí), Papír #F5F3EE (karty), Uhel #262422 – teplý antracit (hlavní plochy, CTA; od 1. 10. 2026 místo Jedle #24342D), Dub #A8743F (akcent), Grafit #1F2421 (text), Šalvěj #8E9B88 (doplňková)
- Písma: Familjen Grotesk (nadpisy), Figtree (text), IBM Plex Mono (data, specifikace, logo)
- Logo: stávající wordmark z hlavičky („ide“ tmavě + „Tone“ v akcentu, prostrkaný strojopis), jako SVG; později dodá grafik
- Fotky: zatím vyříznuté produktové fotky (průhledné pozadí) ze starého webu, klient dodá atmosférické
- Inspirační weby: dodá klient později

## Sitemapa
- / Úvod
- /reprosoustavy/ (přehled + srovnání Sara vs. Reva)
- /reprosoustavy/sara/
- /reprosoustavy/reva/ (+ stojany)
- /zakazkove-projekty/ (zatím jen info + formulář)
- /technologie/
- /poslech/ (studio Brno, domluva termínu)
- /o-idetone/
- /kontakt/ (+ objednávka)
- /obchodni-podminky/, /ochrana-osobnich-udaju/
- /en/ (připraveno, skryté)
- Deník / novinky: ZATÍM SKRYTÝ – připravit strukturu (content collection), ale nezobrazovat v menu ani na úvodu; zapne se později
- Reference: zatím sekce na úvodu a u produktů (skrytá, dokud nebudou citace)

## Úvodní stránka – pořadí sekcí
1. Hero (claim, věta, CTA modely + poslech, vyříznutý produkt na jedlové ploše)
2. Modely (Sara, Reva – fotka, 3 parametry, cena)
3. Přístup (citát Petra Kocourka)
4. Technologie (3 řešení, střídání stran)
5. Poslech (jedlový pruh, adresa studia, CTA)
6. Reference (skrytá, dokud nejsou)
7. Patička

## Obsah a funkce
- Prodej: poptávkový / objednávkový formulář, bez košíku
- Formuláře: Objednávka (model, stojany u Revy), Poslech (termín, studio / u zákazníka), Zakázka (místnost, sestava, rozpočet)

## Ceny (přesné)
- Sara: 227 000 Kč/pár
- Reva: 132 000 Kč/pár
- Stojany: 25 000 Kč/pár – jen k Revě

## Kontakt
- Pouze Petr Kocourek, pkocourek@idetone.cz
- Poslechové studio: Filipínského 59, Brno (parkování v areálu Kaláb nebo na ulici)
- Facebook: https://www.facebook.com/profile.php?id=61573306168822

## Čeká na dodání / ověření
- Inspirační weby (klient)
- Fotky a grafika, logo (klient)
- Vlastní text Revy (teď skoro stejný jako Sara)
- Typ Revy: na starém webu „sloupová“, ale výška 440 mm a samostatné stojany → spíš kompaktní na stojan
- Formspree účet a ID tří formulářů (Lukáš) → `formspree` v src/config/site.ts. Bez placeného tarifu Formspree nefunguje vlastní děkovací stránka u odeslání bez JS (`_next`), návštěvník bez JS skončí na stránce Formspree; s JS vše funguje na free tarifu
- Dostupnost / dodací lhůta → schema.org Offer má zatím `PreOrder` (na objednávku)
- Graf impedance Revy, dostupnost / dodací lhůta
- Sara: středobas 6,5" ve specifikaci vs. „sedmipalcový“ v textu
- Firemní údaje: název, IČO, DIČ, telefon
- Obchodní podmínky, zásady ochrany osobních údajů
- Fotky Revy (žádné nejsou – všechny fotky ze starého webu jsou Sara), fotka přepínače výšek (na starém webu ideTone-technologie-urovne-vysek.png, v podkladech chybí), portrét Petra, dílna, studio, spodní část Sary s bassreflexem
- Kreslené ilustrace (tužkové skici) v podkladech nejsou – 01.png a 02.png jsou screenshoty starého webu
- Kresba Sary a podpis Petra jen jako výřez ze starého webu (nízké rozlišení) → originál ve vysokém rozlišení / vektor (klient)
- „CT2034A“ v textu Proces vývoje – nejspíš norma CTA-2034-A (spinorama), ověřit (klient)
- Sestava studia: přesné názvy modelů, Accuphase PS-1200 („pračka“ na starém webu – síťový zdroj / regenerátor?) (klient)
- Ke schválení (NÁVRH): texty úvodu (hero, nadpisy sekcí, zkrácené texty technologií, pruh Poslech), meta popisy všech stránek, perexy, „Který model pro mě?“, celá stránka Zakázkové projekty, možnosti poslechu (studio / u zákazníka), GDPR text, doplnění „během let“ v O ideTone
- Kdy je možné domluvit poslech (dny, časy) → settings.yaml studio.hours
- Formspree: ověřit podmínky a přenos dat do USA pro text GDPR (Lukáš)
- Weby/.gitignore: doplnit `idetone/` (Lukáš)
- Repozitář je soukromý (stránka Actions zvenku 404) → před F4 zveřejnit kvůli GitHub Pages (Lukáš)
- GitHub: repozitář Public, Settings → Pages → Source: GitHub Actions, proměnná PAGES_DEPLOY=true, pak Run workflow (Lukáš, návod v docs/SPRAVA.md)

## Historie rozhodnutí
- 1. 10. 2026: platforma Astro + GitHub Pages, nová identita (severské řemeslo), formulářový prodej, CZ + příprava EN, přesné ceny, logo ze stávající hlavičky, deník zatím skrytý, repozitář zakládá Lukáš
- 1. 10. 2026: SUPERPROMPT.md 1.0 + CLAUDE.md, old-web jde do repozitáře, jen světlý režim, reference a EN za feature flagy
- 1. 10. 2026 (F0): Astro 7 + Node 24 LTS; site/base/indexace z proměnných prostředí; testovací URL lukaspilko1-sketch.github.io/idetone/; CNAME se nevytváří (rozpor v SUPERPROMPT kap. 12 vs. kap. 2 – platí kap. 2); workflow dělá build + check při každém push, nasazení jen s proměnnou PAGES_DEPLOY=true; robots.txt generovaný podle PUBLIC_INDEXING; Markdown se Prettierem neformátuje
- 1. 10. 2026 (F1): písma přes Astro Fonts API ze souborů @fontsource (jen použité řezy, latin + latin-ext, automatické záložní metriky, preload Figtree 400); Ω (U+03A9) v IBM Plex Mono není, vykreslí se záložním písmem; doplňkové tokeny --c-dub-light #C99560 (akcent na jedli), --c-on-dark #EDEAE3, --c-on-dark-muted, --c-line-dark, --c-jedle-hover; mobilní menu bez JS = odkaz na navigaci v patičce; favicon „T“ (geometrický, bez závislosti na písmu); Kontakt je v menu i s tlačítkem Objednat; dev toolbar Astro vypnutý
- 1. 10. 2026 (F2): obsah klienta v datech – home.yaml (sekce + visible + pořadí), settings.yaml (kontakty, studio, firma, sociální sítě), products/*.md, pages/*.md; site.ts jen technika (flagy, navigace, Formspree); texty Konstrukce u produktů jako ### bloky v těle Markdownu; Reva v datech jako „kompaktní reprosoustava na stojan“ (podle zadání, TODO ověřit) a z úvodní věty vypuštěno „sloupová“; redakční úpravy textů (překlepy řešením/řetězci, „ve většině poslechových podmínek“, „pečlivou prací“, „směrovým charakteristikám“, jednotky s mezerou a nezlomitelnou mezerou, česká desetinná čárka, −); obrázky přes Picture AVIF+WebP s WebP fallbackem (build 27 MB → 7,6 MB); formuláře zatím jako FormPlaceholder s e-mailem (F3); stránka 404 a EN až v F3 / po zapnutí flagu; deník: šablony hotové, při journal=false se negenerují, ukázkový článek draft
- 1. 10. 2026: tmavá barva Jedle #24342D nahrazena barvou Uhel #262422 (teplý antracit) – Lukášovi zelená neseděla; porovnány Uhel / Břidlice #2B3035 / Tabák #2E2621, Břidlice zavrhnuta (táhne do modra, zadání vylučuje modré), Tabák splývá s dubem; token přejmenován na --c-uhel, odvozené: hover #34312D, linky #45413C, sekundární text #B8B2A8; patička dostala horní linku (odděluje se od tmavého pruhu Poslech); design tokeny verze 0.3
- 1. 10. 2026 (F3): jeden ContactForm pro 3 typy; odeslání fetch + JSON na Formspree, chyby u polí, souhrn v aria-live, stavy odesílám/úspěch/chyba (síť vs. služba, vždy s e-mailem jako zálohou); bez Formspree ID hláška „odesílání není aktivní“ (v dev navíc upozornění v rámečku); názvy polí česky (čitelné v e-mailu Petrovi), e-mail jako `email` (Formspree ho použije pro odpověď); povinný telefon jen u objednávky; nové tokeny --c-field #FDFCF9 a --c-error #9E3B2B; OG obrázky generované screenshotem z dev předlohy (stejná písma a barvy jako web), Reva bez fotky má v OG jen text; JSON-LD bez otevírací doby (neznáme); redirect cíle s base cestou; /dekujeme/ a 404 noindex a mimo sitemapu
- 1. 10. 2026: glass efekt na tmavých plochách (přání Lukáše – vzdušnější, modernější); vědomě ruší bod „žádný glassmorphism“ ze SUPERPROMPT kap. 10. Řešení: za Uhlem prosvítá silně rozostřená fotka dřeva (360 px WebP, pár kB), skleněné karty (štítek modelu v hero, karta s adresou v pruhu Poslech), mobilní menu a lightbox jako tmavé sklo přes stránku, hlavička po scrollu a lišta s cenou jako světlé sklo; bez podpory backdrop-filter plné barvy; design tokeny verze 0.4
- 1. 10. 2026 (F4): axe – čísla kroků Zakázkových projektů na mobilu v --c-dub-text (dub neměl kontrast); kontrast textu na skle změřen z pixelů pozadí → --glass-tint 0,66 a --c-on-dark-muted #C8C2B8 (nejhorší místo 4,7 : 1), malý text na skleněných kartách v plné barvě; Lighthouse přes Chromium z Playwrightu (chrome-launcher na Windows nespustí prohlížeč); CI: actions v7/v5, samostatný job s testy, deploy až po buildu i testech; Formspree free tarif (Lukáš: stačí)
- 1. 10. 2026: glass v aktuální podobě schválen („zatím ok“); F5 (admin panel) odložena – nejdřív ladění designu podle oblíbených webů klienta
- 2. 10. 2026 (dávka 1): hlavička fixed s rezervou nad obsahem (žádné skákání), velké logo na střed jako Focal/Dynaudio, po scrollu logo vlevo; logo Plex Mono 600, prostrkání 0,3 em (bylo 500 / 0,42 em); šipka u podmenu kreslená v CSS; View Transitions (ClientRouter) – skripty přes onPage() v src/utils/lifecycle.ts; ceny na úvodu vypnuté přepínačem showPrices v home.yaml; Reva do dodání fotek jako obrysová kresba (ProductSilhouette); bloky modelů přes container queries; typografie jen přes sémantické tokeny, citát textovým písmem 400; ilustrační AI fotky s placeholder: true a filtrem saturate(.85); hero pozadí = rozostřená ilustrace dílny s Ken Burns (připraveno na video); opravena chyba nezlomitelných mezer u jednotek (regulární výraz od F2); kontrast textu na skle po změně pozadí přeměřen (min. 4,67 : 1); design tokeny verze 0.5
- 2. 10. 2026 (dávka 2): logo vcelku bez prostrkání a menší; hero světlé s kresbou a podpisem (animace maskou, čisté CSS), bez tlačítek a bez tmavého panelu – HeroMedia a Ken Burns odstraněny; modely ve dvou stejných sloupcích bez specifikací (specifikace jen na detailu a ve srovnání, i přehled modelů je bez nich), Sara s fotkou DSC_0800i i jako první v galerii (kvůli plynulému přechodu); nové sekce Koncept a Proces vývoje s texty ze starého úvodu idetone.cz (redakčně jen interpunkce a jedno „je“ → „jsou“), Principy konstrukce a plný Proces vývoje na Technologiích, sestava studia v settings.yaml; citát o složitém celku na úvodu skrytý (visible: false), zůstává v textu O ideTone; při omezeném pohybu jen prolnutí místo vypnutí všeho (WCAG); komponenta ProcessSteps pro úvod i Technologie
- 2. 10. 2026 (po dávce 2, pokyn Lukáše): hero na desktopu přes celou výšku pod hlavičkou, větší nadpis (--fs-hero) a kresba až 1,5× nativní výšky, kresba uprostřed pravé poloviny; animace zpomalené přes tokeny – kresba 3,2 s, podpis 2,4 s od 2,6 s, nástup textu 800 ms po 140 ms, odkrytí sekcí 700 ms, fotek 1 s, prolnutí 500 ms, přechod stránek 400 ms
- 2. 10. 2026 (pokyny Lukáše): hero – štítek „Ručně laděné reprosoustavy“, nadpis „Reprosoustavy s citem pro hudbu. / Emoce i klid. / Na celý život.“ (věta na řádek, na desktopu bez zalomení, --fs-hero 34–44 px), z věty vypuštěno „dvoupásmové“; odkaz „Modely ↓“ zrušen, pod hero dělicí linka; tlačítko Objednat v hlavičce skryté (showHeaderOrder = false v site.ts); názvy modelů na úvodu o 20 % menší; logo na mobilu 32 → 24 px; bez dělicích čar u textů v Procesu vývoje, Technologiích na úvodu a v Konstrukci na detailu; CTA tlačítka zaoblená 6 px (--radius-btn)
- 2. 10. 2026 (pokyny Lukáše): hero – text začíná nahoře, levý sloupec 2/3 a kresba 1/3, nadpis na dvou řádcích („Reprosoustavy s citem pro hudbu.“ / „Emoce i klid. Na celý život.“), velikost max. 76 px, ale omezená šířkou sloupce (7cqi), aby se věta nezalomila – na obsahu 1200 px vychází 54 px; názvy modelů na úvodu 0,64 × --fs-model; CTA tlačítka zaoblená 12 px
- 2. 10. 2026 (pokyn Lukáše): v hero druhý řádek nadpisu („Emoce i klid. Na celý život.“) 0,8 velikosti hlavní věty; levá část hero na desktopu odsazená shora 48 px (cca polovina původního odsazení)
- 2. 10. 2026 (dávka 3): v hlavičce místo Objednat „Domluvit poslech“ (headerCta v site.ts); text hero svisle na střed; druhý řádek „Emoce i klid. Hodiny poslechu bez únavy.“ (varianta a); pozadí hero A+B – zrnitost papíru, světlo, mřížka v oválu a kóty z dat Sary (vypínatelné v home.yaml → decor); zaoblení jen dvěma tokeny --radius-m 12 px a --radius-s 6 px (checkbox 4 px); sklo hlavičky 0,94 + blur 20 px; design tokeny verze 0.6
- 2. 10. 2026 (pokyn Lukáše): kóty v hero vypnuté (decor.dimensions: false), mřížka, světlo a papír zůstávají
- 2. 10. 2026 (dávka 4): výraznější dub – primární CTA v #8A5C2E (hover #6E4826), pruh Poslech (úvod) a pruh s adresou (Poslech) jako ořechové dřevo s gradientem ztmaveným na #8A5C2E kvůli AA (text #F5F0E8 ≥ 5,07 : 1), štítky a typy modelů v dubu, velká dubová čísla kroků s linkou 2 px, dubové podtržení odkazů; patička zůstává antracit; v Procesu vývoje se vrátila linka nad krokem (nyní dubová 2 px – dle dávky 4, dříve odstraněná šedá); design tokeny verze 0.7
- 2. 10. 2026 (dávka 5): druhý řádek hero „Emoce | Klid | Hodiny poslechu bez únavy“ menší a v dubu s větší mezerou; animace mimo hero výrazně zpomalené pro prémiový klidný dojem (sekce 1,4 s, fotky 1,8 s, hover 450 ms, přechody stránek 0,7 s, --ease-calm)
- 2. 10. 2026 (dávka 6): podpis v hero od 1,9 s; menu 700 ms, CTA 800 ms, fotky modelů hover 1,8 s a odkrytí fotek 2,4 s; Proces vývoje bez čísel a čar (číslování zůstává jen u Postupu spolupráce na Zakázkových projektech)
- 2. 10. 2026 (dávka 7): druhý řádek hero „Emoce | Klid | Poslech bez únavy“, na mobilu na jednom řádku (písmo se přizpůsobí šířce)
