# CSS Module - Functional Overview

Kurze Einordnung:
- Zweck: definiert den verbindlichen CSS-Vertrag von HESTIA.
- Rolle innerhalb von HESTIA: macht Styling wieder lesbar, vorhersehbar und gezielt wartbar.
- Abgrenzung: kein Design-System-Monster, kein Utility-Framework, kein Build-Setup.

Related docs:
- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [HESTIA CSS Separation & Style Architecture Roadmap (DONE).md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/archive/HESTIA%20CSS%20Separation%20%26%20Style%20Architecture%20Roadmap%20(DONE).md)
- [Home Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Home%20Module%20Overview.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Amazon Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Amazon%20Module%20Overview.md)
- [Waste Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Waste%20Module%20Overview.md)

---

## 1. Zielsetzung

- Styling soll in HESTIA schnell verortbar sein.
- Globale Patterns und Feature-Styling sollen nicht wieder in einer Sammeldatei kollidieren.
- Mobile Anpassungen sollen beim richtigen Owner liegen.
- Nichtziel: ein grosses Framework oder ein CSS-Oekosystem um seiner selbst willen.

---

## 2. Einstiegspunkt und Load Order

Der einzige CSS-Einstiegspunkt ist:

- `app/app.css`

Die verbindliche Import-Reihenfolge ist:

1. `app/styles/tokens.css`
2. `app/styles/base.css`
3. `app/styles/layout.css`
4. `app/styles/ui.css`
5. `app/styles/home.css`
6. `app/styles/waste.css`
7. `app/styles/writing.css`
8. `app/styles/shopping.css`
9. `app/styles/devtools.css`
10. `app/styles/pwa.css`

Begruendung:
- erst Theme und Foundation
- dann Layout
- dann globale UI
- erst danach Feature-Owner

---

## 3. Verantwortungen pro Datei

| Datei | Verantwortung |
| --- | --- |
| `app/app.css` | einziger Bundle-Einstieg |
| `app/styles/tokens.css` | Farben, Fonts, Radius, Schatten, Style-Varianten |
| `app/styles/base.css` | Reset, Body, `[hidden]`, Ambient, globale Form-Control-Grundregeln |
| `app/styles/layout.css` | `app-shell`, `screen`, `panel`, `panel-head`, `row-actions` |
| `app/styles/ui.css` | Buttons, Inline-Links, Sync-Status, Listen-Grundmuster, globale mobile UI-Overrides |
| `app/styles/home.css` | Home-Titel, Intent-Karten, Utility-Einstieg, Home-Praesentation |
| `app/styles/waste.css` | Home-Muell-Kachel, Muelluebersicht, Fraktionskarten, Recyclinghofdetails und mobile Waste-Regeln |
| `app/styles/writing.css` | technische Writing-Form, sichtbarer Einkauf-Formbereich, Amazon-Eingabeform und Semantik-Popup |
| `app/styles/shopping.css` | wiederverwendbare Papierliste, Checkbox-/Meta-Layout, Abschlussbutton, Kassa-Karussell und mobile Einkaufs-/Amazon-Regeln |
| `app/styles/devtools.css` | Touchlog, Stilumschalter, Devtools-Panel |
| `app/styles/pwa.css` | Install-Banner und kuenftige PWA-Banner |

---

## 4. Guardrails

- Neue globale Patterns gehoeren nach `ui.css`, nicht in Feature-Dateien.
- Feature-Dateien duerfen globale Patterns verfeinern, aber nicht still neue globale Owner bauen.
- Home-spezifische Materialitaet, Intent-Karten-Feinschliff und Home-Komposition gehoeren nach `home.css`, solange sie keine globalen Button-/Token-Vertraege aendern.
- Waste-spezifische Kachelverfeinerung und Muelluebersicht gehoeren nach `waste.css`; Selektoren muessen an `.home-waste-card` oder `.screen-waste` gebunden bleiben.
- Waste darf die Home-Muell-Kachel verfeinern, soll aber die gemeinsame Home-Kartenhoehe nicht mehr kleiner machen als `Einkauf` und `Amazon`.
- Papierliste, Checkbox-/Meta-Layout, Abschlussbutton und Kassa-Karussell liegen in `shopping.css`, weil diese Muster im sichtbaren `Einkauf`, im Amazon-Bereich und im alten Shopping-Screen verwendet werden.
- Kassa-Regeln in `shopping.css` muessen an `.kassa-carousel` gebunden bleiben und duerfen keinen Listen-State oder Amazon-Vertrag erzeugen.
- Amazon nutzt bestehende `writing.css`-/`shopping.css`-Muster; ein eigenes `amazon.css` gibt es aktuell nicht.
- Checkboxen, Radios und Texteingaben bleiben foundation-seitig getrennt.
- Mobile Regeln gehoeren zum Owner der betroffenen Komponente oder des betroffenen globalen Patterns.
- Keine Rueckkehr zu Sammeldateien wie `components.css` oder `screens.css`.

---

## 5. Praktische Zuordnung

Wenn du etwas aendern willst:

- Button-, Link- oder Listen-Grundstil -> `app/styles/ui.css`
- Panel- oder Screen-Struktur -> `app/styles/layout.css`
- Startseite -> `app/styles/home.css`
- Muell-Kachel, Muelluebersicht, Recyclinghofdetails -> `app/styles/waste.css`
- technischer Writing-/sichtbarer Einkauf-Formbereich und Amazon-Eingabe -> `app/styles/writing.css`
- Papierliste, Checkboxen, Abschlussbutton im Einkauf, Amazon oder alten Shopping-Screen -> `app/styles/shopping.css`
- Kassa-Karussell im Einkauf oder alten Shopping-Screen -> `app/styles/shopping.css`
- Touchlog, Utility-/Diagnostics-Panel oder Stilwahl -> `app/styles/devtools.css`
- Install-/PWA-Hinweise -> `app/styles/pwa.css`
- Theme/Farbe/Font -> `app/styles/tokens.css`
- Reset, Body, `hidden`, Form-Grundlagen -> `app/styles/base.css`

---

## 6. Definition of Done

- Neue Styling-Arbeit laesst sich ohne Suchen einem klaren Owner zuordnen.
- Globale UI und Feature-Styling bleiben getrennt.
- Mobile Anpassungen liegen beim richtigen Owner.
- CSS-Aenderungen erzeugen weniger Seiteneffekte als vor dem Refaktor.
