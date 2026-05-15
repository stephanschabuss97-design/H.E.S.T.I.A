# HESTIA Roadmap 5B - Entsorgung UI (DONE)

## Ziel (klar und pruefbar)

HESTIA soll einen ruhigen Entsorgungsbereich bekommen, der die naechsten relevanten Muelltermine und den Recyclinghof-Status alltagstauglich zeigt, ohne aus HESTIA einen allgemeinen Familien-Organizer oder ein Gemeindeportal zu machen.

Pruefbare Zieldefinition:

- Home bekommt eine dritte Kachel `Muell`/`Entsorgung`, die `Schreiben` und `Einkaufen` nicht ueberholt.
- Die Home-Kachel darf eine kleine dynamische Ticker-Meldung zum naechsten relevanten Muelltermin zeigen.
- Es gibt einen eigenen Entsorgungsmodus.
- Der Modus liest das lokale JSON aus Roadmap 5A.
- Angezeigt werden:
  - naechster relevanter Termin
  - Biomuell
  - Restmuell
  - Gelber Sack
  - Recyclinghof-Status und naechste Oeffnung
- Offline-/Fallback-Zustaende sind ehrlich und ruhig.
- Keine Push-, Reminder- oder Kalenderlogik wird eingefuehrt.

## Problemzusammenfassung

Die Entsorgungsdaten allein helfen noch nicht im Alltag. Der Nutzen entsteht erst, wenn HESTIA schnell beantwortet: Was muss als Naechstes raus? Ist der Recyclinghof gerade offen? Wann oeffnet er wieder? Diese Fragen passen gut zur Haushaltsperipherie, solange sie leise und informativ bleiben.

Die UI darf nicht wie ein Dashboard riechen und darf die Kernintentionen `Schreiben` und `Einkaufen` nicht verwischen. Der Entsorgungsbereich ist deshalb ein kleiner dritter Haushaltsmodus, nicht der Start eines Familien-Organizers.

## Scope

- Home:
  - dritte Kachel fuer `Muell`/`Entsorgung`
  - klare Hierarchie nach den Kernintentionen `Schreiben` und `Einkaufen`
  - kleine dynamische Ticker-Meldung aus dem lokalen Waste-JSON
  - bei mehreren Terminen am selben naechsten Tag kurze Zusammenfassung, z. B. `Morgen Gelber Sack und Restmuell`
  - Klick auf die Kachel oeffnet die Muelluebersicht
- Entsorgungsmodus:
  - neue Screen-Struktur in `index.html`
  - Router-Anbindung
  - Modul fuer Entsorgungsanzeige
  - Laden von `assets/data/waste-calendar.axams.json`
  - Berechnung von `heute`, `morgen`, `in X Tagen`, konkretem Datum
- Muelltermine:
  - naechster Gesamttermin
  - je Collection naechster Termin
  - kurze Hinweise wie `Ab 7:00 bereitstellen`
- Recyclinghof:
  - statische Oeffnungszeiten fuer Roadmap B
  - `jetzt offen` / `geschlossen`
  - naechste Oeffnung
  - Adresse/Kontakt als ruhige Detailinfo
- PWA/Offline:
  - JSON in Cache-Vertrag aufnehmen, falls Roadmap A es nicht getan hat
  - Fallback bei fehlendem oder altem JSON
- Doku und QA:
  - bestehende `Waste Module Overview.md` um UI-, Recyclinghof- und Fallback-Kapitel erweitern
  - Home-, CSS-, PWA- und QA-Dokus aktualisieren

## Not in Scope

- Keine GitHub Action und kein iCal-Parser; das ist Roadmap 5A.
- Keine Push-, Reminder- oder Notification-Logik.
- Keine Home-Ticker-Logik ausserhalb des lokalen Waste-JSON.
- Kein Badge-, Countdown-, Aufgaben- oder Alarmverhalten fuer den Home-Ticker.
- Keine Kalenderintegration.
- Keine automatische Standortlogik.
- Keine Verwaltung mehrerer Gemeinden.
- Keine Auswahl zwischen Biomuell Ost/West; fuer Stephan gilt westlich Axamer Bach.
- Keine Admin-Oberflaeche fuer Terminpflege.
- Keine Live-Abfrage der Gemeinde beim App-Start.
- Keine Supabase-, SQL-, RLS-, Auth- oder Household-Key-Aenderung.
- Keine Aenderung am Einkaufslisten-Datenvertrag `name`, `quantity`, `unit`, `inCart`.
- Keine Umgestaltung von Shopping, Writing oder Kassa-Karussell.
- Keine Recyclinghof-Schliesstage aus PDF-Scraping in V1.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`
- `app/core/router.js`
- `app/core/pwa-install.js`, nur lesend
- `app/modules/home.js`
- `app/modules/waste.js`, neu
- `app/styles/home.css`
- `app/styles/layout.css`
- `app/styles/ui.css`
- `app/styles/waste.css`, neu oder bewusst in bestehende Style-Grenze einsortiert
- `app/app.css`
- `assets/data/waste-calendar.axams.json`
- `sw.js`

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/QA_CHECKS.md`
- `docs/archive/HESTIA Entsorgung Datenfundament Roadmap (DONE).md`
- `docs/modules/Waste Module Overview.md`, aus Roadmap 5A, in S6 verpflichtend zu erweitern
- `docs/modules/Home Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/archive/HESTIA Home Stil Veredeln Roadmap (DONE).md`
- `docs/archive/HESTIA Kassa Karussell Roadmap (DONE).md`

Regel:

- Erst Roadmap 5A und ihr JSON-Vertrag lesen.
- Dann Home-, Router-, PWA- und CSS-Vertraege lesen.
- Dann erst UI-Code aendern.

## Recyclinghof-V1-Vertrag

Statische V1-Oeffnungszeiten aus der Axams-Recyclinghof-Seite:

- Montag: 13:00 bis 18:00
- Mittwoch: 08:00 bis 12:00 und 13:00 bis 17:00
- Samstag: 07:00 bis 12:00

UI-Vertrag:

- HESTIA berechnet daraus lokal:
  - aktuell offen/geschlossen
  - naechste Oeffnung
  - heutige Oeffnungsfenster
- Offizielle Quelle bleibt `https://www.axams.gv.at/Recyclinghof_9`.
- Schliess- oder Sondertage werden in Roadmap B nur beruecksichtigt, wenn sie als stabiler Datenvertrag vorliegen. PDF-Scraping ist nicht V1.

## Guardrails

- `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
- `Entsorgung` ist Haushaltsperipherie, kein neuer Produktkern.
- Die UI informiert, sie draengt nicht.
- Keine roten Alarmzustaende fuer normale Termine.
- Keine Reminder-Sprache wie `du musst`.
- Kein Dashboard mit vielen Familieninfos.
- Termine muessen ehrlich sein: Wenn Daten fehlen oder alt sind, sagt HESTIA das ruhig.
- Freie Flaeche bleibt erlaubt; der Entsorgungsmodus muss nicht alles vollstellen.
- Recyclinghof und Muelltermine duerfen nicht mit Shopping-Sync oder Einkaufsliste gekoppelt werden.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules.
- Das Entsorgungsmodul liest nur lokales JSON.
- Kein iCal-Parsing im Browser.
- Kein direkter Axams-Fetch im App-Start.
- Keine neue Dependency.
- Zeitberechnungen muessen lokal, testbar und robust sein.
- Datumslogik darf keine Feiertage erraten; sie verwendet nur vorhandene Termine.
- PWA-Cache muss beruecksichtigen, dass das JSON App-Datenquelle ist.
- Der neue Screen muss auch funktionieren, wenn Supabase fehlt.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus und Roadmap 5A.
- Aendern von:
  - `index.html`
  - `app/main.js`
  - `app/core/router.js`, nur fuer neuen Screen
  - `app/modules/home.js`, nur fuer Home-Einstieg
  - `app/modules/waste.js`
  - `app/styles/home.css`
  - `app/styles/waste.css`
  - `app/app.css`
  - `sw.js`
  - `docs/modules/Waste Module Overview.md`
  - `docs/modules/Home Module Overview.md`
  - `docs/modules/CSS Module Overview.md`
  - `docs/modules/PWA Install Module Overview.md`
  - `docs/QA_CHECKS.md`
  - `docs/future roadmaps.md` beim Abschluss
  - diese Roadmap
- Lokale Checks:
  - `node --check`
  - `git diff --check`
  - lokaler HTTP-Smoke
  - Playwright-Smoke fuer Desktop/Mobile, falls verfuegbar

Forbidden:

- GitHub Action oder iCal-Parser in Roadmap B neu bauen.
- Push, Reminder oder Kalenderexport.
- Supabase-, SQL-, RLS-, Auth- oder Household-Key-Aenderungen.
- Live-Fetch der Gemeinde im Browser.
- Shopping-Abschlusslogik oder Writing-Semantik veraendern.
- Allgemeines Familien-Dashboard einfuehren.
- Standortlogik.
- PDF-Scraping.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 klaeren UI-Vertrag, Home-Hierarchie, Datumslogik und Bruchrisiken.
- S4 baut den Entsorgungsmodus substepweise.
- S5 prueft lokale UI-, Daten-, Offline-, Router- und Regression-Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnis.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 13.05.2026

Review-Frage:

- Darf HESTIA einen Entsorgungsmodus bekommen, ohne zum Familien-Organizer zu werden?

Entscheidung:

- Ja, wenn der Modus eng auf Muelltermine und Recyclinghof-Status begrenzt bleibt, ruhig formuliert ist und keine Reminder-/Dashboard-Logik einfuehrt.

Findings:

- CR-B-F1: Ein dritter Home-Einstieg kann die zwei Kernintentionen verwaessern.
- CR-B-F2: Terminanzeigen koennen schnell wie Erinnerungen oder Pflichten wirken.
- CR-B-F3: Fehlende oder alte Daten koennen falsche Sicherheit erzeugen.
- CR-B-F4: Recyclinghof-Sondertage koennen mit statischen Oeffnungszeiten kollidieren.
- CR-B-F5: Eine zu grosse UI wuerde Home oder Shopping wie ein Dashboard wirken lassen.
- CR-B-F6: Datumslogik darf keine Feiertagsverschiebungen berechnen.
- CR-B-F7: PWA-Cache kann altes JSON laenger halten, wenn der Cache-Vertrag nicht sauber ist.

Korrekturen:

- Scope nennt Entsorgung als eigenen, aber leisen Haushaltsmodus.
- Die Home-Kachel ist erlaubt, wenn sie als Haushaltsperipherie unter `Schreiben` und `Einkaufen` bleibt.
- Der Home-Ticker ist erlaubt, wenn er nur die naechste relevante Meldung aus dem lokalen JSON zeigt.
- Not in Scope grenzt Push, Reminder, Kalender, Standort, PDF-Scraping und Live-Fetch aus.
- Not in Scope grenzt Badge-, Countdown-, Aufgaben- und Alarmverhalten fuer den Home-Ticker aus.
- Guardrails verbieten draengende Copy und allgemeines Dashboard.
- Recyclinghof-Sondertage werden in V1 nur genutzt, wenn ein stabiler Datenvertrag vorliegt.
- S5 verlangt Fallback- und Offline-Smokes.
- Roadmap A bleibt Voraussetzung fuer die Terminquelle.

## Nachgezogener Contract Review Home-Ticker 15.05.2026

Review-Frage:

- Darf Home eine dritte `Muell`-/`Entsorgung`-Kachel mit dynamischer Ticker-Meldung bekommen?

Entscheidung:

- Ja, wenn die Kachel die zwei Kernintentionen nicht ueberholt, der Ticker nur aus dem lokalen Waste-JSON abgeleitet wird und die Copy informativ statt erinnernd oder alarmierend bleibt.

Vertrag:

- Erlaubt:
  - dritte Home-Kachel unter `Schreiben` und `Einkaufen`.
  - Klick auf die Kachel oeffnet die Muelluebersicht.
  - eine kurze dynamische Ticker-Meldung fuer den naechsten relevanten Termin.
  - Zusammenfassung mehrerer Collections am selben naechsten Tag.
- Nicht erlaubt:
  - Badge-, Countdown-, Alarm- oder Aufgabenlogik.
  - Push, Reminder oder Kalenderintegration.
  - Live-Fetch der Gemeinde im Browser.
  - Kopplung an Shopping-, Writing-, Supabase- oder Household-State.

Findings:

- CR-B-T1: Der Begriff `Ticker` kann wie laufende Status-/Reminder-Logik wirken.
- CR-B-T2: Eine dritte Kachel kann die Home-Hierarchie kippen, wenn sie gleich laut wie die Kernintentionen wird.
- CR-B-T3: Mehrere morgige Termine koennen auf Mobile zu langer Copy fuehren.

Korrekturen:

- Roadmap grenzt Ticker als kleine Statuszeile aus lokalem JSON ein.
- Not in Scope schliesst Badge, Countdown, Aufgaben- und Alarmverhalten aus.
- S2/S3 legen finale kurze Copy und Mobile-Kuerzungsregel fest.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System-, UI- und Datenvertragsdetektivarbeit | DONE | Roadmap 5A, Home, Router, PWA, CSS, QA, bestehende Screens, Waste-JSON und Recyclinghof-Zeiten geprueft; S1-Findings und Korrekturen dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Home-Kachel mit Ticker, Muelluebersicht, Copy-, Datums-, Recyclinghof- und Fallback-Vertrag finalisiert; S2-Findings korrigiert. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | Bruchrisiken, Copy, CSS-Owner, PWA-Cache, S4-Plan und S5-Teststrategie finalisiert; S3-Findings korrigiert. |
| S4 | Umsetzung | DONE | S4.1-S4.9 abgeschlossen: Home-Kachel, Screen, lokales JSON, Ticker, Fallbacks, Recyclinghof-Status, Waste-Styles, PWA-Cache, Touchlog-Review, Code-/Contract-Review und Abnahme erledigt. |
| S5 | Tests, Code Review und Contract Review | DONE | Lokale Syntax-, Daten-, Datums-, Recyclinghof-, Fallback-, Router-, Cache-, Regression- und Contract-Smokes erledigt; echte Browser-/Mobile-/installierte-PWA-Smokes bleiben manuell. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | Module Overviews, QA, Future Roadmaps, Roadmap-Abschluss, Contract Review und Archivierungsvorbereitung erledigt. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System-, UI- und Datenvertragsdetektivarbeit

Ziel:

- Klaeren, wie der Entsorgungsbereich in HESTIA passt und welche bestehenden Schichten betroffen sind.

Substeps:

- S1.1 README, PRODUCT, Future Roadmaps und DEV_ENVIRONMENT lesen.
- S1.2 Roadmap 5A und JSON-Vertrag lesen.
- S1.3 Home-, Router-, PWA-, CSS- und QA-Dokus lesen.
- S1.4 Bestehende Screens in `index.html` und `router.js` pruefen.
- S1.5 Home-Hierarchie pruefen:
  - dritte Kachel
  - kleinere Zusatzkachel
  - sekundaerer Haushaltsbereich
- S1.6 Waste-JSON-Beispiel lesen und benoetigte UI-Felder ableiten.
- S1.7 Recyclinghof-Oeffnungszeiten pruefen und Statuslogik skizzieren.
- S1.8 Erste Findings und offene Fragen dokumentieren.
- S1.9 S1 Contract Review.
- S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- UI-Systemkarte.
- Relevante Dateien.
- Home-Platzierungsentscheidung oder offene Varianten fuer S2.
- Daten-zu-UI-Feldkarte.

Exit-Kriterium:

- Es ist klar, welche UI-Schichten betroffen sind und wie Roadmap B auf Roadmap A aufsetzt.

### S1 Ergebnisprotokoll 15.05.2026

#### S1.1 README, PRODUCT, Future Roadmaps und DEV_ENVIRONMENT lesen

Umsetzung/Review:

- README und `PRODUCT.md` bestaetigen den Produktkern:
  - HESTIA bleibt ein ruhiges Haushaltswerkzeug.
  - `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
  - Entsorgung darf nur als Haushaltsperipherie auftreten.
  - Der Einkaufslistenvertrag `name`, `quantity`, `unit`, `inCart` bleibt unberuehrt.
- `docs/future roadmaps.md` bestaetigt Roadmap 5:
  - 5A Datenfundament ist umgesetzt und archiviert.
  - 5B UI ist der naechste Schritt.
  - 5C Erinnerungen bleibt Future Sketch und ist fuer 5B nicht umzusetzen.
- `docs/DEV_ENVIRONMENT.md` bestaetigt:
  - keine Root-Build-Pipeline.
  - JS-Syntaxchecks per Node.
  - Browser-/PWA-Smokes per lokalem Python-Server und optional globalem Playwright.
  - `.env.supabase.local` bleibt lokal; keine Secret-Werte in Doku, Logs oder Antworten.

Contract Review:

- S1 bleibt innerhalb des Produktvertrags, solange nur UI-Vertrag, Home-Hierarchie, Datenverbrauch und PWA-/CSS-/QA-Betroffenheit geklaert werden.
- Keine Erkenntnis aus S1 rechtfertigt Supabase-, SQL-, Auth-, Reminder-, Push- oder Kalenderlogik.

#### S1.2 Roadmap 5A und JSON-Vertrag lesen

Umsetzung/Review:

- Die aktive 5A-Datei wurde bereits als DONE archiviert:
  - `docs/archive/HESTIA Entsorgung Datenfundament Roadmap (DONE).md`
- 5A-Vertrag:
  - Browser/UI nutzt nur `assets/data/waste-calendar.axams.json`.
  - Keine Live-Abfrage der Gemeinde im Browser.
  - Keine iCal-Parsinglogik in der App.
  - Gemeinde Axams bleibt Source of Truth; HESTIA erfindet keine Feiertagsverschiebungen.
- JSON-Vertrag:
  - Root: `schemaVersion`, `municipality`, `area`, `source`, `collections`.
  - `source.pages[]`: `collectionId`, `pageUrl`, `icalUrl`.
  - `collections[]`: `id`, `label`, `area`, `hint`, `dates`.
  - `dates[]`: `date`, `title`, `sourceUid`.
  - Bewusst nicht vorhanden: Laufzeit-, Diagnose-, Warn- oder Gueltigkeitsfelder.

Contract Review:

- Roadmap 5B darf den 5A-Vertrag nur konsumieren, nicht erweitern.
- Fallbacks fuer fehlende oder unlesbare Daten muessen in der UI passieren, nicht durch neue Live-Quellen.

#### S1.3 Home-, Router-, PWA-, CSS- und QA-Dokus lesen

Umsetzung/Review:

- `docs/modules/Home Module Overview.md`:
  - Home ist Einstieg in genau zwei primaere Intentionen.
  - Home ist kein Dashboard, Status-Cockpit oder Haushaltsportal.
  - Neue Entsorgungsnavigation muss deshalb sichtbar sekundar bleiben.
- `docs/modules/Bootflow Module Overview.md`:
  - `app/main.js` ist zentraler Bootstrap.
  - Produktkritischer Boot bleibt Writing/Shopping/State/Sync; Entsorgung darf diesen Pfad nicht blockieren.
- `docs/modules/PWA Install Module Overview.md`:
  - neue ES-Module muessen bei App-Shell-Relevanz in den Service-Worker-Cache.
  - Service-Worker-Cache-Version muss bei Shell-/Asset-Erweiterung bewusst erhoeht werden.
- `docs/modules/CSS Module Overview.md`:
  - einziger CSS-Einstieg bleibt `app/app.css`.
  - neuer Feature-Owner fuer Entsorgung ist naheliegend `app/styles/waste.css`.
  - globale Patterns bleiben in `ui.css`/`layout.css`; Waste-spezifisches Styling gehoert nicht in Sammeldateien.
- `docs/QA_CHECKS.md`:
  - aktuelle Waste-Checks decken nur 5A-Datenpipeline ab.
  - 5B braucht spaeter eigene UI-/Offline-/Router-/Regression-Smokes.

Contract Review:

- Entsorgung darf den Home-Vertrag nicht zu "drei gleichwertigen Hauptbereichen" verschieben.
- PWA-Cache und QA muessen in S4/S6 nachgezogen werden, sobald die UI das JSON nutzt.

#### S1.4 Bestehende Screens in `index.html` und `router.js` pruefen

Umsetzung/Review:

- `index.html` enthaelt aktuell:
  - `screen-home` mit `data-screen="home"` und initial `is-active`.
  - zwei primaere Home-Buttons mit `data-nav="writing"` und `data-nav="shopping"`.
  - `screen-writing` mit Rueckweg `data-nav="home"`.
  - `screen-shopping` mit Rueckweg `data-nav="home"` und Edit-Link `data-nav="writing"`.
  - Utility/Diagnose bleibt eigener kleiner Home-Einstieg.
- `app/core/router.js` ist generisch:
  - sammelt alle `.screen`.
  - sammelt alle `[data-nav]`.
  - toggelt `is-active` anhand `screen.dataset.screen === target`.
  - keine Whitelist, keine History, keine URL-Routen.

Ableitung:

- Ein spaeteres `data-screen="waste"` plus `data-nav="waste"` passt zum bestehenden Router.
- Es braucht voraussichtlich keine Router-Architekturaenderung.
- Es gibt aktuell keine Deep-Link-/URL-Routen; 5B sollte das nicht nebenbei einfuehren.

Contract Review:

- Router-Erweiterung bleibt klein, solange sie nur den bestehenden `data-nav`-Vertrag nutzt.
- Ein Waste-Screen darf keine bestehende Writing-/Shopping-Screenstruktur umbauen.

#### S1.5 Home-Hierarchie pruefen

Gepruefte Varianten:

| Variante | S1-Bewertung |
| --- | --- |
| dritte Kachel mit eigenem Status | Moeglich, wenn sie klar als Haushaltsperipherie gestaltet wird und Schreiben/Einkaufen nicht optisch oder fachlich ueberholt. |
| kleinere Zusatzkachel | Moeglich, wenn sie zu wenig Nutzwert transportiert; Status kann dann verloren gehen. |
| sekundaerer Haushaltsbereich | Weiterhin fachlich sauber, aber nicht zwingend ohne Kachel. |

S1-Empfehlung fuer S2:

- Home behaelt `Schreiben` und `Einkaufen` als zwei primaere Intent-Karten.
- `Entsorgung` darf als dritte Home-Kachel erscheinen, wenn sie visuell ruhiger/sekundaerer bleibt als die zwei Kernintentionen.
- Die Kachel darf einen knappen, nuetzlichen Naechststatus zeigen, z. B. `Gelber Sack morgen`.
- Kein rotes Signal, keine Aufgaben- oder Reminder-Sprache und kein Dashboard-Status auf Home.
- Moegliche Home-Copy fuer S2:
  - Titel: `Muell` oder `Entsorgung`
  - Ticker statt Hint: `Morgen Gelber Sack` oder bei mehreren Terminen `Morgen Gelber Sack und Restmuell`

Contract Review:

- Die dritte Kachel ist vertragsfaehig, wenn S2 sie nicht als dritte Kernintention, sondern als ruhige Haushaltsperipherie mit knapper Statuszeile definiert.

#### S1.6 Waste-JSON-Beispiel lesen und benoetigte UI-Felder ableiten

Daten-zu-UI-Feldkarte:

| UI-Bedarf | JSON-Feld |
| --- | --- |
| Gemeinde-/Kontextzeile | `municipality`, `area` |
| Fraktions-ID fuer Rendering/Keys | `collections[].id` |
| sichtbarer Fraktionsname | `collections[].label` |
| Gebietshinweis | `collections[].area` |
| Bereitstellhinweis | `collections[].hint` |
| naechster Termin | erstes `collections[].dates[]` mit `date >= heute` |
| Datumsanzeige | `dates[].date` |
| technische Stabilitaet/Debug-Key | `dates[].sourceUid` |
| optionale Detailquelle | `source.pages[]` ueber `collectionId` |

Aktueller Datenstand am 15.05.2026:

| Collection | Termine | Naechster Termin | Letzter Termin |
| --- | ---: | --- | --- |
| `bio-west` | 33 | 2026-05-19 | 2026-12-29 |
| `rest-axams-dorf` | 16 | 2026-05-28 | 2026-12-23 |
| `gelber-sack-axams-dorf` | 8 | 2026-06-02 | 2026-12-15 |

Ableitung:

- Die UI sollte primaer `label`, `area`, `hint` und `date` verwenden.
- `title` ist offizieller Quelltext und kann als Detail/Debug-Feld erhalten bleiben, sollte aber nicht die ruhige Hauptcopy treiben.
- Wenn keine Zukunftstermine vorhanden sind, braucht die UI einen ehrlichen ruhigen Leerzustand statt Berechnung oder Live-Fetch.
- Wenn JSON fehlt oder unlesbar ist, bleibt der Entsorgungsmodus nutzbar mit Fehlercopy, aber ohne erfundene Termine.

Contract Review:

- Kein zusaetzliches Datenfeld ist fuer 5B-S1 zwingend noetig.
- Datumslogik darf nur vorhandene ISO-Daten auswerten und keine Abfuhrregeln nachbauen.

#### S1.7 Recyclinghof-Oeffnungszeiten pruefen und Statuslogik skizzieren

Quelle:

- Offizielle Axams-Seite: `https://www.axams.gv.at/Recyclinghof_9`
- Geprueft am 15.05.2026.

Gefundene Oeffnungszeiten:

| Tag | Fenster |
| --- | --- |
| Montag | 13:00-18:00 |
| Mittwoch | 08:00-12:00, 13:00-17:00 |
| Samstag | 07:00-12:00 |

Zusaetzlicher Seitenbefund:

- Die Seite verweist fuer Muellabfuhrtermine und Tage, an denen der Recyclinghof wegen Feiertagen oder besonderen Anlaessen geschlossen hat, auf eine weitere Kalenderseite.

S1-Statuslogik-Skizze:

- V1 verwendet statische Wochenfenster aus der Roadmap/Quelle.
- Berechnung lokal im Browser anhand der aktuellen lokalen Zeit.
- `offen`, wenn aktuelle Uhrzeit innerhalb eines Fensters liegt:
  - Copy-Beispiel: `Jetzt offen bis 12:00`.
- `geschlossen`, wenn ausserhalb eines Fensters:
  - naechstes spaeteres Fenster am selben Tag suchen.
  - sonst naechsten Wochentag mit Fenster suchen.
  - Copy-Beispiel: `Geschlossen, oeffnet Samstag um 07:00`.
- Mittwoch braucht zwei getrennte Fenster und Mittags-Schliesszeit.
- Sonder-Schliessungen/Feiertage werden in 5B nicht geraten.
- UI muss ehrlich bleiben:
  - moegliche Zusatzcopy fuer S2: `Ohne Sonder-Schliessungen`.

Contract Review:

- Recyclinghof V1 darf keine PDF-/Kalender-Scrapes oder Live-Statusabfragen einfuehren.
- Statische Oeffnungszeiten sind akzeptabel, wenn die Copy keine Sondertage verspricht.

#### S1.8 Erste Findings und offene Fragen dokumentieren

Findings:

- S1-F1: Eine dritte Home-Kachel kann den Vertrag verwischen, wenn sie wie eine dritte Kernintention wirkt; sie ist aber passend, wenn sie als ruhige Haushaltsperipherie mit kurzer Statuszeile gestaltet wird.
- S1-F2: `router.js` braucht fuer Waste voraussichtlich keine Architekturarbeit; ein groesserer Router-Umbau waere Scope-Drift.
- S1-F3: Sobald `app/modules/waste.js`, `app/styles/waste.css` und `assets/data/waste-calendar.axams.json` von der UI genutzt werden, muessen `app/app.css` und `sw.js` bewusst erweitert werden.
- S1-F4: Recyclinghof-Sonder-Schliessungen sind auf der offiziellen Seite als eigener Kalenderhinweis sichtbar, aber 5B hat keinen stabilen lokalen Datenvertrag dafuer.
- S1-F5: Die UI darf aus fehlenden/alten Daten keine Termine erraten und keinen Live-Fetch zur Gemeinde nachziehen.

An S2 uebergebene Klaerpunkte:

- Exakte Home-Platzierung und Gewichtung: dritte Kachel unter `Schreiben`/`Einkaufen`, aber mit klar sekundaerer Wirkung.
- Exakte Statuslogik auf Home: nur naechster relevanter Termin, mehrere Termine am selben naechsten Tag zusammenfassen.
- Exakte Copy fuer Home und Waste-Screen.
- Ob Recyclinghof-Copy explizit `ohne Sonder-Schliessungen` sagen soll oder als dezenter Quellen-/Hinweistext gefuehrt wird.
- Wie alt/leer/fehlend beim Waste-JSON visuell benannt wird, ohne Alarmton.

#### S1.9 S1 Contract Review

Review-Frage:

- Darf Roadmap 5B auf Basis von 5A eine sichtbare Entsorgungs-UI bauen, ohne HESTIA zu einem Dashboard oder Gemeindeportal zu machen?

Entscheidung:

- Ja, wenn die UI ein eigener ruhiger Modus bleibt, Home eine klar sekundaere dritte Kachel mit kurzer Ticker-Zeile zeigt, alle Termine aus dem lokalen JSON kommen und Recyclinghof V1 nur statische Oeffnungszeiten ohne Sondertage verspricht.

Contract Review gegen README/PRODUCT:

- `Schreiben` und `Einkaufen` bleiben primaer.
- Entsorgung bleibt Haushaltsperipherie.
- Keine Reminder-, Push-, Kalender-, Aufgaben- oder Organizer-Logik.
- Einkaufslisten-State und Supabase bleiben unberuehrt.

Contract Review gegen 5A:

- JSON ist einziger App-Vertrag.
- Keine Gemeinde-Live-Abfrage im Browser.
- Kein iCal-Parser in der App.
- Keine zusaetzlichen JSON-Felder fuer 5B-S1 erforderlich.

Contract Review gegen Home/PWA/CSS/QA:

- Home braucht sekundare Hierarchie: dritte Kachel ja, dritte Hauptintention nein.
- Neuer Screen und neues Modul muessen in `index.html`, `app/main.js`, CSS und Service Worker sauber eingetragen werden.
- QA braucht spaeter UI-, Offline-, Cache- und Regression-Smokes.

Korrekturen der Findings:

- Korrigiert in der Roadmap durch S1-Festlegung:
  - dritte Kachel ist erlaubt, wenn sie nicht als dritte Kernintention wirkt.
  - kurzer Home-Status ist erlaubt, wenn er informativ bleibt und keine Reminder-/Aufgabensprache verwendet.
  - Waste nutzt bestehenden `data-nav`-/`data-screen`-Routervertrag.
  - `sw.js`/PWA-Cache ist fuer S4 als betroffene Schicht markiert.
  - Recyclinghof-Sondertage sind fuer V1 ausgeschlossen bzw. muessen ehrlich als nicht abgedeckt formuliert werden.
  - fehlende Daten fuehren zu ruhiger Fallback-Copy, nicht zu Live-Fetch oder geratenen Terminen.

#### S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Schritt-Abnahme:

- S1 ist abgeschlossen.
- Exit-Kriterium ist erfuellt:
  - betroffene UI-Schichten sind bekannt.
  - Roadmap 5B setzt klar auf dem 5A-JSON auf.
  - Home-Hierarchie und Datenverbrauch sind fuer S2 vorgeklaert.

UI-Systemkarte:

| Schicht | Betroffenheit |
| --- | --- |
| `index.html` | Dritte Home-Kachel fuer `Muell`/`Entsorgung` mit knapper Statuszeile und neuer `screen-waste`. |
| `app/core/router.js` | voraussichtlich keine Aenderung; bestehender `data-nav`-Vertrag reicht. |
| `app/main.js` | spaeter `initWaste(...)` importieren und initialisieren. |
| `app/modules/waste.js` | neu: JSON laden, Termine berechnen, Recyclinghof-Status rendern, Fallbacks. |
| `app/app.css` | spaeter `waste.css` importieren. |
| `app/styles/waste.css` | neu: Waste-spezifischer Screen-Owner. |
| `sw.js` | spaeter Cache-Version, neues Modul, neues CSS und JSON aufnehmen. |
| `assets/data/waste-calendar.axams.json` | read-only App-Datenquelle. |
| `docs/QA_CHECKS.md` | in S6 um 5B-UI-Smokes erweitern. |
| `docs/modules/Waste Module Overview.md` | in S6 um UI-Schicht erweitern. |

Doku-Sync-Entscheidung:

- S1-Findings wurden direkt in dieser Roadmap dokumentiert.
- Weitere Doku-Syncs gehoeren erst nach S6, wenn die UI tatsaechlich gebaut und geprueft ist.

Commit-Empfehlung:

- Noch keinen Commit fuer S1 allein noetig.
- Naheliegend weiterhin ein gemeinsamer Commit nach 5B S6, sofern Stephan nicht vorher einen Zwischenstand committen will.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Den Entsorgungsmodus fachlich und technisch final abgrenzen.

Substeps:

- S2.1 Ziel gegen Produktvertrag pruefen.
- S2.2 Home-Hierarchie finalisieren.
- S2.3 User-Facing Copy finalisieren:
  - neutral
  - nicht draengend
  - keine falsche Sicherheit
- S2.4 Datums- und Statusvertrag finalisieren:
  - heute
  - morgen
  - in X Tagen
  - Datum
  - Daten fehlen
  - Daten alt
- S2.5 Recyclinghof-Statusvertrag finalisieren.
- S2.6 Offline-/Fallback-Vertrag finalisieren.
- S2.7 S4-Pflichtpunkte definieren.
- S2.8 Contract Review S2.
- S2.9 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Finaler UI-, Copy-, Date- und Fallback-Vertrag.

Exit-Kriterium:

- Umsetzung kann starten, ohne dass Home-Hierarchie oder Statussprache offen sind.

### S2 Ergebnisprotokoll 15.05.2026

#### S2.1 Ziel gegen Produktvertrag pruefen

Umsetzung/Review:

- Roadmap 5B bleibt fachlich zulaessig, weil sie einen realen Haushaltsmoment beantwortet:
  - Was kommt als Naechstes?
  - Was muss ab 7:00 bereitstehen?
  - Hat der Recyclinghof offen?
- Die Entsorgungs-UI wird kein neuer Produktkern:
  - `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
  - `Muell`/`Entsorgung` ist Haushaltsperipherie.
  - Kein Sync-, Shopping-, Writing-, Supabase- oder Household-State wird beruehrt.
- Der Home-Ticker ist fachlich erlaubt, weil er nur eine kurze Orientierung gibt und keine eigene Erinnerungslogik erzeugt.

Contract Review:

- Produktvertrag erfuellt, wenn die UI ruhig, informativ und begrenzt bleibt.
- Nicht erlaubt bleiben Push, Reminder, Kalender, Aufgabenlogik, Live-Gemeinde-Fetch und allgemeines Dashboard.

#### S2.2 Home-Hierarchie finalisieren

Finaler Vertrag:

- Home bekommt drei Kacheln in dieser Reihenfolge:
  1. `Schreiben`
  2. `Einkaufen`
  3. `Muell`
- `Schreiben` und `Einkaufen` bleiben primaere Intent-Karten.
- `Muell` ist eine dritte Kachel, aber visuell und fachlich sekundaer:
  - steht unter den Kernintentionen.
  - oeffnet die Muelluebersicht.
  - zeigt eine kleine Ticker-/Statuszeile.
  - darf nicht groesser, lauter oder dringlicher als die Kernkacheln wirken.
- Die ganze `Muell`-Kachel ist klickbar.
- Kein separates Home-Badge, kein Zaehler, kein roter Statuspunkt.

Home-Kachel-Vertrag:

| Element | Copy/Verhalten |
| --- | --- |
| Titel | `Muell` |
| Unterzeile | dynamischer Ticker statt statischem Hint |
| Ticker Normalfall | naechster relevanter Termin, z. B. `Morgen Gelber Sack` |
| Ticker Mehrfachtermin | gleiche naechste Datumsebene zusammenfassen, z. B. `Morgen Gelber Sack und Restmuell` |
| Ticker keine Daten | `Termine gerade nicht verfuegbar` |
| Klick | Navigation zu `data-screen="waste"` |

Contract Review:

- Eine dritte Kachel ist vereinbar, weil die Hierarchie explizit festgelegt ist.
- Der Ticker ist kein Reminder, solange er nur den naechsten lokalen JSON-Termin beschreibt und keine Aktion verlangt.

#### S2.3 User-Facing Copy finalisieren

Copy-Grundregeln:

- neutral, kurz, alltagssprachlich.
- keine Pflichten- oder Drucksprache.
- keine falsche Sicherheit bei Datenluecken.
- normale Termine bekommen keine Alarmfarbe.
- keine Formulierungen wie `du musst`, `faellig`, `ueberfaellig`, `Alarm`, `Reminder`.

Finale Kerncopy:

| Kontext | Copy |
| --- | --- |
| Home-Titel | `Muell` |
| Home-Unterzeile | dynamischer Ticker |
| Waste-Screen-Titel | `Muelluebersicht` |
| Rueckweg | `Zur Startseite` |
| Naechster Gesamttermin | `Als Naechstes` |
| Collection-Hinweis | `Ab 7:00 bereitstellen` aus JSON |
| Recyclinghof offen | `Recyclinghof offen bis HH:MM` |
| Recyclinghof geschlossen | `Recyclinghof geschlossen` |
| Naechste Oeffnung | `Oeffnet {Tag} um HH:MM` |
| Sondertage-Hinweis | nicht sichtbar in der Familien-UI; Limitierung bleibt in Doku/Review dokumentiert |
| JSON fehlt | `Termine gerade nicht verfuegbar.` |
| Keine Zukunftstermine | `Keine kommenden Termine im lokalen Kalender.` |
| Daten enden bald | `Daten reichen nur bis {Datum}.` |

Label-Vertrag:

- Sichtbare Fraktionsnamen kommen aus `collections[].label`.
- Gebiet steht dezent aus `collections[].area`.
- Offizielle `dates[].title` wird nicht als Hauptcopy verwendet, um die UI ruhig zu halten.

Contract Review:

- Copy bleibt informativ und ehrlich.
- Recyclinghof-Copy verspricht keine Sonder-Schliessungen.
- Der Home-Ticker bleibt kurz genug fuer Mobile; S3 prueft Ueberlauf.

#### S2.4 Datums- und Statusvertrag finalisieren

Datumslogik:

- App wertet ISO-Dateien `YYYY-MM-DD` als lokale Kalendertage aus.
- Keine `new Date("YYYY-MM-DD")`-UTC-Interpretation fuer Tagesvergleiche.
- Tagesdifferenzen werden ueber lokale Datumsteile berechnet.
- `heute` ist der lokale Browser-Kalendertag.
- Zukunftstermin ist `date >= heute`.

Relative Copy:

| Differenz | Copy |
| ---: | --- |
| 0 | `Heute` |
| 1 | `Morgen` |
| 2 bis 6 | `In X Tagen` |
| ab 7 | konkretes Datum, z. B. `Di, 02.06.` |

Ticker-Regel:

- Finde pro Collection den naechsten Termin mit `date >= heute`.
- Finde das frueheste Datum ueber alle Collections.
- Sammle alle Collections mit genau diesem Datum.
- Ticker baut daraus:
  - `Heute Biomuell`
  - `Morgen Gelber Sack`
  - `Morgen Gelber Sack und Restmuell`
  - `In 4 Tagen Biomuell`
  - `Di, 02.06. Gelber Sack`
- Bei drei Collections am selben Tag duerfen Labels kommasepariert werden und das letzte Label mit `und` verbunden werden.
- Wenn die Zeile zu lang wird, darf S4/S3 eine kuerzere Mobile-Variante definieren, ohne die Bedeutung zu aendern.

Detailansicht-Regel:

- Muelluebersicht zeigt:
  - naechster Gesamttermin.
  - je Collection naechsten Termin.
  - relative Copy plus konkretes Datum.
  - `hint` als ruhigen Zusatz.

Datenstatus:

| Zustand | Vertrag |
| --- | --- |
| JSON laedbar und Termine vorhanden | normale Anzeige |
| einzelne Collection ohne Zukunftstermin | Collection zeigt ruhigen Leerzustand |
| keine Collection mit Zukunftstermin | Gesamt- und Home-Ticker zeigen fehlende kommende Termine |
| JSON fehlt/unlesbar | Home-Ticker und Screen zeigen `Termine gerade nicht verfuegbar.` |
| Daten enden bald | wenn spaetestes Datum ueber alle Collections weniger als 30 Tage entfernt ist, ruhiger Hinweis `Daten reichen nur bis {Datum}.` |

Contract Review:

- Datumslogik nutzt nur vorhandene lokale JSON-Daten.
- Keine Abfuhrregel, Feiertagsregel oder iCal-Logik wird im Browser nachgebaut.

#### S2.5 Recyclinghof-Statusvertrag finalisieren

Finale V1-Oeffnungszeiten:

| Tag | Fenster |
| --- | --- |
| Montag | 13:00-18:00 |
| Mittwoch | 08:00-12:00, 13:00-17:00 |
| Samstag | 07:00-12:00 |

Statuslogik:

- Browser berechnet lokal anhand aktueller lokaler Zeit.
- Innerhalb eines Fensters:
  - Status: offen.
  - Copy: `Recyclinghof offen bis HH:MM`.
- Ausserhalb eines Fensters:
  - Status: geschlossen.
  - Copy: `Recyclinghof geschlossen`.
  - naechste Oeffnung wird aus den statischen Wochenfenstern gesucht.
  - Copy: `Oeffnet {Tag} um HH:MM`.
- Mittwoch 12:00-13:00 ist geschlossen und oeffnet wieder Mittwoch 13:00.
- Sonder-Schliessungen, Feiertage und Kalenderhinweise werden nicht berechnet.
- Die Familien-UI zeigt dafuer keinen dauerhaften Hinweis, weil der Recyclinghof-Status bewusst nur als einfache Alltagshilfe dient.

Contract Review:

- Recyclinghof V1 ist ehrlich, weil er nur regulaere Wochenzeiten abbildet.
- Keine PDF-, Kalender- oder Live-Quelle wird fuer Sondertage eingefuehrt.

#### S2.6 Offline-/Fallback-Vertrag finalisieren

Offline-Vertrag:

- `assets/data/waste-calendar.axams.json` wird in S4 in den Service-Worker-Cache aufgenommen.
- Wenn die App vorher geladen wurde, soll die Muelluebersicht offline mit dem gecachten JSON funktionieren.
- Runtime-Fehler beim JSON-Laden duerfen Home, Writing und Shopping nicht blockieren.

Fallback-Vertrag:

| Fehler | Home-Ticker | Muelluebersicht |
| --- | --- | --- |
| JSON nicht erreichbar | `Termine gerade nicht verfuegbar` | ruhige Fehlernotiz, keine Terminliste |
| JSON ungueltig | `Termine gerade nicht verfuegbar` | ruhige Fehlernotiz, keine Terminliste |
| keine Collections | `Termine gerade nicht verfuegbar` | ruhige Fehlernotiz |
| einzelne Collection leer | kein Ticker aus dieser Collection | Collection-Leerzustand |
| alle Termine vergangen | `Keine kommenden Termine` | Hinweis `Keine kommenden Termine im lokalen Kalender.` |
| Daten enden bald | normaler Ticker | zusaetzlicher ruhiger Hinweis |

Contract Review:

- Fallbacks bleiben lokal und ehrlich.
- Es gibt keinen automatischen Live-Nachladepfad zur Gemeinde.
- Keine App-Funktion ausser Waste darf durch Waste-Datenfehler unbrauchbar werden.

#### S2.7 S4-Pflichtpunkte definieren

Pflichtpunkte fuer S4:

- `index.html`:
  - dritte Home-Kachel `Muell` unter `Schreiben`/`Einkaufen`.
  - Ticker-Element in der Kachel.
  - neuer Screen `data-screen="waste"` mit Titel `Muelluebersicht`.
  - Rueckweg `data-nav="home"`.
- `app/modules/waste.js`:
  - JSON laden.
  - JSON minimal validieren.
  - naechste Termine pro Collection berechnen.
  - Home-Ticker ableiten.
  - Muelluebersicht rendern.
  - Recyclinghof-Status aus statischen Wochenfenstern berechnen.
  - Fallbacks rendern.
- `app/main.js`:
  - `initWaste(document, touchlog?)` initialisieren, ohne Boot zu blockieren.
- Styles:
  - `app/styles/waste.css` als Feature-Owner.
  - `app/app.css` Import ergaenzen.
  - Home-Waste-Kachel entweder in `home.css` oder bewusst in `waste.css` stylen; Entscheidung in S3 finalisieren.
- PWA:
  - `sw.js` Cache-Version erhoehen.
  - `app/modules/waste.js`, `app/styles/waste.css`, `assets/data/waste-calendar.axams.json` in App-Shell aufnehmen.
- Tests:
  - JS-Syntaxcheck.
  - Browser-Smoke Home -> Muelluebersicht.
  - Ticker-Smoke fuer aktuellen JSON-Stand.
  - Recyclinghof-Smoke fuer offene/geschlossene Beispielzeiten, soweit lokal sinnvoll.
  - Offline-/Cache-Smoke, soweit lokal moeglich.

Contract Review:

- S4 darf keine JSON-Vertragsaenderung, keine Pipeline-Aenderung und keine Supabase-Aenderung enthalten.
- Router-Umbau ist nicht Pflicht, weil `data-nav`/`data-screen` ausreicht.

#### S2.8 Contract Review S2

Review-Frage:

- Ist Roadmap 5B nach Ticker-Entscheidung umsetzungsreif, ohne Produkt-, Daten- oder Home-Vertrag zu brechen?

Entscheidung:

- Ja.

Findings:

- S2-F1: `Ticker` kann als laufender Reminder verstanden werden.
- S2-F2: `Muell` als dritte Kachel kann zu prominent werden.
- S2-F3: Datumsvergleich per JavaScript-UTC-Parsing koennte um Mitternacht falsche Tage erzeugen.
- S2-F4: Recyclinghof-Sonder-Schliessungen koennen durch statische Zeiten uebersehen werden.
- S2-F5: "Altes JSON" ist nicht direkt ueber `generatedAt` erkennbar, weil 5A bewusst keine Laufzeitfelder schreibt.
- S2-F6: Lange Mehrfachtermin-Ticker koennen auf Mobile ueberlaufen.

Korrekturen:

- Ticker wurde als kleine Statuszeile aus lokalem JSON definiert, nicht als laufender Reminder.
- Home-Hierarchie wurde finalisiert: dritte Kachel ja, dritte Hauptintention nein.
- Datumsvertrag verbietet UTC-Parsing fuer reine Kalendertage.
- Recyclinghof-Copy zeigt keinen dauerhaften Sonder-Schliessungen-Hinweis; die Limitierung bleibt als Doku-/Review-Vertrag festgehalten.
- Datenalter wird ueber vorhandene Terminreichweite bewertet, nicht ueber fehlende Metadaten.
- S3 prueft Mobile-Ueberlauf und legt die kuerzere Ticker-Variante fest.

#### S2.9 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Schritt-Abnahme:

- S2 ist abgeschlossen.
- Exit-Kriterium ist erfuellt:
  - Home-Hierarchie ist final.
  - Ticker-Vertrag ist final.
  - Copy- und Datumsvertrag sind final.
  - Recyclinghof- und Fallback-Vertrag sind final.
  - S4-Pflichtpunkte sind definiert.

Doku-Sync-Entscheidung:

- S2-Ergebnis wurde in dieser Roadmap dokumentiert.
- Weitere Doku-Syncs fuer Module Overviews und QA erfolgen in S6 nach Umsetzung.

Commit-Empfehlung:

- Noch keinen Commit fuer S2 allein noetig.
- Weiterhin sinnvoll: gemeinsamer 5B-Commit nach S6 oder bewusster Zwischencommit nach S3, falls Stephan das moechte.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Risiken vor Codeaenderungen finden.

Substeps:

- S3.1 Bruchrisiken identifizieren:
  - fehlendes JSON
  - altes JSON
  - leere Collection
  - Datum am heutigen Tag
  - alle Termine in der Vergangenheit
  - Zeitzone/Datum um Mitternacht
  - Recyclinghof-Pausenfenster am Mittwoch
  - Mobile-Ueberlauf
- S3.2 User-Facing Copy Review.
- S3.3 CSS-Owner-Entscheidung treffen.
- S3.4 PWA-Cache-Entscheidung treffen.
- S3.5 S4-Substeps konkretisieren.
- S3.6 Teststrategie konkretisieren.
- S3.7 Contract Review S3.
- S3.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Bruchrisikoliste.
- Konkreter S4-Umsetzungsplan.
- S5-Testplan.

Exit-Kriterium:

- S4 hat klare Substeps und Review-Kriterien.

### S3 Ergebnisprotokoll 15.05.2026

#### S3.1 Bruchrisiken identifizieren

Bruchrisikoliste:

| Risiko | Auswirkung | S3-Entscheidung |
| --- | --- | --- |
| fehlendes JSON | Home-Ticker und Muelluebersicht koennen keine Termine zeigen | Fehler abfangen, ruhige Copy `Termine gerade nicht verfuegbar.` |
| ungueltiges JSON | Rendering koennte brechen | Minimalvalidierung vor Nutzung; kein Throw bis in den Bootflow |
| altes JSON | App zeigt evtl. zu kurze Zukunft | ueber Terminreichweite erkennen, weil 5A kein `generatedAt` schreibt |
| leere Collection | Collection-Karte ohne Inhalt | Collection-Leerzustand anzeigen, andere Collections weiter nutzen |
| alle Termine in der Vergangenheit | Ticker haette keinen naechsten Termin | `Keine kommenden Termine` statt Berechnung/Live-Fetch |
| Datum am heutigen Tag | Ticker muss `Heute` statt `In 0 Tagen` zeigen | Differenz 0 explizit behandeln |
| Zeitzone/Datum um Mitternacht | UTC-Parsing kann falschen Kalendertag liefern | ISO-Dateien manuell in lokale Datumsteile parsen |
| Recyclinghof Mittwoch 12:00-13:00 | fälschlich durchgehend offen | zwei getrennte Mittwoch-Fenster |
| Recyclinghof Sonder-Schliessungen | statische Zeiten koennen Sondertage uebersehen | Limitierung in Doku/Review halten; Familien-UI nicht mit dauerhaftem Hinweis belasten |
| Mobile-Ueberlauf Ticker | Kachel kann unruhig oder abgeschnitten wirken | Ticker einzeilig/mehrzeilig begrenzen und kurze Fallback-Variante erlauben |
| PWA alter Cache | neue UI/JSON fehlen in installierter PWA | Cache-Version erhoehen und neue Assets aufnehmen |
| Boot-Abhaengigkeit | Waste-JSON-Fehler blockiert Kernapp | Waste-Init darf Home/Writing/Shopping nicht blockieren |

Contract Review:

- Alle Risiken bleiben innerhalb der 5B-UI-Schicht loesbar.
- Kein Risiko rechtfertigt Live-Gemeinde-Fetch, neue Datenpipeline oder Supabase-Beruehrung.

#### S3.2 User-Facing Copy Review

Review-Ergebnis:

- Finale Copy aus S2 ist produktvertragskonform.
- Anpassung fuer S3:
  - Home-Ticker darf keine langen Detailtitel aus `dates[].title` verwenden.
  - Labels aus `collections[].label` reichen fuer Home.
  - Ticker sollte maximal eine kurze Aussage liefern.

Copy-Fallbacks:

| Zustand | Erlaubte Copy |
| --- | --- |
| Heute Termin | `Heute Biomuell` |
| Morgen ein Termin | `Morgen Gelber Sack` |
| Morgen mehrere Termine | `Morgen Gelber Sack und Restmuell` |
| 2-6 Tage | `In 4 Tagen Biomuell` |
| ab 7 Tage | `Di, 02.06. Gelber Sack` |
| keine Daten | `Termine gerade nicht verfuegbar` |
| keine Zukunft | `Keine kommenden Termine` |
| Daten kurz | `Daten reichen nur bis {Datum}.` |
| Recyclinghof Sondertage | kein dauerhafter UI-Hinweis; Limitierung bleibt Doku-/Review-Punkt |

Mobile-Kuerzungsregel:

- Wenn mehrere Labels zu lang sind, darf die UI auf `Morgen 2 Termine` bzw. `Heute 2 Termine` kuerzen.
- In der Muelluebersicht muessen die einzelnen Fraktionen trotzdem sichtbar bleiben.

Contract Review:

- Copy bleibt informativ, nicht draengend.
- `Morgen 2 Termine` ist keine Badge-/Alarm-Logik, sondern eine Layout-schonende Zusammenfassung.

#### S3.3 CSS-Owner-Entscheidung treffen

Finale Entscheidung:

- Neuer Feature-Owner:
  - `app/styles/waste.css`
- Import-Reihenfolge:
  - nach `app/styles/home.css`
  - vor `writing.css` und `shopping.css`
- Begruendung:
  - Waste enthaelt eigenen Screen plus Home-Waste-Kachel-Variante.
  - `home.css` bleibt fuer generische Home-Komposition und bestehende Kernkacheln zustaendig.
  - Waste-spezifische Kachelverfeinerung darf in `waste.css` liegen, wenn sie ueber Klassen wie `.home-waste-card` sauber begrenzt ist.

CSS-Regeln fuer S4:

- Keine globalen Button-, Panel- oder Token-Umbauten.
- Keine Sammeldatei.
- Keine Dashboard-Fliesenoptik.
- Mobile-Regeln gehoeren zum Owner `waste.css`.
- Text in der Ticker-Zeile darf nicht ueberlaufen; mindestens `overflow-wrap`, `min-width: 0` oder kontrollierte Zeilenbegrenzung pruefen.

Contract Review:

- CSS-Architekturvertrag bleibt erhalten.
- `app/app.css` bleibt einziger CSS-Einstieg.

#### S3.4 PWA-Cache-Entscheidung treffen

Finale Entscheidung:

- `sw.js` muss in S4 aktualisiert werden.
- `CACHE_VERSION` wird von `v29` auf eine neue Version erhoeht.
- `APP_SHELL` bekommt:
  - `./app/modules/waste.js`
  - `./app/styles/waste.css`
  - `./assets/data/waste-calendar.axams.json`

Begruendung:

- Die Muelluebersicht ist sichtbare App-Shell-Funktion.
- Ohne Cache-Aufnahme koennte installierte/offline PWA die neue UI oder das lokale JSON nicht verlaesslich liefern.
- Das JSON ist in 5B eine lokale App-Datenquelle, kein Runtime-Config-File.

Contract Review:

- PWA-Cache-Aenderung ist noetig und begrenzt.
- `public/runtime-config.json` bleibt network-first und unberuehrt.
- Keine Service-Worker-Strategie wird grundlegend umgebaut.

#### S3.5 S4-Substeps konkretisieren

Konkretisierter S4-Plan:

- S4.1 Home-Kachel und statische Screen-Navigation vorbereiten:
  - dritte Kachel `Muell`.
  - Ticker-Element mit Fallback-Starttext.
  - `data-nav="waste"`.
  - keine Router-Aenderung, solange bestehender Vertrag reicht.
- S4.2 Muelluebersicht-Markup anlegen:
  - neuer `section` mit `data-screen="waste"`.
  - Titel `Muelluebersicht`.
  - Bereiche fuer naechsten Termin, Fraktionen, Recyclinghof, Fallback/Hinweis.
- S4.3 `app/modules/waste.js` bauen:
  - `initWaste(doc, touchlog?)`.
  - JSON fetch.
  - Minimalvalidierung.
  - lokale Datumshelfer ohne UTC-Falle.
  - naechste Termine und Home-Ticker.
  - Render-Fallbacks.
- S4.4 Recyclinghof-Statuslogik:
  - reine Funktionen fuer Wochenfenster.
  - Mittwoch-Pause.
  - naechste Oeffnung.
  - optional testbare Exports, falls ohne Browser sinnvoll.
- S4.5 Styles:
  - `waste.css`.
  - Home-Waste-Kachel sekundaer, aber sichtbar.
  - Muelluebersicht ruhig und mobil stabil.
- S4.6 Boot/PWA:
  - `main.js` importiert und startet Waste.
  - `app/app.css` importiert `waste.css`.
  - `sw.js` Cache-Version und Assets.
- S4.7 lokale Checks und Smokes vorbereiten/ausfuehren:
  - Syntax.
  - Browser-Smoke soweit moeglich.
  - JSON-/Ticker-/Recyclinghof-Smokes.
- S4.8 Code Review und Contract Review.
- S4.9 Abnahme und Commit-Empfehlung.

Review-Kriterien fuer jeden S4-Substep:

- keine Supabase-/SQL-/Auth-/Household-Aenderung.
- keine Gemeinde-Live-Abfrage ausser lokales JSON.
- kein Reminder-/Push-/Kalender-Verhalten.
- Home-Hierarchie bleibt sichtbar.
- Fehler im Waste-Modul brechen die Kernflows nicht.

#### S3.6 Teststrategie konkretisieren

S5-Testplan:

- Syntax:
  - `node --check app/main.js`
  - `node --check app/modules/waste.js`
  - `node --check sw.js`
- JSON-/Daten-Smoke:
  - `assets/data/waste-calendar.axams.json` parsebar.
  - naechster Termin aus aktuellem JSON korrekt ableitbar.
  - Home-Ticker fuer aktuellen Datenstand plausibel.
- Datums-Smokes:
  - heute.
  - morgen.
  - in 2-6 Tagen.
  - ab 7 Tage.
  - alle Termine vergangen.
  - keine UTC-Verschiebung bei `YYYY-MM-DD`.
- Recyclinghof-Smokes:
  - Montag waehrend offen.
  - Mittwoch 11:30 offen bis 12:00.
  - Mittwoch 12:30 geschlossen, oeffnet 13:00.
  - Samstag nach 12:00 geschlossen, naechste Oeffnung Montag 13:00.
- Browser-Smokes:
  - Home zeigt drei Kacheln in korrekter Reihenfolge.
  - `Muell`-Kachel oeffnet Muelluebersicht.
  - Rueckweg zur Startseite.
  - Muelluebersicht zeigt Fraktionen und Recyclinghof.
  - Mobile Ticker ueberlappt nicht.
- PWA-/Offline-Smokes:
  - Service Worker registriert.
  - neue Assets im Cache-Vertrag.
  - Offline nach Erstladung zeigt Muelluebersicht mit gecachtem JSON, soweit lokal pruefbar.
- Regression:
  - Schreiben oeffnet.
  - Einkaufen oeffnet.
  - Kassa-Karussell bleibt sichtbar.
  - Utility/Diagnose oeffnet.

Nicht lokal oder nur eingeschraenkt pruefbar:

- echte installierte PWA-Aktualisierung auf allen Zielgeraeten.
- langfristiges Cache-Verhalten nach GitHub Pages Deploy.

#### S3.7 Contract Review S3

Review-Frage:

- Sind Risiken, Owner, Cache-Entscheidung, S4-Plan und S5-Testplan konkret genug, um mit Code-Substeps zu starten?

Entscheidung:

- Ja.

Findings:

- S3-F1: Ohne Mobile-Kuerzungsregel kann der Home-Ticker bei mehreren Terminen zu lang werden.
- S3-F2: Ohne lokalen Datumsparser droht ein UTC-Off-by-one.
- S3-F3: Ohne Cache-Versionserhoehung koennte die installierte PWA alte Shell-Dateien behalten.
- S3-F4: Wenn Waste-Init awaited und fehlerhaft ist, koennte der Bootflow unnoetig blockieren.
- S3-F5: Wenn `waste.css` globale `.panel`-/`.surface-button`-Regeln ueberschreibt, drohen Seiteneffekte.

Korrekturen:

- Mobile-Kuerzungsregel `Heute/Morgen 2 Termine` dokumentiert.
- Datumsvertrag verlangt manuelles lokales Parsen von ISO-Datumsstrings.
- S4.6 macht Cache-Version und Asset-Liste verpflichtend.
- S4.6/S4.7 pruefen Waste-Init so, dass Kernflows nicht blockiert werden.
- CSS-Owner-Regeln verbieten globale Pattern-Umbauten in `waste.css`.

#### S3.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Schritt-Abnahme:

- S3 ist abgeschlossen.
- Exit-Kriterium ist erfuellt:
  - Bruchrisiken sind identifiziert.
  - Copy ist reviewt.
  - CSS-Owner ist entschieden.
  - PWA-Cache-Entscheidung ist getroffen.
  - S4-Substeps sind konkret.
  - S5-Testplan ist konkret.

Doku-Sync-Entscheidung:

- S3-Ergebnis wurde in dieser Roadmap dokumentiert.
- Module Overviews und QA werden nach Umsetzung in S6 synchronisiert.

Commit-Empfehlung:

- Noch keinen Commit fuer S3 allein noetig.
- Nach S3 ist die Roadmap bereit fuer S4.1 als ersten Code-Substep.

## S4 - Umsetzung

Ziel:

- Entsorgungsmodus bauen, ohne Roadmap-A-Datenpipeline oder andere Kernflows umzubauen.

Substeps:

- S4.1 Home-Kachel, Ticker-Ziel und Router-Ziel vorbereiten.
- S4.2 Entsorgungs-Screen in `index.html` anlegen.
- S4.3 `app/modules/waste.js` anlegen:
  - JSON laden
  - Collections auswerten
  - naechste Termine berechnen
  - Home-Ticker-Meldung ableiten
  - Fallbacks setzen
- S4.4 Recyclinghof-Statuslogik bauen:
  - Wochentagsfenster
  - Mittwoch-Mittagspause
  - naechste Oeffnung
- S4.5 Styles bauen:
  - ruhig
  - wertig
  - nicht dashboardartig
  - mobile stabil
- S4.6 PWA-/Cache-Vertrag aktualisieren.
- S4.7 Touchlog/Diagnostics nur ergaenzen, falls echte Diagnosepunkte entstehen.
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

- Sichtbarer Entsorgungsmodus.
- Home-Einstieg.
- Lokale JSON-Nutzung.
- Recyclinghof-Status.

Exit-Kriterium:

- Der Entsorgungsmodus funktioniert lokal mit vorhandenem JSON und bleibt bei fehlendem JSON ruhig.

### S4.1 Ergebnisprotokoll 15.05.2026

Umsetzung:

- Home um dritte Kachel `Müll` erweitert.
- Kachel steht nach `Schreiben` und `Einkaufen`.
- Kachel nutzt `data-nav="waste"` als vorbereitetes Router-Ziel.
- Ticker-Ziel angelegt:
  - `id="home-waste-ticker"`
  - Start-/Fallbacktext: `Termine gerade nicht verfügbar`
- Die Tickerzeile ersetzt den statischen Hint `Termine und Recyclinghof`, damit die Kachel nicht doppelt erklaert.
- Erster Waste-Style-Owner angelegt:
  - `app/styles/waste.css`
  - Import in `app/app.css` nach `home.css` und vor `writing.css`.
- Minimalstyling fuer `.home-waste-card` angelegt, damit die Kachel bereits in S4.1 ruhiger/sekundaerer wirkt.
- `app/core/router.js` um Guard erweitert:
  - unbekannte `data-nav`-Ziele deaktivieren nicht mehr alle Screens.
  - Das ist fuer den S4.1-Zwischenstand wichtig, weil `screen-waste` erst in S4.2 angelegt wird.

Betroffene Dateien:

- `index.html`
- `app/core/router.js`
- `app/app.css`
- `app/styles/waste.css`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/core/router.js`
- `node --check app/main.js`
- Router-Smoke per Inline-Node-Test:
  - unbekanntes Ziel `waste` laesst `home` aktiv, solange `screen-waste` noch fehlt.
  - bekanntes Ziel `writing` navigiert weiterhin korrekt.
- Struktur-Scan:
  - `home-waste-card`
  - `home-waste-ticker`
  - `data-nav="waste"`
  - `app/styles/waste.css`
- Browser-Smoke per temporaerem lokalen Server und Playwright:
  - Mobile-Viewport zeigt drei Home-Kacheln.
  - Reihenfolge bleibt `Schreiben`, `Einkaufen`, `Müll`.
  - Ticker-Fallback ist sichtbar.
  - Klick auf `Müll` laesst Home aktiv, solange `screen-waste` noch fehlt.
- `git diff --check -- index.html app/core/router.js app/app.css app/styles/waste.css`

Code Review:

- Home-Markup folgt dem bestehenden Intent-Kartenmuster.
- Die neue Kachel hat eigene Klassen und stabile Hooks fuer S4.3/S4.5.
- Der Router bleibt einfach und generisch.
- Der Router-Guard verhindert einen schlechten Zwischenzustand, ohne URL-/History-Routing einzufuehren.
- `waste.css` beschraenkt sich auf `.home-waste-card` und `.home-intent-card-ticker`; keine globalen Button-/Panel-Regeln.

Contract Review:

- S4.1 bleibt innerhalb des S2/S3-Vertrags:
  - dritte Kachel ja.
  - dritte Hauptintention nein.
  - Ticker ist nur vorbereitet, noch keine Reminder-/Push-/Badge-Logik.
  - kein Supabase, SQL, Auth, Household-Key.
  - keine Gemeinde-Live-Abfrage.
  - kein JSON-Vertrag geaendert.
  - kein Router-Umbau ueber den noetigen Guard hinaus.

Findings:

- S4.1-F1: Ohne Guard wuerde ein Klick auf `data-nav="waste"` vor S4.2 alle Screens deaktivieren.
- S4.1-F2: Ohne minimale Waste-Styles wuerde die dritte Kachel im Zwischenstand zu gleichwertig wirken.

Korrekturen:

- Router-Guard fuer unbekannte Ziel-Screens eingefuehrt.
- `app/styles/waste.css` frueh angelegt und Kachel minimal sekundaer gestaltet.

Restrisiko:

- Klick auf `Müll` oeffnet erst ab S4.2 die Muelluebersicht, weil der Screen bewusst noch nicht Teil von S4.1 ist.
- `sw.js` kennt `app/styles/waste.css` noch nicht im App-Shell-Cache; das ist nach S3-Vertrag Pflichtpunkt fuer S4.6.
- Der Ticker ist noch statischer Fallbacktext; dynamische Ableitung folgt in S4.3.

### S4.2 Ergebnisprotokoll 15.05.2026

Umsetzung:

- Neuen Screen `screen-waste` in `index.html` angelegt.
- Screen nutzt `data-screen="waste"` und passt damit zum bestehenden Router-Vertrag.
- Screen-Titel:
  - `Müllübersicht`
- Rueckweg:
  - Button `Zur Startseite` mit `data-nav="home"`.
- Zielcontainer fuer S4.3/S4.4 angelegt:
  - `waste-status-note`
  - `waste-next-summary`
  - `waste-collection-list`
  - `waste-recycling-status`
  - `waste-recycling-details`
- Statische Fallback-/Vorbereitungscopy eingefuegt:
  - `Termine gerade nicht verfügbar.`
  - `Lokale Entsorgungsdaten werden vorbereitet.`
  - `Noch keine Termine geladen.`
  - `Status wird vorbereitet.`
  - `Oeffnungszeiten werden vorbereitet.`
- `app/styles/waste.css` um minimale Screen-Struktur ergaenzt:
  - `.screen-waste.is-active`
  - `.waste-summary`
  - `.waste-collection-list`
  - `.waste-recycling-details`
  - `.waste-empty-note`

Betroffene Dateien:

- `index.html`
- `app/styles/waste.css`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/core/router.js`
- `node --check app/main.js`
- Struktur-Scan:
  - `screen-waste`
  - `waste-title`
  - `waste-status-note`
  - `waste-next-summary`
  - `waste-collection-list`
  - `waste-recycling-status`
  - `waste-recycling-details`
- Browser-Smoke per temporaerem lokalen Server und Playwright:
  - Klick auf `Müll` aktiviert `screen-waste`.
  - Home wird dabei deaktiviert.
  - Titel ist vorhanden.
  - `Zur Startseite` aktiviert wieder Home.
- `git diff --check -- index.html app/styles/waste.css app/core/router.js "docs/HESTIA Entsorgung UI Roadmap.md"`

Code Review:

- Screen-Markup nutzt bestehende `screen`, `panel`, `panel-head`, `inline-link` und `sync-status`-Muster.
- Keine neue Router-Architektur noetig.
- Neue IDs sind stabile Render-Ziele fuer S4.3/S4.4.
- Der Screen enthaelt noch keine Datenlogik und keinen Live-Fetch.
- Minimalstyles bleiben im Feature-Owner `waste.css` und veraendern keine globalen Patterns.

Contract Review:

- S4.2 bleibt innerhalb des S2/S3-Vertrags:
  - eigener Muelluebersicht-Screen ja.
  - noch keine JSON-, Recyclinghof- oder Ticker-Logik.
  - kein Supabase, SQL, Auth, Household-Key.
  - keine Push-, Reminder-, Badge-, Countdown- oder Kalenderlogik.
  - keine Gemeinde-Live-Abfrage.
  - Recyclinghof-Sondertage werden nicht berechnet, sondern mit Hinweis abgegrenzt.

Findings:

- S4.2-F1: Ohne eigene Zielcontainer wuerde S4.3/S4.4 spaeter Daten direkt in unscharfe Panel-Strukturen schreiben.
- S4.2-F2: Ohne minimale Screen-Styles wirkt die Muelluebersicht im Zwischenstand roh und bricht die visuelle Ruhe.

Korrekturen:

- Stabile Zielcontainer fuer Summary, Collection-Liste und Recyclinghof angelegt.
- Minimale Screen-Struktur in `waste.css` ergaenzt.

Restrisiko:

- Die Muelluebersicht zeigt noch Fallback-/Vorbereitungscopy; echte JSON-Daten folgen in S4.3.
- Recyclinghof-Status ist noch statisch vorbereitet; Logik folgt in S4.4.
- `sw.js` ist weiterhin erst in S4.6 dran.

### S4.3 Ergebnisprotokoll 15.05.2026

Umsetzung:

- Neues Modul `app/modules/waste.js` angelegt.
- `app/main.js` importiert und startet `initWaste(document, touchlog)`.
- Waste-Modul laedt ausschliesslich lokales JSON:
  - `./assets/data/waste-calendar.axams.json`
- Minimalvalidierung umgesetzt:
  - `schemaVersion: 1`
  - `collections[]`
  - `collection.id`
  - `collection.label`
  - `dates[]`
  - valide ISO-Tage `YYYY-MM-DD`
- Lokale Datumshelfer umgesetzt:
  - kein UTC-Parsing fuer reine Kalendertage.
  - `Heute`
  - `Morgen`
  - `In X Tagen`
  - ab 7 Tagen konkretes Datum.
- Terminlogik umgesetzt:
  - naechster Termin je Collection.
  - fruehestes Datum ueber alle Collections.
  - mehrere Collections am selben naechsten Tag zusammenfassen.
- Home-Ticker umgesetzt:
  - normales Beispiel: `Morgen Gelber Sack und Restmuell`.
  - lange Mehrfachlabels werden auf `Morgen 2 Termine` gekuerzt.
  - aktueller JSON-Stand am 15.05.2026 ergibt `In 4 Tagen Biomuell`.
- Muelluebersicht rendert:
  - naechsten Gesamttermin.
  - alle drei Collections mit Gebiet, Datum und Hint.
  - Datenstatus mit Gemeinde/Gebiet.
- Fallbacks umgesetzt:
  - JSON fehlt/HTTP-Fehler.
  - JSON ungueltig.
  - keine kommenden Termine.
  - Daten reichen weniger als 30 Tage in die Zukunft.
- Touchlog-Eintraege:
  - erfolgreicher Waste-Load.
  - fehlgeschlagener Waste-Load als Warnung.
- `app/styles/waste.css` um minimale dynamische Anzeige-Styles ergaenzt.

Betroffene Dateien:

- `app/modules/waste.js`
- `app/main.js`
- `app/styles/waste.css`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/modules/waste.js`
- `node --check app/main.js`
- `node --check app/core/router.js`
- Helper-Smoke per Node:
  - valide/ungueltige ISO-Daten.
  - `Heute`.
  - `Morgen`.
  - `In 4 Tagen`.
  - Mehrfachtermin `Morgen Gelber Sack und Restmuell`.
  - lange Mehrfachlabels -> `Morgen 2 Termine`.
- JSON-Smoke gegen `assets/data/waste-calendar.axams.json`:
  - naechste Collection `bio-west`.
  - naechstes Datum `2026-05-19`.
  - Ticker `In 4 Tagen Biomuell`.
- Browser-Smoke per temporaerem lokalen Server und Playwright:
  - Home-Ticker wird aus echtem JSON befuellt.
  - Klick auf `Müll` oeffnet `screen-waste`.
  - drei Collection-Karten werden gerendert.
  - Summary enthaelt `Biomuell`.
  - Status enthaelt `Axams`.
- Fallback-Browser-Smoke:
  - blockiertes JSON erzeugt ruhigen Home-Ticker-Fallback.
  - Writing bleibt danach navigierbar.
- `git diff --check -- app/modules/waste.js app/main.js app/styles/waste.css index.html "docs/HESTIA Entsorgung UI Roadmap.md"`

Code Review:

- `initWaste` blockiert den Bootflow nicht; JSON-Load laeuft asynchron und behandelt Fehler lokal.
- Browser-Code nutzt nur das lokale JSON und keine Axams-/iCal-/Gemeinde-Live-Quelle.
- Datumslogik parst `YYYY-MM-DD` in lokale Datumsteile statt ueber UTC-String-Parsing.
- Rendering nutzt stabile Zielcontainer aus S4.2.
- Fallbacks bleiben im Waste-Modul und brechen Home/Writing/Shopping nicht.
- Helper-Funktionen sind exportiert und dadurch lokal testbar.

Contract Review:

- S4.3 bleibt innerhalb des S2/S3-Vertrags:
  - Home-Ticker ja, aber nur informativ.
  - keine Push-, Reminder-, Badge-, Countdown- oder Kalenderlogik.
  - kein Supabase, SQL, Auth oder Household-Key.
  - kein Live-Fetch der Gemeinde.
  - kein iCal-Parser im Browser.
  - kein JSON-Vertrag aus 5A veraendert.
  - Recyclinghof-Logik noch nicht umgesetzt; sie folgt in S4.4.

Findings:

- S4.3-F1: Die erste Ticker-Kuerzungsgrenze war zu niedrig und kuerzte `Morgen Gelber Sack und Restmuell` bereits zu `Morgen 2 Termine`.
- S4.3-F2: Bei ausschliesslich vergangenen Terminen konnte die Statuszeile eher Datenreichweite statt `Keine kommenden Termine` melden.
- S4.3-F3: `fetch(..., { cache: "no-cache" })` war fuer das lokale JSON unnoetig und koennte den spaeteren Offline-/Cache-Vertrag erschweren.

Korrekturen:

- Ticker-Kuerzungsgrenze erhoeht, sodass der vertragliche Zweierfall ausgeschrieben bleibt.
- Statuslogik priorisiert jetzt `Keine kommenden Termine`, wenn es keinen naechsten Termin gibt.
- JSON-Fetch auf normales `fetch(WASTE_DATA_URL)` zurueckgenommen.

Restrisiko:

- Recyclinghof-Status bleibt bis S4.4 vorbereitet, aber noch nicht dynamisch.
- `app/modules/waste.js`, `app/styles/waste.css` und `assets/data/waste-calendar.axams.json` sind noch nicht im Service-Worker-App-Shell-Cache; S4.6 bleibt Pflicht.
- Browser-Smokes liefen mit blockiertem Service Worker, weil S4.6 den Cache-Vertrag noch nicht umgesetzt hat.

### S4.4 Ergebnisprotokoll 15.05.2026

Umsetzung:

- Recyclinghof-Statuslogik in `app/modules/waste.js` umgesetzt.
- Regulaere Wochenfenster als statischer V1-Vertrag:
  - Montag 13:00-18:00
  - Mittwoch 08:00-12:00
  - Mittwoch 13:00-17:00
  - Samstag 07:00-12:00
- `getRecyclinghofStatus(now)` als testbare Export-Funktion angelegt.
- Statuslogik:
  - innerhalb eines Fensters: `Recyclinghof offen bis HH:MM`.
  - ausserhalb eines Fensters: `Recyclinghof geschlossen`.
  - naechste Oeffnung wird aus den statischen Wochenfenstern gesucht.
  - Mittwoch 12:00-13:00 ist geschlossen und oeffnet wieder um 13:00.
  - exakter Fensterschluss zaehlt als geschlossen.
- Recyclinghof-Rendering in `initWaste` angebunden.
- Rendering laeuft unabhaengig vom Waste-JSON, damit der Recyclinghof bei Termin-Datenfehlern trotzdem sichtbar bleibt.
- `waste-recycling-details` zeigt:
  - naechste Oeffnung, falls geschlossen.
  - regulaere Wochenfenster.
- `app/styles/waste.css` um kleine Listenstyles fuer Recyclinghof-Zeiten ergaenzt.

Betroffene Dateien:

- `app/modules/waste.js`
- `app/styles/waste.css`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/modules/waste.js`
- `node --check app/main.js`
- Recyclinghof-Status-Smoke per Node:
  - Montag 14:00 offen bis 18:00.
  - Mittwoch 11:30 offen bis 12:00.
  - Mittwoch 12:00 geschlossen, oeffnet heute um 13:00.
  - Mittwoch 12:30 geschlossen, oeffnet heute um 13:00.
  - Samstag 12:01 geschlossen, oeffnet Montag um 13:00.
- JSON-/Ticker-Smoke gegen echten Datenstand erneut ausgefuehrt.
- Browser-Smoke per temporaerem lokalen Server und Playwright:
  - Muelluebersicht rendert Recyclinghof-Status.
  - Status bleibt nicht auf `Status wird vorbereitet.`
  - Details enthalten regulaere Wochenzeiten und Adresse.
- Fallback-Browser-Smoke mit blockiertem JSON:
  - Home-Ticker zeigt ruhigen Termin-Fallback.
  - Recyclinghof-Status wird trotzdem gerendert.
- `git diff --check -- app/modules/waste.js app/styles/waste.css "docs/HESTIA Entsorgung UI Roadmap.md"`
- Scope-Scan gegen Gemeinde-Live-Fetch, Supabase, Push, Service Worker und LocalStorage:
  - `app/modules/waste.js` enthaelt nur `fetch(WASTE_DATA_URL)`.

Code Review:

- Recyclinghof-Status ist reine lokale Zeitlogik ohne externe Quelle.
- Wochenfenster sind eng im Waste-Modul gekapselt.
- `getRecyclinghofStatus` ist exportiert und testbar.
- Rendering nutzt die bestehenden S4.2-Zielcontainer.
- JSON-Fehler beeinflussen den Recyclinghof-Status nicht.
- Keine Service-Worker- oder Cache-Aenderung in S4.4.

Contract Review:

- S4.4 bleibt innerhalb des S2/S3-Vertrags:
  - statische regulaere Oeffnungszeiten ja.
  - keine Sonder-Schliessungen berechnen.
  - keine PDF-, Kalender- oder Live-Abfrage.
  - keine Push-, Reminder-, Badge-, Countdown- oder Kalenderlogik.
  - kein Supabase, SQL, Auth oder Household-Key.
  - kein Eingriff in Shopping/Writing.

Findings:

- S4.4-F1: Der erste Status-Smoke war wegen PowerShell-/Node-Umlautkodierung im erwarteten Testliteral instabil, obwohl die Funktion korrekt `Öffnet ...` lieferte.
- S4.4-F2: Recyclinghof-Rendering darf nicht vom Waste-JSON-Erfolg abhaengen, sonst waere bei Termin-Datenfehlern auch die statische Recyclinghof-Hilfe weg.

Korrekturen:

- Status-Smoke auf umlautstabile Teilstring-/Statusflag-Pruefung umgestellt.
- Recyclinghof-Rendering vor und unabhaengig vom JSON-Ladevorgang ausgefuehrt.

Restrisiko:

- Sonder-Schliessungen und Feiertage bleiben bewusst nicht abgedeckt.
- Sonder-Schliessungen werden nicht als dauerhafter UI-Hinweis angezeigt.
- Service-Worker-Cache bleibt S4.6.

### S4.5 Ergebnisprotokoll 15.05.2026

Umsetzung:

- `app/styles/waste.css` als Waste-Feature-Owner weiter ausgebaut.
- Home-Muellkachel verfeinert:
  - etwas kompakter als die zwei Kernkacheln.
  - dezenterer Hintergrund.
  - Ticker bleibt die einzige Unterzeile.
  - Ticker bekommt Ueberlauf-Schutz.
- Muelluebersicht verfeinert:
  - ruhiger Abstandsrhythmus fuer Panels.
  - dezente obere Akzentlinie im Uebersichtspanel.
  - Zielstatus und Summary visuell klarer.
  - Fraktionszeilen als ruhige Listenabschnitte statt Dashboard-Karten.
  - Recyclinghof-Zeiten als kleine Liste.
  - offene/geschlossene Recyclinghof-Statusfarbe nur innerhalb `.screen-waste` gescoped.
- Mobile-Regeln ergaenzt:
  - kompaktere Panel-Paddings.
  - kleinere Summary-Schrift.
  - geringere Zwischenraeume.
  - Text-/Ticker-Ueberlauf-Schutz.

Betroffene Dateien:

- `app/styles/waste.css`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/modules/waste.js`
- `node --check app/main.js`
- `node --check app/core/router.js`
- `git diff --check -- app/styles/waste.css app/modules/waste.js app/main.js index.html "docs/HESTIA Entsorgung UI Roadmap.md"`
- CSS-Scope-Scan:
  - keine ungescopten globalen `.panel`-, `.surface-button`- oder `.sync-status`-Overrides.
  - kein `!important`.
  - keine fixed-position Waste-UI.
- Browser-Smoke per temporaerem lokalen Server und Playwright:
  - Desktop `1365x900`.
  - Mobile `390x844`.
  - Home zeigt drei Kacheln.
  - Home-Ticker wird befuellt.
  - Muelluebersicht oeffnet.
  - drei Fraktionen sichtbar.
  - Recyclinghofdetails sichtbar.
  - keine horizontale Ueberbreite.
  - relevante Textboxen ohne `scrollWidth > clientWidth`.
- Postcheck nach Statusfarben:
  - Desktop und Mobile weiter ohne horizontale Ueberbreite.
  - Recyclinghof-Status sichtbar.

Code Review:

- S4.5 aendert nur CSS und Doku.
- Waste-Styles bleiben im Feature-Owner `app/styles/waste.css`.
- Globale Patterns werden nur unter `.screen-waste` oder `.home-waste-card` verfeinert.
- Fraktionsinhalte bleiben listenartig und ruhig, nicht als lautes Dashboard.
- Keine neue Fachlogik, keine Datenlogik, keine Router-/Boot-Aenderung.

Contract Review:

- S4.5 bleibt innerhalb des S2/S3-Vertrags:
  - Muellkachel bleibt dritte Kachel, aber nicht dritte Hauptintention.
  - keine Alarmfarben fuer normale Termine.
  - Recyclinghof geschlossen nutzt gedimmte Farbe, nicht Rot.
  - kein Badge-, Countdown-, Reminder- oder Push-Verhalten.
  - keine Supabase-, SQL-, Auth- oder Household-Key-Aenderung.
  - keine Gemeinde-Live-Abfrage.

Findings:

- S4.5-F1: Die reine Zwischenstandsstruktur war funktional, aber in der Muelluebersicht noch zu roh und rhythmisch nicht nah genug an der restlichen HESTIA-Oberflaeche.
- S4.5-F2: Recyclinghof-Statusfarben duerfen nicht global auf `.sync-status` wirken.
- S4.5-F3: Mobile Ticker- und Datumszeilen brauchen expliziten Ueberlauf-Schutz.

Korrekturen:

- Waste-Screen-Rhythmus, Summary, Fraktionszeilen und Recyclinghofdetails in `waste.css` verfeinert.
- Statusfarben ausschliesslich unter `.screen-waste .sync-status[data-status=...]` gescoped.
- Mobile-Regeln und Overflow-Smokes fuer Ticker/Text ergaenzt.

Restrisiko:

- Der finale visuelle Feinschliff wird in S5 mit realem Desktop-/Mobile-Smoke nochmals beurteilt.
- Service-Worker-Cache bleibt S4.6.

### S4.6 Ergebnisprotokoll 15.05.2026

Umsetzung:

- `sw.js` Cache-Version erhoeht:
  - von `v29`
  - auf `v30`
- Neue Waste-Assets in `APP_SHELL` aufgenommen:
  - `./app/styles/waste.css`
  - `./app/modules/waste.js`
  - `./assets/data/waste-calendar.axams.json`
- Keine Aenderung an der Service-Worker-Strategie:
  - App-Shell bleibt `cache.addAll(APP_SHELL)`.
  - Runtime-Config bleibt Sonderfall `networkFirstForConfig`.
  - normale same-origin Assets bleiben `staleWhileRevalidate`.

Betroffene Dateien:

- `sw.js`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check sw.js`
- `node --check app/modules/waste.js`
- `node --check app/main.js`
- Statischer Cache-Vertrag-Smoke:
  - `CACHE_VERSION = "v30"` vorhanden.
  - `./app/styles/waste.css` vorhanden.
  - `./app/modules/waste.js` vorhanden.
  - `./assets/data/waste-calendar.axams.json` vorhanden.
  - alle `APP_SHELL`-Dateien existieren lokal.
  - keine doppelten `APP_SHELL`-Eintraege.
- Browser-PWA-/Offline-Smoke per temporaerem lokalen Server und Playwright:
  - Service Worker wird Controller.
  - Static Cache `hestia-static-v30` wird angelegt.
  - `waste.js`, `waste.css` und `waste-calendar.axams.json` liegen im Static Cache.
  - nach `context.setOffline(true)` und Reload wird der Home-Ticker weiter aus JSON befuellt.
  - Muelluebersicht oeffnet offline.
  - drei Collection-Eintraege sind offline sichtbar.
- `git diff --check -- sw.js app/modules/waste.js app/styles/waste.css app/main.js index.html "docs/HESTIA Entsorgung UI Roadmap.md"`
- Scope-Scan:
  - keine Secrets.
  - keine Gemeinde-Live-URL im Service Worker.
  - keine neue Supabase-Logik.
  - keine Push-/Notification-Logik.

Code Review:

- `sw.js` wurde minimal und zielgerichtet geaendert.
- Cache-Version wurde bewusst erhoeht, damit installierte PWAs die neue Shell bekommen.
- Waste-JSON wird als lokale App-Datenquelle in den App-Shell-Cache aufgenommen.
- Keine Cache-Strategie wurde nebenbei umgebaut.
- `public/runtime-config.json` bleibt im bestehenden Sonderpfad.

Contract Review:

- S4.6 erfuellt den S3-PWA-Vertrag:
  - neues ES-Modul im App-Shell-Cache.
  - neues Feature-CSS im App-Shell-Cache.
  - lokales Waste-JSON im App-Shell-Cache.
  - Cache-Version erhoeht.
- S4.6 bleibt innerhalb des Produktvertrags:
  - keine Supabase-, SQL-, Auth- oder Household-Key-Aenderung.
  - keine Push-, Reminder-, Kalender- oder Notification-Logik.
  - keine Gemeinde-Live-Abfrage im Browser.

Findings:

- S4.6-F1: Ohne Cache-Versionserhoehung koennte eine installierte PWA alte Shell-Dateien behalten.
- S4.6-F2: Ohne Waste-JSON im App-Shell-Cache waere die Muelluebersicht offline nicht verlaesslich.

Korrekturen:

- `CACHE_VERSION` auf `v30` erhoeht.
- Waste-Modul, Waste-CSS und Waste-JSON in `APP_SHELL` aufgenommen.
- Offline-Smoke mit echtem Service Worker ausgefuehrt.

Restrisiko:

- Langfristiges GitHub-Pages-/installierte-PWA-Updateverhalten wird in S5 nochmals als manueller/Browser-Smoke bewertet.
- Echter Deploy-Kontext bleibt lokal nur naeherungsweise pruefbar.

### S4.7 Ergebnisprotokoll 15.05.2026

Umsetzung:

- Touchlog-/Diagnostics-Vertrag geprueft.
- Keine neue Diagnose-UI angelegt.
- Kein neuer Dev-Schalter angelegt.
- Keine neue aktive Diagnosemodus-Anzeige angelegt.
- Bestehende Waste-Touchlog-Eintraege aus S4.3 bewusst beibehalten:
  - `[waste] calendar loaded collections=...`
  - `[waste] calendar load failed ...`

Entscheidung:

- S4.7 braucht keine weiteren Codeaenderungen.
- Die zwei vorhandenen Waste-Ereignisse sind echte QA-/Betriebsereignisse:
  - erfolgreiches Laden des lokalen Waste-JSON.
  - fehlgeschlagenes Laden mit ruhigem Fallback.
- Weitere Diagnosepunkte waeren aktuell zu laut:
  - kein Logging pro Collection.
  - kein Logging pro Datum.
  - kein Recyclinghof-Minutenstatus im Touchlog.
  - kein neuer Dev-Modus.

Betroffene Dateien:

- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/modules/waste.js`
- `node --check app/main.js`
- `node --check app/core/touchlog.js`
- Touchlog-Erfolg-Smoke per temporaerem lokalen Server und Playwright:
  - Waste-JSON laedt.
  - Touchlog enthaelt genau einmal `[waste] calendar loaded collections=3`.
- Touchlog-Fehler-Smoke per blockiertem JSON:
  - Touchlog enthaelt genau einmal `[waste] calendar load failed`.
  - Home-Ticker bleibt im ruhigen Fallback.
- `git diff --check -- app/modules/waste.js app/main.js "docs/HESTIA Entsorgung UI Roadmap.md"`
- Scope-Scan:
  - keine neuen Dev-Toggles.
  - keine neuen `hestia:dev-mode-state`-Events.
  - keine neue Diagnose-UI.

Code Review:

- Keine Codeaenderung in S4.7 noetig.
- Bestehende Waste-Touchlog-Eintraege sind einmalige Load-/Fehlerereignisse und kein Event-Spam.
- Touchlog bleibt Event-Trace, kein Dashboard.
- Keine aktiven Diagnosemodi fuer normale Waste-Nutzung.

Contract Review:

- S4.7 bleibt innerhalb des S2/S3-Vertrags:
  - Touchlog nur fuer echte Diagnosepunkte.
  - keine Nutzerfunktion.
  - keine Reminder-/Push-/Kalenderlogik.
  - keine Supabase-, SQL-, Auth- oder Household-Key-Aenderung.
  - keine neue technische Chatterei.

Findings:

- S4.7-F1: Zusaetzliche Diagnose-UI oder Dev-Schalter waeren fuer Waste V1 unverhaeltnismaessig.
- S4.7-F2: Pro-Collection- oder Pro-Datum-Logs wuerden den Touchlog verrauschen.

Korrekturen:

- Keine neuen Diagnostics gebaut.
- Bestehende zwei Waste-Load-Ereignisse per Browser-Smoke bestaetigt.
- Doku haelt fest, dass weitere Touchlog-Doku-Synchronisierung in S6 erfolgt.

Restrisiko:

- `docs/modules/Touchlog Module Overview.md` kennt die Kategorie `waste` noch nicht; das gehoert in den S6-Doku-Sync.

### S4.8 Ergebnisprotokoll 15.05.2026

Umsetzung:

- Zusammenfassenden Code Review fuer S4.1-S4.7 durchgefuehrt.
- Contract Review gegen S2/S3, Roadmap 5A, README/PRODUCT-Grenzen und PWA-Cache-Vertrag durchgefuehrt.
- Waste-CSS-Finding korrigiert.

Betroffene Dateien:

- `app/styles/waste.css`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Checks:

- `node --check app/main.js`
- `node --check app/core/router.js`
- `node --check app/modules/waste.js`
- `node --check sw.js`
- `node --check scripts/update-waste-calendar.mjs`
- JSON-/Datums-/Ticker-Smoke per Node:
  - lokaler ISO-Dateparser akzeptiert gueltige Daten und verwirft ungueltige Daten.
  - `Heute`, `Morgen`, `In 4 Tagen` werden korrekt abgeleitet.
  - aktuelles JSON liefert als naechsten Termin `In 4 Tagen Biomuell`.
  - langer Mehrfachtermin faellt auf `Morgen 3 Termine` zurueck.
- Recyclinghof-Smoke per Node:
  - Montag offen bis 18:00.
  - Mittwoch 12:30 geschlossen, oeffnet heute 13:00.
  - Samstag nach 12:00 geschlossen, naechste Oeffnung Montag.
- Statischer UI-/Cache-Vertrags-Smoke:
  - Home-Kachel `data-nav="waste"` vorhanden.
  - `screen-waste` und alle Waste-Renderziele vorhanden.
  - `waste.css` wird importiert.
  - `initWaste(document, touchlog)` ist im Bootflow vorhanden.
  - `waste.css`, `waste.js` und `waste-calendar.axams.json` sind im Service-Worker-Cachevertrag.
- `git diff --check -- index.html app/app.css app/core/router.js app/main.js app/modules/waste.js app/styles/waste.css sw.js assets/data/waste-calendar.axams.json scripts/update-waste-calendar.mjs "docs/HESTIA Entsorgung UI Roadmap.md"`

Hinweis:

- Ein erneuter S4.8-Browser-Smoke mit Playwright war in dieser Session nicht ausfuehrbar, weil das Projekt kein lokales `playwright`-Paket bereitstellt.
- Die vollstaendigen Desktop-/Mobile-/Offline-Browser-Smokes bleiben Pflicht in S5.

Code Review:

- Modulgrenzen sind eingehalten:
  - `app/modules/waste.js` kapselt Entsorgungsdaten, Datumslogik, Ticker und Recyclinghof.
  - `main.js` startet Waste ohne `await`; Kernflows werden nicht vom JSON-Laden blockiert.
  - `router.js` schuetzt unbekannte Ziele und bleibt generisch.
  - `sw.js` nimmt nur die neuen statischen Waste-Assets in den Cachevertrag auf.
- Keine Kopplung an Shopping-Sync, Supabase, Auth, Household-Key oder Serverlogik.
- Kein Live-Fetch auf Axams oder iCal in der App.
- Keine Reminder-, Push-, Kalender- oder Notification-Logik.
- CSS bleibt nach Korrektur enger auf Waste gescoped.

Contract Review:

- S4.8 erfuellt den S2/S3-Vertrag:
  - Home hat eine dritte Kachel, aber Schreiben und Einkaufen bleiben die Kernintentionen.
  - Die Waste-Kachel nutzt eine kurze dynamische Tickerzeile statt statischem Erklaertext.
  - Die Muelluebersicht nutzt ausschliesslich das lokale JSON.
  - Recyclinghof V1 nutzt nur statische Wochenfenster; Sonder-Schliessungen bleiben Doku-/Review-Limitierung.
  - Offline-/Cache-Vertrag ist vorbereitet.
  - Fehler im Waste-Modul fuehren zu ruhigen Fallbacks.

Findings:

- S4.8-F1: `.home-intent-card-ticker` war in `waste.css` zu breit gescoped und haette spaetere Home-Ticker ausserhalb Waste miterfassen koennen.
- S4.8-F2: Der echte Browser-Smoke ist in dieser Session nicht wiederholbar, solange Playwright nicht lokal im Projekt verfuegbar ist.

Korrekturen:

- S4.8-F1 behoben:
  - `.home-intent-card-ticker` wurde zu `.home-waste-card .home-intent-card-ticker` gescoped.
  - Mobile-Regel ebenfalls entsprechend gescoped.
- S4.8-F2 als S5-Pruefpflicht festgehalten.

Restrisiko:

- Installierte-PWA-Updateverhalten und echte Mobile-/Offline-Darstellung werden erst in S5 final bewertet.

### S4.9 Ergebnisprotokoll 15.05.2026

Schritt-Abnahme:

- S4 ist abgeschlossen.
- Alle S4-Substeps sind umgesetzt:
  - S4.1 Home-Kachel, Ticker-Ziel und Router-Schutz.
  - S4.2 Muelluebersicht-Markup.
  - S4.3 lokales JSON, Ticker, Fallbacks und Waste-Modul.
  - S4.4 Recyclinghof-Statuslogik.
  - S4.5 Waste-Styles.
  - S4.6 Boot, CSS-Import und PWA-Cache.
  - S4.7 Touchlog-/Diagnostics-Review.
  - S4.8 Code Review und Contract Review.
  - S4.9 Abnahme und Commit-Empfehlung.

Exit-Kriterien:

- Keine Supabase-/SQL-/Auth-/Household-Aenderung.
- Keine Gemeinde-Live-Abfrage in der App.
- Keine Reminder-/Push-/Kalenderlogik.
- Home-Hierarchie bleibt ruhig und zweckgebunden.
- Fehler im Waste-Modul blockieren Schreiben/Einkaufen nicht.
- Lokales JSON bleibt die einzige Browser-Datenquelle fuer Muelltermine.

Commit-Empfehlung:

- Noch keinen finalen Commit direkt nach S4.
- Empfehlung bleibt: gemeinsamer Commit nach S6, damit Code, QA-Doku, Module Overviews und Roadmap-Abschluss konsistent zusammen landen.
- Falls vorher ein Zwischenstand gebraucht wird, waere ein bewusster Zwischencommit nach S4 moeglich, aber nicht noetig.

Naechster Schritt:

- S5 komplett ausfuehren:
  - Syntax.
  - Diff-Check.
  - Desktop-/Mobile-Smokes.
  - Daten-/Datums-Smokes.
  - Offline-/Fallback-Smokes.
  - Regression.
  - finaler Code- und Contract-Review.

### S4 Nachkorrektur 15.05.2026 - Gebietsdetails in der Familien-UI

Ausloeser:

- Stephan hat nach S4.9 geprueft, dass `westlich Axamer Bach` und `Axams Dorf` fuer die eigene Familiennutzung in der Muelluebersicht redundant sind.

Entscheidung:

- Gebietsdetails bleiben im JSON- und Parser-Vertrag erhalten.
- Die sichtbare Familien-UI zeigt sie nicht mehr in den Fraktionskarten.
- Der erfolgreiche Ladezustand zeigt neutral `Lokale Entsorgungsdaten geladen.` statt Gemeinde/Gebiet.

Betroffene Dateien:

- `app/modules/waste.js`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Contract Review:

- Die Aenderung bleibt innerhalb des 5A-Datenvertrags:
  - keine JSON-Aenderung.
  - keine Parser-Aenderung.
  - keine neue Gebietsauswahl.
  - keine Datenlogik-Aenderung.
- Die UI wird alltagstauglicher fuer den bekannten Haushalt, weil sie bekannte Wohnortdetails nicht wiederholt.

Finding:

- S4-NF1: Gebietsdetails sind fuer Debug/Datenherkunft nuetzlich, aber als dauerhafte Familien-UI-Copy zu laut.

Korrektur:

- Fraktionskarten rendern nur noch Label, naechstes Datum und Hinweis.
- Statusnote nutzt neutrale Ladecopy.

### S4 Nachkorrektur 15.05.2026 - Recyclinghof-Details reduzieren

Ausloeser:

- Stephan hat nach S4.9 geprueft, dass Adresse und Sonder-Schliessungen-Hinweis fuer die bekannte Familiennutzung nicht gebraucht werden.

Entscheidung:

- Recyclinghof-Details zeigen nur noch die regulaeren Wochenfenster.
- Adresse `Omes 50, 6094 Axams` wird nicht mehr angezeigt.
- Dauerhafter Hinweis zu Sonder-Schliessungen wird nicht mehr angezeigt.
- Die fachliche Limitierung bleibt in der Doku und im Contract Review erhalten: Der Status kennt nur statische Wochenzeiten.

Betroffene Dateien:

- `app/modules/waste.js`
- `index.html`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Contract Review:

- Keine Datenlogik-Aenderung.
- Keine neue Quelle.
- Keine Sonder-Schliessungen-Berechnung.
- Die UI wird ruhiger und passt besser zum bekannten Haushalt.

Finding:

- S4-NF2: Adresse und Sonder-Schliessungen-Hinweis sind als dauerhafte Familien-UI-Copy zu laut.

Korrektur:

- `renderRecyclinghof` appended nur noch die Oeffnungszeitenliste.
- HTML-Fallback in `waste-recycling-details` sagt nur noch `Oeffnungszeiten werden vorbereitet.`

### S4 Nachkorrektur 15.05.2026 - Datumszeilen in Fraktionskarten

Ausloeser:

- Stephan hat geprueft, dass Datumszeilen wie `Do., 28.05. · Donnerstag, 28.05.2026` redundant wirken.

Entscheidung:

- Fraktionskarten zeigen das volle Datum zuerst.
- Relative Zusatzinfo wird nur fuer alltagsnahe Termine angezeigt:
  - `Donnerstag, 28.05.2026` bei 7 oder mehr Tagen Abstand.
  - `Dienstag, 19.05.2026 · In 4 Tagen` bei 2 bis 6 Tagen Abstand.
  - `... · Morgen`
  - `... · Heute`
- Home-Ticker und Summary-Titel bleiben kurz und relativ.

Betroffene Dateien:

- `app/modules/waste.js`
- `docs/HESTIA Entsorgung UI Roadmap.md`

Contract Review:

- Keine Datenvertragsaenderung.
- Keine Datumslogik aus dem JSON abgeleitet oder geraten.
- Die UI reduziert Redundanz und erhaelt die schnelle Naehe-Information nur dort, wo sie wirklich hilft.

Finding:

- S4-NF3: Kombination aus kurzem Absolutdatum und vollem Absolutdatum war redundant.

Korrektur:

- `formatDateDetail(isoDate, today)` eingefuehrt.
- Fraktionskarten nutzen `formatDateDetail`.

## S5 - Tests, Code Review und Contract Review

Ziel:

- UI, Daten, Offline-Verhalten und Regression pruefen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 Desktop-Smoke:
  - Home-Einstieg sichtbar, aber sekundar
  - Entsorgungsmodus oeffnet
  - Termine werden angezeigt
  - Recyclinghof-Status plausibel
  - Rueckweg funktioniert
- S5.4 Mobile-Smoke:
  - keine Ueberlaeufe
  - Touchflaechen stabil
  - Karten/Zeilen nicht zu laut
- S5.5 Daten-Smoke:
  - naechster Termin korrekt aus JSON
  - heutiger Termin
  - morgen
  - Zukunftstermin
  - keine Termine
- S5.6 Offline-/Fallback-Smoke:
  - fehlendes JSON
  - leeres JSON
  - altes JSON
  - Service-Worker-Cache nach Update
- S5.7 Regression:
  - Schreiben
  - Einkaufen
  - Kassa-Karussell
  - PWA-Installbanner
  - Diagnostics
- S5.8 User-Facing Copy Review nach realem UI-Smoke.
- S5.9 Code Review gegen Modulgrenzen.
- S5.10 Contract Review gegen README, PRODUCT, Roadmap A und diese Roadmap.
- S5.11 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Gepruefter Entsorgungsmodus.
- Klare Liste ausgefuehrter Checks und offener manueller Smokes.

Exit-Kriterium:

- Alle lokal moeglichen Checks sind erledigt oder bewusst als nicht verfuegbar markiert.

### S5 Ergebnisprotokoll 15.05.2026

Ausgefuehrte lokale Checks:

- S5.1 Syntax:
  - `node --check app/main.js`
  - `node --check app/core/router.js`
  - `node --check app/modules/waste.js`
  - `node --check sw.js`
  - `node --check scripts/update-waste-calendar.mjs`
- S5.2 Diff-/Whitespace:
  - `git diff --check -- index.html app/app.css app/core/router.js app/main.js app/modules/waste.js app/styles/waste.css sw.js assets/data/waste-calendar.axams.json scripts/update-waste-calendar.mjs "docs/HESTIA Entsorgung UI Roadmap.md"`
  - Zusatz-Whitespace-Smoke fuer neue, noch ungetrackte Dateien `app/modules/waste.js` und `app/styles/waste.css`.
- S5.5 Daten-/Datums-Smokes:
  - JSON parsebar.
  - `schemaVersion === 1`.
  - drei Collections: Biomuell, Restmuell, Gelber Sack.
  - aktuelles JSON liefert als naechsten Termin Biomuell am `2026-05-19`.
  - Home-Ticker fuer `2026-05-15`: `In 4 Tagen Biomuell`.
  - lokaler ISO-Dateparser akzeptiert gueltige Daten und verwirft ungueltige Daten.
  - `Heute`, `Morgen`, `In 4 Tagen` und 7+-Tage-Datumsdetail geprueft.
  - Mehrfachtermin-Ticker geprueft.
  - keine kommenden Termine geprueft.
- S5.5/S5.6 Render-/Fallback-Smokes mit Fake-DOM:
  - erfolgreiches JSON fuellt Home-Ticker, Summary, Collection-Liste und Touchlog.
  - blockiertes JSON erzeugt ruhigen Fallback und `waste-calendar-load-failed`.
  - leeres JSON erzeugt ruhigen Fallback.
  - altes/past-only JSON erzeugt `Keine kommenden Termine`.
  - knappes JSON erzeugt `Daten reichen nur bis ...`.
- S5.5 Recyclinghof-Smokes:
  - Montag waehrend offen.
  - Mittwoch 11:30 offen bis 12:00.
  - Mittwoch 12:30 geschlossen, oeffnet 13:00.
  - Samstag nach 12:00 geschlossen, naechste Oeffnung Montag.
- S5.6 PWA-/Cache-Smoke:
  - `CACHE_VERSION` ist `v30`.
  - `./app/styles/waste.css`, `./app/modules/waste.js` und `./assets/data/waste-calendar.axams.json` sind im App-Shell-Cache.
- S5.7 Regression:
  - Router-Smoke mit Fake-DOM:
    - `waste` oeffnet Waste.
    - unbekanntes Ziel deaktiviert keinen Screen.
    - Rueckweg `home` funktioniert.
  - Statischer HTML/Main-Smoke:
    - Home-Waste-Kachel vorhanden.
    - `screen-waste`, `screen-writing`, `screen-shopping` vorhanden.
    - PWA-Installbanner und Installbutton vorhanden.
    - Diagnostics-Toggle und Touchlog-Panel vorhanden.
    - Kassa-Karussell-Markup und `initKassaCarousel(document, touchlog)` vorhanden.
    - `initWaste(document, touchlog)` vorhanden.
- S5.8 Copy Review, lokal/statisch:
  - Fraktionskarten zeigen kein Wohngebiet mehr.
  - Recyclinghofdetails zeigen nur Status, naechste Oeffnung und regulaere Wochenfenster.
  - Datumsdetail ist nicht mehr redundant:
    - 0-6 Tage: volles Datum plus relative Naehe.
    - ab 7 Tage: nur volles Datum.
  - Fallbacks bleiben ruhig.
- S5.9 Code Review:
  - Waste-Modul kapselt JSON-Laden, Datumslogik, Ticker, Recyclinghof und Fallbacks.
  - `initWaste` wird nicht awaited und blockiert Kernflows nicht.
  - Router bleibt generisch.
  - Waste-CSS ist auf Waste/Home-Waste gescoped.
- S5.10 Contract Review:
  - keine Supabase-, SQL-, Auth- oder Household-Key-Aenderung.
  - keine Gemeinde-Live-Abfrage in der App.
  - keine iCal-/Axams-Live-Abfrage in der App.
  - keine Push-, Reminder-, Kalender- oder Notification-Logik.
  - Browser-Datenquelle fuer Muelltermine bleibt nur `assets/data/waste-calendar.axams.json`.

Findings:

- S5-F1: Bei leerer Collection-Liste blieb die Abholterminliste ohne explizite Fallback-Zeile.
- S5-F2: Echte Browser-Smokes sind in dieser Session nicht automatisiert wiederholbar, weil kein lokales Playwright-Paket im Projekt verfuegbar ist.

Korrekturen:

- S5-F1 behoben:
  - `renderCollections` zeigt bei leerer Liste `Keine Abholtermine im lokalen Kalender.`
  - Init-/Fallback-Smoke fuer leeres JSON danach gruen.
- S5-F2 als manueller Resttest festgehalten.

Nicht lokal vollstaendig geprueft:

- Echte Desktop-Darstellung im Browser.
- Echte Mobile-Darstellung und Touchflaechen.
- Echte visuelle Ueberlaufpruefung.
- Echte Offline-Nutzung mit aktivem Service Worker nach Browser-Erstladung.
- Installierte-PWA-Updateverhalten nach Deploy.

Schritt-Abnahme:

- S5 ist abgeschlossen.
- Exit-Kriterium ist erfuellt:
  - alle lokal moeglichen Checks sind ausgefuehrt.
  - nicht lokal belastbar pruefbare Checks sind als manuelle Resttests markiert.

Commit-Empfehlung:

- Weiterhin noch keinen Commit direkt nach S5.
- Empfehlung bleibt: gemeinsamer Commit nach S6, damit Code, QA-Doku, Module Overviews und Roadmap-Abschluss zusammenpassen.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Source-of-Truth-Dokus synchronisieren.

Substeps:

- S6.1 `docs/modules/Waste Module Overview.md` um UI-, Recyclinghof-, Datumslogik-, Offline- und Fallback-Vertrag erweitern.
- S6.2 `docs/modules/Home Module Overview.md` aktualisieren.
- S6.3 `docs/modules/CSS Module Overview.md` aktualisieren.
- S6.4 `docs/modules/PWA Install Module Overview.md` aktualisieren.
- S6.5 `docs/QA_CHECKS.md` erweitern.
- S6.6 `docs/future roadmaps.md` nach Abschluss aktualisieren.
- S6.7 Roadmap mit Ergebnisprotokollen aktualisieren.
- S6.8 Finaler Contract Review:
  - Roadmap vs. Code
  - Roadmap vs. Roadmap A
  - Roadmap vs. Module Overviews
  - Roadmap vs. QA
- S6.9 Abschluss-Abnahme.
- S6.10 Commit-Empfehlung.
- S6.11 Archiv-Entscheidung.

Output:

- Code, Doku, QA und Roadmap sprechen denselben Entsorgungs-UI-Vertrag.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll 15.05.2026

Umsetzung:

- `docs/modules/Waste Module Overview.md` final erweitert:
  - Datenpipeline.
  - Browser-UI.
  - Home-Ticker.
  - Muelluebersicht.
  - Datumslogik.
  - Recyclinghof-Status.
  - PWA-/Offline-Vertrag.
  - Fallbacks.
  - Touchlog-Ereignisse.
- `docs/modules/Home Module Overview.md` aktualisiert:
  - Home bleibt zwei Kernintentionen.
  - `Muell` ist leise Haushaltsperipherie.
  - Router kennt `waste`, unbekannte Ziele werden ignoriert.
- `docs/modules/CSS Module Overview.md` aktualisiert:
  - `app/styles/waste.css` in Load Order und Owner-Tabelle.
  - Waste-Selektoren muessen an `.home-waste-card` oder `.screen-waste` gebunden bleiben.
- `docs/modules/PWA Install Module Overview.md` aktualisiert:
  - Waste-CSS, Waste-Modul und Waste-JSON sind App-Shell-Cache-Assets.
- `docs/modules/Touchlog Module Overview.md` aktualisiert:
  - Kategorie `waste`.
  - genau zwei Waste-Ladeereignisse.
  - kein Termin-/Collection-/Recyclinghof-Minutenlogging.
- `docs/QA_CHECKS.md` erweitert:
  - Home-Muell-Kachel.
  - Muelluebersicht.
  - Datumsdetail.
  - Recyclinghof.
  - Fallbacks.
  - PWA-/Offline-Checks.
  - Nichtziele.
- `docs/future roadmaps.md` aktualisiert:
  - Roadmap 5B als umgesetzt markiert.
  - Link auf kuenftige Archivdatei angepasst.
  - Erinnerungen bleiben Future Sketch.

Contract Review:

- Roadmap vs. Code:
  - `index.html` enthaelt Home-Muell-Kachel und `screen-waste`.
  - `app/modules/waste.js` nutzt nur lokales JSON, kapselt Ticker, Datumsdetails, Recyclinghof und Fallbacks.
  - `app/styles/waste.css` ist auf `.home-waste-card` und `.screen-waste` begrenzt.
  - `app/main.js` startet Waste ohne Kernflows zu blockieren.
  - `sw.js` cached Waste-CSS, Waste-Modul und JSON.
- Roadmap vs. Roadmap 5A:
  - JSON-Pfad bleibt `assets/data/waste-calendar.axams.json`.
  - Kein Browser-iCal-Fetch.
  - Keine Aenderung an Action-/Parser-Grundvertrag ausser sichtbaren Label-Anpassungen aus dem laufenden 5B-Kontext.
- Roadmap vs. Module Overviews:
  - Waste, Home, CSS, PWA und Touchlog beschreiben denselben UI-/Cache-/Diagnose-Schnitt.
- Roadmap vs. QA:
  - QA kennt Datenpipeline und sichtbare Entsorgungs-UI getrennt.
  - Manuelle Resttests sind sichtbar.
- Produktvertrag:
  - keine Push-, Reminder- oder Kalenderlogik.
  - keine Supabase-, Auth-, RLS- oder Household-Key-Aenderung.
  - Home bleibt ruhig und nicht dashboardartig.

Findings:

- S6-F1: Die bisherige Waste Overview beschrieb nur das Datenfundament und musste zum Gesamtmodul erweitert werden.
- S6-F2: Home-, CSS-, PWA- und Touchlog-Overviews kannten die neue Waste-UI noch nicht.
- S6-F3: QA trennte Datenpipeline und sichtbare Entsorgungs-UI noch nicht.
- S6-F4: `future roadmaps.md` zeigte Roadmap 5B noch als aktive Detailroadmap.
- S6-F5: Der finale Syntax-Check fand eine doppelt eingefuegte `bio-west`-Objektstruktur in `scripts/update-waste-calendar.mjs`.

Korrekturen:

- S6-F1 bis S6-F4 wurden durch die oben genannten Doku-Syncs behoben.
- S6-F5 behoben:
  - doppelte Objektstruktur entfernt.
  - `node --check scripts/update-waste-calendar.mjs` wieder gruen.
  - Script-Labels und JSON-Labels sind konsistent: Biomuell, Restmuell, Gelber Sack.

Abschluss-Abnahme:

- S6 ist abgeschlossen.
- Code, Doku, QA und Roadmap sprechen denselben Entsorgungs-UI-Vertrag.
- Roadmap ist archivbereit.

Commit-Empfehlung:

- Jetzt sinnvoll: ein gemeinsamer Commit fuer Roadmap 5B UI inklusive Code, Tests, Doku-Sync und Archivierung.

## Smokechecks / Regression

- Home bleibt ruhig.
- Entsorgung oeffnet als eigener Modus.
- Schreiben und Einkaufen bleiben unveraendert.
- JSON wird lokal geladen.
- Naechster Termin wird korrekt berechnet.
- Biomuell westlich, Restmuell und Gelber Sack werden angezeigt.
- Recyclinghof-Status ist fuer Montag, Mittwoch, Samstag und geschlossene Tage plausibel.
- Fehlendes oder altes JSON erzeugt ruhigen Fallback.
- Offline/PWA-Verhalten bleibt plausibel.
- Keine Push-, Reminder- oder Kalenderlogik wurde eingefuehrt.

## Abnahmekriterien

- Stephan kann auf einen Blick sehen, was als Naechstes raus muss.
- Der Recyclinghof-Status ist schnell verstaendlich.
- Der Bereich wirkt wie HESTIA, nicht wie ein Amtsportal.
- Die UI bleibt ruhig und sekundar zum Einkaufskern.
- Roadmap C kann spaeter Erinnerungen darauf aufbauen, ohne Roadmap B umzudeuten.
