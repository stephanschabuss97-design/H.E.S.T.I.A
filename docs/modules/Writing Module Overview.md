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
| `app/core/semantics.js` | Semantik-Load, Autocomplete-Ranking, Unit-Inferenz |
| `app/core/state.js` | lokaler Item-State und Listenoperationen |
| `app/supabase/list-sync.js` | Snapshot-Load/Save und Household-Resolve |
| `assets/js/semantics.de.json` | kuratierte Produkt- und Aliasliste |
| `index.html` | Writing-Form und offene Liste |
| `app/styles/components.css` | Form-, Listen- und Popup-Styling |

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
- `initWriting()` bindet Formular, Liste, Loeschaktionen, Sync-Status und Save-Button.

### 4.2 User-Trigger
- Produktname eingeben
- optional Menge und Einheit anpassen
- Formular absenden
- einzelne Eintraege loeschen
- ganze Liste leeren
- `Liste speichern`

### 4.3 Verarbeitung
- Beim `change` des Namensfelds wird eine Einheit vorgeschlagen, falls das Einheitenfeld noch leer ist.
- Beim Submit wird validiert:
  - Name darf nicht leer sein
  - Menge muss groesser `0` sein
- Danach wird ein Item mit `crypto.randomUUID()` erzeugt und in den lokalen Store geschrieben.

### 4.4 Persistenz heute
- Add bleibt lokal und wird erst ueber `Liste speichern` gemeinsam festgeschrieben.
- `Loeschen` und `Liste leeren` schreiben den veraenderten Snapshot heute direkt in den Shared State nach, wenn Sync konfiguriert ist.
- Erfolgreiche Remote-Saves spiegeln den Zustand wieder als `source: "remote"` zurueck.

---

## 5. UI-Integration

- Writing besteht aus zwei Panels:
  - Erfassung oben
  - offene Liste darunter
- Das Produktfeld nutzt ein eigenes Popup statt nur rohes `datalist`-Verhalten.
- Leerer Zustand zeigt `Noch keine Eintraege.`.
- Das Listenpanel zeigt einen Sync-Status und bei aktiver Runtime-Config den Button `Liste speichern`.

---

## 6. Fehler- & Diagnoseverhalten

- Ungueltige Submit-Werte werden still ignoriert.
- Sync-Fehler werden im Status und im Touchlog sichtbar.
- Household-Key- und Runtime-Config-Probleme sind heute expliziter diagnostizierbar als frueher.

---

## 7. Risiken

- Add ist bewusst noch nicht auto-synced und kann ohne manuellen Save lokal bleiben.
- Last-Write-Wins bleibt fuer parallele Schreibvorgaenge die aktuelle Vereinfachung.
- stilles Ignorieren ungueltiger Eingaben ist simpel, aber wenig transparent

---

## 8. Definition of Done

- Nutzer koennen Produkte schnell und ohne Denkbruch eintragen.
- Freitext bleibt immer moeglich.
- Semantik beschleunigt, ohne zu kontrollieren.
- Destruktive Aenderungen sind lokal und im Shared State konsistent sichtbar.
