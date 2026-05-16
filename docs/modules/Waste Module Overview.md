# Waste Module Overview

Kurze Einordnung:

- Zweck: beschreibt Entsorgungsdaten und Entsorgungs-UI fuer Axams.
- Rolle innerhalb von HESTIA: zeigt die naechsten Muelltermine und den Recyclinghof-Status als ruhige Haushaltsperipherie.
- Abgrenzung: kein Amtsportal, kein Kalender, keine Push-Reminder, keine Supabase-Anbindung und keine Live-Abfrage im Browser.

Related docs:

- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Deployment Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md)
- [PWA Install Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/PWA%20Install%20Module%20Overview.md)
- [Home Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Home%20Module%20Overview.md)
- [QA_CHECKS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md)
- [HESTIA Entsorgung Datenfundament Roadmap (DONE).md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/archive/HESTIA%20Entsorgung%20Datenfundament%20Roadmap%20(DONE).md)
- [HESTIA Entsorgung UI Roadmap (DONE).md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/archive/HESTIA%20Entsorgung%20UI%20Roadmap%20(DONE).md)
- [HESTIA Entsorgung Erinnerungen Future Sketch.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Entsorgung%20Erinnerungen%20Future%20Sketch.md)

---

## 1. Zielsetzung

- HESTIA soll schnell beantworten, was als Naechstes raus muss.
- HESTIA soll zeigen, ob der Recyclinghof gerade offen ist oder wann er regulaer wieder oeffnet.
- Die Datenwahrheit fuer Muelltermine kommt aus offiziellen Axams-iCal-Quellen, aber der Browser nutzt nur ein lokales JSON.
- Die UI bleibt leise und sekundar zum Einkaufsfluss.
- Feiertage, Verschiebungen und Sonderfaelle werden nicht geraten.

---

## 2. Produktgrenze

Dieses Modul ist erlaubt:

- offizielle Axams-Quellen ueber das Update-Script laden
- iCal parsen und validieren
- deterministisches JSON erzeugen
- GitHub Action fuer seltene Aktualisierung nutzen
- lokales JSON im Browser laden
- Home-Ticker fuer den naechsten relevanten Termin anzeigen
- Muelluebersicht als eigenen Modus oeffnen
- Recyclinghof-Status aus statischen Wochenfenstern berechnen
- ruhige Fallbacks zeigen
- genau zwei Waste-Touchlog-Ereignisse schreiben: Laden erfolgreich oder Laden fehlgeschlagen

Dieses Modul ist nicht erlaubt:

- Push, Reminder oder Kalenderlogik einfuehren
- Supabase, Auth, RLS oder Household-Key anfassen
- Browser-Live-Fetch auf Axams, iCal oder Gemeinde-Seiten
- eigene Termine erfinden
- Sonder-Schliessungen des Recyclinghofs raten
- Home zu einem allgemeinen Dashboard umbauen
- `.ics`-Rohdaten versionieren

---

## 3. Dateien

| Datei | Zweck |
|------|------|
| `scripts/update-waste-calendar.mjs` | Discovery, iCal-Parser, Validierung, JSON-Generator und CLI |
| `assets/data/waste-calendar.axams.json` | stabiles App-JSON fuer Browser und PWA-Cache |
| `.github/workflows/update-axams-waste-calendar.yml` | geplanter und manueller Aktualisierungslauf |
| `app/modules/waste.js` | Browser-Modul fuer JSON-Laden, Datumslogik, Ticker, Recyclinghof und Fallbacks |
| `app/styles/waste.css` | Waste-spezifische Home-Kachel- und Muelluebersicht-Styles |
| `index.html` | Home-Waste-Kachel und `screen-waste` |
| `app/main.js` | startet `initWaste(document, touchlog)` |
| `app/app.css` | importiert `app/styles/waste.css` |
| `sw.js` | nimmt Waste-Assets und JSON in den App-Shell-Cache auf |
| `scripts/fixtures/waste-calendar/.gitkeep` | reservierter Ort fuer spaetere Fixture-Dateien |

---

## 4. Offizielle Quellen und JSON-Vertrag

Zielgebiet:

- Gemeinde: `Axams`
- App-Gebiet: `Axams Dorf; Biomuell westlich Axamer Bach`

Collections:

| ID | Label | Gebiet | Offizielle Seite |
|---|---|---|---|
| `bio-west` | `Biomuell` | `westlich Axamer Bach` | `https://www.axams.gv.at/Biomuell_Objekte_westlich_Axamer_Bach_13` |
| `rest-axams-dorf` | `Restmuell` | `Axams Dorf` | `https://www.axams.gv.at/Restmuell_Axams_Dorf` |
| `gelber-sack-axams-dorf` | `Gelber Sack` | `Axams Dorf` | `https://www.axams.gv.at/Gelber_Sack_-_Axams_Dorf` |

JSON-Pfad:

```text
assets/data/waste-calendar.axams.json
```

Root:

```json
{
  "schemaVersion": 1,
  "municipality": "Axams",
  "area": "Axams Dorf; Biomuell westlich Axamer Bach",
  "source": {
    "type": "axams-ical",
    "pages": []
  },
  "collections": []
}
```

`source.pages[]`:

- `collectionId`
- `pageUrl`
- `icalUrl`

`collections[]`:

- `id`
- `label`
- `area`
- `hint`
- `dates`

`dates[]`:

- `date`
- `title`
- `sourceUid`

Bewusst nicht enthalten:

- `generatedAt`
- `fetchedAt`
- `validUntil`
- `warnings`
- `diagnostics`
- `description`
- `endDate`
- iCal-Rohdaten

---

## 5. Datenpipeline

Discovery-Vertrag:

- Die HTML-Seite ist der primaere Pfad.
- Der iCal-Link wird aus `CalendarService.ashx`-Ankern extrahiert.
- HTML-Entities in hrefs werden dekodiert.
- Dokumentierte Fallback-iCal-URLs sind erlaubt, wenn Seite oder Link-Extraktion fehlschlagen.
- Fallback-Nutzung bleibt Log-Ausgabe, kein JSON-Feld.

Parser-Vertrag:

- enger iCal-Parser fuer die beobachteten Axams-Feeds, kein allgemeiner RFC-5545-Parser
- CRLF/CR/LF-Normalisierung
- iCal-Zeilenfaltung
- `VEVENT`-Bloecke
- verschachtelte `VALARM`-Bloecke
- `DTSTART`, `DTEND`, `SUMMARY`, `UID`, `DESCRIPTION`
- `DTSTART` und `DTEND` muessen `VALUE=DATE` verwenden
- `DTEND` ist der Folgetag des Ganztagstermins, nicht ein zweiter Abholtag
- `VALARM`-`DESCRIPTION:Reminder` darf die fachliche Terminbeschreibung nicht ueberschreiben
- ungueltige Kalenderdaten failen hart

Validierungsvertrag:

- erwartete Collection fehlt: Hard Fail
- unerwartete oder doppelte Source-Ergebnisse: Hard Fail
- Feed nicht erreichbar oder kein `BEGIN:VCALENDAR`: Hard Fail
- Feed ohne `VEVENT`: Hard Fail
- fehlende `UID` oder `DTEND`: Hard Fail
- `DTEND` nicht exakt Folgetag von `DTSTART`: Hard Fail
- widerspruechliche Dubletten: Hard Fail
- keine Zukunftstermine: Hard Fail
- letztes Zukunftsdatum unter 30 Tagen: Hard Fail
- letztes Zukunftsdatum 30 bis 59 Tage: Warnung, aber erlaubt
- letztes Zukunftsdatum mindestens 60 Tage: OK

---

## 6. Browser-UI-Vertrag

Home:

- Home zeigt nach Roadmap 6A die Kacheln:
  - `Einkauf`
  - `Amazon`
  - `Muell`
- Die Muell-Kachel ist Haushaltsperipherie, nicht Einkaufs- oder Amazon-Kernmodus.
- Die Muell-Kachel nutzt dieselbe Grundhoehe wie die anderen Home-Karten, bleibt aber fachlich leise.
- Die Kachel enthaelt den dynamischen Ticker `home-waste-ticker`.
- Der Ticker ersetzt statische Erklaercopy.
- Klick auf die Kachel navigiert zu `screen-waste`.

Muelluebersicht:

- eigener Screen mit `data-screen="waste"`.
- Titel: `Muelluebersicht`.
- Bereiche:
  - naechster relevanter Termin
  - Abholtermine je Fraktion
  - Recyclinghof
  - Rueckweg zur Startseite
- Die UI zeigt keine Wohngebietsdetails wie `westlich Axamer Bach` oder `Axams Dorf`, weil der Haushalt seinen Standort kennt.
- Fraktionskarten zeigen Label, naechstes Datum und kurzen Hinweis.
- Bei leerer Collection-Liste steht `Keine Abholtermine im lokalen Kalender.`

Datumslogik:

- ISO-Datum `YYYY-MM-DD` wird lokal geparst, nicht per UTC-String.
- Home-Ticker nutzt kurze relative Form:
  - `Heute ...`
  - `Morgen ...`
  - `In X Tagen ...` fuer 2 bis 6 Tage
  - ab 7 Tagen kurzes Absolutdatum
- Fraktionskarten nutzen `formatDateDetail`:
  - 0 bis 6 Tage: volles Datum plus relative Naehe, z. B. `Dienstag, 19.05.2026 · In 4 Tagen`
  - ab 7 Tagen: nur volles Datum, z. B. `Donnerstag, 28.05.2026`

Fallbacks:

- fehlendes oder fehlerhaftes JSON:
  - Home-Ticker: `Termine gerade nicht verfuegbar`
  - Summary/List: ruhige Fallback-Copy
  - Touchlog: `waste-calendar-load-failed`
- leeres oder vergangenes JSON:
  - `Keine kommenden Termine`
  - keine geratenen Termine
- knappes JSON:
  - `Daten reichen nur bis ...`

---

## 7. Recyclinghof-Vertrag

Recyclinghof V1 nutzt statische Wochenfenster:

- Montag: `13:00-18:00`
- Mittwoch: `08:00-12:00`, `13:00-17:00`
- Samstag: `07:00-12:00`

Statuslogik:

- innerhalb eines Fensters: `Recyclinghof offen bis HH:MM`
- ausserhalb eines Fensters: `Recyclinghof geschlossen`
- wenn moeglich, naechste regulaere Oeffnung anzeigen
- Mittwoch 12:00-13:00 ist geschlossen
- exakter Fensterschluss zaehlt als geschlossen

Bewusste Grenze:

- keine Sonder-Schliessungen
- keine Feiertagslogik
- keine Live-Abfrage
- keine Adresse in der Familien-UI
- kein dauerhafter Sonder-Schliessungen-Hinweis in der UI

---

## 8. PWA-, Cache- und Touchlog-Vertrag

PWA:

- `app/styles/waste.css`, `app/modules/waste.js` und `assets/data/waste-calendar.axams.json` stehen im App-Shell-Cache.
- Cache-Version wurde fuer die UI-Einfuehrung erhoeht.
- Offline nach Erstladung soll den Waste-Screen mit gecachtem JSON zeigen, soweit der Browser den Service Worker bereits aktiviert hat.
- Kein Runtime-Live-Fetch auf Gemeindequellen.

Touchlog:

- Erfolg beim JSON-Laden:
  - `[waste] calendar loaded collections=...`
  - `eventId: waste-calendar-loaded`
- Fehler beim JSON-Laden:
  - `[waste] calendar load failed ...`
  - `eventId: waste-calendar-load-failed`
  - `severity: warn`
- Kein Logging pro Collection.
- Kein Logging pro Datum.
- Kein Recyclinghof-Minutenstatus.
- Keine neue Diagnose-UI und kein neuer Dev-Schalter fuer Waste V1.

---

## 9. GitHub Action

Workflow:

```text
.github/workflows/update-axams-waste-calendar.yml
```

Trigger:

- `workflow_dispatch`
- `17 3 15,30 1 *`
- `17 3 1 4,7,10 *`

Vertrag:

- GitHub Actions Cron laeuft in UTC.
- `contents: write` ist gesetzt.
- `concurrency` ist gesetzt.
- `actions/checkout@v6` und `actions/setup-node@v6` laufen auf der Node-24-Action-Runtime.
- Node 24 wird verwendet.
- Workflow fuehrt `node --check scripts/update-waste-calendar.mjs` aus.
- Workflow fuehrt `node scripts/update-waste-calendar.mjs --write-json` aus.
- Commit erfolgt nur, wenn `assets/data/waste-calendar.axams.json` ein echtes Diff hat.
- `git add` ist auf genau diese JSON-Datei begrenzt.
- Keine Secrets.
- Keine Dependency-Installation.

---

## 10. Lokale Checks

Datenpipeline:

```powershell
node --check scripts/update-waste-calendar.mjs
node scripts/update-waste-calendar.mjs --check-discovery
node scripts/update-waste-calendar.mjs --print-json
node scripts/update-waste-calendar.mjs --write-json
```

UI/PWA:

```powershell
node --check app/modules/waste.js
node --check app/main.js
node --check app/core/router.js
node --check sw.js
git diff --check -- index.html app/app.css app/core/router.js app/main.js app/modules/waste.js app/styles/waste.css sw.js assets/data/waste-calendar.axams.json scripts/update-waste-calendar.mjs
```

Manuelle Smokes:

- Home zeigt `Einkauf`, `Amazon`, `Muell`.
- `Muell` oeffnet die Muelluebersicht.
- Home-Ticker zeigt den naechsten Termin.
- Abholtermine zeigen Biomuell, Restmuell und Gelber Sack.
- Recyclinghof-Status ist plausibel.
- Rueckweg zur Startseite funktioniert.
- Offline nach Erstladung bleibt plausibel.

---

## 11. Bekannte Restpruefungen

Nur extern oder manuell vollstaendig pruefbar:

- echter geplanter GitHub-Actions-Schedule-Lauf
- manueller `workflow_dispatch`-Lauf
- Bot-Commit und Bot-Push
- Branch-Protection- oder Repository-Permission-Effekte
- echte Desktop-/Mobile-Darstellung im Browser
- echte installierte-PWA-Aktualisierung nach Deploy
- Service-Worker-Updateverhalten auf Zielgeraeten

---

## 12. Definition of Done

- Ein neuer Chat versteht Datenquelle, Parser, JSON, Action, UI, Recyclinghof und Fehlerstrategie.
- App-JSON ist stabil, klein und ohne Laufzeitrauschen.
- Browser nutzt nur das lokale JSON.
- Muelluebersicht hilft im Alltag, ohne Home oder Einkaufskern zu ueberladen.
- Fallbacks sind ruhig und ehrlich.
- Keine Push-, Reminder-, Kalender- oder Supabase-Logik wurde eingefuehrt.
