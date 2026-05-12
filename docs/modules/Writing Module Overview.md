# Writing Module - Functional Overview

Kurze Einordnung:
- Zweck: schnelle, friktionsarme Erfassung und Pflege der aktuellen Einkaufsliste.
- Rolle innerhalb von HESTIA: Writing ist der wichtigste Eingang in den gemeinsamen Haushaltsfluss.
- Abgrenzung: kein Formularmonster, keine Pflichtkategorien, keine komplizierte Produktverwaltung.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Listeneintraege sollen schneller erfassbar sein als auf Papier mit nachtraeglicher Abstimmung.
- Freitext muss immer funktionieren, auch wenn Semantik nichts Passendes kennt.
- Nichtziel: harte Datendisziplin, Kategorienpflicht oder komplexe Editierdialoge.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/writing.js` | Formularlogik, Add/Remove, Rendern der offenen Liste und Sync-Status |
| `app/core/item-display.js` | rein praesentative Mengen-/Einheitenanzeige fuer Writing und Shopping |
| `app/core/semantics.js` | Semantik-Load, Autocomplete-Ranking, Unit-Inferenz |
| `app/core/state.js` | lokaler Item-State und Listenoperationen |
| `app/supabase/list-sync.js` | Snapshot-Load/Save und Household-Resolve |
| `assets/js/semantics.de.json` | kuratierte Produkt- und Aliasliste |
| `index.html` | Writing-Form und offene Liste |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/styles/ui.css` | globale Listen-, Link- und Statusmuster |
| `app/styles/writing.css` | Form-, Listen- und Popup-Styling fuer Writing |

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

Semantik-Entries liefern nur Hilfe und keine Pflichtstruktur.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `initSemantics()` laedt `assets/js/semantics.de.json`.
- `bindSemanticsAutocomplete()` verbindet das Produktfeld mit dem Suggestion-Popup.
- `initWriting()` bindet Formular, Liste, Loeschaktionen, Freigabe-Status, Freigabe-Button und Pending-Remote-Uebernahme.

### 4.2 User-Trigger
- Produktname eingeben
- optional Menge und Einheit anpassen
- Formular absenden
- einzelne Eintraege loeschen
- ganze Liste leeren
- `Liste freigeben`
- `Anderen Stand uebernehmen`, falls ein Remote-Stand waehrend lokaler Aenderungen verfuegbar wurde

### 4.3 Verarbeitung
- Beim `change` des Namensfelds wird eine Einheit vorgeschlagen, falls das Einheitenfeld noch leer ist.
- Beim Submit wird validiert:
  - Name darf nicht leer sein
  - Menge muss groesser `0` sein
- Ungueltige Eingaben zeigen eine kleine Inline-Notiz am Formular und fokussieren das betroffene Feld.
- Danach wird ein Item mit `crypto.randomUUID()` erzeugt und in den lokalen Store geschrieben.

### 4.4 Persistenz heute
- Add bleibt lokal und wird erst ueber `Liste freigeben` gemeinsam festgeschrieben.
- `Loeschen` und `Liste leeren` schreiben den veraenderten Snapshot heute direkt in den Shared State nach, wenn Sync konfiguriert ist.
- Erfolgreiche Remote-Saves spiegeln den Zustand wieder als `source: "remote"` zurueck.
- Wenn waehrend lokaler Aenderungen ein anderer Remote-Stand eintrifft, wird dieser nicht automatisch angewendet. Writing zeigt einen Pending-Hinweis und bietet die bewusste Uebernahme des anderen Stands an.

---

## 5. UI-Integration

- Writing besteht aus zwei Panels:
  - Erfassung oben
  - offene Liste darunter
- Das Produktfeld ist visuell als Hauptaktion gewichtet; Menge und Einheit bleiben sichtbar, aber sekundar.
- Das Produktfeld nutzt ein eigenes Popup statt nur rohes `datalist`-Verhalten.
- Leerer Zustand zeigt `Noch keine Eintraege.`.
- Das Listenpanel zeigt einen Haushaltsfreigabe-Status und bei aktiver Runtime-Config den Button `Liste freigeben`.
- Bei Pending Remote erscheint `Anderen Stand uebernehmen` als bewusste destruktive V1-Aktion.
- `Loeschen` und `Liste leeren` nutzen dasselbe destruktive Inline-Link-Muster, ohne Dialog-, Undo- oder Historienlogik einzufuehren.

---

## 6. Fehler- & Diagnoseverhalten

- Ungueltige Submit-Werte erzeugen keine kaputten Items und werden leise inline erklaert.
- Freigabe-Fehler werden im Status alltagssprachlich sichtbar: Die Liste bleibt lokal.
- Technische Sync-Fehlerdetails bleiben im Touchlog.
- Household-Key- und Runtime-Config-Probleme sind heute expliziter diagnostizierbar als frueher.

---

## 7. Risiken

- Add ist bewusst noch nicht auto-synced und kann ohne manuellen Save lokal bleiben.
- Last-Write-Wins bleibt fuer bewusst freigegebene Snapshots die aktuelle Vereinfachung.
- Pending Remote ist kein Merge: `Anderen Stand uebernehmen` verwirft lokale Aenderungen bewusst.
- Reload/Hard-Refresh folgt weiter der lokalen Persistenzrealitaet.

---

## 8. Definition of Done

- Nutzer koennen Produkte schnell und ohne Denkbruch eintragen.
- Freitext bleibt immer moeglich.
- Semantik beschleunigt, ohne zu kontrollieren.
- Destruktive Aenderungen sind lokal und im Shared State konsistent sichtbar.
- Lokale Schreibarbeit wird nicht still durch eingehende Remote-Snapshots ersetzt.
