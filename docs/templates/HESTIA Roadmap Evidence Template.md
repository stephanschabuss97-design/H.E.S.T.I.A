# HESTIA Roadmap Evidence Template

Diese optionale Datei enthält technische Nachweise, die eine Roadmap sonst
unnötig aufblähen würden. Sie ist keine zweite Roadmap und trifft keine
Produktentscheidungen. Sie wird nur angelegt, wenn der Workflow-Vertrag sie
für produktive oder riskante Gates verlangt.

Keine Secrets, Household-Keys, vollständigen Tokens, sensiblen Payloads oder
unnötigen Terminal-Rohdaten eintragen.

---

# [Roadmap-Titel] Execution Evidence

## Metadaten

| Feld | Wert |
| --- | --- |
| Zugehörige Roadmap(s) | `[Pfad]` |
| Status | `ACTIVE / DONE` |
| Erstellt / letzter Stand | `[YYYY-MM-DD] / [YYYY-MM-DD]` |
| Verantwortlicher Schritt | `[S4.x/S5/S6]` |
| Umgebungen | `lokal / disposable / produktiv read-only / produktiv write` |
| Baseline-Commit | `[SHA]` |
| KASRKIN-Binding / Aktivierung | `[Release-ID; Binding-Hash; Activation-Hash]` |
| Reviewbudget | `S1-S4: 0; S5 CodeRabbit: 1 Initial + 1 Verifikation` |
| Archivziel | `docs/archive/[Titel] Evidence (DONE).md` |

## Nachweisvertrag

- Beweist: `[technische Aussage]`
- Beweist nicht: `[Abgrenzung]`
- Fachliche Source of Truth: `[Decision/Roadmap-Abschnitt]`
- Usage-Entscheidungsautorität: `[exakt gebundener KASRKIN-Release; HESTIA
  konsultiert und führt projektspezifisch aus]`
- Verboten: Secrets, Household-Keys, unnötige Dumps und personenbezogene
  Rohdaten.

## Baseline

| ID | Umgebung | Beobachtung | Ergebnis |
| --- | --- | --- | --- |
| EV-B01 | `[Umgebung]` | `[Check]` | `[Zähler/Version/Status]` |

## Lokale und Disposable Nachweise

| ID | Schritt | Check | Erwartung | Ergebnis | Status |
| --- | --- | --- | --- | --- | --- |
| EV-L01 | `[Sx.y]` | `[Befehl/Test]` | `[Postcondition]` | `[kurz]` | `PASS/FAIL` |

Lange Ausgaben bleiben in lokalen temporären Logs. Evidence enthält nur
relevante Fehler, Zähler, Hashes, Versionen und Postconditions.

## Gültigkeit und Invalidation

| ID | Inputs/Fingerprints | Belegte Aussage | Invalidiert durch | Wiederverwendet in |
| --- | --- | --- | --- | --- |
| EV-L01 | `[Dateien/Hashes/Runtime]` | `[Aussage]` | `[Änderung/Finding]` | `[Sx/keine]` |

Nur invalidierte Evidence wird erneut erzeugt. Gültige IDs werden über den
Context Receipt referenziert.

## Produktiver Preflight

| ID | Prüfung | Ergebnis | Blocker |
| --- | --- | --- | --- |
| EV-PRE01 | `[Schema/RLS/Runtime/Zähler]` | `[kurz]` | `none/Finding-ID` |

- Erwartete Wirkung: `[exakt]`
- Geschützte Daten/Flächen: `[außerhalb der Wirkung]`
- Stop-Bedingung: `[Abweichung]`
- Owner Briefing: `[Gate/Datum]`
- Freigabe: `offen / erteilt am YYYY-MM-DD`

## Produktive Aktionen

Jede Aktion besitzt eine eigene Freigabe und ID.

| ID | Aktion | Freigabe | Erwartete Wirkung | Ergebnis | Status |
| --- | --- | --- | --- | --- | --- |
| EV-W01 | `[SQL/Deploy/Workflow/Push]` | `[Datum/Gate]` | `[exakt]` | `[tatsächlich]` | `PASS/FAIL` |

## Vorher/Nachher

| Objekt/Postcondition | Vorher | Erwartet | Nachher | Status |
| --- | --- | --- | --- | --- |
| `[Tabelle/Runtime/Workflow]` | `[Wert]` | `[Wert]` | `[Wert]` | `PASS/FAIL` |

Geschützte Negativnachweise:

- `[lokale Nutzung unverändert]`
- `[keine fremden Haushaltsdaten betroffen]`
- `[keine unerwartete Schreibwirkung]`

## Browser-, PWA- und Runtime-Nachweise

| ID | Ziel | Version/Run-ID | Smoke | Schreibwirkung | Status |
| --- | --- | --- | --- | --- | --- |
| EV-R01 | `[Browser/PWA/Deploy]` | `[Version]` | `[kurz]` | `ja/nein` | `PASS/FAIL` |

## Findings und Korrekturen

| Finding | Nachweis | Korrektur | Wiederholter Check | Status |
| --- | --- | --- | --- | --- |
| `[F-ID]` | `[EV-ID]` | `[kurz]` | `[EV-ID]` | `fixed/deferred` |

## Externer Review

| Phase | Tool/Version | Scope | Lauf | Ergebnis | Invalidierte Checks |
| --- | --- | --- | --- | --- | --- |
| S5 Initial | `CodeRabbit [Version]` | `[Diff]` | `1/1` | `[Status]` | `[IDs/none]` |
| S5 Verifikation | `CodeRabbit [Version]` | `[Diff]` | `1/1` | `[Status]` | `[IDs/none]` |

- S1-S4 CodeRabbit: `0` erwartet.
- Ausfall/Rate-Limit: `[Evidence-Gap/none]`
- Zusätzliche Läufe: `[P0/P1-Grund/none]`

## Finaler Digest

- Gültige Nachweise: `[EV-IDs]`
- Exakte produktive Wirkung: `[kurz/keine]`
- Nicht ausgeführte Nachweise: `[Grund]`
- Restrisiken: `[Finding-/Watchlist-IDs/none]`
- Reviewläufe: `[Initial n; Verifikation n; weitere n + Grund]`
- Follow-up Postimage Receipt, nur bei Folgeroadmap und nur an diesem einen
  kanonischen Ort:
  - Finaler Writer: `[Vertrag]`
  - Aktive Consumer/Runtimepfade: `[Verträge]`
  - API-/Daten-/Sync-Grenzen: `[Verträge]`
  - Fingerprints/Evidence-IDs: `[IDs]`
  - Invalidation Trigger: `[Liste]`
  - Original erforderlich bei: `[Exact-Source-Fragen]`

Evidence wird erst nach finalem S6-Abgleich als `DONE` archiviert. Bei einem
Widerspruch gewinnt der erneut geprüfte reale Iststand; Roadmap und Evidence
werden danach gemeinsam korrigiert.



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
