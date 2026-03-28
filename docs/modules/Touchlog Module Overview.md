# Touchlog Module Overview

Kurze Einordnung:
- Zweck: beschreibt die kleine deterministische Event-Trace-Flaeche fuer HESTIA.
- Rolle innerhalb von HESTIA: macht Boot, Sync und wichtige Nutzeraktionen nachvollziehbar, ohne HESTIA in ein lautes Debug-System zu verwandeln.
- Abgrenzung: kein vollwertiges Diagnostics-Cockpit wie in groesseren Projekten.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [QA_CHECKS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md)
- [HESTIA Sync Behavior, Conflicts & Status Roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Sync%20Behavior,%20Conflicts%20%26%20Status%20Roadmap.md)

---

## 1. Zielsetzung

- Der Touchlog soll HESTIA im Alltag nicht veraendern, aber Debugging, QA und neue Chats deutlich leichter machen.
- Er soll nur die hochwertigen, fachlich relevanten Ereignisse zeigen:
  - Boot
  - Save
  - Realtime
  - Writing-/Shopping-Aktionen

---

## 2. Was der Touchlog bewusst nicht ist

- kein Pointer-/Gesture-Spam
- kein Ersatz fuer Konsole oder tiefe Netzwerkdiagnostik
- kein permanent sichtbares Nutzer-Feature
- kein lautes Entwicklerpanel mit vielen Toggles

---

## 3. Aktueller Zuschnitt in HESTIA

Vorhanden:
- kleines Touchlog-Panel in `index.html`
- Core-Logger in `app/core/touchlog.js`
- persistenter Snapshot in `localStorage`
- Dedupe-Fenster fuer Wiederholungen
- Hooking an Boot, Writing, Shopping und Sync

Zugriff:
- Button `Touchlog` in der kleinen Stil-/Diagnoseleiste
- zusaetzlich Shortcut `Shift + D`

---

## 4. Produktregel

- HESTIA loggt keine beliebige technische Chatterei.
- Eine logische Aktion soll moeglichst genau einmal sichtbar werden.
- Wiederholungen sollen wenn moeglich aggregiert statt gespammt werden.

Das Ziel ist:
- klarer Trace
- wenig Laerm
- gute Lesbarkeit bei echten Randfaellen

---

## 5. Typische Ereignisse

- `[boot] init start`
- `[boot] runtime-config loaded`
- `[sync] remote snapshot loaded ...`
- `[sync] realtime subscribed`
- `[writing] added item ...`
- `[sync] save success ...`
- `[shopping] finished shopping run`

---

## 6. Nutzen fuer die naechsten Roadmaps

Der Touchlog ist besonders wertvoll fuer:
- Sync-Randfaelle
- Offline-/Reconnect-Verhalten
- spaetere Push-Versuche
- QA-Smokes mit zwei Geraeten

Er soll sichtbar machen:
- was ist lokal passiert
- was ist remote angekommen
- wo scheitert ein Save oder Reconnect

---

## 7. Definition of Done

- Ein neuer Chat versteht sofort, wofuer der Touchlog in HESTIA gedacht ist.
- Der Touchlog bleibt klein, ruhig und deterministisch.
- Er hilft bei QA und Produktentscheidungen, ohne den Nutzerfluss zu ueberladen.
