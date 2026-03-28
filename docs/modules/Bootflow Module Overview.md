# Bootflow Module Overview

Kurze Einordnung:
- Zweck: erklaert, was beim Laden von HESTIA in welcher Reihenfolge startet.
- Rolle innerhalb von HESTIA: trennt produktkritischen Startpfad von Stil, PWA und Diagnose.
- Abgrenzung: keine tiefe Fachlogik der einzelnen Module.

Related docs:
- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [State Layer Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/State%20Layer%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)
- [PWA Install Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/PWA%20Install%20Module%20Overview.md)

---

## 1. Zielsetzung

- Neue Chats sollen den App-Start in wenigen Minuten nachvollziehen koennen.
- Der Bootflow soll zeigen, welche Initialisierung fuer den Shared-List-Kern noetig ist und was nur Atmosphaere oder Betriebshilfe ist.
- Nichtziel: einen schweren Lifecycle-Rahmen um eine kleine PWA zu bauen.

---

## 2. Einstiegspunkt

- `index.html` laedt Styles, die statische Screen-Struktur, den fruehen PWA-Bootstrap und `app/main.js`.
- `app/main.js` ist der zentrale Bootstrap fuer HESTIA.

---

## 3. Aktuelle Startreihenfolge in `app/main.js`

### 3.1 PWA-Install-Banner sofort binden
- `initPwaInstallBanner(document)` laeuft als Erstes.
- Grund: `beforeinstallprompt` darf nicht durch spaetere asynchrone Bootschritte verpasst werden.

### 3.2 Touchlog und PWA-Diagnostik starten
- `createTouchlog(document)` wird sehr frueh erzeugt.
- Direkt danach werden Boot- und PWA-Kontextinformationen geloggt.

### 3.3 Runtime-Config laden
- `loadRuntimeConfig()` laedt `public/runtime-config.json`.
- Danach wird eine kompakte Sync-Konfig-Zusammenfassung geloggt.

### 3.4 State und Sync vorbereiten
- `createState()` baut den lokalen Listenstand aus `localStorage`.
- `createListSync()` kapselt Household-Resolve, REST-Snapshot-Load/Save und Realtime-Start.
- Wenn Supabase konfiguriert ist, wird zuerst ein initialer Remote-Snapshot geladen und in `state.items` gespiegelt.

### 3.5 Kernmodule binden
- `initSemantics(...)`
- `initRouter(document)`
- `initWriting(document, state, listSync, touchlog)`
- `initShopping(document, state, listSync, touchlog)`

### 3.6 Atmosphaere und Diagnose
- `initArtStylePresets(document)`
- `initHomeScene(document)`
- `initAmbientTouch(document)`
- `initFontPresets(document)`

### 3.7 Remote-Events und Service Worker
- Nach erfolgreichem Initial-Load startet Realtime ueber `listSync.subscribeToSnapshots(...)`.
- Der Service Worker wird bei `window.load` registriert.
- `controllerchange` fuehrt bei neuer Shell einmalig zu einem Reload.

---

## 4. Produktkritischer vs. optionaler Boot

### Produktkritisch
- Runtime Config
- State
- Supabase Initial-Load bei vorhandener Konfiguration
- Semantik
- Router
- Writing
- Shopping

### Optional / degradierbar
- Home-Scene / WebGL-Hintergrund
- Stil-Presets
- Ambient Touch
- Touchlog
- Service Worker
- Install-Banner

---

## 5. Risiken

- Zu viele fruehe asynchrone Schritte koennen den kleinen Bootflow spaeter wieder unruhig machen.
- Atmosphaerische Initialisierung darf den Shared-List-Kern nicht blockieren.
- Realtime und kuenftige Offline-/Reconnect-Logik duerfen den Startpfad nicht sprunghaft oder mehrfach machen.

---

## 6. Definition of Done

- Ein neuer Chat versteht den aktuellen App-Start inklusive Remote-Initialisierung.
- PWA, Sync und Listenkern sind als zusammenhaengender Bootflow lesbar.
- Produktkritische und optionale Initialisierung bleiben klar getrennt.
