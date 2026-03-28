# Home Module - Functional Overview

Kurze Einordnung:
- Zweck: ruhiger Einstieg in die zwei Kernintentionen `Schreiben` und `Einkaufen`.
- Rolle innerhalb von HESTIA: orientiert den Nutzer sofort, ohne Dashboard-Logik oder Listenverwaltung auf dem Startscreen.
- Abgrenzung: kein Status-Cockpit, kein Activity-Feed, keine dichte Haushaltsuebersicht.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [writing.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/writing.md)
- [shopping.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/shopping.md)

---

## 1. Zielsetzung

- Nutzer sollen HESTIA sofort als ruhiges Werkzeug fuer zwei klare Absichten verstehen.
- Der Homescreen soll nicht erklaeren muessen, sondern direkt in den passenden Flow fuehren.
- Nichtziel: Metriken, Verlauf, offene Aufgabenstapel oder Statuslaerm.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `index.html` | Screen-Struktur, Titel und die zwei primaeren Aktionsbuttons |
| `app/core/router.js` | einfacher Wechsel zwischen `home`, `writing` und `shopping` |
| `app/modules/home-scene.js` | atmosphaerischer Hintergrund fuer die Startansicht |
| `app/diagnostics/ambient-touch.js` | leichtes Touch-Feedback fuer die Oberflaeche |
| `app/styles/components.css` | Layout, Buttons und Home-Screen-Präsentation |

---

## 3. Datenmodell / Storage

- Kein eigenes persistentes Modul-Storage.
- Home liest keinen Listenstatus aus und schreibt keine Produktdaten.
- Stil- und Art-Presets speichern nur UI-Zustand lokal, nicht fachliche Information.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `index.html` rendert Home als initial aktiven Screen.
- `initRouter()` verdrahtet die Buttons mit den Ziel-Screens.
- `initHomeScene()` startet die visuelle Raum-/Lichtszene, sofern WebGL verfuegbar ist.

### 4.2 User-Trigger
- Klick auf `Schreiben` navigiert in den Capture-Flow.
- Klick auf `Einkaufen` navigiert in den Shopping-Flow.

### 4.3 Verarbeitung
- Es gibt keine Fachlogik auf Home.
- Home entscheidet nicht ueber Daten, sondern nur ueber Intent-Wechsel.

---

## 5. UI-Integration

- Home zeigt den Titel `H.E.S.T.I.A.` plus genau zwei grosse Aktionen.
- Der visuelle Charakter ist absichtlich atmosphaerisch statt informationsdicht.
- Sichtbare Stil-Schalter sind derzeit noch Teil der Oberflaeche und eher ein Design-/Diagnostik-Werkzeug als finaler Produktvertrag.

---

## 6. Events & Integration Points

- Eingehende Integration: `data-nav` Buttons fuer den Router.
- Ausgehende Wirkung: kein eigenes Event-Dispatching fuer Produktdaten.
- Abhaengigkeiten: Router, Home-Scene, Ambient Touch, Styles.

---

## 7. Erweiterungspunkte / Zukunft

- manueller Awareness-Einstiegspunkt
- optionaler kleiner Kontext-Hinweis wie `Liste geaendert`
- Reduktion oder Verbergung der sichtbaren Stil-/Art-Schalter fuer Produktionsbetrieb

---

## 8. Status / Dependencies / Risks

- Status: aktiv.
- Dependencies (hard): `index.html`, Router, Styles.
- Dependencies (soft): WebGL-Szene fuer Atmosphaere.
- Known risks:
  - sichtbare Style-Schalter koennen den ruhigen Produktcharakter stoeren
  - Home darf nicht schleichend zu einem Dashboard wachsen

---

## 9. Definition of Done

- Home fuehrt ohne Erklaerung klar in `Schreiben` oder `Einkaufen`.
- Die Ansicht wirkt ruhig und nicht wie ein Kontrollzentrum.
- Es gibt keine fachliche Ablenkung vom eigentlichen Listenfluss.
