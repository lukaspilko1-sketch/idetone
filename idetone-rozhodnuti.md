# ideTone – stav projektu a rozhodnutí

Poslední aktualizace: 1. 10. 2026
Fáze: zadání hotové – SUPERPROMPT.md 1.0 a CLAUDE.md uloženy v kořeni složky idetone, čeká se na založení repozitáře a spuštění Claude Code. Hrubý nástřel směru a sitemapy schválen jako základ (artifact „ideTone – směr webu“, verze 0.1); doladí se podle inspiračních webů.

Tento soubor je jediný zdroj pravdy o stavu projektu. Kopie je v Claude projektu „WEB - ideTone“ (claude/idetone-rozhodnuti.md) a ve složce webu na PC. Při změně aktualizovat obě.

## Platforma a provoz
- Statický web: Astro, texty v Markdownu / content collections
- Hosting: GitHub Pages, doména idetone.cz zůstává (CNAME v DNS), deploy přes GitHub Actions
- Repozitář: zakládá Lukáš ručně, Claude Code pracuje v existujícím repozitáři; old-web/ se přesune do podklady/old-web/ (v repu, mimo build)
- Písma self-hosted (@fontsource) kvůli GDPR, mapy bez iframe
- Přesměrování starých URL /index.php/… na nové
- Lokální složka: C:\Users\lukas\Documents\PRACOVNÍ\Weby\idetone (podklady starého webu v old-web/)
- Pozor: nadřazená složka Weby je sama git repozitář – rozhodnout, zda idetone bude samostatný repo (submodul / vyřadit z nadřazeného .gitignore)
- Formuláře: Formspree (GitHub Pages nemá server), honeypot + souhlas GDPR
- Jazyky: CZ při spuštění, struktura připravená na EN (/en/), zatím skrytá
- Postup: zadání a texty ladíme v Cowork, web staví Claude Code. V repozitáři bude CLAUDE.md vygenerovaný z tohoto souboru.

## Identita (návrh 0.1, doladit podle inspiračních webů)
- Směr: severské řemeslo – dřevo, len, klid
- Paleta: Len #E9E6DF (pozadí), Papír #F5F3EE (karty), Jedle #24342D (hlavní plochy, CTA), Dub #A8743F (akcent), Grafit #1F2421 (text), Šalvěj #8E9B88 (doplňková)
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

## Historie rozhodnutí
- 1. 10. 2026: platforma Astro + GitHub Pages, nová identita (severské řemeslo), formulářový prodej, CZ + příprava EN, přesné ceny, logo ze stávající hlavičky, deník zatím skrytý, repozitář zakládá Lukáš
- 1. 10. 2026: SUPERPROMPT.md 1.0 + CLAUDE.md, old-web jde do repozitáře, jen světlý režim, reference a EN za feature flagy
