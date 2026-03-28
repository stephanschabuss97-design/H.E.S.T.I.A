# HESTIA Sync Behavior, Conflicts & Status Roadmap

## Ziel (klar und pruefbar)
Der bestehende Shared-List-Sync soll fachlich und UX-seitig so festgezogen werden, dass HESTIA im Alltag ruhig, eindeutig und vorhersehbar bleibt, obwohl der Listenstand jetzt zwischen mehreren Geraeten geteilt wird.

Pruefbare Zieldefinition:
- Es ist verbindlich entschieden, wo HESTIA in V1 bei manuellem Speichern bleibt und wo direkte Shared-Persistenz bewusst erlaubt ist.
- `Last write wins` ist fuer V1 nicht nur stillschweigende Technik, sondern expliziter Produktvertrag.
- Der Zustand `lokal geaendert, noch nicht gespeichert` ist fachlich und visuell eindeutig.
- Eingehende Remote-Aenderungen haben eine klar definierte Wirkung auf lokalen State, UI und Status.
- Writing und Shopping sprechen denselben Sync-Vertrag.
- Doku, UI-Status und Implementierung verwenden dieselben Begriffe und Randfall-Regeln.

## Scope
- Entscheidung und Dokumentation zum heutigen Hybrid-Vertrag:
  - `Add` bleibt bewusst manuell speicherbar
  - harte oder abschliessende Mutationen duerfen direkt gemeinsam persistieren
- Finalisierung des V1-Konfliktmodells rund um `Last write wins`.
- Definition des UX-Vertrags fuer Sync-Status:
  - `nur lokal`
  - `nicht gespeichert`
  - `gespeichert`
  - `fehlgeschlagen`
  - `remote aktualisiert`
- Definition der Randfaelle:
  - lokale ungespeicherte Aenderung
  - eingehende Remote-Aenderung
  - gleichzeitige Nutzung auf zwei Geraeten
  - Shopping-Abschluss auf anderem Geraet
- Umsetzung der beschlossenen Wahrheiten in UI, State und Sync-Layer.

## Not in Scope
- Push-Notifications oder Reminder-Flow.
- Offline-Queueing, Background Sync oder aggressive Reconnect-Logik.
- Neues Auth-Modell, Nutzerkonten oder Rollen.
- CRDTs, Merge-Editoren oder komplexe Konfliktaufloesung.
- Grosses visuelles Redesign ausserhalb des Sync-Status-Verhaltens.

## Relevante Referenzen (Code)
- `app/main.js`
- `app/core/state.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/supabase/list-sync.js`
- `index.html`
- `app/styles/components.css`

## Relevante Referenzen (Doku)
- `PRODUCT.md`
- `README.md`
- `hestia-shared-list-sync-roadmap.md`
- `docs/modules/Writing Module Overview.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/QA_CHECKS.md`

## Guardrails
- HESTIA bleibt ein ruhiges Haushaltswerkzeug und kippt nicht in kollaborative Editor-Komplexitaet.
- Speichern darf nie still und unerklaert andere Geraete ueberschreiben.
- Nutzer muessen ohne Techniksprache verstehen koennen, ob etwas nur lokal oder bereits gemeinsam ist.
- `Last write wins` darf fuer V1 bleiben, aber nicht unsichtbar als Zufallsverhalten.
- Writing und Shopping duerfen nicht unterschiedliche Wahrheiten ueber denselben Listenstand zeigen.
- Neue Sync-Status muessen helfen, nicht laermen.
- Der heute bereits eingefuehrte Hybrid-Schnitt darf nicht versehentlich wieder in einen inkonsistenten Halb-Auto-Save driften.

## Architektur-Constraints
- Bestehender Household-/RLS-Vertrag bleibt unveraendert.
- Keine neuen globalen State-Singletons.
- `state.items` bleibt der unmittelbare UI-State.
- Remote-Layer bleibt in `app/supabase/*` gebuendelt.
- Public APIs nur erweitern, nicht brechen, solange kein bewusster Vertragswechsel beschlossen ist.

## Tool Permissions
Allowed:
- Bestehende State-, Writing-, Shopping- und Sync-Dateien lesen und innerhalb Scope aendern.
- Doku, QA und Status-Texte anpassen.
- Kleine UI-Ergaenzungen fuer Status-/Hinweisverhalten einfuehren.

Forbidden:
- Neue Dependencies.
- Auth-Umbau.
- Unverwandte UI-Refactors.
- Offline-Queueing oder Push-Funktionen in diese Roadmap hineinziehen.

## Execution Mode
- Diese Roadmap laeuft zuerst.
- Erst `S1` bis `S3` finalisieren Ist-Stand und Produktvertrag.
- Erst danach darf `S4` den Repo-Umbau ziehen.
- `S5` schliesst mit QA, Doku-Sync und Abschlussbewertung.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens ein Contract-Check, Syntaxcheck oder gezielter Smoke.

## Statusmatrix
| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse des aktuellen Sync-Verhaltens und der Randfaelle | DONE | Boot-, PWA-, Save-, Load-, Realtime- und Household-Key-Verhalten heute real durch Touchlog und Live-Smokes gemappt. |
| S2 | Produktvertrag fuer Speichern, Konflikte und Remote-Ereignisse finalisieren | IN_PROGRESS | Hybrid-Schnitt ist implizit entstanden: `Add` manuell, `Loeschen`/`Liste leeren`/`Im Wagen`/`Liste abschliessen` direkt shared. Muss noch explizit finalisiert werden. |
| S3 | UX- und Statusvertrag fuer Writing und Shopping festziehen | TODO | Statusverhalten ist funktional vorhanden, aber noch nicht als ruhiger Endvertrag beschrieben. |
| S4 | Repo-Umsetzung des beschlossenen Sync-Vertrags | IN_PROGRESS | Shared Persistenz fuer mehrere kritische Mutationen ist bereits im Repo umgesetzt. |
| S5 | QA, Doku-Sync und Abschlussbewertung | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## Wiederkehrende Abschluss-Substeps pro Hauptschritt
- `letzter fachlicher Substep + 1: Schritt-Abnahme`
  - Ergebnis gegen den Zielvertrag des Schritts pruefen
  - Drift zwischen Writing, Shopping, State und Sync-Layer pruefen
  - mindestens einen gezielten Check dokumentieren
- `danach: Doku-Sync`
  - betroffene Modul-Overviews, `PRODUCT.md` und `docs/QA_CHECKS.md` sofort nachziehen
- `danach: Commit-Empfehlung`
  - festhalten, ob der Schritt bereits sinnvoll commitbar ist oder logisch mit dem naechsten Schritt zusammengehoert

## Schritte + Subschritte

### S1 - Ist-Analyse des aktuellen Sync-Verhaltens und der Randfaelle
- S1.1 Den heute gemappten Save-/Load-/Realtime-Pfad als Ist-Befund festhalten:
  - Boot laedt Runtime-Config, versucht Remote-Snapshot und abonniert danach Realtime.
  - `Add` in Writing bleibt lokal bis zu einem expliziten Save.
  - `Loeschen`, `Liste leeren`, `Im Wagen` und `Liste abschliessen` persistieren heute direkt shared.
- S1.2 Aufnehmen, welche Status heute real existieren und wie sie im UI erscheinen.
- S1.3 Die heute bereits beobachteten Randfaelle als reale Karten notieren:
  - lokaler Dirty-State nach `Add`
  - direkte Shared-Persistenz bei destruktiven oder abschliessenden Aktionen
  - Remote-Update auf zweitem Geraet
  - Household-Key-Fehler und korrupter Local-Storage-Wert
- S1.4 Alle Stellen markieren, an denen das heutige Verhalten noch implizit oder nur durch Diagnosewissen klar ist.
- S1.5 Schritt-Abnahme.
- S1.6 Doku-Sync.
- S1.7 Commit-Empfehlung.
- Output: belastbare Karte des Ist-Verhaltens ohne blinde Flecken.
- Exit-Kriterium: kein ungepruefter Sync-Randfall mehr offen.

### S2 - Produktvertrag fuer Speichern, Konflikte und Remote-Ereignisse finalisieren
- S2.1 Verbindlich finalisieren, ob der heutige Hybrid-Schnitt der V1-Vertrag ist:
  - `Add` bleibt manuell
  - harte oder abschliessende Mutationen persistieren direkt
- S2.2 `Last write wins` als bewussten V1-Vertrag formulieren:
  - was wird ueberschrieben
  - wann gilt der spaetere Save
  - was wird dem Nutzer sichtbar gemacht
- S2.3 Festlegen, was bei eingehender Remote-Aenderung waehrend lokaler Dirty-State passieren soll.
- S2.4 Festlegen, ob Remote-Aenderungen sofort ersetzt, nur markiert oder bis zum naechsten klaren Nutzerimpuls geparkt werden.
- S2.5 Shopping-Abschluss und harte Deletes fachlich gegen denselben Vertrag pruefen.
- S2.6 Schritt-Abnahme.
- S2.7 Doku-Sync.
- S2.8 Commit-Empfehlung.
- Output: eindeutiger Produktvertrag fuer Sync, Konflikte und Remote-Ereignisse.
- Exit-Kriterium: keine offene Produktfrage mehr zu Speichern und Ueberschreiben.

### S3 - UX- und Statusvertrag fuer Writing und Shopping festziehen
- S3.1 Den finalen Statuswortschatz fuer HESTIA definieren.
- S3.2 Pro Status festlegen:
  - Text
  - Sichtbarkeit
  - Trigger
  - Rueckkehr in anderen Status
- S3.3 Festlegen, ob `remote aktualisiert` ein eigener Zustand oder nur eine Variante von `gespeichert` ist.
- S3.4 Sichtbarkeit und Verhalten im Writing- und Shopping-Screen gegeneinander abgleichen.
- S3.5 Randfall-Copy fuer Fehler, Ueberschreiben und Remote-Refresh festziehen.
- S3.6 Schritt-Abnahme.
- S3.7 Doku-Sync.
- S3.8 Commit-Empfehlung.
- Output: ruhiger, reproduzierbarer UX-Vertrag fuer Sync-Status und Randfaelle.
- Exit-Kriterium: kein Statuswort und kein UI-Trigger ist mehr unklar.

### S4 - Repo-Umsetzung des beschlossenen Sync-Vertrags
- S4.1 State-Layer, Writing, Shopping und Sync-Boundary auf den finalen Vertrag ziehen.
- S4.2 Eventfluss und Rendering so anpassen, dass lokale und entfernte Aenderungen denselben Regeln folgen.
- S4.3 Falls beschlossen, Schutz oder Hinweis fuer Remote-Updates waehrend lokalem Dirty-State implementieren.
- S4.4 Status-UI und Copy final nachziehen.
- S4.5 Schritt-Abnahme.
- S4.6 Doku-Sync.
- S4.7 Commit-Empfehlung.
- Output: Code entspricht dem beschlossenen Sync- und Statusvertrag.
- Exit-Kriterium: Repo-Verhalten stimmt mit `S2` und `S3` ueberein.

### S5 - QA, Doku-Sync und Abschlussbewertung
- S5.1 Smoke-Matrix fuer zwei Geraete definieren und ausfuehren.
- S5.2 Regression gegen den lokalen Kernflow pruefen:
  - schreiben
  - loeschen
  - im Wagen
  - Shopping abschliessen
- S5.3 `PRODUCT.md`, Modul-Overviews, QA und Roadmap auf finalen Stand bringen.
- S5.4 Offene Restrisiken fuer V2 explizit notieren.
- S5.5 Schritt-Abnahme.
- S5.6 Doku-Sync.
- S5.7 Commit-Empfehlung.
- Output: belastbar getesteter und dokumentierter Sync-Vertrag.
- Exit-Kriterium: HESTIA teilt Listen ruhig und vorhersehbar zwischen Geraeten.

## Smokechecks / Regression (Definition)
- Lokale Aenderung ohne Speichern bleibt klar als nicht gemeinsam markiert.
- Manueller Save macht den Stand auf dem zweiten Geraet sichtbar.
- `Loeschen`, `Liste leeren`, `Im Wagen` und `Liste abschliessen` verhalten sich gemass dem finalen Vertrag und nicht widerspruechlich zu `Add`.
- Gleichzeitige Aenderungen auf zwei Geraeten verhalten sich gemass dem finalen `Last write wins`-Vertrag.
- Remote-Update waehrend lokalem Dirty-State fuehrt nicht zu stiller, unverstandener Verwirrung.
- Shopping-Abschluss auf Geraet A erscheint auf Geraet B im selben Vertragsverhalten wie andere Aenderungen.
- Writing und Shopping zeigen fuer denselben Stand keine widerspruechlichen Aussagen.

## Abnahmekriterien
- Der Nutzer versteht, ob seine Liste lokal oder gemeinsam ist.
- Konfliktverhalten ist dokumentiert, sichtbar und reproduzierbar.
- Sync-Status erzeugt mehr Klarheit als Laerm.
- Writing und Shopping sprechen denselben Sync-Vertrag.
- Code, Doku und QA beschreiben denselben Endstand.

## Risiken
- Zu viel Status-Feinheit kann HESTIA lauter machen als noetig.
- Zu wenig Sichtbarkeit kann bei `Last write wins` zu stillen Ueberschreibungen fuehren.
- Uneinheitliche Behandlung von Remote-Events in Writing und Shopping wuerde den Produktkern untergraben.
- Wenn Dirty-State und Remote-Load nicht sauber begrenzt werden, entsteht Unsicherheit statt Ruhe.
