# Kassa Carousel Module - Functional Overview

Kurze Einordnung:
- Zweck: kleine Kassahilfe fuer den Einkaufsabschluss mit vier festen Haendler-/Loyalty-Links.
- Rolle innerhalb von HESTIA: unterstuetzt den Moment vor dem Bezahlen, ohne Shopping in einen App-Launcher umzubauen.
- Abgrenzung: keine App-Erkennung, keine Deep Links, keine Installationserkennung, keine Konfiguration.

Related docs:
- [Shopping Module Overview.md](Shopping%20Module%20Overview.md)
- [CSS Module Overview.md](CSS%20Module%20Overview.md)
- [QA_CHECKS.md](../QA_CHECKS.md)
- [HESTIA Kassa Karussell Roadmap (DONE).md](../archive/HESTIA%20Kassa%20Karussell%20Roadmap%20(DONE).md)

---

## 1. Zielsetzung

- Im sichtbaren Bereich `Einkauf` nach den Listenaktionen eine kleine Kassahilfe anbieten.
- Den alten `screen-shopping` weiter regressionsfrei unterstuetzen, solange er existiert.
- Vier kuratierte Links bereitstellen:
  - `jö`
  - `MPREIS`
  - `HOFER`
  - `SPAR`
- Der aktive Eintrag soll klar fokussiert sein, die Nachbarn nur dezent sichtbar.
- Bedienung soll per Button, Pfeiltaste und Swipe/Drag funktionieren.
- Der normale Linksklick auf die aktive Karte nutzt das native Browser-Verhalten.

Nichtziel:
- kein App-Portal
- kein `+`
- kein `i`
- kein App-Scan
- kein Installationsstatus
- kein Standortkontext

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
| --- | --- |
| `index.html` | statisches Karussell-Markup im sichtbaren `Einkauf`-Bereich und im alten Shopping-Screen |
| `app/modules/kassa-carousel.js` | Mehrinstanz-Initialisierung, fluechtiger aktiver Index je Instanz, Button-/Keyboard-/Swipe-Handling und ARIA-/Tab-Sync |
| `app/main.js` | Initialisierung aller Instanzen via `initKassaCarousel(document, touchlog)` |
| `app/styles/shopping.css` | wiederverwendbare Mini-Fokus-Karussell-Optik |
| `sw.js` | App-Shell-Cache fuer das neue ES-Modul |

---

## 3. Linkvertrag

- Die Linkziele liegen statisch im Markup.
- Alle Links nutzen `target="_blank"` und `rel="noopener noreferrer"`.
- HESTIA verspricht nur: Google-Play-Ziel oeffnen.
- Ob Google Play danach `Oeffnen`, `Installieren` oder Browserdarstellung zeigt, ist Plattformverhalten.
- HESTIA zeigt keinen Installationsstatus und wertet keinen Ruecksprung aus.

---

## 4. UI- und Bedienvertrag

- Im sichtbaren `Einkauf` sitzt das Karussell unterhalb von `Liste abschliessen`.
- Im alten Shopping-Screen sitzt das Karussell weiterhin unterhalb von `Liste abschliessen` und `Aendern`.
- Die Listenaktionen bleiben fachlich wichtiger.
- Genau eine Karte ist aktiv und im normalen Tabfluss.
- Inaktive Karten sind `aria-hidden` und per `tabindex="-1"` aus dem Tabfluss genommen.
- Zurueck-/Weiter-Buttons wechseln zyklisch.
- Pfeiltasten, `Home` und `End` funktionieren, wenn der Fokus im Karussell liegt.
- Swipe/Drag wechselt erst bei klar horizontaler Bewegung.
- Pointer-Capture wird erst nach echter horizontaler Bewegung gesetzt, damit normale Linksklicks nicht blockiert werden.
- Mehrere Karussell-Instanzen duerfen gleichzeitig im DOM existieren; jede Instanz haelt ihren eigenen aktiven Index und eigene ARIA-/Tab-Zustaende.

---

## 5. State- und Datenvertrag

- Der aktive Index ist rein fluechtiger Modul-State.
- Keine Speicherung in `localStorage` oder `sessionStorage`.
- Keine Aenderung am Item-Datenvertrag:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`
- Keine Supabase- oder Household-Sync-Beruehrung.
- `writing.js` und `shopping.js` bleiben Owner fuer Listenrendering, Toggle und Abschluss. Das Karussell beruehrt keinen Listen-State.
- Amazon uebernimmt das Kassa-Karussell nicht, solange Amazon nur als Merkliste geplant ist.

---

## 6. Touchlog

- Das Modul schreibt bei aktivem Wechsel einen kleinen Eintrag:
  - `[kassa] carousel active=...`
- Der Eintrag dient QA und Regression, nicht Produktkommunikation.
- Keine Pointer- oder Gesture-Details werden geloggt.

---

## 7. Risiken

- Externe Google-Play-Ziele koennen sich aendern.
- Android, Browser und installierte PWA koennen Links unterschiedlich oeffnen.
- Zu starke visuelle Praesenz wuerde Shopping Richtung App-Portal verschieben.
- Pointer-/Swipe-Handling darf normale Linksklicks nicht blockieren.
- Doppelte DOM-Instanzen duerfen sich nicht gegenseitig Fokus, Tab-Status oder aktiven Index ueberschreiben.
- Die sichtbare Amazon-Kachel darf nicht bedeuten, dass Kassa fuer Amazon gilt.

---

## 8. Definition of Done

- Vier fixe Google-Play-Links sind vorhanden.
- Aktiver Link oeffnet per normalem Linksklick ein neues Ziel.
- Buttons, Pfeiltasten und Swipe wechseln den aktiven Eintrag.
- Genau eine Karte ist im Tabfluss.
- Karussell bleibt kleiner als Liste und Shopping-Actions.
- Mehrere Instanzen funktionieren unabhaengig voneinander.
- Keine App-Erkennung, kein Installationsstatus und keine Konfiguration sind eingefuehrt.
