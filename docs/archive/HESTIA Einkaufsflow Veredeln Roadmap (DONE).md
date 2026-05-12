# HESTIA Roadmap 1 - Einkaufsflow veredeln (DONE)

## Ziel (klar und pruefbar)

Der bestehende Einkaufsflow soll sich unterwegs ruhiger, direkter und weniger fehleranfaellig anfuehlen, ohne die charmante Papierlisten-Aesthetik oder den kleinen HESTIA-Produktkern zu verlieren.

Pruefbare Zieldefinition:

- Shopping-Eintraege bleiben visuell eine charmante Einkaufsliste, bekommen aber eine moderne, mobile-taugliche Trefferflaeche.
- `Im Wagen` bleibt der einzige operative Einkaufsstatus; es entsteht keine neue Statusmaschine.
- Der vorhandene Wechsel vom Einkauf zurueck nach `Schreiben` wird leichter auffindbar, ohne Home als ruhigen Haupteinstieg zu entwerten.
- Destruktive Aktionen sind visuell und interaktiv klarer hierarchisiert.
- Der Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` bleibt unveraendert.
- Lokaler Flow, Supabase-Sync und Realtime-Verhalten bleiben funktional unveraendert.

## Problemzusammenfassung

HESTIA wird bereits im Alltag genutzt und die aktuelle Einkaufsliste wird wegen ihres Bridgerton-/Downton-Abbey-Charakters bewusst akzeptiert. Das Problem ist deshalb nicht die Gestaltung selbst, sondern die noch darunterliegende Web-App-Reibung: kleine Checkboxen, kleine Textlinks, ein stellenweise indirekter Moduswechsel und riskante Aktionen mit zu wenig visueller Hierarchie. Gerade im Supermarkt wird HESTIA einhaendig, schnell und unter Ablenkung benutzt. Diese Roadmap soll die moderne App-Ergonomie unter die vorhandene charmante Oberflaeche legen, ohne HESTIA in ein generisches Shopping-Produkt umzubauen.

## Scope

- Shopping-UI und Shopping-Interaktion:
  - groessere effektive Trefferflaechen
  - tapbare Listenzeilen
  - klare visuelle Reaktion fuer `Im Wagen`
  - bessere Hierarchie fuer `Liste abschliessen` und `Aendern`
- Hierarchie und Auffindbarkeit des vorhandenen Wechsels von `Einkaufen` nach `Schreiben`, sofern das ruhig und klein bleibt.
- Destruktive Aktionen im Einkaufsfluss:
  - `Liste abschliessen`
  - `Loeschen` / `Liste leeren` nur als Review-Grenze, falls gemeinsame UI-Muster betroffen sind; Umsetzung daran gehoert nur in diese Roadmap, wenn S1-S3 bestaetigen, dass es ohne Writing-Redesign noetig ist
- CSS in bestehenden Owner-Dateien.
- Kleine HTML-/JS-Anpassungen in bestehenden Modulen.
- Doku- und QA-Sync fuer betroffene Shopping-/Home-/State-Vertraege.

## Not in Scope

- Kein Redesign der Papierlisten-Aesthetik.
- Kein Austausch der charmanten Shopping-Typografie gegen generischen SaaS-Stil.
- Kein neues Organizer-, Dashboard- oder Familienhinweis-Feature.
- Kein Einkaufsapps-Modul; das bleibt Roadmap 4 aus `docs/future roadmaps.md`.
- Kein Standort, keine Geolocation, keine marktbasierte Sortierung.
- Kein Undo, keine Historie, kein Mehrstatus-System.
- Keine Aenderung am Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart`.
- Keine SQL-, RLS- oder Supabase-Schema-Aenderung.
- Keine neue Dependency, kein Build-Step, kein Framework.
- Keine Push-, Reminder- oder Notification-Logik.

## Relevante Referenzen (Code)

- `index.html`
- `app/modules/shopping.js`
- `app/modules/writing.js`
- `app/core/router.js`
- `app/core/state.js`
- `app/supabase/list-sync.js`
- `app/styles/ui.css`
- `app/styles/shopping.css`
- `app/styles/writing.css`
- `app/styles/home.css`
- `app/styles/layout.css`

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/QA_CHECKS.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/Writing Module Overview.md`
- `docs/modules/Home Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/CSS Module Overview.md`

Regel:

- Erst README und Produktvertrag lesen.
- Dann betroffene Module Overviews lesen.
- Dann Code lesen.
- Erst nach S1-S3 Code aendern.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug fuer den gemeinsamen Einkaufsfluss.
- `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
- Home bleibt Einstieg, nicht Dashboard.
- Die Papierliste bleibt charmant und wertig; Ergonomie wird darunter verbessert.
- `Im Wagen` bleibt ein einfacher operativer Status.
- Gekauftes wird beim Abschluss hart entfernt; Unerledigtes bleibt sichtbar.
- Keine neue Status-, Reminder-, Historien- oder Organizer-Logik.
- Schreibende oder loeschende Aktionen brauchen weiter klaren Nutzerimpuls.
- Sync bleibt leichtgewichtig; Realtime soll Aenderungen spiegeln, nicht orchestrieren.
- User-facing Copy bleibt ruhig, kurz und alltagstauglich.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules ohne Build-Step.
- Styling laeuft weiter ueber `app/app.css` und die bestehende CSS-Import-Reihenfolge.
- Shopping-spezifische Styles gehoeren primaer nach `app/styles/shopping.css`.
- Globale Button-, Link- oder Listenmuster gehoeren nach `app/styles/ui.css`.
- State-Operationen bleiben bei den vorhandenen Methoden in `app/core/state.js`.
- Supabase-Speicherverhalten fuer Shopping-Aktionen bleibt unveraendert.
- Die effektive Trefferflaeche darf groesser werden, ohne Checkboxen visuell unverhaeltnismaessig gross zu machen.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus und betroffenen Codepfade.
- Aendern von:
  - `index.html`
  - `app/modules/shopping.js`
  - `app/modules/writing.js`, nur falls S1-S3 belegen, dass `Aendern` oder ein gemeinsames UI-Muster sonst inkonsistent bricht
  - `app/core/router.js`, nur falls die vorhandene `[data-nav]`-Navigation fuer `Aendern` eng angepasst werden muss
  - `app/styles/ui.css`
  - `app/styles/shopping.css`
  - `app/styles/writing.css`, nur falls S1-S3 belegen, dass ein gemeinsames UI-Muster sonst inkonsistent bricht
  - `app/styles/home.css`, nur falls Navigations-Hierarchie es erfordert
  - betroffene Module Overviews und `docs/QA_CHECKS.md`
- Lokale Syntaxchecks:
  - `node --check` fuer geaenderte JS-Dateien
  - `git diff --check`
- Lokaler Browser-Smoke ueber `python -m http.server 8766` oder freien Alternativport.

Forbidden:

- Aendern von SQL/RLS/Supabase-Schema.
- Aendern von `assets/js/semantics.de.json`.
- Einfuehren neuer Dependencies oder Build-Tools.
- Auto-Save-, Push-, Reminder-, Historien- oder Undo-Logik bauen.
- Einkaufsapps, Organizer-Features oder Geolocation in dieser Roadmap implementieren.
- Den Home-Hub zu einem Dashboard erweitern.
- Bestehende Nutzer- oder Household-Sync-Vertraege still umdeuten.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Detektivarbeit, Contract Review, UI-/Copy-/Risikoanalyse.
- S4 ist die Umsetzung und wird in kleine Substeps geteilt.
- S5 prueft lokal moegliche Syntax-, UI-, Sync- und Regression-Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnisprotokolle.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 09.05.2026

Review-Frage:

- Bleibt Roadmap 1 innerhalb des HESTIA-Produktvertrags, wenn sie Shopping ergonomischer macht, direkte Moduswechsel prueft und destruktive Aktionen neu hierarchisiert?

Entscheidung:

- Ja, sofern die Roadmap strikt als Ergonomie- und Hierarchiearbeit fuer den bestehenden Einkaufsfluss behandelt wird.

Findings:

- CR-F1: Der Begriff "direkter Moduswechsel" koennte als dritte Navigationsebene oder persistente App-Nav missverstanden werden.
- CR-F2: "Destruktive Aktionen sauberer hierarchisieren" darf nicht automatisch Undo, Historie oder laute Sicherheitsdialog-Maschinerie einfuehren.
- CR-F3: Groessere Trefferflaechen duerfen den Papierlisten-Charme nicht visuell zerstoeren.
- CR-F4: Wenn `Loeschen` oder `Liste leeren` mitberuehrt werden, darf Roadmap 1 nicht in Roadmap 2 Writing-Redesign kippen.
- CR-F5: Die erste Fassung erlaubte Writing-Dateien noch zu breit; das kann Roadmap 1 unnoetig in Roadmap 2 ziehen.

Korrektur:

- CR-F1 bis CR-F5 wurden in Scope, Tool Permissions, Not in Scope, Guardrails, Architektur-Constraints und S4-Pflichtpunkte eingearbeitet.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | System- und Vertragsdetektivarbeit | DONE | Doku und Codepfade gelesen; Shopping-Ergonomie, Navigations- und Aktions-Hierarchie-Findings dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Zielvertrag finalisiert: nur Interaktions-/Hierarchiearbeit, keine Daten-, Sync-, Home- oder Writing-Ausweitung. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | Bruchrisiken, Copy-/Touch-Vertrag und konkrete S4-Pflichtpunkte finalisiert. |
| S4 | Umsetzung | DONE | S4.1 bis S4.7 umgesetzt, reviewed und mit lokalen Checks abgenommen; Browser-/Touch-Smokes bleiben fuer S5. |
| S5 | Tests, UI Review und Contract Review | DONE | Lokale Checks gruen; Desktop-/Mobile-Abnahme durch Stephan erfolgreich; Live-Sync-Smoke nicht anwendbar, da HESTIA aktuell bewusst keinen Live-Sync-Flow nutzt. |
| S6 | Doku-Sync, QA-Update und Abschlussreview | DONE | Module Overviews, QA, Future-Roadmap und Roadmap-Abschluss synchronisiert. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System- und Vertragsdetektivarbeit

Ziel:

- Bestehenden Einkaufsflow verstehen.
- Betroffene Source-of-Truth-Dokus lesen.
- Codepfade identifizieren.
- Noch keinen Code aendern, ausser diese Roadmap selbst wird aktualisiert.

Substeps:

- S1.1 README und `PRODUCT.md` erneut lesen.
- S1.2 Shopping, Writing, Home, State, Sync und CSS Module Overviews lesen.
- S1.3 `docs/future roadmaps.md` gegen diese Roadmap abgleichen.
- S1.4 Betroffene HTML-, JS- und CSS-Pfade lesen.
- S1.5 Ist-Zustand dokumentieren:
  - Shopping-Zeilen und Checkbox-Interaktion
  - `Liste abschliessen`
  - `Aendern`
  - Rueckweg zu Home
  - gemeinsame Button-/Link-Muster
- S1.6 Offene Fragen und erste Findings dokumentieren.
- S1.7 S1 Contract Review.
- S1.8 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Systemkarte fuer den aktuellen Einkaufsflow.
- Relevante Dateien.
- Bestehender Vertrag fuer Interaktion, State und Sync.
- Erste Findings fuer S2/S3.

Exit-Kriterium:

- Es ist klar, welche Schichten betroffen sind und welche nicht.

### S1 Ergebnisprotokoll 09.05.2026

Durchgefuehrt:

- README und `PRODUCT.md` gegen den geplanten Einkaufsflow-Scope geprueft.
- Betroffene Module Overviews gelesen:
  - Shopping
  - Writing
  - Home
  - State Layer
  - Supabase Sync
  - CSS
  - QA
- `docs/future roadmaps.md` gegen Roadmap 1 abgeglichen.
- Betroffene Codepfade gelesen:
  - `index.html`
  - `app/modules/shopping.js`
  - `app/modules/writing.js`
  - `app/core/router.js`
  - `app/core/state.js`
  - `app/supabase/list-sync.js`
  - `app/main.js`
  - `app/styles/shopping.css`
  - `app/styles/ui.css`
  - `app/styles/layout.css`
  - `app/styles/home.css`
  - `app/styles/writing.css`

Aktueller Einkaufsflow:

- Home zeigt zwei primaere Intent-Karten: `Schreiben` und `Einkaufen`.
- Writing und Shopping haben jeweils einen Header-Link `Zur Startseite`.
- Shopping besitzt zusaetzlich unten `Aendern` als direkten Wechsel nach `Schreiben`.
- `app/core/router.js` ist bewusst simpel: alle `[data-nav]`-Buttons wechseln nur den aktiven Screen.
- `app/modules/shopping.js` rendert die Einkaufsliste komplett aus `store.state.items`.
- Checkbox-`change` ruft `store.toggleInCart(...)`, dispatcht `hestia:items-updated` und speichert bei konfiguriertem Sync den Snapshot mit reason `shopping-toggle`.
- `Liste abschliessen` ruft `store.finishShopping()`, entfernt damit alle `inCart = true`, dispatcht `hestia:items-updated` und speichert den Snapshot mit reason `shopping-finish`.
- `app/core/state.js` haelt den stabilen Vertrag `id`, `name`, `quantity`, `unit`, `inCart`; fuer Roadmap 1 ist keine State-Erweiterung noetig.
- `app/supabase/list-sync.js` normalisiert nur zwischen `inCart` und `in_cart`; fuer Roadmap 1 ist keine Sync- oder Schema-Aenderung noetig.

Findings:

- S1-F1: Die effektive Shopping-Trefferflaeche ist heute die Checkbox bzw. ihr Labelbereich. Die Papierzeile wirkt visuell wie ein Eintrag, ist aber nicht als ganze Zeile einhaendig tapbar.
- S1-F2: Checkbox- und Label-Struktur ist klein und semantisch brauchbar, aber eine spaetere Zeilen-Tap-Umsetzung muss doppelte Toggle-Events verhindern.
- S1-F3: `Liste abschliessen` ist auch sichtbar/aktiv, wenn keine Zeile im Wagen ist. Fachlich passiert dann nichts Gefaehrliches, aber die Aktionshierarchie ist im Einkauf weniger eindeutig als noetig.
- S1-F4: `Aendern` ist bereits ein direkter Wechsel nach `Schreiben`, aber als kleiner Textlink unten im Panel wenig praesent. Der eigentliche Bedarf ist wahrscheinlich eher Hierarchie und Auffindbarkeit, nicht eine neue Navigationsarchitektur.
- S1-F5: `Zur Startseite` existiert weiterhin in Headern. Roadmap 1 darf den Home-Hub nicht abschaffen; ein direkterer Wechsel darf Home nur ergaenzen, nicht ersetzen.
- S1-F6: Shopping-Zeilen werden aktuell per `innerHTML` aus Item-Daten gebaut. Wenn S4 die Shopping-Zeile ohnehin anfasst, sollte die neue Struktur bevorzugt DOM-Knoten mit `textContent` nutzen, statt die bestehende String-Interpolation zu erweitern.
- S1-F7: Die relevanten Styles liegen bereits sauber getrennt: Papierliste und Checkboxen in `shopping.css`, globale Buttons/Links/Listenmuster in `ui.css`, Layout in `layout.css`. Roadmap 1 braucht keine neue CSS-Datei.

Korrekturen fuer Folgephasen:

- S3 muss explizit pruefen, ob `Liste abschliessen` nur bei mindestens einem `inCart`-Eintrag primaer/aktiv wirken soll.
- S3/S4 muessen die vorhandene `Aendern`-Funktion als Ausgangspunkt nehmen, statt automatisch eine neue Navigation zu erfinden.
- S4.1 muss bei einer Zeilen-Tap-Umsetzung doppelte Toggle-Ausloesung verhindern.
- S4.1 soll beim Umbau der Shopping-Zeile DOM-Erzeugung mit `textContent` pruefen, ohne daraus einen repo-weiten Render-Refactor zu machen.
- S4 bleibt voraussichtlich auf `shopping.js`, `shopping.css`, `ui.css`, `layout.css`, `index.html` und QA/Doku begrenzbar. `writing.js` und `writing.css` bleiben nur Reserve bei belegter UI-Muster-Kopplung.

S1 Contract Review:

- Roadmap 1 bleibt nach S1 innerhalb des Produktvertrags.
- Keine Findings erfordern Datenmodell-, Sync-, SQL-, RLS-, Push-, Organizer- oder Einkaufsapps-Arbeit.
- Der bestehende direkte Wechsel `Aendern` bestaetigt, dass der Navigationsbedarf klein zu halten ist.
- Die Papierlisten-Aesthetik bleibt Zielzustand und wird nicht als Problem behandelt.
- Keine offenen P0/P1-Vertragsrisiken fuer den Start von S2/S3.

S1 Abschluss:

- S1 ist abgeschlossen.
- Doku-Sync-Entscheidung: keine Module Overviews jetzt aendern; S6 synchronisiert nur, was S4 wirklich veraendert.
- Commit-Empfehlung: noch kein separater Commit; sinnvoll zusammen mit Roadmap-/S1-Dokumentation oder nach spaeterer Umsetzung.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Zielidee gegen bestehende HESTIA-Vertraege pruefen.
- Klaeren, ob die Roadmap in Scope bleibt.
- Finalen Zielvertrag fuer die Umsetzung festlegen.

Substeps:

- S2.1 Ziel gegen README-/PRODUCT-Guardrails pruefen.
- S2.2 Ziel gegen Shopping-, State- und Sync-Overviews pruefen.
- S2.3 Ziel gegen Home-Hub-Hierarchie pruefen.
- S2.4 Ziel gegen CSS-Owner-Vertrag pruefen.
- S2.5 Zielvertrag dokumentieren:
  - welche Interaktionen duerfen sich aendern
  - welche Daten-/Sync-Vertraege bleiben stabil
  - welche Home-/Navigation-Grenzen gelten
- S2.6 Pflichtkorrekturen fuer S4 definieren.
- S2.7 Contract Review S2.
- S2.8 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Belastbarer Zielvertrag.
- Explizite Abgrenzung.
- Erste S4-Pflichtpunkte.

Exit-Kriterium:

- Umsetzung kann starten, ohne dass Grundsatzfragen offen sind.

### S2 Ergebnisprotokoll 09.05.2026

Durchgefuehrt:

- Ziel gegen README-/PRODUCT-Guardrails geprueft.
- Ziel gegen Shopping-, State- und Sync-Overviews geprueft.
- Ziel gegen Home-Hub-Hierarchie geprueft.
- Ziel gegen CSS-Owner-Vertrag geprueft.
- S1-Findings in einen verbindlichen Zielvertrag fuer S3/S4 uebersetzt.

Zielvertrag:

- Roadmap 1 ist eine Ergonomie- und Hierarchie-Roadmap fuer den bestehenden Einkaufsflow.
- `Im Wagen` bleibt der einzige Einkaufsstatus.
- Die ganze Shopping-Zeile darf als zusaetzliche Trefferflaeche dienen, muss aber exakt dieselbe fachliche Aktion ausloesen wie die Checkbox.
- Checkbox bleibt sichtbar, semantisch erreichbar und proportional zur Papierliste.
- `Liste abschliessen` bleibt der bewusste harte Abschluss gekaufter Eintraege; nur `inCart = true` darf entfernt werden.
- Der Aktiv-/Leerzustand von `Liste abschliessen` darf UI-seitig klarer werden, darf aber keine neue Fachregel oder Undo-Ebene einfuehren.
- `Aendern` bleibt der vorhandene direkte Wechsel nach `Schreiben`; S4 darf seine Auffindbarkeit und Hierarchie verbessern, soll aber keine persistente App-Navigation oder dritte Hauptnavigation bauen.
- `Zur Startseite` und der Home-Hub bleiben erhalten. Home bleibt ruhiger Start-Hub mit genau zwei primaeren Intentionen.
- Der Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` bleibt unveraendert.
- Sync-Verhalten bleibt unveraendert:
  - Toggle speichert bei Konfiguration weiter reason `shopping-toggle`.
  - Abschluss speichert bei Konfiguration weiter reason `shopping-finish`.
  - Realtime spiegelt den Snapshot weiter als Remote-State.
- Styling bleibt in bestehenden Owner-Dateien:
  - Shopping-spezifisch nach `app/styles/shopping.css`
  - globale Button-/Link-/Listenmuster nach `app/styles/ui.css`
  - Layout nur bei echtem Strukturbedarf nach `app/styles/layout.css`

Findings:

- S2-F1: "Direkter Moduswechsel" ist als eigener S4-Substep zu breit. S1 hat gezeigt, dass `Aendern` bereits existiert; die Roadmap braucht eher eine Hierarchieverbesserung als Navigationsarchitektur.
- S2-F2: `Liste abschliessen` als Leerzustand braucht einen klaren Vertrag: UI darf deaktivieren oder visuell zuruecknehmen, aber die State-Operation `finishShopping()` bleibt unveraendert.
- S2-F3: Die Roadmap nennt `Loeschen` / `Liste leeren` als Review-Grenze. S2 bestaetigt, dass diese Aktionen nicht aktiv umgesetzt werden sollen, ausser S3 beweist eine konkrete gemeinsame UI-Muster-Kopplung.
- S2-F4: `writing.js` und `writing.css` sind als Code-Referenzen sinnvoll, aber fuer die Umsetzung nicht aktiv geplant.
- S2-F5: Einige alte Roadmap-Formulierungen sprachen noch zu breit von direktem Moduswechsel und Home-Hierarchie, obwohl S2 den Vertrag auf `Aendern`-Auffindbarkeit begrenzt hat.

Korrekturen fuer Folgephasen:

- S4.4 wird von "direkten Wechsel umsetzen" zu "`Aendern`-Hierarchie und Rueckwege pruefen/ggf. veredeln" geschaerft.
- S4.5 wird als optionaler Review-Schritt fuer gemeinsame Muster markiert, nicht als geplanter Umsetzungsschritt.
- S3 muss fuer `Liste abschliessen` entscheiden, ob deaktiviert, visuell zurueckgenommen oder unveraendert gelassen wird.
- S3 muss pruefen, ob `Aendern` besser als Button, Link oder sekundare Aktionsflaeche wirkt, ohne Home abzuwerten.
- Alte direkte-Moduswechsel-Formulierungen wurden auf `Aendern`-Auffindbarkeit und bestehende Navigation begrenzt.

S2 Contract Review:

- Roadmap 1 erfuellt die drei HESTIA-Prueffragen:
  - Sie hilft dem gemeinsamen Einkaufsfluss, weil Einkaufen unterwegs direkter wird.
  - Sie macht Einkaufen ruhiger und klarer, ohne neue Feature-Breite.
  - Sie reduziert Bedienreibungen, statt neue Verwaltung zu erzeugen.
- Keine S2-Entscheidung verletzt den stabilen Datenvertrag.
- Keine S2-Entscheidung erfordert neue State-Operationen, SQL/RLS, Supabase-Schema, Push, Organizer, Einkaufsapps oder Geolocation.
- Home bleibt in Scope nur als Hierarchie-Grenze, nicht als aktive Umbauflaeche.
- Keine offenen P0/P1-Vertragsrisiken fuer S3.

S2 Abschluss:

- S2 ist abgeschlossen.
- Doku-Sync-Entscheidung: keine Module Overviews jetzt aendern; S6 synchronisiert nur real umgesetzte Verhaltensaenderungen.
- Commit-Empfehlung: noch kein separater Commit; Roadmap-Doku kann spaeter mit S3 oder Umsetzung zusammen committed werden.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Risiken finden, bevor Code geaendert wird.
- User-facing Texte und Interaktionen gegen Produktrealitaet pruefen.
- Konkrete S4-Substeps ableiten.

Substeps:

- S3.1 Bruchrisiken identifizieren:
  - Checkbox und Zeile feuern doppelt
  - Label-/Input-Klick erzeugt doppelte Toggles
  - mobile Trefferflaechen verschieben Papierlisten-Layout
  - Desktop wird durch mobile Optimierung zu breit oder zu leer
  - `Liste abschliessen` wirkt zu stark oder zu riskant
  - `Liste abschliessen` wirkt aktiv, obwohl kein Eintrag im Wagen ist
  - `Aendern`-Veredelung macht Home als Start-Hub unklar
  - Realtime-Echo erzeugt unerwartetes UI-Flackern
- S3.2 User-Facing Copy Review:
  - `Im Wagen` bleibt alltagssprachlich
  - `Liste abschliessen` bleibt klar, aber nicht alarmistisch
  - `Aendern` und Rueckwege bleiben kurz und ruhig
  - destruktive Aktionen wirken nicht wie primaere Alltagsaktionen
- S3.3 Accessibility-/Touch-Review:
  - effektive Trefferflaechen gross genug
  - sichtbarer Fokus bleibt brauchbar
  - Checkbox bleibt semantisch erreichbar
  - Keyboard-Bedienung wird nicht schlechter
- S3.4 Tooling und lokal moegliche Checks klaeren.
- S3.5 S4-Substeps konkretisieren.
- S3.6 Contract Review S3.
- S3.7 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Bruchrisiko-Liste.
- Copy- und Interaktionsvertrag.
- Konkreter Umsetzungsplan fuer S4.

Exit-Kriterium:

- S4 hat klare Substeps und bekannte Review-Kriterien.

### S3 Ergebnisprotokoll 09.05.2026

Durchgefuehrt:

- Bruchrisiken aus S1/S2 gegen den aktuellen Shopping-Code geprueft.
- UI- und Copy-Vertrag fuer Shopping-Zeilen, `Liste abschliessen` und `Aendern` festgelegt.
- Touch-/Accessibility-Anforderungen fuer einhaendige Nutzung abgeleitet.
- Lokal moegliche Checks fuer S4/S5 konkretisiert.
- S4-Substeps geschaerft.

Bruchrisiken:

- S3-F1: Wenn die ganze Zeile klickbar wird, kann ein Label-/Input-/Row-Mix doppelte Toggle-Events erzeugen. S4 muss einen einzigen Toggle-Pfad pro Nutzerimpuls sicherstellen.
- S3-F2: Eine interaktive Zeile mit eingebetteter Checkbox kann semantisch unruhig werden. Checkbox muss sichtbar und bedienbar bleiben; Row-Tap ist eine zusaetzliche Convenience-Schicht, kein Ersatz fuer das Eingabeelement.
- S3-F3: `finishShopping()` darf nicht veraendert werden. Der Leerzustand von `Liste abschliessen` ist eine UI-Frage, keine neue State-Regel.
- S3-F4: Wenn `Liste abschliessen` disabled wird, darf der globale `.surface-button[disabled]`-Stil nicht faelschlich wie ein Busy-/Speicherzustand wirken.
- S3-F5: `Aendern` als kleiner Textlink ist fuer Touch und Einkaufshektik schwach, aber eine vollwertige neue Hauptnavigation waere zu breit. S4 soll nur die bestehende Aktion groesser und klarer machen.
- S3-F6: Papierlisten-Zeilen duerfen beim `Im Wagen`-Zustand nicht wie erledigte Aufgaben in einer Productivity-App wirken. Der Zustand soll klar, aber weiterhin charmant und ruhig sein.
- S3-F7: Text kann in Shopping-Zeilen lang werden. S4 muss sicherstellen, dass Name und Menge nicht ueberlappen und die Papierlinien nicht unruhig brechen.
- S3-F8: Realtime-Refresh nach lokalem Toggle darf durch Zeilen-Render nicht visuell flattern oder mehrfach wirken. Der State bleibt Source of Truth; UI darf keine zweite lokale Zwischenwahrheit einfuehren.

User-Facing Copy Vertrag:

- `Im Wagen` bleibt der fachliche Statusbegriff.
- `Liste abschliessen` bleibt die Abschlussaktion und wird nicht alarmistisch umbenannt.
- Kein Confirm-Text, kein Undo-Text und keine Historien-Sprache in Roadmap 1.
- `Aendern` bleibt kurz und alltagstauglich; falls die Flaeche groesser wird, bleibt der Begriff erhalten.
- Leere Liste zeigt weiter `Alles erledigt.`.
- Ein deaktivierter oder zurueckgenommener Abschlusszustand darf nicht wie ein Fehler klingen.

Touch-/Accessibility-Vertrag:

- Die effektive Trefferflaeche einer Shopping-Zeile soll mobile-tauglich sein.
- Checkbox bleibt sichtbar, fokussierbar und direkt bedienbar.
- Tastaturbedienung darf nicht schlechter werden.
- Row-Tap darf nicht mit Checkbox-Change konkurrieren.
- Fokus- und Hover-Zustand sollen ruhig sichtbar sein, ohne die Papierliste laut zu machen.
- Mobile und Desktop duerfen unterschiedliche Abstaende nutzen, aber keine unterschiedliche Fachlogik.

S4 Pflichtentscheidungen:

- S4.1 baut die Shopping-Zeile so um, dass Item-Daten nicht weiter per `innerHTML` interpoliert werden, sofern der Umbau die Zeile ohnehin beruehrt.
- S4.1 muss eine kleine lokale Toggle-Hilfsfunktion in `app/modules/shopping.js` verwenden, damit Row-Tap und Checkbox denselben Pfad nutzen.
- S4.1 muss Event-Doppelungen zwischen Row, Label und Checkbox explizit verhindern.
- S4.2 setzt einen ruhigen `inCart`-Zustand an der Zeile um, ohne neuen Status.
- S4.3 prueft und setzt voraussichtlich einen klaren Leerzustand fuer `Liste abschliessen`, wenn keine Items im Wagen sind.
- S4.3 muss den disabled/idle-Stil fuer `Liste abschliessen` so schneiden, dass er nicht wie ein laufender Speichervorgang wirkt.
- S4.4 veredelt `Aendern` als bestehende Aktion, wahrscheinlich ueber groessere Trefferflaeche oder sekundare Button-Optik, ohne neue Navigation.
- S4.5 bleibt optional und wird nur ausgefuehrt, wenn S4.3/S4.4 eine konkrete gemeinsame UI-Muster-Kopplung zu Writing zeigt.

Lokal moegliche Checks:

- `node --check app/modules/shopping.js`
- `git diff --check`
- Browser-Smoke auf lokalem HTTP-Server:
  - Zeile toggelt genau einmal.
  - Checkbox toggelt genau einmal.
  - Abschluss entfernt nur markierte Eintraege.
  - Abschluss-Leerzustand ist klar.
  - `Aendern` fuehrt nach `Schreiben`.
  - Home bleibt unveraendert erreichbar.
- Mobile/kleiner Viewport Smoke:
  - keine Ueberlappung von Name und Menge
  - Trefferflaechen brauchbar
  - Papierlisten-Charme bleibt erhalten

S3 Contract Review:

- S3 bleibt innerhalb des S2-Zielvertrags.
- Keine S3-Entscheidung fuehrt neue Fachlogik, neuen Status, Undo, Historie, Push, Organizer, Einkaufsapps oder Geolocation ein.
- `finishShopping()` und `toggleInCart(...)` bleiben die fachlichen State-Operationen.
- `Aendern` bleibt vorhandene Navigation nach `Schreiben`, keine neue App-Navigation.
- Writing bleibt nur Reserve fuer nachgewiesene gemeinsame UI-Muster-Kopplung.
- Keine offenen P0/P1-Vertragsrisiken fuer S4.

S3 Abschluss:

- S3 ist abgeschlossen.
- Doku-Sync-Entscheidung: keine Module Overviews jetzt aendern; S6 synchronisiert nach realer Umsetzung.
- Commit-Empfehlung: noch kein separater Commit; Roadmap-Doku kann mit S4 oder S6 zusammen committed werden.

## S4 - Umsetzung

Ziel:

- Gefundene Punkte sequenziell umsetzen.
- Nicht alles auf einmal aendern.
- Nach jedem Substep direkt pruefen und dokumentieren.

Substeps:

- S4.1 Shopping-Zeile als moderne Trefferflaeche vorbereiten.
  - Die ganze Zeile darf `inCart` toggeln.
  - Checkbox bleibt semantisch vorhanden und sichtbar.
  - Doppelte Toggle-Ausloesung muss verhindert werden.
  - Beim Umbau der Zeilenstruktur bevorzugt sichere DOM-Erzeugung mit `textContent` pruefen.
  - Row-Tap und Checkbox muessen denselben lokalen Toggle-Pfad in `app/modules/shopping.js` nutzen.
- S4.2 Papierlisten-Zustand fuer `Im Wagen` visuell veredeln.
  - Charme bleibt.
  - Gekaufte Zeilen sind klar erkennbar, aber nicht laut.
  - Keine neue Statuslogik.
- S4.3 Shopping-Aktionshierarchie ueberarbeiten.
  - `Liste abschliessen` bleibt klar als Abschlussaktion.
  - Aktiv-/Leerzustand von `Liste abschliessen` gegen echte `inCart`-Eintraege pruefen.
  - Disabled-/Leerzustand darf nicht wie Busy/Speichern wirken.
  - `Aendern` bleibt sekundar, aber leichter auffindbar.
  - Keine Undo-, Historien- oder laute Sicherheitsdialog-Maschinerie einfuehren.
- S4.4 `Aendern`-Hierarchie und Rueckwege pruefen und ggf. klein veredeln.
  - Der vorhandene direkte Wechsel nach `Schreiben` ist Ausgangspunkt.
  - Nur wenn die Veredelung die zwei Kernintentionen staerkt.
  - Home bleibt ruhiger Start-Hub und darf nicht zum Dashboard werden.
- S4.5 Gemeinsame destruktive Aktionsmuster nur bei belegtem Bedarf angleichen.
  - Falls `Loeschen` oder `Liste leeren` visuell mitbetroffen sind, muss S1-S3 den Bedarf vorher begruenden.
  - Kein Writing-Redesign in dieser Roadmap.
- S4.6 Laufende Code- und Contract Reviews dokumentieren.
- S4.7 Schritt-Abnahme.

Jeder S4-Substep dokumentiert:

- Umsetzung
- betroffene Dateien
- lokaler Check
- Contract Review
- Findings
- Korrekturen
- Restrisiko

Output:

- Veredelter Einkaufsflow mit gleicher fachlicher Wahrheit.

Exit-Kriterium:

- Alle priorisierten Findings aus S1-S3 sind umgesetzt oder bewusst abgegrenzt.

### S4.1 Ergebnisprotokoll 09.05.2026

Umsetzung:

- `app/modules/shopping.js`
  - Kleine lokale Hilfsfunktion `toggleCartItem(itemId, checked)` eingefuehrt.
  - Checkbox-Change nutzt jetzt diesen einen lokalen Toggle-Pfad.
  - Shopping-Zeilen werden ueber DOM-Knoten mit `textContent` aufgebaut.
  - Itemdaten werden nicht mehr per `innerHTML` in die Zeile interpoliert.
  - Die ganze sichtbare Shopping-Zeile liegt in einem `label`, sodass Zeilentap und Checkbox ueber den nativen Checkbox-Change laufen.
- `app/styles/shopping.css`
  - `.shopping-item-action` als volle Zeilen-Trefferflaeche ergaenzt.
  - Zeilen-Padding von `li.item-row` auf das Label verschoben, damit die sichtbare Papierzeile tapbar ist.
  - Ruhiger `focus-within`-Zustand fuer die Checkbox-/Zeilenbedienung ergaenzt.

Code Review:

- Erste Implementierungsfassung mit `input` innerhalb eines `button` wurde verworfen, weil das semantisch falsch gewesen waere.
- Korrigierte Fassung nutzt ein vollflaechiges `label` mit sichtbarer Checkbox.
- Row-Tap und Checkbox laufen ueber denselben Checkbox-`change`-Handler und rufen nur `toggleCartItem(...)`.
- Es gibt keinen zusaetzlichen Row-`click`-Handler mehr; damit ist das Doppel-Toggle-Risiko fuer S4.1 reduziert.
- `innerHTML` bleibt nur fuer den statischen Leerzustand und zum Leeren der Liste erhalten; keine Itemdaten werden mehr interpoliert.

Contract Review:

- Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` unveraendert.
- State-Operation bleibt `store.toggleInCart(...)`; keine neue State-Operation.
- Sync-Verhalten bleibt unveraendert:
  - reason `shopping-toggle`
  - `persistSharedState("shopping-toggle")`
  - `hestia:items-updated` mit `source: "local"`
- `finishShopping()` und Abschlusslogik wurden nicht angefasst.
- Keine Aenderung an SQL, RLS, Supabase-Schema, Writing, Home, Semantik, Push, Organizer oder Einkaufsapps.
- Papierlisten-Stil bleibt erhalten; S4.2 uebernimmt spaeter den sichtbaren `inCart`-Zustand.

Checks:

- `node --check app/modules/shopping.js` -> gruen.
- `git diff --check -- app/modules/shopping.js app/styles/shopping.css` -> keine Whitespace-Fehler; Git meldet nur Zeilenendungswarnungen (`LF will be replaced by CRLF the next time Git touches it`).
- Statischer Scan:
  - nur ein fachlicher Toggle-Pfad in `shopping.js`
  - keine `querySelectorAll("[data-toggle]")`-Nachverdrahtung mehr
  - kein Row-`click`-Handler
  - Itemdaten laufen ueber `textContent`

Nicht lokal ausgefuehrt:

- Browser-/Touch-Smoke wurde fuer S4.1 nicht automatisiert ausgefuehrt, weil lokal weder `playwright` noch `jsdom` verfuegbar sind.
- Der echte Interaktions-Smoke bleibt fuer S5 bzw. den naechsten Browserlauf offen:
  - Zeilentap toggelt genau einmal.
  - Checkbox toggelt genau einmal.
  - Fokus bleibt sichtbar.
  - Name und Menge ueberlappen nicht.

Findings und Korrekturen:

- S4.1-F1: Erste Row-Tap-Idee haette `input` in `button` verschachtelt. Korrektur: vollflaechiges `label` statt Button.
- S4.1-F2: Label war zunaechst breit, aber Zeilen-Padding lag noch ausserhalb der Trefferflaeche. Korrektur: Padding auf `.shopping-item-action` verschoben.

Restrisiko:

- Ohne echten Browser-Smoke bleibt ein kleines Restrisiko bei mobiler Touch-Haptik und visuellem Fokus. Dieses Risiko wird in S5 gezielt geprueft.

### S4.2 Ergebnisprotokoll 09.05.2026

Umsetzung:

- `app/modules/shopping.js`
  - Shopping-Zeilen bekommen bei `item.inCart === true` die Klasse `is-in-cart`.
  - Keine neue Fachlogik und kein neuer Status wurden eingefuehrt.
- `app/styles/shopping.css`
  - `is-in-cart` bekommt einen ruhigen, sichtbaren Zustand:
    - dezente Saettigungs-/Deckkraftreduktion
    - durchgestrichener Produktname
    - zurueckgenommene Mengeninfo
    - etwas waermerer Checkbox-Akzent
  - Grundlegende Papierlisten-Struktur aus S4.1 bleibt unveraendert.

Code Review:

- Der sichtbare Zustand haengt nur an `item.inCart`.
- Es gibt keine neue Statusklasse jenseits der reinen CSS-Hook-Klasse `is-in-cart`.
- `toggleCartItem(...)`, `store.toggleInCart(...)`, `persistSharedState("shopping-toggle")` und `finishShopping()` bleiben unveraendert.
- Die erste S4.2-Fassung setzte ein `aria-label` auf das vollflaechige Label. Das wurde entfernt, damit die Checkbox-/Label-Semantik nicht unnoetig ueberlagert wird.
- Die erste Deckkraft von `0.62` wurde auf `0.72` angehoben, damit gekaufte Zeilen im echten Einkauf weiter gut lesbar bleiben.

Contract Review:

- `Im Wagen` bleibt der einzige operative Einkaufsstatus.
- Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` unveraendert.
- Keine neue State-Operation, kein neuer Sync-Grund, keine SQL-/RLS-/Schema-Aenderung.
- Keine Undo-, Historien-, Organizer-, Push- oder Einkaufsapps-Logik.
- Papierlisten-Charme bleibt Ziel; der Zustand ist klar, aber nicht laut.

Checks:

- `node --check app/modules/shopping.js` -> gruen.
- `git diff --check -- app/modules/shopping.js app/styles/shopping.css docs/HESTIA Einkaufsflow Veredeln Roadmap.md` -> keine Whitespace-Fehler; Git meldet nur Zeilenendungswarnungen fuer `shopping.js` und `shopping.css`.
- Statischer Scan:
  - `is-in-cart` wird nur aus `item.inCart` abgeleitet.
  - `toggleInCart(...)`, `shopping-toggle` und `shopping-finish` bleiben unveraendert vorhanden.
  - Keine neuen Datenfelder oder Statuswerte eingefuehrt.

Nicht lokal ausgefuehrt:

- Browser-/Touch-Smoke weiter offen, weil lokal weder `playwright` noch `jsdom` verfuegbar sind.
- S5 muss visuell pruefen:
  - gekaufte Zeilen bleiben lesbar
  - Zustand wirkt nicht wie generische Task-App
  - Name und Menge ueberlappen nicht

Findings und Korrekturen:

- S4.2-F1: `aria-label` auf dem Label war unnoetig und potenziell stoerend fuer native Checkbox-Semantik. Korrektur: entfernt.
- S4.2-F2: Gekaufte Zeilen waren mit `opacity: 0.62` wahrscheinlich zu blass. Korrektur: auf `0.72` angehoben.

Restrisiko:

- Die genaue visuelle Balance des `inCart`-Zustands muss im Browser und besonders mobil noch geprueft werden.

### S4.3 Ergebnisprotokoll 09.05.2026

Umsetzung:

- `app/modules/shopping.js`
  - Kleine abgeleitete Pruefung `hasCartItems()` eingefuehrt.
  - `updateFinishButtonState()` deaktiviert `Liste abschliessen`, solange kein Eintrag `inCart = true` ist.
  - Der Buttonzustand wird bei jedem `render()` neu aus dem aktuellen Store abgeleitet.
  - Der Click-Handler besitzt zusaetzlich einen fruehen Guard, damit im Leerzustand kein Abschluss-Log und kein Sync-Grund `shopping-finish` ausgeloest wird.
- `app/styles/shopping.css`
  - Shopping-spezifischer Disabled-/Idle-Stil fuer `#finish-shopping:disabled` ergaenzt.
  - Der Disabled-Zustand ueberschreibt den globalen Busy-artigen Cursor und wirkt dadurch ruhig statt wie ein laufender Speichervorgang.
  - `Aendern` bleibt eine sekundare Aktion, bekommt im Shopping-Footer aber eine groessere Touch-Flaeche und eine leise Umrandung.

Code Review:

- `finishShopping()` wurde nicht veraendert und entfernt weiterhin nur `inCart = true`.
- Der neue Buttonzustand ist reine UI-Ableitung aus `store.state.items.some((item) => item.inCart)`.
- Es gibt keinen neuen Persistenzstatus, keine Historie, kein Undo und keinen Dialog.
- Der Abschluss-Guard verhindert unnoetige `shopping-finish`-Events im Leerzustand, ohne eine neue fachliche State-Regel einzufuehren.
- Die neuen CSS-Regeln sind auf `#screen-shopping` begrenzt und veraendern keine globalen Button- oder Writing-Muster.

Contract Review:

- Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` unveraendert.
- `Im Wagen` bleibt einziger operativer Einkaufsstatus.
- `Liste abschliessen` bleibt die klare Abschlussaktion und wird nicht alarmistisch umbenannt.
- `Aendern` bleibt die vorhandene Navigation nach `Schreiben`; keine neue Hauptnavigation, kein Dashboard und kein Organizer-Scope.
- Keine Aenderung an SQL, RLS, Supabase-Schema, Sync-Schema, Writing, Home oder Semantik-Dateien.

Checks:

- `node --check app/modules/shopping.js` -> gruen.
- Temporaerer Node-Smoke ohne Dateischreiberei -> gruen:
  - ohne `inCart` ist `Liste abschliessen` deaktiviert
  - mit `inCart` ist `Liste abschliessen` aktiv
  - nach Abschluss ist der Button wieder deaktiviert
- `git diff --check -- app/modules/shopping.js app/styles/shopping.css` -> keine Whitespace-Fehler; Git meldet nur bekannte Zeilenendungswarnungen fuer `shopping.js` und `shopping.css`.
- Statischer Scan:
  - `hasCartItems()` ist nur aus `item.inCart` abgeleitet
  - `shopping-finish` bleibt am bestehenden Abschluss-Handler
  - Disabled-/Aendern-Styles sind auf `#screen-shopping` begrenzt

Nicht lokal ausgefuehrt:

- Browser-/Touch-Smoke weiter offen, weil lokal kein Playwright/jsdom-Testsetup im Repo vorhanden ist.
- S5 muss visuell pruefen:
  - Disabled-Zustand wirkt nicht wie Speichern oder Busy
  - `Aendern` bleibt sekundar und ueberstrahlt `Liste abschliessen` nicht
  - mobile Footer-Aktionen brechen sauber und bleiben gut antippbar

Findings und Korrekturen:

- S4.3-F1: Der globale `.surface-button[disabled]`-Stil nutzt `cursor: progress` und wuerde im Shopping-Kontext wie Busy/Speichern wirken. Korrektur: Shopping-spezifischer Disabled-Stil mit `cursor: default`.
- S4.3-F2: `Aendern` war als reiner Textlink im Shopping-Footer sehr klein. Korrektur: sekundare, umrandete Touch-Flaeche nur im Shopping-Screen.

Restrisiko:

- Die visuelle Balance zwischen aktivem Abschlussbutton, deaktiviertem Abschlussbutton und sekundarem `Aendern` muss im echten Browser noch einmal gegen Desktop und Mobile geprueft werden.

### S4.4 Ergebnisprotokoll 09.05.2026

Umsetzung:

- `index.html`
  - Shopping-Footer erhaelt die zusaetzliche Klasse `shopping-actions`.
  - Der bestehende `Aendern`-Button bleibt ein `[data-nav="writing"]`-Button.
  - `Aendern` erhaelt die zusaetzliche Klasse `shopping-edit-action` und den Accessibility-Namen `Liste aendern`.
- `app/styles/shopping.css`
  - `shopping-actions` bekommt eine klarere lokale Aktionshierarchie.
  - `shopping-edit-action` bleibt sekundar, hat aber eine eigene Mindestbreite, Touch-Flaeche und Fokusdarstellung.
  - Auf Mobile bleibt `Aendern` bewusst kleiner als der Abschlussbutton und sitzt rechts, statt als zweite gleichwertige Hauptaktion zu wirken.

Code Review:

- `app/core/router.js` musste nicht geaendert werden, weil die vorhandene `[data-nav]`-Navigation fuer `Aendern` weiterhin reicht.
- `app/modules/writing.js` musste nicht geaendert werden, weil S4.4 nur die Auffindbarkeit der bestehenden Aktion betrifft.
- Die sichtbare Beschriftung bleibt `Aendern`; es wurde keine neue Navigationsarchitektur und kein persistenter Modusumschalter eingefuehrt.
- Die erste Fokusfassung war nur ueber Farbe/Box-Shadow sichtbar. Korrektur: expliziter `focus-visible`-Outline fuer `shopping-edit-action`.

Contract Review:

- Home bleibt ruhiger Start-Hub und weiterhin ueber `Zur Startseite` erreichbar.
- `Aendern` fuehrt weiter direkt nach `Schreiben` und ersetzt Home nicht.
- `Liste abschliessen` bleibt die primaere Einkaufsabschlussaktion.
- Keine neue State-, Sync-, SQL-, RLS-, Semantik-, Organizer- oder Einkaufsapps-Logik.
- Keine Aenderung an `app/core/router.js` oder `app/modules/writing.js`.

Checks:

- `node --check app/modules/shopping.js` -> gruen.
- `git diff --check -- index.html app/modules/shopping.js app/styles/shopping.css` -> keine Whitespace-Fehler; Git meldet nur bekannte Zeilenendungswarnungen.
- Statischer Scan:
  - `shopping-edit-action` ist nur im Shopping-Screen gestylt
  - `data-nav="writing"` bleibt am `Aendern`-Button erhalten
  - Router bleibt bei der bestehenden `[data-nav]`-Mechanik

Nicht lokal ausgefuehrt:

- Browser-/Touch-Smoke weiter offen, weil im Repo kein Playwright/jsdom-Testsetup vorhanden ist.
- S5 muss visuell pruefen:
  - `Aendern` ist in Einkaufshektik gut treffbar
  - `Aendern` ueberstrahlt `Liste abschliessen` nicht
  - `Zur Startseite` bleibt als Rueckweg klar, aber nicht dominanter als der Einkaufsflow

Findings und Korrekturen:

- S4.4-F1: Eigene `Aendern`-Styles sollten nicht global auf alle `.inline-link`-Aktionen wirken. Korrektur: eigene Klasse `shopping-edit-action` und Shopping-spezifische Selektoren.
- S4.4-F2: Fokus war nach der ersten Veredelung zu subtil. Korrektur: expliziter `focus-visible`-Outline.

Restrisiko:

- Die exakte Balance zwischen primaerer Abschlussaktion, sekundarem `Aendern` und Header-Rueckweg muss im echten Browser noch visuell geprueft werden.

### S4.5 Ergebnisprotokoll 09.05.2026

Umsetzung:

- `index.html`
  - `Liste leeren` bekommt die bestehende Klasse `destructive` zusaetzlich zu `inline-link`.
  - Dadurch nutzt `Liste leeren` dasselbe vorhandene destruktive Linkmuster wie einzelne `Loeschen`-Aktionen.

Bewusste Abgrenzung:

- Keine Aenderung an `app/modules/writing.js`.
- Keine Aenderung an `app/modules/shopping.js`.
- Keine neuen globalen Styles und kein Writing-Redesign.
- Keine Dialog-, Undo-, Historien- oder Sicherheitsmechanik.

Code Review:

- S4.5 hat einen belegbaren gemeinsamen Musterbruch gefunden: `Loeschen` war bereits `inline-link destructive`, `Liste leeren` war trotz staerkerer Wirkung nur `inline-link`.
- Die Korrektur verwendet das bestehende `.inline-link.destructive`-Muster aus `app/styles/ui.css`.
- Der Clear-Handler, Touchlog `writing-clear-list` und Persistenzgrund `clear-list` bleiben unveraendert.
- Shopping-Abschluss `Liste abschliessen` bleibt fachlich getrennt: Abschluss gekaufter Eintraege, nicht generisches Loeschen.

Contract Review:

- Roadmap 1 bleibt im Einkaufsflow-/Hierarchie-Scope.
- Writing wurde nur an einer bestehenden UI-Klasse markiert, nicht funktional umgebaut.
- `Liste leeren` bleibt bewusst eine Writing-Aktion und wird nicht in den Einkaufsflow gezogen.
- Keine Aenderung an Datenvertrag, Sync-Schema, SQL, RLS, Semantik, Home, Router, Organizer oder Einkaufsapps.

Checks:

- `node --check app/modules/shopping.js` -> gruen.
- `node --check app/modules/writing.js` -> gruen.
- `git diff --check -- index.html app/modules/shopping.js app/modules/writing.js app/styles/shopping.css app/styles/ui.css` -> keine Whitespace-Fehler; Git meldet nur bekannte Zeilenendungswarnungen.
- Statischer Scan:
  - `Liste leeren` ist jetzt `inline-link destructive`
  - dynamisches `Loeschen` bleibt `inline-link destructive`
  - keine Aenderung an `finishShopping()`, `clearAll()` oder Router

Nicht lokal ausgefuehrt:

- Browser-/Touch-Smoke weiter offen.
- S5 muss visuell pruefen:
  - `Liste leeren` ist als destruktiv erkennbar, aber bleibt sekundar
  - `Loeschen` und `Liste leeren` wirken verwandt
  - `Liste abschliessen` wird nicht mit `Liste leeren` verwechselt

Findings und Korrekturen:

- S4.5-F1: `Liste leeren` war nicht als destruktiver Link markiert, obwohl einzelne `Loeschen`-Aktionen bereits das vorhandene destruktive Muster nutzen. Korrektur: `destructive`-Klasse auf `clear-list`.

Restrisiko:

- Die konkrete Farbwirkung von `Liste leeren` im Writing-Panel muss im Browser geprueft werden, damit sie nicht lauter wirkt als beabsichtigt.

### S4.6/S4.7 Ergebnisprotokoll 09.05.2026

S4.6 Laufende Code- und Contract Reviews dokumentieren:

- Alle S4-Substeps haben eigene Ergebnisprotokolle mit Umsetzung, Code Review, Contract Review, Checks, Findings/Korrekturen und Restrisiko.
- Die S4.1 bis S4.5 Reviews wurden gegen die S1-S3 Findings gegengeprueft:
  - S1/S3 Zeilentap und Doppel-Toggle-Risiko -> S4.1 umgesetzt.
  - S1/S3 Papierlisten-Zustand fuer `Im Wagen` -> S4.2 umgesetzt.
  - S1/S3 Abschlussbutton im Leerzustand -> S4.3 umgesetzt.
  - S1/S3 `Aendern`-Auffindbarkeit ohne neue Navigation -> S4.4 umgesetzt.
  - S2/S3 destruktive Muster nur bei belegtem Bedarf -> S4.5 minimal umgesetzt.
- Ein Doku-Encoding-Artefakt im S4.3-Protokoll wurde korrigiert (`Temporaerer` statt Umlaut).

S4.7 Schritt-Abnahme:

- S4 ist fachlich abgenommen.
- Der Einkaufsflow bleibt bei derselben fachlichen Wahrheit:
  - `inCart` ist weiterhin der einzige Einkaufsstatus.
  - `toggleInCart(...)` bleibt die Toggle-State-Operation.
  - `finishShopping()` entfernt weiterhin nur `inCart = true`.
  - `Aendern` bleibt vorhandene Navigation nach `Schreiben`.
  - `Liste leeren` bleibt eine Writing-Aktion.
- Die Umsetzung bleibt innerhalb des Roadmap-Scopes:
  - keine SQL-/RLS-/Schema-Aenderung
  - keine Semantik-Datei-Aenderung
  - keine Organizer-, Push-, Einkaufsapps-, Historien-, Undo- oder Dialoglogik
  - keine neue Hauptnavigation und kein Home-Dashboard

Abschluss-Code-Review:

- `app/modules/shopping.js`
  - Itemdaten werden in Shopping-Zeilen ueber DOM-Knoten und `textContent` gesetzt.
  - Es gibt keine alte `querySelectorAll("[data-toggle]")`-Nachverdrahtung mehr.
  - Der Abschlussbuttonzustand ist reine UI-Ableitung aus `item.inCart`.
- `app/styles/shopping.css`
  - Neue Styles sind auf `#screen-shopping` begrenzt.
  - Disabled-/Idle-Stil fuer `Liste abschliessen` ueberschreibt den globalen Busy-Cursor nur lokal.
  - `shopping-edit-action` bleibt sekundar und besitzt einen sichtbaren Fokuszustand.
- `index.html`
  - `Aendern` bleibt `data-nav="writing"`.
  - `Liste leeren` nutzt das bestehende destruktive Linkmuster.
- Nicht geaendert:
  - `app/core/router.js`
  - `app/core/state.js`
  - `app/modules/writing.js`
  - `app/styles/ui.css`
  - Supabase-/Sync-Schema

Checks:

- `node --check app/modules/shopping.js` -> gruen.
- `node --check app/modules/writing.js` -> gruen.
- `node --check app/core/router.js` -> gruen.
- `git diff --check -- index.html app/modules/shopping.js app/modules/writing.js app/core/router.js app/styles/shopping.css app/styles/ui.css docs/HESTIA Einkaufsflow Veredeln Roadmap.md` -> keine Whitespace-Fehler; Git meldet nur bekannte Zeilenendungswarnungen.
- S4.1-S4.5 Static Contract Check -> gruen.
- S4 Shopping Behavior Smoke -> gruen:
  - ohne `inCart` ist `Liste abschliessen` deaktiviert
  - mit `inCart` ist `Liste abschliessen` aktiv
  - Abschluss entfernt nur gekaufte Eintraege
  - danach ist der Abschlussbutton wieder deaktiviert

Nicht lokal ausgefuehrt:

- Echter Browser-/Touch-Smoke bleibt fuer S5 offen, weil im Repo kein Playwright/jsdom-Testsetup vorhanden ist.
- S5 muss die visuelle Balance auf Desktop und Mobile pruefen:
  - Zeilentap/Checkbox toggeln genau einmal
  - Papierlisten-Zustand bleibt charmant und lesbar
  - `Liste abschliessen` wirkt aktiv/idle korrekt
  - `Aendern` bleibt sekundar, aber gut treffbar
  - `Liste leeren` wirkt destruktiv, aber nicht zu laut

Findings und Korrekturen:

- S4.6-F1: Im S4.3-Dokuabschnitt stand ein Umlaut-Artefakt. Korrektur: ASCII-Schreibweise `Temporaerer`.
- Keine offenen P0/P1-Code- oder Contract-Findings fuer S4.

Restrisiko:

- Das verbleibende Risiko ist visuell/interaktiv, nicht fachlich: Ohne echten Browserlauf sind Touch-Haptik, Hover-/Fokusbalance und mobile Zeilenumbrueche noch in S5 zu pruefen.

## S5 - Tests, UI Review und Contract Review

Ziel:

- Alles pruefen, was lokal sinnvoll pruefbar ist.
- Externe oder manuelle Smokes sauber definieren, falls sie nicht lokal ausfuehrbar sind.
- Code und Roadmap gegen Guardrails reviewen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 Lokaler Browser-Smoke:
  - App startet auf Home.
  - Wechsel nach `Einkaufen` funktioniert.
  - Shopping-Zeile toggelt `Im Wagen`.
  - Checkbox selbst toggelt genau einmal.
  - Row-Tap und Checkbox erzeugen keine doppelten Toggle-Events.
  - `Liste abschliessen` entfernt nur markierte Eintraege.
  - `Liste abschliessen` wirkt im Leerzustand nicht wie ein aktiver Abschluss.
  - Nicht markierte Eintraege bleiben sichtbar.
  - `Aendern` bzw. direkter Wechsel nach `Schreiben` funktioniert.
- S5.4 Mobile/Touch-Smoke:
  - Trefferflaechen sind gross genug.
  - Text ueberlappt nicht.
  - Papierlisten-Aesthetik bleibt lesbar.
  - kleine Viewports bleiben brauchbar.
- S5.5 Sync-/Realtime-Regression definieren oder ausfuehren:
  - Shopping-Toggle speichert Snapshot wie vorher.
  - Shopping-Abschluss speichert Snapshot wie vorher.
  - Realtime-Refresh bleibt ohne doppelte UI-Zustaende.
- S5.6 User-Facing Copy Review nach realem Smoke.
- S5.7 Code Review gegen Bruchrisiken.
- S5.8 Contract Review gegen HESTIA-Guardrails.
- S5.9 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Gepruefter Umsetzungsstand.
- Klare Liste ausgefuehrter Checks.
- Klare Liste nicht lokal ausfuehrbarer Smokes.
- Bekannte Restrisiken.

Exit-Kriterium:

- Alle lokal moeglichen Checks sind erledigt oder bewusst als nicht verfuegbar markiert.

### S5 Lokales Testprotokoll 09.05.2026

Ausgefuehrt:

- S5.1 `node --check` fuer geaenderte und betroffene JS-Dateien:
  - `app/main.js` -> gruen
  - `app/core/router.js` -> gruen
  - `app/core/state.js` -> gruen
  - `app/modules/shopping.js` -> gruen
  - `app/modules/writing.js` -> gruen
  - `app/supabase/list-sync.js` -> gruen
- S5.2 `git diff --check` fuer die betroffenen Dateien -> keine Whitespace-Fehler; Git meldet nur bekannte Zeilenendungswarnungen fuer `index.html`, `shopping.js` und `shopping.css`.
- S5.3 Lokaler Browser-Smoke, lokal soweit ohne echten Browser automatisierbar:
  - Static UI Contract Check -> gruen:
    - Home ist initial aktiv.
    - Navigation nach `Einkaufen` und `Schreiben` ist im HTML vorhanden.
    - `Liste abschliessen`, `Aendern`, `Liste leeren` und die Shopping-CSS-Hooks sind vorhanden.
  - Router-Smoke mit synthetischem DOM -> gruen:
    - Navigation nach `shopping`, `writing` und `home` setzt genau den passenden Screen aktiv.
  - Shopping Behavior Smoke mit synthetischem DOM -> gruen:
    - ohne `inCart` ist `Liste abschliessen` deaktiviert
    - mit `inCart` ist `Liste abschliessen` aktiv
    - Abschluss entfernt nur markierte Eintraege
    - nicht markierte Eintraege bleiben erhalten
    - nach Abschluss ist der Button wieder deaktiviert
- S5.5 Sync-/Realtime-Regression, lokal soweit ohne Supabase-Realtime automatisierbar:
  - Shopping-/Sync-Smoke mit Fake-`listSync` -> gruen:
    - Checkbox-Change ruft `toggleInCart(...)` genau einmal.
    - Toggle speichert Snapshot mit Sync-Start `shopping-toggle`.
    - Abschluss speichert Snapshot mit Sync-Start `shopping-finish`.
    - Abschluss-Snapshot enthaelt nur verbleibende, nicht gekaufte Eintraege.
- Lokaler HTTP-Fetch-Smoke ueber `python -m http.server 8766 --bind 127.0.0.1` -> gruen:
  - `index.html` erreichbar
  - `app/main.js` erreichbar
  - `app/app.css` erreichbar
  - `app/modules/shopping.js` erreichbar
  - `app/styles/shopping.css` erreichbar
  - Server wurde nach dem Check wieder beendet.

Nicht lokal vollstaendig automatisierbar:

- Echter Browser-Smoke mit Layout, CSS-Painting, Fonts und nativer Label-/Checkbox-Interaktion.
- Mobile/Touch-Smoke mit Finger-Trefferflaechen.
- Echte Supabase-Realtime-Regression mit zweitem Client/zweitem Tab.
- User-Facing Copy Review nach echtem Browserlauf.

Code Review gegen Bruchrisiken:

- Shopping-Itemdaten werden nicht mehr per `innerHTML` interpoliert.
- Row-/Checkbox-Toggle nutzen denselben lokalen `toggleCartItem(...)`-Pfad.
- Kein alter `querySelectorAll("[data-toggle]")`-Bindepfad vorhanden.
- `finishShopping()` bleibt die fachliche Abschlussoperation und entfernt nur `inCart = true`.
- Der Abschlussbuttonzustand ist nur aus `item.inCart` abgeleitet.
- `Aendern` bleibt `data-nav="writing"` und nutzt die bestehende Router-Mechanik.
- `Liste leeren` nutzt nur das bestehende destruktive Linkmuster.

Contract Review gegen HESTIA-Guardrails:

- Keine neue State-, Sync-, SQL-, RLS-, Schema- oder Semantik-Aenderung.
- Keine neue Hauptnavigation, kein Home-Dashboard, kein Organizer-Scope.
- Keine Undo-, Historien-, Dialog-, Push- oder Einkaufsapps-Logik.
- Papierlisten-Charme bleibt erhalten; die S5-Restrisiken sind visuell/interaktiv und werden im echten Browser geprueft.

Manuelle Tests durch Stephan:

- Desktop/Laptop im Live Server:
  - Alle geplanten Desktop-Smokes wurden erfolgreich ausgefuehrt.
  - Die Oberflaeche wirkt stimmiger und weniger schnell zusammengebaut.
  - `Liste abschliessen` bleibt als UX-Frage offen: fachlich kann der Abschluss auch bedeuten, dass bewusst nur die gefundenen/bezahlten Eintraege abgeschlossen werden.
- Mobile oder schmaler Browser:
  - Alle geplanten Mobile-Smokes wurden erfolgreich ausgefuehrt.
  - Trefferflaechen reagieren sauber.
  - `Liste abschliessen` ist auch mobil derselbe offene UX-Punkt wie im Desktop-Smoke.
- Sync-/Realtime-Smoke:
  - Nicht erfolgreich ausgefuehrt, weil der Test nicht zum aktuellen Produktvertrag passt.
  - HESTIA arbeitet aktuell bewusst nicht mit Live-Sync als Einkaufsinteraktion, sondern mit expliziten Snapshots ueber Schreiben/Abschluss.
  - S5 wertet das daher als nicht anwendbar, nicht als Produktregression.

S5 Findings:

- S5-F1: `Liste abschliessen` ist aktuell aktiv, sobald mindestens ein Eintrag `inCart = true` ist. Stephan hat im Live-Smoke die fachliche Frage aufgeworfen, ob die Aktion eventuell immer aktiv/abschliessbar sein sollte, weil nicht gefundene Artikel bewusst offen bleiben koennen und Abschluss eher "ich habe bezahlt, was ich gefunden habe" bedeutet. Entscheidung offen vor S6 oder als kleiner S4.3-Follow-up.
- S5-F2: Der geplante Realtime-Smoke war als optionaler Supabase-/Zweitclient-Test formuliert, passt aber nicht zum aktuellen HESTIA-Alltagsflow ohne Live-Sync-Interaktion. Korrektur: in S5 als nicht anwendbar dokumentiert.

S5 Zwischenstatus:

- Alle lokal sinnvoll ausfuehrbaren Checks sind gruen.
- Desktop- und Mobile-Abnahme durch Stephan erfolgreich.
- S5 ist abgeschlossen; vor S6 bleibt nur die Produktentscheidung zu S5-F1 offen, falls sie noch in dieser Roadmap umgesetzt werden soll.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Source-of-Truth-Dokus synchronisieren.
- QA aktualisieren.
- Roadmap final abschliessen.
- Commit- und Archiventscheidung dokumentieren.

Substeps:

- S6.1 `docs/modules/Shopping Module Overview.md` aktualisieren.
- S6.2 Falls die Home-Hierarchie oder der Home-Rueckweg faktisch betroffen ist, `docs/modules/Home Module Overview.md` aktualisieren.
- S6.3 Falls Writing-Aktionen oder Listenmuster betroffen sind, `docs/modules/Writing Module Overview.md` aktualisieren.
- S6.4 Falls State-/Sync-Verhalten faktisch unveraendert bleibt, das im Abschlussreview explizit bestaetigen statt Doku unnoetig umzuschreiben.
- S6.5 `docs/QA_CHECKS.md` um neue Einkaufsflow-Smokes erweitern.
- S6.6 Roadmap mit Ergebnisprotokollen aktualisieren.
- S6.7 Finaler Contract Review:
  - Roadmap vs. Code
  - Roadmap vs. Module Overviews
  - Roadmap vs. README-/PRODUCT-Guardrails
  - Roadmap vs. QA
- S6.8 Abschluss-Abnahme.
- S6.9 Commit-Empfehlung.
- S6.10 Archiv-Entscheidung.

Output:

- Code, Doku, QA und Roadmap sprechen denselben finalen Vertrag.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll 09.05.2026

#### S6.1 Shopping Module Overview aktualisieren

- Umsetzung/Review:
  - `docs/modules/Shopping Module Overview.md` beschreibt jetzt tapbare Shopping-Zeilen, gemeinsamen Toggle-Pfad, ruhigen `Im Wagen`-Zustand, sekundares `Aendern` und den aktivierten Abschlussbutton ab mindestens einem `inCart`-Eintrag.
  - Der Sync-Abschnitt wurde begrifflich geschaerft: Snapshot-Saves bleiben vorhanden, robuste Live-Kollaboration wird nicht behauptet.
- Contract Review:
  - Datenvertrag bleibt `id`, `name`, `quantity`, `unit`, `inCart`.
  - `finishShopping()` bleibt Abschluss gekaufter Eintraege.

#### S6.2 Home Module Overview pruefen

- Umsetzung/Review:
  - `docs/modules/Home Module Overview.md` musste nicht geaendert werden.
  - Home zeigt weiter genau zwei primaere Intentionen und wurde durch S4 nicht faktisch umgebaut.
- Contract Review:
  - Kein Dashboard, keine neue Hauptnavigation, kein Home-Scope-Drift.

#### S6.3 Writing Module Overview aktualisieren

- Umsetzung/Review:
  - `docs/modules/Writing Module Overview.md` erwaehnt jetzt, dass `Loeschen` und `Liste leeren` dasselbe destruktive Inline-Link-Muster nutzen.
- Contract Review:
  - Writing-Logik blieb unveraendert.
  - Keine Undo-, Dialog- oder Historienlogik eingefuehrt.

#### S6.4 State-/Sync-Verhalten bestaetigen

- Umsetzung/Review:
  - `docs/modules/Supabase Sync Module Overview.md` wurde um die Grenze "Snapshot-Sync, nicht robuste Live-Kollaboration" ergaenzt.
  - Keine Code- oder Schemaaenderung an State oder Supabase.
- Contract Review:
  - HESTIA speichert weiterhin Snapshots fuer passende Aktionen.
  - Echte parallele Einkaufskoordination wird als Future-Roadmap behandelt.

#### S6.5 QA aktualisieren

- Umsetzung/Review:
  - `docs/QA_CHECKS.md` enthaelt jetzt die neuen Einkaufsflow-Smokes:
    - Zeilentap
    - Checkbox toggelt genau einmal
    - kein Doppel-Toggle
    - ruhiger `Im Wagen`-Zustand
    - Abschlussbutton nur bei mindestens einem Wagen-Eintrag aktiv
    - `Aendern` bleibt sekundar
    - `Liste leeren` ist destruktiv, aber sekundar
  - Realtime-Zusatzchecks wurden auf eine kuenftige Auto-Sync-/Collaboration-Roadmap eingegrenzt.
- Contract Review:
  - QA prueft den realen Stand und behauptet keine robuste Live-Kollaboration.

#### S6.6 Future-Roadmap aktualisieren

- Umsetzung/Review:
  - `docs/future roadmaps.md` enthaelt jetzt eine eigene Roadmap `Realtime Shopping Collaboration`.
  - Die Roadmap wurde nach Produktreview als Roadmap 5 und Premium-Future-Feature einsortiert, nicht als direkte Kernroadmap.
  - Die Idee "einer geht links, einer geht rechts" ist als hoher Haushaltsnutzen dokumentiert.
  - Gleichzeitig ist festgehalten, dass es eine eigene grosse Roadmap braucht: Toggles, Remote-Echos, Last-Write-Wins, Offline-Faelle und Abschlussregeln.
- Contract Review:
  - Auto-Sync wird nicht in Roadmap 1 hineingezogen.
  - Premium-/Premium-Plus-Nummern wurden nach der neuen Roadmap korrigiert.

#### S6.7 Finaler Contract Review

- Roadmap vs. Code:
  - Code setzt nur Einkaufsflow-Ergonomie, Aktionshierarchie und minimale destruktive UI-Markierung um.
  - Keine neue Datenlogik, kein neuer Status und keine neue Navigation.
- Roadmap vs. Module Overviews:
  - Shopping, Writing, Supabase Sync und QA beschreiben jetzt denselben finalen Vertrag.
  - Home musste nicht aktualisiert werden, weil es nicht faktisch betroffen ist.
- Roadmap vs. README-/PRODUCT-Guardrails:
  - HESTIA bleibt eine ruhige Haushalts-Einkaufsliste.
  - Kein Organizer-, Dashboard-, Einkaufsapps-, Push- oder Premium-Scope wurde umgesetzt.
- Roadmap vs. QA:
  - Lokale Checks und Stephan-Live-Smokes sind dokumentiert.
  - Realtime wurde korrekt als nicht anwendbar fuer diese Roadmap eingeordnet.

#### S6.8 Abschluss-Abnahme

- S1 bis S6 sind abgeschlossen.
- Roadmap 1 ist fachlich abgeschlossen.
- Bekannte Restrisiken:
  - echte parallele Einkaufskoordination bleibt Future-Roadmap
  - visuelle Balance kann spaeter weiter poliert werden, ist aber durch Stephan auf Desktop und Mobile abgenommen

#### S6.9 Commit-Empfehlung

- Empfohlener Commit:
  - `feat(shopping): refine shopping flow ergonomics`
- Umfang:
  - `index.html`
  - `app/modules/shopping.js`
  - `app/styles/shopping.css`
  - `docs/HESTIA Einkaufsflow Veredeln Roadmap.md`
  - `docs/future roadmaps.md`
  - `docs/modules/Shopping Module Overview.md`
  - `docs/modules/Writing Module Overview.md`
  - `docs/modules/Supabase Sync Module Overview.md`
  - `docs/QA_CHECKS.md`

#### S6.10 Archiv-Entscheidung

- Noch nicht archivieren, solange der Commit nicht gesetzt ist.
- Nach Commit kann diese Roadmap nach `docs/archive/` verschoben werden.

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
- Shopping zeigt die offene Liste korrekt.
- Die ganze Shopping-Zeile kann `Im Wagen` toggeln, ohne doppelte Toggle-Events.
- Checkbox bleibt sichtbar, proportional und semantisch bedienbar.
- `Liste abschliessen` entfernt nur `inCart = true`.
- Nicht markierte Eintraege bleiben erhalten.
- Leere Einkaufsliste zeigt weiter `Alles erledigt.`.
- Papierlisten-Stil bleibt erhalten.
- Mobile Ansicht bleibt brauchbar.
- App funktioniert weiterhin ohne Supabase-Konfiguration.
- Mit Supabase-Konfiguration bleiben Shopping-Toggle und Abschluss im Shared Snapshot sichtbar.

## Abnahmekriterien

- Der Einkaufsflow fuehlt sich unterwegs direkter an.
- Der Bridgerton-/Downton-Abbey-Charme der Einkaufsliste bleibt sichtbar.
- Keine neue Fachlogik, kein neuer Status und kein neuer Datenvertrag wurden eingefuehrt.
- Navigation zwischen `Schreiben`, `Einkaufen` und Home bleibt ruhig und verstaendlich.
- Destruktive Aktionen sind klarer, aber HESTIA fuehrt keine laute Sicherheits- oder Undo-Maschinerie ein.
- Lokal moegliche Checks sind dokumentiert.
- Betroffene Dokus und QA sind synchron.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `feat(shopping): refine shopping flow ergonomics`
