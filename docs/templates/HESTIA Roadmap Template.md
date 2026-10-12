# HESTIA Roadmap — lokale Ergänzungen

KASRKIN ist seit 2026-10-12 durch ausdrückliche Ownerentscheidung entbunden.
Neue und laufende Roadmaps arbeiten ohne KASRKIN-Aufrufe, Usage-Gates, Permits
oder KASRKIN-Checkpointfelder. Fachliche Readiness, Scope, Review, sichere
Postconditions und produktive Ownergates bleiben verbindlich. Diese Entscheidung
überstimmt ältere KASRKIN-Klauseln, auch in unveränderten aktiven Roadmaps.

Gemeinsamer Kern: [BLUEPRINT-1 / 2026-09-27](../../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md).
Dieser Adapter ist keine dritte vollständige Dokumentform. Zuerst
[Rolling Wave](../../../codex-tools/docs/blueprint/ROLLING_WAVE_ROADMAP_TEMPLATE.md)
oder [Execution](../../../codex-tools/docs/blueprint/EXECUTION_ROADMAP_TEMPLATE.md)
nach Arbeitsform wählen; nur bei echtem Bedarf ein Child.
Dann lokale Felder und benötigte S1–S6-Schritte ergänzen. Links an den Zielort anpassen.

## Lokale Ergänzungen vor READY

- [Workflowvertrag](HESTIA%20Roadmap%20Workflow%20Contract.md) vollständig lesen;
  AGENTS, README, PRODUCT und relevante Module/QA bleiben lokale Autorität.
- Metadaten: Haushaltsnutzen, R1/R2/R3, Daten-/PWA-/Sync-Wirkung, Reviewtiefe,
  Reasoning-Wellen, Arbeitsgröße, Autonomieprofil (Standard gated), Endpunkt,
  Discovery-Freigabe, Evidence-Owner/Datei und Archivziel.
- Produktfilter: Einkauf/Amazon/Muell oder ausdrücklich freigegebene Peripherie;
  keine Organizer-/SaaS-/Historienausweitung, Freitext und lokale Nutzung erhalten.
- Scope-Freeze: Datenmodell, Lifecycle, Sync, Runtime Config und Producer/Consumer;
  offene Grundsatzfragen blockieren S4.
- Capability-Receipt der zentralen Form konkret ausfüllen; fehlend/inkompatibel
  verlangt Ownerentscheidung, niemals automatische Installation.
- Startkarte ergänzt Operatoraktionen, fachliche Gates und sichere Postconditions.
- SQL/RLS, Secrets, Household-Key, Deployment, Workflow und Push bleiben owner-gated.
  Evidence enthält weder Secrets noch sensible Rohdaten.
- S4R prognostiziert Toolinteraktionen, Browser/Device, Tests, Fehlerpfad und Closure.
  S5 und S6 bleiben getrennte fachliche Phasen; kein CodeRabbit für Doku-only.

Die folgenden Phasen sind die lokale HESTIA-Ausprägung. Keine medizinischen
MIDAS-Gates übernehmen; reale Daten-/Security-/Deployrisiken nicht reduzieren.

## S1 - System- und Vertragsdetektivarbeit

1. Pflichtreferenzen und Baseline lesen.
2. Sources, Producer, Consumer, State, PWA und Runtime gezielt kartieren.
3. Fakten, Annahmen, Tests und offene Entscheidungen trennen.
4. Context Receipt und Invalidation Map anlegen.
5. Full Contract Review, Findings-Korrektur und Status-Sync.

Exit: Betroffene und nicht betroffene Schichten sind eindeutig.

## S2 - Fachlicher und technischer Zielvertrag

1. Ziel gegen Produktfilter und Module prüfen.
2. Daten-, Fehler-, Offline-, Sync-, Security- und Copy-Vertrag festlegen.
3. Scope und Nicht-Scope einfrieren.
4. S4-Pflichtpunkte und Watchlists zuordnen.
5. Full Contract Review, Findings-Korrektur und Status-Sync.

Exit: Keine Grundsatzfrage bleibt offen.

## S3 - Bruchrisiko-, Security- und Umsetzungsreview

1. Datenverlust, stille Überschreibung, falschen Syncstatus und Offlinebruch
   prüfen.
2. Auth/RLS, Race, Cache, Service Worker, Realtime und Rollback prüfen, soweit
   relevant.
3. S4-Schnitt, Reihenfolge, Stop-Bedingungen und S5-Checks ableiten.
4. Full Contract Review, Findings-Korrektur und Status-Sync.

Exit: Risiken sind geschlossen, owner-gated oder sichtbar deferred.

## S4R - Readiness Review

| Substep | Änderung | Dateien | Review | Checks/Evidence | Gate |
| --- | --- | --- | --- | --- | --- |
| S4.1 | `[Änderung]` | `[Pfade]` | `Delta/Consumer` | `[IDs]` | `[none/Owner]` |

- Scope-Freeze: `PASS/BLOCKED`
- Gültig übernommene Nachweise: `[IDs; nicht erneut ausführen]`
- Invalidation Map: `[Änderung -> Check]`
- Empfohlene S4-Blöcke: `[Zusammenlegung/Trennung]`
- Sichere Resume-Postcondition je Block: `[Zustand]`
- Fachliche Gates: `[Owner/Readiness/keine]`
- Aufwandsprognose:
  - Größe: `[small/medium/large]`
  - Context/Tools/Troubleshooting: `[kurz]`
  - Dateien/Runtime/PWA/Supabase: `[kurz]`
  - Browser/Device/Reviews: `[kurz]`
  - Doku/Evidence/Postconditions: `[kurz]`
  - Autonome Wellen und Reasoning: `[Liste]`
  - Sichere Postconditions und Fehlerpfad: `[kurz]`
- Owner-Briefing: `[PASS/nicht relevant]`

Exit: Umsetzung kann ohne neue Grundsatzentscheidung beginnen.

## S4 - Umsetzung

### S4.x - [Name]

- Vertrag/Finding: `[ID]`
- Dateien: `[Pfade]`
- Umsetzung: `[exaktes Delta]`
- Review: `nativer Delta/Consumer`
- Invalidierte Checks: `[IDs]`
- Owner-Gate: `[none/Gate]`

Ergebnis:

- Änderung: `[kurz]`
- Prüfung: `[ID]`
- Finding/Korrektur: `[ID/none]`
- Restrisiko: `[kurz/none]`
- Status: `DONE/BLOCKED`

## S5 - Testmatrix und Abschlussreview

Vor S5 fachliche Readiness prüfen.

1. Vollständige relevante statische, fachliche, Browser-/PWA- und
   gegebenenfalls disposable Testmatrix ausführen.
2. Nativen Full Code und Contract Review des finalen Diffs durchführen.
3. Bei Codeänderungen genau einen CodeRabbit-Initiallauf ausführen.
4. Findings fachlich bewerten; berechtigte Korrekturen bündeln.
5. Nur invalidierte Checks und höchstens einen CodeRabbit-Verifikationslauf
   ausführen.
6. Nicht ausführbare Smokes und Restrisiken ehrlich dokumentieren.

| ID | Ebene | Check | Status | Nachweis | Invalidiert durch |
| --- | --- | --- | --- | --- | --- |
| T-1 | lokal | `[Check]` | TODO | `[kurz/EV-ID]` | `[Dateien]` |
| T-2 | Browser/PWA | `[Smoke]` | TODO | `[kurz/EV-ID]` | `[UI/SW]` |
| T-3 | produktiv | `[Aktion]` | OWNER-GATED | `[EV-ID]` | `[Runtime]` |

Exit: Alle relevanten Checks sind grün oder sichtbar abgegrenzt.

## S6 - Doku-Sync und Abschluss

S6 beginnt nach grünem S5 und erfüllten fachlichen Gates.

1. README/PRODUCT und Module Overviews nur bei realer Vertragswirkung
   synchronisieren.
2. QA, Setup und Future-Doku nur mit bewiesenen Ergebnissen aktualisieren.
3. Finalen Contract Review durchführen und berechtigte Findings korrigieren.
4. Resume Card auf Abschluss setzen.
5. Commit-Empfehlung aus dem realen Diff ableiten.
6. Bei Folgeroadmap einen einmaligen fingerprintgebundenen Postimage Receipt
   in Roadmap oder Evidence ergänzen.
7. Roadmap und optionale Evidence mit `(DONE)` archivieren.

Ergebnis:

- Source-of-Truth-Sync: `[Dateien]`
- Finaler Review: `PASS/[Findings]`
- Restrisiken: `[Watchlists/none]`
- Archiv: `[Pfad]`
- Commit-Empfehlung:

```text
type(scope): kurze Beschreibung
```

Exit: Produkt, Code, Runtime, QA und Dokumentation beschreiben denselben
finalen Vertrag.
