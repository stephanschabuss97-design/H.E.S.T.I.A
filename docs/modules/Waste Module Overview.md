# Waste Module Overview

Kurze Einordnung:

- Zweck: beschreibt das Entsorgungsdaten-Fundament fuer Axams.
- Rolle innerhalb von HESTIA: stellt ein stabiles lokales JSON fuer spaetere Entsorgungs-UI bereit.
- Abgrenzung: keine UI, keine Push-Reminder, kein Kalender, keine Supabase-Anbindung.

Related docs:

- [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md)
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Deployment Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Deployment%20Module%20Overview.md)
- [QA_CHECKS.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/QA_CHECKS.md)
- [HESTIA Entsorgung Datenfundament Roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Entsorgung%20Datenfundament%20Roadmap.md)
- [HESTIA Entsorgung UI Roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Entsorgung%20UI%20Roadmap.md)
- [HESTIA Entsorgung Erinnerungen Future Sketch.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/HESTIA%20Entsorgung%20Erinnerungen%20Future%20Sketch.md)

---

## 1. Zielsetzung

- HESTIA soll offizielle Axams-Entsorgungstermine als kleines lokales JSON bereitstellen.
- Die Gemeinde Axams bleibt Source of Truth.
- Feiertage, Verschiebungen und Sonderfaelle werden nicht geraten.
- Die Pipeline darf den Einkaufskern nicht schwerer machen.
- Roadmap 5A baut nur das Datenfundament; sichtbare Entsorgungs-UI folgt spaeter.

---

## 2. Produktgrenze

Dieses Modul ist erlaubt:

- offizielle Axams-Quellen laden
- iCal parsen
- Termine validieren
- deterministisches JSON erzeugen
- GitHub Action fuer seltene Aktualisierung nutzen

Dieses Modul ist nicht erlaubt:

- UI bauen
- Home, Writing oder Shopping veraendern
- Push, Reminder oder Kalenderlogik einfuehren
- Supabase, Auth, RLS oder Household-Key anfassen
- eigene Termine erfinden
- `.ics`-Rohdaten versionieren

---

## 3. Dateien

| Datei | Zweck |
|------|------|
| `scripts/update-waste-calendar.mjs` | Discovery, iCal-Parser, Validierung, JSON-Generator und CLI |
| `assets/data/waste-calendar.axams.json` | stabiles App-JSON fuer spaetere Entsorgungs-UI |
| `.github/workflows/update-axams-waste-calendar.yml` | geplanter und manueller Aktualisierungslauf |
| `scripts/fixtures/waste-calendar/.gitkeep` | reservierter Ort fuer spaetere Fixture-Dateien |

---

## 4. Offizielle Quellen

Zielgebiet:

- Gemeinde: `Axams`
- App-Gebiet: `Axams Dorf; Biomuell westlich Axamer Bach`

Collections:

| ID | Label | Gebiet | Offizielle Seite |
|---|---|---|---|
| `bio-west` | `Biomuell` | `westlich Axamer Bach` | `https://www.axams.gv.at/Biomuell_Objekte_westlich_Axamer_Bach_13` |
| `rest-axams-dorf` | `Restmuell` | `Axams Dorf` | `https://www.axams.gv.at/Restmuell_Axams_Dorf` |
| `gelber-sack-axams-dorf` | `Gelber Sack` | `Axams Dorf` | `https://www.axams.gv.at/Gelber_Sack_-_Axams_Dorf` |

Discovery-Vertrag:

- Die HTML-Seite ist der primaere Pfad.
- Der iCal-Link wird aus `CalendarService.ashx`-Ankern extrahiert.
- HTML-Entities in hrefs werden dekodiert.
- Dokumentierte Fallback-iCal-URLs sind erlaubt, wenn Seite oder Link-Extraktion fehlschlagen.
- Fallback-Nutzung bleibt Log-Ausgabe, kein JSON-Feld.

---

## 5. Parser-Vertrag

Der Parser ist ein enger iCal-Parser fuer die beobachteten Axams-Feeds, kein allgemeiner RFC-5545-Parser.

Er behandelt:

- CRLF/CR/LF-Normalisierung
- iCal-Zeilenfaltung
- `VEVENT`-Bloecke
- verschachtelte `VALARM`-Bloecke
- `DTSTART`
- `DTEND`
- `SUMMARY`
- `UID`
- `DESCRIPTION`

Regeln:

- `DTSTART` muss `VALUE=DATE` verwenden.
- `DTEND` muss `VALUE=DATE` verwenden.
- `DTEND` ist der Folgetag des Ganztagstermins, nicht ein zweiter Abholtag.
- `VALARM`-`DESCRIPTION:Reminder` darf die fachliche Terminbeschreibung nicht ueberschreiben.
- `DESCRIPTION` wird nur fuer Parser-/Testzwecke normalisiert und nicht ins App-JSON geschrieben.
- ungueltige Kalenderdaten failen hart.

---

## 6. Validierungsvertrag

Hard Fail:

- eine erwartete Collection fehlt
- unerwartete oder doppelte Source-Ergebnisse
- Feed nicht erreichbar
- Feed enthaelt kein `BEGIN:VCALENDAR`
- Feed enthaelt keine `VEVENT`s
- `UID` fehlt
- `DTEND` fehlt
- `DTEND` ist nicht exakt der Folgetag von `DTSTART`
- gleiche `UID` mit anderem Datum oder Titel
- gleiches Datum und gleicher Titel mit anderer `UID`
- keine Zukunftstermine nach Laufdatum
- letztes Zukunftsdatum unter 30 Tagen
- ungueltige Datumswerte

Warnung, aber erlaubt:

- letztes Zukunftsdatum liegt 30 bis 59 Tage nach Laufdatum

OK:

- letztes Zukunftsdatum liegt mindestens 60 Tage nach Laufdatum
- identische Dublette mit gleicher `UID`, gleichem Datum und gleichem Titel innerhalb einer Collection; sie wird einmal ausgegeben
- gleicher Kalendertag in verschiedenen Collections

---

## 7. JSON-Vertrag

Pfad:

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

## 8. GitHub Action

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
- Node 24 wird verwendet.
- Workflow fuehrt `node --check scripts/update-waste-calendar.mjs` aus.
- Workflow fuehrt `node scripts/update-waste-calendar.mjs --write-json` aus.
- Commit erfolgt nur, wenn `assets/data/waste-calendar.axams.json` ein echtes Diff hat.
- `git add` ist auf genau diese JSON-Datei begrenzt.
- Keine Secrets.
- Keine Dependency-Installation.

---

## 9. Lokale Checks

Syntax:

```powershell
node --check scripts/update-waste-calendar.mjs
```

Discovery:

```powershell
node scripts/update-waste-calendar.mjs --check-discovery
```

JSON live drucken und parsen:

```powershell
node scripts/update-waste-calendar.mjs --print-json
```

JSON schreiben:

```powershell
node scripts/update-waste-calendar.mjs --write-json
```

Diff-Hygiene:

```powershell
git diff --check -- .github/workflows/update-axams-waste-calendar.yml scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json
```

---

## 10. Bekannte Restpruefungen

Nur auf GitHub pruefbar:

- echter geplanter Schedule-Lauf
- manueller `workflow_dispatch`-Lauf
- Bot-Commit und Bot-Push
- Branch-Protection- oder Repository-Permission-Effekte

---

## 11. Definition of Done

- Ein neuer Chat versteht Datenquelle, Parser, JSON, Action und Fehlerstrategie.
- App-JSON ist stabil, klein und ohne Laufzeitrauschen.
- HESTIA-App bleibt unberuehrt, bis eine eigene UI-Roadmap das JSON bewusst nutzt.
- Roadmap 5B kann auf dem JSON aufbauen, ohne iCal oder GitHub Actions verstehen zu muessen.
