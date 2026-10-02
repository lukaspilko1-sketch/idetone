# Prompty pro ChatGPT – dočasné ilustrační fotky ideTone

Verze 1 · 2. 10. 2026

## Pravidla (důležité)

- Fotky jsou **dočasné ilustrace** na testovací web. Před spuštěním na idetone.cz je nahradí skutečné fotky od klienta.
- **Negenerovat reprosoustavy ideTone** (Sara, Reva) ani jiné konkrétní reprosoustavy. Zákazník by mohl uvěřit, že jde o skutečný produkt.
- **Negenerovat Petra Kocourka** ani žádné rozpoznatelné obličeje. Lidé jen jako ruce nebo silueta zezadu.
- Žádné logo, nápis ani čitelná čísla (grafy jen rozostřené).
- Na webu bude u každé takové fotky v datech `placeholder: true`. Claude Code podle toho vypíše seznam fotek k výměně.
- Soubory ukládej do `podklady/ai-obrazky/` pod názvy uvedenými níže (formát PNG nebo JPG, nejdelší strana alespoň 2400 px).

## Postup v ChatGPT

1. Nejdřív vlož **Styl (společný úvod)** a nech ho platit pro celou konverzaci.
2. Pak zadávej obrázky po jednom.
3. Když výsledek nesedí barevně, napiš: *„More muted, warmer, less saturated, match palette #E9E6DF / #262422 / #A8743F.“*

---

## Styl (společný úvod, vložit jako první)

```
I'm creating temporary placeholder photos for the website of a small Czech
high-end loudspeaker workshop. Keep ONE consistent visual style for all images
in this conversation:

- Documentary editorial photography, Scandinavian craft aesthetic
- Soft natural window light, late afternoon, gentle shadows
- Muted warm palette: linen beige (#E9E6DF), warm charcoal (#262422),
  oiled oak / walnut (#A8743F), small touches of sage green
- Materials: walnut and oak wood, linen, paper, brushed metal, cork
- Shot on a full-frame camera, 35–50 mm lens, shallow depth of field,
  subtle film grain, realistic, not glossy, not CGI
- Calm, tidy, honest, handmade feeling; lots of negative space
- NO loudspeakers or speaker cabinets that look finished, NO brand logos,
  NO text, NO readable numbers, NO human faces
- Do not add any watermark or caption
Reply "OK" and wait for the first image request.
```

---

## Obrázky

### 1. Dílna – hero pozadí
**Soubor:** `dilna-hero.jpg` · **Poměr:** 16:9 · **Použití:** pozadí hero (rozostřené pod sklem), stránka O ideTone
```
Image 1, aspect ratio 16:9, wide shot. A quiet woodworking workshop corner:
a solid workbench with neatly arranged walnut veneer sheets and raw wooden
panels, a few clamps, a hand plane, wood shavings, pencil marks. Large window
on the left with soft light. Charcoal-painted wall in the background.
Leave the right third calm and slightly darker for text overlay.
No speakers, no people.
```

### 2. Ruce při ladění výhybky
**Soubor:** `dilna-vyhybka.jpg` · **Poměr:** 3:2 · **Použití:** Technologie, O ideTone
```
Image 2, aspect ratio 3:2, close-up. Hands (no face visible) soldering
electronic components – air-core coils, film capacitors, resistors – onto a
small wooden board on a workbench. Thin wisp of solder smoke, warm desk lamp
plus window light, shallow depth of field, focus on the components.
```

### 3. Detail dřeva
**Soubor:** `drevo-detail.jpg` · **Poměr:** 1:1 · **Použití:** Zakázkové projekty, dekorace sekcí
```
Image 3, aspect ratio 1:1, macro. Edge of an oiled walnut veneer panel with a
precise chamfer, warm grain, soft raking light, a strip of linen fabric and a
pencil lying next to it on a charcoal surface. Very calm composition.
```

### 4. Poslechová místnost
**Soubor:** `poslech-mistnost.jpg` · **Poměr:** 16:9 · **Použití:** pruh Poslech, stránka Poslech
```
Image 4, aspect ratio 16:9. A calm listening room in a Scandinavian apartment:
one comfortable leather armchair facing away from camera, a wool rug, a low
oak shelf with vinyl records, a turntable on a sideboard, linen curtains,
evening window light. The wall facing the chair is EMPTY – no speakers,
no TV. Feeling: quiet anticipation of music.
```

### 5. Měření v místnosti
**Soubor:** `mereni.jpg` · **Poměr:** 3:2 · **Použití:** Technologie
```
Image 5, aspect ratio 3:2. A measurement microphone on a thin stand in a
softly lit room, a laptop on a wooden table in the background showing a
blurred frequency-response graph (lines only, nothing readable).
Cables neatly routed, technical but warm and calm.
```

### 6. Gramofon – detail
**Soubor:** `hudba-gramofon.jpg` · **Poměr:** 4:5 · **Použití:** sekce s citátem, O ideTone
```
Image 6, aspect ratio 4:5, close-up. The tonearm of a turntable resting on a
spinning black vinyl record, record sleeve without any text on a linen surface,
soft side light, shallow depth of field.
```

### 7. Zakázkový projekt – návrh
**Soubor:** `zakazka-navrh.jpg` · **Poměr:** 16:9 · **Použití:** Zakázkové projekty
```
Image 7, aspect ratio 16:9, top-down view. A wooden table with pencil sketches
of a simple rectangular cabinet profile on paper (abstract lines, no readable
text or numbers), wood veneer samples in several tones (walnut, oak, ash),
a steel ruler, a tape measure and a cup of coffee. Natural light.
```

---

## Co negenerovat (musí dodat klient)

| Fotka | Proč |
|---|---|
| Sara, Reva (celek i detaily) | Skutečný produkt, AI by zkreslila konstrukci |
| Přepínač výšek na zadním panelu Sary | Konkrétní technický detail |
| Spodní část Sary s bassreflexem | Konkrétní technický detail |
| Portrét Petra Kocourka | Skutečná osoba |
| Exteriér a interiér studia na Filipínského 59 | Skutečné místo, zákazník ho bude hledat |
| Grafy měření | Skutečná data |
