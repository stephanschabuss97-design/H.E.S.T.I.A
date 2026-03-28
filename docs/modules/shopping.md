# Shopping Module - Functional Overview

Kurze Einordnung:
- Zweck: Ausfuehrungsmodus fuer die offene Einkaufsliste.
- Rolle innerhalb von HESTIA: macht aus einer geschriebenen Liste einen ehrlichen, alltagstauglichen Einkaufsflow.
- Abgrenzung: kein komplexes Aufgabenboard, keine Historie, keine Mehrstatus-Maschine.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [writing.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/writing.md)

---

## 1. Zielsetzung

- Offene Eintraege muessen klar sichtbar und schnell abhakbar sein.
- `Im Wagen` soll als einfacher operativer Status waehrend des Einkaufs dienen.
- Nichtziel: Einkaufsanalyse, Teilstatus-Orchester oder Nachbearbeitungsprozess.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/shopping.js` | Rendern der Einkaufsliste, Checkbox-Handling, Abschlusslogik |
| `app/core/state.js` | toggelt `inCart` und loescht gekaufte Eintraege beim Abschluss |
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

### 4.4 Persistenz
- Persistenz laeuft aktuell rein lokal ueber `state.js` und `localStorage`.
- Zielbild spaeter:
  - derselbe Flow mit gemeinsamem Remote-Listenstand
  - Realtime-Aenderungen von anderen Geraeten

---

## 5. UI-Integration

- Shopping zeigt die offene Liste als einfache Zeilen mit Checkbox und Mengeninfo.
- Leerer Zustand zeigt `Alles erledigt.`.
- `Aendern` fuehrt zurueck in Writing.

---

## 6. Fehler- & Diagnoseverhalten

- Es gibt aktuell keine expliziten Fehlermeldungen im Shopping-Flow.
- Der lokale Abschluss ist deterministisch und reduziert dadurch Fehlerflaeche.
- Konflikte zwischen mehreren Geraeten existieren heute noch nicht, weil kein Realtime aktiv ist.

---

## 7. Events & Integration Points

- Input:
  - `change` auf Checkboxen
  - Klick auf `Liste abschliessen`
- Output:
  - `hestia:items-updated` nach Abschluss
- Dependencies:
  - gemeinsamer State aus `state.js`
  - Writing als Quelle fuer neue oder geaenderte Eintraege

---

## 8. Erweiterungspunkte / Zukunft

- Realtime-Aktualisierung waehrend des Einkaufs
- sauberer Echo-Umgang bei eigenen Saves
- optionaler Marker wie `nicht gefunden`, falls alltaglich wirklich noetig

---

## 9. Status / Dependencies / Risks

- Status: aktiv, lokal nutzbar.
- Dependencies (hard): `state.js`, `index.html`.
- Dependencies (soft): spaeter Sync-/Realtime-Schicht.
- Known risks:
  - aktuell kein Mehrgeraete-Abgleich
  - Abschluss loescht hart und bietet keine Undo-Ebene
  - kuenftige Realtime-Events duerfen den einfachen Flow nicht verkomplizieren

---

## 10. Definition of Done

- Offene Eintraege sind klar und schnell abhakbar.
- `Im Wagen` fuehlt sich wie ein einfacher Einkaufsstatus an.
- Abschluss entfernt nur gekaufte Dinge und laesst offene Reste stehen.
- Shopping bleibt schneller als jede formale Aufgabenverwaltung.
