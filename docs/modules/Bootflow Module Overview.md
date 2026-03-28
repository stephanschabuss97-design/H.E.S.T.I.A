# Bootflow Module Overview

Kurze Einordnung:
- Zweck: erklaert, was beim Laden von HESTIA in welcher Reihenfolge startet.
- Rolle innerhalb von HESTIA: hilft neuen Chats und spaeteren Aenderungen zu unterscheiden zwischen produktkritischem Startpfad und optionaler Atmosphaere.
- Abgrenzung: keine Fachlogik im Detail; die eigentlichen Modulvertraege stehen in `docs/modules/`.

Related docs:
- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [State Layer Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/State%20Layer%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Neue Chats sollen schnell verstehen, wie HESTIA beim App-Start zusammengesetzt wird.
- Der Bootflow soll klar machen, welche Initialisierung fuer den Produktkern noetig ist und was eher UX-/PWA-Randlogik ist.
- Nichtziel: Startpfad unnoetig kompliziert oder framework-artig zu machen.

---

## 2. Einstiegspunkt

- `index.html` bindet Styles, die statische Screen-Struktur und `app/main.js`.
- `app/main.js` ist der zentrale Bootstrap fuer die App.

---

## 3. Startreihenfolge in `app/main.js`

### 3.1 State erzeugen
- `loadRuntimeConfig()` laedt zuerst die oeffentliche Laufzeitkonfiguration.
- `createState()` wird sofort ausgefuehrt.
- Damit steht der lokale Item-State aus `localStorage` bereit.

### 3.2 Semantik vorbereiten
- `initSemantics(semanticsList)` laedt `assets/js/semantics.de.json`.
- Nach erfolgreichem Load wird `bindSemanticsAutocomplete(...)` an das Produktfeld gebunden.

### 3.3 UI-Kern initialisieren
- `initPwaInstallBanner(document)`
- `initRouter(document)`
- `initWriting(document, state, listSync)`
- `initShopping(document, state)`

Diese Schritte sind fuer den eigentlichen Listenfluss zentral.

### 3.4 Atmosphaere und Diagnose
- `initArtStylePresets(document)`
- `initHomeScene(document)`
- `initAmbientTouch(document)`
- `initFontPresets(document)`

Diese Schritte betreffen Look, Stil und Atmosphaere, nicht den fachlichen Kern.

### 3.5 Service Worker
- Falls vom Browser unterstuetzt, wird `sw.js` bei `window.load` registriert.
- Das dient Offline-Fallback, Caching und PWA-Verhalten.

---

## 4. Produktkritischer vs. optionaler Boot

### Produktkritisch
- State
- Semantik
- Router
- Writing
- Shopping

Ohne diese Teile funktioniert HESTIA als Einkaufslisten-Werkzeug nicht sauber.

### Optional / degradierbar
- Home-Scene / WebGL-Hintergrund
- Stil-Presets
- Ambient Touch
- Install-Banner
- Service Worker

Wenn diese Bereiche ausfallen, soll der Listenkern trotzdem weiter funktionieren.

---

## 5. Aktuelle Bootflow-Eigenschaften

- Boot ist bewusst leichtgewichtig und ohne Build-Step.
- Es gibt keinen globalen App-Container mit komplexen Lifecycles.
- Supabase ist aktuell noch nicht in den produktiven Startpfad integriert.

---

## 6. Zukuenftiger Supabase-Einbau

Spaeter sollte der Bootflow zusaetzlich sauber klaeren:

- wie `SUPABASE_URL` und der oeffentliche Key geladen werden
- wann der Household-Kontext bekannt ist
- wann initiale Remote-Daten gelesen werden
- wann Realtime startet
- wie der lokale Zustand mit dem Remote-Zustand zusammenspielt

Wichtig:
- HESTIA darf auch kuenftig nicht so booten, dass ohne Remote-Konfiguration der gesamte lokale Kern unbrauchbar wird.

---

## 7. Risiken

- Startlogik koennte schleichend unuebersichtlich werden, wenn Sync und Push ohne klaren Bootstrap dazukommen.
- Atmosphaerische Features duerfen den Kernboot nicht blockieren.
- Supabase darf den lokalen Fallback nicht still zerbrechen.

---

## 8. Definition of Done

- Ein neuer Chat kann den App-Start in wenigen Minuten nachvollziehen.
- Produktkritische und optionale Initialisierung sind klar getrennt.
- Spaetere Sync-Initialisierung laesst sich sauber in denselben Bootflow einordnen.
