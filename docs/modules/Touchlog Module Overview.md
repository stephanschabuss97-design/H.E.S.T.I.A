# Touchlog Module Overview

Kurze Einordnung:
- Zweck: beschreibt die kleine deterministische Diagnoseflaeche fuer Boot, PWA und Sync.
- Rolle innerhalb von HESTIA: macht echte Laufzeitprobleme nachvollziehbar, ohne HESTIA in ein lautes Dev-Cockpit zu verwandeln.
- Abgrenzung: kein Ersatz fuer Browser-Konsole oder Netzwerktab.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [QA_CHECKS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md)
- [HESTIA Sync Behavior, Conflicts & Status Roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Sync%20Behavior,%20Conflicts%20%26%20Status%20Roadmap.md)
- [HESTIA Dev Panel, Touchlog & Diagnostics Roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Dev%20Panel,%20Touchlog%20%26%20Diagnostics%20Roadmap.md)
- [PWA Install Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/PWA%20Install%20Module%20Overview.md)

---

## 1. Zielsetzung

- Der Touchlog soll HESTIA im Alltag nicht veraendern, aber Debugging, QA und neue Chats deutlich leichter machen.
- Er soll nur hochwertige, fachlich oder betrieblich relevante Ereignisse zeigen:
  - Boot
  - PWA-Kontext
  - Runtime-Config
  - Save / Load / Realtime
  - Writing-/Shopping-Aktionen

---

## 2. Was der Touchlog bewusst nicht ist

- kein Pointer-/Gesture-Spam
- kein permanentes Nutzer-Feature
- kein grosses Developer-Dashboard mit vielen Schaltern
- kein Ersatz fuer tiefe Netzwerkdiagnostik

---

## 3. Aktueller Zuschnitt in HESTIA

Vorhanden:
- Touchlog-Panel in `index.html`
- Core-Logger in `app/core/touchlog.js`
- persistenter Snapshot in `localStorage`
- Dedupe-Fenster fuer Wiederholungen
- Hooking an Boot, PWA, Sync, Writing und Shopping
- aktive Modusliste fuer lokale Dev-Sonderzustaende
- lokale Diagnosehilfen fuer Log-/Dev-Hygiene

Zugriff:
- `Dev`-Button auf dem Homescreen
- zusaetzlich Shortcut `Shift + D`

Im Panel:
- links:
  - aktive Modi
  - Diagnose-Toggles
  - visuelle Sandbox
  - kleine Hilfsaktionen
- rechts Logausgabe

---

## 4. Wichtige aktuelle Ereignisse

Typische Zeilen sind heute:

- `[boot] init start`
- `[pwa] diag ...`
- `[sync] config ...`
- `[sync] remote snapshot loaded ...`
- `[sync] realtime subscribed`
- `[writing] added item ...`
- `[shopping] finished shopping run`

Neu wichtig:
- PWA-Kontextdiagnostik
- Sync-Konfig-Zusammenfassung
- Save-Gruende wie `manual-save`, `remove-item` oder `shopping-finish`
- Dev-Gruende wie `no-cache assets enabled`, `touchlog cleared` oder `dev state reset`

Kategorienvertrag:
- `boot`
- `pwa`
- `sync`
- `writing`
- `shopping`
- `dev`

Der Touchlog fuehrt bewusst keine breitere technische Kategorienliste ein.

---

## 5. Produktregel

- HESTIA loggt keine beliebige technische Chatterei.
- Eine logische Aktion soll moeglichst genau einmal sichtbar werden.
- Wiederholungen sollen aggregiert statt gespammt werden.
- Der Dev-Bereich darf nur lokale, sichtbare und reversible Diagnosehebel tragen.
- Touchlog und Dev-Flags duerfen nie den fachlichen Household-/Sync-Vertrag veraendern.
- Aktive Dev-Modi muessen sichtbar sein, aber nicht als Log-Spam gespiegelt werden.
- Der Touchlog bleibt Event-Trace; aktive Sonderzustaende gehoeren primaer in die linke Dev-Spalte.
- `No Cache Assets` ist ein lokaler Shell-/Asset-Hebel und kein Daten-/Sync-Modus.
- `Touchlog leeren` und `Dev State zuruecksetzen` bleiben lokale Diagnosehilfen ohne Einfluss auf Produktdaten.

---

## 6. Nutzen fuer die naechsten Roadmaps

Der Touchlog ist besonders wertvoll fuer:
- Sync-Randfaelle
- Offline-/Reconnect-Verhalten
- PWA- und Install-Kontexte
- Household-Key-Fehler
- spaetere Push-Versuche

---

## 7. Definition of Done

- Ein neuer Chat versteht sofort, wofuer der Touchlog in HESTIA gedacht ist.
- Der Touchlog bleibt klein, ruhig und deterministisch.
- Er hilft bei QA und Produktentscheidungen, ohne den Nutzerfluss zu ueberladen.
