# HESTIA Roadmap 5A - Entsorgung Datenfundament

## Ziel (klar und pruefbar)

HESTIA soll ein verlaessliches lokales Datenfundament fuer Axams-Entsorgungstermine bekommen, ohne Feiertagslogik selbst zu erraten und ohne die Gemeinde-Quellen live im Browser abzufragen.

Pruefbare Zieldefinition:

- Es gibt ein stabiles JSON unter `assets/data/waste-calendar.axams.json`.
- Das JSON enthaelt fuer Stephans Haushalt die relevanten Terminarten:
  - Biomuell westlich Axamer Bach
  - Restmuell Axams Dorf
  - Gelber Sack Axams Dorf
- Eine GitHub Action kann die offiziellen Axams-iCal-Quellen laden, parsen und das JSON deterministisch aktualisieren.
- Die Action committet nur, wenn sich das JSON inhaltlich wirklich aendert.
- Die `.ics`-Dateien werden nicht dauerhaft im Repo gespeichert.
- Fehlerhafte, leere oder unplausible Feeds werden sichtbar gemeldet, waehrend die App weiter mit dem letzten gueltigen JSON arbeiten kann.
- Noch keine UI fuer den Entsorgungsbereich wird gebaut.

## Problemzusammenfassung

Recyclinghof und Muelltage sind ein echter Haushaltsnutzen, aber die Terminlogik ist nicht trivial. Restmuell folgt nicht einfach einem festen Zwei-Wochen-Rhythmus, weil Feiertage je nach Gemeindeplanung auf vorherige oder naechste Werktage verschoben werden koennen. Biomuell westlich Axamer Bach folgt ebenfalls einem eigenen Gebietsschnitt und verschiebt sich bei Feiertagen. HESTIA sollte diese Logik deshalb nicht selbst nachbauen, sondern die offiziellen Axams-Termine als Wahrheit behandeln.

Die Gemeinde Axams bietet fuer die relevanten Muellarten iCal-Downloads an. Diese Feeds enthalten aktuell die kommenden Termine bis Jahresende. Das erlaubt einen ruhigen technischen Schnitt: GitHub Action holt selten die iCal-Daten, ein Parser erzeugt ein kleines App-JSON, HESTIA nutzt nur dieses lokale JSON.

## Scope

- Datenquellen:
  - Axams iCal fuer Biomuell westlich Axamer Bach
  - Axams iCal fuer Restmuell Axams Dorf
  - Axams iCal fuer Gelber Sack Axams Dorf
- Tooling:
  - Parser-Script fuer iCal zu JSON
  - deterministische Sortierung und Ausgabe
  - Plausibilitaetschecks
  - GitHub Action mit seltenem Zeitplan und manuellem Start
- Datenvertrag:
  - lokales JSON fuer die App
  - stabile Felder fuer Kategorie, Gebiet, Datum, Titel, Quelle und Hinweis
  - keine laufzeitabhaengigen Zeitstempel, die jeden Action-Lauf veraendern
- Tests:
  - Parser-Tests mit Fixture-iCal
  - Strukturcheck fuer JSON
  - Workflow-/YAML-Check, soweit lokal sinnvoll
- Doku:
  - Datenquellen dokumentieren
  - JSON-Vertrag dokumentieren
  - Wartung und Fehlerstrategie dokumentieren
  - `Waste Module Overview.md` mit Datenfundament-Kapiteln initial anlegen

## Not in Scope

- Keine Entsorgungs-UI.
- Keine Home-Kachel.
- Keine Recyclinghof-Statusanzeige.
- Keine Push-, Reminder- oder Notification-Logik.
- Keine Kalenderintegration in Android, Google Calendar oder iOS.
- Keine eigene Feiertagsberechnung als Source of Truth.
- Keine Live-Abfrage der Axams-Feeds beim App-Start.
- Keine Speicherung der `.ics`-Rohdateien im Repo.
- Keine Supabase-, SQL-, RLS-, Auth- oder Household-Key-Aenderung.
- Keine Unterstuetzung mehrerer Gemeinden.
- Keine Konfigurationsoberflaeche fuer Haushalte oder Gebiete.
- Keine Veraenderung am Einkaufslisten-Datenvertrag `name`, `quantity`, `unit`, `inCart`.

## Relevante Referenzen (Code)

- `.github/workflows/`
- `scripts/`, falls im Repo bereits Script-Konventionen entstehen oder angelegt werden muessen
- `assets/data/`, neu fuer das erzeugte JSON
- `sw.js`, nur spaeter relevant, falls Roadmap B das JSON in den App-Shell-Cache aufnehmen muss
- `package.json`, nur falls bewusst entschieden wird, ob Tests ohne neue Dependency moeglich bleiben

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/QA_CHECKS.md`
- `docs/modules/Waste Module Overview.md`, neu in S6 verpflichtend
- `docs/modules/Deployment Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/archive/HESTIA Kassa Karussell Roadmap (DONE).md`

Regel:

- Erst README, PRODUCT, Future Roadmaps und DEV_ENVIRONMENT lesen.
- Dann Deployment-/PWA-Doku lesen, weil GitHub Action und spaeteres Offline-JSON beruehrt werden.
- Dann die Axams-Quellen pruefen.
- Dann erst Script- und Workflow-Dateien anlegen oder aendern.

## Axams-Quellen

Fachliche Zielquellen:

| Art | Gebiet | Seite |
| --- | --- | --- |
| Biomuell | westlich Axamer Bach | `https://www.axams.gv.at/Biomuell_Objekte_westlich_Axamer_Bach_13` |
| Restmuell | Axams Dorf | `https://www.axams.gv.at/Restmuell_Axams_Dorf` |
| Gelber Sack | Axams Dorf | `https://www.axams.gv.at/Gelber_Sack_-_Axams_Dorf` |

Aktuell gefundene iCal-Endpunkte:

- Biomuell westlich Axamer Bach:
  - `https://www.axams.gv.at/system/web/CalendarService.ashx?aqn=UmlTS29tbXVuYWwuT2JqZWN0cy5LYWxlbmRlciwgUklTQ29tcG9uZW50cywgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGw%3D&do=MjI1ODQ2Nzcz&gnr=297&sprache=1`
- Restmuell Axams Dorf:
  - `https://www.axams.gv.at/system/web/CalendarService.ashx?aqn=UmlTS29tbXVuYWwuT2JqZWN0cy5LYWxlbmRlciwgUklTQ29tcG9uZW50cywgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGw%3D&do=MjI1ODQ2ODUw&gnr=297&sprache=1`
- Gelber Sack Axams Dorf:
  - `https://www.axams.gv.at/system/web/CalendarService.ashx?aqn=UmlTS29tbXVuYWwuT2JqZWN0cy5LYWxlbmRlciwgUklTQ29tcG9uZW50cywgVmVyc2lvbj0xLjAuMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPW51bGw%3D&do=MjI1ODQ2ODU2&gnr=297&sprache=1`

Parser-Regel:

- Wenn moeglich, die iCal-Links aus den Seiten extrahieren statt nur hartcodierte `CalendarService.ashx`-URLs zu verwenden.
- Wenn die Extraktion bricht, muss der Fehler klar sichtbar sein.
- Hartcodierte Endpunkte duerfen als dokumentierter Fallback dienen, aber nicht still die Seitenpruefung ersetzen.

## Ziel-JSON-Vertrag

Finale S2-Datei:

`assets/data/waste-calendar.axams.json`

Finale S2-Struktur:

```json
{
  "schemaVersion": 1,
  "municipality": "Axams",
  "area": "Axams Dorf; Biomuell westlich Axamer Bach",
  "source": {
    "type": "axams-ical",
    "pages": [
      {
        "collectionId": "bio-west",
        "pageUrl": "https://www.axams.gv.at/Biomuell_Objekte_westlich_Axamer_Bach_13",
        "icalUrl": "https://www.axams.gv.at/system/web/CalendarService.ashx?..."
      }
    ]
  },
  "collections": [
    {
      "id": "bio-west",
      "label": "Biomuell",
      "area": "westlich Axamer Bach",
      "hint": "Ab 7:00 bereitstellen",
      "dates": [
        {
          "date": "2026-05-19",
          "title": "Biomuell (Objekte westlich Axamer Bach)",
          "sourceUid": "..."
        }
      ]
    }
  ]
}
```

Determinismus-Regeln:

- Termine nach Datum aufsteigend sortieren.
- Collections in fixer Reihenfolge schreiben:
  - `bio-west`
  - `rest-axams-dorf`
  - `gelber-sack-axams-dorf`
- JSON mit stabiler Einrueckung schreiben.
- Keine Laufzeitfelder wie `generatedAt` verwenden, die jeden Lauf veraendern.
- Keine fluechtigen Diagnose-, Warnungs- oder Laufzeitfelder ins App-JSON schreiben.
- `DESCRIPTION` aus iCal wird in Roadmap 5A nicht als App-Feld ausgegeben. Es dient nur Parser-/Fixture-/Plausibilitaetschecks, solange Roadmap 5B keinen stabilen UI-Bedarf dafuer festlegt.
- Die Collection-Hints bleiben statische, kurze App-Hinweise. Fuer alle drei Ziel-Collections gilt in V1 `Ab 7:00 bereitstellen`.
- `source.pages[].icalUrl` enthaelt den effektiv verwendeten iCal-Endpunkt. Wenn ein dokumentierter Fallback verwendet werden muss, muss das im Action-Log sichtbar sein; das JSON soll dadurch nicht mit wechselnden Warnfeldern verrauscht werden.

## GitHub Action Vertrag

Geplanter Name:

`Update Axams Waste Calendar`

Geplanter Zeitplan:

- 1. Jaenner
- 1. Jaenner als Fallback
- 1. April
- 1. Juli
- 1. Oktober
- zusaetzlich manuell startbar per `workflow_dispatch`

Hinweis:

- GitHub Cron laeuft in UTC.
- Finale S2-Cron-Zeilen:
  - `17 3 15,30 1 *`
  - `17 3 1 4,7,10 *`
- Die Action soll nur committen, wenn `assets/data/waste-calendar.axams.json` nach dem Parser-Lauf ein echtes Diff hat.
- Die Action braucht keine Secrets.
- Die Action darf bei Fehlern keinen leeren oder teilweisen Datenstand committen.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug und wird nicht zum Gemeindeportal.
- Die Gemeinde Axams bleibt Source of Truth fuer Termine.
- HESTIA erfindet keine Feiertagsverschiebungen.
- Das Feature muss offline-freundlich vorbereitet werden.
- Fehler muessen sichtbar sein, duerfen aber den letzten gueltigen App-Datenstand nicht zerstoeren.
- Wenige Action-Laeufe pro Jahr sind ausreichend; keine taegliche Polling-Gewohnheit.
- Die Datenpipeline darf keine UI-Entscheidungen erzwingen.
- Roadmap A ist bewusst nur das Datenfundament fuer Roadmap B.

## Architektur-Constraints

- HESTIA bleibt browser-first, statisch und ohne Build-Step fuer die App.
- Tooling darf ausserhalb der App laufen, solange es repo-nah, dokumentiert und klein bleibt.
- Parser darf iCal selbst klein parsen oder eine bereits vorhandene, bewusst gewaehlte Tooling-Abhaengigkeit nutzen; neue Dependencies muessen in S2 begruendet werden.
- Browser-Code darf nicht direkt auf Gemeinde-iCal angewiesen sein.
- Das JSON ist der einzige App-Vertrag aus Roadmap A.
- Keine Supabase-Beruehrung.
- Keine Service-Worker-Aenderung in Roadmap A, ausser ein bewusstes Datenfile wird fuer spaetere Roadmap B vorbereitet und reviewt.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus.
- Lesen der Axams-Seiten und iCal-Feeds.
- Aendern von:
  - `.github/workflows/*`, nur fuer den Waste-Calendar-Workflow
  - `scripts/*`, nur fuer iCal-Parsing und JSON-Erzeugung
  - `assets/data/waste-calendar.axams.json`
  - Tests/Fixtures fuer den Parser
  - `docs/QA_CHECKS.md`
  - `docs/modules/Waste Module Overview.md`
  - `docs/modules/Deployment Module Overview.md`
  - `docs/future roadmaps.md` beim Abschluss
  - diese Roadmap
- Lokale Checks:
  - `node --check`
  - Parser-Testlauf mit Fixtures
  - Live-Feed-Testlauf ohne Commit
  - `git diff --check`
  - YAML-/Workflow-Strukturcheck, soweit lokal verfuegbar

Forbidden:

- UI bauen.
- Push oder Reminder bauen.
- `.ics`-Dateien dauerhaft versionieren.
- Gemeinde-Feeds beim App-Start live aus dem Browser laden.
- Supabase, SQL, RLS, Auth oder Household-Key aendern.
- Shopping-, Writing- oder Home-Flow veraendern.
- Allgemeine Kalender-/Organizer-Architektur einfuehren.
- Commit-Flut durch wechselnde Zeitstempel erzeugen.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Detektivarbeit, Datenquellenpruefung, Vertragsklaerung und Risikoanalyse.
- S4 baut Parser, JSON und GitHub Action in kleinen Substeps.
- S5 prueft Parser, Workflow, JSON-Vertrag und Fehlerfaelle.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnis.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 13.05.2026

Review-Frage:

- Darf HESTIA fuer Entsorgungstermine eine GitHub-Action-Datenpipeline einfuehren, ohne den ruhigen Produktvertrag zu verletzen?

Entscheidung:

- Ja, wenn die Pipeline nur offizielle Axams-Termine in ein lokales JSON uebersetzt und noch keine UI-, Push- oder Kalenderlogik einfuehrt.

Findings:

- CR-A-F1: "Muelltage" kann schnell zu Reminder-, Kalender- oder Familien-Organizer-Logik werden.
- CR-A-F2: Eigene Feiertagsberechnung waere riskant und fachlich schlechter als die offiziellen Termine.
- CR-A-F3: Direkte iCal-Abfrage im Browser waere fuer PWA, Offline und CORS zu fragil.
- CR-A-F4: Ein Action-Lauf mit `generatedAt` im JSON wuerde unnoetige Commits erzeugen.
- CR-A-F5: Hartcodierte iCal-Endpunkte koennen brechen, wenn die Gemeinde Seiten oder Parameter aendert.
- CR-A-F6: Ein leerer Feed darf nicht still ein leeres JSON committen.
- CR-A-F7: Roadmap A darf nicht gleichzeitig die Entsorgungs-UI bauen.

Korrekturen:

- Not in Scope grenzt UI, Push, Kalender, Supabase und Live-Browser-Fetch hart aus.
- Der Zielvertrag nennt die Gemeinde-iCal-Feeds als Source of Truth.
- Der JSON-Vertrag verbietet laufzeitabhaengige Zeitstempel.
- Parser-Regel verlangt Seitenextraktion mit dokumentiertem Fallback statt nur stiller Endpunkt-Hardcodierung.
- S5 verlangt Plausibilitaetschecks fuer leere, kurze und unvollstaendige Feeds.
- Roadmap B wird separat fuer UI gefuehrt.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System- und Datenquellen-Detektivarbeit | DONE | HESTIA-Kontext, Deployment/PWA/QA, Axams-Seiten, iCal-Feeds und Repo-Tooling geprueft; S1-Findings und Korrekturen dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Source-of-Truth-, JSON-, Commit-, Action-, Discovery-, Fehler- und Dependency-Vertrag finalisiert. |
| S3 | Bruchrisiko-, Daten- und Umsetzungsreview | DONE | Feed-Bruchrisiken, Jahreswechsel, UTC/Cron, Commit-/Branch-Risiken, S4-Substeps und S5-Teststrategie finalisiert. |
| S4 | Umsetzung | DONE | S4.1-S4.9 abgeschlossen: Struktur, Discovery, Parser, JSON, Plausibilitaet, GitHub Action, lokale Checks, Abschlussreview und Commit-Empfehlung. |
| S5 | Tests, Code Review und Contract Review | DONE | Alle lokal moeglichen Parser-, Fixture-, Live-Feed-, JSON-, Determinismus-, Fehlerfall-, Workflow- und Contract-Smokes ausgefuehrt; GitHub-Schedule und Bot-Commit bleiben als nicht lokal pruefbar markiert. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | Waste Module Overview, Deployment-Doku, QA, Future Roadmaps, README-Link, finaler Contract Review, Abschluss-Abnahme und Archiv-Entscheidung erledigt. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System- und Datenquellen-Detektivarbeit

Ziel:

- Bestehende HESTIA-Grenzen, Deployment-Kontext und Axams-Datenquellen verstehen.
- Noch keinen Parser und keine Action bauen.

Substeps:

- S1.1 README, PRODUCT, Future Roadmaps und DEV_ENVIRONMENT lesen.
- S1.2 Deployment-, PWA- und QA-Dokus lesen.
- S1.3 Axams-Seiten fuer Biomuell westlich, Restmuell und Gelber Sack lesen.
- S1.4 iCal-Links aus den Seiten extrahieren und dokumentieren.
- S1.5 Beispiel-iCal laden und Felder pruefen:
  - `DTSTART`
  - `DTEND`
  - `SUMMARY`
  - `DESCRIPTION`
  - `UID`
- S1.6 Aktuellen Zeitraum und Anzahl Termine je Feed dokumentieren.
- S1.7 Bestehende Script-/Workflow-Konventionen im Repo pruefen.
- S1.8 Erste Findings, offene Fragen und Risiken dokumentieren.
- S1.9 S1 Contract Review.
- S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Datenquellenkarte.
- Relevante Dateien.
- Feldkarte fuer iCal zu JSON.
- Erste S2/S3-Risiken.

Exit-Kriterium:

- Es ist klar, welche Quellen gelesen werden, welche Felder gebraucht werden und welche Repo-Schichten betroffen sind.

### S1 Ergebnisprotokoll 14.05.2026

#### S1.1 README, PRODUCT, Future Roadmaps und DEV_ENVIRONMENT lesen

Umsetzung/Review:

- README und `PRODUCT.md` wurden als Produktvertrag bestaetigt:
  - HESTIA bleibt ein ruhiges Haushaltswerkzeug.
  - `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
  - Entsorgung ist Haushaltsperipherie und darf den Einkaufskern nicht ueberholen.
  - Der Einkaufslisten-Datenvertrag `name`, `quantity`, `unit`, `inCart` bleibt unberuehrt.
- `docs/future roadmaps.md` ordnet Roadmap 5 als naechste sinnvolle Haushaltsperipherie ein:
  - Roadmap 5A Datenfundament zuerst.
  - Roadmap 5B UI erst danach.
  - Roadmap 5C Erinnerungen nur als Future Sketch.
- `docs/DEV_ENVIRONMENT.md` bestaetigt:
  - HESTIA hat keinen Build-Step.
  - Node wird fuer JS-Syntaxchecks genutzt.
  - Python dient als lokaler Static Server.
  - Playwright ist globales Smoke-Werkzeug, keine Repo-Dependency.
  - `.env.supabase.local` bleibt lokal; keine Secret-Werte in Doku, Logs, Commits oder Antworten.

Contract Review:

- Roadmap 5A bleibt in S1 innerhalb des Produktvertrags, solange sie nur Datenquellen, JSON-Vertrag, Parser-/Action-Schnitt und Fehlerstrategie klaert.
- Keine S1-Erkenntnis rechtfertigt UI, Push, Reminder, Supabase, Auth oder Einkaufslisten-State-Aenderungen.

#### S1.2 Deployment-, PWA- und QA-Dokus lesen

Umsetzung/Review:

- `docs/modules/Deployment Module Overview.md` bestaetigt:
  - HESTIA laeuft als statische GitHub-Pages-PWA unter einem Repo-Unterpfad.
  - Deployment soll leicht bleiben.
  - Supabase ist externer Dienst, nicht Teil des statischen Deployments.
  - Service-Worker-Caches muessen bei Shell-Aenderungen bewusst versioniert werden.
- `docs/modules/PWA Install Module Overview.md` bestaetigt:
  - Neue ES-Module muessen bei App-Shell-Relevanz in den Service-Worker-Cache.
  - Externe Links bleiben normale Cross-Origin-Navigation.
  - PWA-/Service-Worker-Eingriffe sind nur bei echtem Cache-/Shell-Bedarf sinnvoll.
- `docs/QA_CHECKS.md` bestaetigt:
  - bestehende Kern-Smokes fuer Home, Writing, Shopping, PWA, Sync, Diagnostics und Kassa-Karussell.
  - Noch keine Waste-Datenpipeline-Smokes vorhanden; diese gehoeren nach S6 in QA.

Contract Review:

- Roadmap 5A sollte `sw.js` nicht aendern, solange das JSON nur vorbereitet und noch nicht von der App gelesen wird.
- Die GitHub Action ist Deployment-nah, aber kein App-Hosting-Umbau.
- QA-Erweiterungen gehoeren erst nach gebauter Pipeline in S6, nicht in S1.

#### S1.3 Axams-Seiten lesen

Umsetzung/Review:

- Offizielle Axams-Seiten wurden am 14.05.2026 geprueft:
  - `https://www.axams.gv.at/Biomuell_Objekte_westlich_Axamer_Bach_13`
  - `https://www.axams.gv.at/Restmuell_Axams_Dorf`
  - `https://www.axams.gv.at/Gelber_Sack_-_Axams_Dorf`
- Fachliche Seitenbefunde:
  - Biomuell westlich Axamer Bach: Abfuhr ab 7:00, grundsaetzlich Dienstag, Feiertagsverschiebung um einen Werktag.
  - Restmuell Axams Dorf: Abfuhr ab 7:00, alle zwei Wochen Donnerstag, Feiertagsverschiebung auf vorherigen oder naechsten Werktag.
  - Gelber Sack Axams Dorf: Abfuhr ab 7:00, Dienstag alle vier Wochen, Feiertagsverschiebung auf den naechstfolgenden Werktag.
- Sichtbare Seitentermine:

| Quelle | Sichtbarer Zeitraum auf Seite | Anzahl sichtbarer Termine |
| --- | --- | --- |
| Biomuell westlich Axamer Bach | 2026-05-19 bis 2026-12-29 | 33 |
| Restmuell Axams Dorf | 2026-05-13 bis 2026-12-23 | 17 |
| Gelber Sack Axams Dorf | 2026-06-02 bis 2026-12-15 | 8 |

Contract Review:

- Die Seiten sind fachlich Source of Truth und Discovery-Basis.
- HESTIA darf die beschriebenen Feiertagsregeln nicht selbst nachbauen; der Feed bzw. die offiziellen Termine bleiben Wahrheit.

#### S1.4 iCal-Links aus den Seiten extrahieren

Umsetzung/Review:

- Alle drei Seiten enthalten einen sichtbaren Link `Termine als iCal-Datei downloaden`.
- Die Links zeigen auf `CalendarService.ashx` mit Parametern `aqn`, `do`, `gnr=297` und `sprache=1`.
- Die HTML-Hrefs enthalten `&amp;` und muessen fuer den echten Fetch HTML-dekodiert werden.
- Nach HTML-Decoding entsprechen die extrahierten Links den bereits in dieser Roadmap dokumentierten iCal-Endpunkten.

Contract Review:

- Seitenextraktion ist technisch moeglich und soll in S4 der primaere Pfad werden.
- Hartcodierte Endpunkte bleiben sinnvoll als dokumentierter Fallback, duerfen aber die Seitenpruefung nicht still ersetzen.

#### S1.5 Beispiel-iCal laden und Felder pruefen

Umsetzung/Review:

- Alle drei iCal-Feeds wurden live geladen; HTTP-Status jeweils `200`.
- Relevante VEVENT-Felder:
  - `DTSTART;VALUE=DATE`
  - `DTEND;VALUE=DATE`
  - `UID`
  - `DESCRIPTION`
  - `SUMMARY`
- Weitere beobachtete Felder bzw. Bloecke:
  - `DTSTAMP`
  - `CATEGORIES`
  - `CLASS`
  - `LOCATION`
  - `PRIORITY`
  - `SEQUENCE`
  - `TRANSP`
  - eingebetteter `VALARM`-Block mit `ACTION`, `TRIGGER` und eigener `DESCRIPTION:Reminder`
- Beispielhafte Feldkarte fuer JSON:

| iCal-Feld | App-/JSON-Bedeutung | S2/S4-Notiz |
| --- | --- | --- |
| `DTSTART;VALUE=DATE` | Abholtag als ISO-Datum | Muss Quelle fuer `date` werden. |
| `DTEND;VALUE=DATE` | Folgetag bei Ganztagstermin | Fuer Roadmap 5A wahrscheinlich Diagnose/Validierung, nicht sichtbarer Vertrag. |
| `SUMMARY` | offizieller Terminname | Quelle fuer `title`. |
| `DESCRIPTION` | offizieller Hinweistext | Enthaelt HTML-Entities wie `&nbsp;`; Quelle fuer optionalen Hinweis/Diagnose, aber nicht ungefiltert in UI. |
| `UID` | stabiler Quell-Identifier | Quelle fuer `sourceUid`. |

Contract Review:

- Parser muss Zeilenfaltung und verschachtelte `VALARM`-Bloecke sauber behandeln.
- `DESCRIPTION:Reminder` aus `VALARM` darf nicht mit der fachlichen VEVENT-Description verwechselt werden.
- HTML-Entities in `DESCRIPTION` muessen decodiert oder bewusst normalisiert werden.

#### S1.6 Aktuellen Zeitraum und Anzahl Termine je Feed dokumentieren

Umsetzung/Review:

- Live-iCal-Befund am 14.05.2026:

| Collection-ID | Feed-Zeitraum | VEVENT-Anzahl | Erstes Feed-Datum | Letztes Feed-Datum |
| --- | --- | ---: | --- | --- |
| `bio-west` | Zukunft bis Jahresende 2026 | 33 | 2026-05-19 | 2026-12-29 |
| `rest-axams-dorf` | Zukunft bis Jahresende 2026 | 16 | 2026-05-28 | 2026-12-23 |
| `gelber-sack-axams-dorf` | Zukunft bis Jahresende 2026 | 8 | 2026-06-02 | 2026-12-15 |

- Abweichung Seite vs. Feed:
  - Restmuell-Seite zeigt noch `2026-05-13`.
  - Restmuell-iCal beginnt am 14.05.2026 geprueft erst mit `2026-05-28`.
  - Das ist plausibel, weil `2026-05-13` am aktuellen Arbeitstag bereits in der Vergangenheit liegt.

Contract Review:

- Plausibilitaetschecks duerfen Seite und Feed nicht starr auf identische Terminlisten pruefen.
- S2/S3 muessen einen Zukunftsfenster-Vertrag definieren statt blind "Seite muss Feed vollstaendig gleichen" zu verlangen.

#### S1.7 Bestehende Script-/Workflow-Konventionen im Repo pruefen

Umsetzung/Review:

- Repo-Befund am 14.05.2026:

| Pfad | Status |
| --- | --- |
| `.github/` | existiert nicht |
| `.github/workflows/` | existiert nicht |
| `scripts/` | existiert nicht |
| `assets/data/` | existiert nicht |
| `package.json` | existiert nicht |
| `docs/modules/Waste Module Overview.md` | existiert nicht |

- Es gibt also noch keine lokalen Script-/Workflow-Konventionen fuer Roadmap 5A.

Contract Review:

- S4 muss die noetige Struktur neu, klein und klar anlegen.
- Ohne Root-`package.json` ist ein dependency-freier Node-Script-Ansatz naheliegend, aber die finale Dependency-Entscheidung gehoert nach S2.
- `Waste Module Overview.md` bleibt wie geplant S6-Arbeit, nicht S1-Arbeit.

#### S1.8 Erste Findings, offene Fragen und Risiken

Findings:

- S1-F1: Die Axams-Seiten enthalten extrahierbare iCal-Links; die Hrefs muessen aber HTML-dekodiert werden, weil `&amp;` sonst den Feed-Fetch bricht.
- S1-F2: Die iCal-Feeds liefern Ganztagstermine mit `DTSTART;VALUE=DATE` und `DTEND;VALUE=DATE`; `DTEND` ist der Folgetag und darf nicht als zweiter Abholtag interpretiert werden.
- S1-F3: Die iCal-Feeds enthalten `VALARM`-Bloecke mit eigener `DESCRIPTION:Reminder`; ein einfacher Feldscan kann diese faelschlich als fachliche Description lesen.
- S1-F4: `DESCRIPTION` enthaelt HTML-Entities wie `&nbsp;`; Parser oder JSON-Generator muessen normalisieren.
- S1-F5: Seite und Feed koennen beim Vergangenheitsfenster voneinander abweichen, beobachtet bei Restmuell `2026-05-13` auf der Seite, aber nicht mehr im Feed.
- S1-F6: Alle drei Feeds reichen aktuell bis Dezember 2026; die Pipeline braucht einen Jahreswechsel-/kurzes-Zukunftsfenster-Vertrag.
- S1-F7: Es gibt noch keine Repo-Konvention fuer `scripts`, `.github/workflows`, `assets/data` oder Parser-Tests; S4 muss diese Struktur bewusst einfuehren.
- S1-F8: Ohne Root-`package.json` sollte S2 eine dependency-freie Umsetzung ernsthaft bevorzugen oder eine neue Dependency explizit begruenden.
- S1-F9: Roadmap 5A beruehrt Deployment/Action-Tooling, aber noch nicht App-Shell/PWA-Cache, solange die App das JSON nicht nutzt.

Offene Fragen fuer S2/S3:

- Welche Mindestanzahl oder welches Mindest-Zukunftsfenster ist je Collection plausibel genug?
- Soll `source.pages` nur Seiten-URLs enthalten oder auch die zur Laufzeit extrahierten iCal-URLs?
- Soll `DESCRIPTION` ueberhaupt in das App-JSON oder nur als Diagnose-/Source-Metadatum genutzt werden?
- Wie streng soll der Vergleich Seite vs. iCal sein, wenn die Seite vergangene Termine noch zeigt?
- Soll der Parser bei fehlender Seitenextraktion sofort abbrechen oder den dokumentierten Fallback nur mit Warnung verwenden?

#### S1.9 S1 Contract Review

Review-Frage:

- Kann Roadmap 5A nach S1 mit den Axams-iCal-Feeds als technischem Input fortfahren, ohne HESTIAs Produktvertrag oder die Roadmap-Grenzen zu verletzen?

Entscheidung:

- Ja. Die offiziellen Axams-Seiten und iCal-Feeds liefern die noetigen offiziellen Termine fuer die drei Ziel-Collections. Roadmap 5A bleibt korrekt, wenn sie diese Daten nur in ein lokales JSON uebersetzt und keine UI-, Push-, Reminder-, Supabase- oder Kalenderlogik einfuehrt.

Contract Findings:

- CR-S1-F1: Eine reine Feed-Pruefung waere zu schwach, weil die Roadmap explizit Seitenextraktion verlangt.
- CR-S1-F2: Eine starre Seite-vs.-Feed-Gleichheit waere zu streng, weil Vergangenheitsfenster voneinander abweichen koennen.
- CR-S1-F3: Ein naiver VEVENT-Parser kann `VALARM`-Felder mit Hauptterminfeldern vermischen.
- CR-S1-F4: HTML-Entity-Normalisierung ist Teil des Datenvertrags, nicht kosmetischer Bonus.
- CR-S1-F5: Die Pipeline-Struktur muss neu entstehen; ohne bestehende Konventionen ist S4 ein kleiner Tooling-Schnitt.

Korrekturen fuer Folgephasen:

- S2 muss den JSON-/Source-Vertrag um Seiten-URL, extrahierte iCal-URL und Fallback-Status klaeren.
- S2 muss den Umgang mit `DESCRIPTION` final entscheiden.
- S3 muss Bruchrisiken fuer HTML-Decoding, `VALARM`, Zeilenfaltung, HTML-Entities, Feed-/Seitenabweichung und Jahreswechsel aufnehmen.
- S4 muss beim Parser zwischen Haupt-VEVENT-Feldern und verschachtelten VALARM-Feldern unterscheiden.
- S5 muss einen Live-Feed-Smoke gegen alle drei Quellen und einen Fixture-Smoke mit VALARM/HTML-Entities enthalten.

#### S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Abnahme:

- S1 ist abgeschlossen.
- Datenquellenkarte, Feldkarte, Repo-Kontext, Findings, Contract Review und Folgekorrekturen sind dokumentiert.
- Exit-Kriterium erfuellt: Es ist klar, welche Quellen gelesen werden, welche Felder gebraucht werden und welche Repo-Schichten betroffen sind.

Doku-Sync-Entscheidung:

- In S1 wird nur diese Roadmap aktualisiert.
- `Waste Module Overview.md`, Deployment-Doku und QA folgen wie geplant erst nach Umsetzung bzw. in S6.

Commit-Empfehlung:

- Noch kein eigener Commit noetig.
- Sinnvoller Zwischencommit nach S2/S3 oder nach abgeschlossenem Doku-Detektivblock:
  - `docs(waste): document Axams waste data source contract`

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Den Datenvertrag finalisieren, bevor Code entsteht.

Substeps:

- S2.1 Source-of-Truth-Vertrag gegen PRODUCT pruefen.
- S2.2 JSON-Schema und Collection-IDs finalisieren.
- S2.3 Commit-Regel finalisieren:
  - nur echtes Diff
  - keine Laufzeit-Zeitstempel
  - kein Commit bei leerem oder unplausiblem Parser-Ergebnis
- S2.4 Action-Zeitplan finalisieren.
- S2.5 Seitenextraktion vs. hartcodierter Endpunkt-Fallback final bewerten.
- S2.6 Fehlerstrategie definieren:
  - Feed nicht erreichbar
  - Feed leer
  - Feed enthaelt zu wenig Zukunft
  - eine von drei Quellen fehlt
  - Jahreswechsel ohne neue Daten
- S2.7 Dependency-Entscheidung treffen:
  - eigener kleiner iCal-Parser
  - oder bewusst gewaehltes kleines Tooling-Paket
- S2.8 Contract Review S2.
- S2.9 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Finaler JSON-/Action-/Fehlervertrag.
- Konkrete S4-Pflichtpunkte.

Exit-Kriterium:

- Parser und Workflow koennen gebaut werden, ohne Grundsatzfragen offen zu lassen.

### S2 Ergebnisprotokoll 14.05.2026

#### S2.1 Source-of-Truth-Vertrag gegen PRODUCT pruefen

Umsetzung/Review:

- `PRODUCT.md` setzt klare Grenzen:
  - HESTIA bleibt Haushaltswerkzeug, kein Haushaltsbetriebssystem.
  - `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
  - Push bleibt spaeter Awareness, nicht Reminder.
  - Der Einkaufslisten-Datenvertrag bleibt stabil.
- Fuer Entsorgung gilt daraus:
  - Die offiziellen Axams-Seiten und iCal-Feeds sind Source of Truth fuer Termine.
  - HESTIA berechnet keine Feiertagsverschiebungen selbst.
  - Roadmap 5A erzeugt nur ein lokales App-JSON.
  - Browser-Code fragt keine Gemeinde-Feeds live ab.
  - Kein Supabase-, Auth-, Household- oder Einkaufslisten-Vertrag wird beruehrt.

Finaler S2-Source-of-Truth-Vertrag:

- Fachliche Quelle:
  - Axams-Seiten fuer Biomuell westlich Axamer Bach, Restmuell Axams Dorf und Gelber Sack Axams Dorf.
- Technischer Termininput:
  - die auf diesen Seiten extrahierten iCal-Feeds.
- App-Vertrag:
  - ausschliesslich `assets/data/waste-calendar.axams.json`.
- Vorheriger gueltiger Datenstand:
  - bleibt bestehen, wenn Quellen nicht erreichbar, leer oder unplausibel sind.

Contract Review:

- Dieser Vertrag verletzt den HESTIA-Kern nicht, weil keine UI, kein Reminder, kein Kalender und keine Nutzerverwaltung eingefuehrt werden.
- Entsorgung bleibt Haushaltsperipherie und wird technisch vorbereitet, ohne den Einkaufskern zu beeinflussen.

#### S2.2 JSON-Schema und Collection-IDs finalisieren

Umsetzung/Review:

- Collection-IDs werden final festgelegt:
  - `bio-west`
  - `rest-axams-dorf`
  - `gelber-sack-axams-dorf`
- `assets/data/waste-calendar.axams.json` wird finaler Dateipfad.
- Collections bleiben in fixer Reihenfolge.
- Termine werden pro Collection nach `date` aufsteigend sortiert.

Finaler JSON-Vertrag:

- Root:
  - `schemaVersion`: aktuell `1`
  - `municipality`: `Axams`
  - `area`: `Axams Dorf; Biomuell westlich Axamer Bach`
  - `source.type`: `axams-ical`
  - `source.pages[]`: stabile Source-Metadaten je Collection
  - `collections[]`: Terminlisten je Collection
- `source.pages[]`:
  - `collectionId`
  - `pageUrl`
  - `icalUrl`
- `collections[]`:
  - `id`
  - `label`
  - `area`
  - `hint`
  - `dates[]`
- `dates[]`:
  - `date` als ISO-Datum `YYYY-MM-DD`
  - `title` aus iCal `SUMMARY`
  - `sourceUid` aus iCal `UID`

Bewusste Nicht-Felder:

- Kein `generatedAt`.
- Kein `fetchedAt`.
- Kein `validUntil`, solange es nicht fachlich stabil aus den Quellen ableitbar ist.
- Kein `warnings`-/`diagnostics`-Array im App-JSON.
- Kein iCal-`DESCRIPTION` im App-JSON fuer V1.
- Kein `DTEND` im App-JSON; `DTEND` wird nur validiert.

Contract Review:

- Das JSON ist klein genug fuer Roadmap 5B, ohne iCal- oder Action-Wissen in die App zu ziehen.
- Lange Beschreibungstexte aus iCal wuerden die UI-V1 vorpraegen und werden deshalb nicht Teil des App-Vertrags.
- Source-Metadaten sind stabil und aendern sich nur bei echten Link-/Quellenaenderungen.

#### S2.3 Commit-Regel finalisieren

Umsetzung/Review:

- Die Action darf nur committen, wenn der erzeugte JSON-Inhalt ein echtes Diff hat.
- Fehlgeschlagene, leere oder unplausible Runs duerfen keinen Teilstand und kein leeres JSON schreiben.
- Laufzeitabhaengige Felder bleiben verboten.

Finale Commit-Regel:

- Parser erzeugt deterministisches JSON in stabiler Reihenfolge.
- Action prueft nach dem Lauf den Git-Diff fuer `assets/data/waste-calendar.axams.json`.
- Kein Diff:
  - kein Commit.
- Echtes Diff und alle Plausibilitaetschecks gruen:
  - Commit erlaubt.
- Fehler, leere Quelle, fehlende Collection oder unplausibles Zukunftsfenster:
  - Action failt sichtbar.
  - kein Commit.
  - letzter gueltiger Stand bleibt im Repo erhalten.

Contract Review:

- Diese Regel verhindert Commit-Flut und schuetzt das App-JSON vor kaputten Quellen.
- Der letzte gueltige Datenstand bleibt die stabile Fallback-Realitaet fuer die spaetere App.

#### S2.4 Action-Zeitplan finalisieren

Umsetzung/Review:

- Der geplante seltene Jahres-/Quartalsplan bleibt fachlich passend.
- GitHub Cron laeuft in UTC.

Finaler S2-Zeitplan:

- `17 3 15,30 1 *`
  - 15. Jaenner
  - 1. Jaenner als Fallback
- `17 3 1 4,7,10 *`
  - 1. April
  - 1. Juli
  - 1. Oktober
- `workflow_dispatch`
  - manueller Lauf jederzeit moeglich.

Finaler Action-Vertrag:

- Name: `Update Axams Waste Calendar`
- Keine Secrets.
- Checkout, Node ausfuehren, JSON erzeugen, Diff pruefen, nur bei echtem Diff committen.
- Commit-Message fuer S4 naheliegend:
  - `chore(waste): update Axams waste calendar`

Contract Review:

- Der Zeitplan ist selten genug fuer HESTIA und vermeidet taegliches Polling.
- Der Jaenner-Fallback deckt das Risiko ab, dass offizielle Jahresdaten erst nach dem ersten Lauf stabil verfuegbar sind.

#### S2.5 Seitenextraktion vs. hartcodierter Endpunkt-Fallback final bewerten

Umsetzung/Review:

- S1 hat gezeigt:
  - Seitenextraktion ist moeglich.
  - Hrefs enthalten `&amp;` und brauchen HTML-Decoding.
  - Die aktuellen extrahierten Links entsprechen den dokumentierten Endpunkten.

Finaler Discovery-Vertrag:

- Primaerer Pfad:
  - Seite laden.
  - Link `Termine als iCal-Datei downloaden` bzw. `CalendarService.ashx` extrahieren.
  - Href HTML-dekodieren.
  - relativen oder absoluten Link zu absoluter URL normalisieren.
  - Feed laden.
- Fallback-Pfad:
  - dokumentierten Fallback-Endpunkt nur verwenden, wenn Seitenextraktion fehlschlaegt.
  - Fallback-Nutzung muss im Action-Log sichtbar sein.
  - Fallback darf nicht still als normaler Erfolg gewertet werden.
- Harte Fehler:
  - Seite nicht erreichbar und Fallback auch nicht nutzbar.
  - Seite erreichbar, aber extrahierter Link fuehrt zu leerem oder ungueltigem Feed.

Contract Review:

- Dieser Vertrag schuetzt gegen geaenderte Seitenstruktur, ohne die Pipeline bei kleinen HTML-Aenderungen sofort nutzlos zu machen.
- Fallback bleibt Wartungshilfe, nicht Source-of-Truth-Ersatz.

#### S2.6 Fehlerstrategie definieren

Umsetzung/Review:

- Fehlerstrategie wird bewusst pipeline-seitig definiert; Roadmap 5A baut noch keine App-UI fuer Fehler.

Finale Fehlerstrategie:

| Fall | S2-Entscheidung |
| --- | --- |
| Feed nicht erreichbar | Hard fail, kein Commit. |
| Seite nicht erreichbar | Fallback-Endpunkt versuchen; wenn Fallback scheitert: Hard fail, kein Commit. |
| iCal-Link auf Seite fehlt | Fallback-Endpunkt versuchen und Warnung loggen; wenn Fallback scheitert: Hard fail. |
| Feed leer | Hard fail, kein Commit. |
| Feed enthaelt keine `VEVENT`s | Hard fail, kein Commit. |
| Eine von drei Quellen fehlt | Hard fail fuer den gesamten Lauf, kein Teil-JSON committen. |
| Eine Collection hat keine Zukunftstermine | Hard fail, kein Commit. |
| Feed reicht weniger als 30 Tage in die Zukunft | Hard fail, kein Commit, weil der Datenstand fuer Roadmap 5B zu kurz waere. |
| Feed reicht weniger als 60 Tage in die Zukunft | Warnung im Action-Log, aber Commit erlaubt, wenn alle sonstigen Checks gruen sind. |
| Seite zeigt vergangene Termine, Feed nicht | Kein Fehler, solange Feed ausreichend Zukunft liefert. |
| Doppelte `UID` oder doppelte Datum/Titel-Paare | S3 muss Dedupe-/Fail-Regel konkretisieren. |
| Ungueltiges Datum | Hard fail, kein Commit. |
| Jahreswechsel ohne neue Daten | Hard fail, wenn keine Collection mindestens 30 Tage Zukunft liefert; Jaenner-Fallback und manueller Lauf bleiben vorgesehen. |

Plausibilitaets-Mindestvertrag:

- Jede der drei Collections muss vorhanden sein.
- Jede Collection muss mindestens einen Zukunftstermin enthalten.
- Der letzte Zukunftstermin jeder Collection muss mindestens 30 Tage nach dem Action-Lauf liegen.
- Daten muessen ISO-normalisierbar sein.
- `DTEND` darf bei Ganztagsterminen hoechstens als Folgetag validiert werden, nicht als zweiter Termin.

Contract Review:

- Fehler sind sichtbar in der Action, aber nicht als fluechtige Felder im JSON.
- Kein schlechter Quellenlauf darf den letzten gueltigen App-Datenstand zerstoeren.

#### S2.7 Dependency-Entscheidung treffen

Umsetzung/Review:

- Repo hat kein Root-`package.json`.
- HESTIA soll keinen Build-Step bekommen.
- iCal-Anforderungen sind fuer Roadmap 5A klein:
  - Seiten-Fetch.
  - Link-Extraktion.
  - HTML-Decoding.
  - Zeilenfaltung.
  - VEVENT-Felder.
  - VALARM ignorieren.
  - Datumsnormalisierung.
  - JSON-Ausgabe.

Finale Dependency-Entscheidung:

- S4 soll einen dependency-freien Node-Script-Ansatz mit Node-Built-ins verwenden.
- Kein Root-`package.json` fuer Roadmap 5A.
- Keine npm-Dependency fuer iCal-Parsing in V1.
- Falls S4 wider Erwarten eine Dependency braucht, muss S2/S3 wieder geoeffnet oder ein expliziter Contract-Nachtrag geschrieben werden.

Contract Review:

- Dependency-frei passt zur statischen HESTIA-PWA und zur vorhandenen Dev-Umgebung.
- Der Parser bleibt wartbar, weil der iCal-Scope bewusst eng ist.

#### S2.8 Contract Review S2

Review-Frage:

- Sind Source-of-Truth, JSON, Commit, Action, Discovery, Fehler und Dependency so finalisiert, dass S4 spaeter bauen kann, ohne Grundsatzfragen offen zu lassen?

Entscheidung:

- Ja. S2 finalisiert den fachlichen und technischen Vertrag fuer Roadmap 5A. S3 muss jetzt nur noch Bruchrisiken, Dedupe, Jahreswechsel, UTC/Cron, Branch-/Commit-Risiken und Teststrategie vertiefen.

Contract Findings:

- CR-S2-F1: `DESCRIPTION` im App-JSON waere zu viel Vertrag fuer Roadmap 5A und wuerde Roadmap 5B UI/Copyright/Copy-Fragen vorwegnehmen.
- CR-S2-F2: Ein `warnings`-Feld im JSON wuerde je nach Lauf fluechtig werden und kann Commit-Laerm erzeugen.
- CR-S2-F3: Seite-vs.-Feed-Gleichheit ist kein geeigneter Plausibilitaetscheck, weil vergangene Termine unterschiedlich sichtbar bleiben koennen.
- CR-S2-F4: Ein harter 60-Tage-Mindestvertrag koennte kurz vor offiziellen Jahreswechseln zu streng sein.
- CR-S2-F5: Ein externes iCal-Paket waere fuer den kleinen Scope derzeit schwerer als ein lokaler Parser.

Korrekturen:

- Der Ziel-JSON-Vertrag wurde auf stabile App-Felder reduziert.
- `DESCRIPTION` bleibt aus dem App-JSON heraus und wird nur fuer Parser-/Fixture-/Plausibilitaetschecks genutzt.
- Warnungen bleiben im Action-Log und werden nicht als fluechtige JSON-Felder geschrieben.
- Seite-vs.-Feed-Abgleich wird auf Discovery/Plausibilitaet begrenzt, nicht als exakter Listenvergleich definiert.
- Zukunftsfenster-Vertrag wird zweistufig:
  - unter 30 Tage: Hard fail.
  - unter 60 Tage: Warnung, aber Commit erlaubt, wenn sonst plausibel.
- Dependency-Entscheidung wurde auf dependency-freies Node-Script finalisiert.

Restrisiko:

- S3 muss Dedupe-Regeln, UID-Stabilitaet und Jahreswechsel-Verhalten noch genauer durchdenken, bevor S4 baut.
- S3 muss pruefen, ob der 30-/60-Tage-Vertrag fuer Gelber Sack mit Vier-Wochen-Rhythmus robust genug ist.

#### S2.9 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Abnahme:

- S2 ist abgeschlossen.
- Source-of-Truth-, JSON-, Commit-, Action-, Discovery-, Fehler- und Dependency-Vertrag sind finalisiert.
- Exit-Kriterium erfuellt: Parser und Workflow koennen auf diesem Vertrag geplant werden; S3 vertieft nur noch Risiko- und Testfragen.

Doku-Sync-Entscheidung:

- In S2 wird nur diese Roadmap aktualisiert.
- `Waste Module Overview.md`, Deployment-Doku und QA bleiben fuer S6 reserviert, wenn der gebaute Stand feststeht.

Commit-Empfehlung:

- Noch kein eigener Commit notwendig.
- Sinnvoller Commit nach S3 als Abschluss des Doku-Detektivblocks:
  - `docs(waste): finalize Axams waste data pipeline contract`

## S3 - Bruchrisiko-, Daten- und Umsetzungsreview

Ziel:

- Technische und fachliche Fehler finden, bevor die Pipeline gebaut wird.

Substeps:

- S3.1 Feed-Bruchrisiken identifizieren:
  - geaenderte Seitenstruktur
  - geaenderte CalendarService-Parameter
  - HTML-Entities in iCal-Beschreibungen
  - Zeilenfaltung in iCal
  - wiederholte UIDs
  - doppelte Termine
- S3.2 Jahreswechsel- und Zukunftsfenster pruefen.
- S3.3 Cron-/UTC-Risiko pruefen.
- S3.4 Commit- und Branch-Risiko pruefen:
  - Bot-Commit
  - Permissions
  - keine Commit-Flut
  - keine Secrets noetig
- S3.5 Parser-S4-Substeps konkretisieren.
- S3.6 Teststrategie konkretisieren:
  - Fixtures
  - Live-Feed-Smoke
  - JSON-Contract-Check
  - Workflow-Syntax
- S3.7 Contract Review S3.
- S3.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Bruchrisikoliste.
- Konkreter Umsetzungsplan fuer S4.
- Testplan fuer S5.

Exit-Kriterium:

- S4 hat klare Substeps und bekannte Review-Kriterien.

### S3 Ergebnisprotokoll 14.05.2026

#### S3.1 Feed-Bruchrisiken identifizieren

Umsetzung/Review:

- S1/S2-Findings wurden gegen die konkrete Parser-/Action-Realitaet geprueft.
- Ziel ist nicht, jeden moeglichen iCal-Standardfall vollstaendig zu unterstuetzen, sondern die beobachteten Axams-Feeds robust und bewusst zu verarbeiten.

Finale Bruchrisikoliste:

| Risiko | Bewertung | S4-/S5-Korrektur |
| --- | --- | --- |
| Geaenderte Seitenstruktur | Realistisch, weil Gemeinde-CMS wechseln kann. | Link nach `CalendarService.ashx` und/oder iCal-Linktext suchen; Fallback nur sichtbar geloggt nutzen. |
| `&amp;` in HTML-Hrefs | In S1 beobachtet. | Href vor Fetch HTML-dekodieren; Fixture/Unit-Smoke dafuer bauen. |
| Geaenderte `CalendarService`-Parameter | Realistisch. | Primaer Seitenextraktion statt Endpunkt-Hardcoding; Fallback-Endpunkte dokumentiert halten. |
| Feed nicht erreichbar | Realistisch. | Hard fail, kein Commit. |
| Feed leer oder ohne `VEVENT` | Kritisch. | Hard fail, kein Commit. |
| HTML-Entities in `DESCRIPTION` | In S1 beobachtet. | Description fuer Parser-Smoke decodieren/normalisieren; nicht ins JSON ausgeben. |
| Zeilenfaltung in iCal | iCal-Standardrisiko. | Parser muss gefaltete Zeilen vor Feldauswertung entfalten. |
| `VALARM` innerhalb `VEVENT` | In S1 beobachtet. | Parser muss Haupt-VEVENT-Felder von verschachtelten VALARM-Feldern trennen oder VALARM vor Feldmapping ignorieren. |
| Wiederholte `UID` | Moeglich bei CMS-Fehler oder Export-Aenderung. | Innerhalb einer Collection Hard fail, wenn gleiche UID unterschiedliche Datum/Titel-Kombinationen erzeugt. |
| Doppelte gleiche Termine | Moeglich. | Exakte Dubletten nach `date + title + sourceUid` deduplizieren; widerspruechliche Dubletten hard fail. |
| Gleicher Termin ohne stabile UID | Aktuell nicht beobachtet, aber moeglich. | Ohne `UID` hard fail, weil `sourceUid` Teil des JSON-Vertrags ist. |
| Seite und Feed weichen bei Vergangenheit ab | In S1 beobachtet. | Kein harter Gleichheitscheck; Zukunftsfenster pruefen. |
| Umlaut-/Encoding-Probleme | In SUMMARY beobachtet. | UTF-8 lesen/schreiben; JSON als UTF-8 ausgeben. |

Dedupe-/UID-Regel fuer S4:

- `UID` ist Pflicht.
- Innerhalb einer Collection gilt:
  - gleiche `UID`, gleiches Datum und gleicher Titel: Dublette, einmal ausgeben.
  - gleiche `UID`, aber anderes Datum oder anderer Titel: Hard fail.
  - gleiches Datum und gleicher Titel, aber unterschiedliche `UID`: Hard fail, weil unklarer offizieller Doppeldatensatz.
- Zwischen Collections duerfen gleiche Daten vorkommen, weil verschiedene Abfuhrarten am selben Tag moeglich sind.

Contract Review:

- Diese Regeln sind streng genug, um kaputte Feeds nicht still zu normalisieren.
- Sie vermeiden gleichzeitig falsche Cross-Collection-Dedupe-Logik.

#### S3.2 Jahreswechsel- und Zukunftsfenster pruefen

Umsetzung/Review:

- S1-Livebefund am 14.05.2026:
  - Biomuell: 33 Termine bis 2026-12-29.
  - Restmuell: 16 Termine bis 2026-12-23.
  - Gelber Sack: 8 Termine bis 2026-12-15.
- Gelber Sack hat nur Vier-Wochen-Rhythmus; daher waere eine reine Mindestanzahl zu riskant.
- Zukunftsfenster ist robuster als Anzahltermine.

Finaler Zukunftsfenster-Vertrag:

- Jede Collection muss mindestens einen Zukunftstermin haben.
- Der letzte Zukunftstermin jeder Collection muss mindestens 30 Tage nach dem Laufdatum liegen.
- Wenn der letzte Zukunftstermin weniger als 60 Tage nach dem Laufdatum liegt:
  - Warnung im Action-Log.
  - Commit erlaubt, wenn alle anderen Plausibilitaetschecks gruen sind.
- Wenn der letzte Zukunftstermin mindestens 60 Tage nach dem Laufdatum liegt:
  - gruener Normalfall.
- Anzahltermine sind Diagnose, aber kein primaerer Hard-Fail-Vertrag.

Jahreswechsel-Vertrag:

- Jaenner-Laeufe am 15. und 30. Jaenner sollen neue Jahresdaten einsammeln.
- Wenn am 15. Jaenner nur alte/kurze Daten vorliegen:
  - unter 30 Tage Zukunft: Hard fail, kein Commit.
  - 30 bis 59 Tage Zukunft: Warnung, Commit erlaubt.
- Der 30. Jaenner ist Fallback fuer spaet aktualisierte Gemeindequellen.
- Manuelle `workflow_dispatch`-Laeufe bleiben der Wartungspfad, wenn die Gemeinde Quellen ausserhalb des Plans aktualisiert.

Contract Review:

- Der 30-/60-Tage-Vertrag ist fuer Biomuell, Restmuell und Gelber Sack gleich anwendbar, ohne den Vier-Wochen-Rhythmus falsch zu bestrafen.
- HESTIA erfindet weiterhin keine Termine, wenn die Gemeinde noch keine Zukunft liefert.

#### S3.3 Cron-/UTC-Risiko pruefen

Umsetzung/Review:

- GitHub Actions Cron laeuft in UTC.
- S2 hat `03:17 UTC` festgelegt.
- In Europe/Vienna entspricht das:
  - im Winter etwa 04:17 lokale Zeit.
  - im Sommer etwa 05:17 lokale Zeit.

Cron-Risiken:

- Monatliche Syntaxfehler koennen Action nie starten lassen.
- UTC kann zu anderem lokalen Datum fuehren, wenn nahe Mitternacht geplant.
- GitHub Scheduled Workflows koennen verzoegert oder gelegentlich ausgelassen werden.
- Default-Branch-Ausfuehrung ist noetig; der Workflow wirkt nur auf dem Default Branch.

Finale Cron-/UTC-Korrekturen:

- Cron bleibt bewusst bei `03:17 UTC`, weit weg von lokaler Mitternacht.
- S4 muss beide Cron-Zeilen exakt verwenden:
  - `17 3 15,30 1 *`
  - `17 3 1 4,7,10 *`
- `workflow_dispatch` ist Pflicht, damit ein verpasster Schedule manuell nachgeholt werden kann.
- S5 dokumentiert, dass echter GitHub-Schedule-Lauf lokal nicht pruefbar ist.

Contract Review:

- Der Zeitplan bleibt selten, nachvollziehbar und nicht pollingartig.
- UTC erzeugt mit 03:17 UTC kein fachliches Datumsrisiko fuer die geplanten Tage.

#### S3.4 Commit- und Branch-Risiko pruefen

Umsetzung/Review:

- Repo hat aktuell keine `.github/workflows`.
- Die Action braucht keine Secrets.
- GitHub Actions darf mit `GITHUB_TOKEN` committen, wenn Workflow-Permissions passend gesetzt sind.

Finaler Commit-/Branch-Vertrag fuer S4:

- Workflow-Datei:
  - `.github/workflows/update-axams-waste-calendar.yml`
- Permissions:
  - `contents: write`
- Commit nur nach erfolgreichen Parser- und Plausibilitaetschecks.
- Commit nur, wenn `git diff --quiet -- assets/data/waste-calendar.axams.json` ein echtes Diff zeigt.
- Commit-Author:
  - GitHub Actions Bot, z. B. `github-actions[bot]`.
- Commit-Message:
  - `chore(waste): update Axams waste calendar`
- Keine Secrets.
- Keine `.ics`-Rohdateien versionieren.
- Keine Aenderungen an App-Code, Supabase, SQL, RLS oder PWA-Shell in Roadmap 5A.

Branch-/Concurrency-Risiken:

- Wenn mehrere manuelle/Schedule-Laeufe parallel laufen, koennen doppelte Commit-Versuche entstehen.
- Wenn Branch Protection direkte Bot-Commits verhindert, kann die Action fehlschlagen.
- Wenn der Default Branch zwischen Checkout und Commit weiterwandert, kann Push fehlschlagen.

Korrekturen fuer S4:

- Workflow soll `concurrency` fuer denselben Branch/Workflow setzen, z. B. `waste-calendar-${{ github.ref }}`.
- Push-/Branch-Protection kann lokal nicht sicher geprueft werden und wird in S5 als nicht lokal pruefbares Restrisiko dokumentiert.

Contract Review:

- Die Action bleibt ein kleiner Datenupdate-Mechanismus und kein allgemeines CI/CD-System.
- Kein Secret- oder Deployment-Eingriff ist noetig.

#### S3.5 Parser-S4-Substeps konkretisieren

Umsetzung/Review:

- S4-Substeps wurden aus S1/S2/S3 konkretisiert, damit Umsetzung nicht bei Grundsatzfragen startet.

Konkreter S4-Umsetzungsplan:

- S4.1 Struktur anlegen:
  - `scripts/`
  - `scripts/fixtures/` oder enger benannter Fixture-Ort
  - `assets/data/`
  - `.github/workflows/`
- S4.2 Script anlegen:
  - vorgeschlagener Pfad: `scripts/update-waste-calendar.mjs`
  - dependency-frei mit Node-Built-ins.
- S4.3 Konstanten definieren:
  - drei Collections mit `id`, `label`, `area`, `hint`, `pageUrl`, `fallbackIcalUrl`.
  - fixe Collection-Reihenfolge.
- S4.4 Discovery bauen:
  - Seite fetch.
  - iCal-Link extrahieren.
  - Href HTML-dekodieren.
  - absolute URL bilden.
  - Fallback nur mit sichtbarer Warnung.
- S4.5 iCal-Parser bauen:
  - Zeilenfaltung entfalten.
  - `VEVENT`-Bloecke extrahieren.
  - verschachtelte `VALARM`-Bloecke aus der Feldauswertung entfernen oder ignorieren.
  - `DTSTART`, `DTEND`, `SUMMARY`, `UID`, `DESCRIPTION` lesen.
  - `DTSTART;VALUE=DATE` zu `YYYY-MM-DD` normalisieren.
  - `DTEND` als Folgetag validieren, nicht ausgeben.
- S4.6 Datenvalidierung bauen:
  - Pflichtfelder.
  - Dedupe-/UID-Regeln.
  - jede Collection vorhanden.
  - Zukunftsfenster 30/60 Tage.
  - keine ungueltigen Datumswerte.
- S4.7 JSON-Generator bauen:
  - finaler S2-Vertrag.
  - stabile Einrueckung.
  - kein `generatedAt`, kein `warnings`.
  - `source.pages[].icalUrl` aus effektiv verwendetem Link.
- S4.8 Fixture-/Check-Modus bauen:
  - lokale Fixtures fuer Parser-Smokes.
  - Live-Modus fuer echten Feed-Lauf.
- S4.9 Workflow bauen:
  - Node ausfuehren.
  - Diff pruefen.
  - nur bei echtem Diff committen.
  - `workflow_dispatch`, Cron, Permissions, Concurrency.
- S4.10 Review:
  - Code Review gegen S1-S3-Bruchrisiken.
  - Contract Review gegen Roadmap.
  - lokale Checks dokumentieren.

Contract Review:

- S4 bleibt Datenpipeline, nicht App-UI.
- Die Struktur ist neu, aber eng und repo-nah.

#### S3.6 Teststrategie konkretisieren

Umsetzung/Review:

- S5 muss nicht nur den Happy Path pruefen, sondern die in S1/S3 gefundenen Bruchstellen.

Finale S5-Teststrategie:

- Syntax:
  - `node --check scripts/update-waste-calendar.mjs`
- Fixture-Smokes:
  - normales VEVENT mit `DTSTART`, `DTEND`, `SUMMARY`, `UID`.
  - gefaltete iCal-Zeilen.
  - HTML-Entities in `DESCRIPTION`.
  - `VALARM` mit `DESCRIPTION:Reminder`, das nicht als Terminbeschreibung zaehlt.
  - doppelte identische Events.
  - gleiche UID mit widerspruechlichen Daten als Fehlerfall.
  - fehlende UID als Fehlerfall.
  - ungueltiges Datum als Fehlerfall.
- Live-Feed-Smoke:
  - alle drei Axams-Seiten laden.
  - iCal-Links extrahieren.
  - Feeds laden.
  - drei Collections erzeugen.
  - Zukunftsfenster pruefen.
- JSON-Contract-Check:
  - valides JSON.
  - `schemaVersion: 1`.
  - exakt drei Collections.
  - fixe Reihenfolge.
  - ISO-Daten.
  - Termine sortiert.
  - keine verbotenen Felder: `generatedAt`, `fetchedAt`, `warnings`, `diagnostics`, `description`.
- Determinismus-Smoke:
  - Script zweimal laufen lassen.
  - zweiter Lauf erzeugt kein Diff.
- Fehlerfall-Smokes:
  - leerer Feed.
  - fehlender Feed.
  - fehlende Collection.
  - zu kurzes Zukunftsfenster.
- Workflow-/YAML-Check:
  - statisch pruefen, ob Workflow `workflow_dispatch`, beide Cron-Zeilen, `contents: write`, `concurrency` und Commit-Diff-Guard enthaelt.
  - echter GitHub-Schedule-Lauf und Bot-Commit lokal nicht pruefbar; in S5 dokumentieren.
- Repo-Hygiene:
  - `git diff --check`.
  - keine `.ics`-Rohdateien versioniert.
  - keine `package.json`-Einfuehrung.
  - keine App-UI-, Supabase-, SQL-, RLS- oder `sw.js`-Aenderung.

Contract Review:

- Die Teststrategie deckt die S1/S2/S3-Vertragsrisiken ab, ohne Playwright oder Browser-Smokes fuer eine reine Datenpipeline zu erzwingen.

#### S3.7 Contract Review S3

Review-Frage:

- Sind die bekannten Bruchrisiken, Datenrisiken, Workflow-Risiken und Review-Kriterien so konkret, dass S4 ohne neue Grundsatzklaerung starten kann?

Entscheidung:

- Ja. S3 schliesst den Doku-Detektivblock ab. S4 kann Parser, JSON, Fixtures und Action anhand dieses Vertrags bauen.

Contract Findings:

- CR-S3-F1: Ein reiner Happy-Path-Parser waere zu riskant, weil Axams-iCal verschachtelte `VALARM`-Bloecke und HTML-Entities enthaelt.
- CR-S3-F2: Mindestanzahl je Collection waere fuer Gelber Sack mit Vier-Wochen-Rhythmus schlechter als ein Zukunftsfenster.
- CR-S3-F3: Dedupe darf nicht collection-uebergreifend passieren, weil verschiedene Abfuhrarten am selben Tag legitim sind.
- CR-S3-F4: Ohne Workflow-`concurrency` koennen manuelle und geplante Laeufe unnoetige Commit-/Push-Rennen erzeugen.
- CR-S3-F5: Lokale Checks koennen Bot-Commit und echten Schedule nicht beweisen.
- CR-S3-F6: Fixture-Tests muessen VALARM, Zeilenfaltung und HTML-Entities enthalten, sonst testen sie nicht die realen Bruchstellen.

Korrekturen:

- UID-/Dedupe-Regeln wurden collection-lokal finalisiert.
- Zukunftsfenster bleibt 30 Tage Hard Fail, 60 Tage Warnung statt Terminanzahl-Hard-Fail.
- S4-Workflow muss `concurrency` enthalten.
- S5 muss nicht lokal pruefbare GitHub-Actions-Realitaeten dokumentieren.
- Fixture-Strategie wurde um VALARM, Zeilenfaltung, HTML-Entities und Dedupe-Fehlerfaelle erweitert.

Restrisiko:

- Die Gemeinde kann die Website oder Feed-Exportlogik grundlegend aendern; Roadmap 5A kann das nur sichtbar failen, nicht verhindern.
- Branch Protection oder Repository-Permissions koennen Bot-Commits trotz korrekter Workflow-Datei blockieren.

#### S3.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Abnahme:

- S3 ist abgeschlossen.
- Bruchrisikoliste, Dedupe-/UID-Regeln, Jahreswechsel-/Zukunftsfenster, Cron-/UTC-Bewertung, Commit-/Branch-Vertrag, S4-Plan und S5-Teststrategie sind dokumentiert.
- Exit-Kriterium erfuellt: S4 hat klare Substeps und bekannte Review-Kriterien.

Doku-Sync-Entscheidung:

- In S3 wird nur diese Roadmap aktualisiert.
- `Waste Module Overview.md`, Deployment-Doku und QA bleiben wie geplant S6-Arbeit nach gebauter Pipeline.

Commit-Empfehlung:

- Der Doku-Detektivblock S1-S3 ist jetzt commitgeeignet.
- Empfohlener Commit:
  - `docs(waste): finalize Axams waste data pipeline contract`

## S4 - Umsetzung

Ziel:

- Datenpipeline bauen, ohne App-UI zu veraendern.

Substeps:

- S4.1 Datenordner und Fixture-Struktur anlegen.
- S4.2 iCal-Fetch-/Discovery-Script bauen:
  - Seiten laden
  - iCal-Link extrahieren
  - dokumentierten Fallback erlauben
- S4.3 iCal-Parser bauen:
  - Zeilenfaltung aufloesen
  - relevante VEVENT-Felder extrahieren
  - Datum normalisieren
  - HTML-Entities in Beschreibung handhaben
- S4.4 JSON-Generator bauen:
  - stabile Collection-Reihenfolge
  - stabile Sortierung
  - kein wechselnder Zeitstempel
  - klare Source-Metadaten
- S4.5 Plausibilitaetschecks bauen:
  - drei Collections vorhanden
  - jede Collection hat Termine
  - Zukunftsfenster plausibel
  - keine ungueltigen Datumswerte
- S4.6 GitHub Action bauen:
  - seltener Zeitplan
  - `workflow_dispatch`
  - Parser ausfuehren
  - nur bei Diff committen
- S4.7 Lokale Test-/Check-Kommandos dokumentieren.
- S4.8 Code Review und Contract Review.
- S4.9 Schritt-Abnahme und Commit-Empfehlung.

Jeder Substep dokumentiert:

- Umsetzung
- betroffene Dateien
- Checks
- Contract Review
- Findings
- Korrekturen
- Restrisiko

Output:

- Parser-Script.
- GitHub Action.
- JSON-Datei.
- Tests/Fixtures.

Exit-Kriterium:

- Ein lokaler Trockenlauf kann das JSON erzeugen und ein Git-Diff zeigt nur echte Datenaenderungen.

### S4.1 Ergebnisprotokoll 14.05.2026

Umsetzung:

- Struktur fuer Roadmap 5A angelegt:
  - `.github/workflows/.gitkeep`
  - `assets/data/.gitkeep`
  - `scripts/fixtures/waste-calendar/.gitkeep`
- Dadurch existieren jetzt die benoetigten Zielbereiche fuer:
  - spaeteren GitHub-Action-Workflow.
  - spaeteres App-JSON `assets/data/waste-calendar.axams.json`.
  - spaetere Parser-Fixtures fuer Waste-Calendar-Smokes.

Betroffene Dateien:

- `.github/workflows/.gitkeep`
- `assets/data/.gitkeep`
- `scripts/fixtures/waste-calendar/.gitkeep`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Checks:

- Strukturcheck per `Test-Path`:
  - `.github`
  - `.github/workflows`
  - `.github/workflows/.gitkeep`
  - `scripts`
  - `scripts/fixtures`
  - `scripts/fixtures/waste-calendar`
  - `scripts/fixtures/waste-calendar/.gitkeep`
  - `assets/data`
  - `assets/data/.gitkeep`
- `git diff --check -- .github/workflows/.gitkeep assets/data/.gitkeep scripts/fixtures/waste-calendar/.gitkeep`
- `git status --short`
- Verzeichnis-Sichtung per `Get-ChildItem -Recurse -Force .github, scripts, assets\data`

Code Review:

- S4.1 fuehrt noch keinen Code aus.
- Es gibt noch kein Script, kein Workflow-YAML und kein JSON.
- `.github/workflows/.gitkeep` ist kein GitHub-Actions-Workflow und loest keine Action aus.
- `assets/data/.gitkeep` ist nur Platzhalter; das echte App-JSON wird spaeter von S4 erzeugt.
- `scripts/fixtures/waste-calendar/.gitkeep` reserviert nur den Fixture-Ort.

Contract Review:

- S4.1 bleibt innerhalb des S1-S3-Vertrags:
  - keine UI.
  - kein Push/Reminder.
  - keine Supabase-, SQL-, RLS-, Auth- oder Household-Key-Aenderung.
  - keine App-Shell-/Service-Worker-Aenderung.
  - keine `package.json`-Einfuehrung.
  - keine `.ics`-Rohdateien versioniert.
- Die Struktur folgt dem S3-Schnitt:
  - `.github/workflows/`
  - `scripts/fixtures/waste-calendar/`
  - `assets/data/`

Findings:

- S4.1-F1: Leere Zielordner koennen von Git nicht versioniert werden.

Korrekturen:

- Kleine `.gitkeep`-Platzhalter angelegt, damit die Struktur versionierbar ist, ohne bereits Verhalten einzufuehren.

Restrisiko:

- Keines fuer S4.1. Die naechsten Risiken entstehen erst mit S4.2/S4.3, wenn Discovery und Parserlogik implementiert werden.

### S4.2 Ergebnisprotokoll 14.05.2026

Umsetzung:

- `scripts/update-waste-calendar.mjs` angelegt.
- Dependency-freies Node-ESM-Script mit Node-Built-ins und globalem `fetch`.
- Drei Collection-Konstanten angelegt:
  - `bio-west`
  - `rest-axams-dorf`
  - `gelber-sack-axams-dorf`
- Discovery-/Fetch-Funktionen gebaut:
  - `decodeHtmlAttribute(...)`
  - `stripTags(...)`
  - `extractIcalUrlFromHtml(...)`
  - `fetchText(...)`
  - `discoverCollectionSource(...)`
  - `discoverAllSources(...)`
- CLI-Smoke eingebaut:
  - `node scripts/update-waste-calendar.mjs --check-discovery`
- Aktueller S4.2-Stand schreibt keine Dateien. Er laedt Seiten und Feeds nur live und gibt eine kompakte Discovery-Zusammenfassung aus.

Betroffene Dateien:

- `scripts/update-waste-calendar.mjs`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Checks:

- `node --version`
  - Ergebnis: `v24.11.1`
- `node --check scripts/update-waste-calendar.mjs`
- `node scripts/update-waste-calendar.mjs --check-discovery`
  - `bio-west`: page `200`, iCal `200`, fallback `no`
  - `rest-axams-dorf`: page `200`, iCal `200`, fallback `no`
  - `gelber-sack-axams-dorf`: page `200`, iCal `200`, fallback `no`
- HTML-Decoding-Smoke:
  - `CalendarService.ashx?x=1&amp;y=2` wird zu `CalendarService.ashx?x=1&y=2`.
- Fallback-Smoke:
  - bewusst ungueltige Seiten-URL fuer `bio-west`.
  - dokumentierter Fallback wurde genutzt.
  - Fallback-Feed enthielt `BEGIN:VCALENDAR`.
- `git diff --check -- scripts/update-waste-calendar.mjs`
- Scope-Scan gegen unerwuenschte Beruehrungen:
  - keine Datei-Schreiboperationen.
  - keine `package.json`.
  - kein `localStorage`.
  - kein Supabase.
  - kein Service Worker.
  - keine Parser-Felder wie `BEGIN:VEVENT` oder `DTSTART` im Script.

Code Review:

- `extractIcalUrlFromHtml(...)` sucht zunaechst Anker mit `CalendarService.ashx` und/oder iCal-Text.
- Hrefs werden vor URL-Aufloesung HTML-dekodiert.
- Relative Links werden mit `new URL(candidate.href, pageUrl).href` absolut normalisiert.
- Fallback wird nur genutzt, wenn Seiten-Fetch oder Link-Extraktion fehlschlaegt.
- Wenn ein extrahierter Feed kein `BEGIN:VCALENDAR` enthaelt, wird hart gefailt und nicht still auf Fallback gewechselt.
- CLI-Ausgabe ist bewusst Log/Smoke, kein App-JSON.
- Das Modul exportiert Funktionen fuer spaetere Fixture-/Parser-Smokes.

Contract Review:

- S4.2 erfuellt den S2/S3-Discovery-Vertrag:
  - Seitenextraktion ist primaer.
  - HTML-Decoding ist umgesetzt.
  - Fallback ist erlaubt, aber als `fallback=yes` bzw. Warnung sichtbar.
  - Feeds werden geladen und auf `BEGIN:VCALENDAR` geprueft.
- S4.2 bleibt innerhalb der Roadmap-Grenzen:
  - kein Parser.
  - kein JSON.
  - kein Workflow-YAML.
  - keine `.ics`-Dateien.
  - keine UI.
  - keine Supabase-/SQL-/RLS-/Auth-/Household-Aenderung.
  - keine `package.json`-Einfuehrung.
  - keine Service-Worker-Aenderung.

Findings:

- S4.2-F1: Der erste Direct-Run-Guard nutzte `pathToFileURL(process.argv[1])` ohne zu pruefen, ob `process.argv[1]` existiert. Beim Import ueber `node --input-type=module` war `process.argv[1]` undefiniert.

Korrekturen:

- Direct-Run-Guard auf `process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href` gehaertet.
- Danach bestanden Import-Smokes fuer `extractIcalUrlFromHtml(...)` und `discoverCollectionSource(...)`.

Restrisiko:

- Das HTML-Link-Regex ist fuer die aktuelle Axams-Seitenstruktur ausreichend, aber kein vollstaendiger HTML-Parser. S3 hat dieses Risiko bewusst akzeptiert, solange Fallback sichtbar bleibt.
- S4.4/S4.5 muessen die jetzt geparsten Termine weiter in deterministisches JSON und Plausibilitaetschecks ueberfuehren.

### S4.3 Ergebnisprotokoll 14.05.2026

Umsetzung:

- iCal-Parser in `scripts/update-waste-calendar.mjs` ergaenzt.
- Neue Parser-Funktionen:
  - `decodeHtmlText(...)`
  - `unfoldIcalLines(...)`
  - `parseIcalEvents(...)`
- Parser-Verhalten:
  - CRLF/CR/LF werden normalisiert.
  - iCal-Zeilenfaltung wird vor der Feldauswertung aufgeloest.
  - `VEVENT`-Bloecke werden extrahiert.
  - verschachtelte `VALARM`-Bloecke werden vor dem Feldmapping entfernt.
  - `DTSTART`, `DTEND`, `SUMMARY`, `UID` und `DESCRIPTION` werden gelesen.
  - `DTSTART;VALUE=DATE` und `DTEND;VALUE=DATE` werden zu `YYYY-MM-DD` normalisiert.
  - HTML-Entities und einfache iCal-Text-Escapes in Textfeldern werden normalisiert.
- Der Parser liefert interne Event-Objekte mit:
  - `date`
  - `endDate`
  - `title`
  - `sourceUid`
  - `description`
- `description` bleibt nur Parser-/Prueffeld und wird in S4.3 nicht als App-JSON-Vertrag eingefuehrt.
- S4.3 schreibt weiterhin keine Dateien und erzeugt kein App-JSON.

Betroffene Dateien:

- `scripts/update-waste-calendar.mjs`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Checks:

- `node --check scripts/update-waste-calendar.mjs`
- Fixture-Smoke fuer:
  - gefaltetes `SUMMARY`.
  - `DESCRIPTION` mit `&nbsp;` und iCal-`\n`.
  - verschachteltes `VALARM` mit `DESCRIPTION:Reminder`.
  - `DTSTART;VALUE=DATE` und `DTEND;VALUE=DATE`.
- Fehler-Smokes fuer:
  - ungueltiges Kalenderdatum `20261340`.
  - fehlendes `VALUE=DATE` bei `DTSTART`.
- Live-Parse gegen alle drei Axams-Quellen:
  - `bio-west`: 33 Events, `2026-05-19` bis `2026-12-29`, Fallback `no`.
  - `rest-axams-dorf`: 16 Events, `2026-05-28` bis `2026-12-23`, Fallback `no`.
  - `gelber-sack-axams-dorf`: 8 Events, `2026-06-02` bis `2026-12-15`, Fallback `no`.
- `git diff --check -- scripts/update-waste-calendar.mjs`
- Scope-Scan gegen unerwuenschte Beruehrungen:
  - keine Datei-Schreiboperationen.
  - keine `package.json`.
  - kein App-JSON.
  - keine `generatedAt`-/`fetchedAt`-/`validUntil`-Runtime-Felder.

Code Review:

- `parseIcalEvents(...)` bricht hart ab, wenn kein `VEVENT` vorhanden ist.
- Pflichtfelder `DTSTART`, `SUMMARY` und `UID` muessen vorhanden und nicht leer sein.
- `DTEND` ist optionales Parser-Feld, wird aber bei Vorhandensein ebenfalls als `VALUE=DATE` validiert.
- Datumsnormalisierung prueft nicht nur das Format, sondern auch echte Kalenderdaten.
- `VALARM` wird vor dem Feldmapping entfernt; dadurch kann `DESCRIPTION:Reminder` die fachliche Terminbeschreibung nicht ueberschreiben.
- Bei mehrfachen gleichnamigen Feldern nimmt der Parser aktuell den ersten Wert. Dedupe-, UID-Konflikt- und Plausibilitaetsregeln werden bewusst erst in S4.5 umgesetzt.

Contract Review:

- S4.3 erfuellt den S1-S3-Parser-Vertrag:
  - Zeilenfaltung wird behandelt.
  - `VALARM` wird von Haupt-`VEVENT`-Feldern getrennt.
  - HTML-Entities in `DESCRIPTION` werden normalisiert.
  - `DTSTART;VALUE=DATE` ist Quelle fuer `date`.
  - `DTEND` wird nicht als zweiter Abholtag interpretiert.
- S4.3 bleibt innerhalb der Roadmap-Grenzen:
  - keine UI.
  - kein Supabase.
  - kein Service Worker.
  - kein Workflow-YAML.
  - kein App-JSON.
  - keine `.ics`-Rohdateien.
  - keine neue Dependency.

Findings:

- S4.3-F1: Die erste Datumsnormalisierung haette achtstellige, aber kalendarisch ungueltige Werte wie `20261340` akzeptiert.
- S4.3-F2: Ohne expliziten `VALUE=DATE`-Check haette der Parser achtstellige Nicht-Ganztagswerte akzeptieren koennen.

Korrekturen:

- Datumsnormalisierung gegen echte UTC-Kalenderdaten gehaertet.
- `DTSTART` und `DTEND` muessen jetzt `VALUE=DATE` tragen.
- Fehler-Smokes fuer beide Findings ergaenzt und erfolgreich ausgefuehrt.

Restrisiko:

- Der Parser ist bewusst ein enger iCal-Parser fuer die beobachteten Axams-Feeds, kein vollstaendiger RFC-5545-Parser.
- `DTEND`-Folgetag-Validierung, Dedupe-Regeln, Zukunftsfenster und leere/unplausible Quellen folgen in S4.5.

### S4.4 Ergebnisprotokoll 14.05.2026

Umsetzung:

- Deterministischen JSON-Generator in `scripts/update-waste-calendar.mjs` ergaenzt.
- Neue Generator-Funktionen:
  - `buildWasteCalendarJson(...)`
  - `serializeWasteCalendarJson(...)`
- CLI erweitert:
  - `--print-json` gibt das App-JSON auf stdout aus.
  - `--write-json` schreibt `assets/data/waste-calendar.axams.json`.
- `assets/data/waste-calendar.axams.json` aus den Live-Quellen erzeugt.
- `assets/data/.gitkeep` entfernt, weil `assets/data/` jetzt durch die echte JSON-Datei versionierbar ist.
- JSON-Aufbau:
  - `schemaVersion: 1`
  - `municipality: "Axams"`
  - `area: "Axams Dorf; Biomuell westlich Axamer Bach"`
  - `source.type: "axams-ical"`
  - `source.pages[]` mit `collectionId`, `pageUrl`, `icalUrl`
  - `collections[]` in stabiler Collection-Reihenfolge
  - `dates[]` sortiert nach `date`, `title`, `sourceUid`
- Nicht im App-JSON:
  - `generatedAt`
  - `fetchedAt`
  - `validUntil`
  - `warnings`
  - `diagnostics`
  - `description`
  - `endDate`/`DTEND`

Betroffene Dateien:

- `scripts/update-waste-calendar.mjs`
- `assets/data/waste-calendar.axams.json`
- `assets/data/.gitkeep`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Checks:

- `node --check scripts/update-waste-calendar.mjs`
- Generator-Smoke mit lokaler Fixture:
  - deterministische Serialisierung.
  - stabile Datumssortierung.
  - keine verbotenen Felder im JSON.
  - korrektes `source.pages[]`-Mapping.
- Live-JSON-Smoke:
  - `node scripts/update-waste-calendar.mjs --print-json`
  - JSON ist parsebar.
  - 3 Collections.
  - 3 Source Pages.
  - Counts: `bio-west:33`, `rest-axams-dorf:16`, `gelber-sack-axams-dorf:8`.
- Schreib-Smoke:
  - `node scripts/update-waste-calendar.mjs --write-json`
  - Ziel: `assets/data/waste-calendar.axams.json`.
- Combined-CLI-Smoke:
  - `--print-json --write-json` liefert parsebares JSON auf stdout.
  - Schreibmeldung geht in diesem Modus auf stderr.
- JSON-Contract-Check:
  - Root-Key-Reihenfolge: `schemaVersion`, `municipality`, `area`, `source`, `collections`.
  - `source.pages[]`-Keys: `collectionId`, `pageUrl`, `icalUrl`.
  - `collections[]`-Keys: `id`, `label`, `area`, `hint`, `dates`.
  - `dates[]`-Keys: `date`, `title`, `sourceUid`.
  - Collection-Reihenfolge: `bio-west`, `rest-axams-dorf`, `gelber-sack-axams-dorf`.
  - UTF-8-Smoke fuer offiziellen Titel `Biomuell` mit Umlaut im gespeicherten JSON.
- `git diff --check -- scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json`

Code Review:

- JSON-Erzeugung nutzt die S4.2-Collection-Reihenfolge als stabile Reihenfolge.
- `source.pages[].icalUrl` wird aus dem effektiv verwendeten Discovery-Ergebnis uebernommen.
- `dates[]` uebernimmt nur `date`, `title` und `sourceUid`; Parser-Felder `description` und `endDate` werden bewusst nicht weitergereicht.
- `serializeWasteCalendarJson(...)` nutzt stabile 2-Space-Formatierung und genau einen finalen Zeilenumbruch.
- `--write-json` legt das Zielverzeichnis bei Bedarf an und schreibt UTF-8.
- Kein `package.json`, keine neue Dependency und keine App-Laufzeitlogik.

Contract Review:

- S4.4 erfuellt den S2/S3-JSON-Vertrag:
  - stabiles lokales JSON unter `assets/data/waste-calendar.axams.json`.
  - keine laufzeitabhaengigen Zeitstempel.
  - keine fluechtigen Warn-/Diagnosefelder.
  - kein iCal-`DESCRIPTION` im App-JSON.
  - kein `DTEND` im App-JSON.
  - iCal- und Discovery-Wissen bleiben im Script, nicht in der App.
- S4.4 bleibt innerhalb der Roadmap-Grenzen:
  - keine UI.
  - kein Supabase.
  - kein Service Worker.
  - kein Workflow-YAML.
  - keine `.ics`-Rohdateien.
  - kein Commit.

Findings:

- S4.4-F1: Bei gleichzeitiger Nutzung von `--print-json --write-json` haette die Schreibmeldung stdout verunreinigt und das JSON fuer Pipes unparsebar gemacht.
- S4.4-F2: PowerShell-Anzeige kann UTF-8-Titel als Mojibake darstellen; Node-/Byte-Smoke bestaetigte korrekt gespeichertes UTF-8.

Korrekturen:

- Schreibmeldung wird bei gleichzeitiger JSON-Ausgabe auf stderr geschrieben.
- UTF-8-Smoke per Node eingefuehrt, damit PowerShell-Konsolenausgabe nicht als Datenfehler fehlinterpretiert wird.
- `assets/data/.gitkeep` entfernt, nachdem das echte JSON existiert.

Restrisiko:

- S4.4 erzeugt bewusst JSON aus den vorhandenen Live-Feeds, fuehrt aber noch keine vollstaendigen Plausibilitaetschecks aus.
- Dedupe-/UID-Konflikte, `DTEND`-Folgetag-Regel, Zukunftsfenster und harte Fail-Regeln fuer unplausible Quellen folgen in S4.5.

### S4.5 Ergebnisprotokoll 14.05.2026

Umsetzung:

- Plausibilitaets- und Validierungsschicht in `scripts/update-waste-calendar.mjs` ergaenzt.
- Neue Report-Funktion:
  - `buildWasteCalendarReport(...)`
- `buildWasteCalendarJson(...)` nutzt jetzt denselben validierten Report-Pfad.
- Validierungsregeln:
  - jede erwartete Collection braucht genau ein Source-Ergebnis.
  - unerwartete oder doppelte Source-Ergebnisse failen hart.
  - iCal-Feed ohne `VEVENT` failt hart.
  - `UID` ist Pflicht.
  - `DTEND` ist Pflicht und muss exakt der Folgetag von `DTSTART` sein.
  - gleiche `UID` mit gleichem Datum/Titel wird collection-lokal dedupliziert.
  - gleiche `UID` mit anderem Datum oder Titel failt hart.
  - gleiches Datum und gleicher Titel mit anderer `UID` failt hart.
  - jede Collection braucht mindestens einen Zukunftstermin nach dem Laufdatum.
  - letztes Zukunftsdatum unter 30 Tagen failt hart.
  - letztes Zukunftsdatum zwischen 30 und 59 Tagen erzeugt eine Warnung, bleibt aber erlaubt.
  - 60 oder mehr Tage Zukunft bleiben ohne Warnung.
- Warnungen werden nur geloggt und nicht ins App-JSON geschrieben.
- Discovery-Fallback-Warnungen werden jetzt auch im JSON-Schreib-/Print-Modus geloggt.

Betroffene Dateien:

- `scripts/update-waste-calendar.mjs`
- `assets/data/waste-calendar.axams.json`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Checks:

- `node --check scripts/update-waste-calendar.mjs`
- Dedupe-/Warn-Smoke:
  - exakte UID-Dublette wird einmal ausgegeben.
  - 37 Tage Zukunft erzeugen Warnung, aber keinen Fehler.
  - Parser-Felder `description` und `endDate` laufen nicht ins JSON.
- Zukunftsfenster-Smoke:
  - 67 Tage Zukunft erzeugen keine Warnung.
- Fehler-Smokes:
  - widerspruechliche gleiche `UID`.
  - gleiches Datum/Titel mit unterschiedlicher `UID`.
  - fehlendes `DTEND`.
  - falsches `DTEND`.
  - Zukunftsfenster unter 30 Tagen.
  - iCal ohne `VEVENT`.
  - fehlende `UID`.
  - keine Zukunftstermine.
  - doppeltes Source-Ergebnis.
  - unerwartetes Source-Ergebnis.
  - fehlendes Source-Ergebnis.
- Live-Report-Smoke mit Run-Date `2026-05-14`:
  - `bio-west`: 33 Termine, letzter Termin `2026-12-29`.
  - `rest-axams-dorf`: 16 Termine, letzter Termin `2026-12-23`.
  - `gelber-sack-axams-dorf`: 8 Termine, letzter Termin `2026-12-15`.
  - keine Live-Warnungen.
- Live-CLI-Smoke:
  - `node scripts/update-waste-calendar.mjs --print-json`
  - stdout bleibt parsebares JSON.
  - stderr bleibt bei aktuellem Live-Stand leer.
- Schreib-Smoke:
  - `node scripts/update-waste-calendar.mjs --write-json`
  - Ziel-JSON wurde nach Validierung geschrieben.
- JSON-Contract-Check:
  - keine verbotenen Felder `generatedAt`, `fetchedAt`, `validUntil`, `warnings`, `diagnostics`, `description`, `endDate`.
  - keine doppelten `sourceUid`-Werte innerhalb einer Collection im erzeugten JSON.
  - keine doppelten Datum/Titel-Paare innerhalb einer Collection im erzeugten JSON.
- `git diff --check -- scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json`

Code Review:

- Validierung liegt vor der JSON-Serialisierung und vor `--write-json`.
- `buildWasteCalendarReport(...)` sammelt Warnungen getrennt vom Kalenderobjekt.
- Das App-JSON bleibt frei von fluechtigen Diagnosefeldern.
- Dedupe-Regeln sind collection-lokal; verschiedene Collections duerfen denselben Kalendertag haben.
- Datumsrechnungen laufen ueber UTC-Mitternacht und ISO-Datumstrings, nicht ueber lokale Uhrzeiten.
- `DTEND` wird als Folgetag validiert, aber nicht ins App-JSON geschrieben.

Contract Review:

- S4.5 erfuellt den S2/S3-Plausibilitaetsvertrag:
  - leere oder kaputte Feeds failen hart.
  - fehlende Collections failen hart.
  - UID-/Dedupe-Regeln sind umgesetzt.
  - 30-/60-Tage-Zukunftsfenster ist umgesetzt.
  - Warnungen bleiben im Log und nicht im JSON.
  - Seite-vs.-Feed-Gleichheit wird weiterhin nicht als harter Listenvergleich verwendet.
- S4.5 bleibt innerhalb der Roadmap-Grenzen:
  - keine UI.
  - kein Supabase.
  - kein Service Worker.
  - kein Workflow-YAML.
  - keine `.ics`-Rohdateien.
  - keine neue Dependency.
  - kein Commit.

Findings:

- S4.5-F1: Ein `Map`-Aufbau aus Source-Ergebnissen haette doppelte Source-Ergebnisse still ueberschreiben koennen.
- S4.5-F2: Discovery-Fallback-Warnungen waren im JSON-Schreib-/Print-Modus zunaechst nicht sichtbar.

Korrekturen:

- Doppelte und unerwartete Source-Ergebnisse failen jetzt hart.
- Discovery-Warnungen werden vor dem JSON-Build auch im `--print-json`-/`--write-json`-Pfad auf stderr geloggt.
- Fehler-Smokes fuer doppelte, unerwartete und fehlende Source-Ergebnisse ergaenzt.

Restrisiko:

- Die Plausibilitaet prueft weiterhin keine exakte Gleichheit zwischen HTML-Seitentext und Feed-Terminen; das ist laut S2/S3 bewusst nicht der Vertrag.
- Die 30-/60-Tage-Pruefung nutzt das Laufdatum. Fuer reproduzierbare Tests muss deshalb explizit ein `runDate` uebergeben werden.

### S4.6 Ergebnisprotokoll 14.05.2026

Umsetzung:

- GitHub-Actions-Workflow angelegt:
  - `.github/workflows/update-axams-waste-calendar.yml`
- `.github/workflows/.gitkeep` entfernt, weil der Workflow-Ordner jetzt eine echte Workflow-Datei enthaelt.
- Workflow-Inhalt:
  - Name: `Update Axams waste calendar`
  - Trigger:
    - `workflow_dispatch`
    - `17 3 15,30 1 *`
    - `17 3 1 4,7,10 *`
  - `permissions: contents: write`
  - `concurrency` mit Branch-/Ref-bezogener Gruppe `waste-calendar-${{ github.ref }}`
  - `actions/checkout@v4`
  - `actions/setup-node@v4` mit Node `24`
  - `node --check scripts/update-waste-calendar.mjs`
  - `node scripts/update-waste-calendar.mjs --write-json`
  - Diff-Guard auf `assets/data/waste-calendar.axams.json`
  - Commit nur bei echtem JSON-Diff
  - Commit-Autor `github-actions[bot]`
- Kein Secret und keine Dependency-Installation im Workflow.

Betroffene Dateien:

- `.github/workflows/update-axams-waste-calendar.yml`
- `.github/workflows/.gitkeep`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Checks:

- Lokale Script-Baseline:
  - `node --check scripts/update-waste-calendar.mjs`
  - `node scripts/update-waste-calendar.mjs --write-json`
- Workflow-Sichtung:
  - `Get-Content .github/workflows/update-axams-waste-calendar.yml`
- Statischer Workflow-Contract-Check per Node:
  - `workflow_dispatch` vorhanden.
  - beide Cron-Zeilen vorhanden.
  - `contents: write` vorhanden.
  - `concurrency` vorhanden.
  - `actions/checkout@v4` vorhanden.
  - `actions/setup-node@v4` vorhanden.
  - Node `24` vorhanden.
  - Syntaxcheck-Schritt vorhanden.
  - `--write-json`-Schritt vorhanden.
  - `git diff --quiet -- assets/data/waste-calendar.axams.json` vorhanden.
  - Commit-If nutzt `steps.waste_diff.outputs.changed == 'true'`.
  - `git add assets/data/waste-calendar.axams.json` vorhanden.
  - Commit-Message vorhanden.
  - Bot-Autor vorhanden.
  - keine `secrets.*`.
  - kein `npm install`, `npm ci`, `yarn` oder `pnpm`.
- Strukturcheck:
  - `.github/workflows/.gitkeep` existiert nicht mehr.
  - `.github/workflows/update-axams-waste-calendar.yml` existiert.
- Whitespace-Check:
  - kein trailing whitespace in Workflow, Script und Roadmap.
- `git diff --check -- .github/workflows/update-axams-waste-calendar.yml scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json`

Code Review:

- Der Workflow schreibt das JSON ueber den validierten Script-Pfad aus S4.5.
- Wenn Discovery, Parser oder Plausibilitaet fehlschlagen, bricht der `--write-json`-Step ab und die Diff-/Commit-Schritte laufen nicht.
- Commit erfolgt nur, wenn `git diff --quiet -- assets/data/waste-calendar.axams.json` ein echtes Diff meldet.
- `git add` ist auf genau `assets/data/waste-calendar.axams.json` begrenzt.
- Bei keinem Diff wird nur ein Log ausgegeben.
- `concurrency` reduziert Rennen zwischen manuellen und geplanten Laeufen.

Contract Review:

- S4.6 erfuellt den S2/S3-Workflow-Vertrag:
  - seltener Zeitplan.
  - Jaenner-Lauf am 15. und 30. Jaenner.
  - Quartalslaeufe am 1. April, 1. Juli und 1. Oktober.
  - manuell startbar.
  - `contents: write`.
  - Commit nur bei echtem JSON-Diff.
  - keine leeren oder teilweisen Datenstaende bei Script-Fehlern.
- S4.6 bleibt innerhalb der Roadmap-Grenzen:
  - keine UI.
  - kein Supabase.
  - kein Service Worker.
  - keine `.ics`-Rohdateien.
  - keine neue Dependency.
  - kein Commit.

Findings:

- S4.6-F1: Der erste Diff-Step nutzte die Step-ID `waste-diff`. Das ist in GitHub-Actions-Expressions vermeidbar unruhig.

Korrekturen:

- Step-ID auf `waste_diff` geaendert und alle `if`-Ausdruecke entsprechend angepasst.
- Statischer Contract-Check auf die finale Step-ID ergaenzt.

Restrisiko:

- Der Workflow wurde lokal statisch geprueft, aber nicht in GitHub Actions ausgefuehrt.
- Branch Protection oder Repository-Permissions koennen Bot-Commits trotz korrekter Workflow-Datei blockieren.
- GitHub Scheduled Workflows koennen verspaetet laufen oder ausfallen; `workflow_dispatch` bleibt der manuelle Nachholpfad.

### S4.7 Ergebnisprotokoll 14.05.2026

Umsetzung:

- Lokale Test-/Check-Kommandos fuer den S4-Stand dokumentiert.
- Ziel: S5 kann die Pipeline reproduzierbar pruefen, ohne die Einzelprotokolle S4.1-S4.6 durchsuchen zu muessen.
- Keine neue Pipeline-Logik.
- Keine Aenderung am App-JSON-Vertrag.

Betroffene Dateien:

- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Lokale Kernchecks:

```powershell
node --check scripts/update-waste-calendar.mjs
```

```powershell
node scripts/update-waste-calendar.mjs --check-discovery
```

```powershell
node scripts/update-waste-calendar.mjs --print-json | node --input-type=module -e "let input = ''; for await (const chunk of process.stdin) input += chunk; const data = JSON.parse(input); if (data.schemaVersion !== 1) throw new Error('schemaVersion'); if (data.collections.length !== 3) throw new Error('collections'); if (data.source.pages.length !== 3) throw new Error('source pages'); console.log(data.collections.map((collection) => collection.id + ':' + collection.dates.length).join(', '));"
```

```powershell
node scripts/update-waste-calendar.mjs --write-json
```

```powershell
@'
const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync('assets/data/waste-calendar.axams.json', 'utf8'));
const forbidden = ['generatedAt', 'fetchedAt', 'validUntil', 'warnings', 'diagnostics', 'description', 'endDate'];
const serialized = JSON.stringify(data);
for (const field of forbidden) {
  if (serialized.includes(field)) throw new Error(`Forbidden field leaked: ${field}`);
}
for (const collection of data.collections) {
  const seenUid = new Set();
  const seenDateTitle = new Set();
  for (const item of collection.dates) {
    if (seenUid.has(item.sourceUid)) throw new Error(`Duplicate UID in JSON: ${collection.id}`);
    seenUid.add(item.sourceUid);
    const dateTitle = `${item.date}\u0000${item.title}`;
    if (seenDateTitle.has(dateTitle)) throw new Error(`Duplicate date/title in JSON: ${collection.id}`);
    seenDateTitle.add(dateTitle);
  }
}
console.log(data.collections.map((collection) => `${collection.id}:${collection.dates.length}`).join(', '));
'@ | node -
```

```powershell
@'
const fs = require('node:fs');
const workflow = fs.readFileSync('.github/workflows/update-axams-waste-calendar.yml', 'utf8');
const required = [
  'workflow_dispatch:',
  'cron: "17 3 15,30 1 *"',
  'cron: "17 3 1 4,7,10 *"',
  'contents: write',
  'concurrency:',
  'group: waste-calendar-${{ github.ref }}',
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'node-version: "24"',
  'node --check scripts/update-waste-calendar.mjs',
  'node scripts/update-waste-calendar.mjs --write-json',
  'git diff --quiet -- assets/data/waste-calendar.axams.json',
  'id: waste_diff',
  "if: steps.waste_diff.outputs.changed == 'true'",
  "if: steps.waste_diff.outputs.changed == 'false'",
  'git add assets/data/waste-calendar.axams.json',
  'git commit -m "chore(waste): update Axams calendar data"',
  'github-actions[bot]',
];
for (const needle of required) {
  if (!workflow.includes(needle)) throw new Error(`Missing workflow contract: ${needle}`);
}
if (/secrets\./.test(workflow)) throw new Error('Workflow should not use secrets.');
if (/npm install|npm ci|yarn|pnpm/.test(workflow)) throw new Error('Workflow should not install dependencies.');
console.log('workflow-contract-ok');
'@ | node -
```

```powershell
git diff --check -- .github/workflows/update-axams-waste-calendar.yml scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json "docs/HESTIA Entsorgung Datenfundament Roadmap.md"
```

Optionale gezielte Fehler-Smokes fuer S5:

```powershell
@'
import { buildWasteCalendarReport } from './scripts/update-waste-calendar.mjs';
const collections = [{ id: 'test', label: 'Test', area: 'Area', hint: 'Hint', pageUrl: 'https://example.invalid/page', fallbackIcalUrl: 'https://example.invalid/feed.ics' }];
function assertFail(name, feed, expected) {
  try {
    buildWasteCalendarReport([{ collectionId: 'test', icalUrl: 'https://example.invalid/feed.ics', feedText: feed }], collections, { runDate: '2026-05-14' });
    throw new Error(`${name} should fail`);
  } catch (error) {
    if (!expected.test(error.message)) throw error;
    console.log(`${name}-ok`);
  }
}
assertFail('empty-feed', 'BEGIN:VCALENDAR\nEND:VCALENDAR', /no VEVENT/);
assertFail('missing-uid', 'BEGIN:VCALENDAR\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:20260720\nDTEND;VALUE=DATE:20260721\nSUMMARY:A\nEND:VEVENT\nEND:VCALENDAR', /missing required field UID/);
assertFail('short-window', 'BEGIN:VCALENDAR\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:20260601\nDTEND;VALUE=DATE:20260602\nSUMMARY:A\nUID:u1\nEND:VEVENT\nEND:VCALENDAR', /future window is 18 days/);
'@ | node --input-type=module -
```

Checks in S4.7 ausgefuehrt:

- `node --check scripts/update-waste-calendar.mjs`
- `node scripts/update-waste-calendar.mjs --check-discovery`
- `node scripts/update-waste-calendar.mjs --print-json` mit JSON-Parse-Smoke.
- `node scripts/update-waste-calendar.mjs --write-json`
- JSON-Contract-Smoke gegen `assets/data/waste-calendar.axams.json`.
- Workflow-Contract-Smoke gegen `.github/workflows/update-axams-waste-calendar.yml`.
- `git diff --check -- .github/workflows/update-axams-waste-calendar.yml scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json "docs/HESTIA Entsorgung Datenfundament Roadmap.md"`

Code Review:

- S4.7 fuehrt keine Codeaenderung ein.
- Die dokumentierten Kommandos verwenden vorhandene Script-Exports und CLI-Modi.
- Die Checks decken Syntax, Discovery, Live-JSON, gespeichertes JSON, Workflow-Vertrag und Whitespace ab.

Contract Review:

- S4.7 bleibt innerhalb der Roadmap-Grenzen:
  - keine UI.
  - kein Supabase.
  - kein Service Worker.
  - keine `.ics`-Rohdateien.
  - keine neue Dependency.
  - kein Commit.
- Die Kommandos pruefen den S2/S3-Vertrag, ohne den JSON-Vertrag zu erweitern.

Findings:

- Keine S4.7-Findings.

Korrekturen:

- Keine Korrekturen noetig.

Restrisiko:

- Die Workflow-Ausfuehrung selbst bleibt lokal nicht pruefbar; S4.7 dokumentiert nur statische Workflow-Pruefungen und lokale Script-Smokes.

### S4.8/S4.9 Ergebnisprotokoll 14.05.2026

Umsetzung:

- S4.8 Code Review und Contract Review fuer den gesamten S4-Stand durchgefuehrt.
- S4.9 Schritt-Abnahme und Commit-Empfehlung dokumentiert.
- Eine kleine CLI-Haertung umgesetzt:
  - unbekannte `--...`-Argumente failen jetzt hart statt still als Discovery-Lauf durchzugehen.
- Keine neue Produktlogik.
- Keine UI-Anbindung.

Betroffene Dateien:

- `scripts/update-waste-calendar.mjs`
- `docs/HESTIA Entsorgung Datenfundament Roadmap.md`

Review-Basis:

- `scripts/update-waste-calendar.mjs`
- `.github/workflows/update-axams-waste-calendar.yml`
- `assets/data/waste-calendar.axams.json`
- S1-S3-Vertrag in dieser Roadmap
- S4.1-S4.7 Ergebnisprotokolle

Code Review:

- Discovery:
  - Axams-Seiten sind primaerer Pfad.
  - iCal-Fallbacks sind dokumentiert und sichtbar.
  - `CalendarService.ashx`-Links werden aus HTML-Ankern extrahiert.
  - HTML-Entity-Decoding fuer hrefs ist vorhanden.
- Parser:
  - Zeilenfaltung wird aufgeloest.
  - `VEVENT`-Bloecke werden isoliert.
  - `VALARM` wird vor Feldmapping entfernt.
  - `DTSTART`, `DTEND`, `SUMMARY`, `UID`, `DESCRIPTION` werden gelesen.
  - `DESCRIPTION` bleibt Parser-/Prueffeld und geht nicht ins App-JSON.
  - `DTSTART`/`DTEND` muessen `VALUE=DATE` nutzen.
  - ungueltige Kalenderdaten failen.
- Validierung:
  - fehlende, doppelte oder unerwartete Sources failen.
  - `UID` ist Pflicht.
  - `DTEND` ist Pflicht und muss Folgetag sein.
  - Dedupe-Regeln sind collection-lokal umgesetzt.
  - 30-/60-Tage-Zukunftsfenster ist umgesetzt.
- JSON:
  - deterministische Struktur.
  - stabile Collection-Reihenfolge.
  - stabile Datensortierung.
  - kein `generatedAt`, `fetchedAt`, `validUntil`, `warnings`, `diagnostics`, `description`, `endDate`.
  - UTF-8-JSON wird korrekt geschrieben.
- Workflow:
  - `workflow_dispatch` vorhanden.
  - beide Cron-Zeilen vorhanden.
  - `contents: write` vorhanden.
  - `concurrency` vorhanden.
  - Commit nur bei Diff auf `assets/data/waste-calendar.axams.json`.
  - keine Secrets.
  - keine Dependency-Installation.
- CLI:
  - `--check-discovery`, `--print-json`, `--write-json` funktionieren.
  - unbekannte Argumente failen jetzt hart.

Contract Review:

- S4 erfuellt den S1-S3-Vertrag:
  - Offizielle Axams-Quellen werden in lokales JSON uebersetzt.
  - HESTIA-App, UI, Service Worker, Supabase, Auth, RLS und Household-Key bleiben unberuehrt.
  - Keine Push-, Reminder-, Kalender- oder Interaktionslogik.
  - Kein Root-`package.json`, keine neue Dependency.
  - Keine `.ics`-Rohdaten werden versioniert.
  - App-JSON ist stabil und klein.
  - Fehlerhafte, leere oder unplausible Quellen koennen keinen Teilstand committen.
  - Warnungen bleiben Log-Ausgabe, nicht JSON-Vertrag.
  - Workflow committet nur bei echtem JSON-Diff.

Checks:

- `node --check scripts/update-waste-calendar.mjs`
- `node scripts/update-waste-calendar.mjs --check-discovery`
- `node scripts/update-waste-calendar.mjs --unknown`
  - erwarteter Hard Fail.
- `node scripts/update-waste-calendar.mjs --print-json` mit JSON-Parse-Smoke.
- `node scripts/update-waste-calendar.mjs --write-json`
- Live-Report-Smoke mit `runDate: 2026-05-14`:
  - `bio-west`: 33 Termine, letzter Termin `2026-12-29`.
  - `rest-axams-dorf`: 16 Termine, letzter Termin `2026-12-23`.
  - `gelber-sack-axams-dorf`: 8 Termine, letzter Termin `2026-12-15`.
  - keine Live-Warnungen.
- JSON-Contract-Smoke:
  - Root-Keys korrekt.
  - Collection-Reihenfolge korrekt.
  - `dates[]`-Keys korrekt.
  - keine verbotenen Felder.
  - keine doppelten `sourceUid`-Werte je Collection.
  - keine doppelten Datum/Titel-Paare je Collection.
- Workflow-Contract-Smoke:
  - Trigger, Cron, Permissions, Concurrency, Diff-Guard, Commit-Guard und Bot-Autor vorhanden.
  - keine Secrets.
  - keine Dependency-Installation.
- Scope-Scan:
  - keine Treffer fuer `localStorage`, `supabase`, `serviceWorker`, `navigator.serviceWorker`.
  - keine Root-`package.json`/Lockfiles.
- `git diff --check -- .github/workflows/update-axams-waste-calendar.yml scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json "docs/HESTIA Entsorgung Datenfundament Roadmap.md"`
- ASCII-Check fuer Script, Workflow und Roadmap.

Findings:

- S4.8-F1: Unbekannte CLI-Argumente wurden vor dem Review still ignoriert und fuehrten dann zu einem normalen Discovery-Lauf.

Korrekturen:

- `ALLOWED_ARGS` und CLI-Argumentvalidierung eingefuehrt.
- Smoke fuer unbekanntes Argument ergaenzt:
  - `node scripts/update-waste-calendar.mjs --unknown` muss fehlschlagen.

Schritt-Abnahme:

- S4.1-S4.9 sind abgeschlossen.
- Das S4-Exit-Kriterium ist erfuellt:
  - lokaler Trockenlauf kann JSON erzeugen.
  - JSON ist validiert.
  - Workflow kann validierten JSON-Lauf ausfuehren.
  - Diff-Guard verhindert Commit ohne echte Datenaenderung.
- S5 bleibt als eigener Pruefblock offen und soll die dokumentierten Checks nochmal als Gesamtpruefung ausfuehren.

Commit-Empfehlung:

- Noch keinen Commit waehrend dieses Schritts gemacht.
- Naheliegender Commit nach S5/S6 oder nach expliziter Freigabe:
  - `feat(waste): add Axams waste calendar data pipeline`

Restrisiko:

- GitHub Actions wurde lokal nur statisch geprueft, nicht auf GitHub ausgefuehrt.
- Bot-Push kann spaeter durch Repository-Permissions oder Branch Protection blockiert werden.
- Axams-Seitenstruktur kann sich aendern; Fallback und harte Fehler sind dafuer vorbereitet.

## S5 - Tests, Code Review und Contract Review

Ziel:

- Datenpipeline technisch und fachlich pruefen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Scripts.
- S5.2 Parser-Test mit Fixture-iCal.
- S5.3 Live-Feed-Smoke gegen die drei Axams-Quellen.
- S5.4 JSON-Contract-Check:
  - valide JSON-Struktur
  - drei Collections
  - ISO-Daten
  - sortierte Termine
  - stabile Reihenfolge
- S5.5 Determinismus-Smoke:
  - Script zweimal laufen lassen
  - zweiter Lauf erzeugt kein Diff
- S5.6 Fehlerfall-Smoke soweit lokal moeglich:
  - leerer Feed
  - fehlender Feed
  - ungueltiges Datum
- S5.7 Workflow-/YAML-Check, soweit lokal verfuegbar.
- S5.8 `git diff --check`.
- S5.9 Code Review gegen Bruchrisiken.
- S5.10 Contract Review gegen README, PRODUCT und diese Roadmap.
- S5.11 Nicht lokal pruefbare Checks dokumentieren:
  - echter GitHub-Schedule-Lauf
  - Bot-Commit im Repo
- S5.12 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Gepruefter Parser-/Action-Stand.
- Klare Liste ausgefuehrter und nicht lokal verfuegbarer Checks.

Exit-Kriterium:

- Alle lokal moeglichen Checks sind erledigt oder bewusst als nicht verfuegbar markiert.

### S5 Ergebnisprotokoll 14.05.2026

Umsetzung:

- S5 komplett durchlaufen.
- Alle lokal moeglichen Checks aus S5.1-S5.10 ausgefuehrt.
- Nicht lokal pruefbare Checks aus S5.11 explizit markiert.
- Keine neuen S5-Codefindings.
- Keine Korrekturen noetig.

S5.1 `node --check`:

- Ausgefuehrt:
  - `node --check scripts/update-waste-calendar.mjs`
- Ergebnis:
  - OK.

S5.2 Parser-Test mit Fixture-iCal:

- Ausgefuehrt:
  - Inline-Fixture mit:
    - CRLF.
    - gefaltetem `SUMMARY`.
    - `DTSTART;VALUE=DATE`.
    - `DTEND;VALUE=DATE`.
    - `UID`.
    - `DESCRIPTION` mit `&nbsp;` und iCal-`\n`.
    - verschachteltem `VALARM` mit `DESCRIPTION:Reminder`.
- Erwartung:
  - Titel wird zu `Gelber Sack`.
  - Datum wird `2026-06-02`.
  - `DTEND` wird `2026-06-03`.
  - `VALARM`-Description ueberschreibt die fachliche Description nicht.
- Ergebnis:
  - OK.

S5.3 Live-Feed-Smoke:

- Ausgefuehrt:
  - `discoverAllSources()`
  - `parseIcalEvents(...)` fuer alle drei Quellen.
- Ergebnis:
  - `bio-west`: 33 Termine, `2026-05-19` bis `2026-12-29`, Fallback `no`.
  - `rest-axams-dorf`: 16 Termine, `2026-05-28` bis `2026-12-23`, Fallback `no`.
  - `gelber-sack-axams-dorf`: 8 Termine, `2026-06-02` bis `2026-12-15`, Fallback `no`.

S5.4 JSON-Contract-Check:

- Ausgefuehrt gegen:
  - `assets/data/waste-calendar.axams.json`
- Geprueft:
  - valides JSON.
  - `schemaVersion: 1`.
  - `municipality: "Axams"`.
  - `area: "Axams Dorf; Biomuell westlich Axamer Bach"`.
  - `source.type: "axams-ical"`.
  - 3 `source.pages[]`.
  - 3 `collections[]`.
  - stabile Collection-Reihenfolge:
    - `bio-west`
    - `rest-axams-dorf`
    - `gelber-sack-axams-dorf`
  - ISO-Daten mit echter Kalenderdatumspruefung.
  - sortierte Termine.
  - `dates[]`-Keys exakt `date`, `title`, `sourceUid`.
  - keine verbotenen Felder:
    - `generatedAt`
    - `fetchedAt`
    - `validUntil`
    - `warnings`
    - `diagnostics`
    - `description`
    - `endDate`
- Ergebnis:
  - OK.

S5.5 Determinismus-Smoke:

- Ausgefuehrt:
  - `node scripts/update-waste-calendar.mjs --write-json`
  - zweiter Lauf direkt danach.
  - Dateiinhalte vor/nach zweitem Lauf verglichen.
- Ergebnis:
  - OK.
  - Zweiter Lauf erzeugte keine JSON-Aenderung.

S5.6 Fehlerfall-Smoke:

- Lokal moeglich und ausgefuehrt:
  - leerer Feed: Hard Fail.
  - fehlender Feed ueber ungueltige Test-Quelle: Hard Fail.
  - ungueltiges Datum `20261340`: Hard Fail.
- Ergebnis:
  - OK.

S5.7 Workflow-/YAML-Check:

- Ausgefuehrt gegen:
  - `.github/workflows/update-axams-waste-calendar.yml`
- Statisch geprueft:
  - `workflow_dispatch`.
  - Cron `17 3 15,30 1 *`.
  - Cron `17 3 1 4,7,10 *`.
  - `contents: write`.
  - `concurrency`.
  - `actions/checkout@v4`.
  - `actions/setup-node@v4`.
  - Node `24`.
  - `node --check scripts/update-waste-calendar.mjs`.
  - `node scripts/update-waste-calendar.mjs --write-json`.
  - `git diff --quiet -- assets/data/waste-calendar.axams.json`.
  - `id: waste_diff`.
  - Commit- und No-Diff-Guards.
  - `git add assets/data/waste-calendar.axams.json`.
  - Bot-Autor.
  - keine `secrets.*`.
  - keine Dependency-Installation.
- Ergebnis:
  - OK.

S5.8 `git diff --check`:

- Ausgefuehrt:
  - `git diff --check -- .github/workflows/update-axams-waste-calendar.yml scripts/update-waste-calendar.mjs assets/data/waste-calendar.axams.json "docs/HESTIA Entsorgung Datenfundament Roadmap.md"`
- Ergebnis:
  - OK.

S5.9 Code Review gegen Bruchrisiken:

- Geprueft:
  - keine App-/UI-Beruehrung.
  - keine Supabase-/Auth-/RLS-/Household-Key-Beruehrung.
  - keine Service-Worker-Beruehrung.
  - keine Push-/Reminder-Logik.
  - keine neue Dependency.
  - keine Root-`package.json` oder Lockfiles.
  - keine `.ics`-Rohdaten.
  - Fallback und harte Fehler sind vorhanden.
  - `DTEND` wird validiert, nicht ausgegeben.
  - Dedupe ist collection-lokal.
- Ergebnis:
  - OK.

S5.10 Contract Review gegen README, PRODUCT und Roadmap:

- README/PRODUCT-Kern:
  - HESTIA bleibt ruhiges Haushaltswerkzeug.
  - keine Ausweitung zu Organizer, Kalender, Reminder- oder SaaS-Feature.
  - Einkaufslisten-Vertrag bleibt unberuehrt.
- Roadmap-Vertrag:
  - Roadmap 5A baut nur das Datenfundament.
  - lokales JSON ist einziger App-Vertrag.
  - keine UI.
  - keine Runtime-/Service-Worker-Anbindung.
  - keine Supabase-Aenderung.
- Ergebnis:
  - OK.

S5.11 Nicht lokal pruefbare Checks:

- Nicht lokal pruefbar:
  - echter GitHub-Schedule-Lauf auf GitHub.
  - manueller `workflow_dispatch`-Lauf auf GitHub.
  - Bot-Commit und Bot-Push im echten Repository.
  - Wirkung moeglicher Branch-Protection- oder Repository-Permission-Regeln.
- Status:
  - Als Restpruefung fuer Stephan/GitHub markiert.

S5.12 Schritt-Abnahme:

- Alle lokal moeglichen Checks sind erledigt.
- Keine S5-Findings.
- Keine S5-Korrekturen noetig.
- S5-Exit-Kriterium erfuellt.

Commit-Empfehlung:

- Noch keinen Commit gemacht.
- Naheliegender Commit nach S6 oder nach expliziter Freigabe:
  - `feat(waste): add Axams waste calendar data pipeline`

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Datenvertrag, Wartung und QA als Source of Truth dokumentieren.

Substeps:

- S6.1 `docs/modules/Waste Module Overview.md` neu anlegen und Datenquellen-, Action-, Parser-, JSON- und Fehlerstrategie-Kapitel dokumentieren.
- S6.2 Deployment Module Overview um GitHub-Action-Vertrag erweitern.
- S6.3 PWA Install Module Overview nur aktualisieren, wenn das JSON spaeter in den Cache-Vertrag aufgenommen wird.
- S6.4 `docs/QA_CHECKS.md` um Datenpipeline-Smokes erweitern.
- S6.5 `docs/future roadmaps.md` nach Abschluss aktualisieren.
- S6.6 Roadmap mit Ergebnisprotokollen aktualisieren.
- S6.7 Finaler Contract Review:
  - Roadmap vs. Script
  - Roadmap vs. Workflow
  - Roadmap vs. JSON
  - Roadmap vs. Doku
- S6.8 Abschluss-Abnahme.
- S6.9 Commit-Empfehlung.
- S6.10 Archiv-Entscheidung.

Output:

- Datenpipeline, Doku, QA und Roadmap sprechen denselben Vertrag.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll 14.05.2026

Umsetzung:

- `docs/modules/Waste Module Overview.md` neu angelegt.
- `docs/modules/Deployment Module Overview.md` um GitHub-Actions-Datenpflege erweitert.
- `docs/QA_CHECKS.md` um Entsorgungsdaten-Pipeline-Smokes erweitert.
- `docs/future roadmaps.md` beim Punkt Entsorgung Datenfundament auf den erreichten Stand aktualisiert.
- `README.md` um Link zur Waste Module Overview erweitert.
- `docs/modules/PWA Install Module Overview.md` bewusst nicht geaendert:
  - Das JSON wird noch nicht von der App gelesen.
  - Das JSON ist noch nicht Teil des Service-Worker-/PWA-Cache-Vertrags.
- Roadmap mit S6-Ergebnisprotokoll aktualisiert.

Neue Waste Module Overview:

- Dokumentiert:
  - Produktgrenze.
  - Dateien.
  - offizielle Axams-Quellen.
  - Discovery-Vertrag.
  - Parser-Vertrag.
  - Validierungsvertrag.
  - JSON-Vertrag.
  - GitHub-Action-Vertrag.
  - lokale Checks.
  - nicht lokal pruefbare Restpruefungen.
  - Definition of Done.
- Bewusst nicht dokumentiert als erledigt:
  - UI.
  - Home-Einstieg.
  - Recyclinghof-Status.
  - Push-/Reminder-Logik.

Finaler Contract Review:

- Roadmap vs. Script:
  - Collection-IDs stimmen.
  - Source-Seiten stimmen.
  - Parser verarbeitet `VEVENT`, `VALARM`, `DTSTART`, `DTEND`, `SUMMARY`, `UID`, `DESCRIPTION`.
  - Validierung deckt UID-/Dedupe-, `DTEND`- und Zukunftsfenster-Regeln ab.
  - JSON wird deterministisch geschrieben.
  - unbekannte CLI-Argumente failen hart.
- Roadmap vs. Workflow:
  - Workflow-Pfad stimmt.
  - `workflow_dispatch` stimmt.
  - beide Cron-Zeilen stimmen.
  - `contents: write` stimmt.
  - `concurrency` stimmt.
  - Node 24 stimmt.
  - Diff-Guard auf `assets/data/waste-calendar.axams.json` stimmt.
  - Commit ist auf das JSON begrenzt.
- Roadmap vs. JSON:
  - `schemaVersion: 1`.
  - `municipality: "Axams"`.
  - `area: "Axams Dorf; Biomuell westlich Axamer Bach"`.
  - 3 `source.pages[]`.
  - 3 `collections[]`.
  - keine verbotenen Laufzeit-/Diagnosefelder.
- Roadmap vs. Doku:
  - Waste Module Overview beschreibt den Datenvertrag.
  - Deployment Module Overview beschreibt den Action-Betrieb.
  - QA_CHECKS enthaelt lokale Smokes und GitHub-Restpruefungen.
  - Future Roadmaps markiert Datenfundament als umgesetzt, UI und Erinnerungen bleiben offen.
  - README verlinkt die neue Module Overview.

Checks:

- `node --check scripts/update-waste-calendar.mjs`
- `node scripts/update-waste-calendar.mjs --print-json` mit Parse-Smoke.
- JSON-Contract-Smoke gegen `assets/data/waste-calendar.axams.json`.
- Workflow-Contract-Smoke gegen `.github/workflows/update-axams-waste-calendar.yml`.
- Scope-Scan gegen App-/Supabase-/Service-Worker-/Push-Beruehrungen.
- Check auf fehlende Root-`package.json`/Lockfiles.
- `git diff --check` fuer Script, Workflow, JSON und aktualisierte Doku.
- ASCII-Check fuer neu/geaenderte eigene Doku- und Script-Dateien.

Findings:

- S6-F1: Die neue Waste Module Overview war in der README-Referenzliste noch nicht auffindbar.

Korrekturen:

- README um Link zu `docs/modules/Waste Module Overview.md` erweitert.

Nicht lokal pruefbar:

- Echter GitHub-Schedule-Lauf.
- Manueller `workflow_dispatch`-Lauf auf GitHub.
- Bot-Commit/Bot-Push im echten Repository.
- Branch-Protection- oder Repository-Permission-Wirkung.

Abschluss-Abnahme:

- S6 ist abgeschlossen.
- Roadmap 5A Datenfundament ist lokal commitbereit.
- S6-Exit-Kriterium ist erfuellt: Datenpipeline, Doku, QA und Roadmap sprechen denselben Vertrag.

Commit-Empfehlung:

- Noch keinen Commit gemacht.
- Empfohlener Commit:
  - `feat(waste): add Axams waste calendar data pipeline`

Archiv-Entscheidung:

- Noch nicht archivieren, solange der Commit und der erste echte GitHub-Actions-Lauf nicht bestaetigt sind.
- Nach Commit plus erfolgreichem GitHub-Run kann diese Roadmap in `docs/archive/` als DONE abgelegt werden.

## Smokechecks / Regression

- Parser erzeugt valides JSON.
- JSON enthaelt Biomuell westlich, Restmuell und Gelber Sack.
- Termine sind sortiert.
- Script ist deterministisch.
- Action ist manuell startbar.
- Action hat seltenen Jahres-/Quartalsplan.
- Action committet nur bei echtem Diff.
- Leere oder kaputte Feeds werden nicht still als leeres App-JSON akzeptiert.
- Keine `.ics`-Dateien werden versioniert.
- Keine UI wurde eingefuehrt.
- Shopping, Writing und Home bleiben unberuehrt.

## Abnahmekriterien

- HESTIA hat ein belastbares lokales Entsorgungsdaten-JSON.
- Die Gemeinde Axams bleibt Source of Truth.
- Kein Feiertagsraten wurde eingefuehrt.
- Die Datenpipeline ist selten, wartbar und transparent.
- Roadmap B kann auf dem JSON aufbauen, ohne iCal oder GitHub Action verstehen zu muessen.
