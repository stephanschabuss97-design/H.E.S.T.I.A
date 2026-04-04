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
- Item erscheint sofort in der offenen Liste.
- Einzelnes Item laesst sich loeschen.
- `Liste leeren` entfernt alle Eintraege.

### Shopping
- Wechsel nach `Einkaufen` funktioniert.
- Offene Liste wird dort korrekt angezeigt.
- `Im Wagen` laesst sich pro Eintrag toggeln.
- `Liste abschliessen` entfernt nur markierte Eintraege.
- Nicht markierte Eintraege bleiben erhalten.
- Leere Einkaufsliste zeigt `Alles erledigt.`.

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

---

## 4. UI / Grundverhalten

- Home wirkt ruhig und nicht wie ein Dashboard.
- Home zeigt genau zwei primaere Intent-Flaechen:
  - `Schreiben`
  - `Einkaufen`
- `Schreiben` steht auf Home oberhalb von `Einkaufen`.
- Der kleine Utility-Einstieg ist auffindbar, aber nicht gleichrangig mit den zwei Kernpfaden.
- Writing bleibt schneller als ein Formular.
- Shopping bleibt klar und reduziert.
- Navigation zwischen Home, Writing und Shopping funktioniert ohne Haken.
- Mobile Layout bleibt brauchbar.

---

## 5. CSS-Architektur-Smokes

- App laedt Styling nur ueber `app/app.css`.
- Home, Writing, Shopping, Devtools und Install-Banner sehen nach dem Refaktor nicht sichtbar zerbrochen aus.
- Checkboxen in Shopping bleiben klein und proportional und werden nicht von globalen Textfeld-Regeln aufgeblasen.
- `surface-button`, `inline-link`, `items` und `item-row` wirken konsistent ueber Writing und Shopping.
- Mobile Home-, Writing- und Shopping-Ansicht brechen nicht sichtbar durch die neue Import-Reihenfolge.
- Touchlog-Panel bleibt auf Desktop und Mobil oeffnend und lesbar.
- Install-Banner bleibt in installierter PWA versteckt und im Browser-Kontext weiter korrekt steuerbar.

---

## 6. Sync-Vorbereitung

Diese Checks sind relevant, sobald der erste Supabase-Schritt beginnt:

- App funktioniert weiterhin ohne Supabase-Konfiguration.
- Mit gueltiger Runtime-Config erscheint in Writing der Button `Liste speichern`, sobald Items vorhanden sind.
- Household-Key wird sauber gesetzt.
- Remote-Save bricht den lokalen Flow nicht.
- Fehlerfall bei Supabase fuehrt nicht zu Datenverlust im lokalen Zustand.

---

## 7. Realtime-Zusatzchecks

Diese Checks erst ausfuehren, wenn Realtime eingebaut ist:

- Aenderung auf Geraet A erscheint auf Geraet B.
- Eigenes Save erzeugt keine doppelte UI-Aktualisierung.
- Shopping-Abschluss auf Geraet A spiegelt sich auf Geraet B korrekt.
- Offline/Reconnect fuehrt nicht zu unklaren Zwischenzustaenden.

---

## 8. Touchlog

- Der kleine Utility-Einstieg auf Home oeffnet `Darstellung & Diagnose`.
- `Shift + D` toggelt das Panel ebenfalls.
- Das Panel zeigt `Darstellung` vor `Entwickler`.
- Boot zeigt einen knappen, nachvollziehbaren Start-Trace.
- `Item hinzufuegen`, `Loeschen`, `Liste leeren`, `Liste speichern` und Shopping-Aktionen erscheinen als hochwertige Eintraege.
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

## 10. Definition of Done

- Der lokale HESTIA-Kern besteht alle Checks aus Abschnitt 1 bis 5.
- Neue Features duerfen diese Baseline nicht verschlechtern.
- Sync und Realtime werden erst als stabil betrachtet, wenn auch Abschnitt 6 und 7 reproduzierbar gruen sind.
- Touchlog bleibt hilfreich und ruhig statt technisch laut zu werden.
- Der Home-Hub bleibt bei genau zwei primaeren Intentionen; Utilities duerfen diese Hierarchie nicht aufweichen.
- Dev-/Diagnostics-Hebel bleiben klein, lokal und ohne Eingriff in Produktwahrheit.
