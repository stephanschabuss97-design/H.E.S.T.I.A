# Shopping Module - Functional Overview

Kurze Einordnung:
- Zweck: schnelle, friktionsarme Erfassung, Pflege und Einkaufsbearbeitung der aktuellen Einkaufsliste.
- Rolle innerhalb von HESTIA: technisch bleibt das Modul `writing`, sichtbar ist es nach Roadmap 6A der Bereich `Einkauf`.
- Abgrenzung: kein Formularmonster, keine Pflichtkategorien, keine komplizierte Produktverwaltung.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Amazon Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Amazon%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Listeneintraege sollen schneller erfassbar sein als auf Papier mit nachtraeglicher Abstimmung.
- Derselbe Bereich soll die Liste danach auch als Papierliste abhakbar machen.
- Freitext muss immer funktionieren, auch wenn Semantik nichts Passendes kennt.
- Nichtziel: harte Datendisziplin, Kategorienpflicht, komplexe Editierdialoge oder Amazon-Listenlogik.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/writing.js` | Formularlogik, Auto-Freigabe nach Add, Rendern der offenen Papierliste, Checkbox-/Remove-/Abschlusslogik und Sync-Status |
| `app/core/item-display.js` | rein praesentative Mengen-/Einheitenanzeige fuer Writing und Shopping |
| `app/core/semantics.js` | Semantik-Load, Autocomplete-Ranking, Unit-Inferenz |
| `app/core/state.js` | lokaler Item-State, `inCart`-Toggle, Clear und Einkaufsabschluss |
| `app/supabase/list-sync.js` | Snapshot-Load/Save und Household-Resolve |
| `assets/js/semantics.de.json` | kuratierte Produkt- und Aliasliste |
| `app/modules/kassa-carousel.js` | initialisiert das Kassa-Karussell auch im sichtbaren `Einkauf`-Bereich |
| `index.html` | technischer `screen-writing`, sichtbar als `Einkauf`, mit Formular, offener Papierliste und Kassa-Karussell |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/styles/ui.css` | globale Listen-, Link- und Statusmuster |
| `app/styles/writing.css` | Form-, Listen- und Popup-Styling fuer Writing |
| `app/styles/shopping.css` | wiederverwendbare Papierlisten-, Checkbox-, Abschluss- und Kassa-Regeln |

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
- `initWriting()` bindet Formular, Papierliste, Checkboxen, Loeschaktionen, Abschluss, Freigabe-Status, Freigabe-Button und Pending-Remote-Uebernahme.
- Das Kassa-Karussell wird nicht von `writing.js`, sondern zentral ueber `initKassaCarousel()` initialisiert.

### 4.2 User-Trigger
- Produktname eingeben
- optional Menge und Einheit anpassen
- Formular absenden
- einzelne Eintraege als `Im Wagen` markieren oder wieder oeffnen
- einzelne Eintraege loeschen
- ganze Liste leeren
- `Liste abschliessen`
- `Liste freigeben`
- `Anderen Stand uebernehmen`, falls ein Remote-Stand waehrend lokaler Aenderungen verfuegbar wurde
- Kassa-Karussell bedienen und aktive Kassa-App als externen Google-Play-Link oeffnen

### 4.3 Verarbeitung
- Beim `change` des Namensfelds wird eine Einheit vorgeschlagen, falls das Einheitenfeld noch leer ist.
- Beim Submit wird validiert:
  - Name darf nicht leer sein
  - Menge muss groesser `0` sein
- Ungueltige Eingaben zeigen eine kleine Inline-Notiz am Formular und fokussieren das betroffene Feld.
- Danach wird ein Item mit `crypto.randomUUID()` erzeugt, in den lokalen Store geschrieben und nach bewusstem Submit per Snapshot freigegeben, wenn Sync konfiguriert ist.
- Checkboxen toggeln `inCart`.
- `Loeschen` entfernt genau den betroffenen Eintrag und stoppt das Zeilen-/Checkbox-Event.
- `Liste abschliessen` entfernt nur Eintraege mit `inCart === true`; offene Eintraege bleiben bestehen.

### 4.4 Persistenz heute
- Add speichert nach bewusstem Submit automatisch einen Shared Snapshot, wenn Sync konfiguriert ist.
- `Liste freigeben` bleibt als Retry/Fallback sichtbar, wenn ein Dirty-, Error- oder Pending-Remote-Zustand besteht.
- Checkbox-Aenderungen, `Loeschen`, `Liste leeren` und `Liste abschliessen` schreiben den veraenderten Snapshot direkt in den Shared State nach, wenn Sync konfiguriert ist.
- Erfolgreiche Remote-Saves spiegeln den Zustand wieder als `source: "remote"` zurueck.
- Wenn waehrend lokaler Aenderungen ein anderer Remote-Stand eintrifft, wird dieser nicht automatisch angewendet. Writing zeigt einen Pending-Hinweis und bietet die bewusste Uebernahme des anderen Stands an.

---

## 5. UI-Integration

- Sichtbar heisst der Bereich `Einkauf`; technisch bleibt der Screen `screen-writing` und die Route `writing`.
- Der Bereich besteht aus zwei Panels:
  - Erfassung oben
  - offene Papierliste darunter
- Das Produktfeld ist visuell als Hauptaktion gewichtet; Menge und Einheit bleiben sichtbar, aber sekundar.
- Das Produktfeld nutzt ein eigenes Popup statt nur rohes `datalist`-Verhalten.
- Leerer Zustand zeigt `Noch keine Eintraege.`.
- Das Listenpanel zeigt einen Haushaltsfreigabe-Status und bei aktiver Runtime-Config den Button `Liste freigeben`.
- Bei Pending Remote erscheint `Anderen Stand uebernehmen` als bewusste destruktive V1-Aktion.
- Die offene Liste nutzt die Papierlisten-Aesthetik aus dem Einkaufsmodus mit Checkbox, Produktname, Mengeninfo und `Loeschen`.
- `Liste abschliessen` sitzt unterhalb der Papierliste und ist deaktiviert, solange nichts `Im Wagen` ist.
- Das Kassa-Karussell sitzt unterhalb der Listenaktionen als kleine Kassahilfe.
- `Loeschen` und `Liste leeren` nutzen destruktive Inline-Link-Muster, ohne Dialog-, Undo- oder Historienlogik einzufuehren.

---

## 6. Fehler- & Diagnoseverhalten

- Ungueltige Submit-Werte erzeugen keine kaputten Items und werden leise inline erklaert.
- Freigabe-Fehler werden im Status alltagssprachlich sichtbar: Die Liste bleibt lokal.
- Technische Sync-Fehlerdetails bleiben im Touchlog.
- Household-Key- und Runtime-Config-Probleme sind heute expliziter diagnostizierbar als frueher.

---

## 7. Risiken

- Add ist nach bewusstem Submit auto-synced, wenn Sync konfiguriert ist; Save-Fehler duerfen das lokale Item nicht verlieren.
- Last-Write-Wins bleibt fuer bewusst freigegebene Snapshots die aktuelle Vereinfachung.
- Pending Remote ist kein Merge: `Anderen Stand uebernehmen` verwirft lokale Aenderungen bewusst.
- Reload/Hard-Refresh folgt weiter der lokalen Persistenzrealitaet.
- Die technische Bezeichnung `writing` bleibt im Code stabil, obwohl die UI sichtbar `Einkauf` sagt.
- Die sichtbare Amazon-Kachel ist noch keine Amazon-Listenlogik; dieses Modul bleibt in Roadmap 6A grocery-only.

---

## 8. Definition of Done

- Nutzer koennen Produkte schnell und ohne Denkbruch eintragen.
- Nutzer koennen dieselbe Liste im Bereich `Einkauf` abhaken, loeschen und abschliessen.
- Freitext bleibt immer moeglich.
- Semantik beschleunigt, ohne zu kontrollieren.
- Destruktive Aenderungen sind lokal und im Shared State konsistent sichtbar.
- Lokale Schreibarbeit wird nicht still durch eingehende Remote-Snapshots ersetzt.
- Kassa bleibt eine kleine externe Linkhilfe ohne Einfluss auf Listen-State oder Abschlusslogik.
