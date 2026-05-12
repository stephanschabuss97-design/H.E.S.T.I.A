# HESTIA Technical Roadmap - Offline & Reconnect Reliability (LEGACY)

Legacy-Hinweis:

- Diese Roadmap wird nicht mehr als aktive Einzelroadmap gefuehrt.
- Die relevanten Punkte wurden in `docs/future roadmaps.md` unter Roadmap 2, Punkt 6 `Offline- und Reconnect-Ehrlichkeit sichern` integriert.
- Dieses Dokument bleibt als Herkunfts- und Detailquelle erhalten.

## Ziel (klar und pruefbar)

HESTIA soll bei kurzen Netzverlusten, initialem Offline-Start und Reconnect ehrlich, ruhig und vorhersehbar bleiben, ohne eine Offline-Queue, Background Sync oder versteckte Replay-Mechanik zu versprechen.

Pruefbare Zieldefinition:

- Offline-, Online- und Reconnect-Verhalten sind als V1-Vertrag beschrieben.
- Es ist klar, welche Aktionen lokal weiter moeglich sind und welche nur gemeinsam gespeichert werden koennen, wenn Netz und Sync verfuegbar sind.
- Save-Fehler und Reconnect-Zustaende erzeugen keine falsche Sicherheit.
- Reconnect fuehrt nicht zu doppelten Subscriptions, doppelten Remote-Loads oder stiller State-Verwirrung.
- Service Worker, Bootflow, State-Layer und Sync-Layer sprechen denselben Connectivity-Vertrag.

## Problemzusammenfassung

HESTIA ist browser-first und PWA-faehig. Das ist fuer den Haushalt praktisch, bringt aber eine klare Produktpflicht mit sich: Die App darf offline nicht mehr behaupten, als sie leisten kann. Lokale Listenarbeit darf moeglich bleiben, aber gemeinsame Speicherung ist ohne Netz nicht ehrlich garantiert. Diese Roadmap soll den schmalen V1-Vertrag fuer Offline und Reconnect definieren und nur die noetige Zuverlaessigkeit nachziehen, statt HESTIA in einen komplexen Sync-Recovery-Client umzubauen.

## Future-Roadmap-Einordnung

- Technische Begleitroadmap, nicht eigenstaendige Produkt-Roadmap in `docs/future roadmaps.md`.
- Muss nach oder mindestens zusammen mit `HESTIA Sync Behavior, Conflicts & Status Roadmap.md` laufen, weil Offline-Verhalten denselben Snapshot-/Dirty-State-Vertrag braucht.
- Vor Roadmap 5 `Realtime Shopping Collaboration als Premium Feature` sinnvoll, falls robuste Mehrgeraete-Nutzung spaeter ernster wird.
- Prioritaet: niedriger als kernnahe UX-Roadmaps, hoeher als Push, wenn echte Sync-/Reconnect-Probleme im Alltag sichtbar werden.

## Scope

- Definition und ggf. Umsetzung des V1-Verhaltens bei:
  - initial offline
  - Netzverlust waehrend Nutzung
  - Save ohne Netz
  - Reconnect nach kurzem Offline-Zustand
  - Realtime-Kanalverlust
  - erneuter Snapshot-Load nach Reconnect
- Ehrliche UI-/Statuskommunikation fuer fehlgeschlagene gemeinsame Saves.
- Schutz gegen doppelte Realtime-Subscriptions oder mehrfache Reconnect-Loads.
- Nutzung vorhandener Diagnosebasis:
  - Touchlog
  - Runtime-Config-Summary
  - PWA-/Service-Worker-Pfade
  - Sync-Fehlernormalisierung
- QA- und Modul-Doku-Sync.

## Not in Scope

- Keine vollstaendige Offline-Queue.
- Kein automatisches Replay lokaler Aenderungen nach Reconnect.
- Kein Background Sync.
- Keine Push-Notifications.
- Kein neues Konfliktmodell jenseits der Sync-Behavior-Roadmap.
- Kein Service-Worker-Umbau zum Sync-Orchestrator.
- Keine neue Dependency und kein Build-Step.

## Relevante Referenzen (Code)

- `app/main.js`
- `app/core/state.js`
- `app/core/runtime-config.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/supabase/list-sync.js`
- `sw.js`
- `offline.html`
- `index.html`
- `app/styles/ui.css`

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/QA_CHECKS.md`
- `docs/modules/Bootflow Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Runtime Config Module Overview.md`
- `docs/modules/Deployment Module Overview.md`
- `docs/HESTIA Sync Behavior, Conflicts & Status Roadmap.md`

Regel:

- Erst Sync-Vertrag lesen.
- Dann Bootflow, Service Worker und Sync-Layer lesen.
- Erst nach S1-S3 Code aendern.

## Guardrails

- Offline-Verhalten muss ehrlich sein: lokal ist lokal, gemeinsam ist gemeinsam.
- HESTIA bleibt ein kleines Haushaltswerkzeug, kein komplexer Offline-Client.
- Reconnect-Hinweise muessen helfen, nicht laermen.
- Keine verdeckte Queue versprechen, wenn V1 keine Queue besitzt.
- Lokale Arbeit darf nicht unerwartet durch Reconnect ueberschrieben werden.
- Service Worker bleibt App-Shell-/Fallback-Schicht.

## Architektur-Constraints

- `localStorage` bleibt lokaler Persistenzanker fuer V1.
- `state.items` bleibt UI-Wahrheit.
- Supabase bleibt Remote-Snapshot.
- Reconnect-Logik bleibt nachvollziehbar im bestehenden Frontend-/Sync-Pfad.
- Bestehender Household-Key-/RLS-Vertrag bleibt unveraendert.
- Keine neuen Worker- oder Queue-Frameworks.

## Tool Permissions

Allowed:

- Lesen und Aendern von:
  - `app/main.js`
  - `app/core/runtime-config.js`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`
  - `app/supabase/list-sync.js`
  - `sw.js`, nur soweit der Vertrag es verlangt
  - `offline.html`, nur soweit der Vertrag es verlangt
  - betroffene Styles, Module Overviews und `docs/QA_CHECKS.md`
- Lokale Checks:
  - `node --check`
  - `git diff --check`
  - lokaler HTTP-Smoke
  - manueller Browser-Smoke mit DevTools Offline, wenn noetig

Forbidden:

- Neue Dependencies.
- Background Sync oder Queue-Framework.
- Push-Funktionen.
- Auth-/Schema-Umbau.
- Verstecktes Auto-Replay lokaler Mutationen.
- Realtime-Collaboration in diese Roadmap ziehen.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- Diese Roadmap startet erst nach finalisiertem Snapshot-Sync-Vertrag oder dokumentiert diesen als Blocker.
- S1 bis S3 definieren Vertrag und Technikgrenzen.
- S4 setzt nur den beschlossenen Vertrag um.
- S5 prueft Offline-/Reconnect-Smokes.
- S6 synchronisiert Doku, QA und Roadmap.

## Vorab Bewertung 09.05.2026

Bewertung:

- Die alte Roadmap war sinnvoll, aber sie setzte teils voraus, dass Sync-/Dirty-State-Verhalten bereits final entschieden ist.
- Nach neuer Einordnung wird Offline/Reconnect als technische Reliability-Roadmap gefuehrt, nicht als Produktfeature.

## Vorab Contract Review 09.05.2026

Review-Frage:

- Bleibt diese Roadmap innerhalb des HESTIA-Produktvertrags, wenn sie Offline und Reconnect robuster macht?

Entscheidung:

- Ja, wenn sie ehrlich kommuniziert, keine Queue erfindet und den Sync-Vertrag nicht eigenmaechtig erweitert.

Findings:

- CR-F1: Offline-Verhalten ist ohne finalen Sync-/Dirty-State-Vertrag nicht sauber entscheidbar.
- CR-F2: Reconnect-Automatik kann lokale Arbeit still ueberschreiben, wenn sie zu aggressiv wird.
- CR-F3: Service Worker darf nicht zum versteckten Sync-Orchestrator werden.
- CR-F4: Offline-UI darf keine gemeinsame Speicherung suggerieren.
- CR-F5: Push und Background Sync muessen hart abgegrenzt bleiben.

Korrekturen:

- Scope und Execution Mode verlangen jetzt explizit Sync-Vertrag vor Umsetzung.
- Queue, Replay, Background Sync und Push sind in Not in Scope/Forbidden geschaerft.
- S4/S5 fokussieren auf ehrliche Fehler-/Reconnect-Regeln und Tests.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse des heutigen Offline-/Reconnect-Verhaltens | TODO | |
| S2 | Produktvertrag fuer Offline, Save-Fehler und Reconnect finalisieren | TODO | |
| S3 | Technischen Vertrag fuer Bootflow, Realtime und Service Worker festziehen | TODO | |
| S4 | Repo-Umsetzung des finalen Offline-/Reconnect-Vertrags | TODO | |
| S5 | QA, Offline-Smokes und Regression | TODO | |
| S6 | Doku-Sync und Abschlussreview | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - Ist-Analyse des heutigen Offline-/Reconnect-Verhaltens

Ziel:

- Aktuelles Verhalten bei Netzverlust, Offline-Start und Reconnect ohne Annahmen mappen.

Substeps:

- S1.1 README, PRODUCT und Sync-Behavior-Roadmap lesen.
- S1.2 Bootflow, Runtime-Config, `list-sync.js`, `sw.js` und `offline.html` lesen.
- S1.3 Verhalten fuer initial offline, Save ohne Netz und Reconnect aufnehmen.
- S1.4 Touchlog-/Diagnoseereignisse fuer Connectivity pruefen.
- S1.5 Blocker aus Sync-Vertrag dokumentieren.
- S1.6 S1 Contract Review.
- S1.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Ist-Karte fuer Offline, Online und Reconnect.

Exit-Kriterium:

- Kein unkartierter Connectivity-Fall mehr offen.

## S2 - Produktvertrag fuer Offline, Save-Fehler und Reconnect

Ziel:

- Festlegen, was HESTIA bei Netzverlust ehrlich leisten soll.

Substeps:

- S2.1 Welche Aktionen offline erlaubt bleiben, festlegen.
- S2.2 Save-Fehler in Produktsprache definieren.
- S2.3 Reconnect-Verhalten definieren: automatisch laden, markieren oder Nutzerimpuls.
- S2.4 Dirty-State vs. Reconnect/Remote-Snapshot entscheiden.
- S2.5 Sichtbaren Offline-/Online-Vertrag formulieren.
- S2.6 S2 Contract Review.
- S2.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Finaler V1-Vertrag fuer Offline und Reconnect.

Exit-Kriterium:

- Keine offene Produktfrage zu Netzverlust und Wiederverbindung.

## S3 - Technischer Vertrag fuer Bootflow, Realtime und Service Worker

Ziel:

- Technische Grenzen und Lifecycle-Regeln definieren.

Substeps:

- S3.1 Realtime-Reconnect-/Resubscribe-Regeln definieren.
- S3.2 Refetch-Regeln nach Reconnect definieren.
- S3.3 Schutz gegen doppelte Subscriptions festlegen.
- S3.4 Service Worker und `offline.html` gegen Produktvertrag pruefen.
- S3.5 Timeout-/Fehlerpfade eingrenzen.
- S3.6 S3 Contract Review.
- S3.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Technischer Connectivity-Vertrag.

Exit-Kriterium:

- Keine offene Technikfrage zu Refetch, Reconnect und Subscription-Lifecycle.

## S4 - Repo-Umsetzung

Ziel:

- Beschlossenen Offline-/Reconnect-Vertrag im Repo umsetzen.

Substeps:

- S4.1 Sync-Layer und Bootflow nach Vertrag anpassen.
- S4.2 Status-/Fehler-UI fuer Offline- und Save-Fehler anpassen.
- S4.3 Reconnect-Refetch oder Realtime-Recovery implementieren, falls beschlossen.
- S4.4 Service Worker/Fallback nur bei belegtem Bedarf nachziehen.
- S4.5 Code- und Contract Review.
- S4.6 Fehler korrigieren.
- S4.7 Schritt-Abnahme.

Output:

- Repo verhaelt sich bei Offline und Reconnect gemaess Vertrag.

Exit-Kriterium:

- Netzwechsel fuehren nicht zu stiller Sync-Unklarheit.

## S5 - QA, Offline-Smokes und Regression

Ziel:

- Offline-/Reconnect-Verhalten reproduzierbar pruefen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 Browser-Smoke mit DevTools Offline:
  - Start ohne Netz
  - Save ohne Netz
  - Netzverlust nach Start
  - Reconnect
- S5.4 Regression gegen normalen lokalen und Snapshot-Sync-Flow.
- S5.5 Contract Review gegen Guardrails.
- S5.6 Schritt-Abnahme.

Output:

- Belastbar dokumentierter Offline-/Reconnect-Vertrag.

Exit-Kriterium:

- HESTIA bleibt auch bei Netzwechseln ruhig und ehrlich.

## S6 - Doku-Sync und Abschlussreview

Ziel:

- Doku und QA mit dem finalen Connectivity-Vertrag synchronisieren.

Substeps:

- S6.1 `docs/modules/Bootflow Module Overview.md` aktualisieren.
- S6.2 `docs/modules/Supabase Sync Module Overview.md` aktualisieren.
- S6.3 `docs/modules/Deployment Module Overview.md` oder `Runtime Config` aktualisieren, falls betroffen.
- S6.4 `docs/QA_CHECKS.md` aktualisieren.
- S6.5 Roadmap-Ergebnisprotokolle finalisieren.
- S6.6 Finaler Contract Review.
- S6.7 Commit-Empfehlung.
- S6.8 Archiv-Entscheidung.

Output:

- Roadmap ist commit- oder archivbereit.

Exit-Kriterium:

- Code, Doku, QA und Roadmap sprechen denselben Offline-/Reconnect-Vertrag.

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

- Start ohne Netz oeffnet die App sinnvoll.
- Lokale Listenarbeit bleibt offline so weit moeglich, wie der Vertrag es erlaubt.
- Save ohne Netz zeigt einen klaren, ehrlichen Fehlerzustand.
- Reconnect fuehrt nicht zu doppelten Subscriptions oder chaotischen UI-Spruengen.
- Remote-Stand nach Reconnect erscheint gemaess Vertrag und nicht still im Widerspruch zum lokalen Zustand.

## Abnahmekriterien

- Online-/Offline-Verhalten ist fuer Nutzer und neue Chats klar dokumentiert.
- Reconnect fuehlt sich ruhig und nachvollziehbar an.
- HESTIA behauptet offline nie mehr, als sie real leisten kann.
- State, Realtime und Service Worker widersprechen sich nicht.
- QA und Doku sprechen denselben Endstand wie der Code.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `feat(sync): harden offline reconnect behavior`
