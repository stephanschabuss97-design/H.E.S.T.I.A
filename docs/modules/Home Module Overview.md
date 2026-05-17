# Home Module - Functional Overview

Kurze Einordnung:
- Zweck: ruhiger Einstieg in `Einkauf`, `Amazon` und `Muell` als klare Haushaltsintentionen.
- Rolle innerhalb von HESTIA: orientiert den Nutzer sofort, ohne Dashboard-Logik oder Listenverwaltung auf dem Startscreen.
- Abgrenzung: kein Status-Cockpit, kein Activity-Feed, keine dichte Haushaltsuebersicht.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Amazon Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Amazon%20Module%20Overview.md)
- [Waste Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Waste%20Module%20Overview.md)
- [Touchlog Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Touchlog%20Module%20Overview.md)

---

## 1. Zielsetzung

- Nutzer sollen HESTIA sofort als ruhiges Werkzeug fuer klare Haushaltsabsichten verstehen.
- Der Homescreen soll direkt in den passenden Flow fuehren.
- Nach Roadmap 6A ist der bevorzugte Einkaufsfluss sichtbar `Einkauf`.
- Nach Roadmap 6B ist `Amazon` ein eigener kleiner Merkliste-Bereich.
- Nichtziel: Metriken, Verlauf, offene Aufgabenstapel oder Statuslaerm.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
| --- | --- |
| `index.html` | Screen-Struktur, Titel, Intent-Karten `Einkauf`, `Amazon`, `Muell` und kleiner Utility-Einstieg |
| `app/core/router.js` | einfacher Wechsel zwischen `home`, `writing`, `amazon`, `shopping` und `waste`; unbekannte Ziele werden ignoriert |
| `app/modules/home-scene.js` | atmosphaerischer Hintergrund fuer die Startansicht |
| `app/diagnostics/ambient-touch.js` | leichtes Touch-Feedback fuer die Oberflaeche |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/styles/ui.css` | globale Buttons und UI-Grundmuster |
| `app/styles/home.css` | Home-Screen-Praesentation, Intent-Karten und Utility-Einstieg |
| `app/styles/waste.css` | Waste-spezifische Verfeinerung der Home-Muell-Kachel |
| `app/modules/waste.js` | fuellt den Home-Muell-Ticker aus dem lokalen Entsorgungs-JSON |

---

## 3. Datenmodell / Storage

- Kein eigenes fachliches Storage.
- Home liest keine Produktdaten und schreibt keine Listeneintraege.
- Der Muell-Ticker liest keinen Home-Storage, sondern wird vom Waste-Modul aus `assets/data/waste-calendar.axams.json` befuellt.
- Stil- und Art-Presets speichern nur UI-Zustand lokal.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `index.html` rendert Home als initial aktiven Screen.
- `initRouter()` verdrahtet die Buttons mit den Ziel-Screens.
- `initHomeScene()` startet die visuelle Szene, sofern WebGL verfuegbar ist.

### 4.2 User-Trigger
- Klick auf `Einkauf` navigiert in den technischen `writing`-Screen, sichtbar den kombinierten Einkaufsbereich.
- Klick auf `Amazon` navigiert in den eigenen technischen `amazon`-Screen.
- Klick auf `Muell` navigiert in die Muelluebersicht.
- Klick auf den kleinen Utility-Einstieg oeffnet `Darstellung & Diagnose`.

### 4.3 Verarbeitung
- Home enthaelt keine Fachlogik fuer Listendaten und keine Amazon-Persistenz.
- Home entscheidet nur ueber Intent-Wechsel, Muelluebersicht-Einstieg und Diagnosezugang.
- Die fachliche Tickerlogik bleibt im Waste-Modul.

---

## 5. UI-Integration

- Home zeigt den Titel `H.E.S.T.I.A.` plus drei gestapelte Kacheln:
  - `Einkauf`
  - `Amazon`
  - `Muell`
- `Einkauf` ist der echte kombinierte Einkaufsfluss.
- `Amazon` ist eine kleine Merkliste fuer spaetere Amazon-Bestellungen und nutzt ein neutrales Paket-Icon.
- `Muell` ist Haushaltsperipherie, nicht Einkaufskern.
- Die Muell-Kachel zeigt eine kurze dynamische Tickerzeile wie `In 4 Tagen Biomuell`; bei Fehlern bleibt sie ruhig.
- Der visuelle Charakter ist absichtlich atmosphaerisch statt informationsdicht.
- Die Kacheln duerfen wie eine wertige HESTIA-Einstiegstafel wirken, aber nicht wie ein Dashboard oder App-Portal.
- Alle drei Kacheln teilen dieselbe Grundhoehe, damit Home ruhig und ausbalanciert bleibt.
- Die grosse Ruheflaeche ist bewusst Teil der Home-Komposition und wird nicht automatisch mit Status-, Listen- oder Haushaltsinformationen befuellt.
- Oben rechts sitzt ein kleiner Utility-Einstieg fuer `Darstellung & Diagnose`, ohne den Hero-Kern zu ueberholen.

---

## 6. Risiken

- Home darf nicht schleichend zu einem Dashboard wachsen.
- Die Muell-Kachel darf nicht als Einladung fuer beliebige weitere Home-Statuskacheln verstanden werden.
- Die Amazon-Kachel darf keine Commerce-, Preis- oder Tracking-Funktion versprechen.
- Utility- und Diagnosehelfer duerfen die Produktpfade nicht optisch dominieren.
- Kleine dekorative Veredelungen duerfen keine neuen fachlichen Zustandsversprechen erzeugen.

---

## 7. Definition of Done

- Home fuehrt ohne Erklaerung klar in `Einkauf`, `Amazon` oder `Muell`.
- Die Ansicht wirkt ruhig und nicht wie ein Kontrollzentrum.
- Die Home-Karten wirken wertig, ohne wie ein App-Portal oder Dashboard zu werden.
- Die Muell-Kachel fuehrt nur in die Muelluebersicht und behauptet keine allgemeine Haushaltszentrale.
- Die Amazon-Kachel fuehrt in die Amazon-Merkliste, ohne Commerce-Funktion zu behaupten.
- Der Utility-Einstieg ist vorhanden, aber nicht der Produktkern.
