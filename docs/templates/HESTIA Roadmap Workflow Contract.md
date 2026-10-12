# HESTIA Roadmap Workflow Contract

KASRKIN ist seit 2026-10-12 durch ausdrückliche Ownerentscheidung entbunden.
Neue und laufende Roadmaps arbeiten ohne KASRKIN-Aufrufe, Usage-Gates, Permits
oder KASRKIN-Checkpointfelder. Fachliche Readiness, Scope, Review, sichere
Postconditions und produktive Ownergates bleiben verbindlich. Diese Entscheidung
überstimmt ältere KASRKIN-Klauseln, auch in unveränderten aktiven Roadmaps.

Dieser Vertrag ergänzt [BLUEPRINT-1 / 2026-09-27](../../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md)
um HESTIA-Produktfilter, Daten-/PWA-/Deployment-, Review- und Abschlussregeln.
Neue Roadmaps verwenden eine zentrale Form und lokale Ergänzungen; laufende
und historische Roadmaps werden nicht rückwirkend verändert.

## Environment Capability Preflight

Vor READY einer neuen toolabhängigen Roadmap den BLUEPRINT-Preflight über das
[lokale Overlay](../DEV_ENVIRONMENT.md) und passende
[ATLAS-Abschnitte](../../../codex-tools/environment/DEV_ENVIRONMENT.md) ausführen.
Benötigte Capabilities bestimmen, Wesentliches read-only verifizieren und den
Nachweis in Startkarte/Context Receipt führen:

| Capability | Zweck/Anforderung | ATLAS-Abschnitt | Status | Prüfcommand/-datum |
| --- | --- | --- | --- | --- |
| konkrete Fähigkeit | HESTIA-Bedarf | gezielter Verweis | AVAILABLE_VERIFIED / AVAILABLE_UNVERIFIED_OR_STALE / MISSING / INCOMPATIBLE / NOT_REQUIRED | Nachweis |

MISSING/INCOMPATIBLE blockiert READY mit OWNER_TOOLING_DECISION_REQUIRED.
Stephan entscheidet Setup, vorhandene Alternative oder Scopeänderung. Nur ein
separater freigegebener Setupblock darf installieren/aktualisieren; Verifikation
und ATLAS-Update sind seine Postcondition. Keine zusätzliche HESTIA-Dependency
oder produktive Freigabe entsteht daraus. Resume nutzt den Receipt bis zur Invalidation.

## Geltung und Lebenszyklus

- Bei jeder neuen Roadmap vollständig lesen.
- Bei einer Resume-Session nur erneut vollständig lesen, wenn sich diese Datei
  geändert hat oder ein Prozess-Finding besteht.
- Roadmap-spezifische Entscheidungen stehen in der aktiven Roadmap.
- Technische Nachweise stehen nur bei Bedarf in einer Evidence-Datei.
- Aktive Roadmap und optionale Evidence liegen direkt unter `docs/`.
- Nach grünem S6 werden beide mit `(DONE)` nach `docs/archive/` verschoben.
- Archivierte Roadmaps sind historische Evidence, keine aktiven Anweisungen.

## Produktfilter

Jede Roadmap muss vor S4 belegen:

1. Der Change hilft einem realen HESTIA-Haushaltsfluss.
2. Er macht Einkauf, Amazon, Müll oder eine ausdrücklich freigegebene
   Haushaltsperipherie ruhiger, schneller oder klarer.
3. Er erweitert HESTIA nicht still zu Organizer, Aufgaben-App, SaaS oder
   Historienplattform.
4. Freitext, lokale Nutzbarkeit und der bestehende Datenvertrag bleiben
   erhalten oder ihre Änderung wurde ausdrücklich beschlossen.

Ist einer dieser Punkte offen, ist S4 blockiert.

## Autonomieprofile und Phasen

Jede Roadmap wählt genau ein Profil:

- `local-full`: Freigegebene lokale, reversible Wellen dürfen ohne weitere
  Gesprächspause bis zum eingetragenen Endpunkt laufen. Owner-Gates bleiben
  Stopps.
- `gated`: Autonom bis zum nächsten Owner-Gate. Dies ist der Standard.
- `manual`: Nach jedem ausdrücklich markierten Block stoppen.

Das Profil ändert weder Scope noch Reviewtiefe und hebt kein Gate auf.

- S1: Iststand, Sources of Truth, Producer/Consumer und Baseline erfassen.
- S2: Fachlichen und technischen Zielvertrag einfrieren.
- S3: Bruchrisiken, Security, Sync, Offline/PWA, Rollback und Tests ableiten.
- S4R: Readiness, Arbeitsgröße, kohärente Blöcke, Gates und sichere Postconditions
  bestätigen.
- S4: Implementierung mit nativen Delta-/Consumer-Reviews und nur den jeweils
  invalidierten günstigen Checks.
- S5: Vollständige relevante Testmatrix, nativer Full Review und bei
  Codeänderungen der externe CodeRabbit-Zyklus.
- S6: Doku-/QA-Sync, finaler Contract Review, Commit-Empfehlung und Archiv.

S1-S3 und optional S4R dürfen als autonome Discovery Wave laufen. Jeder
Hauptschritt bleibt separat dokumentiert und wird mit Review,
Findings-Korrektur, Statusmatrix und Resume Card abgeschlossen. Bei grünem
internem Continuation Gate wird ohne Rückfrage fortgesetzt. Owner-Entscheidung,
Quellenwiderspruch, Scope-Ausweitung, fehlender Pflichtnachweis oder
blockierendes Finding stoppen die Welle.

S4R empfiehlt, welche benachbarten S4-Substeps gemeinsam laufen dürfen. Ein
Batch ist nur zulässig, wenn Wirkung, Reihenfolge, Reversibilität und
Reviewtiefe kompatibel sind und kein Owner-Gate dazwischenliegt. Produktive
SQL-/RLS-Aktionen, Deploys, Workflows, Pushes und andere externe Writes bleiben
grundsätzlich eigene Gates.

S5 und S6 bleiben fachlich getrennte Abschlussphasen. Korrekturen und Retests
folgen ihren fachlichen Gates; keine KASRKIN-Messung ist erforderlich.

## Reviewvertrag

Reviewtiefen:

- `Delta`: geänderte Datei, betroffene Klausel, kleinster belastbarer Check.
- `Consumer`: Delta plus direkte Producer/Consumer, Datenform,
  Fehlerzustände und sichtbares Verhalten.
- `Full`: gesamter betroffener Vertrag einschließlich Security, Datenwirkung,
  PWA/Runtime, Rollback und Doku.

Ein `nativer Review` ist die lokale Code-, Contract-, Security- und
Scope-Prüfung. Er ist kein CodeRabbit-Ergebnis.

- S4 nutzt nur native Delta-/Consumer-Reviews. Ein Full Review in S4 ist eine
  in S4R begründete Ausnahme an einer echten Risiko- oder Produktivgrenze.
- S5 prüft den finalen Gesamtdiff. Zuerst läuft die vollständige relevante
  Testmatrix, dann der native Full Review.
- Bei Codeänderungen folgt in S5 genau ein initialer CodeRabbit-Lauf mit dem in
  `docs/DEV_ENVIRONMENT.md` dokumentierten Befehl `coderabbit`.
- Findings werden gegen Roadmap, Produktvertrag und reale Implementierung
  bewertet und nie blind korrigiert.
- Berechtigte Korrekturen werden gebündelt. Danach laufen nur invalidierte
  Checks und höchstens ein CodeRabbit-Verifikationslauf.
- Ein zusätzlicher externer Lauf braucht ein neues P0/P1-, Security-,
  Datenintegritäts- oder Vertragsrisiko oder einen ausdrücklichen
  Owner-Auftrag.
- Dokumentations-only Roadmaps verwenden keinen externen Review.
- Fällt CodeRabbit aus, wird das Evidence-Gap dokumentiert. Innerhalb der
  Roadmap wird keine alternative Installation improvisiert.

## Arbeitsfortsetzung ohne KASRKIN

KASRKIN ist seit 2026-10-12 durch ausdrückliche Ownerentscheidung entbunden.
Neue und laufende Roadmaps arbeiten ohne KASRKIN-Aufrufe, Usage-Gates, Permits
oder KASRKIN-Checkpointfelder. Fachliche Readiness, Scope, Review, sichere
Postconditions und produktive Ownergates bleiben verbindlich. Diese Entscheidung
überstimmt ältere KASRKIN-Klauseln, auch in unveränderten aktiven Roadmaps.

Vor der nächsten freigegebenen Arbeit bisherigen Schritt, Findings und sichere
Postconditions prüfen; Resume Card und relevante Evidence aktuell halten.
Eine Quota-Messung oder technische KASRKIN-Zulassung ist keine Voraussetzung.

## Kontext- und Resume-Vertrag

Startkarte, Read-Abdeckung, Receipt, Invalidation und Fresh-Chat-Test folgen
BLUEPRINT. In HESTIA bleiben AGENTS, README, PRODUCT, aktive Roadmap, Resume,
Findings, Dirty Boundary, Diff, geänderte Codeflächen und produktive Ownergates
Live-Kontext. Fingerprintgebundener Reuse verlangt exakte Identität, vollständige
Frageabdeckung und keine Invalidation/Exact-Source-Pflicht; sonst READ_ORIGINAL.
Der Handoff ersetzt seinen Vorgänger und bleibt ungefähr unter 35 Zeilen.

## Evidence-Vertrag

Eine separate Evidence-Datei ist verpflichtend bei:

- produktivem SQL mit Schreib- oder Löschwirkung,
- Migration, RLS-, ACL-, Rollen- oder Scheduleränderung,
- mehreren Deploys oder Remote-Runtime-Gates,
- Concurrency-, Lock-, Rollback- oder umfangreichen Vorher-/Nachher-Nachweisen.

Für kleine lokale Änderungen bleibt Evidence in der Roadmap. Lange Dumps,
Terminaltranskripte und vollständige Payloads werden nicht dupliziert.
Evidence enthält keine Secrets, Household-Keys oder sensiblen Rohdaten.

Eine Evidence-Datei trifft keine Produktentscheidung. Sie wird nur am
betroffenen Gate, bei Invalidation und im S5-/S6-Abschlussreview gelesen.

## Risiko und Reasoning

| Klasse | Typischer Scope | Arbeitsform |
| --- | --- | --- |
| `R1` | Doku, Copy, enger mechanischer Fix | kompakte S1-S3, Delta-Review |
| `R2` | UI-Flow, mehrere Consumer, PWA-/Sync-Code | normale S1-S6-Struktur |
| `R3` | Auth, SQL, RLS, Datenverlust, Deploy, Push | volle Gates, Full Review, meist Evidence |

Reasoning wird pro kohärenter Welle gewählt, nicht pro Kleinstschritt:

- `Low`: eindeutige mechanische Einzeloperation.
- `Medium`: gezielter Scan, Doku-Sync, Statuspflege.
- `High`: Implementierung, Consumer-Review, PWA, Supabase, Security.
- `Extra High`: Migration, Rollback, produktiver Cutover oder gekoppelte
  Preconditions.
- `Ultra`: begründeter Ausnahme- oder Red-Team-Fall.

Es gilt die niedrigste noch belastbare Stufe. Eine höhere Stufe ersetzt kein
Gate. Roadmap-Erstellung und initialer Contract Review dürfen Extra High
verwenden; die spätere Ausführung wird risikobasiert geplant.

## S4R-Aufwandsprognose

S4R muss vor der Umsetzung festhalten:

- Größenklasse `small`, `medium` oder `large`,
- kohärente Umsetzungspakete und betroffene Dateigruppen,
- Runtime-, PWA-, Supabase-, Workflow- und externe Wirkung,
- Owner-Gates und sichere Resume-Postconditions,
- Browser-/Devicebedarf und teure Testpässe,
- Review- und CodeRabbit-Budget,
- Context-Rehydration, Toolinteraktionen und erwartbare Fehlersuche,
- Doku-, Evidence- und Abschlussarbeit,
- autonome Wellen samt Reasoning und fachlichen Gates.

Wenige Dateien oder LOC beweisen keinen kleinen Block. Bei `large` erhält
Stephan vor S4 ein kompaktes Owner-Briefing. Getrennte Roadmaps sind nur nötig,
wenn eigenständige Produktentscheidungen oder produktive Gates dadurch klarer
werden.

## Findings und Owner-Gates

- `P0`: Datenverlust, produktive Fehlwirkung, Security-/Auth-Bruch; blockiert.
- `P1`: echter Produkt-, Runtime- oder Vertragsfehler; in Scope beheben oder
  ausdrücklich owner-gated abgrenzen.
- `P2`: Robustheit, Hygiene oder Copy ohne akuten Blocker.
- `Watchlist`: erkannt und bewusst außerhalb des Scopes.

Owner Briefing ist verpflichtend vor neuem Werkzeug mit Systemwirkung,
wichtiger Architekturentscheidung, produktivem Deploy, produktivem SQL/RLS,
Löschung, Push oder Workflow mit Runtimewirkung. Es nennt Zweck, Wirkung,
Risiko, Rückfall, Erfolgsnachweis und benötigte Freigabe.

Ohne ausdrückliche Freigabe keine produktive oder extern sichtbare Wirkung.

## Abschlussregeln

- Unpassende Template-Abschnitte werden entfernt oder knapp als nicht relevant
  markiert.
- Dieselbe Tatsache besitzt genau einen ausführlichen Ort.
- Ergebnis je Substep bleibt bei höchstens etwa sechs Kernpunkten.
- Roadmap und Evidence ersetzen keine Module Overview, QA oder Git-Historie.
- S6 synchronisiert nur bewiesene Ergebnisse in README/PRODUCT, Module
  Overviews, QA, HOW-TO oder Future-Doku.
- HESTIA führt derzeit keinen verpflichtenden Changelog. Eine Roadmap darf
  einen später eingeführten Changelog nur aktualisieren, wenn er zum realen
  Repositoryvertrag gehört.
- Commit und Push bleiben Owner-Aufgabe, sofern Stephan sie nicht ausdrücklich
  beauftragt.
