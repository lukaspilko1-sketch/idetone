# ideTone – stav projektu a rozhodnutí

Poslední aktualizace: 1. 10. 2026
Fáze: **F2 – Obsah a stránky hotová, čeká na schválení** (content collections, texty ze starého webu, všechny stránky ze sitemapy, galerie, SpecTable, CompareTable, SVG schéma zvukovodu). F0 a F1 schváleny a pushnuty. Další: F3 – Formuláře, SEO, redirecty. Zadání: SUPERPROMPT.md 1.1.

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
- Formspree účet a ID formulářů (Lukáš)
- Graf impedance Revy, dostupnost / dodací lhůta
- Sara: středobas 6,5" ve specifikaci vs. „sedmipalcový“ v textu
- Firemní údaje: název, IČO, DIČ, telefon
- Obchodní podmínky, zásady ochrany osobních údajů
- Fotky Revy (žádné nejsou – všechny fotky ze starého webu jsou Sara), fotka přepínače výšek (na starém webu ideTone-technologie-urovne-vysek.png, v podkladech chybí), portrét Petra, dílna, studio, spodní část Sary s bassreflexem
- Kreslené ilustrace (tužkové skici) v podkladech nejsou – 01.png a 02.png jsou screenshoty starého webu
- Ke schválení (NÁVRH): texty úvodu (hero, nadpisy sekcí, zkrácené texty technologií, pruh Poslech), meta popisy všech stránek, perexy, „Který model pro mě?“, celá stránka Zakázkové projekty, možnosti poslechu (studio / u zákazníka), GDPR text, doplnění „během let“ v O ideTone
- Kdy je možné domluvit poslech (dny, časy) → settings.yaml studio.hours
- Formspree: ověřit podmínky a přenos dat do USA pro text GDPR (Lukáš)
- Weby/.gitignore: doplnit `idetone/` (Lukáš)
- Repozitář je soukromý (stránka Actions zvenku 404) → před F4 zveřejnit kvůli GitHub Pages (Lukáš)
- GitHub: zapnout Pages (Source: GitHub Actions) a nastavit proměnnou PAGES_DEPLOY=true až ve fázi F4 (Lukáš)

## Historie rozhodnutí
- 1. 10. 2026: platforma Astro + GitHub Pages, nová identita (severské řemeslo), formulářový prodej, CZ + příprava EN, přesné ceny, logo ze stávající hlavičky, deník zatím skrytý, repozitář zakládá Lukáš
- 1. 10. 2026: SUPERPROMPT.md 1.0 + CLAUDE.md, old-web jde do repozitáře, jen světlý režim, reference a EN za feature flagy
- 1. 10. 2026 (F0): Astro 7 + Node 24 LTS; site/base/indexace z proměnných prostředí; testovací URL lukaspilko1-sketch.github.io/idetone/; CNAME se nevytváří (rozpor v SUPERPROMPT kap. 12 vs. kap. 2 – platí kap. 2); workflow dělá build + check při každém push, nasazení jen s proměnnou PAGES_DEPLOY=true; robots.txt generovaný podle PUBLIC_INDEXING; Markdown se Prettierem neformátuje
- 1. 10. 2026 (F1): písma přes Astro Fonts API ze souborů @fontsource (jen použité řezy, latin + latin-ext, automatické záložní metriky, preload Figtree 400); Ω (U+03A9) v IBM Plex Mono není, vykreslí se záložním písmem; doplňkové tokeny --c-dub-light #C99560 (akcent na jedli), --c-on-dark #EDEAE3, --c-on-dark-muted, --c-line-dark, --c-jedle-hover; mobilní menu bez JS = odkaz na navigaci v patičce; favicon „T“ (geometrický, bez závislosti na písmu); Kontakt je v menu i s tlačítkem Objednat; dev toolbar Astro vypnutý
- 1. 10. 2026 (F2): obsah klienta v datech – home.yaml (sekce + visible + pořadí), settings.yaml (kontakty, studio, firma, sociální sítě), products/*.md, pages/*.md; site.ts jen technika (flagy, navigace, Formspree); texty Konstrukce u produktů jako ### bloky v těle Markdownu; Reva v datech jako „kompaktní reprosoustava na stojan“ (podle zadání, TODO ověřit) a z úvodní věty vypuštěno „sloupová“; redakční úpravy textů (překlepy řešením/řetězci, „ve většině poslechových podmínek“, „pečlivou prací“, „směrovým charakteristikám“, jednotky s mezerou a nezlomitelnou mezerou, česká desetinná čárka, −); obrázky přes Picture AVIF+WebP s WebP fallbackem (build 27 MB → 7,6 MB); formuláře zatím jako FormPlaceholder s e-mailem (F3); stránka 404 a EN až v F3 / po zapnutí flagu; deník: šablony hotové, při journal=false se negenerují, ukázkový článek draft
- 1. 10. 2026: tmavá barva Jedle #24342D nahrazena barvou Uhel #262422 (teplý antracit) – Lukášovi zelená neseděla; porovnány Uhel / Břidlice #2B3035 / Tabák #2E2621, Břidlice zavrhnuta (táhne do modra, zadání vylučuje modré), Tabák splývá s dubem; token přejmenován na --c-uhel, odvozené: hover #34312D, linky #45413C, sekundární text #B8B2A8; patička dostala horní linku (odděluje se od tmavého pruhu Poslech); design tokeny verze 0.3
