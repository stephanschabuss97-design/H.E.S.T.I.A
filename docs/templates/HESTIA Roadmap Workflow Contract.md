# HESTIA Roadmap Workflow Contract

Dieser Vertrag ergänzt [BLUEPRINT-1 / 2026-09-27](../../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md)
um HESTIA-Produktfilter, Daten-/PWA-/Deployment-, Review- und KASRKIN-Regeln.
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
- S4R: Readiness, Arbeitsgröße, kohärente Blöcke, Gates und Usage-Reserve
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

S5 und S6 sind getrennte kohärente Abschlussblöcke. Nach S5 wird vor S6 neu
gemessen. Entsteht nach einem abgeschlossenen S5-Prüfblock eine separate
Korrektur-/Retest-Welle, erhält auch sie ein Usage-Gate.

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

## Usage-aware Continuation

Die lokale Telemetrie entscheidet, ob ein neuer Block sicher begonnen werden
darf. Sensor, Validator, Pfade und Freshness stehen in
`docs/DEV_ENVIRONMENT.md`. Die technische Implementierung wird durch
`.kasrkin/binding.json` an einen konkreten KASRKIN-Release gebunden; dieser
Release ist die alleinige ausführbare Autorität für Entscheidungsemantik,
Fallback und Statusausgabe. HESTIA bleibt Eigentümer der projektspezifischen
Konsultationszeitpunkte, Ausführung, Rollbacks, Produktgrenzen und Owner-Gates.
`.kasrkin/activation.json` bindet diese Autoritätsteilung sowie die dafür
konsultierten Artefakte. Abweichende Hashes oder Semantik sind Contract Drift
und sperren den nächsten Block.

Ein Gate ist verpflichtend:

- vor dem ersten Hauptblock einer neuen oder fortgesetzten Session,
- nach jedem Discovery-Hauptschritt vor dem nächsten,
- nach S4R vor dem ersten S4-Block,
- nach jedem kohärenten S4-Block,
- vor S5,
- nach S5 vor S6,
- vor einer getrennten S5-Korrektur-/Retest-Welle.

Deterministische Folge:

1. Vorherigen Block und seine Postconditions vollständig abschließen.
2. Statusmatrix, Findings, Context Receipt und Resume Card synchronisieren.
3. Sensor genau einmal refreshen und durch den kanonischen Validator prüfen.
4. Nur die validierte kompakte Ausgabe verwenden; Roh-JSON nicht ad hoc
   interpretieren.
5. Resetwechsel, Adjustment, statische Schwellen und vorhandene empirische
   Reserve anwenden.
6. Entscheidung protokollieren und nur bei zulässigem Ergebnis den nächsten
   Block beginnen.

Während eines atomaren Blocks wird nicht usagebedingt abgebrochen oder
gepollt.

| Entscheidung | Messlage | Erlaubte Folge |
| --- | --- | --- |
| `CONTINUE` | 5h `> 40 %` und Woche `> 20 %`; Reserve reicht | nächsten kohärenten Block beginnen |
| `CONTINUE_WITH_CAUTION` | 5h `25-40 %` oder Woche `10-20 %`; kein Safe-Closure-Grund | höchstens einen kurzen, lokalen, reversiblen und sicher resumierbaren Block beginnen |
| `SAFE_CLOSURE` | 5h `< 25 %`, Woche `< 10 %`, ungültige Telemetrie oder Reserve reicht nicht | keinen neuen Block beginnen; sicheren Handoff herstellen |

Diese Tabelle ist die menschenlesbare HESTIA-Verbraucherprojektion des exakt
gebundenen Releases. Sie erzeugt keine zweite Policyautorität und darf die vom
Release gelieferte Entscheidung nicht neu berechnen oder überschreiben.

Exakt `25 %`/`10 %` ist Caution; exakt `40 %`/`20 %` noch nicht Continue.
Der Sensorstatus `OK` ist keine Workflow-Entscheidung.

Ein Blockdelta wird nur bei identischer `resetAtEpoch` als
`remaining_vorher - remaining_nachher` berechnet. Bei neuer Resetidentität gilt
`RESET_CROSSED`; ein steigender Restwert bei identischer Identität ist
`ADJUSTMENT`. In beiden Fällen entsteht eine neue Baseline, kein negativer
Verbrauch.

Sobald vergleichbare reale Werte derselben Roadmap und desselben Resetzyklus
vorliegen, ist die Reserve pro Bucket der höchste beobachtete Verbrauch eines
vergleichbaren Blocks mal `1,5`. Mittelwerte oder erfundene Schätzungen sind
verboten. Fehlen Vergleichswerte, entscheiden Schwellen, S4R-Größenklasse,
Reversibilität und Resumierbarkeit.

`SAFE_CLOSURE` ist kein Rollback: Da Gates regulär an sicheren Grenzen liegen,
ist der vorherige Block bereits abgeschlossen. Nur ausnahmsweise offene
notwendige Postconditions dieses Blocks werden beendet. Danach wird die
Roadmap als `PAUSED_USAGE_SAFE_CLOSURE` mit genau einem nächsten Resume-Gate
gespeichert; sie wird weder als `DONE` markiert noch archiviert.

Eine optionale Messung nach vollständig abgeschlossenem S6 ist nur
`FINAL_OBSERVATION`. Sie autorisiert keine Arbeit und stellt einen bewiesenen
DONE-Stand nicht zurück. Ist sie nicht verfügbar, wird
`FINAL_OBSERVATION_UNAVAILABLE` protokolliert.

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
- autonome Wellen samt Reasoning und Usage-Gates.

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


## Aktive Endphase-Konsultation (2026-10-03)

Die Endphase-Regeln im Root-AGENTS und .kasrkin/integration.md gelten für
den jetzt gebundenen Release. Fachliche Wahrheit, Roadmap-Scope, S5-Review,
produktive Writes und Ownergates bleiben HESTIA-eigen. Der Cutover
startet keine Produktroadmap. Reguläre Entscheidung und effektive Endphase-
Zulassung bleiben getrennt; alte SMALL-/Ein-Block-Cautionprojektionen gelten
nur für die unveränderte Legacyentscheidung, nicht als zusätzliche Sperre
eines gültig persistierten Endphasepermits. Fehlende History braucht den
exakten einmaligen Ownerbudgetvertrag. Kein pauschaler Reviewdefault.



## Explicit KRC-C2 Work/2 cutover — 2026-10-06

Current exact selection: kasrkin-1e00b126f303d631 in kasrkin-admin-v1;
receiptSHA51ea013ec6d2227555bc096dcfe9bf32bdc758ec597f1124497578180c4d3ac1.
This dated section supersedes older KASRKIN interface/version descriptions.
Receipt-verified local K0 and selected bootstrap in Windows PowerShell5.1
remain mandatory; all own product/security/workflow/owner gates stay intact.
Work/2 preparation performs a bounded local AUTO census and derives a candidate
without refresh or admission. Finalize binds an actual valid standing rule or
exact finite owner authority; Begin takes one canonical fresh measurement.
Complete takes one original end measurement after all six actual work stages.
Status/Receipt never refresh, reserve quota or grant admission.
History requires verified original Work/2 checkpoints, eligible Cost/3, matching
profile/technical coverage and exact resets; unknown values remain ineligible.
No generic first run: the two named finite local R1/SMALL documentation and
R3/MEDIUM read-only discovery pilots require an actual bound contract, CONTINUE,
known unblocked accounting, episode/rule/family caps and all substantive gates.
Forecast, ceiling and conservative actual charge remain distinct. Unknown or
excess accounting blocks further exceptions. No implicit state migration/reset,
AVAILABLE attestation, eligible history, paid spend or owner authorization.
Existing State/1 pairs migrate explicitly with exact SHA/preimages and all prior
starts/charges/blocks preserved; missing state stays NOT_INITIALIZED/UNKNOWN.
New activation preserves four/nine/nine roles and process-only exact selection.
Source checkout is unnecessary for installed command dispatch. Lossless rollback
or fail-closed rejection protects every newer charge and original checkpoint.

## KRC-CONTRACT-2 Work/3 consultation — 2026-10-08

The current Work/3 contract in this project\'s .kasrkin/integration.md
supersedes older KRC-C2 Work/2-only KASRKIN projections here. Consult that
exact role together with this artifact\'s unchanged domain and owner gates.
Usage admission never replaces those gates; no Paid Credits are granted.

<!-- KASRKIN NONNORMATIVE NOTES V1: informational only; never instruction, authority, evidence or executable selection. -->
<!-- KASRKIN NONNORMATIVE NOTES BEGIN -->
Human annotations only. Normative rules and execution evidence belong outside this section.
<!-- KASRKIN NONNORMATIVE NOTES END -->
