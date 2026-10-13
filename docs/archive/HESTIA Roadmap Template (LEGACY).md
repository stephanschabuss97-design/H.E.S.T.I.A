> LEGACY — archiviert am 2026-10-13 auf direkten Ownerauftrag.
> Historischer Nachweis des früheren lokalen Prozessstands; keine aktuelle
> Autoren-/Template-SoT und keine Pflichtlektüre für neue Roadmaps.
> Aktuell: [BLUEPRINT](../../../codex-tools/docs/blueprint/README.md) und
> [Projekt-AGENTS](../../AGENTS.md). Alte Aufträge behalten ihre eingefrorene Gitbasis.

# HESTIA Roadmap — lokale Ergänzungen

KASRKIN ist seit 2026-10-12 durch ausdrückliche Ownerentscheidung entbunden.
Neue und laufende Roadmaps arbeiten ohne KASRKIN-Aufrufe, Usage-Gates, Permits
oder KASRKIN-Checkpointfelder. Fachliche Readiness, Scope, Review, sichere
Postconditions und produktive Ownergates bleiben verbindlich. Diese Entscheidung
überstimmt ältere KASRKIN-Klauseln, auch in unveränderten aktiven Roadmaps.


Die zentrale [Execution](../../../codex-tools/docs/blueprint/EXECUTION_ROADMAP_TEMPLATE.md)
liefert konkrete S1–S6-Führung und Blockfelder. [Rolling Wave](../../../codex-tools/docs/blueprint/ROLLING_WAVE_ROADMAP_TEMPLATE.md)
führt Lieferpakete/Aufträge; [Quick Change](../../../codex-tools/docs/blueprint/QUICK_CHANGE_TEMPLATE.md)
darf bei kleinem eindeutigen risikoarmen Auftrag inline bleiben.
Gemeinsamer Kern: [BLUEPRINT / 2026-10-13](../../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md).
Zielrevision: RELEASED / S6-Postchecks BP-EX-01 am 2026-10-13 grün; für neue ausdrücklich übernehmende Aufträge.
Diese erhaltene lokale Datei ergänzt Auftragswerte/Matrizen, keinen zweiten
allgemeinen Ablauf. Nur relevante Zusatzfelder übernehmen; Links am Zielort
anpassen. Ältere Aufträge behalten ihre eingefrorene Basis und Felder;
aktuelle echte Fach-/Security-/Ownergrenzen bleiben wirksam.

## Lokale Auftragsfelder

- [Workflowvertrag](HESTIA%20Roadmap%20Workflow%20Contract%20%28LEGACY%29.md) vollständig lesen;
  AGENTS, README, PRODUCT, relevante Module/QA und lokales Overlay sind Autorität.
- Metadaten: [Haushaltsnutzen, R1/R2/R3, Daten-/PWA-/Sync-Wirkung, Reviewtiefe,
  Reasoning-Wellen/tatsächliche Einstellung oder NOT_OBSERVABLE, Arbeitsgröße,
  local-full/gated/manual (Standard gated), Endpunkt, Discovery-/Implementierungs-
  freigabe, Evidence-Owner/-Datei, Archivziel]. Keine Modell-/Defaultänderung.
- Produktfilter: [Einkauf/Amazon/Müll oder freigegebene Peripherie, Nutzen im
  Haushaltsfluss]; keine Organizer-/SaaS-/Historienausweitung, Freitext/lokale
  Nutzbarkeit erhalten. Dokuauftrag belegt unveränderte Produktgrenzen.
- S4R-Scope: [Datenmodell, Lifecycle, Offline/Sync, Runtime Config,
  kompatible Producer/Consumer]; offene Grundsatzfrage blockiert betroffenen Block.
- Startkarte: [konkrete fachliche Gates, Operatoraktionen und sichere Postconditions].
- SQL/RLS, Secrets/Household-Key, Deployment, Workflow, Push: [Ownergate je Wirkung].
- Evidence: [Pflichtfall nach Workflow oder nicht nötig]; keine Secrets/sensiblen Rohdaten.
- Live-Kontext: [AGENTS/README/PRODUCT, aktive Roadmap/Resume/Findings,
  Dirty Boundary/Diff, geänderte Codeflächen/produktive Gates]; Receipt nur bei
  exakter Sourceidentität/Frageabdeckung, sonst Original. Handoff etwa 35 Zeilen.

## Fachliche Werte zur zentralen Execution

| Phase | Relevante HESTIA-Vertragsfrage / Ergebnis | Auftragswert / Nachweis / Exit |
| --- | --- | --- |
| S1 | Sources/Baseline, Producer/Consumer, lokaler State, PWA/Runtime, betroffene/unbetroffene Schichten | [Fakten/Annahmen, Systemkarte und offene IDs] |
| S2 | Produktfilter, Daten/Fehler/Offline/Sync/Security/Copy, fachliche Acceptance | [Ziel, Kompatibilität, keine offene Grundsatzfrage] |
| S3 | Datenverlust, stille Überschreibung, falscher Syncstatus, Offlinebruch, Auth/RLS/Race/Cache/SW/Realtime soweit betroffen | [Risiko → Wirkung → Konter → T-/EV-ID; Rollback/Stop] |
| S4R | Finale Durchsicht S1–S3, Daten-/PWA-/Remote-Readiness, ausführbarer Scope-Freeze | [konkrete zentrale Blöcke, volle Autorität, keine Pflichtlücke] |
| S4 | Fach-/Consumerdelta, lokaler Delta/Consumer oder in S4R begründeter Full Review | [Änderung, Prüfung, Finding/Fix, Restrisiko, Status/Postcondition] |
| S5 | Relevante statische/fachliche/Browser-/PWA-/disposable Checks und nativer Full Review | [Matrix/EV-IDs, invalidierte Retests, ehrliche Gaps; S6 offen] |
| S6 | Betroffene README/PRODUCT/Module, QA/Setup/Future-Doku, Archivlinks/Postchecks und finaler Contract Review | [bewiesener Dokusync, Restrisiko, echter Archivpfad; erst danach DONE] |

S1–S3 und S4R behalten die lokalen vollständigen Contract Reviews, Findings-
korrektur und Status/Resume; gemeinsame Schritte/Definitionen nicht duplizieren.
Keine medizinischen MIDAS-Regeln übernehmen. Unpassende Felder begründet weglassen.

### Daten-, Offline- und Syncvertrag, wenn betroffen

| Producer / State / Transport | Datenform / Consumer | Invariant / Konflikt- und Fehlerverhalten | Beobachtbares Orakel / Gate |
| --- | --- | --- | --- |
| [lokaler Write/Snapshot/Realtime] | [name, quantity, unit, inCart, listType soweit betroffen] | [lokale Nutzung ohne Credentials/Netz, Freitext, kein stiller Datenverlust] | [T-/EV-ID, Owner] |

### S4R: technische Readiness und Fehlergrenzen

- Aufwand: [small/medium/large; Dateien/Runtime/PWA/Supabase, Context/Tools,
  Browser/Device/teure Tests/Reviews, Fehlersuche, Doku/Evidence/Closure,
  Reasoning-Wellen/Gates; bei large Owner-Briefing].
- Kohärenz: [Blockfolge, gemeinsame Wirkung/Reviewtiefe, keine Gates dazwischen,
  sichere Resume-Postconditions und begründete Trennung produktiver Wirkung].
- Daten-/Runtime-Readiness: [aktuelle/Forward-/Rollbackzustände, günstiges
  Precheck-Orakel, betroffene Secrets nur nach Namen/Speicherort, nie Wert].
- Fehler-/Rollbackweg: [sicheres eigenes Preimage, Daten-/Runtimepostchecks,
  keine offene Diagnose vor sicherem produktivem Rückweg].
- Invalidation/Reviewgrenzen: [Änderung → T-/EV-ID, begründete S4-Full-Ausnahme].

### S5: zusätzliche lokale Prüfwerte

| ID | Ebene / Vertragsfrage / Check | Erwartung | Status / Nachweis | Invalidation / Gate |
| --- | --- | --- | --- | --- |
| [T-ID] | [lokal/Browser/PWA/disposable/produktiv falls betroffen] | [Orakel] | [NOT_RUN/PASS/FAIL/GAP; EV-ID] | [Datei/Runtime/Owner] |

Codeänderungen: ein initialer CodeRabbit-Lauf nur S5, nach berechtigten Fixes
höchstens eine Verifikation, weitere Läufe nur mit neuem ausdrücklichem
Ownerauftrag. Doku-only ohne externen Review; Ausfall ehrlich als Evidence-Gap.
Nur invalidierte Checks wiederholen, keine DB-/Browser-/Deploypflicht ohne Bedarf.

### S6: lokale Abschlusswerte

- Finaler Contract Review / Restrisiko: [PASS/Findings; In-Scope-P0/P1 geschlossen,
  Out-of-Scope nur mit wirksamer Ownerabgrenzung, niemals Gap als PASS].
- Dokusync: [betroffene README/PRODUCT/Module/QA/Setup/Future-Doku,
  nur bewiesene Ergebnisse]. Kein neuer verpflichtender Changelog.
- Falls Folgeroadmap geplant: [einmaliger Postimage Receipt in Roadmap oder
  Evidence: Writer/aktive Consumer/Runtime, API/Daten/Sync, Fingerprints/EV-IDs,
  Invalidation/Exact-Source-Fragen]; keine Zusatzdatei.
- Archiv: [Roadmap/optionale Evidence nach docs/archive/ mit (DONE),
  Linkpflege und finale Postchecks; bei offenem S6 S5-Handoff bewahren].
- Git: [Empfehlung aus tatsächlichem Diff; Commit/Push bleiben eigener Auftrag].
