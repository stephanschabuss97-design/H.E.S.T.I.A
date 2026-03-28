# HESTIA Offline & Reconnect Reliability Roadmap

## Ziel (klar und pruefbar)
HESTIA soll auch bei kurzen Netzverlusten, Reconnects und Geraetewechseln ruhig und vorhersehbar bleiben, ohne sofort in Queue- oder Background-Sync-Komplexitaet abzugleiten.

Pruefbare Zieldefinition:
- Offline-, Online- und Reconnect-Verhalten sind als V1-Vertrag beschrieben.
- Es ist klar, was lokal weiter moeglich bleibt und was bewusst blockiert ist.
- Reconnect fuehrt nicht zu stiller State-Verwirrung oder doppelten Remote-Loads.
- Die App zeigt bei echten Sync-Problemen sinnvolle, unaufgeregte Hinweise.
- Service Worker, State-Layer und Sync-Layer sprechen denselben Reconnect-Vertrag.

## Scope
- Definition des V1-Verhaltens bei:
  - initial offline
  - Netzverlust waehrend Nutzung
  - Reconnect nach kurzzeitiger Offline-Phase
  - Realtime-Kanalverlust
  - erneuter Snapshot-Load nach Reconnect
- Entscheidung, welche lokalen Aenderungen offline erlaubt bleiben.
- Entscheidung, wie HESTIA Offline-Save-Fehler kommuniziert.
- Umsetzung der finalen Reconnect- und Fehlerregeln im bestehenden PWA-/Sync-Pfad.
- Nutzung der heute vorhandenen Diagnosebasis:
  - Touchlog
  - PWA-Kontextdiagnostik
  - Runtime-Config-Summary
  - Retry-/Fehlernormalisierung im Sync-Layer

## Not in Scope
- Vollstaendige Offline-Queue mit spaeterem automatischem Replay.
- Background Sync APIs oder aggressive Hintergrundjobs.
- Push-Notifications.
- Neues Konfliktmodell jenseits des in der Sync-Roadmap beschlossenen Vertrags.
- Full Redesign des Offline-Screens oder grosser PWA-Umbau.

## Relevante Referenzen (Code)
- `app/main.js`
- `app/core/state.js`
- `app/core/runtime-config.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/supabase/list-sync.js`
- `sw.js`
- `offline.html`

## Relevante Referenzen (Doku)
- `PRODUCT.md`
- `setup-supabase.md`
- `docs/QA_CHECKS.md`
- `docs/modules/Bootflow Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/HESTIA Sync Behavior, Conflicts & Status Roadmap.md`

## Guardrails
- Offline-Verhalten darf den lokalen Kernfluss nicht unnoetig kaputtmachen.
- HESTIA bleibt ein Werkzeug mit klaren Grenzen, kein komplexer Sync-Recovery-Client.
- Reconnect-Hinweise muessen hilfreich, aber unaufgeregt bleiben.
- Es wird keine verdeckte Queue versprochen, wenn V1 real keine hat.
- Nutzer sollen nie glauben, etwas sei bereits gemeinsam gespeichert, wenn es nur lokal vorliegt.

## Architektur-Constraints
- `localStorage` bleibt der lokale Persistenzanker fuer V1.
- Service Worker bleibt App-Shell-/Offline-Fallback und wird nicht zum versteckten Sync-Orchestrator.
- Reconnect-Logik bleibt im Frontend nachvollziehbar; keine Magic-Layer ausserhalb des bestehenden Scopes.
- Bestehender Household-/RLS-Vertrag bleibt unberuehrt.

## Tool Permissions
Allowed:
- Bestehende Sync-, State-, PWA- und UI-Dateien lesen und innerhalb Scope aendern.
- Statushinweise, Fehlertexte und kleine Connectivity-Hooks einfuehren.
- QA- und Modul-Doku anpassen.

Forbidden:
- Neue Dependencies.
- Background Sync, Queue-Frameworks oder neue Worker-Architektur.
- Push-Funktionen in diese Roadmap hineinziehen.
- Versteckte Auto-Replay-Mechanik ohne expliziten Vertrag.

## Execution Mode
- Diese Roadmap laeuft nach der Sync-Behavior-Roadmap.
- Erst `S1` bis `S3` definieren den Vertrag.
- Erst `S4` zieht die Repo-Umsetzung.
- `S5` schliesst mit Offline-Smokes, Doku-Sync und Restrisiken.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.

## Statusmatrix
| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse des heutigen Offline- und Reconnect-Verhaltens | TODO | Diagnosebasis steht bereits: Touchlog, PWA-Kontext, SW-Update-Pfad und Sync-Fehlerhaertung sind vorhanden. |
| S2 | Produktvertrag fuer Offline, Fehler und Reconnect finalisieren | TODO | |
| S3 | Technischen Reconnect-Vertrag fuer State, Realtime und Bootflow festziehen | TODO | |
| S4 | Repo-Umsetzung des finalen Offline-/Reconnect-Vertrags | TODO | |
| S5 | QA, Doku-Sync und Abschlussbewertung | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## Wiederkehrende Abschluss-Substeps pro Hauptschritt
- `letzter fachlicher Substep + 1: Schritt-Abnahme`
  - Ergebnis gegen Zielvertrag pruefen
  - stille Datenverlust- oder Falschstatus-Risiken pruefen
  - mindestens einen gezielten Check dokumentieren
- `danach: Doku-Sync`
  - betroffene Overviews, `PRODUCT.md` und `docs/QA_CHECKS.md` nachziehen
- `danach: Commit-Empfehlung`
  - festhalten, ob der Schritt bereits commitbar ist

## Schritte + Subschritte

### S1 - Ist-Analyse des heutigen Offline- und Reconnect-Verhaltens
- S1.1 Den aktuellen Boot-, Save-, Load- und Realtime-Pfad unter Offline-Bedingungen mappen.
- S1.2 Aufnehmen, was heute passiert bei:
  - App-Start ohne Netz
  - Netzverlust nach erfolgreichem Start
  - Save-Klick ohne Netz
  - Reconnect nach offenem Tab
- S1.3 Service Worker und `offline.html` gegen den echten Sync-Pfad abgleichen.
- S1.4 Heutige Fehlermeldungen, Retry-Pfade und Statuswechsel im UI aufnehmen.
- S1.5 Bereits vorhandene Touchlog-Signale fuer Connectivity und PWA-Kontext auf Eignung pruefen.
- S1.6 Schritt-Abnahme.
- S1.7 Doku-Sync.
- S1.8 Commit-Empfehlung.
- Output: klare Ist-Karte fuer Offline, Online und Reconnect.
- Exit-Kriterium: kein unkartierter Connectivity-Fall mehr offen.

### S2 - Produktvertrag fuer Offline, Fehler und Reconnect finalisieren
- S2.1 Festlegen, welche Aktionen offline weiterhin erlaubt bleiben.
- S2.2 Festlegen, was ein fehlgeschlagener Save fuer den Nutzer bedeutet und wie das benannt wird.
- S2.3 Festlegen, ob HESTIA nach Reconnect automatisch neu laedt, manuell bestaetigt oder nur markiert.
- S2.4 Festlegen, wie sich lokaler Dirty-State gegen Reconnect und eingehenden Remote-Stand verhaelt.
- S2.5 Sichtbaren Online-/Offline-Vertrag in Produktsprache definieren.
- S2.6 Schritt-Abnahme.
- S2.7 Doku-Sync.
- S2.8 Commit-Empfehlung.
- Output: finaler V1-Vertrag fuer Offline und Reconnect.
- Exit-Kriterium: keine offene Produktfrage mehr zu Netzverlust und Wiederverbindung.

### S3 - Technischen Reconnect-Vertrag fuer State, Realtime und Bootflow festziehen
- S3.1 Festlegen, wann Realtime neu abonniert werden muss.
- S3.2 Festlegen, wann ein Remote-Refetch nach Reconnect Pflicht ist.
- S3.3 Festlegen, wie `sw.js`, `app/main.js` und `app/supabase/list-sync.js` zusammenspielen.
- S3.4 Schutz gegen doppelte Subscriptions oder mehrfache Reconnect-Loads definieren.
- S3.5 Fehler- und Timeout-Pfade fuer Reconnect technisch eingrenzen.
- S3.6 Schritt-Abnahme.
- S3.7 Doku-Sync.
- S3.8 Commit-Empfehlung.
- Output: technischer Vertrag fuer Connectivity-Wechsel.
- Exit-Kriterium: keine offene Technikfrage mehr zu Refetch, Reconnect und Subscription-Lifecycle.

### S4 - Repo-Umsetzung des finalen Offline-/Reconnect-Vertrags
- S4.1 Bootflow, Runtime-Config und Sync-Layer auf den finalen Reconnect-Vertrag ziehen.
- S4.2 Status- und Fehler-UI fuer Offline-/Reconnect-Faelle anpassen.
- S4.3 Reconnect-Refetch oder Realtime-Recovery gemass Vertrag implementieren.
- S4.4 Service-Worker-/Offline-Fallback nur dort nachziehen, wo der Vertrag es verlangt.
- S4.5 Schritt-Abnahme.
- S4.6 Doku-Sync.
- S4.7 Commit-Empfehlung.
- Output: Repo verhaelt sich bei Offline und Reconnect gemass Vertrag.
- Exit-Kriterium: Netzwechsel fuehren nicht mehr zu stiller Sync-Unklarheit.

### S5 - QA, Doku-Sync und Abschlussbewertung
- S5.1 Smoke-Matrix fuer Offline, Reconnect und Save-Fehler definieren und ausfuehren.
- S5.2 Regression gegen normalen lokalen und Remote-Flow pruefen.
- S5.3 Doku, QA und Roadmap auf finalen Stand bringen.
- S5.4 Restrisiken fuer spaeteres Queueing oder Background-Sync notieren.
- S5.5 Schritt-Abnahme.
- S5.6 Doku-Sync.
- S5.7 Commit-Empfehlung.
- Output: belastbar dokumentierter Offline-/Reconnect-Vertrag.
- Exit-Kriterium: HESTIA bleibt auch bei Netzwechseln ruhig und ehrlich.

## Smokechecks / Regression (Definition)
- Start ohne Netz oeffnet die App weiterhin sinnvoll.
- Lokale Listenarbeit ohne Netz bleibt moeglich, soweit der Vertrag es erlaubt.
- Save ohne Netz zeigt einen klaren, ehrlichen Fehlerzustand.
- Reconnect fuehrt nicht zu doppelten Subscriptions oder chaotischen UI-Spruengen.
- Ein wiederhergestellter Remote-Stand erscheint gemass Vertrag und nicht still im Widerspruch zum lokalen Zustand.

## Abnahmekriterien
- Online-/Offline-Verhalten ist fuer Nutzer und neue Chats klar dokumentiert.
- Reconnect fuehlt sich ruhig und nachvollziehbar an.
- HESTIA behauptet offline nie mehr als sie real leisten kann.
- State, Realtime und Service Worker widersprechen sich nicht.
- QA und Doku sprechen denselben Endstand wie der Code.

## Risiken
- Zu viel Reconnect-Automatik kann lokale Arbeit unerwartet ueberschreiben.
- Zu wenig Reconnect-Logik kann zu dauerhaft stale States fuehren.
- Ein zu optimistischer Offline-Status kann Vertrauen zerstoeren.
- Unsaubere Realtime-Recovery kann doppelte Events oder stille Ausfaelle erzeugen.
