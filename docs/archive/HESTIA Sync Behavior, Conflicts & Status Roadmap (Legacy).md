# HESTIA Technical Roadmap - Sync Behavior, Conflicts & Status (LEGACY)

Legacy-Hinweis:

- Diese Roadmap wird nicht mehr als aktive Einzelroadmap gefuehrt.
- Die relevanten Punkte wurden in `docs/future roadmaps.md` unter Roadmap 2, Punkt 5 `Snapshot-Sync und Save-Gefuehl beruhigen` integriert.
- Dieses Dokument bleibt als Herkunfts- und Detailquelle erhalten.

## Ziel (klar und pruefbar)

Der bestehende Snapshot-Sync soll fachlich, technisch und sprachlich so festgezogen werden, dass HESTIA im Alltag ruhig und nachvollziehbar bleibt, ohne in robuste Live-Kollaboration oder komplexe Konfliktloesung abzudriften.

Pruefbare Zieldefinition:

- Der V1-Sync-Vertrag ist explizit beschrieben: welche Aktionen nur lokal bleiben, welche Aktionen den gemeinsamen Snapshot schreiben und was `Last write wins` konkret bedeutet.
- Writing und Shopping verwenden denselben Sync-Wortschatz und widersprechen sich nicht.
- Nutzer koennen erkennen, ob eine Liste nur lokal, nicht gespeichert, gespeichert oder fehlgeschlagen ist.
- Eingehende Remote-Aenderungen sind als Snapshot-Refresh behandelt, nicht als kollaboratives Event-Orchester.
- Code, Modul-Doku und QA beschreiben denselben Sync-Vertrag.

## Problemzusammenfassung

HESTIA besitzt heute einen bewusst schmalen Shared-List-Sync. Add in Writing ist weiterhin ein bewusster Save-Moment, waehrend Loeschen, Liste leeren, Shopping-Toggle und Shopping-Abschluss direkt einen Snapshot speichern koennen. Dieser Hybrid ist fuer HESTIA sinnvoll, weil er Reibung reduziert, kann aber mental unscharf werden: Ist die Liste schon gemeinsam, nur lokal, oder wurde gerade ein anderer Stand geladen? Diese Roadmap soll den vorhandenen Snapshot-Sync vertraglich und sprachlich klaeren, ohne daraus Roadmap 5 `Realtime Shopping Collaboration` zu machen.

## Future-Roadmap-Einordnung

- Technische Begleitroadmap zu `docs/future roadmaps.md`.
- Primaerer Bezug: Roadmap 2, Punkt 5 `Sync-Sprache und Save-Gefuehl beruhigen`.
- Sekundaerer Bezug: Voraussetzung und Guardrail fuer Roadmap 5 `Realtime Shopping Collaboration als Premium Feature`.
- Prioritaet: nach Einkaufsflow-Veredelung und vor jeder robusten Parallel-Einkaufs-Kollaboration.
- Diese Roadmap ist keine Premium-Realtime-Roadmap, sondern Stabilisierung des bestehenden Snapshot-Vertrags.

## Scope

- Snapshot-Sync-Vertrag fuer V1:
  - Add bleibt lokal bis bewusst gespeichert wird.
  - Loeschen, Liste leeren, Shopping-Toggle und Shopping-Abschluss duerfen direkte Shared-Snapshots schreiben, wenn das nach S1-S3 bestaetigt wird.
  - `Last write wins` wird bewusst dokumentiert.
- Sync-Status und Copy:
  - nur lokal
  - nicht gespeichert
  - gespeichert
  - fehlgeschlagen
  - remote aktualisiert, falls nach Review wirklich noetig
- Wirkung eingehender Remote-Snapshots auf lokalen State und UI.
- Writing-/Shopping-Abgleich fuer denselben Listenstand.
- QA- und Modul-Doku-Sync.

## Not in Scope

- Keine robuste Live-Kollaboration fuer paralleles Einkaufen.
- Keine CRDTs, Merge-Editoren, Konflikt-Dialoge oder Eventlogik.
- Kein neues Auth-, Rollen- oder Nutzerkonto-Modell.
- Keine Offline-Queue, kein Background Sync, keine Push-Notifications.
- Keine SQL-/RLS-/Supabase-Schema-Aenderung ohne separate Roadmap-Entscheidung.
- Kein Redesign der Writing- oder Shopping-Oberflaeche ausser klar belegter Status-/Copy-Arbeit.

## Relevante Referenzen (Code)

- `app/main.js`
- `app/core/state.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/supabase/list-sync.js`
- `index.html`
- `app/styles/ui.css`
- `app/styles/writing.css`
- `app/styles/shopping.css`

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/QA_CHECKS.md`
- `docs/modules/Writing Module Overview.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Bootflow Module Overview.md`

Regel:

- Erst Produktvertrag und Module Overviews lesen.
- Dann aktuellen Sync-Code und reale UI-Status lesen.
- Erst nach S1-S3 Code aendern.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug, kein kollaborativer Editor.
- Sync erklaert den gemeinsamen Listenstand, erzeugt aber keine technische Lautstaerke.
- Nutzer duerfen nie glauben, etwas sei gemeinsam gespeichert, wenn es nur lokal ist.
- `Last write wins` darf V1-Tradeoff bleiben, muss aber dokumentiert und testbar sein.
- Writing und Shopping duerfen keine unterschiedlichen Wahrheiten ueber denselben Stand anzeigen.
- Realtime ist Snapshot-Refresh, nicht Premium-Realtime-Shopping.

## Architektur-Constraints

- `state.items` bleibt unmittelbare UI-Wahrheit.
- Supabase bleibt gemeinsamer Household-Snapshot.
- Remote-Layer bleibt in `app/supabase/*`.
- Bestehender Household-Key-/RLS-Vertrag bleibt unveraendert.
- Keine neuen globalen State-Singletons.
- Keine neue Dependency und kein Build-Step.

## Tool Permissions

Allowed:

- Lesen und Aendern von:
  - `app/modules/writing.js`
  - `app/modules/shopping.js`
  - `app/core/state.js`, nur falls S1-S3 einen echten Vertragsbedarf belegen
  - `app/supabase/list-sync.js`
  - `index.html`
  - `app/styles/ui.css`
  - `app/styles/writing.css`
  - `app/styles/shopping.css`
  - betroffene Module Overviews und `docs/QA_CHECKS.md`
- Lokale Checks:
  - `node --check` fuer geaenderte JS-Dateien
  - `git diff --check`
  - lokaler HTTP-Smoke ueber `python -m http.server`

Forbidden:

- Neue Dependencies.
- Auth-, Account- oder Rollen-Umbau.
- CRDT-/Merge-Mechaniken.
- Offline-Queueing, Background Sync oder Push.
- Realtime-Shopping-Collaboration in diese Roadmap ziehen.
- Stille SQL-/RLS-/Schema-Aenderungen.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Detektivarbeit und Vertragsklaerung.
- S4 ist Umsetzung in kleinen Substeps.
- S5 prueft lokale und, falls verfuegbar, Zwei-Tab-/Zwei-Geraete-Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnis.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt Contract Review und Check dokumentieren.

## Vorab Bewertung 09.05.2026

Bewertung:

- Die alte Roadmap war fachlich wichtig, aber zu nah an Realtime- und Konflikt-Komplexitaet formuliert.
- Nach der aktuellen Future-Sortierung muss diese Roadmap enger werden: Snapshot-Sync und Statusklarheit zuerst, robuste parallele Einkaufskoordination separat als Roadmap 5.

## Vorab Contract Review 09.05.2026

Review-Frage:

- Bleibt diese Roadmap innerhalb des HESTIA-Produktvertrags, wenn sie Sync-Verhalten, Konflikte und Status klaert?

Entscheidung:

- Ja, wenn sie den bestehenden Snapshot-Sync stabilisiert und keine Live-Collaboration, Queue oder Auth-Komplexitaet einfuehrt.

Findings:

- CR-F1: Die alte Fassung vermischte Snapshot-Sync und robuste Realtime-Kollaboration.
- CR-F2: `remote aktualisiert` kann hilfreich sein, kann HESTIA aber auch lauter machen als noetig.
- CR-F3: Der Hybrid Add-manuell vs. Mutationen-direkt muss bewusst bestaetigt werden, nicht nur aus bestehendem Code abgeleitet.
- CR-F4: `Last write wins` darf nicht durch UI-Sprache wie sichere Konfliktloesung wirken.
- CR-F5: Offline-/Reconnect- und Push-Themen duerfen nicht in diese Roadmap kippen.

Korrekturen:

- Scope, Not in Scope, Guardrails und S4/S5 wurden auf Snapshot-Sync und Statusklarheit begrenzt.
- Realtime Shopping Collaboration wurde explizit als Roadmap 5 abgegrenzt.
- Offline/Reconnect und Push bleiben eigene Roadmaps.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse des aktuellen Snapshot-Syncs | TODO | Alte Vorbefunde existieren, muessen gegen aktuellen Code neu validiert werden. |
| S2 | Produktvertrag fuer Speichern, Remote-Snapshots und `Last write wins` finalisieren | TODO | |
| S3 | UX-/Copy-Vertrag fuer Sync-Status finalisieren | TODO | |
| S4 | Repo-Umsetzung des finalen Snapshot-Sync-Vertrags | TODO | |
| S5 | QA, Zwei-Tab-Smokes und Regression | TODO | |
| S6 | Doku-Sync und Abschlussreview | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - Ist-Analyse des aktuellen Snapshot-Syncs

Ziel:

- Den realen Save-/Load-/Realtime-Refresh-Pfad ohne Annahmen mappen.

Substeps:

- S1.1 README, PRODUCT und relevante Module Overviews lesen.
- S1.2 `app/main.js`, `list-sync.js`, `writing.js`, `shopping.js` und `state.js` lesen.
- S1.3 Aktuelle Persistenzgruende erfassen:
  - manual-save
  - remove-item
  - clear-list
  - shopping-toggle
  - shopping-finish
- S1.4 Aktuelle UI-Status und Touchlog-Ereignisse erfassen.
- S1.5 Remote-Refresh-Wirkung auf lokalen State dokumentieren.
- S1.6 S1 Contract Review.
- S1.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Ist-Karte fuer Snapshot-Sync und Status.

Exit-Kriterium:

- Keine offene Frage mehr, was der aktuelle Code real tut.

## S2 - Produktvertrag fuer Speichern, Remote-Snapshots und `Last write wins`

Ziel:

- Den V1-Sync-Vertrag fachlich finalisieren.

Substeps:

- S2.1 Entscheiden, ob der heutige Hybrid-Vertrag bestehen bleibt.
- S2.2 `Last write wins` in Produktsprache definieren.
- S2.3 Remote-Snapshot waehrend lokalem Dirty-State bewerten.
- S2.4 Shopping-Abschluss und harte Deletes gegen denselben Vertrag pruefen.
- S2.5 Abgrenzung zu Roadmap 5 Realtime Collaboration dokumentieren.
- S2.6 S2 Contract Review.
- S2.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Finaler Produktvertrag fuer V1-Snapshot-Sync.

Exit-Kriterium:

- Keine offene Produktfrage zu Speichern, Remote-Refresh und Ueberschreiben.

## S3 - UX-/Copy-Vertrag fuer Sync-Status

Ziel:

- Ruhigen, reproduzierbaren Statuswortschatz definieren.

Substeps:

- S3.1 Statuswortschatz finalisieren.
- S3.2 Pro Status Trigger, Text und Sichtbarkeit definieren.
- S3.3 Entscheiden, ob `remote aktualisiert` sichtbar sein muss.
- S3.4 Writing und Shopping gegeneinander abgleichen.
- S3.5 Fehler- und Ueberschreibungs-Copy pruefen.
- S3.6 S3 Contract Review.
- S3.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- UX-Vertrag fuer Sync-Status.

Exit-Kriterium:

- Kein Statuswort und kein UI-Trigger ist mehr unklar.

## S4 - Repo-Umsetzung

Ziel:

- Code an den finalen S2/S3-Vertrag anpassen.

Substeps:

- S4.1 Writing-Status und Save-Verhalten gemaess Vertrag anpassen.
- S4.2 Shopping-Sync-Status nur falls fachlich noetig sichtbar machen.
- S4.3 Remote-Refresh-Handling gegen Dirty-State-Vertrag umsetzen.
- S4.4 Touchlog-/Diagnoseeintraege nachziehen.
- S4.5 S4 Code- und Contract Review.
- S4.6 Fehler korrigieren.
- S4.7 Schritt-Abnahme.

Output:

- Repo-Verhalten entspricht Sync- und Statusvertrag.

Exit-Kriterium:

- Code, Status-Copy und Persistenzgruende widersprechen sich nicht.

## S5 - QA, Zwei-Tab-Smokes und Regression

Ziel:

- Sync-Vertrag lokal und, falls moeglich, mit zwei Tabs/Geraeten pruefen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 Lokaler Kernflow-Smoke:
  - schreiben
  - speichern
  - loeschen
  - Liste leeren
  - im Wagen
  - Shopping abschliessen
- S5.4 Zwei-Tab-Smoke mit konfiguriertem Supabase, falls verfuegbar.
- S5.5 Fehlerfall-Smoke fuer fehlgeschlagenen Save, soweit lokal simulierbar.
- S5.6 Contract Review gegen Guardrails.
- S5.7 Schritt-Abnahme.

Output:

- Gepruefter Snapshot-Sync-Vertrag.

Exit-Kriterium:

- HESTIA teilt Listen ruhig und vorhersehbar, ohne Live-Collaboration zu behaupten.

## S6 - Doku-Sync und Abschlussreview

Ziel:

- Alle Source-of-Truth-Dokus auf denselben finalen Vertrag bringen.

Substeps:

- S6.1 `docs/modules/Supabase Sync Module Overview.md` aktualisieren.
- S6.2 `docs/modules/Writing Module Overview.md` aktualisieren.
- S6.3 `docs/modules/Shopping Module Overview.md` aktualisieren.
- S6.4 `docs/QA_CHECKS.md` aktualisieren.
- S6.5 Roadmap-Ergebnisprotokolle finalisieren.
- S6.6 Finaler Contract Review.
- S6.7 Commit-Empfehlung.
- S6.8 Archiv-Entscheidung.

Output:

- Roadmap ist commit- oder archivbereit.

Exit-Kriterium:

- Code, Doku, QA und Roadmap sprechen denselben Snapshot-Sync-Vertrag.

## Ergebnisprotokoll-Format

```md
### Sx Ergebnisprotokoll DD.MM.YYYY

Umsetzung/Review:
- [...]

Contract Review:
- [...]

Checks:
- [...]

Findings und Korrekturen:
- [...]

Restrisiko:
- [...]
```

## Smokechecks / Regression

- Add bleibt lokal bis bewusst gespeichert wird.
- Manueller Save macht den Stand gemeinsam sichtbar.
- Loeschen, Liste leeren, Shopping-Toggle und Shopping-Abschluss folgen dem finalen Vertrag.
- Remote-Snapshot fuehrt nicht zu stiller, unverstandener UI-Verwirrung.
- Writing und Shopping zeigen keine widerspruechlichen Sync-Aussagen.
- App funktioniert weiterhin ohne Supabase-Konfiguration.

## Abnahmekriterien

- Der Nutzer versteht, ob seine Liste lokal oder gemeinsam ist.
- Konfliktverhalten ist dokumentiert, sichtbar und reproduzierbar.
- Sync-Status erzeugt mehr Klarheit als Laerm.
- Writing und Shopping sprechen denselben Sync-Vertrag.
- Keine robuste Realtime-Kollaboration wurde in diese Roadmap hineingezogen.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `feat(sync): clarify snapshot sync status contract`
