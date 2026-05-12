# HESTIA Roadmap 2 - Schreiben, Speichern und Listenvertrauen

## Ziel (klar und pruefbar)

Der Writing- und Save-Flow soll sich schneller, ehrlicher und vertrauenswuerdiger anfuehlen, ohne HESTIA in ein Produktkatalog-, Auto-Sync-, Offline-Queue- oder Collaboration-System umzubauen.

Pruefbare Zieldefinition:

- Writing fuehlt sich weniger wie ein Formular und mehr wie schnelles Notieren an.
- Freitext bleibt immer erlaubt; Semantik, Menge und Einheit helfen nur.
- Der V1-Snapshot-Sync-Vertrag ist fuer Nutzer, Code und Doku klar: was lokal bleibt, was gemeinsam gespeichert wird und was `Last write wins` bedeutet.
- Save-, Offline- und Reconnect-Zustaende erzeugen keine falsche Sicherheit und keinen unnoetigen Alarm.
- Mengen-/Einheiten-Darstellung wirkt fachlich ehrlicher, wenn der Produktname selbst schon natuerliche Mengenangaben enthaelt.
- Der Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` bleibt unveraendert.
- Keine robuste Live-Collaboration, keine Offline-Queue, keine Push-Logik und kein neues Auth-/Account-Modell werden eingefuehrt.

## Problemzusammenfassung

Roadmap 1 hat den Einkaufsflow veredelt. Der naechste kernnahe Reibungspunkt liegt beim Schreiben und beim Vertrauen in den Listenstand: Die Eingabe wirkt noch formularig, `Liste speichern` kann mental nach technischem Speichern statt bewusster Haushaltsfreigabe klingen, und Offline-/Reconnect-Faelle sind noch nicht als ruhiger V1-Vertrag geklaert. Dazu kommt ein kleines Darstellungsproblem: natuerliche Produkttexte wie `24 Stueck AA und AAA Batterien` koennen neben strukturierten Feldern wie `1 stk` fachlich holprig wirken. Diese Roadmap soll diese Punkte zusammen bearbeiten, weil sie dieselbe Alltagsfrage betreffen: "Ich schreibe etwas auf und verstehe danach, welcher Listenstand wirklich gilt."

## Scope

- Writing-Flow:
  - Produktfeld als Hauptaktion staerken
  - Menge und Einheit dezenter, optionaler oder schneller bedienbar machen, falls S1-S3 das bestaetigen
  - Autocomplete-/Semantik-Hilfe in der bestehenden Rolle erhalten
  - offene Liste im Writing-Kontext lesbarer und ruhiger machen
- Listen-Darstellung:
  - Menge/Einheit nur so glaetten, dass fachliche Widersprueche reduziert werden
  - keine perfekte Natural-Language-Parsing-Logik
  - keine erzwungene Datenbereinigung
- Snapshot-Sync und Save-Gefuehl:
  - V1-Vertrag fuer lokale Aenderungen, manuelles Speichern und direkte Shared-Snapshots klaeren
  - Statuswortschatz fuer lokal, nicht gespeichert, gespeichert und fehlgeschlagen definieren
  - `Last write wins` als V1-Tradeoff dokumentieren
  - Remote-Snapshot-Refresh als Snapshot behandeln, nicht als Collaboration-Orchester
- Offline und Reconnect:
  - V1-Vertrag fuer initial offline, Save ohne Netz, Netzverlust und Reconnect definieren
  - ehrliche UI-/Statuskommunikation fuer fehlgeschlagene gemeinsame Saves
  - Schutz gegen doppelte Subscriptions oder chaotische Reconnect-Loads, falls S1-S3 den Bedarf bestaetigen
- Touchlog-/Diagnoseeintraege nur soweit sie den Vertrag nachvollziehbar machen.
- Doku- und QA-Sync fuer Writing, State, Supabase Sync, Bootflow/Runtime und betroffene QA-Smokes.

## Not in Scope

- Kein Auto-Save bei jedem Tastendruck.
- Keine robuste Live-Kollaboration fuer paralleles Einkaufen.
- Keine CRDTs, Merge-Editoren, Konflikt-Dialoge oder Eventlogik.
- Keine Offline-Queue, kein Background Sync und kein automatisches Replay lokaler Aenderungen nach Reconnect.
- Keine Push-Notifications; Push bleibt Roadmap 5.
- Kein Einkaufsapps- oder Shopping-Begleiter-Modul; das bleibt Roadmap 4.
- Kein Home-Redesign; das bleibt Roadmap 3.
- Kein Produktkatalog, keine Pflichtkategorien, keine harte Semantikvalidierung.
- Keine Aenderung am Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart`.
- Keine SQL-/RLS-/Supabase-Schema-Aenderung ohne separate ausdrueckliche Entscheidung.
- Keine neue Dependency, kein Build-Step, kein Framework.
- Kein Service-Worker-Umbau zum Sync-Orchestrator.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`
- `app/core/state.js`
- `app/core/runtime-config.js`
- `app/core/semantics.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/supabase/list-sync.js`
- `app/styles/ui.css`
- `app/styles/writing.css`
- `app/styles/shopping.css`
- `app/styles/layout.css`
- `sw.js`
- `offline.html`

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/QA_CHECKS.md`
- `docs/archive/HESTIA Einkaufsflow Veredeln Roadmap (DONE).md`
- `docs/archive/HESTIA Sync Behavior, Conflicts & Status Roadmap (Legacy).md`
- `docs/archive/HESTIA Offline & Reconnect Reliability Roadmap (Legacy).md`
- `docs/modules/Writing Module Overview.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Bootflow Module Overview.md`
- `docs/modules/Runtime Config Module Overview.md`
- `docs/modules/Deployment Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`

Regel:

- Erst README, PRODUCT und `docs/future roadmaps.md` lesen.
- Dann Roadmap 1 DONE und die beiden Legacy-Quellen lesen.
- Dann betroffene Module Overviews lesen.
- Dann erst Code lesen.
- Erst nach S1-S3 Code aendern.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug fuer den gemeinsamen Einkaufsfluss.
- `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
- Writing muss schneller und leichter werden, nicht datenstrenger.
- Freitext bleibt immer moeglich.
- Der Nutzer darf nie glauben, ein nur lokaler Stand sei bereits gemeinsam gespeichert.
- Status-Copy muss ruhiger machen, nicht technische Lautstaerke erzeugen.
- Offline-Verhalten muss ehrlich sein: lokal ist lokal, gemeinsam ist gemeinsam.
- `Last write wins` darf V1-Tradeoff bleiben, muss aber als solcher beschrieben sein.
- Realtime bleibt Snapshot-Refresh, nicht Roadmap 6 Realtime Shopping Collaboration.
- Service Worker bleibt App-Shell-/Fallback-Schicht.
- User-facing Copy bleibt kurz, ruhig und alltagstauglich.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules ohne Build-Step.
- `state.items` bleibt operative UI-Wahrheit.
- `localStorage` bleibt lokaler Persistenzanker fuer V1.
- Supabase bleibt gemeinsamer Household-Snapshot.
- Remote-Layer bleibt in `app/supabase/*`.
- Bestehender Household-Key-/RLS-Vertrag bleibt unveraendert.
- State-Operationen bleiben bei den vorhandenen Methoden in `app/core/state.js`, ausser S1-S3 belegen einen engen Bedarf.
- Styling bleibt in bestehenden Owner-Dateien:
  - Writing-spezifisch nach `app/styles/writing.css`
  - globale Status-/Button-/Listenmuster nach `app/styles/ui.css`
  - Shopping nur bei faktischer Anzeige-/Statuskopplung
- Reconnect-Logik muss nachvollziehbar bleiben und darf keinen versteckten Sync-Client bauen.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus, Legacy-Roadmaps und betroffenen Codepfade.
- Aendern von:
  - `index.html`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`, nur falls Sync-/Status- oder Listendarstellungsvertrag es verlangt
  - `app/core/state.js`, nur falls S1-S3 einen echten Vertragsbedarf belegen
  - `app/core/runtime-config.js`, nur falls Connectivity-/Statusvertrag es verlangt
  - `app/supabase/list-sync.js`
  - `app/main.js`, nur falls Boot-/Reconnect-Vertrag es verlangt
  - `sw.js` und `offline.html`, nur bei belegtem Offline-/Fallback-Bedarf
  - `app/styles/ui.css`
  - `app/styles/writing.css`
  - `app/styles/shopping.css`, nur falls betroffene Anzeige dort liegt
  - betroffene Module Overviews und `docs/QA_CHECKS.md`
- Lokale Checks:
  - `node --check` fuer geaenderte JS-Dateien
  - `git diff --check`
  - lokaler HTTP-Smoke ueber `python -m http.server`
  - manueller Browser-Smoke mit DevTools Offline, falls noetig

Forbidden:

- Neue Dependencies oder Build-Tools.
- Auth-, Account-, Rollen-, SQL-, RLS- oder Supabase-Schema-Umbau.
- Auto-Save, CRDT, Merge-Editor, Offline-Queue oder Background Sync.
- Push-Funktionen oder Notification-Opt-in.
- Realtime-Shopping-Collaboration in diese Roadmap ziehen.
- Semantik-Datei in einen Produktkatalog umbauen.
- Home-Dashboard, Einkaufsapps oder Haushaltsperipherie umsetzen.
- Bestehende User- oder Household-Sync-Vertraege still umdeuten.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Detektivarbeit, Vertragsklaerung, Bruchrisiko-, UI-/Copy- und Contract Review.
- S4 ist die Umsetzung und wird in kleine Substeps geteilt.
- S5 prueft lokal moegliche Syntax-, UI-, Sync-, Offline-/Reconnect- und Regression-Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnisprotokolle.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 10.05.2026

Review-Frage:

- Bleibt Roadmap 2 innerhalb des HESTIA-Produktvertrags, wenn sie Writing-Ergonomie, Snapshot-Sync, Offline/Reconnect und Listendarstellung gemeinsam behandelt?

Entscheidung:

- Ja, wenn sie als Roadmap fuer Eingabe- und Listenvertrauen behandelt wird und keine Auto-Sync-, Queue-, Collaboration-, Push- oder Produktkatalog-Komplexitaet einfuehrt.

Findings:

- CR-F1: Der Titel "Schreiben, Speichern und Listenvertrauen" ist fachlich passend, aber breit. Ohne klare Substep-Grenzen koennte S4 in zu viele Schichten gleichzeitig kippen.
- CR-F2: "Writing weniger formularig" koennte faelschlich als komplette UI-Neuerfindung oder Aufgabe strukturierter Felder verstanden werden.
- CR-F3: Snapshot-Sync und Offline/Reconnect sind technisch gekoppelt. Offline darf nicht umgesetzt werden, bevor der V1-Sync-/Dirty-State-Vertrag in S2 finalisiert ist.
- CR-F4: Sync-Status-Copy kann HESTIA lauter machen, wenn jeder normale Zwischenzustand sichtbar gemacht wird.
- CR-F5: Listen-Darstellung darf nicht in Natural-Language-Parsing, Produktkatalog oder automatische Datenkorrektur kippen.
- CR-F6: Roadmap 2 ist Voraussetzung fuer Roadmap 5 Push und Roadmap 6 Realtime, darf diese Features aber nicht vorwegnehmen.
- CR-F7: Service Worker und `offline.html` duerfen nicht vorsorglich umgebaut werden; Eingriffe sind nur erlaubt, wenn S1-S3 einen belegten Vertragsbruch zeigen.

Korrekturen:

- Scope, Not in Scope, Tool Permissions und Architektur-Constraints grenzen Auto-Save, Queue, Push, Realtime-Collaboration, Produktkatalog und Service-Worker-Umbau hart ab.
- S4 wurde in UI-, Darstellungs-, Sync-, Connectivity- und Review-Substeps geteilt, damit Umsetzung nicht zu einem unkontrollierten Querschnittsumbau wird.
- S1-S3 verlangen erst Ist-Analyse, Zielvertrag und Copy-/Bruchrisiko-Review, bevor Code geaendert wird.
- Offline/Reconnect wird explizit vom finalen Snapshot-Sync-Vertrag abhaengig gemacht.
- Status-Copy wird als ruhiger User-Facing-Copy-Vertrag behandelt, nicht als technisches Diagnosepanel.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System- und Vertragsdetektivarbeit | DONE | Doku und Codepfade gelesen; Writing-, Snapshot-Sync-, Offline-/Reconnect- und Listendarstellungs-Findings dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Zielvertrag finalisiert: Writing leichter, Hybrid-Snapshot bestaetigt, Dirty-State geschuetzt, Offline ehrlich, Darstellung nur praesentativ glaetten. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | Copy-, Dirty-State-, Offline-, Darstellungs- und S4-Pflichtvertrag finalisiert. |
| S4 | Umsetzung | DONE | S4.1 bis S4.7 abgeschlossen: Writing-Ergonomie, Listen-Darstellung, Status-/Freigabe-Copy, Dirty-State-/Offline-Vertrag, UI-Hierarchie und Abschlussreview sind umgesetzt. |
| S5 | Tests, Code Review und Contract Review | DONE | Lokale Checks und Live-Server-Smokes durch Stephan bestanden. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | Module Overviews, QA, Future Roadmaps und Abschlussvertrag synchronisiert; Roadmap archivbereit. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System- und Vertragsdetektivarbeit

Ziel:

- Bestehenden Writing-, Save-, Sync-, Offline-/Reconnect- und Listendarstellungsstand verstehen.
- Betroffene Source-of-Truth-Dokus lesen.
- Codepfade identifizieren.
- Noch keinen Code aendern, ausser diese Roadmap selbst wird aktualisiert.

Substeps:

- S1.1 README, `PRODUCT.md` und `docs/future roadmaps.md` erneut lesen.
- S1.2 Roadmap 1 DONE sowie Sync-/Offline-Legacy-Roadmaps lesen.
- S1.3 Writing, Shopping, State, Supabase Sync, Bootflow, Runtime Config, Touchlog und CSS Module Overviews lesen.
- S1.4 Betroffene HTML-, JS-, CSS-, PWA- und Offline-Pfade lesen.
- S1.5 Ist-Zustand dokumentieren:
  - Writing-Form und aktueller Eingabeaufwand
  - Semantik-/Unit-Inferenz
  - offene Liste und Mengen-/Einheiten-Darstellung
  - `Liste speichern` und Sync-Status
  - lokale vs. gemeinsame Persistenzgruende
  - Remote-Snapshot-Refresh
  - initial offline, Save ohne Netz, Netzverlust und Reconnect
  - Touchlog-/Diagnoseereignisse
- S1.6 Erste Findings und offene Fragen dokumentieren.
- S1.7 S1 Contract Review.
- S1.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Systemkarte fuer Writing, Save, Sync, Offline/Reconnect und Listendarstellung.
- Relevante Dateien.
- Bestehender Vertrag fuer lokale und gemeinsame Listenwahrheit.
- Erste Findings fuer S2/S3.

Exit-Kriterium:

- Es ist klar, welche Schichten betroffen sind und welche nicht.

### S1 Ergebnisprotokoll 11.05.2026

Durchgefuehrt:

- Roadmap 2 erneut gelesen und gegen Scope, Not in Scope, Guardrails und Execution Mode geprueft.
- README, `PRODUCT.md` und `docs/future roadmaps.md` gelesen.
- Historische Referenzen gelesen:
  - `docs/archive/HESTIA Einkaufsflow Veredeln Roadmap (DONE).md`
  - `docs/archive/HESTIA Sync Behavior, Conflicts & Status Roadmap (Legacy).md`
  - `docs/archive/HESTIA Offline & Reconnect Reliability Roadmap (Legacy).md`
  - `hestia-shared-list-sync-roadmap.md`
- Betroffene Module Overviews gelesen:
  - Writing
  - Shopping
  - State Layer
  - Supabase Sync
  - Bootflow
  - Runtime Config
  - Deployment
  - CSS
  - Touchlog
  - PWA Install
  - Home
  - Diagnostics
- QA-Basis gelesen:
  - `docs/QA_CHECKS.md`
- Betroffene Codepfade gelesen:
  - `index.html`
  - `app/main.js`
  - `app/core/state.js`
  - `app/core/runtime-config.js`
  - `app/core/semantics.js`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`
  - `app/supabase/list-sync.js`
  - `app/supabase/client.js`
  - `app/styles/ui.css`
  - `app/styles/writing.css`
  - `app/styles/shopping.css`
  - `app/styles/layout.css`
  - `app/app.css`
  - `sw.js`
  - `offline.html`
  - `manifest.webmanifest`
  - `setup-supabase.md`

Aktueller Writing-Flow:

- `index.html` zeigt im Writing-Screen ein klassisches Formular:
  - Produkt
  - Menge
  - Einheit
  - `Item hinzufuegen`
- `app/modules/writing.js` bindet Formular, offene Liste, `Liste leeren`, `Liste speichern`, Sync-Status und Semantik-Unit-Inferenz.
- Das Produktfeld ist fachlich wichtigster Eingang, wird visuell aber noch gleichrangig mit Menge/Einheit behandelt.
- Menge ist aktuell Pflichtfeld mit Default `1`; Einheit ist optional und wird bei `change` des Produktnamens nur gesetzt, wenn das Einheitenfeld leer ist.
- Ungueltige Submit-Werte werden still ignoriert:
  - leerer Name
  - Menge `NaN`
  - Menge kleiner/gleich `0`
- Nach Add:
  - `store.upsertItem(...)`
  - Touchlog `[writing] added item ...`
  - Formular-Reset
  - Menge zurueck auf `1`
  - `markDirty()`
  - lokales `hestia:items-updated` mit `source: "local"`
- Add speichert nicht automatisch remote. Das entspricht dem V1-Vertrag.

Aktuelle offene Listen-Darstellung:

- Writing rendert die offene Liste in `app/modules/writing.js` aktuell per `innerHTML`.
- Itemdaten werden in `row.innerHTML` interpoliert:
  - `item.name`
  - `${item.quantity} ${item.unit}`
  - `data-item-name`
- Shopping rendert seit Roadmap 1 neue Zeilen ueber DOM-Knoten und `textContent`.
- Menge/Einheit werden in Writing und Shopping jeweils roh als `${quantity} ${unit}` angezeigt.
- Es gibt noch keinen Darstellungsvertrag, der natuerliche Mengenangaben im Produktnamen gegen strukturierte Menge/Einheit abgleicht.

Aktueller Sync-/Save-Vertrag im Code:

- `app/core/state.js` haelt lokale UI-Wahrheit in `state.items` und `localStorage` unter `hestia.v1.items`.
- Der stabile Item-Vertrag ist:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`
- `app/supabase/list-sync.js` normalisiert remote zwischen `inCart` und `in_cart`.
- `listSync.saveSnapshot(...)` loescht fuer den Haushalt zuerst alle Remote-Zeilen und schreibt danach den aktuellen Snapshot neu.
- Aktuelle Persistenzgruende:
  - `manual-save`
  - `remove-item`
  - `clear-list`
  - `shopping-toggle`
  - `shopping-finish`
- `manual-save` ist nur im Writing-Screen sichtbar.
- `remove-item` und `clear-list` werden aus Writing direkt als Shared Snapshot gespeichert, wenn Sync konfiguriert ist.
- `shopping-toggle` und `shopping-finish` werden aus Shopping direkt als Shared Snapshot gespeichert, wenn Sync konfiguriert ist.
- Der aktuelle Hybrid-Vertrag ist damit real vorhanden:
  - Add bleibt lokal bis bewusst gespeichert.
  - Loeschen, Leeren, Shopping-Toggle und Shopping-Abschluss schreiben direkt gemeinsam.

Aktueller Sync-Status im Writing:

- `syncMode` ist lokaler Modulzustand in `writing.js`.
- Moegliche Statuswerte im Code:
  - `local-only`
  - `idle`
  - `dirty`
  - `saving`
  - `saved`
  - `error`
- Sichtbare Texte:
  - `Nur lokal gespeichert.`
  - `Sync bereit.`
  - `Nicht gespeichert.`
  - `Speichere Liste ...`
  - `Gespeichert um HH:MM.`
  - konkrete Fehlermeldung oder `Sync fehlgeschlagen.`
- Der Save-Button ist nur sichtbar, wenn Sync konfiguriert ist und Items vorhanden sind.
- Bei erfolgreichem Save dispatcht Writing ein `hestia:items-updated` mit `source: "remote"`.
- Bei einem Remote-Event setzt Writing den Status auf `saved` oder `idle` und schreibt einen Touchlog-Eintrag `[writing] remote state visible ...`.

Aktueller Remote-/Realtime-Vertrag:

- `app/main.js` laedt bei vorhandener Supabase-Konfiguration initial einen Remote-Snapshot.
- Bei erfolgreichem Initial-Load:
  - `state.setItems(remoteSnapshot.items)`
  - Touchlog `[sync] remote snapshot loaded ...`
  - spaeter `hestia:items-updated` mit `source: "remote"`
- Realtime startet nur, wenn der Initial-Load erfolgreich war.
- Realtime-Ereignisse fuehren in `list-sync.js` zu einem debounced Reload des kompletten Remote-Snapshots.
- `app/main.js` ersetzt dann `state.items` direkt per `state.setItems(remoteSnapshot.items)`.
- Es gibt aktuell keinen expliziten Dirty-State-Schutz gegen eingehende Remote-Snapshots.
- Es gibt keine Echo-Erkennung jenseits des deterministischen Snapshot-Replaces.
- `Last write wins` ist faktisch der aktuelle Vertrag, aber im UI nicht als solcher sichtbar.

Aktueller Offline-/Reconnect-Stand:

- `app/main.js`, `writing.js` und `list-sync.js` nutzen aktuell keine expliziten `online`-/`offline`-Events und keinen `navigator.onLine`-Vertrag.
- Save-Fehler laufen ueber `listSync.saveSnapshot(...)` zurueck und landen im Writing-Status als Fehlertext.
- `list-sync.js` erkennt transiente Fetch-/Netzwerkfehler und retryt einzelne REST-Anfragen kurz.
- Es gibt keine Offline-Queue, kein Background Sync und kein automatisches Replay lokaler Aenderungen.
- Reconnect besitzt keinen eigenen Refetch- oder Resubscribe-Vertrag.
- Der Service Worker ist App-Shell-/Fallback-Schicht:
  - navigationsbezogen network-first
  - Runtime-Config network-first
  - Assets stale-while-revalidate
- `offline.html` sagt aktuell: "Sobald die Verbindung zurueck ist, synchronisiert sich die App wieder."
- Diese Copy ist fuer den heutigen V1-Vertrag wahrscheinlich zu stark, weil es kein garantiertes Auto-Replay lokaler Aenderungen gibt.

Touchlog-/Diagnose-Iststand:

- Touchlog dokumentiert Boot, PWA, Runtime-Config, Sync-Load, Realtime, Save-Gruende und Writing-/Shopping-Aktionen.
- Aktuelle hochwertige Sync-Ereignisse:
  - `[sync] config ...`
  - `[sync] remote snapshot loaded ...`
  - `[sync] remote snapshot failed ...`
  - `[sync] realtime subscribed`
  - `[sync] realtime refresh failed ...`
  - `[sync] remote update applied ...`
  - `[sync] save start/success/failed reason=...`
- Touchlog ist damit fuer S2/S3 ausreichend als Diagnosebasis; ein breiteres Diagnosepanel ist fuer Roadmap 2 nicht automatisch noetig.

Findings:

- S1-F1: Der Writing-Screen ist real noch formularig. Produkt, Menge, Einheit und Submit sind klar, aber das Produktfeld ist nicht sichtbar als Hauptaktion priorisiert.
- S1-F2: Add bleibt lokal bis `Liste speichern`; das entspricht dem Produktvertrag, braucht aber bessere Sprache, damit "lokal" und "gemeinsam" nicht verwechselt werden.
- S1-F3: Der hybride Sync-Vertrag ist real: Add manuell, Remove/Clear/Shopping direkt. Dieser Vertrag muss in S2 bewusst bestaetigt oder korrigiert werden, nicht nur aus dem aktuellen Code uebernommen werden.
- S1-F4: Der Status `Sync bereit.` ist technisch korrekt, aber produktsprachlich unklar. Fuer einen Haushalt ist nicht sofort klar, ob damit lokal, gemeinsam oder einfach nur konfiguriert gemeint ist.
- S1-F5: Remote-Snapshots ersetzen lokale Items aktuell direkt. Bei lokalem Dirty-State kann das still lokale Arbeit ueberschreiben oder zumindest mental verwirren.
- S1-F6: Realtime startet nur nach erfolgreichem Initial-Load. Es gibt keinen eigenen Reconnect-/Resubscribe-Vertrag.
- S1-F7: `offline.html` verspricht "synchronisiert sich die App wieder", obwohl V1 keine Queue und kein garantiertes Replay besitzt. Das ist eine Copy-/Vertragsabweichung.
- S1-F8: Save-Fehler werden sichtbar, aber die Copy kommt teils als technische Fehlernachricht aus dem REST-Layer. S3 muss klaeren, was im UI steht und was nur in Touchlog/Diagnose gehoert.
- S1-F9: Writing rendert Itemdaten per `innerHTML`; Roadmap 2 beruehrt die Listen-Darstellung ohnehin. S4 sollte pruefen, ob Writing wie Shopping auf DOM-Knoten mit `textContent` umgestellt wird, ohne daraus einen breiten Render-Refactor zu machen.
- S1-F10: Menge/Einheit werden roh angezeigt. Bei natuerlicher Mengenangabe im Produktnamen kann dadurch ein fachlicher Doppel- oder Widerspruchseindruck entstehen.
- S1-F11: Ungueltige Eingaben werden still ignoriert. Das ist simpel und bisher akzeptiert, kann aber beim Ziel "schnelles Schreiben" ein kleiner Vertrauensbruch sein, falls Nutzer nicht verstehen, warum nichts passiert.
- S1-F12: Offline/Reconnect haengt fachlich am finalen Snapshot-/Dirty-State-Vertrag. Codearbeit an Reconnect darf erst nach S2/S3 entschieden werden.

Korrekturen fuer Folgephasen:

- S2 muss den heutigen Hybrid-Vertrag explizit entscheiden:
  - Add lokal bis Save
  - Remove/Clear direkt shared
  - Shopping-Toggle/Finish direkt shared
- S2 muss festlegen, was bei Remote-Snapshot waehrend lokalem Dirty-State passieren soll.
- S2 muss entscheiden, ob `Sync bereit.` als Status bestehen bleibt, umbenannt oder unsichtbar wird.
- S2/S3 muessen den Offline-Text und das Offline-Versprechen korrigieren, falls V1 keine automatische gemeinsame Speicherung garantieren kann.
- S3 muss einen ruhigen Statuswortschatz definieren, der weniger technisch ist als der aktuelle Sync-Begriff.
- S3 muss definieren, welche technischen Fehlerdetails in die UI duerfen und welche in den Touchlog gehoeren.
- S3 muss pruefen, ob ungueltige Eingaben weiterhin still ignoriert werden duerfen oder eine sehr leise Validierungsreaktion brauchen.
- S4 sollte Writing-Listen-Rendering nur bei bestaetigtem Bedarf auf DOM-/`textContent`-Erzeugung umstellen.
- S4 darf `sw.js` nur anfassen, wenn S2/S3 einen echten Fallback-/Offline-Vertragsbedarf belegen; der wahrscheinlichere erste Eingriff liegt in `offline.html` und Status-Copy.
- S4 darf keinen Auto-Save, keine Queue, keine Push-Logik und keine Realtime-Collaboration einfuehren.

S1 Contract Review:

- Roadmap 2 bleibt nach S1 innerhalb des HESTIA-Produktvertrags.
- Keine Findings erfordern SQL-/RLS-/Schema-Aenderungen, neue Dependencies, Auth, Push, Einkaufsapps, Home-Dashboard oder Produktkatalog.
- Der Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` bleibt ausreichend und muss fuer S2 nicht erweitert werden.
- Die groessten Risiken sind Vertrags- und Copy-Risiken, nicht sofort Architekturumbau:
  - lokaler vs. gemeinsamer Stand
  - Remote-Snapshot waehrend Dirty-State
  - Offline-Fallback-Versprechen
  - technische Fehlerdetails in der UI
- Offline/Reconnect darf erst nach finalem Snapshot-/Dirty-State-Vertrag umgesetzt werden.
- Keine offenen P0/P1-Vertragsrisiken fuer den Start von S2.

S1 Abschluss:

- S1 ist abgeschlossen.
- Doku-Sync-Entscheidung: keine Module Overviews jetzt aendern; S6 synchronisiert nur real beschlossene und umgesetzte Verhaltensaenderungen.
- Commit-Empfehlung: noch kein separater Commit; sinnvoll zusammen mit S1/S2-Roadmap-Dokumentation oder spaeterer Umsetzung.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Zielidee gegen bestehende HESTIA-Vertraege pruefen.
- Finalen Zielvertrag fuer Writing, Snapshot-Sync, Offline/Reconnect und Listendarstellung festlegen.
- Klaeren, ob die Roadmap in Scope bleibt.

Substeps:

- S2.1 Ziel gegen README-/PRODUCT-Guardrails pruefen.
- S2.2 Ziel gegen Writing-, State-, Sync- und Bootflow-Overviews pruefen.
- S2.3 Entscheiden, welche Writing-Reibung tatsaechlich geloest wird.
- S2.4 V1-Snapshot-Sync-Vertrag finalisieren:
  - Add lokal bis bewusster Save
  - direkte Shared-Snapshot-Aktionen
  - `Last write wins`
  - Remote-Snapshot waehrend lokalem Dirty-State
- S2.5 V1-Offline-/Reconnect-Vertrag finalisieren:
  - welche Aktionen lokal weiter moeglich bleiben
  - Save-Fehler ohne Netz
  - Reconnect-Load oder Nutzerimpuls
  - Schutz vor stiller Ueberschreibung
- S2.6 Darstellungsvertrag fuer Menge/Einheit vs. natuerlichen Produktnamen festlegen.
- S2.7 Abgrenzung zu Roadmap 4, 5 und 6 dokumentieren.
- S2.8 Pflichtkorrekturen fuer S4 definieren.
- S2.9 Contract Review S2.
- S2.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Belastbarer Zielvertrag.
- Explizite Abgrenzung.
- Erste S4-Pflichtpunkte.

Exit-Kriterium:

- Umsetzung kann starten, ohne dass Grundsatzfragen offen sind.

### S2 Ergebnisprotokoll 11.05.2026

Durchgefuehrt:

- S1-Findings gegen README-/PRODUCT-Guardrails geprueft.
- Writing-, State-, Supabase-Sync-, Bootflow-, Runtime-, Touchlog- und QA-Vertraege gegengeprueft.
- Den bestehenden Hybrid-Snapshot-Vertrag fachlich bewertet.
- Dirty-State vs. eingehenden Remote-Snapshot bewertet.
- Offline-/Reconnect-Vertrag fuer V1 festgelegt.
- Darstellungsvertrag fuer Menge/Einheit vs. natuerlichen Produktnamen festgelegt.
- Roadmap 2 gegen Roadmap 4, Roadmap 5 und Roadmap 6 abgegrenzt.

Finaler Zielvertrag fuer Roadmap 2:

- Roadmap 2 ist eine Roadmap fuer Eingabe- und Listenvertrauen.
- Sie darf Writing leichter und schneller machen, aber nicht datenstrenger.
- Sie darf Sync- und Offline-Zustaende klaeren, aber keine Auto-Sync-, Queue- oder Collaboration-Architektur einfuehren.
- Sie darf Mengen-/Einheiten-Darstellung praesentativ glaetten, aber keine automatische Datenkorrektur oder Semantikpflicht einfuehren.
- Der Datenvertrag bleibt unveraendert:
  - `id`
  - `name`
  - `quantity`
  - `unit`
  - `inCart`

Writing-Vertrag:

- Das Produktfeld ist die Hauptaktion und darf visuell/ergonomisch staerker priorisiert werden.
- Menge und Einheit bleiben strukturierte Hilfsfelder, aber nicht das mentale Zentrum des Screens.
- Freitext bleibt immer erlaubt.
- Semantik bleibt Vorschlag und Unit-Hilfe, nicht Validierung.
- Ungueltige Eingaben duerfen weiterhin leichtgewichtig behandelt werden, sollten aber nicht voellig unsichtbar scheitern, falls S3 eine ruhige Copy/State-Loesung findet.
- `Item hinzufuegen` bleibt ein klarer Nutzerimpuls.
- Kein Auto-Save beim Tippen.

Snapshot-Sync-Vertrag:

- Der heutige Hybrid-Vertrag wird fuer V1 bewusst bestaetigt:
  - Add bleibt lokal bis zur bewussten Freigabe.
  - `manual-save` macht den aktuellen lokalen Stand gemeinsam.
  - `remove-item` schreibt den veraenderten Snapshot direkt gemeinsam.
  - `clear-list` schreibt den leeren Snapshot direkt gemeinsam.
  - `shopping-toggle` schreibt den Einkaufsstatus direkt gemeinsam.
  - `shopping-finish` schreibt den Abschluss-Snapshot direkt gemeinsam.
- Begruendung:
  - Add ist der bewusst vorbereitende Schreibmoment.
  - Loeschen, Leeren und Shopping-Aktionen sind bereits eindeutige Listenentscheidungen und sollen im Haushalt nicht versehentlich lokal stecken bleiben.
- `Last write wins` bleibt V1-Tradeoff.
- UI und Doku duerfen nicht behaupten, es gebe robuste Konfliktloesung.
- Realtime bleibt Snapshot-Refresh, nicht Roadmap 6 Realtime Shopping Collaboration.

Dirty-State- und Remote-Snapshot-Vertrag:

- Eingehende Remote-Snapshots duerfen lokale ungespeicherte Writing-Aenderungen nicht still ueberschreiben.
- Wenn lokal kein Dirty-State besteht, darf ein Remote-Snapshot weiter automatisch angewendet werden.
- Wenn lokal Dirty-State besteht, muss S3/S4 einen ruhigen V1-Umgang definieren und umsetzen:
  - lokale Arbeit bleibt sichtbar
  - Remote-Aenderung wird nicht still verworfen
  - keine Merge-UI, keine CRDTs, kein Konfliktdialog
  - Entscheidung bleibt klein: Nutzerimpuls oder sehr klare Status-/Refresh-Option
- S2 entscheidet noch keine finale Copy, aber die stille Ueberschreibung ist nicht mehr akzeptierter Zielzustand.

Status-/Save-Vertrag:

- Der Status soll in Produktsprache erklaeren, ob die Liste lokal oder gemeinsam ist.
- `Sync bereit.` ist als Zieltext nicht gut genug, weil er technisch klingt und keinen Haushaltszustand erklaert.
- Die finale Copy wird in S3 festgelegt.
- Die Statusfamilien stehen fachlich fest:
  - lokaler Modus ohne Sync-Konfiguration
  - lokal geaendert / noch nicht gemeinsam
  - gemeinsame Freigabe laeuft
  - gemeinsam gespeichert
  - gemeinsame Freigabe fehlgeschlagen
  - Remote-Aenderung vorhanden, falls Dirty-State-Schutz dies braucht
- Technische REST-Fehlerdetails gehoeren primaer in Touchlog/Diagnose; die Alltagsoberflaeche braucht kurze, handlungsnahe Copy.

Offline-/Reconnect-Vertrag:

- HESTIA bleibt offline lokal benutzbar, soweit App-Shell und lokaler State vorhanden sind.
- Ohne Netz kann HESTIA keine gemeinsame Speicherung garantieren.
- Es gibt in Roadmap 2 keine Offline-Queue, kein Background Sync und kein automatisches Replay.
- Save ohne Netz darf lokale Arbeit nicht verlieren, muss aber ehrlich als nicht gemeinsam gespeichert erscheinen.
- Reconnect darf lokale Dirty-Arbeit nicht still mit einem Remote-Snapshot ueberschreiben.
- Ein Remote-Refetch nach Reconnect ist nur akzeptabel, wenn er denselben Dirty-State-Schutz respektiert.
- Realtime-Recovery darf verbessert werden, falls S3/S4 einen engen Bedarf belegt, aber sie bleibt Snapshot-Refresh und kein Collaboration-System.
- `offline.html` muss wahrscheinlich in S4 korrigiert werden, weil die aktuelle Formulierung "synchronisiert sich die App wieder" zu viel verspricht.

Listendarstellungs-Vertrag:

- Mengen-/Einheiten-Glaettung ist reine Praesentation.
- Gespeicherte Itemdaten werden nicht automatisch umgeschrieben.
- Keine Natural-Language-Parsing-Engine.
- Kein Produktkatalog.
- Kein Versuch, perfekte Mengenlogik zu erraten.
- S4 darf eine konservative Anzeigeentscheidung einfuehren, wenn S3 die Regel bestaetigt:
  - strukturierte Menge/Einheit weiterhin anzeigen, wenn sie erkennbar absichtlich gesetzt wurde
  - Default-Meta wie `1 stk` praesentativ zuruecknehmen oder ausblenden, wenn der Produktname selbst bereits eine starke Mengen-/Einheitenangabe enthaelt
  - im Zweifel anzeigen statt mutmasslich korrigieren

Abgrenzung zu spaeteren Roadmaps:

- Roadmap 4:
  - keine Einkaufsapps
  - kein Shopping-Companion
  - keine Flaechennutzung im Einkaufsmodus
- Roadmap 5:
  - kein Push
  - keine Notification-Berechtigungen
  - kein Delivery-Pfad
- Roadmap 6:
  - keine robuste parallele Einkaufskoordination
  - keine Presence, keine Kollaborationskonflikte, keine Multi-User-Abschlussregeln

Findings:

- S2-F1: Der heutige Hybrid-Vertrag ist fachlich sinnvoll, aber muss durch Statussprache besser erklaert werden. Sonst bleibt "lokal vs. gemeinsam" mental unscharf.
- S2-F2: Dirty-State ist der zentrale technische Risikopunkt. Ohne Schutz kann Realtime lokale Schreibarbeit still ersetzen.
- S2-F3: Offline/Reconnect ist ohne Dirty-State-Schutz nicht sauber loesbar. Reconnect darf daher erst nach dem Dirty-State-Vertrag in S3/S4 umgesetzt werden.
- S2-F4: `offline.html` ist ein konkreter Copy-Finding-Kandidat, weil die Seite derzeit Auto-Sync suggeriert.
- S2-F5: Eine zu ausfuehrliche Statuszeile wuerde HESTIA lauter machen. S3 muss kurze Alltags-Copy gegen Touchlog-Details trennen.
- S2-F6: Listen-Darstellung darf nur konservativ praesentativ arbeiten; jede automatische Datenkorrektur waere Scope-Drift.
- S2-F7: Ungueltige Eingaben sind kein Architekturproblem, aber eine moegliche kleine UX-Reibung. S3 soll klaeren, ob eine leise Validierung noetig ist.
- S2-F8: Realtime-Start nur nach erfolgreichem Initial-Load ist fuer V1 akzeptabel, aber Reconnect-/Recovery-Verhalten muss als Grenze dokumentiert oder eng verbessert werden.

Korrekturen fuer Folgephasen:

- S3 muss einen finalen Statuswortschatz definieren, der `Sync bereit.` ersetzt oder bewusst entfernt.
- S3 muss den Dirty-State-Vertrag in konkrete UI-/Code-Regeln uebersetzen:
  - wann remote automatisch angewendet wird
  - wann remote gehalten/markiert wird
  - welchen Nutzerimpuls es gibt, falls noetig
- S3 muss eine kurze Offline-/Reconnect-Copy definieren, inklusive Korrekturziel fuer `offline.html`.
- S3 muss bestimmen, welche Fehlerdetails in UI vs. Touchlog gehoeren.
- S3 muss eine konservative Anzeigeregel fuer Menge/Einheit festlegen.
- S3 muss entscheiden, ob ungueltige Eingaben weiterhin still ignoriert werden oder eine ruhige Inline-Reaktion bekommen.
- S4.3 darf erst nach S3-Copy-Vertrag umgesetzt werden.
- S4.4 darf erst nach finalem Dirty-State-/Reconnect-Vertrag umgesetzt werden.
- S4 darf `sw.js` nur anfassen, wenn konkrete S3-Findings es verlangen; Stand jetzt ist `offline.html` wahrscheinlicher als Service-Worker-Code.

S2 Contract Review:

- Roadmap 2 bleibt innerhalb des HESTIA-Produktvertrags.
- Die drei HESTIA-Prueffragen sind erfuellt:
  - Sie hilft dem gemeinsamen Einkaufsfluss, weil Schreiben und Freigabe verstaendlicher werden.
  - Sie macht Schreiben/Speichern klarer, ohne den Einkaufskern zu erweitern.
  - Sie reduziert Abstimmung, indem lokale und gemeinsame Wahrheit ehrlicher werden.
- Keine S2-Entscheidung verletzt den stabilen Datenvertrag.
- Keine S2-Entscheidung erfordert SQL/RLS/Supabase-Schema, neue Dependencies, Auth, Push oder Produktkatalog.
- Der bestaetigte Hybrid-Snapshot-Vertrag bleibt klein genug fuer HESTIA V1.
- Die groesste S3-Pflicht ist Dirty-State-/Remote-Snapshot-Schutz; ohne diesen Schutz waere Roadmap 2 fachlich unvollstaendig.
- Keine offenen P0/P1-Vertragsrisiken fuer S3.

S2 Abschluss:

- S2 ist abgeschlossen.
- Doku-Sync-Entscheidung: keine Module Overviews jetzt aendern; S6 synchronisiert nur die final umgesetzten Vertraege.
- Commit-Empfehlung: noch kein separater Commit; sinnvoll zusammen mit Roadmap-S2/S3-Dokumentation oder spaeterer Umsetzung.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Risiken finden, bevor Code geaendert wird.
- User-Facing-Texte und Statusmeldungen gegen Produktrealitaet pruefen.
- Konkrete S4-Substeps ableiten.

Substeps:

- S3.1 Bruchrisiken identifizieren:
  - falsche Sicherheit bei lokalem Stand
  - falscher Alarm bei normalem Save-/Load-Zustand
  - Dirty-State vs. Remote-Snapshot
  - doppelte Realtime-Subscriptions
  - Reconnect-Load ueberschreibt lokale Arbeit
  - mobile Layout-Probleme im Writing-Flow
  - Doku-/Code-Drift
- S3.2 User-Facing Copy Review:
  - Statusmeldungen duerfen keinen normalen Zustand wie Fehler klingen lassen.
  - Unsichere Zustaende duerfen nicht wie bestaetigt gemeinsam gespeichert klingen.
  - Technische Details gehoeren eher in Touchlog/Diagnose als in die Alltagsoberflaeche.
  - Buttons und Statusbegriffe muessen zur Haushaltsfreigabe passen.
- S3.3 UI-Vertrag fuer Writing definieren:
  - Hauptfeld, Menge/Einheit, Submit, Save und offene Liste
  - Fokus-, Tastatur- und Mobile-Verhalten
  - keine Textueberlaeufe oder unruhige Umbrueche
- S3.4 Tooling und lokal moegliche Checks klaeren.
- S3.5 S4-Substeps konkretisieren.
- S3.6 Contract Review S3.
- S3.7 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Bruchrisiko-Liste.
- Copy-/Status-Vertrag.
- Konkreter Umsetzungsplan fuer S4.

Exit-Kriterium:

- S4 hat klare Substeps und bekannte Review-Kriterien.

### S3 Ergebnisprotokoll 11.05.2026

Durchgefuehrt:

- S1- und S2-Findings gegen Bruchrisiko, UI, Copy und Umsetzbarkeit geprueft.
- User-facing Copy-Vertrag fuer Writing-/Save-/Offline-Zustaende finalisiert.
- Dirty-State-/Remote-Snapshot-Regeln fuer V1 konkretisiert.
- Offline-/Reconnect-Verhalten in UI- und Codepflichten uebersetzt.
- Darstellungsvertrag fuer Menge/Einheit konkretisiert.
- Writing-UI-Vertrag fuer S4 eingegrenzt.
- S4-Substeps und Review-Kriterien finalisiert.

Bruchrisiken:

- S3-R1: Lokaler Dirty-State kann durch Remote-Snapshot still ersetzt werden.
  - Risiko: Nutzer schreibt etwas, ein anderer Snapshot kommt rein, lokale Arbeit verschwindet oder wirkt unerklaert anders.
  - Pflicht: S4 muss Remote-Anwendung gegen Dirty-State absichern.
- S3-R2: Status-Copy kann falsche Sicherheit erzeugen.
  - Risiko: Nutzer glaubt, die Liste sei gemeinsam, obwohl sie nur lokal ist.
  - Pflicht: Alltagsstatus muss lokale und gemeinsame Wahrheit klar trennen.
- S3-R3: Status-Copy kann zu laut werden.
  - Risiko: HESTIA fuehlt sich wie Sync-Konsole statt Haushaltstool an.
  - Pflicht: UI kurz und handlungsnah; technische Details in Touchlog.
- S3-R4: Offline-Fallback verspricht aktuell zu viel.
  - Risiko: "synchronisiert sich wieder" klingt wie Queue/Replay.
  - Pflicht: `offline.html` muss ehrlicher formuliert werden, falls S4 Offline-Copy anfasst.
- S3-R5: Reconnect-Refetch ohne Dirty-State-Schutz kann lokale Arbeit ueberschreiben.
  - Risiko: genau der gleiche Verlustpfad wie Realtime, nur durch Netzwerkwechsel.
  - Pflicht: kein Reconnect-Auto-Load ohne denselben Schutz.
- S3-R6: Writing-Ergonomie kann in Redesign kippen.
  - Risiko: zu grosser UI-Umbau statt gezielter Reibungsabbau.
  - Pflicht: S4.1 bleibt bei Hierarchie, Fokus, Feldgewichtung und kleinen Layoutverbesserungen.
- S3-R7: Mengen-/Einheiten-Glaettung kann Datenlogik vortaeuschen.
  - Risiko: Nutzer denkt, HESTIA habe Mengen verstanden oder korrigiert.
  - Pflicht: reine Praesentation; Daten bleiben unveraendert.
- S3-R8: Writing-Rendering per `innerHTML` bleibt bei Darstellungsarbeit ein vermeidbares Risiko.
  - Risiko: Itemdaten werden weiter als HTML interpoliert.
  - Pflicht: Wenn S4.2 die Listenzeile anfasst, DOM-/`textContent`-Rendering verwenden.

Finaler User-Facing-Copy-Vertrag:

- Die UI spricht nicht primaer von "Sync", sondern von gemeinsamem Listenstand.
- Technische Begriffe wie REST, Snapshot, Realtime, HTTP oder Request-ID gehoeren nicht in die Alltagsoberflaeche.
- Touchlog darf technische Details behalten.
- Statusmeldungen bleiben kurz.
- Kein normaler Zwischenzustand darf wie ein Fehler wirken.
- Kein unsicherer Zustand darf wie erfolgreich gemeinsam gespeichert wirken.

Finale Statusfamilien fuer S4:

- Ohne Supabase-Konfiguration:
  - Bedeutung: nur dieses Geraet.
  - Ziel-Copy: `Nur auf diesem Geraet.`
- Lokale Aenderung, noch nicht gemeinsam:
  - Bedeutung: Nutzer muss bewusst freigeben.
  - Ziel-Copy: `Noch nicht fuer den Haushalt freigegeben.`
- Gemeinsame Freigabe laeuft:
  - Bedeutung: Save laeuft.
  - Ziel-Copy: `Gebe Liste frei ...`
- Gemeinsam gespeichert:
  - Bedeutung: Shared Snapshot erfolgreich geschrieben oder Remote-Stand sichtbar.
  - Ziel-Copy: `Fuer den Haushalt freigegeben um HH:MM.`
- Fehler bei gemeinsamer Freigabe:
  - Bedeutung: lokal bleibt erhalten, remote nicht garantiert.
  - Ziel-Copy: `Freigabe nicht moeglich. Liste bleibt lokal.`
- Remote-Aenderung waehrend lokalem Dirty-State:
  - Bedeutung: anderer Stand vorhanden, lokale Arbeit schuetzen.
  - Ziel-Copy: `Anderer Listenstand verfuegbar. Erst lokale Aenderungen freigeben oder verwerfen.`

Copy-Korrekturen:

- `Sync bereit.` soll nicht als Zieltext bestehen bleiben.
- `Nicht gespeichert.` ist zu knapp und kann technisch wirken; bessere Richtung ist `Noch nicht fuer den Haushalt freigegeben.`
- `Nur lokal gespeichert.` ist verstaendlich, aber `Nur auf diesem Geraet.` ist direkter.
- `Speichere Liste ...` wird zu `Gebe Liste frei ...`, weil die Handlung fachlich Haushaltsfreigabe ist.
- REST-/Supabase-Fehlerdetails duerfen im Status nicht dominieren. Der konkrete technische Fehler bleibt im Touchlog.

Dirty-State-/Remote-Snapshot-Vertrag fuer S4:

- Es braucht einen expliziten lokalen Dirty-State im Writing-/Sync-Vertrag.
- Lokale Dirty-Ursachen:
  - Add ohne anschliessenden `manual-save`
  - optional weitere lokale Writing-Aenderungen, falls S4 sie nicht sofort shared speichert
- Direkte Shared-Aktionen wie `remove-item`, `clear-list`, `shopping-toggle` und `shopping-finish` duerfen Dirty-State nach erfolgreichem Shared Save wieder aufloesen.
- Remote-Snapshot ohne Dirty-State:
  - darf automatisch angewendet werden.
  - Status wird auf gemeinsam sichtbar gesetzt.
- Remote-Snapshot mit Dirty-State:
  - darf lokale Items nicht automatisch ersetzen.
  - wird als pending remote change markiert.
  - UI zeigt ruhigen Hinweis.
  - S4 soll eine kleine explizite Nutzerentscheidung pruefen:
    - lokale Aenderungen freigeben
    - Remote-Stand uebernehmen / lokale Aenderungen verwerfen
  - kein Merge, kein Konfliktdialog, kein CRDT.
- Wenn S4 eine explizite Uebernehmen-Aktion einbaut, muss sie klar destruktiv fuer lokale ungespeicherte Aenderungen sein.

Offline-/Reconnect-Vertrag fuer S4:

- Offline ist kein eigener Produktmodus.
- Lokale Arbeit bleibt moeglich, wenn die App geladen ist.
- Gemeinsame Freigabe kann offline fehlschlagen.
- Fehler-Copy muss sagen, dass die Liste lokal bleibt.
- Keine Queue und kein automatisches Nachsenden.
- Reconnect darf nicht automatisch Dirty-State ueberschreiben.
- Reconnect-Verbesserungen sind optionaler S4.4-Codebedarf:
  - nur wenn sie klein bleiben
  - nur mit Dirty-State-Schutz
  - keine Service-Worker-Orchestrierung
- `offline.html` bekommt eine ehrlichere Copy:
  - App-Inhalte bleiben ggf. verfuegbar.
  - gemeinsame Freigabe braucht wieder Verbindung.
  - kein automatisches Sync-Versprechen.

Writing-UI-Vertrag fuer S4:

- Produktfeld wird als Hauptfeld staerker gewichtet.
- Menge/Einheit bleiben sichtbar und erreichbar, aber sekundar.
- `Item hinzufuegen` bleibt klare Add-Aktion.
- `Liste speichern` darf in Richtung Haushaltsfreigabe umbenannt werden, falls S4 dies konsistent mit Status-Copy loest.
- Save-/Freigabe-Aktion muss nicht zu Auto-Save werden.
- Keine neue Hauptnavigation, kein Home-Umbau, kein Dashboard.
- Mobile:
  - Produktfeld, Add-Button und Freigabe muessen ohne Ueberlappung bleiben.
  - Menge/Einheit duerfen bei kleinem Viewport untereinander bleiben.
  - Status darf nicht zu lang werden oder die Aktionszeile sprengen.

Listendarstellungs-Vertrag fuer S4:

- Ziel ist weniger Stolpern, nicht perfekte semantische Auswertung.
- S4 darf eine kleine Darstellungsfunktion einfuehren, z. B. `formatItemMeta(item)`.
- Die Funktion darf nur entscheiden, was angezeigt wird, nicht was gespeichert wird.
- Konservative Regel fuer V1:
  - Wenn Menge/Einheit Default wirken (`1` + `stk`/`Stk`) und der Name bereits eine erkennbare Mengen-/Einheitenangabe enthaelt, darf die Meta-Anzeige leer oder deutlich zurueckgenommen werden.
  - Erkennbare Hinweise sind einfache Muster wie Zahl plus Einheit/Wort:
    - `24 Stueck`
    - `2 kg`
    - `500 g`
    - `1 l`
    - `3 Packungen`
  - Wenn Menge oder Einheit bewusst vom Default abweicht, wird Meta angezeigt.
  - Im Zweifel wird Meta angezeigt.
- Keine automatische Aenderung von `quantity` oder `unit`.

Validierungs-Vertrag:

- Ungueltige Eingaben duerfen nicht laut werden.
- Eine leise Inline-Reaktion ist erlaubt, falls S4.1 sie klein halten kann.
- Kein Dialog, kein Toast-System, kein neues Fehlerframework.
- Minimal akzeptabel:
  - Fokus im Produktfeld lassen
  - kurzer Status/Hinweis am Formular
  - keine kaputten Items erzeugen

S4-Pflichtpunkte:

- S4.1 Writing-Ergonomie:
  - Produktfeld priorisieren.
  - Menge/Einheit visuell sekundar fuehren.
  - Add-/Freigabe-Hierarchie klaeren.
  - Leise Validierung pruefen.
- S4.2 Listen-Darstellung:
  - Writing-Zeilen bei Beruehrung auf DOM-/`textContent`-Rendering umstellen.
  - konservative `formatItemMeta`-Regel fuer Writing und Shopping pruefen.
  - Datenvertrag unveraendert lassen.
- S4.3 Snapshot-Sync-/Save-Status:
  - Status-Copy gemaess S3 umsetzen.
  - technische Fehlerdetails in Touchlog lassen.
  - Save-/Freigabe-Button-Copy konsistent pruefen.
- S4.4 Dirty-State, Remote-Snapshot und Offline/Reconnect:
  - Dirty-State-Schutz fuer Remote-Snapshots implementieren.
  - Pending-Remote-Zustand klein halten.
  - Offline-Fallback-Copy korrigieren.
  - Reconnect-Code nur bei kleinem belegtem Bedarf.
- S4.5 Styles:
  - Writing-Styles in `writing.css`.
  - globale Status-/Buttonmuster in `ui.css`.
  - Shopping nur bei gemeinsamem Meta-Format oder Status-Anzeige.

Findings:

- S3-F1: Die Statusfamilien brauchen neue Produkt-Copy; die alte Sync-Sprache ist nicht gut genug fuer Roadmap 2.
- S3-F2: Dirty-State-Schutz ist Pflicht fuer S4.4, sonst bleibt der zentrale Vertrauensbruch bestehen.
- S3-F3: Pending Remote darf nicht zu einem grossen Konfliktdialog werden; die Loesung muss klein und bewusst V1 bleiben.
- S3-F4: `offline.html` muss korrigiert werden, wenn Roadmap 2 den Offline-Vertrag ernst nimmt.
- S3-F5: Technische Fehlerdetails im UI wuerden HESTIA lauter machen; UI braucht kurze Copy, Touchlog die Details.
- S3-F6: Eine Umbenennung von `Liste speichern` in Richtung `Liste freigeben` ist fachlich plausibel, muss aber in S4 gegen Alltagston und Platz geprueft werden.
- S3-F7: Mengen-/Einheiten-Glaettung ist riskant, wenn sie zu schlau wird. Die konservative Default-Meta-Regel ist die Grenze.
- S3-F8: Writing-Rendering per `innerHTML` sollte im Zuge der Darstellungsarbeit korrigiert werden, aber nicht als repo-weiter Render-Refactor.

Korrekturen fuer S4:

- S4.1 muss keine komplette Writing-Neugestaltung bauen; nur Hierarchie, Fokus und leichte Validierung.
- S4.2 muss zuerst eine kleine gemeinsame Display-Hilfe pruefen, bevor Writing und Shopping getrennt angepasst werden.
- S4.3 muss die Status-Copy aus S3 uebernehmen und `Sync bereit.` entfernen oder unsichtbar machen.
- S4.4 muss Dirty-State-Schutz vor Reconnect-Automatik priorisieren.
- S4.4 soll `offline.html` Copy korrigieren, aber `sw.js` nur bei belegtem technischen Bedarf anfassen.
- S4.6/S4.7 muessen explizit gegen Auto-Save, Queue, Push, Realtime-Collaboration und Datenvertragswechsel reviewen.

S3 Contract Review:

- Roadmap 2 bleibt nach S3 innerhalb des HESTIA-Produktvertrags.
- Die geplante S4-Arbeit hilft dem gemeinsamen Einkaufsfluss, weil Schreiben und Freigabe klarer werden.
- Die geplante S4-Arbeit macht HESTIA nicht zu einem Organizer, Produktkatalog oder Collaboration-Tool.
- Der Datenvertrag bleibt stabil.
- Es gibt keine Pflicht fuer SQL/RLS/Supabase-Schema, neue Dependencies, Auth oder Service-Worker-Orchestrierung.
- Dirty-State-Schutz ist die einzige fachlich zwingende technische Haertung; alles andere bleibt klein und vertragsabhaengig.
- Keine offenen P0/P1-Vertragsrisiken fuer den Start von S4.

S3 Abschluss:

- S3 ist abgeschlossen.
- Doku-Sync-Entscheidung: keine Module Overviews jetzt aendern; S6 synchronisiert finalen Code-/Copy-/QA-Stand.
- Commit-Empfehlung: noch kein separater Commit; sinnvoll zusammen mit S4-Umsetzung oder finaler Roadmap-2-Arbeit.

## S4 - Umsetzung

Ziel:

- Den finalen S2/S3-Vertrag sequenziell im Repo umsetzen.
- Nicht alle Schichten gleichzeitig aendern.
- Nach jedem Substep direkt pruefen und dokumentieren.

Substeps:

- S4.1 Writing-Ergonomie gemaess Vertrag anpassen:
  - Produktfeld als Hauptaktion staerken
  - Menge/Einheit dezenter oder schneller fuehren, falls beschlossen
  - Submit-/Save-Hierarchie klaeren
- S4.2 Listen-Darstellung fachlich glaetten:
  - Menge/Einheit-Anzeige gegen natuerliche Produktnamen pruefen
  - Widersprueche reduzieren, ohne Datenvertrag oder Semantikpflicht zu aendern
- S4.3 Snapshot-Sync- und Save-Status umsetzen:
  - Statuswortschatz
  - Save-Erfolg/-Fehler
  - Remote-Snapshot-Refresh
  - Touchlog-/Diagnose nur soweit noetig
- S4.4 Offline-/Reconnect-Vertrag umsetzen, falls S2/S3 ihn als Codebedarf bestaetigen:
  - Save ohne Netz
  - Reconnect-Refetch oder Nutzerimpuls
  - Schutz gegen doppelte Subscriptions
  - Service Worker/Fallback nur bei belegtem Bedarf
- S4.5 Styles und UI-Hierarchie in bestehenden Owner-Dateien nachziehen.
- S4.6 Laufender Code- und Contract Review.
- S4.7 Findings korrigieren und Schritt-Abnahme.

Jeder S4-Substep dokumentiert:

- Umsetzung
- betroffene Dateien
- lokaler Check
- Contract Review
- Findings
- Korrekturen
- Restrisiken

Output:

- Repo-Verhalten entspricht dem finalen Writing-, Sync-, Offline- und Listenvertrauensvertrag.

Exit-Kriterium:

- Alle priorisierten Findings aus S1-S3 sind umgesetzt oder bewusst abgegrenzt.

### S4.1 Ergebnisprotokoll 11.05.2026

Umsetzung:

- Produktfeld im Schreiben-Formular als klare Hauptaktion hervorgehoben.
- Menge und Einheit als sekundaere Unterstuetzungsfelder belassen, aber visuell ruhiger gefuehrt.
- Native Browser-Validierung durch kleine eigene Inline-Validierung ersetzt, damit Fehler ruhig und HESTIA-typisch bleiben.
- Add-Button als breite, eindeutige Schreibaktion gestaerkt.
- Save-/Freigabe-Hierarchie bewusst nicht in S4.1 veraendert, weil Status- und Save-Copy laut Vertrag in S4.3 zusammen behandelt werden.

Betroffene Dateien:

- `index.html`
- `app/modules/writing.js`
- `app/styles/writing.css`
- `docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md`

Lokaler Check:

- `node --check app/modules/writing.js`
- `git diff --check -- index.html app/modules/writing.js app/styles/writing.css "docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md"`

Code Review:

- Die Aenderung bleibt im Writing-Owner-Bereich und veraendert weder State-Schema noch Sync-Modus.
- `store.addItem` erhaelt weiterhin nur `name`, `quantity`, `unit` und setzt `inCart` wie bisher im State-Layer.
- Semantik-/Unit-Inferenz bleibt optional und unveraendert.
- Inline-Validierung setzt nur Feldzustand, Text und Fokus; sie fuehrt keine neue Persistenz- oder Sync-Logik ein.

Contract Review:

- S4.1 erfuellt den S3-Vertrag "Hierarchie, Fokus und leichte Validierung".
- Kein Auto-Save, keine Queue, keine Push-Logik, keine Realtime-Collaboration.
- Kein Produktkatalog, keine Semantikpflicht, keine automatische Datenkorrektur.
- Menge/Einheit bleiben sichtbar und nutzbar, werden aber nicht zur dominanten Reibung.

Findings und Korrekturen:

- S4.1-F1: Erste Validierungsfassung haette eine Mengen-Fehlermeldung beim Tippen im Produktfeld zu frueh ausblenden koennen.
  - Korrektur: Feldspezifisches Clearing eingefuehrt; eine Meldung verschwindet erst, wenn kein Feld mehr als invalid markiert ist.
- S4.1-F2: Die neue Inline-Notiz war sichtbar, aber noch nicht explizit mit den betroffenen Feldern verbunden.
  - Korrektur: Produkt- und Mengenfeld referenzieren die Notiz per `aria-describedby`.

Restrisiko:

- Browser-/Mobile-Smoke folgt in S5 beziehungsweise bei spaeteren S4-Substeps, weil S4.1 lokal nur statisch und per JS-Syntaxcheck geprueft wurde.

### S4.2 Ergebnisprotokoll 11.05.2026

Umsetzung:

- Gemeinsame reine Anzeigehilfe `formatItemMeta(item)` eingefuehrt.
- Writing-Listenzeilen von Item-`innerHTML` auf DOM-Knoten mit `textContent` umgestellt.
- Shopping nutzt dieselbe Meta-Anzeigehilfe wie Writing.
- Konservative V1-Regel umgesetzt:
  - Wenn `quantity` `1` ist, `unit` wie ein Stueck-Default wirkt und der Name bereits eine einfache Mengenangabe enthaelt, wird die Meta-Anzeige ausgelassen.
  - Wenn Menge oder Einheit abweichen oder der Fall unklar ist, bleibt die Meta-Anzeige sichtbar.
- Keine gespeicherten Itemdaten werden veraendert.

Betroffene Dateien:

- `app/core/item-display.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md`

Lokaler Check:

- `node --check app/core/item-display.js`
- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `node --input-type=module -e "import('./app/core/item-display.js').then(...)"` fuer representative Formatfaelle
- `rg -n "[^\\x00-\\x7F]" app/core/item-display.js app/modules/writing.js app/modules/shopping.js`

Code Review:

- Die neue Helper-Funktion ist praesentativ und hat keine Nebenwirkungen.
- `formatItemMeta(item)` schreibt nicht in `store`, normalisiert keine gespeicherten Daten und veraendert den Item-Contract nicht.
- Writing-Rendering interpoliert Itemdaten nicht mehr per `innerHTML`.
- Shopping bleibt bei DOM-/`textContent`-Rendering und uebernimmt nur die gemeinsame Meta-Entscheidung.

Contract Review:

- S4.2 erfuellt den Darstellungsvertrag: weniger Stolpern, keine semantische Auswertung als Produktlogik.
- Default-Meta wird nur bei klaren Mengenhinweisen im Namen ausgeblendet.
- Im Zweifel bleibt Meta sichtbar.
- Kein Produktkatalog, kein Parser-Ausbau, keine automatische Korrektur von `quantity` oder `unit`.

Findings und Korrekturen:

- S4.2-F1: Die erste Helper-Fassung enthielt ein direktes Umlautzeichen in einer neuen JS-Datei.
  - Korrektur: Unterstuetzung fuer Stueck-Varianten bleibt erhalten, aber die Datei bleibt ASCII ueber Escape-Schreibweise.
- S4.2-F2: `Stk.` waere nicht als Default-Stueck-Meta erkannt worden.
  - Korrektur: Einheitenvergleich entfernt abschliessende Punkte vor dem Vergleich.

Restrisiko:

- Die Regel ist bewusst konservativ. Einzelne natuerliche Produktnamen koennen weiterhin Meta anzeigen, wenn sie nicht in die einfachen Muster fallen.
- Browser-/Mobile-Smoke folgt in S5 beziehungsweise bei spaeteren S4-Substeps.

### S4.3 Ergebnisprotokoll 11.05.2026

Umsetzung:

- User-facing Writing-Status vom technischen Sync-Wortschatz auf Haushaltsfreigabe umgestellt.
- Initialer lokaler Status lautet `Nur auf diesem Geraet.`
- Lokale, noch nicht freigegebene Aenderungen zeigen `Noch nicht fuer den Haushalt freigegeben.`
- Laufende Freigabe zeigt `Gebe Liste frei ...`
- Erfolgreiche gemeinsame Freigabe zeigt `Fuer den Haushalt freigegeben um HH:MM.`
- Fehler bei gemeinsamer Freigabe zeigen generisch `Freigabe nicht moeglich. Liste bleibt lokal.`
- Der leere konfigurierte Idle-Zustand zeigt keine technische Statuszeile mehr; `Sync bereit.` ist aus der produktiven UI entfernt.
- Button-Copy von `Liste speichern` auf `Liste freigeben` umgestellt.
- Technische Save-Fehlerdetails bleiben im Touchlog und dominieren nicht mehr die Alltagsoberflaeche.

Betroffene Dateien:

- `index.html`
- `app/modules/writing.js`
- `docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md`

Lokaler Check:

- `node --check app/modules/writing.js`
- `rg -n "lastError|Sync bereit|Nicht gespeichert|Nur lokal gespeichert|Speichere Liste|Sync fehlgeschlagen|Gespeichert um|Liste speichern" index.html app/modules/writing.js app/modules/shopping.js app/styles`

Code Review:

- S4.3 aendert nur sichtbare Copy und Statusdarstellung im Writing-Modul.
- `persistSharedState(...)`, `listSync.saveSnapshot(...)`, Eventfluss und gespeicherter Item-Contract bleiben unveraendert.
- Touchlog speichert technische Fehlerdetails weiterhin ueber den bestehenden `[sync] save failed ...` Eintrag.
- Shopping bleibt unveraendert, weil S4.3 keine neue Shopping-Statusflaeche einfuehrt.

Contract Review:

- S4.3 erfuellt den finalen Statusfamilien-Vertrag aus S3.
- `Sync bereit.` besteht nicht mehr als Zieltext in der produktiven UI.
- Fehlerstatus erzeugt keine falsche Sicherheit: die Copy sagt, dass die Liste lokal bleibt.
- Status-Copy bleibt kurz und fuehrt keine Diagnoseoberflaeche ein.
- Kein Auto-Save, keine Queue, kein Retry, keine Push-Logik und keine Realtime-Collaboration.

Findings und Korrekturen:

- S4.3-F1: Nach der UI-Enttechnisierung war `lastError` im Writing-Modul nur noch totes internes Feld.
  - Korrektur: `lastError` entfernt; technische Fehlerdetails bleiben ausschliesslich im Touchlog.

Restrisiko:

- S4.3 verbessert Sprache und Erwartung, schuetzt aber noch nicht gegen Remote-Snapshots bei lokalem Dirty-State. Dieser technische Schutz bleibt bewusst S4.4.
- Browser-/Mobile-Smoke folgt in S5 beziehungsweise bei spaeteren S4-Substeps.

### S4.4 Ergebnisprotokoll 11.05.2026

Umsetzung:

- Expliziter lokaler Dirty-State im Boot-/Remote-Snapshot-Vertrag eingefuehrt.
- Eingehende Remote-Snapshots werden bei lokalen Aenderungen nicht mehr direkt in den Store geschrieben.
- Remote-Snapshot waehrend Dirty-State wird als pending Remote gehalten.
- Writing zeigt bei pending Remote den ruhigen Hinweis `Anderer Listenstand verfuegbar. Erst lokale Aenderungen freigeben oder verwerfen.`
- `Liste freigeben` bleibt der Weg, lokale Aenderungen bewusst als neuen Haushaltsstand zu schreiben.
- `Anderen Stand uebernehmen` bietet die bewusste destruktive V1-Entscheidung, lokale Aenderungen zugunsten des Remote-Stands zu verwerfen.
- Erfolgreiche Remote-Anwendung oder erfolgreiche Freigabe loesen pending Remote und lokalen Dirty-State wieder auf.
- `offline.html` verspricht kein automatisches Wieder-Synchronisieren mehr.
- Kein Reconnect-Refetch-Code eingefuehrt, weil ein automatischer Refetch ohne weitergehende Architektur keinen zusaetzlichen sicheren Nutzen bringt.
- `sw.js` unveraendert gelassen, weil der belegte Bedarf eine Copy-Korrektur in `offline.html` war.

Betroffene Dateien:

- `index.html`
- `app/main.js`
- `app/modules/writing.js`
- `app/styles/ui.css`
- `offline.html`
- `docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md`

Lokaler Check:

- `node --check app/main.js`
- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `node --check app/core/item-display.js`
- `rg -n "pendingRemoteSnapshot|hasLocalDirtyState|hasPendingRemote|pending-remote|remote-apply|Anderer Listenstand|Anderen Stand|Nur auf diesem|Gemeinsame Freigabe|synchronisiert sich" app/main.js app/modules/writing.js index.html app/styles/ui.css offline.html`

Code Review:

- Remote-Snapshots werden nur dann automatisch angewendet, wenn kein lokaler Dirty-State bekannt ist.
- Bei Dirty-State bleibt der lokale Store unveraendert; der Remote-Stand wird nur zwischengespeichert.
- Die destruktive Remote-Uebernahme laeuft ueber ein explizites UI-Ereignis `hestia:remote-apply-request`.
- Der bestehende Snapshot-Save bleibt unveraendert; es gibt keinen Merge, keinen Retry-Client und keine Queue.
- Direct shared actions koennen den Dirty-State ueber erfolgreiche bestehende Remote-Events wieder aufloesen.

Contract Review:

- S4.4 erfuellt die Pflicht, lokale ungespeicherte Writing-Arbeit vor stiller Remote-Ueberschreibung zu schuetzen.
- Die Loesung bleibt V1-klein: pending Remote, eine Freigabe-Option, eine Uebernahme-Option.
- Kein CRDT, kein Konfliktdialog, kein Merge-Editor, keine Offline-Queue, kein Background Sync.
- Reconnect fuehrt weiterhin keinen automatischen Dirty-State-ueberschreibenden Refetch ein.
- Offline-Copy ist ehrlich: gemeinsame Freigabe braucht Verbindung.

Findings und Korrekturen:

- S4.4-F1: Die erste Pending-UI war nur an `syncMode` gekoppelt. Nach fehlgeschlagener Freigabe haette die Uebernahme-Option trotz vorhandenem pending Remote verschwinden koennen.
  - Korrektur: `hasPendingRemote` als eigener Marker im Writing-Modul eingefuehrt; die Uebernahme-Option bleibt sichtbar, solange ein pending Remote bekannt ist.
- S4.4-F2: Ein Reconnect-Refetch waere ohne weitere Regeln ein zweiter Remote-Snapshot-Pfad.
  - Korrektur: Kein Reconnect-Code in S4.4; bestehende Realtime-Snapshot-Pfade nutzen den Dirty-State-Schutz.

Restrisiko:

- Pending Remote ist ein V1-Vertrag ohne Merge. Wer `Anderen Stand uebernehmen` klickt, verwirft lokale Aenderungen bewusst.
- Der Dirty-State sitzt im aktuellen App-Lifecycle. Reload/Hard-Refresh bleibt lokale Persistenz-Realitaet und wird in S5 manuell geprueft.
- Browser-/Mehrtab-Smoke ist fuer S5 wichtig, weil der relevante Fall einen zweiten Tab oder ein zweites Geraet simuliert.

### S4.5 Ergebnisprotokoll 11.05.2026

Umsetzung:

- Writing-spezifische UI-Hierarchie fuer die Kopfleiste der offenen Liste nachgezogen.
- Statuszeile im Writing bekommt eine begrenzte Zeilenlaenge und ruhigen Zeilenabstand.
- `Liste freigeben`, `Anderen Stand uebernehmen` und `Liste leeren` bleiben in der bestehenden Panel-Head-Aktionsgruppe.
- `Anderen Stand uebernehmen` bekommt eine kleine sekundaere Button-Anmutung, ohne eine neue globale Button-Variante einzufuehren.
- Mobile stapelt die Writing-Aktionsgruppe auf volle Breite, damit lange Status-/Pending-Zustaende nicht mit Aktionen kollidieren.
- Die destruktive Natur der Remote-Uebernahme ist per `aria-label` klarer beschrieben, waehrend der sichtbare Text kurz bleibt.

Betroffene Dateien:

- `index.html`
- `app/styles/writing.css`
- `docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md`

Lokaler Check:

- `node --check app/main.js`
- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `node --check app/core/item-display.js`
- `git diff --check -- index.html app/main.js app/modules/writing.js app/modules/shopping.js app/core/item-display.js app/styles/ui.css app/styles/writing.css offline.html "docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md"`
- `rg -n "screen-writing|accept-remote-list|panel-head-actions|sync-status|aria-label" index.html app/styles/writing.css app/styles/ui.css`

Code Review:

- S4.5 bleibt in den bestehenden Owner-Dateien: Writing-spezifische Regeln in `writing.css`, Statuszustandsfarbe in `ui.css`.
- Keine neue Komponente, keine neue Navigation und kein globaler Layout-Umbau.
- Mobile-Regeln betreffen nur `#screen-writing` und veraendern Shopping/Home nicht.
- Markup-Aenderung ist auf die Accessibility-Beschreibung des bestehenden Pending-Remote-Buttons begrenzt.

Contract Review:

- S4.5 stuetzt die S4.1 bis S4.4-Arbeit, ohne neue Produktfunktion einzufuehren.
- Freigabe, Pending Remote und Leeren bleiben sichtbar/reachable, aber nicht lauter als noetig.
- Kein Auto-Save, keine Queue, keine Push-Logik, keine Realtime-Collaboration und kein Dashboard-/Organizer-Ausbau.

Findings und Korrekturen:

- S4.5-F1: Die Pending-Remote-Aktion konnte auf Mobile zwar umbrechen, aber als normaler Inline-Link keine stabile zentrierte Touchflaeche bilden.
  - Korrektur: Writing-Panel-Aktionslinks als kleine Flex-Aktionen ausgerichtet; mobile Aktionsgruppe stapelt auf volle Breite.

Restrisiko:

- Die tatsaechliche visuelle Feinabnahme bleibt S5/Browser-Smoke, besonders bei kleinem Viewport und pending Remote.

### S4.6/S4.7 Ergebnisprotokoll 11.05.2026

Umsetzung:

- S4-Gesamtdiff gegen Roadmap-Vertrag, S3-Pflichten und Scope-Grenzen geprueft.
- Code Review fuer Writing-, Shopping-, Main-, Item-Display-, Style- und Offline-Pfade durchgefuehrt.
- Contract Review gegen Auto-Save, Queue, Push, Realtime-Collaboration, Produktkatalog, Datenvertragswechsel und Service-Worker-Drift durchgefuehrt.
- Keine zusaetzlichen Code-Findings mit Korrekturbedarf gefunden.
- S4 als abgeschlossen markiert.

Betroffene Dateien:

- `docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md`

Review- und Checkumfang:

- `node --check app/main.js`
- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `node --check app/core/item-display.js`
- `node --check app/supabase/list-sync.js`
- `node --check app/core/state.js`
- `node --input-type=module -e "import('./app/core/item-display.js').then(...)"` fuer representative Formatfaelle
- `git diff --check -- index.html app/main.js app/modules/writing.js app/modules/shopping.js app/core/item-display.js app/styles/ui.css app/styles/writing.css offline.html "docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md"`
- Negativsuche in geaenderten Produktdateien nach:
  - alter Sync-/Save-Copy
  - Item-`innerHTML` in Writing/Shopping
  - Offline-Auto-Sync-Versprechen
  - Queue-/Push-/Merge-/Background-Sync-/Notification-Drift

Code Review:

- Datenvertrag bleibt `id`, `name`, `quantity`, `unit`, `inCart`.
- `app/core/item-display.js` ist reine Praesentation und schreibt nicht in den Store.
- Writing und Shopping rendern Itemdaten ueber DOM-Knoten und `textContent`.
- `app/main.js` haelt pending Remote nur im App-Lifecycle und schreibt Remote-Snapshots bei lokalem Dirty-State nicht automatisch in den Store.
- `list-sync.js`, Supabase-Schema, Runtime Config, Service Worker und State-Schema bleiben unveraendert.

Contract Review:

- S4 erfuellt die vereinbarten S3-Pflichten:
  - Writing weniger formularig
  - Listen-Darstellung konservativ geglaettet
  - Haushaltsfreigabe statt technischer Sync-Sprache
  - Dirty-State vor Remote-Ueberschreibung geschuetzt
  - Offline-Copy ehrlich
  - UI-Hierarchie nachgezogen
- Kein Auto-Save beim Tippen.
- Keine Offline-Queue, kein Background Sync und kein automatisches Replay.
- Kein CRDT, kein Merge-Editor und kein Konfliktdialog.
- Keine Push-Logik und kein Notification-Opt-in.
- Keine Realtime-Collaboration ueber Snapshot-Refresh hinaus.
- Kein Produktkatalog und keine Semantikpflicht.

Findings und Korrekturen:

- Keine neuen S4.6/S4.7-Code-Findings.
- Bereits in S4.1 bis S4.5 gefundene Punkte wurden in den jeweiligen Substeps korrigiert.
- Nachreview CodeRabbit:
  - Anzeige-Mengen werden in `item-display.js` nun einmalig normalisiert und deutschsprachig formatiert.
  - Nicht-finite, negative oder Null-Mengen fallen in der Anzeige konsistent auf `1` zurueck.
  - `saved` und `pending-remote` teilen sich dieselbe Statusfarbregel.
  - Ungueltiges `justify-content: stretch` in der mobilen Writing-Aktionsgruppe wurde entfernt.

Restrisiko:

- S5 muss die manuelle Browser-Abnahme liefern:
  - Desktop Writing/Shopping
  - Mobile Writing/Shopping
  - Save ohne Netz
  - Pending Remote mit zweitem Tab oder zweitem Geraet
  - bewusste Remote-Uebernahme

## S5 - Tests, Code Review und Contract Review

Ziel:

- Alles pruefen, was lokal sinnvoll pruefbar ist.
- Externe oder manuelle Smokes sauber definieren, falls sie nicht lokal ausfuehrbar sind.
- Code und Roadmap gegen Guardrails reviewen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 Lokaler Browser-Smoke:
  - App startet auf Home.
  - Wechsel nach `Schreiben` funktioniert.
  - Produkt kann schnell eingetragen werden.
  - Menge/Einheit funktionieren weiterhin optional und ohne Pflichtkatalog.
  - offene Liste ist lesbar.
  - `Liste freigeben` / Haushaltsfreigabe wirkt wie beschlossen.
  - `Loeschen`, `Liste leeren`, Shopping-Toggle und Shopping-Abschluss bleiben regressionsfrei.
- S5.4 Mobile/Touch-Smoke:
  - Eingabe und Buttons sind treffbar.
  - Text ueberlappt nicht.
  - Tastatur-/Fokusverhalten ist brauchbar.
- S5.5 Sync-Smokes, soweit Supabase lokal/verfuegbar ist:
  - manueller Save
  - direkter Snapshot nach Loeschen/Liste leeren
  - Shopping-Toggle/Abschluss Regression
  - Remote-Snapshot-Refresh
  - Last-Write-Wins-Verhalten als V1-Tradeoff nachvollziehbar
- S5.6 Offline-/Reconnect-Smokes:
  - Start ohne Netz
  - Save ohne Netz
  - Netzverlust nach Start
  - Reconnect
  - keine doppelten Subscriptions oder chaotischen UI-Spruenge
- S5.7 User-Facing Copy Review nach realem Smoke.
- S5.8 Code Review gegen Bruchrisiken.
- S5.9 Contract Review gegen HESTIA-Guardrails.
- S5.10 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Gepruefter Umsetzungsstand.
- Klare Liste ausgefuehrter Checks.
- Klare Liste nicht lokal ausfuehrbarer Smokes.
- Bekannte Restrisiken.

Exit-Kriterium:

- Alle lokal moeglichen Checks sind erledigt oder bewusst als nicht verfuegbar markiert.

### S5 Ergebnisprotokoll 11.05.2026

Lokal ausgefuehrt:

- JS-Syntaxchecks fuer alle relevanten App-, Core-, Supabase-, Diagnostics-, Module- und Service-Worker-Dateien.
- `git diff --check -- index.html app/main.js app/modules/writing.js app/modules/shopping.js app/core/item-display.js app/styles/ui.css app/styles/writing.css offline.html "docs/HESTIA Schreiben Speichern Listenvertrauen Roadmap.md"`
- Display-Helper-Test fuer Stueck-/Stk.-Faelle, deutsche Dezimalanzeige, invalid Mengen und abweichende Units.
- State-Contract-Test fuer `createState()`, `upsertItem`, `toggleInCart` und `finishShopping` mit lokalem `localStorage`-Mock.
- Negativsuchen nach alter Sync-/Save-Copy, Item-`innerHTML`, `justify-content: stretch` und Queue-/Push-/Merge-/Background-Sync-/Notification-Drift.
- HTTP-Static-Smoke per lokalem Python-Server fuer:
  - `/`
  - `/index.html`
  - `/offline.html`
  - `/sw.js`
  - `/manifest.webmanifest`
  - `/public/runtime-config.json`
  - `/app/main.js`
  - `/app/core/item-display.js`

Lokales Ergebnis:

- Alle lokal ausgefuehrten Checks bestanden.
- `git diff --check` meldet nur bekannte CRLF-Warnungen der Windows-Working-Copy.
- Playwright ist im Repo nicht installiert; keine neue Browser-Testdependency eingefuehrt.
- Kein Commit fuer Git-Versions-Test erstellt, weil die lokalen Checks keinen solchen Testbedarf ergeben haben.

Code Review:

- S4-Aenderungen bleiben in den geplanten Owner-Dateien.
- Itemdatenvertrag bleibt unveraendert.
- Display-Helper bleibt reine Praesentation.
- Dirty-State-/Pending-Remote-Logik bleibt V1-klein und fuehrt keinen Merge-/Queue-Client ein.
- Offline-Copy ist ehrlich und verspricht kein automatisches Nachsenden.

Contract Review:

- Keine Hinweise auf Scope-Drift in Richtung Organizer, Produktkatalog, Auto-Save, Offline-Queue, Push oder Realtime-Collaboration.
- Live-Server-Abnahme bestaetigt Desktop, Mobile, Supabase-/Freigabe-, Offline-/Reconnect- und Pending-Remote-Smokes positiv.

Live-Server-Abnahme durch Stephan:

- Desktop-Smoke bestanden.
- Mobile-/Responsive-Smoke bestanden.
- Supabase-/Freigabe-Smoke bestanden.
- Offline-/Reconnect-Smoke bestanden.
- Pending-Remote-Smoke mit zweitem Tab oder zweitem Geraet bestanden.

S5 Abschluss:

- S5 ist abgeschlossen.
- Keine offenen Testblocker.
- Kein Commit fuer Git-Versions-Test notwendig.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Source-of-Truth-Dokus synchronisieren.
- QA aktualisieren.
- Roadmap final abschliessen.
- Commit- und Archiventscheidung dokumentieren.

Substeps:

- S6.1 `docs/modules/Writing Module Overview.md` aktualisieren.
- S6.2 `docs/modules/Supabase Sync Module Overview.md` aktualisieren.
- S6.3 `docs/modules/State Layer Module Overview.md` aktualisieren, falls State-Vertrag faktisch beruehrt wurde.
- S6.4 `docs/modules/Bootflow Module Overview.md`, `Runtime Config`, `Deployment` oder `Touchlog` aktualisieren, falls Connectivity-/Diagnoseverhalten betroffen ist.
- S6.5 `docs/modules/Shopping Module Overview.md` aktualisieren, falls gemeinsamer Sync-/Status- oder Darstellungsvertrag dort sichtbar ist.
- S6.6 `docs/QA_CHECKS.md` um neue Writing-, Save-, Sync-, Offline- und Regression-Smokes erweitern.
- S6.7 Roadmap mit Ergebnisprotokollen aktualisieren.
- S6.8 Finaler Contract Review:
  - Roadmap vs. Code
  - Roadmap vs. Module Overviews
  - Roadmap vs. README-/PRODUCT-Guardrails
  - Roadmap vs. QA
- S6.9 Abschluss-Abnahme.
- S6.10 Commit-Empfehlung.
- S6.11 Archiv-Entscheidung.

Output:

- Code, Doku, QA und Roadmap sprechen denselben finalen Vertrag.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll 12.05.2026

#### S6.1 bis S6.6 Doku- und QA-Sync

Umsetzung/Review:

- `docs/modules/Writing Module Overview.md` auf `Liste freigeben`, Pending-Remote, Inline-Validierung und ruhigere Writing-Hierarchie aktualisiert.
- `docs/modules/Supabase Sync Module Overview.md` auf bewusste Haushaltsfreigabe, Dirty-State-Schutz und Pending-Remote statt stillem Ueberschreiben aktualisiert.
- `docs/modules/State Layer Module Overview.md` und `docs/modules/Bootflow Module Overview.md` auf Pending-Remote- und Dirty-State-Vertrag aktualisiert.
- `docs/modules/Touchlog Module Overview.md` um relevante Pending-Remote-/Freigabe-Diagnosezeilen erweitert.
- `docs/modules/Shopping Module Overview.md` auf gemeinsame Mengen-/Einheiten-Darstellung ueber `app/core/item-display.js` aktualisiert.
- `docs/QA_CHECKS.md` um Writing-, Freigabe-, Offline-/Reconnect-, Pending-Remote- und Darstellungs-Smokes erweitert.

Contract Review:

- Runtime Config und Deployment wurden nicht geaendert, weil Roadmap 2 keine Env-, Deployment- oder Schema-Aenderung eingefuehrt hat.
- Alle betroffenen Dokus halten am Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` fest.
- Keine Doku beschreibt Auto-Save, Offline-Queue, Push, CRDT, Merge-Editor oder robuste Live-Collaboration als Bestandteil von Roadmap 2.

Checks:

- Aktive Modul- und QA-Dokus auf alte Ziel-Copy wie `Sync bereit.`, `Nur lokal gespeichert.` und `Liste speichern` geprueft.
- `docs/future roadmaps.md` fuer Roadmap-2-Abschluss und Archivverweis vorbereitet.

Findings:

- Keine fachlichen Doku-Blocker offen.
- Alte Begriffe bleiben nur in historischen Analyse-/Finding-Abschnitten der Roadmap erhalten.

Korrekturen:

- S6-Statusmatrix auf `DONE` gesetzt.
- Abschlussvertrag in diesem Ergebnisprotokoll dokumentiert.

Restrisiko:

- Roadmap 6 Realtime Collaboration bleibt bewusst separat; Roadmap 2 liefert nur Snapshot-Vertrauen und Pending-Remote-Schutz.

#### S6.7 bis S6.11 Finaler Abschluss

Umsetzung/Review:

- Roadmap-Ergebnisprotokolle sind vollstaendig bis S6.
- Stephan hat S5 per Live Server positiv abgenommen.
- Roadmap 2 wird nach Abschluss als `(DONE)` ins Archiv verschoben.

Contract Review:

- Roadmap vs. Code: Writing, Shopping, Bootflow und Shared Snapshot folgen dem finalen V1-Vertrag.
- Roadmap vs. Module Overviews: Source-of-Truth-Dokus beschreiben dieselben Nutzer- und Technikgrenzen.
- Roadmap vs. README-/PRODUCT-Guardrails: HESTIA bleibt Einkaufslisten-App mit ruhiger Haushaltsfreigabe, kein Organizer, kein Produktkatalog, keine Collaboration-Plattform.
- Roadmap vs. QA: Die QA-Checks pruefen die neu eingefuehrten UI-, Copy-, Offline-/Reconnect- und Pending-Remote-Faelle.

Checks:

- Lokale Syntax- und Diff-Checks wurden in S5 ausgefuehrt.
- Finale Doku-Konsistenz wurde in S6 per gezielter Textsuche geprueft.

Findings:

- Kein offener Contract-Finding.
- Kein weiterer Code-Eingriff fuer S6 notwendig.

Korrekturen:

- `docs/future roadmaps.md` wird mit `(DONE)` und Archivlink fuer Roadmap 2 aktualisiert.

Restrisiko:

- Ein Commit wurde nicht automatisch erstellt; Empfehlung bleibt `feat(writing): refine writing and save trust`.

## Ergebnisprotokoll-Format

```md
#### Sx Ergebnisprotokoll

##### Sx.y [Name]
- Umsetzung/Review:
  - [...]
- Contract Review:
  - [...]
- Checks:
  - [...]
- Findings:
  - [...]
- Korrekturen:
  - [...]
- Restrisiko:
  - [...]
```

Regel:

- Kein Substep gilt als abgeschlossen, wenn nicht dokumentiert ist, was geprueft wurde.

## Smokechecks / Regression

- Home zeigt weiter genau zwei primaere Intentionen: `Schreiben` und `Einkaufen`.
- Writing erlaubt weiter Freitext.
- Semantik hilft, sperrt aber nicht.
- Produkt, Menge und Einheit lassen sich weiterhin erfassen.
- Ungueltige Eingaben fuehren nicht zu kaputten Items.
- Offene Liste bleibt lesbar und fachlich ehrlich.
- `Liste freigeben` / Haushaltsfreigabe folgt dem finalen V1-Vertrag.
- Add bleibt lokal bis bewusst gespeichert wird, falls S2 diesen Vertrag bestaetigt.
- Loeschen, Liste leeren, Shopping-Toggle und Shopping-Abschluss folgen dem finalen Shared-Snapshot-Vertrag.
- Save-Fehler und Offline-Zustaende erzeugen keine falsche Sicherheit.
- Reconnect fuehrt nicht zu stiller State-Verwirrung.
- Remote-Snapshot fuehrt nicht zu unverstandener UI-Ueberschreibung.
- App funktioniert weiterhin ohne Supabase-Konfiguration.
- Mit Supabase-Konfiguration bleibt der Shared-Snapshot nachvollziehbar.

## Abnahmekriterien

- Writing fuehlt sich schneller und weniger formularig an.
- Nutzer verstehen, ob eine Liste lokal, nicht gespeichert, gespeichert oder fehlgeschlagen ist.
- Offline- und Reconnect-Verhalten ist ehrlich dokumentiert und, soweit umgesetzt, ruhig erlebbar.
- Mengen-/Einheiten-Darstellung erzeugt weniger fachliche Stolperstellen.
- Keine neue Fachlogik, kein neuer Datenvertrag und kein neuer Produktbereich wurden eingefuehrt.
- Snapshot-Sync bleibt klar von Roadmap 5 Push und Roadmap 6 Realtime Collaboration getrennt.
- Lokal moegliche Checks sind dokumentiert.
- Betroffene Dokus und QA sind synchron.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `feat(writing): refine writing and save trust`
