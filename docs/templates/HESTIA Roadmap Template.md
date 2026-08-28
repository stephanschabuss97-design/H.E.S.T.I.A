# HESTIA Roadmap Template

Kompakte projektspezifische Vorlage. Der allgemeine Arbeitsvertrag steht in
`docs/templates/HESTIA Roadmap Workflow Contract.md` und wird nicht in jede
Roadmap kopiert. Nicht benötigte Abschnitte werden entfernt.

---

# [Titel] Roadmap

## Metadaten

| Feld | Wert |
| --- | --- |
| Status | `DRAFT / ACTIVE / PAUSED / DONE` |
| Modul / Bereich | `[Bereich]` |
| Erstellt / letzter Stand | `[YYYY-MM-DD] / [YYYY-MM-DD]` |
| Aktueller Schritt | `[S1/S2/S3/S4R/S4.x/S5/S6]` |
| Risikoklasse | `R1 / R2 / R3` |
| Reviewtiefe | `Delta / Consumer / Full` |
| Reasoning-Standard | `Medium / High / Extra High` |
| Reasoning-Ausnahmen | `[Schritt + Begründung / keine]` |
| Discovery Wave | `S1-S3 / S1-S4R / deaktiviert` |
| Autonomieprofil | `local-full / gated / manual` |
| Maximal autonomer Endpunkt | `[Sx]` |
| Erwartete Arbeitsgröße | `small / medium / large; in S4R finalisieren` |
| Externes Reviewbudget | `S1-S4: 0; S5 Code: 1+1; Doku-only: 0` |
| Deploy / Remote Write | `nein / owner-gated` |
| Usage-Continuation | `verpflichtend; [Checkpoint-Grenzen]` |
| Evidence | `nicht erforderlich / docs/[Titel] Evidence.md` |
| Workflow-Vertrag | `docs/templates/HESTIA Roadmap Workflow Contract.md` |
| Archivziel | `docs/archive/[Titel] Roadmap (DONE).md` |

## Ausführungs-Chat-Startkarte

- Auftrag:
  - `Diese Roadmap deterministisch bis zum freigegebenen Gate abarbeiten.`
- Verbindliche Lesereihenfolge:
  1. `Metadaten, diese Startkarte, Session Resume Card und Context Receipt`
  2. `AGENTS.md`
  3. `README.md` und `PRODUCT.md`
  4. `docs/DEV_ENVIRONMENT.md`
  5. `docs/templates/HESTIA Roadmap Workflow Contract.md`
  6. `Pflichtreferenzen dieser Roadmap`
  7. `git status --short und nur der relevante Diff`
- Startschritt:
  - `[S1 oder Resume-Schritt]`
- Freigegebene autonome Welle:
  - `[Bereich / keine]`
- Reasoning:
  - `[Standard und begründete Wellengrenzen]`
- Usage-Gates:
  - `vor dem ersten und jedem späteren kohärenten Block; Safe Closure stoppt`
- Owner-Gates:
  - `[SQL/RLS/Deploy/Workflow/Push/Device/none]`
- Stop-Bedingungen:
  - `Quellenwiderspruch, fehlende Produktentscheidung, Scope-Ausweitung,
    blockierendes Finding, ungültige Telemetrie oder nicht erteiltes Owner-Gate`
- Halluzinationsschutz:
  - `Keine fehlenden Verträge erfinden; reale Sources und Implementierung
    prüfen und Widersprüche als Finding führen.`

Startprompt:

```text
Arbeite diese HESTIA-Roadmap gemäß ihrer Ausführungs-Chat-Startkarte ab. Lies
die festgelegten Quellen in der angegebenen Reihenfolge, prüfe Git- und
Systemstand und beginne mit dem eingetragenen Startschritt. Erfinde keine
fehlenden Verträge und beachte alle Owner-Gates. Führe freigegebene autonome
Wellen über grüne interne Continuation Gates ohne Rückfrage aus. Wende vor
jedem neuen Haupt- oder kohärenten Ausführungsblock das Usage-aware
Continuation Gate an. Beginne bei Safe Closure keinen neuen Block und
hinterlasse einen vollständigen Resume-Stand.
```

## Session Resume Card

Unter ungefähr 35 Zeilen halten und nach jedem Hauptschritt, S4-Block und vor
Pausen ersetzen.

- Ziel: `[ein Satz]`
- Unveränderliche Verträge: `[Guardrails]`
- Erledigter Stand: `[maximal fünf Punkte]`
- Aktueller Schritt: `[Sx.y]`
- Nächster erlaubter Schritt: `[genau eine Aktion oder Gate]`
- Offene Findings: `[IDs / none]`
- Geänderte Dateien: `[Pfade / Diff-Verweis]`
- Gültige Nachweise: `[T-/EV-/QA-IDs]`
- Context Receipt: `[gültig / gezielt zu aktualisieren]`
- Autonomieprofil / Welle: `[Profil; Bereich; Endpunkt]`
- Letzter Usage-Checkpoint: `[Ux; Werte; Entscheidung]`
- Produktiv-/Deploystand: `[nicht relevant / exakter Stand]`
- Offene Owner-Gates: `[Liste / none]`
- Stop-Bedingung: `[nicht überspringen]`

## Usage-Checkpoints

Nur validierte reale Messungen eintragen, keine Schätzwerte oder Roh-JSON.

| ID | Grenze / nächster Block | Messzeit | 5h Rest / Reset | Woche Rest / Reset | Delta | Ereignis | Entscheidung |
| --- | --- | --- | --- | --- | --- | --- | --- |
| U0 | `vor [Block]` | `pending` | `pending` | `pending` | `Baseline` | `pending` | `pending` |

- Kohärente Blockgrenzen: `[Liste; S5 und S6 getrennt]`
- Vergleichbare Blöcke für Reserve: `[IDs / keine; niemals schätzen]`
- Safe-Closure-Handoff: `[letzter kompletter Block; genau nächstes Gate]`

## Context Receipt

- Baseline-Commit: `[SHA]`
- Relevante Dirty Files: `[Pfade / none]`
- Sources of Truth: `[Pfad: Fingerprint + abgedeckter Vertrag]`
- Validated Context Reuse, nur bei großen stabilen Quellen:
  - Source: `[Pfad]`
  - Fingerprint: `[Hash/Stand]`
  - Validiert durch: `[Schritt/Evidence-ID]`
  - Wiederverwendbare Aussagen: `[begrenzte Liste]`
  - Invalidation: `[Trigger]`
  - Original erforderlich bei: `[Exact-Source-Fragen]`
- Gültige Nachweise: `[IDs + Aussage]`
- Invalidation Map: `[Änderung -> betroffene Nachweise]`
- Tool-/Runtimestatus: `[nur relevante Versionen; keine Secrets]`

## Zielvertrag

Prüfbares Endergebnis:

- `[beobachtbarer Zielzustand]`
- `[beobachtbarer Zielzustand]`

Bewusst unverändert:

- `[bestehender Produkt-/Daten-/Runtimevertrag]`

## Problem und Ist-Zustand

- Beobachtung: `[Ist-Zustand]`
- Reibung/Risiko: `[warum relevant]`
- Belegte Fakten: `[Quellen]`
- Offene Hypothesen: `[Annahmen / none]`

## Entscheidungslog

| ID | Datum | Entscheidung | Warum | Betrifft |
| --- | --- | --- | --- | --- |
| D-1 | `[YYYY-MM-DD]` | `[Entscheidung]` | `[Begründung]` | `[Vertrag/Schritt]` |

## Scope und Grenzen

In Scope:

- `[Code/Doku/Runtime]`

Nicht in Scope:

- `[Abgrenzung]`

Roadmap-Guardrails:

- HESTIA bleibt ein ruhiges Werkzeug für einen kleinen bekannten Haushalt.
- Freitext und lokale Nutzbarkeit bleiben erhalten.
- `[spezifischer Guardrail]`

## Scope-Freeze vor S4

- Bestehende Features: `[erhalten/ändern/entfernen]`
- Datenvertrag und Lifecycle: `[unverändert/exakt geändert]`
- LocalStorage, Supabase, Realtime und Offline: `[Wirkung]`
- Service Worker, Cache und PWA: `[Wirkung]`
- Producer und Consumer: `[Pfade/Verträge]`
- Externe Automationen/Push: `[nicht betroffen/exakt geändert]`
- Offene Grundsatzfragen: `none / [blockiert S4]`

## Referenzen

Pflicht in S1:

- `AGENTS.md`
- `README.md`
- `PRODUCT.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/templates/HESTIA Roadmap Workflow Contract.md`
- `docs/modules/[Modul] Module Overview.md`
- `[weitere Quelle]`

Nur bei konkreter Frage:

- `docs/archive/[relevante Roadmap].md`
- `docs/QA_CHECKS.md:[relevanter Abschnitt]`

## Tool Permissions und Gates

Allowed:

- `[lokale Reads/Edits/Tests/read-only Abfragen]`

Owner-gated:

- `[Remote Supabase/SQL/RLS/Deploy/Workflow/Push/Device/none]`

Forbidden:

- Secrets oder Household-Keys ausgeben oder committen.
- Fremde Worktree-Änderungen zurücksetzen.
- Scope, Datenwirkung oder Architektur still erweitern.
- `[spezifisches Verbot]`

## Statusmatrix

| ID | Schritt | Reasoning | Status | Ergebnis |
| --- | --- | --- | --- | --- |
| S1 | System- und Vertragsdetektivarbeit | `[Stufe]` | TODO | |
| S2 | Zielvertrag | `[Stufe]` | TODO | |
| S3 | Bruchrisiko-, Security- und Umsetzungsreview | `[Stufe]` | TODO | |
| S4R | Readiness Review | `[Stufe]` | TODO | |
| S4 | Umsetzung | `je Block` | TODO | |
| S5 | Tests und Abschlussreview | `[Stufe]` | TODO | |
| S6 | Doku-Sync und Archiv | `[Stufe]` | TODO | |

## Findings

| ID | Severity | Typ | Status | Entscheidung / Zielschritt |
| --- | --- | --- | --- | --- |
| F-1 | `P0/P1/P2/Watchlist` | `Contract/Code/SQL/Doku/QA/Copy` | `open/fixed/deferred` | `[Sx]` |

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
- Usage-Gates: `[Ux vor jedem Block, S5 und S6]`
- Aufwandsprognose:
  - Größe: `[small/medium/large]`
  - Context/Tools/Troubleshooting: `[kurz]`
  - Dateien/Runtime/PWA/Supabase: `[kurz]`
  - Browser/Device/Reviews: `[kurz]`
  - Doku/Evidence/Postconditions: `[kurz]`
  - Autonome Wellen und Reasoning: `[Liste]`
  - Empirische Reserve: `[Checkpoints x 1,5 / keine Daten]`
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

Vor S5 Usage-Gate ausführen.

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

S6 beginnt nach grünem S5 und frischem Usage-Gate.

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
