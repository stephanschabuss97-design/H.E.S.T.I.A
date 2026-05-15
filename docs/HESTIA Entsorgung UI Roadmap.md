# HESTIA Roadmap 5B - Entsorgung UI

## Ziel (klar und pruefbar)

HESTIA soll einen ruhigen Entsorgungsbereich bekommen, der die naechsten relevanten Muelltermine und den Recyclinghof-Status alltagstauglich zeigt, ohne aus HESTIA einen allgemeinen Familien-Organizer oder ein Gemeindeportal zu machen.

Pruefbare Zieldefinition:

- Home bekommt einen leisen Einstieg `Entsorgung`, der `Schreiben` und `Einkaufen` nicht ueberholt.
- Es gibt einen eigenen Entsorgungsmodus.
- Der Modus liest das lokale JSON aus Roadmap 5A.
- Angezeigt werden:
  - naechster relevanter Termin
  - Biomuell westlich Axamer Bach
  - Restmuell Axams Dorf
  - Gelber Sack Axams Dorf
  - Recyclinghof-Status und naechste Oeffnung
- Offline-/Fallback-Zustaende sind ehrlich und ruhig.
- Keine Push-, Reminder- oder Kalenderlogik wird eingefuehrt.

## Problemzusammenfassung

Die Entsorgungsdaten allein helfen noch nicht im Alltag. Der Nutzen entsteht erst, wenn HESTIA schnell beantwortet: Was muss als Naechstes raus? Ist der Recyclinghof gerade offen? Wann oeffnet er wieder? Diese Fragen passen gut zur Haushaltsperipherie, solange sie leise und informativ bleiben.

Die UI darf nicht wie ein Dashboard riechen und darf die Kernintentionen `Schreiben` und `Einkaufen` nicht verwischen. Der Entsorgungsbereich ist deshalb ein kleiner dritter Haushaltsmodus, nicht der Start eines Familien-Organizers.

## Scope

- Home:
  - leiser Einstieg fuer `Entsorgung`
  - klare Hierarchie unter oder neben den Kernintentionen, je nach S1/S2-Entscheidung
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
- Not in Scope grenzt Push, Reminder, Kalender, Standort, PDF-Scraping und Live-Fetch aus.
- Guardrails verbieten draengende Copy und allgemeines Dashboard.
- Recyclinghof-Sondertage werden in V1 nur genutzt, wenn ein stabiler Datenvertrag vorliegt.
- S5 verlangt Fallback- und Offline-Smokes.
- Roadmap A bleibt Voraussetzung fuer die Terminquelle.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System-, UI- und Datenvertragsdetektivarbeit | TODO | Roadmap 5A, Home, Router, PWA, CSS und Waste-JSON lesen. |
| S2 | Fachlicher/technischer Contract Review | TODO | Home-Hierarchie, Entsorgungsmodus, Copy und Datenfallback finalisieren. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | TODO | Mobile, Offline, alte Daten, Recyclinghofzeiten und Navigation pruefen. |
| S4 | Umsetzung | TODO | Home-Einstieg, Screen, Modul, Styles, PWA-Cache und Fallbacks bauen. |
| S5 | Tests, Code Review und Contract Review | TODO | Desktop-/Mobile-/Offline-/Router-/Regression-Smokes ausfuehren. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | TODO | Module Overviews, QA, Future Roadmaps und Roadmap final synchronisieren. |

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

## S4 - Umsetzung

Ziel:

- Entsorgungsmodus bauen, ohne Roadmap-A-Datenpipeline oder andere Kernflows umzubauen.

Substeps:

- S4.1 Home-Einstieg und Router-Ziel vorbereiten.
- S4.2 Entsorgungs-Screen in `index.html` anlegen.
- S4.3 `app/modules/waste.js` anlegen:
  - JSON laden
  - Collections auswerten
  - naechste Termine berechnen
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
