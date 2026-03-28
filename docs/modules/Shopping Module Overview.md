# Shopping Module - Functional Overview

Kurze Einordnung:
- Zweck: Ausfuehrungsmodus fuer die offene Einkaufsliste.
- Rolle innerhalb von HESTIA: macht aus einer geschriebenen Liste einen ehrlichen, alltagstauglichen Einkaufsflow.
- Abgrenzung: kein komplexes Aufgabenboard, keine Historie, keine Mehrstatus-Maschine.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Writing Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Writing%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Offene Eintraege muessen klar sichtbar und schnell abhakbar sein.
- `Im Wagen` soll als einfacher operativer Status waehrend des Einkaufs dienen.
- Nichtziel: Einkaufsanalyse, Teilstatus-Orchester oder Nachbearbeitungsprozess.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/shopping.js` | Rendern der Einkaufsliste, Checkbox-Handling, Abschlusslogik und Sync-Persist |
| `app/core/state.js` | toggelt `inCart` und loescht gekaufte Eintraege beim Abschluss |
| `app/supabase/list-sync.js` | speichert geaenderte Einkaufs-Snapshots |
| `index.html` | Shopping-Panel mit Liste und Abschlussaktionen |
| `app/styles/components.css` | Listen- und Checkbox-Darstellung |

---

## 3. Datenmodell / Storage

- Shopping arbeitet auf denselben Items wie Writing.
- Relevante Felder:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`
- Es gibt keinen separaten Shopping-State ausser dem gesetzten `inCart`-Flag.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `initShopping()` bindet Liste und Abschlussbutton.
- Der Screen rendert initial aus dem aktuellen Store.
- Das Modul hoert auf `hestia:items-updated`.

### 4.2 User-Trigger
- Checkbox fuer `Im Wagen` setzen oder entfernen
- `Liste abschliessen`
- optional zurueck nach `Schreiben`

### 4.3 Verarbeitung
- Jede Checkbox-Aenderung aktualisiert `inCart` im Store.
- Beim Abschluss werden alle Items mit `inCart = true` hart entfernt.
- Nicht markierte Eintraege bleiben bestehen.

### 4.4 Persistenz heute
- Checkbox-Aenderungen und `Liste abschliessen` schreiben den veraenderten Snapshot heute direkt in den Shared State nach, wenn Sync konfiguriert ist.
- Dadurch spiegelt Realtime den Einkaufsfortschritt auf andere Geraete.

---

## 5. UI-Integration

- Shopping zeigt die offene Liste als einfache Zeilen mit Checkbox und Mengeninfo.
- Leerer Zustand zeigt `Alles erledigt.`.
- `Aendern` fuehrt zurueck in Writing.

---

## 6. Fehler- & Diagnoseverhalten

- Es gibt noch keine eigene Nutzer-Fehlermeldung im Shopping-Screen.
- Save-Fehler landen heute im Touchlog und ueber die gemeinsamen Sync-Mechanismen.
- Der Shopping-Flow bleibt absichtlich klein und verzichtet auf Undo oder Historie.

---

## 7. Risiken

- Last-Write-Wins bleibt fuer parallele Einkaufsaenderungen die aktuelle Vereinfachung.
- Abschluss loescht hart und bietet keine Undo-Ebene.
- kuenftige Offline-/Reconnect-Faelle duerfen den einfachen Einkaufsfluss nicht aufblaehen.

---

## 8. Definition of Done

- Offene Eintraege sind klar und schnell abhakbar.
- `Im Wagen` fuehlt sich wie ein einfacher Einkaufsstatus an.
- Abschluss entfernt nur gekaufte Dinge und laesst offene Reste stehen.
- Shopping-Aenderungen werden auf anderen Geraeten sichtbar.
