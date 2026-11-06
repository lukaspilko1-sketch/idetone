---
title: Technologie
seoTitle: Technologie – zvukovod, regulace výšek, bassreflex
# NÁVRH: ke schválení (meta popis a perex)
description: Zvukovod u výškového reproduktoru, regulace výšek −1 / 0 / +1 dB a bassreflex vyvedený dolů. Konstrukční řešení reprosoustav ideTone.
eyebrow: Technologie
lead: Principy, ze kterých vycházím, tři konstrukční řešení a postup, kterým vzniká každý model.
sections:
  # Principy konstrukce a Proces vývoje: starý úvod idetone.cz (2. 10. 2026), redakčně učesané
  - id: principy
    eyebrow: Přístup
    title: Principy konstrukce
    subsections:
      - title: Měniče
        text: |-
          Kvalitní měniče, dobré měření, souběh parametrů, spolehlivost výrobce – to vše je základ. Technicky se zaměřuji na měniče s vynikající linearitou, bez breakupů a s nízkým zkreslením. Po zvukové stránce vybírám měniče spíše neutrálního, ale zároveň příjemného a bohatšího či barevnějšího charakteru. Důraz je kladen na sladění charakterů měničů v reprosoustavě.
      - title: Frekvenční filtry
        text: |-
          Frekvenční výhybka má být jen tak složitá, jak je nezbytně nutné. Strmost filtrů a kompenzace jsou určovány daným měničem, proto volím měniče bez breakupů, které nevyžadují složité kompenzace a umožňují použití filtrů optimálně druhého řádu. Ty poskytují dobré prolnutí charakterů měničů, zvukově působí přirozeně a mají pěkný prostor bez tendence vypichovat detaily. Upřednostňuji kvalitní součástky a především jejich vhodné doplnění se zvukovým charakterem měničů.
      - title: Ozvučnice a doplňky
        text: |-
          Ozvučnice zásadním způsobem ovlivňuje chování měničů, proto je její návrh řešen již v úplném začátku. Kloubí se zde požadavky na akustické chování, ale i estetiku a vizuální dojem. Vhodný návrh podporuje dobré vlastnosti měničů, návrh filtrů a výsledné akustické vlastnosti.
    image:
      src: ../../assets/uploads/ai/dilna-vyhybka.png
      alt: Ilustrační foto – ruce pájí cívky a kondenzátory frekvenční výhybky
      placeholder: true
      source: AI ilustrace – nahradit

  - id: zvukovod
    eyebrow: Výškový reproduktor
    title: Zvukovod ve spojení s výškovým reproduktorem
    text: |-
      U přímovyzařujících výškových reproduktorů je jejich vyzařování mimo osu srovnatelné s úrovní v poslechové ose. Při praktických dělicích kmitočtech mezi ~2000–4000 Hz to přináší řadu problémů jak při vývoji reprosoustav, tak i při praktickém použití.
    figure: waveguide
    subsections:
      - title: Kritické pásmo 2000–6000 Hz
        text: |-
          Toto pásmo je klíčové pro vnímání atributů zvuku, jako je ostrost, dopřednost, detailnost, srozumitelnost a klid reprodukce.

          Pokud na těchto kmitočtech vyzařuje reprosoustava i mimo osu na podobné úrovni jako v ose, je její výsledný zvuk velmi závislý na konkrétním poslechovém prostoru a klade tak silné požadavky na jeho akustické vlastnosti.

          Existuje několik řešení, která daný problém buď částečně, nebo zcela řeší. Zvukovod je elegantním řešením: svým tvarem vhodně formuje vyzařování právě v kritickém pásmu ~2000–6000 Hz a přináší i další výhody. Tvar zvukovodu je uzpůsoben tak, aby dosáhl kýžených vlastností a zároveň negativně neovlivnil pásmo vyšších kmitočtů.
      - title: Použití zvukovodu přináší
        list:
          - Lehkost a přirozenost reprodukce bez náznaku ostrosti či nervozity.
          - Menší nároky na akustiku místnosti ve zmíněném kritickém pásmu.
    image:
      src: ../../assets/products/sara/DSC_0834-1.png
      alt: Detail čelní desky Sary – páskový výškový reproduktor ve zvukovodu nad středobasovým reproduktorem

  - id: uroven-vysek
    eyebrow: Sara
    title: Nastavení úrovně výšek
    text: |-
      Reprosoustavy Sara umožňují nastavit úroveň vysokých kmitočtů pomocí otočného přepínače na zadním panelu. Tři možnosti nastavení −1, 0, +1 ovlivňují vysoké kmitočty v pásmu nad 2000 Hz v hodnotách −1 dB, 0 (referenční úroveň) a +1 dB.
    subsections:
      - title: Technické řešení
        text: |-
          Přepínání je navrženo s ohledem na co nejvyšší zvukovou kvalitu, potažmo minimalizaci komponentů v přímé cestě výškového reproduktoru, a také s ohledem na dlouhodobou spolehlivost. Přepínač tedy není v přímé signálové cestě výškového reproduktoru a kvalita přímé cesty je pro všechny polohy přepínače shodná. Je použit velmi kvalitní čtyřkontaktní přepínač pro dlouhodobý bezproblémový provoz.
    # TODO(klient): fotka přepínače (na starém webu ideTone-technologie-urovne-vysek.png, v podkladech chybí)
    imageSlot:
      label: 'Foto: otočný přepínač úrovně výšek na zadním panelu Sary'
      ratio: 4/5

  - id: bassreflex
    eyebrow: Ozvučnice
    title: Bassreflex vyvedený dolů
    text: |-
      Ozvučnice je typu bassreflex, který v daném ladění ve spojení se středobasovým reproduktorem poskytuje výborné podání basů. Cílem bylo docílit ladění, kdy je basová složka dobře vykreslená, má přirozený rytmus a netrpí neduhy spojenými s bassreflexem.

      Konstrukce reprosoustavy byla navržena s požadavkem na vyvedení bassreflexu směrem dolů. Reprosoustava je tak, i díky ladění bassreflexu, méně citlivá na umístění blíže stěn a nemá tendenci zadunívat.
    imageSlot:
      label: 'Foto: spodní část Sary s vývodem bassreflexu'
      ratio: 4/5
stepsEyebrow: Proces vývoje
stepsTitle: Od návrhu po poslech # NÁVRH: ke schválení (nadpis)
steps:
  - title: CAD design
    # TODO(klient): „CT2034A“ je nejspíš norma CTA-2034-A (měření „spinorama“) – ověřit a opravit
    text: Mechanický design a konstrukce probíhá v CAD systému. V této fázi je třeba vyřešit technické aspekty, ale zároveň i estetické nároky a výrobní postupy. Několik variant prochází důkladným výběrovým procesem a postupnou optimalizací. Akustický design je ovlivněn poznatky a nároky danými CT2034A a zároveň zkušenostmi.
    image:
      src: ../../assets/uploads/ai/dilna-hero.png
      alt: Ilustrační foto – dílna s ponkem, dýhami a ručním hoblíkem
      placeholder: true
      source: AI ilustrace – nahradit
  - title: Akustická měření
    text: Akustická měření a charakterizace měničů jsou nedílnou součástí procesu, stejně jako získání dat pro návrh frekvenčních filtrů jak v ose, tak i mimo osu. Návrh frekvenčních filtrů zohledňuje i vyzařování reprosoustavy mimo osu, protože to je určující pro zvuk reprosoustavy v reálných poslechových podmínkách.
    image:
      src: ../../assets/uploads/ai/mereni.png
      alt: Ilustrační foto – měřicí mikrofon a notebook s grafem frekvenční charakteristiky
      placeholder: true
      source: AI ilustrace – nahradit
  - title: Poslechové testy
    text: Každá verze prochází poslechovými testy a je třeba mnoho iterací pro nalezení optima, které vyhovuje pro rozmanité hudební žánry a dlouhodobý poslech.
    image:
      src: ../../assets/uploads/ai/hudba-gramofon.png
      alt: Ilustrační foto – přenoska gramofonu na vinylové desce
      placeholder: true
      source: AI ilustrace – nahradit
---
