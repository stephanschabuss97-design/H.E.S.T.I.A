# Amazon Module - Functional Overview

Kurze Einordnung:
- Zweck: beschreibt die kleine Amazon-Merkliste als zweiten Beschaffungskanal neben dem normalen Einkauf.
- Rolle innerhalb von HESTIA: Home oeffnet einen eigenen `Amazon`-Bereich, in dem Dinge fuer spaetere Amazon-Bestellungen notiert, als `Bestellt` markiert und entfernt werden koennen.
- Abgrenzung: keine Amazon-API, keine Produktlinks, keine Preise, kein Affiliate, kein Bestelltracking und keine Commerce-Logik.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [State Layer Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/State%20Layer%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Dinge, die spaeter bei Amazon bestellt werden sollen, sollen nicht die normale Einkaufsliste stoeren.
- Die Eingabe soll gleich ruhig und schnell funktionieren wie im Einkauf.
- Der sichtbare Status heisst `Bestellt`, nicht `Im Wagen`.
- Abschluss entfernt nur bestellte Amazon-Eintraege.
- Nichtziel: Preisvergleich, Produktsuche, Warenkorb, Tracking oder eine allgemeine Online-Shopping-Plattform.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/amazon.js` | Formularlogik, Amazon-Filter, Papierliste, `Bestellt`-Toggle, Loeschen, Leeren, Abschluss und Sync-Status |
| `app/core/item-display.js` | rein praesentative Mengen-/Einheitenanzeige |
| `app/core/state.js` | typbewusster Item-State mit `clearByType("amazon")` und `finishByType("amazon")` |
| `app/supabase/list-sync.js` | speichert und laedt den gemeinsamen Snapshot mit `list_type` |
| `index.html` | `screen-amazon` mit Eingabe-Panel und Amazon-Liste |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/styles/ui.css` | globale Listen-, Link- und Statusmuster |
| `app/styles/writing.css` | wiederverwendetes Form-Styling fuer die Eingabe-Kachel |
| `app/styles/shopping.css` | wiederverwendbare Papierliste, Checkbox-/Meta-Layout und Abschlussbutton |
| `sw.js` | App-Shell-Cache enthaelt `./app/modules/amazon.js` |

---

## 3. Datenmodell / Storage

- operative UI-Wahrheit: `state.items`
- lokales Storage: `hestia.v1.items`
- relevanter Eintragsvertrag:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`
  - `listType`

Fuer Amazon gilt:

- neue Amazon-Eintraege werden mit `listType: "amazon"` erzeugt.
- gerendert werden nur `amazon`-Eintraege.
- `inCart` bleibt technisch das bestehende boolesche Flag, wird aber sichtbar als `Bestellt` interpretiert.
- fehlende oder unbekannte Typen fallen im State-Layer auf `grocery` zurueck und erscheinen deshalb nicht in Amazon.

Remote:

- Supabase speichert den Typ als `list_type`.
- `saveSnapshot(store.state.items)` speichert weiterhin den vollstaendigen Haushalts-Snapshot mit Grocery und Amazon.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `initAmazon()` bindet Formular, Amazon-Liste, Checkboxen, Loeschaktionen, Leeren, Abschluss und Sync-Status.
- Das Modul rendert initial nur Eintraege mit `listType === "amazon"`.
- Das Modul hoert auf `hestia:items-updated`.

### 4.2 User-Trigger
- Produktname eingeben
- optional Menge und Einheit anpassen
- Formular absenden
- Eintrag als `Bestellt` markieren oder wieder oeffnen
- einzelnes Item loeschen
- `Liste leeren`
- `Bestellte entfernen`
- `Liste freigeben`, falls Sync konfiguriert ist und ein Retry/Fallback noetig ist
- `Anderen Stand uebernehmen`, falls ein Remote-Snapshot waehrend lokaler Aenderungen pending ist

### 4.3 Verarbeitung
- Beim Submit wird validiert:
  - Name darf nicht leer sein
  - Menge muss groesser `0` sein
- Ungueltige Eingaben zeigen eine kleine Inline-Notiz am Formular.
- Danach wird ein Item mit `crypto.randomUUID()` und `listType: "amazon"` erzeugt.
- Checkboxen toggeln technisch `inCart`, sichtbar `Bestellt`.
- `Loeschen` entfernt genau den betroffenen Amazon-Eintrag.
- `Liste leeren` nutzt `clearByType("amazon")`.
- `Bestellte entfernen` nutzt `finishByType("amazon")` und entfernt nur bestellte Amazon-Eintraege.

### 4.4 Persistenz heute
- Add, Toggle, Loeschen, Leeren und Abschluss speichern bei konfiguriertem Sync den vollstaendigen Shared Snapshot.
- `Liste freigeben` bleibt als Retry/Fallback sichtbar, wenn ein Dirty-, Error- oder Pending-Remote-Zustand besteht.
- Wenn ein Remote-Snapshot waehrend lokaler Amazon-Aenderungen eintrifft, wird er nicht still uebernommen.
- `Anderen Stand uebernehmen` sendet `hestia:remote-apply-request` und uebernimmt den pending Remote-Stand bewusst destruktiv.
- Erfolgreiche Remote-Saves spiegeln den Zustand wieder als `source: "remote"` zurueck.
- Amazon hat keinen eigenen Remote-Endpunkt und keine eigene Tabelle.

---

## 5. UI-Integration

- Home zeigt `Amazon` als eigene Kachel und routet auf `screen-amazon`.
- Der Amazon-Bereich besteht aus:
  - Eingabe-Panel
  - Listenpanel `Amazon-Liste`
- Leerer Zustand zeigt `Keine Amazon-Eintraege.`.
- Die Liste nutzt die gleiche ruhige Papierlisten-Aesthetik wie Einkauf.
- Die Checkbox-Copy lautet `Bestellt`.
- Die Abschlussaktion lautet `Bestellte entfernen`.
- Amazon enthaelt kein Kassa-Karussell.
- Amazon enthaelt keine Produktlinks, Preise, Tracking- oder Shop-Copy.

---

## 6. Fehler- & Diagnoseverhalten

- Ungueltige Submit-Werte erzeugen keine kaputten Items und werden leise inline erklaert.
- Freigabe-Fehler werden im Status alltagssprachlich sichtbar: Die Liste bleibt lokal.
- Pending Remote wird sichtbar als `Anderer Listenstand verfuegbar. Erst lokale Aenderungen freigeben oder verwerfen.`
- Technische Sync-Fehlerdetails bleiben im Touchlog.
- Amazon-Aktionen schreiben eigene `[amazon]`-Touchlog-Ereignisse fuer Add, Toggle, Remove, Clear, Finish und Pending Remote.

---

## 7. Risiken

- Last-Write-Wins bleibt fuer bewusst gespeicherte parallele Snapshots die aktuelle Vereinfachung.
- Echte Parallel-Kollaboration mit Grocery und Amazon braucht eine eigene Roadmap, falls der Alltag sie wirklich verlangt.
- Alte Clients koennen bei Gesamt-Snapshot-Saves Amazon-Items ueberschreiben; PWA-Update und Zielgeraete-Smokes bleiben deshalb wichtig.
- Amazon darf nicht schleichend zu Produktvergleich, Warenkorb oder Tracking wachsen.
- Amazon darf das Kassa-Karussell nicht uebernehmen.

---

## 8. Definition of Done

- Amazon-Eintraege sind schnell notierbar.
- Amazon-Eintraege stoeren den normalen Einkauf nicht.
- Grocery-Eintraege stoeren Amazon nicht.
- `Bestellt` wirkt fachlich passend und nicht wie `Im Wagen`.
- Abschluss und Leeren betreffen nur Amazon.
- Snapshot-Aenderungen bleiben mit konfiguriertem Sync teilbar, ohne eine vollwertige Commerce- oder Live-Collaboration-Logik zu behaupten.
