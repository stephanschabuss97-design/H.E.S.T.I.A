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
| Reviewbudget | `S1-S4: 0; S5 CodeRabbit: 1 Initial + 1 Verifikation` |
| Archivziel | `docs/archive/[Titel] Evidence (DONE).md` |

## Nachweisvertrag

- Beweist: `[technische Aussage]`
- Beweist nicht: `[Abgrenzung]`
- Fachliche Source of Truth: `[Decision/Roadmap-Abschnitt]`
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
