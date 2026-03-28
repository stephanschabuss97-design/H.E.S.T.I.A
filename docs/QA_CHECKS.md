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
- Writing bleibt schneller als ein Formular.
- Shopping bleibt klar und reduziert.
- Navigation zwischen Home, Writing und Shopping funktioniert ohne Haken.
- Mobile Layout bleibt brauchbar.

---

## 5. Sync-Vorbereitung

Diese Checks sind relevant, sobald der erste Supabase-Schritt beginnt:

- App funktioniert weiterhin ohne Supabase-Konfiguration.
- Mit gültiger Runtime-Config erscheint in Writing der Button `Liste speichern`, sobald Items vorhanden sind.
- Household-Key wird sauber gesetzt.
- Remote-Save bricht den lokalen Flow nicht.
- Fehlerfall bei Supabase fuehrt nicht zu Datenverlust im lokalen Zustand.

---

## 6. Realtime-Zusatzchecks

Diese Checks erst ausfuehren, wenn Realtime eingebaut ist:

- Aenderung auf Geraet A erscheint auf Geraet B.
- Eigenes Save erzeugt keine doppelte UI-Aktualisierung.
- Shopping-Abschluss auf Geraet A spiegelt sich auf Geraet B korrekt.
- Offline/Reconnect fuehrt nicht zu unklaren Zwischenzustaenden.

---

## 7. Touchlog

- `Touchlog`-Button oeffnet das Panel.
- `Shift + D` toggelt das Panel ebenfalls.
- Boot zeigt einen knappen, nachvollziehbaren Start-Trace.
- `Item hinzufuegen`, `Loeschen`, `Liste leeren`, `Liste speichern` und Shopping-Aktionen erscheinen als hochwertige Eintraege.
- Realtime-Ereignisse erscheinen als eigene Sync-Eintraege.
- Wiederholte identische Ereignisse werden aggregiert statt gespammt.

---

## 8. Definition of Done

- Der lokale HESTIA-Kern besteht alle Checks aus Abschnitt 1 bis 4.
- Neue Features duerfen diese Baseline nicht verschlechtern.
- Sync und Realtime werden erst als stabil betrachtet, wenn auch Abschnitt 5 und 6 reproduzierbar gruen sind.
- Touchlog bleibt hilfreich und ruhig statt technisch laut zu werden.
