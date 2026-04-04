# Diagnostics Module Overview

Kurze Einordnung:
- Zweck: beschreibt den kleinen HESTIA-Diagnostics-Surface aus Dev-Panel, aktiven Modi und Touchlog.
- Rolle innerhalb von HESTIA: hilft bei PWA-, CSS-, Shell- und Sync-Diagnose, ohne daraus ein grosses Dev-Cockpit zu machen.
- Abgrenzung: kein Produktfeature, kein Monitoring-System, keine Telemetrie.

Related docs:
- [Touchlog Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Touchlog%20Module%20Overview.md)
- [PWA Install Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/PWA%20Install%20Module%20Overview.md)
- [QA_CHECKS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md)
- [HESTIA Dev Panel, Touchlog & Diagnostics Roadmap (DONE).md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/archive/HESTIA%20Dev%20Panel,%20Touchlog%20%26%20Diagnostics%20Roadmap%20(DONE).md)

---

## 1. Zielsetzung

- HESTIA soll einen kleinen, klaren und lokalen Diagnostics-Surface besitzen.
- Dev-Hebel sollen echte Diagnosefragen schneller beantworten.
- Produktzustand und Dev-Sonderzustand muessen jederzeit unterscheidbar bleiben.

---

## 2. Aktueller Zuschnitt

Bestandteile:
- `Dev`-Button auf Home
- linke Dev-Spalte mit:
  - aktive Modi
  - `No Cache Assets`
  - visuelle Sandbox (`Schriftstil`, `Artstil`)
  - `Touchlog leeren`
  - `Dev State zuruecksetzen`
- rechter Bereich als ruhiger Touchlog-Trace

Wichtige Dateien:
- `index.html`
- `app/core/touchlog.js`
- `app/diagnostics/dev-flags.js`
- `app/diagnostics/font-presets.js`
- `app/diagnostics/art-style-presets.js`
- `app/styles/devtools.css`

---

## 3. Produktregel

- Dev-Hebel bleiben lokal.
- Dev-Hebel sind sichtbar und reversibel.
- `No Cache Assets` betrifft nur lokale App-Shell-/Asset-Diagnose.
- Diagnostics greift nicht in Household-, Sync- oder Produktdatenwahrheit ein.
- Default-Stile sind kein aktiver Sonderzustand.

---

## 4. Erlaubte Hebel

Zugelassen:
- visuelle Sandbox-Schalter
- diagnostische Shell-/Asset-Hebel
- kleine Diagnosehilfen

Nicht zugelassen:
- Sync- oder Household-Modi
- versteckte Produkt-Feature-Flags
- Remote-Logging
- grosse allgemeine Debug-Konsole

---

## 5. Definition of Done

- Ein neuer Chat versteht sofort, was der HESTIA-Diagnostics-Surface ist.
- Die Dev-Oberflaeche bleibt klein und lesbar.
- Aktive Sonderzustaende sind sichtbar.
- Touchlog bleibt Event-Trace und kippt nicht in Debug-Spam.
