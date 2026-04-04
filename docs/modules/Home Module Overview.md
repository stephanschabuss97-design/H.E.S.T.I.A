# Home Module - Functional Overview

Kurze Einordnung:
- Zweck: ruhiger Einstieg in die zwei Kernintentionen `Schreiben` und `Einkaufen`.
- Rolle innerhalb von HESTIA: orientiert den Nutzer sofort, ohne Dashboard-Logik oder Listenverwaltung auf dem Startscreen.
- Abgrenzung: kein Status-Cockpit, kein Activity-Feed, keine dichte Haushaltsuebersicht.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Writing Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Writing%20Module%20Overview.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Touchlog Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Touchlog%20Module%20Overview.md)

---

## 1. Zielsetzung

- Nutzer sollen HESTIA sofort als ruhiges Werkzeug fuer zwei klare Absichten verstehen.
- Der Homescreen soll direkt in den passenden Flow fuehren.
- Nichtziel: Metriken, Verlauf, offene Aufgabenstapel oder Statuslaerm.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `index.html` | Screen-Struktur, Titel, primaere Aktionsbuttons und `Dev`-Einstieg |
| `app/core/router.js` | einfacher Wechsel zwischen `home`, `writing` und `shopping` |
| `app/modules/home-scene.js` | atmosphaerischer Hintergrund fuer die Startansicht |
| `app/diagnostics/ambient-touch.js` | leichtes Touch-Feedback fuer die Oberflaeche |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/styles/ui.css` | globale Buttons und UI-Grundmuster |
| `app/styles/home.css` | Home-Screen-Praesentation, Titel und Aktionsbereich |

---

## 3. Datenmodell / Storage

- Kein eigenes fachliches Storage.
- Home liest keine Produktdaten und schreibt keine Listeneintraege.
- Stil- und Art-Presets speichern nur UI-Zustand lokal.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `index.html` rendert Home als initial aktiven Screen.
- `initRouter()` verdrahtet die Buttons mit den Ziel-Screens.
- `initHomeScene()` startet die visuelle Szene, sofern WebGL verfuegbar ist.

### 4.2 User-Trigger
- Klick auf `Schreiben` navigiert in den Capture-Flow.
- Klick auf `Einkaufen` navigiert in den Shopping-Flow.
- Klick auf `Dev` oeffnet das Touchlog-Panel.

### 4.3 Verarbeitung
- Home enthaelt keine Fachlogik fuer Listendaten.
- Home entscheidet nur ueber Intent-Wechsel und Diagnosezugang.

---

## 5. UI-Integration

- Home zeigt den Titel `H.E.S.T.I.A.` plus genau zwei grosse Aktionen.
- Der visuelle Charakter ist absichtlich atmosphaerisch statt informationsdicht.
- Der `Dev`-Button ist derzeit bewusst geparkter Entwicklerzugang unterhalb der beiden Produktpfade.

---

## 6. Risiken

- Home darf nicht schleichend zu einem Dashboard wachsen.
- Dev-Helfer duerfen die zwei Produktpfade nicht optisch dominieren.

---

## 7. Definition of Done

- Home fuehrt ohne Erklaerung klar in `Schreiben` oder `Einkaufen`.
- Die Ansicht wirkt ruhig und nicht wie ein Kontrollzentrum.
- Diagnosezugang ist vorhanden, aber nicht der Produktkern.
