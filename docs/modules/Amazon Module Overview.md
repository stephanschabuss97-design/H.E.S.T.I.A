# Amazon Module - Functional Overview

Kurze Einordnung:
- Zweck: beschreibt den aktuellen sichtbaren Amazon-Einstieg als Platzhalter und die technische Uebergangsflaeche dahinter.
- Rolle innerhalb von HESTIA: Home zeigt bereits `Amazon`, aber bis Roadmap 6B fuehrt dieser Einstieg noch auf den alten technischen `shopping`-Screen.
- Abgrenzung: noch keine Amazon-Liste, keine Amazon-API, keine Produktlinks, keine Preise, keine Bestelllogik.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Kassa Carousel Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Kassa%20Carousel%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Offene Eintraege muessen klar sichtbar und schnell abhakbar sein.
- `Im Wagen` soll als einfacher operativer Status waehrend des Einkaufs dienen.
- Der alte Screen bleibt als Vergleichs- und Rueckfallflaeche erhalten, bis der kombinierte Bereich `Einkauf` in der Praxis bestaetigt ist.
- Nichtziel: Einkaufsanalyse, Teilstatus-Orchester, Nachbearbeitungsprozess oder Amazon-Merkliste.

---

## 2. Kernkomponenten & Dateien

| Datei | Zweck |
|------|------|
| `app/modules/shopping.js` | Rendern des alten Shopping-Screens, Checkbox-Handling, Abschlusslogik und Sync-Persist |
| `app/modules/kassa-carousel.js` | isolierte Bedienlogik fuer Kassa-Karussell-Instanzen im kombinierten Einkauf und im alten Shopping-Screen |
| `app/core/item-display.js` | rein praesentative Mengen-/Einheitenanzeige fuer Shopping und Writing |
| `app/core/state.js` | toggelt `inCart` und loescht gekaufte Eintraege beim Abschluss |
| `app/supabase/list-sync.js` | speichert geaenderte Einkaufs-Snapshots |
| `index.html` | alter `screen-shopping` mit Liste, Abschlussaktionen und statischem Kassa-Karussell-Markup |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/styles/ui.css` | globale Listen- und Aktionsmuster |
| `app/styles/shopping.css` | wiederverwendbare Papierliste, tapbare Zeilen, Checkboxen, Abschlussbutton, Kassa-Karussell und mobile Einkaufsdarstellung |

---

## 3. Datenmodell / Storage

- Shopping arbeitet auf denselben Items wie der sichtbare Bereich `Einkauf`/technisch `writing`.
- Relevante Felder:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`
- Es gibt keinen separaten Shopping-State ausser dem gesetzten `inCart`-Flag.
- Es gibt in Roadmap 6A noch keinen `listType` und keine Amazon-Items.

---

## 4. Ablauf / Logikfluss

### 4.1 Initialisierung
- `initShopping()` bindet Liste und Abschlussbutton.
- Der Screen rendert initial aus dem aktuellen Store.
- Das Modul hoert auf `hestia:items-updated`.
- Der Screen wird weiterhin initialisiert, auch wenn Home die zweite Kachel sichtbar `Amazon` nennt.

### 4.2 User-Trigger
- Shopping-Zeile oder Checkbox fuer `Im Wagen` setzen oder entfernen
- `Liste abschliessen`
- optional zurueck zum technischen `writing`-Ziel, sichtbar `Einkauf`
- Kassa-Karussell per Zurueck/Weiter, Pfeiltasten oder Swipe wechseln
- aktive Kassa-Karte per Linksklick in Google Play oeffnen

### 4.3 Verarbeitung
- Zeilentap und Checkbox laufen ueber denselben lokalen Toggle-Pfad und aktualisieren `inCart` im Store.
- Beim Abschluss werden alle Items mit `inCart = true` hart entfernt.
- Nicht markierte Eintraege bleiben bestehen.
- `Liste abschliessen` ist nur aktiv, wenn mindestens ein Eintrag `inCart = true` ist.

### 4.4 Persistenz heute
- Checkbox-Aenderungen und `Liste abschliessen` schreiben den veraenderten Snapshot direkt in den Shared State nach, wenn Sync konfiguriert ist.
- Realtime kann eingehende Snapshot-Aenderungen spiegeln, ist aber noch kein robuster paralleler Einkaufsmodus fuer zwei Personen.

---

## 5. UI-Integration

- Der alte Shopping-Screen zeigt die offene Liste als Papierliste mit tapbaren Zeilen, sichtbarer Checkbox und praesentativer Mengeninfo.
- Default-Meta wie `1 stk` kann ausgeblendet werden, wenn der Produktname bereits eine klare Mengenangabe enthaelt.
- Gekaufte Zeilen werden ruhig als `Im Wagen` markiert, ohne einen zweiten fachlichen Status einzufuehren.
- Leerer Zustand zeigt `Alles erledigt.`.
- `Liste abschliessen` ist die primaere Abschlussaktion und wirkt im Leerzustand nicht wie ein aktiver Speichervorgang.
- `Aendern` fuehrt zurueck zum kombinierten Bereich `Einkauf` und bleibt eine sekundare Aktion.
- Unterhalb der Shopping-Actions sitzt weiterhin ein Kassa-Karussell als kleine Kassahilfe.
- Das Karussell zeigt genau vier feste Eintraege: `jö`, `MPREIS`, `HOFER`, `SPAR`.
- Das Karussell bleibt sekundar und darf nicht wie ein dritter Shopping-Status oder App-Launcher wirken.
- Der alte Screen bleibt nicht Amazon: Die sichtbare Home-Kachel `Amazon` ist bis zur Amazon-Roadmap nur ein Platzhalter auf dem bestehenden `shopping`-Ziel.

---

## 6. Fehler- & Diagnoseverhalten

- Es gibt noch keine eigene Nutzer-Fehlermeldung im Shopping-Screen.
- Save-Fehler landen heute im Touchlog und ueber die gemeinsamen Sync-Mechanismen.
- Der Shopping-Flow bleibt absichtlich klein und verzichtet auf Undo oder Historie.

---

## 7. Risiken

- Last-Write-Wins bleibt fuer bewusst gespeicherte parallele Einkaufsaenderungen die aktuelle Vereinfachung.
- Eingehende Remote-Snapshots duerfen lokale Writing-Arbeit nicht still ueberschreiben; das wird im Boot-/Writing-Vertrag behandelt.
- Echte Parallel-Kollaboration im Markt braucht eine eigene Roadmap, weil Konflikte, Remote-Echos und Abschlussregeln bewusst gestaltet werden muessen.
- Abschluss loescht hart und bietet keine Undo-Ebene.
- Kuenftige Offline-/Reconnect-Faelle duerfen den einfachen Einkaufsfluss nicht aufblaehen.
- Externe Google-Play-Links im Kassa-Karussell bleiben Plattformverhalten und duerfen keinen Installationsstatus vortaeuschen.
- Sichtbarer Home-Name `Amazon` kann kurzfristig irritieren, solange er technisch noch in diesen alten Screen fuehrt; dieser Zustand ist als Platzhalter dokumentiert und wird in der Amazon-Roadmap aufgeloest.

---

## 8. Definition of Done

- Offene Eintraege sind klar und schnell abhakbar.
- `Im Wagen` fuehlt sich wie ein einfacher Einkaufsstatus an.
- Abschluss entfernt nur gekaufte Dinge und laesst offene Reste stehen.
- Snapshot-Aenderungen bleiben mit konfiguriertem Sync teilbar, ohne einen vollwertigen Live-Collaboration-Vertrag zu behaupten.
- Kassa-Karussell bleibt eine kleine externe Linkhilfe ohne Einfluss auf Listen-State oder Abschlusslogik.
- Der alte Screen bleibt regressionsfrei erreichbar, bis er in einer spaeteren Roadmap bewusst entfernt oder ersetzt wird.
