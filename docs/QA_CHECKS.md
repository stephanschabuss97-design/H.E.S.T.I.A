# HESTIA QA Checks

Zweck:
- kompakte manuelle Smokechecks fuer den HESTIA-Kern
- Grundlage fuer Regressionen, bevor groessere Features wie Sync oder Push dazukommen

---

## 1. Lokaler Kernflow

### Writing
- App oeffnet auf Home und zeigt `Schreiben` und `Einkaufen`.
- Wechsel nach `Schreiben` funktioniert.
- Produktname kann frei eingegeben werden.
- Semantik zeigt Vorschlaege nach wenigen Buchstaben.
- Einheit wird sinnvoll vorgeschlagen, wenn das Einheitenfeld leer ist.
- Item mit gueltiger Menge laesst sich hinzufuegen.
- Ungueltige Eingaben zeigen eine ruhige Inline-Notiz und erzeugen kein kaputtes Item.
- Item erscheint sofort in der offenen Liste.
- Natuerliche Mengen im Produktnamen erzeugen keine stoerende doppelte Default-Meta, z. B. `24 Stueck AA und AAA Batterien`.
- Dezimalmengen werden deutschsprachig angezeigt, z. B. `1,5 l`.
- Einzelnes Item laesst sich loeschen.
- `Liste leeren` entfernt alle Eintraege.

### Shopping
- Wechsel nach `Einkaufen` funktioniert.
- Offene Liste wird dort korrekt angezeigt.
- `Im Wagen` laesst sich per Zeilentap toggeln.
- Die Checkbox selbst toggelt genau einmal.
- Zeilentap und Checkbox erzeugen keine doppelten Toggle-Events.
- Gekaufte Zeilen bleiben lesbar und sind ruhig als `Im Wagen` erkennbar.
- `Liste abschliessen` entfernt nur markierte Eintraege.
- `Liste abschliessen` ist nur aktiv, wenn mindestens ein Eintrag im Wagen ist.
- Nicht markierte Eintraege bleiben erhalten.
- `Aendern` fuehrt direkt nach `Schreiben` und bleibt optisch sekundar.
- Leere Einkaufsliste zeigt `Alles erledigt.`.
- Kassa-Karussell sitzt unterhalb von `Liste abschliessen` und `Aendern`.
- Kassa-Karussell zeigt genau `jö`, `MPREIS`, `HOFER`, `SPAR`.
- Zurueck-/Weiter-Buttons wechseln den aktiven Kassa-Eintrag.
- Pfeiltasten wechseln den aktiven Kassa-Eintrag, wenn der Fokus im Karussell liegt.
- Swipe/Drag wechselt den aktiven Kassa-Eintrag auf Touch/Mobile.
- Nur die aktive Kassa-Karte ist im normalen Tabfluss.
- Normaler Linksklick auf die aktive Kassa-Karte oeffnet Google Play in einem neuen Ziel.
- Kassa-Karussell behauptet keinen Installationsstatus und zeigt keine App-Erkennung.

---

## 2. Persistenz lokal

- Nach Reload bleiben offene Eintraege erhalten.
- `Im Wagen`-Status bleibt nach Reload erhalten.
- Nach `Liste leeren` oder `Liste abschliessen` ist der neue Zustand auch nach Reload korrekt.

---

## 3. PWA / Offline

- Service Worker registriert sich ohne sichtbaren Fehler.
- Install-Banner erscheint nur, wenn der Browser installierbar meldet.
- App laesst sich offline erneut oeffnen, wenn sie vorher einmal geladen wurde.
- Offline-Fallback erscheint bei Navigationsausfall verstaendlich.
- Offline-Fallback verspricht kein automatisches Wieder-Synchronisieren.

---

## 4. UI / Grundverhalten

- Home wirkt ruhig und nicht wie ein Dashboard.
- Home wirkt wertig und absichtsvoll, nicht wie schnell zusammengestellte Web-Karten.
- Home zeigt genau zwei primaere Intent-Flaechen:
  - `Schreiben`
  - `Einkaufen`
- `Schreiben` steht auf Home oberhalb von `Einkaufen`.
- Die grosse Home-Flaeche wirkt bewusst ruhig und nicht unfertig.
- Der kleine Utility-Einstieg ist auffindbar, aber nicht gleichrangig mit den zwei Kernpfaden.
- Writing bleibt schneller als ein Formular.
- Shopping bleibt klar und reduziert.
- Kassa-Karussell bleibt sichtbar sekundar und wirkt nicht wie ein App-Launcher.
- Navigation zwischen Home, Writing und Shopping funktioniert ohne Haken.
- Shopping-Zeilen haben unterwegs brauchbare Trefferflaechen.
- Lange Artikelnamen und Mengen ueberlappen nicht.
- Writing-Status spricht von Haushaltsfreigabe, nicht von technischem Sync.
- `Liste freigeben`, `Anderen Stand uebernehmen` und `Liste leeren` ueberlappen auf Mobile nicht.
- `Liste leeren` ist als destruktiv erkennbar, bleibt aber sekundar.
- Mobile Layout bleibt brauchbar.
- Mobile Home hat keine Titel-, Karten- oder Hint-Ueberlappung.
- Home bleibt mit den relevanten Schrift- und Artstilen lesbar.

---

## 5. CSS-Architektur-Smokes

- App laedt Styling nur ueber `app/app.css`.
- Home, Writing, Shopping, Devtools und Install-Banner sehen nach dem Refaktor nicht sichtbar zerbrochen aus.
- Checkboxen in Shopping bleiben klein und proportional und werden nicht von globalen Textfeld-Regeln aufgeblasen.
- `surface-button`, `inline-link`, `items` und `item-row` wirken konsistent ueber Writing und Shopping.
- Mobile Home-, Writing- und Shopping-Ansicht brechen nicht sichtbar durch die neue Import-Reihenfolge.
- Home-spezifische Veredelung bleibt in `app/styles/home.css` verortet und erzeugt keine globalen Button-/Token-Seiteneffekte.
- Touchlog-Panel bleibt auf Desktop und Mobil oeffnend und lesbar.
- Install-Banner bleibt in installierter PWA versteckt und im Browser-Kontext weiter korrekt steuerbar.
- Neue ES-Module wie das Kassa-Karussell sind im Service-Worker-App-Shell-Cache enthalten.

---

## 6. Sync-Vorbereitung

Diese Checks sind relevant, sobald der erste Supabase-Schritt beginnt:

- App funktioniert weiterhin ohne Supabase-Konfiguration.
- Mit gueltiger Runtime-Config erscheint in Writing der Button `Liste freigeben`, sobald Items vorhanden sind.
- Household-Key wird sauber gesetzt.
- Remote-Save bricht den lokalen Flow nicht.
- Fehlerfall bei Supabase fuehrt nicht zu Datenverlust im lokalen Zustand.
- Save-Fehler zeigt alltagssprachlich, dass die Liste lokal bleibt.

---

## 7. Realtime-Zusatzchecks

Diese Checks pruefen den aktuellen Snapshot-/Realtime-Vertrag. Robuste parallele Einkaufskoordination bleibt eine eigene Roadmap:

- Aenderung auf Geraet A erscheint auf Geraet B.
- Eigenes Save erzeugt keine doppelte UI-Aktualisierung.
- Shopping-Abschluss auf Geraet A spiegelt sich auf Geraet B korrekt.
- Offline/Reconnect fuehrt nicht zu unklaren Zwischenzustaenden.
- Lokale unfreigegebene Writing-Aenderungen auf Geraet B werden durch einen Remote-Snapshot von Geraet A nicht still ueberschrieben.
- Pending Remote zeigt den Hinweis `Anderer Listenstand verfuegbar...`.
- `Anderen Stand uebernehmen` uebernimmt den Remote-Stand bewusst destruktiv.

---

## 8. Touchlog

- Der kleine Utility-Einstieg auf Home oeffnet `Darstellung & Diagnose`.
- `Shift + D` toggelt das Panel ebenfalls.
- Das Panel zeigt `Darstellung` vor `Entwickler`.
- Boot zeigt einen knappen, nachvollziehbaren Start-Trace.
- `Item hinzufuegen`, `Loeschen`, `Liste leeren`, `Liste freigeben`, Pending-Remote und Shopping-Aktionen erscheinen als hochwertige Eintraege.
- Kassa-Karussell-Wechsel duerfen als ruhige `[kassa]`-Eintraege erscheinen, aber keine Pointer-/Gesture-Details loggen.
- Realtime-Ereignisse erscheinen als eigene Sync-Eintraege.
- Wiederholte identische Ereignisse werden aggregiert statt gespammt.
- Auf Mobile bleibt das Panel viewport-begrenzt und intern scrollbar; der obere Bereich darf nicht aus dem sichtbaren Fenster herausragen.

---

## 9. Diagnostics / Dev

- Die Sektion `Aktuelle Wahl` zeigt nur lokale Darstellungszustaende.
- Default-`Schriftstil` und Default-`Artstil` erscheinen nicht als aktiver Diagnosemodus.
- Ohne aktive Stilabweichung zeigt `Aktuelle Wahl` den Default-Hinweis `Standardstil aktiv.`.
- Die Sektion `Aktive Diagnosemodi` zeigt aktive Sonderzustaende nur dann, wenn wirklich ein Diagnosemodus aktiv ist.
- `No Cache Assets` laesst sich aktivieren und bleibt nach Reload sichtbar aktiv.
- `No Cache Assets` laesst sich wieder deaktivieren und verschwindet danach aus den aktiven Modi.
- `Touchlog leeren` leert den Log sichtbar und hinterlaesst genau eine kleine Diagnosezeile.
- `Dev State zuruecksetzen` setzt nur Dev-/Sandbox-Zustaende zurueck, nicht Household-Key oder Produktdaten.
- Nach `Dev State zuruecksetzen` sind `No Cache Assets`, Schriftstil-Sonderzustand und Artstil-Sonderzustand wieder auf Default.

---

## 10. Entsorgungsdaten-Pipeline

Diese Checks pruefen nur das Datenfundament. Sichtbare Entsorgungs-UI und Erinnerungen sind eigene Roadmaps.

- Script-Syntax ist gueltig:
  - `node --check scripts/update-waste-calendar.mjs`
- Discovery gegen Axams liefert fuer alle drei Collections Seite `200`, iCal `200` und aktuell keinen Fallback:
  - `node scripts/update-waste-calendar.mjs --check-discovery`
- Live-JSON ist parsebar und enthaelt genau drei Collections:
  - `bio-west`
  - `rest-axams-dorf`
  - `gelber-sack-axams-dorf`
- `assets/data/waste-calendar.axams.json` enthaelt:
  - `schemaVersion: 1`
  - `municipality: "Axams"`
  - `source.type: "axams-ical"`
  - `source.pages[]` mit `collectionId`, `pageUrl`, `icalUrl`
  - `collections[].dates[]` mit `date`, `title`, `sourceUid`
- Das JSON enthaelt keine Laufzeit- oder Diagnosefelder:
  - kein `generatedAt`
  - kein `fetchedAt`
  - kein `validUntil`
  - kein `warnings`
  - kein `diagnostics`
  - kein `description`
  - kein `endDate`
- Termine sind je Collection stabil sortiert.
- Doppelte `sourceUid`-Werte oder doppelte Datum/Titel-Paare je Collection treten im erzeugten JSON nicht auf.
- Zweiter `node scripts/update-waste-calendar.mjs --write-json`-Lauf erzeugt keine inhaltliche Aenderung, wenn die Quellen unveraendert sind.
- Fehlerfall-Smokes pruefen:
  - leerer Feed failt hart
  - fehlender Feed failt hart
  - ungueltiges Datum failt hart
- Workflow-Contract ist statisch erfuellt:
  - `workflow_dispatch`
  - beide Cron-Zeilen
  - `contents: write`
  - `concurrency`
  - `node scripts/update-waste-calendar.mjs --write-json`
  - Diff-Guard auf `assets/data/waste-calendar.axams.json`
  - keine Secrets
  - keine Dependency-Installation
- Keine `.ics`-Rohdaten werden versioniert.
- Home, Writing, Shopping, Supabase und Service Worker bleiben durch Roadmap 5A unberuehrt.

Nur auf GitHub pruefbar:

- echter geplanter Schedule-Lauf
- manueller `workflow_dispatch`-Lauf
- Bot-Commit und Bot-Push
- moegliche Branch-Protection- oder Repository-Permission-Blockaden

---

## 11. Definition of Done

- Der lokale HESTIA-Kern besteht alle Checks aus Abschnitt 1 bis 5.
- Neue Features duerfen diese Baseline nicht verschlechtern.
- Sync und Realtime werden erst als stabil betrachtet, wenn auch Abschnitt 6 und 7 reproduzierbar gruen sind.
- Touchlog bleibt hilfreich und ruhig statt technisch laut zu werden.
- Der Home-Hub bleibt bei genau zwei primaeren Intentionen; Utilities duerfen diese Hierarchie nicht aufweichen.
- Dev-/Diagnostics-Hebel bleiben klein, lokal und ohne Eingriff in Produktwahrheit.
- Entsorgungsdaten bleiben ein lokales Datenfundament, bis eine eigene UI-Roadmap sie bewusst anbindet.
