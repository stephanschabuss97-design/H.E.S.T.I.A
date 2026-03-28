# Writing Module - Functional Overview

Kurze Einordnung:
- Zweck: schnelle, friktionsarme Erfassung und Pflege der aktuellen Einkaufsliste.
- Rolle innerhalb von HESTIA: Writing ist der wichtigste Eingang in den gemeinsamen Haushaltsfluss.
- Abgrenzung: kein Formularmonster, keine Pflichtkategorien, keine komplizierte Produktverwaltung.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [shopping.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/shopping.md)

---

## 1. Zielsetzung

- Listeneintraege sollen schneller erfassbar sein als auf Papier mit nachtraeglicher Abstimmung.
- Freitext muss immer funktionieren, auch wenn Semantik nichts Passendes kennt.
- Nichtziel: harte Datendisziplin, Kategorienpflicht oder komplexe Editierdialoge.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/writing.js` | Formularlogik, Add/Remove, Rendern der offenen Liste |
| `app/core/semantics.js` | Semantik-Load, Autocomplete-Ranking, Unit-Inferenz |
| `app/core/state.js` | lokaler Item-State und Listenoperationen |
| `app/supabase/list-sync.js` | manueller Snapshot-Save nach Supabase |
| `assets/js/semantics.de.json` | kuratierte Produkt- und Aliasliste |
| `index.html` | Writing-Form, Datumslisten-Platzhalter und offene Liste |
| `app/styles/components.css` | Form-, Listen- und Popup-Styling |

---

## 3. Datenmodell / Storage

- Source of truth heute: `state.items` aus `localStorage`.
- Frontend-Vertrag pro Eintrag:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`
- Semantik-Entries sind getrennt davon und liefern nur Hilfe:
  - `id`
  - `label`
  - `aliases`
  - `default_unit`
  - optional `category`

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `initSemantics()` laedt `assets/js/semantics.de.json` und baut den Unit-Index.
- `bindSemanticsAutocomplete()` verbindet das Produktfeld mit dem Suggestion-Popup.
- `initWriting()` bindet Formular, Liste und Loeschaktionen.

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
- Jede relevante Aenderung dispatcht `hestia:items-updated`.
- Der manuelle Save-Button uebertraegt den aktuellen Snapshot nach Supabase, wenn oeffentliche Runtime-Config vorhanden ist.

### 4.4 Persistenz
- Schreiben speichert heute direkt in `localStorage`.
- Zielbild spaeter:
  - lokaler Flow bleibt erhalten
  - manueller Snapshot-Save nach Supabase ist der erste Shared-Sync-Schritt
  - Realtime fuer eingehende Haushaltsaenderungen

---

## 5. UI-Integration

- Writing besteht aus zwei Panels:
  - Erfassung oben
  - offene Liste darunter
- Das Produktfeld nutzt ein eigenes Popup statt nur rohes `datalist`-Verhalten.
- Leerer Zustand zeigt `Noch keine Eintraege.`.
- Das Listenpanel zeigt zusaetzlich einen einfachen Sync-Status und bei aktiver Runtime-Config den Button `Liste speichern`.

---

## 6. Fehler- & Diagnoseverhalten

- Ungueltige Submit-Werte werden still ignoriert.
- Fallback-Semantik greift, falls die JSON-Datei nicht ladbar ist.
- Es gibt aktuell keine expliziten User-Fehlermeldungen fuer Schreibfehler oder Persistenzprobleme.

---

## 7. Events & Integration Points

- Input:
  - `change` auf Produktfeld
  - `submit` auf `#item-form`
  - Klick auf `Liste leeren`
  - Klick auf einzelne `Loeschen`-Aktionen
- Output:
  - `hestia:items-updated`
- Dependencies:
  - Semantik-Modul
  - State-Layer
  - Shopping hoert auf denselben Update-Event

---

## 8. Erweiterungspunkte / Zukunft

- inline editing pro Zeile
- Sync-Status im Panel
- spaeterer Realtime-Abgleich
- vorsichtige Verbesserung der Validierung, ohne Freitext zu blockieren

---

## 9. Status / Dependencies / Risks

- Status: aktiv, lokal gut nutzbar.
- Dependencies (hard): `state.js`, `semantics.js`, `index.html`.
- Dependencies (soft): kuratierte Semantikqualitaet.
- Known risks:
  - aktuell kein Inline-Edit, nur Add/Remove
  - lokale und spaetere Remote-Wahrheit muessen sauber zusammenfinden
  - stilles Ignorieren ungueltiger Eingaben ist simpel, aber wenig transparent

---

## 10. Definition of Done

- Nutzer koennen Produkte schnell und ohne Denkbruch eintragen.
- Freitext bleibt immer moeglich.
- Semantik beschleunigt, ohne zu kontrollieren.
- Jede Listenveraenderung ist sofort in Writing und Shopping konsistent sichtbar.
