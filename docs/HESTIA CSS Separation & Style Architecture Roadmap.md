# HESTIA CSS Separation & Style Architecture Roadmap

## Ziel (klar und pruefbar)
Der aktuelle HESTIA-CSS-Bestand soll so refaktoriert werden, dass Styles wieder klar nach Verantwortung getrennt sind und kuenftige UI-Arbeit nicht mehr an einer grossen Sammeldatei haengt. HESTIA soll dabei nicht MIDAS kopieren, aber dessen sauberen CSS-Vertrag in kleiner, passender Form uebernehmen.

Pruefbare Zieldefinition:
- HESTIA besitzt einen klaren CSS-Einstiegspunkt statt mehrerer direkter Stylesheet-Links in `index.html`.
- Tokens, Base/Reset, Layout, globale UI-Patterns, Utilities und Feature-Styles sind getrennt.
- `components.css` ist entweder deutlich entlastet oder vollstaendig in klar benannte Verantwortungsdateien aufgeloest.
- Form-Control-Grundregeln sind so geschnitten, dass Checkboxen, Radios und Text-Inputs nicht mehr gegeneinander kollidieren.
- PWA-/Banner-/Touchlog-/Shopping-/Writing-Styles liegen an nachvollziehbaren Stellen und nicht als Mischmasch in einer einzigen Datei.
- HESTIA besitzt am Ende einen dokumentierten CSS-Vertrag analog zur MIDAS-Klarheit.

## Problemzusammenfassung
HESTIA besitzt aktuell einen funktionalen CSS-Startaufbau, aber noch keinen sauberen Style-Vertrag wie MIDAS.

Der heutige Zustand ist fuer ein kleines Projekt nachvollziehbar, hat aber bereits erste typische Drift-Symptome gezeigt:

- `index.html` bindet mehrere Stylesheets direkt ein.
- `app/styles/components.css` ist zur Sammeldatei fuer globale Patterns, Feature-Styles, PWA-Banner, Touchlog und Shopping-Sonderregeln geworden.
- `app/styles/base.css` enthaelt globale Form-Grundregeln, die konzeptionell breiter greifen als gewollt.
- Das Checkbox-Problem im Shopping-Screen war ein reales Symptom dieser unscharfen Trennung:
  - globale Input-Regeln
  - feature-spezifische Checkbox-Nutzung
  - spaete Overrides

Konsequenz:
- UI-Arbeit ist moeglich, aber zunehmend reaktiv.
- Kleine visuelle Anpassungen werden schneller riskant, weil Verantwortungen nicht klar getrennt sind.
- Neue Chats sehen Styling eher als "Datei durchsuchen" statt als System mit klaren Ablageorten.

MIDAS zeigt hier bereits den besseren Schnitt:
- zentraler CSS-Bundle-Einstieg
- klare Trennung zwischen `base`, `layout`, `ui`, `utilities` und Feature-CSS
- eigener dokumentierter CSS-Vertrag

Die Roadmap dient also nicht dem Selbstzweck "mehr Dateien", sondern der Rueckgewinnung von Lesbarkeit, Sicherheit und Upgrade-Faehigkeit fuer HESTIA.

## Relevante Evidence (aktueller Repo-Stand)
- `index.html`
  - bindet aktuell direkt:
    - `app/styles/tokens.css`
    - `app/styles/base.css`
    - `app/styles/components.css`
    - `app/styles/screens.css`
- `app/styles/tokens.css`
  - enthaelt Design-Tokens fuer Farben, Radius und Fonts
- `app/styles/base.css`
  - enthaelt Reset, Body-/Ambient-Basis und globale Regeln
- `app/styles/components.css`
  - enthaelt aktuell gemischte Verantwortungen:
    - globale Buttons und Panels
    - Listen-/Form-Patterns
    - Shopping-Screen-Sonderregeln
    - Touchlog
    - Install-Banner
    - mobile Regeln
- `app/styles/screens.css`
  - enthaelt aktuell nur sehr wenig screen-spezifische Regeln
- `app/modules/shopping.js`
  - nutzt eigene Strukturklassen, die derzeit stark auf CSS in `components.css` angewiesen sind
- `app/modules/writing.js`
  - nutzt ebenfalls globale Listen-/Status-/Button-Patterns

## Relevante Vergleichsreferenzen aus MIDAS
- `C:\Users\steph\Projekte\M.I.D.A.S\app\app.css`
  - zentraler CSS-Bundle-Einstieg mit fester Import-Reihenfolge
- `C:\Users\steph\Projekte\M.I.D.A.S\app\styles\base.css`
  - Tokens, Reset, Typografie, Form-Grundregeln
- `C:\Users\steph\Projekte\M.I.D.A.S\app\styles\layout.css`
  - Panels, Header, Main-Layout, Grid
- `C:\Users\steph\Projekte\M.I.D.A.S\app\styles\ui.css`
  - globale Buttons, Tabs, Banner, Status-Patterns
- `C:\Users\steph\Projekte\M.I.D.A.S\app\styles\utilities.css`
  - `u-*` Helfer und Form-/Label-Patterns
- `C:\Users\steph\Projekte\M.I.D.A.S\docs\modules\CSS Module Overview.md`
  - dokumentierter CSS-Vertrag

## Finding-Katalog - MIDAS CSS vs. HESTIA CSS

### F1 - MIDAS besitzt einen zentralen CSS-Einstieg, HESTIA nicht

MIDAS:
- `app/app.css` ist der eindeutige Bundle-Einstieg.
- Import-Reihenfolge ist dokumentiert und stabil.

HESTIA:
- `index.html` bindet mehrere CSS-Dateien direkt.
- Die Reihenfolge ist zwar sichtbar, aber nicht als eigener CSS-Vertrag gekapselt.

Bewertung:
- HESTIA fehlt ein zentraler CSS-Owner.
- Das ist noch kein Build-Problem, aber ein Strukturproblem.

### F2 - MIDAS trennt Layout, UI und Utilities; HESTIA mischt diese Ebenen in `components.css`

MIDAS:
- `layout.css` fuer Struktur
- `ui.css` fuer globale Patterns
- `utilities.css` fuer Helferklassen

HESTIA:
- `components.css` enthaelt aktuell:
  - Layout-nahe Regeln
  - globale Komponentenmuster
  - Feature-Sonderregeln
  - Diagnose-/PWA-Elemente

Bewertung:
- HESTIAs groesster CSS-Drift sitzt nicht in Tokens, sondern in der Verantwortungsmischung von `components.css`.

### F3 - MIDAS schneidet Form-Control-Grundregeln sauberer

MIDAS:
- `input:not([type="checkbox"]):not([type="radio"])`
- separates `input[type="checkbox"]`

HESTIA:
- globale `input`-Regeln sind breiter
- Checkbox-Probleme mussten feature-seitig spaeter abgefangen werden

Bewertung:
- HESTIA braucht denselben Grundsatz:
  - Text-/Formfelder und Binary-Controls duerfen CSS-seitig nicht ueber denselben Kamm geschoren werden.

### F4 - MIDAS nutzt Feature-CSS bewusster

MIDAS:
- Feature-Dateien wie `hub.css`, `capture.css`, `doctor.css`, `auth.css`, `chart.css`
- globale Patterns bleiben trotzdem zentral

HESTIA:
- hat bislang keine echte Feature-Aufteilung fuer:
  - writing
  - shopping
  - touchlog/dev
  - pwa/install

Bewertung:
- HESTIA ist kleiner als MIDAS, aber gross genug fuer 3-5 kleine Feature-Dateien.

### F5 - MIDAS besitzt eine explizite CSS-Dokumentation, HESTIA noch nicht

MIDAS:
- `CSS Module Overview.md` beschreibt Load-Order, Verantwortungen, Guardrails und Ablageorte

HESTIA:
- besitzt derzeit kein eigenes CSS-Overview

Bewertung:
- Ohne diese Doku wird CSS-Refaktor schnell wieder zu implizitem Wissen.

### F6 - HESTIA hat bereits brauchbare Grundlagen, nur der Schnitt ist noch zu flach

Wichtiger Gegenpunkt:
- `tokens.css`
- `base.css`
- `components.css`
- `screens.css`

sind kein schlechter Start.

Bewertung:
- HESTIA braucht keinen kompletten Neuaufbau.
- Der richtige Weg ist:
  - Struktur nachziehen
  - Verantwortungen klarmachen
  - CSS-Dokumentation ergaenzen

## Guardrails
- HESTIA bleibt klein; wir bauen keine CSS-Architektur fuer ein grosses Enterprise-Frontend.
- Die Refaktorierung darf keine sichtbaren Regressionswellen in Writing, Shopping, Home, Touchlog oder PWA-Banner ausloesen.
- Kein CSS-Buildsystem, kein Sass, kein Tooling-Umbau.
- Keine Utility-Flut nur um MIDAS zu imitieren.
- Neue Dateien muessen echte Verantwortungen trennen, nicht nur Code umverteilen.
- Tokens bleiben zentral und werden nicht in Feature-Dateien dupliziert.

## Architektur-Constraints
- HESTIA bleibt bei plain CSS.
- `tokens.css` bleibt die Design-Grundlage oder geht in einen zentralen Base-/Bundle-Vertrag auf, wird aber nicht fachlich zersplittert.
- Screen-Logik bleibt im bestehenden HTML-/JS-Schnitt.
- Refaktorierung darf bestehende Klassen nur dann umbenennen, wenn der Gewinn klar ist und alle Verbraucher in demselben Schritt nachgezogen werden.
- Mobile-Darstellung ist fuer diesen Refaktor ein zentraler Akzeptanzpunkt.

## Zielstruktur (Sollbild fuer HESTIA)

Empfohlene CSS-Zielstruktur:
- `app/app.css`
  - einziger CSS-Einstiegspunkt
- `app/styles/tokens.css`
  - Farben, Fonts, Radius, Schatten, Surface-Tokens
- `app/styles/base.css`
  - Reset, Body, globale Accessibility-/Form-Control-Grundregeln
- `app/styles/layout.css`
  - `app-shell`, `screen`, `panel`, `panel-head`, `row-actions`, allgemeine Container- und Layoutregeln
- `app/styles/ui.css`
  - Buttons, Inline-Links, Sync-Status, Banner-Grundmuster, Listengrundmuster
- `app/styles/utilities.css`
  - nur wenige, klar begrenzte Helfer falls wirklich noetig
- `app/styles/home.css`
  - Home-Screen, Titel, Hauptaktionen, Dev-Toggle
- `app/styles/writing.css`
  - Writing-Form, offene Liste, Writing-spezifische Status-/Listendarstellung
- `app/styles/shopping.css`
  - Papierliste, Checkbox-/Meta-Layout, mobile Shopping-Optimierung
- `app/styles/devtools.css`
  - Touchlog-Panel, Style-Switches, Diagnose-Panel
- `app/styles/pwa.css`
  - Install-Banner und spaetere Update-/Offline-Banner

Hinweis:
- Wenn sich waehrend des Refaktors zeigt, dass `utilities.css` unnoetig waere, darf sie entfallen.
- HESTIA muss den MIDAS-Schnitt nicht 1:1 replizieren; entscheidend ist die klare Verantwortung.

## Tool Permissions
Allowed:
- CSS-Dateien und HTML-Kopfbereich refaktorieren.
- Bestehende Klassen umhaengen, wenn alle Stellen im selben Schritt sauber nachgezogen werden.
- Kleine Doku-Erweiterungen fuer CSS-Vertrag und QA vornehmen.

Forbidden:
- Sass, PostCSS, CSS Modules oder Build-Pipeline einfuehren.
- Unverwandtes visuelles Redesign unter dem Deckmantel des Refaktors.
- JS-Feature-Umbauten, die nicht direkt fuer CSS-Schnitt oder Klassennamen noetig sind.

## Execution Mode
- Diese Roadmap ist vor groesseren visuellen Nachzuegen sinnvoll, weil sie den Styling-Unterbau klaert.
- Erst `S1` bis `S3` definieren Ist-Schnitt und Soll-Schnitt.
- Erst `S4` zieht die eigentliche Repo-Refaktorierung.
- `S5` schliesst mit CSS-Doku, Smokechecks und Abschlussbewertung.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Syntax-/Smoke- oder Sichtpruefungs-Block dokumentieren.

## Statusmatrix
| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse des HESTIA-CSS-Bestands und Drift-Katalog | DONE | CSS-Bestand gemappt: `tokens.css` = Theme, `base.css` = Foundation + Ambient, `screens.css` = kleiner Mobile-Override, eigentlicher Drift konzentriert sich in `components.css`. |
| S2 | Zielvertrag fuer CSS-Schichten und Dateizuschnitt finalisieren | DONE | HESTIA bekommt einen klaren Bundle-Einstieg, keine eigenstaendige `screens.css`-Schicht und vorerst keine Pflicht-`utilities.css`; globale Patterns und Feature-CSS sind verbindlich getrennt. |
| S3 | Migrationsplan fuer Klassen, Imports und Feature-Schnitt festziehen | DONE | Import-Reihenfolge, Datei-Owner und Blockreihenfolge fuer die Migration sind jetzt festgelegt; `components.css` wird kontrolliert in Foundation, globale Patterns und Feature-Dateien zerlegt. |
| S4 | Repo-Refaktorierung auf den finalen CSS-Vertrag | DONE | Bundle, Foundation, Layout, globale UI und Feature-CSS sind getrennt; Legacy-Dateien sind entfernt und die betroffene Modul-Doku ist auf den neuen CSS-Schnitt gezogen. |
| S5 | CSS-Doku, QA und Abschlussbewertung | DONE | CSS Module Overview angelegt, README und QA auf den neuen CSS-Vertrag gezogen; Live-Smokes sind fuer den anschliessenden manuellen Test vorbereitet. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## Schritte + Subschritte

### S1 - Ist-Analyse des HESTIA-CSS-Bestands und Drift-Katalog
- S1.1 Alle heutigen CSS-Dateien und ihre echten Verantwortungen mappen.
- S1.2 In `components.css` markieren, welche Regeln eigentlich zu:
  - Layout
  - globale UI
  - Shopping
  - Writing
  - Touchlog/Dev
  - PWA
  gehoeren.
- S1.3 Konkrete Drift-Stellen notieren:
  - globale Inputs vs. Checkboxen
  - mobile Shopping-Layout
  - Banner-/Dialog-/Panel-Mischung
  - Screen-spezifische Regeln an globaler Stelle
- S1.4 Sichtbaren Finding-Katalog gegen MIDAS finalisieren.
- S1.5 Schritt-Abnahme.
- S1.6 Doku-Sync.
- S1.7 Commit-Empfehlung.
- Output: belastbare Ist-Karte des HESTIA-CSS.
- Exit-Kriterium: jede relevante Regelgruppe hat einen nachvollziehbaren Zielort.

#### S1 Checkpoint A - Ist-Karte des heutigen HESTIA-CSS steht

- `app/styles/tokens.css`
  - ist bereits sauber geschnitten
  - enthaelt Farb-, Font-, Radius- und Surface-Tokens sowie Font-/Art-Style-Varianten
  - hat heute keinen akuten Drift
- `app/styles/base.css`
  - enthaelt tatsaechlich Foundation:
    - Reset
    - `[hidden]`
    - `body`
    - Ambient-/Scene-Grundlagen
  - traegt aber gleichzeitig schon layout-nahe Regeln wie `.app-shell`
- `app/styles/screens.css`
  - ist aktuell kein echter Screen-Layer
  - enthaelt nur einen kleinen mobilen Override-Block fuer globale Elemente
  - ist damit eher Restdatei als stabile Schicht
- `app/styles/components.css`
  - ist heute der eigentliche Sammelcontainer
  - mischt mindestens sechs Verantwortungen:
    - Screen-/Home-nahe Regeln
    - globale UI-Patterns wie Buttons, Panels, Links
    - Form- und Listen-Grundmuster
    - Shopping-Feature-Styles
    - Dev-/Touchlog-Styles
    - PWA-/Install-Banner
    - plus mobile Overrides

#### S1 Checkpoint B - Genaue Drift-Stellen sind benannt

- Globales `input` in `components.css` ist zu breit geschnitten und hat bereits reale Checkbox-Drift erzeugt.
- `screens.css` ist zu klein und inhaltlich zu unscharf, um als eigene Schicht heute wirklich zu tragen.
- Shopping-Regeln leben aktuell mitten zwischen globalen Patterns statt in einem klaren Feature-Ort.
- Touchlog-/Dev-Panel und Install-Banner teilen sich dieselbe Sammeldatei wie Buttons, Panels und Listen.
- `base.css` und `components.css` teilen sich die Verantwortung fuer Layout-nahe Foundation (`app-shell`, `screen`, `panel`) noch nicht sauber.

#### S1 Checkpoint C - Sichtbarer Ist-Vertrag fuer die Migration

- `tokens.css` bleibt als stabile Theme-Grundlage erhalten.
- Der Hauptrefaktor fokussiert nicht zuerst Tokens, sondern den Schnitt von:
  - `base.css`
  - `components.css`
  - `screens.css`
- Der groesste Hebel liegt in der Entlastung von `components.css`.
- Mobile Shopping, Touchlog und PWA-Banner sind die wichtigsten Sichtpruefungsbereiche fuer spaetere Regressionschecks.

### S2 - Zielvertrag fuer CSS-Schichten und Dateizuschnitt finalisieren
- S2.1 Final entscheiden, welche CSS-Schichten HESTIA wirklich braucht:
  - tokens
  - base
  - layout
  - ui
  - optional utilities
  - feature styles
- S2.2 Finalen Dateizuschnitt fuer HESTIA festlegen.
- S2.3 Definieren, welche Pattern global bleiben:
  - Buttons
  - Inline-Links
  - Panels
  - Sync-Status
  - Listen-Grundmuster
- S2.4 Definieren, welche Pattern feature-spezifisch werden:
  - Shopping-Papierliste
  - Writing-Listenzeilen
  - Touchlog-/Dev-Panel
  - Install-/PWA-Banner
- S2.5 Regel fuer Form Controls festziehen:
  - Textfelder vs. Checkboxen/Radio
- S2.6 Schritt-Abnahme.
- S2.7 Doku-Sync.
- S2.8 Commit-Empfehlung.
- Output: finaler CSS-Vertrag fuer HESTIA.
- Exit-Kriterium: kein unklarer Grenzfall mehr zwischen globalem Pattern und Feature-CSS.

#### S2 Checkpoint A - Finaler Schichtvertrag fuer HESTIA

Verbindlich beschlossen:
- `app/app.css`
  - wird als einziger CSS-Einstiegspunkt eingefuehrt
  - `index.html` soll kuenftig nur noch dieses Bundle einbinden
- `app/styles/tokens.css`
  - bleibt als reine Theme- und Design-Token-Datei bestehen
- `app/styles/base.css`
  - bleibt fuer Reset, Body, Accessibility-Helfer und echte Foundation zustaendig
  - Form-Control-Grundregeln werden hier sauber getrennt:
    - Text-/Zahlen-/Select-/Textarea-Felder getrennt von Checkbox/Radio
- `app/styles/layout.css`
  - wird neu eingefuehrt
  - ist kuenftig Owner fuer:
    - `app-shell`
    - `screen`
    - `screen.is-active`
    - `panel`
    - `panel-head`
    - `panel-head-actions`
    - `row-actions`
    - allgemeine Breiten-/Gap-/Container-Regeln
- `app/styles/ui.css`
  - wird neu eingefuehrt
  - ist kuenftig Owner fuer globale Patterns:
    - `surface-button`
    - `inline-link`
    - `sync-status`
    - `items`
    - `item-row`
    - `item-main`
    - `item-meta`
    - `muted`
    - allgemeine Listen-/Form-Grundmuster
- Feature-Dateien werden eingefuehrt fuer:
  - `home.css`
  - `writing.css`
  - `shopping.css`
  - `devtools.css`
  - `pwa.css`

#### S2 Checkpoint B - Was HESTIA bewusst nicht bekommt

Bewusst nicht beschlossen:
- keine Pflicht-`utilities.css` in diesem ersten Schnitt
  - HESTIA ist dafuer noch zu klein
  - Utilities duerfen spaeter eingefuehrt werden, wenn sich echte Wiederholungsmuster zeigen
- keine eigenstaendige `screens.css`-Schicht mehr als Zielbild
  - die aktuelle Datei ist zu klein und zu unscharf
  - ihre Regeln sollen in:
    - `layout.css`
    - `home.css`
    - `shopping.css`
    - `devtools.css`
    aufgehen
- keine MIDAS-breite Feature-Zerlegung
  - HESTIA bleibt bei wenigen, klaren CSS-Dateien

#### S2 Checkpoint C - Finaler Global-vs-Feature-Vertrag

Global bleiben:
- Buttons und Button-Varianten
- Inline-Links
- Panels und Panel-Header
- Sync-Status
- Listen-Grundmuster
- Form-Grundmuster
- allgemeine mobile Layout-Regeln, wenn sie mehrere Screens betreffen

Feature-spezifisch werden:
- Home-Titel, Actions, Dev-Toggle
- Writing-Form und Writing-Listenbesonderheiten
- Shopping-Papierliste, Shopping-Checkbox-/Meta-Layout, mobile Shopping-Regeln
- Touchlog-Panel, Sidebar, Logfenster, Style-Switches
- Install-Banner und spaetere PWA-spezifische Banner

#### S2 Checkpoint D - Form-Control-Vertrag

Verbindlicher Grundsatz:
- globale Feldregeln duerfen nur auf echte Texteingaben und verwandte Controls gehen
- Checkboxen und Radios bekommen eigene, bewusste Regeln
- Feature-Dateien duerfen Checkboxen weiter verfeinern, aber nicht erst gegen globale Fehlgriffe ankaempfen muessen

Praktischer Zielzuschnitt:
- `base.css`
  - `input:not([type="checkbox"]):not([type="radio"])`
  - `select`
  - `textarea`
  - Fokus-/Placeholder-Regeln
- `base.css` oder `ui.css`
  - kompakte Grundregel fuer `input[type="checkbox"]` und `input[type="radio"]`
- `shopping.css`
  - Shopping-spezifische Checkbox-Proportionen

#### S2 Checkpoint E - Migrationsrelevanter Zielzustand

Nach `S2` gilt fuer die Umsetzung:
- `components.css` wird nicht weiter als Zielarchitektur betrachtet
- `screens.css` wird nicht stabilisiert, sondern im Refaktor aufgeloest
- der Refaktor soll zuerst Schichten klaeren, erst danach ueber visuelle Schoenheit hinaus optimieren
- jeder kuenftige CSS-Block muss in der Migration einen klaren Owner bekommen

### S3 - Migrationsplan fuer Klassen, Imports und Feature-Schnitt festziehen
- S3.1 Final entscheiden, ob `app/app.css` als einziger Einstiegspunkt eingefuehrt wird.
- S3.2 Reihenfolge der kuenftigen Imports verbindlich festlegen.
- S3.3 Migrationsliste erstellen:
  - welche Regeln werden verschoben
  - welche Klassen bleiben
  - welche Klassen werden konsolidiert
- S3.4 Risiko-Stellen fuer sichtbare Regressionspruefungen notieren:
  - Home
  - Writing
  - Shopping
  - Touchlog
  - Install-Banner
- S3.5 Schritt-Abnahme.
- S3.6 Doku-Sync.
- S3.7 Commit-Empfehlung.
- Output: umsetzbarer Refaktor-Plan ohne Blindflug.
- Exit-Kriterium: die eigentliche CSS-Migration kann in logischen Blocks gezogen werden.

#### S3 Checkpoint A - Verbindliche Bundle- und Import-Reihenfolge

`app/app.css` wird als einziger Einstiegspunkt eingefuehrt und importiert kuenftig in dieser Reihenfolge:
1. `./styles/tokens.css`
2. `./styles/base.css`
3. `./styles/layout.css`
4. `./styles/ui.css`
5. `./styles/home.css`
6. `./styles/writing.css`
7. `./styles/shopping.css`
8. `./styles/devtools.css`
9. `./styles/pwa.css`

Begruendung:
- Tokens zuerst
- dann Foundation
- dann strukturelle Layoutbasis
- dann globale UI-Patterns
- erst danach Screen-/Feature-Dateien

Hinweis:
- `utilities.css` bleibt in `S4` nur optional; sie wird nicht prophylaktisch in die Import-Reihenfolge aufgenommen.
- `screens.css` wird nicht weiter importiert, sondern in die Ziel-Dateien aufgeloest.

#### S3 Checkpoint B - Datei-Owner pro Regelgruppe

`tokens.css`
- Farben
- Fonts
- Radius
- Schatten
- Theme-Varianten ueber `data-font-set` und `data-art-style`

`base.css`
- Reset
- `html`, `body`
- `[hidden]`
- Accessibility-/Foundation-Regeln
- Ambient-/Scene-Basis
- globale Form-Control-Grundregeln

`layout.css`
- `.app-shell`
- `.screen`
- `.screen.is-active`
- `.panel`
- `.panel-head`
- `.panel-head-actions`
- `.row-actions`
- gemeinsame responsive Layoutregeln, wenn sie mehrere Screens betreffen

`ui.css`
- `.surface-button`
- `.surface-button.compact`
- `.inline-link`
- `.sync-status`
- `.items`
- `.item-row`
- `.item-main`
- `.item-meta`
- `.muted`
- `.inline-fields`
- allgemeine Form-/Listenmuster

`home.css`
- `.screen-home.is-active`
- `.home-title`
- `.actions`
- `.home-utilities`
- `.home-dev-toggle`

`writing.css`
- `.item-form`
- Writing-spezifische Varianten fuer Liste, Form und Sync-Kopf

`shopping.css`
- `#shopping-list.items`
- `#screen-shopping ...`
- `.check-wrap`
- Shopping-spezifische mobile Regeln

`devtools.css`
- `.font-switch`
- `.font-switch-label`
- `.font-switch-buttons`
- `.font-option`
- `.touchlog-panel`
- `.touchlog-layout`
- `.touchlog-sidebar`
- `.touchlog-log`
- `.semantics-popup`
- `.semantics-popup-item`

`pwa.css`
- `.install-banner`
- `.install-banner-text`
- `.install-banner-label`
- `.install-banner-hint`
- `.install-banner-btn`

#### S3 Checkpoint C - Migrationsreihenfolge fuer `S4`

Die eigentliche Umsetzung laeuft in dieser Reihenfolge:

Block 1 - Bundle einziehen ohne sichtbare Umstrukturierung
- `app/app.css` anlegen
- `index.html` auf den neuen Bundle-Einstieg umstellen
- bestehende vier Dateien zunaechst weiter ueber das Bundle laden

Block 2 - Foundation haerten
- globale Form-Control-Regeln in `base.css` sauber schneiden
- Checkbox/Radio von Textfeldern trennen
- `[hidden]`, Reset, Body, Ambient unveraendert stabil halten

Block 3 - Layout aus `components.css` herausziehen
- `layout.css` anlegen
- `.screen`, `.panel`, `.panel-head`, `.panel-head-actions`, `.row-actions`, `.app-shell` verschieben
- Sichtpruefung auf Home/Writing/Shopping

Block 4 - Globale UI-Patterns herausziehen
- `ui.css` anlegen
- Buttons, Links, Sync-Status, Listen-Grundmuster verschieben
- `components.css` danach weiter verkleinern

Block 5 - Feature-Dateien schneiden
- `home.css`
- `writing.css`
- `shopping.css`
- `devtools.css`
- `pwa.css`
- `screens.css` dabei vollstaendig aufloesen

Block 6 - Sammeldatei aufraeumen
- Restregeln in `components.css` identifizieren
- entweder sauber umhaengen oder Datei vollstaendig entfernen

#### S3 Checkpoint D - Klassenvertrag fuer die Migration

Klassen bleiben in `S4` nach Moeglichkeit unveraendert:
- kein unnötiges Renaming von DOM-Hooks
- JS bleibt fuer diesen Refaktor weitgehend unberuehrt
- `id`- und `class`-Hooks in `index.html`, `writing.js`, `shopping.js`, `touchlog.js`, `font-presets.js`, `art-style-presets.js` bleiben erhalten, solange kein echter Konflikt vorliegt

Das bedeutet:
- der Refaktor ist zuerst ein Datei- und Verantwortungs-Refaktor
- kein Markup-Redesign
- kein CSS-BEM-Neubau

#### S3 Checkpoint E - Regressionstore fuer `S4`

Nach jedem Block in `S4` mindestens pruefen:
- Home:
  - Titel
  - zwei Hauptbuttons
  - Dev-Button
- Writing:
  - Formular
  - Sync-Status
  - offene Liste
- Shopping:
  - Papierliste
  - Checkbox-Proportionen
  - Footer-Aktionen
- Devtools:
  - Touchlog oeffnen/schliessen
  - Stiloptionen
- PWA:
  - Install-Banner sichtbar/versteckt

Besondere Hochrisikostellen:
- globale `input`-Regeln
- mobile Shopping-Overrides
- `row-actions` auf mobilen Screens
- `touchlog-panel` Positionierung
- `install-banner` Sichtbarkeit und Interaktion

#### S3 Checkpoint F - Commit-Schnitt fuer die Umsetzung

Empfohlener Umsetzungs-Schnitt:
- ein gemeinsamer Architektur-Commit fuer:
  - `app/app.css`
  - neue Style-Dateien
  - `index.html`-Importwechsel
  - Aufloesung von `screens.css`
  - starke Entlastung oder Entfernung von `components.css`

Bewertung:
- Der Refaktor ist inhaltlich ein zusammenhaengender Architekturschnitt.
- Kleine Zwischen-Commits sind moeglich waehrend der Arbeit, aber der fachliche Ziel-Commit sollte den neuen CSS-Vertrag als Ganzes zeigen.

### S4 - Repo-Refaktorierung auf den finalen CSS-Vertrag
- S4.1 CSS-Einstiegspunkt und Import-Reihenfolge einziehen.
- S4.2 Globale Foundation aufraeumen:
  - Tokens
  - Base/Reset
  - Form-Control-Grundregeln
- S4.3 Layout-Patterns aus der Sammeldatei herausziehen.
- S4.4 Globale UI-Patterns aus der Sammeldatei herausziehen.
- S4.5 Feature-CSS fuer:
  - home
  - writing
  - shopping
  - devtools
  - pwa
  sauber schneiden.
- S4.6 Alte Sammelregeln entfernen und auf Restdrift pruefen.
- S4.7 Schritt-Abnahme.
- S4.8 Doku-Sync.
- S4.9 Commit-Empfehlung.
- Output: HESTIA-CSS entspricht dem finalen Schichtvertrag.
- Exit-Kriterium: kein zentraler Sammel-Style-Blob mehr als Architektur-Owner.

#### S4 Checkpoint A - Bundle-Einstieg ist eingezogen

- `app/app.css` existiert jetzt als zentraler CSS-Einstiegspunkt.
- `index.html` bindet keine vier Einzeldateien mehr ein, sondern nur noch das Bundle.
- Der sichtbare CSS-Bestand ist dabei bewusst noch unveraendert geblieben:
  - `tokens.css`
  - `base.css`
  - `components.css`
  - `screens.css`
  werden aktuell nur ueber das Bundle geladen.

Bewertung:
- `S4.1` ist sauber abgeschlossen.
- Der Refaktor hat damit jetzt einen zentralen Ladeweg, ohne schon visuelle Regressionen durch die eigentliche Stil-Zerlegung zu riskieren.

#### S4 Checkpoint B - Foundation ist gegen Input-Drift gehaertet

- Globale `label`- und Feldregeln liegen jetzt in `base.css` statt in `components.css`.
- Die Foundation unterscheidet jetzt explizit zwischen:
  - Texteingaben / `select` / `textarea`
  - `checkbox` / `radio`
- Fokus- und Placeholder-Regeln fuer echte Felder sitzen jetzt ebenfalls in `base.css`.
- `components.css` enthaelt diese breiten Foundation-Regeln nicht mehr.

Bewertung:
- `S4.2` ist sauber abgeschlossen.
- Der reale Drift-Punkt aus dem Shopping-Screen ist damit auf Schichtebene entschärft, bevor die eigentliche Datei-Zerlegung beginnt.

#### S4 Checkpoint C - Erste Layout-Owner sind aus der Sammeldatei geloest

- `layout.css` ist neu eingefuehrt und bereits im Bundle verankert.
- Dorthin verschoben wurden:
  - `.app-shell`
  - `.screen`
  - `.screen.is-active`
  - `.panel`
  - `.panel-head`
  - `.panel-head-actions`
  - `.row-actions`
  - `@keyframes screen-fade`
- `screens.css` wurde dabei um den globalen `row-actions`-Mobile-Block entlastet.
- Zusaetzlich wurde die Placeholder-Regel in `base.css` direkt bereinigt, damit die Foundation nicht mit einer fragilen Selector-Liste weiterlebt.

Bewertung:
- `S4.3` ist sauber abgeschlossen.
- Der Refaktor hat jetzt den ersten echten Schichtschnitt: Foundation und Layout sind nicht mehr nur logisch, sondern dateiseitig getrennt.

#### S4 Checkpoint D - Globale UI-Patterns haben jetzt einen eigenen Owner

- `ui.css` ist neu eingefuehrt und im Bundle zwischen `layout.css` und `components.css` verankert.
- Dorthin verschoben wurden die globalen UI-Patterns:
  - `h2`, `h3`
  - `.surface-button`
  - `.surface-button.compact`
  - `.sync-status`
  - `.inline-link`
  - `.inline-fields`
  - `.items`
  - `.item-row`
  - `.item-main`
  - `.item-meta`
  - `.muted`
- `components.css` traegt diese globalen Patterns nicht mehr und konzentriert sich damit weiter auf Home-, Writing-, Shopping-, Devtools- und PWA-nahe Regeln.

Bewertung:
- `S4.4` ist sauber abgeschlossen.
- HESTIAs Sammeldatei ist damit nicht mehr Owner fuer globale UI-Grundmuster; der naechste Schritt ist jetzt die eigentliche Feature-Zerlegung.

#### S4 Checkpoint E - Feature-CSS ist jetzt sauber geschnitten

- Neue Feature-Dateien sind eingefuehrt und im Bundle verankert:
  - `home.css`
  - `writing.css`
  - `shopping.css`
  - `devtools.css`
  - `pwa.css`
- Die verbleibenden Regeln aus `components.css` und `screens.css` wurden in diese Owner-Dateien oder in `ui.css` verschoben.
- `writing.css` traegt dabei bewusst auch die Semantik-Popup-Regeln, weil sie funktional zum Writing-Flow gehoeren und nicht zum Devtools-Bereich.
- Die globalen mobilen UI-Overrides fuer `.surface-button` und `.inline-fields` wurden aus `screens.css` in `ui.css` nachgezogen.
- `components.css` und `screens.css` sind jetzt funktional leer und dienen nur noch als Legacy-Marker bis `S4.6`.

Bewertung:
- `S4.5` ist sauber abgeschlossen.
- HESTIAs CSS folgt jetzt nicht mehr nur logisch, sondern dateiseitig dem Schichtvertrag fuer:
  - Foundation
  - Layout
  - globale UI
  - Home
  - Writing
  - Shopping
  - Devtools
  - PWA

#### S4 Checkpoint F - Legacy-Dateien sind entfernt und der aktive Bestand ist sauber

- `components.css` und `screens.css` sind nicht mehr Teil des aktiven Repos.
- `app/app.css` importiert jetzt ausschliesslich den finalen Zielbestand:
  - `tokens.css`
  - `base.css`
  - `layout.css`
  - `ui.css`
  - `home.css`
  - `writing.css`
  - `shopping.css`
  - `devtools.css`
  - `pwa.css`
- Der Service Worker precached jetzt den neuen CSS-Schnitt inklusive `app/app.css` und der neuen Owner-Dateien.
- Damit ist der Architekturschnitt in der Laufzeitrealitaet angekommen und nicht mehr nur im CSS-Bundle selbst.

Bewertung:
- `S4.6` ist sauber abgeschlossen.
- Der verbleibende `S4`-Rest ist jetzt prozessual:
  - Schritt-Abnahme
  - Doku-Sync
  - Commit-Empfehlung

#### S4 Checkpoint G - Schritt-Abnahme und Doku-Sync sind erfolgt

- Der aktive CSS-Bestand besteht jetzt nur noch aus:
  - `tokens.css`
  - `base.css`
  - `layout.css`
  - `ui.css`
  - `home.css`
  - `writing.css`
  - `shopping.css`
  - `devtools.css`
  - `pwa.css`
- Laufzeitrelevanter Code referenziert keine entfernten Legacy-Dateien mehr.
- Betroffene Doku-Stellen mit konkreten CSS-Dateipfaden wurden auf den neuen Schnitt aktualisiert:
  - `PRODUCT.md`
  - `docs/modules/Home Module Overview.md`
  - `docs/modules/Writing Module Overview.md`
  - `docs/modules/Shopping Module Overview.md`
  - `hestia-shared-list-sync-roadmap.md`
  - `docs/HESTIA Sync Behavior, Conflicts & Status Roadmap.md`

Bewertung:
- `S4.7` und `S4.8` sind damit gemeinsam sauber abgeschlossen.
- Der Repo- und Doku-Zustand sprechen jetzt denselben CSS-Vertrag.

#### S4 Checkpoint H - Commit-Empfehlung

Empfohlener Commit-Schnitt:
- Ein gemeinsamer Architektur-Commit fuer den gesamten CSS-Refaktor von `S4.1` bis `S4.9`.

Begruendung:
- Der CSS-Vertrag ist jetzt erst als Ganzes sinnvoll lesbar:
  - Bundle-Einstieg
  - Foundation
  - Layout
  - globale UI
  - Feature-Dateien
  - Entfernung der Legacy-Dateien
  - Doku-Sync

Empfohlene Commit-Botschaft:
- `refactor(css): split HESTIA styles into bundle, ui, layout and feature files`

Bewertung:
- `S4.9` ist abgeschlossen.
- `S4` ist damit fachlich und repo-seitig beendet; der naechste Block ist `S5`.

### S5 - CSS-Doku, QA und Abschlussbewertung
- S5.1 `docs/modules/CSS Module Overview.md` fuer HESTIA anlegen.
- S5.2 README oder passende Einstiegsdoku um den CSS-Einstiegspunkt ergaenzen.
- S5.3 Mobile und Desktop Smokechecks fuer:
  - Home
  - Writing
  - Shopping
  - Dev/Touchlog
  - PWA-Banner
  definieren und fahren.
- S5.4 Restrisiken und offene spaetere Design-Nachzuege explizit notieren.
- S5.5 Schritt-Abnahme.
- S5.6 Doku-Sync.
- S5.7 Commit-Empfehlung.
- Output: dokumentierter, testbarer CSS-Unterbau fuer HESTIA.
- Exit-Kriterium: kuenftige UI-Arbeit kann wieder gezielt an definierten CSS-Orten passieren.

#### S5 Checkpoint A - CSS-Modul-Doku steht

- `docs/modules/CSS Module Overview.md` existiert jetzt als eigener CSS-Vertrag fuer HESTIA.
- Die Datei beschreibt:
  - Einstiegspunkt
  - Import-Reihenfolge
  - Owner pro CSS-Datei
  - Guardrails
  - praktische Zuordnung fuer kuenftige Styling-Arbeit

#### S5 Checkpoint B - Einstiegs- und QA-Doku sind nachgezogen

- `README.md` verweist jetzt explizit auf das CSS Module Overview.
- `docs/QA_CHECKS.md` enthaelt jetzt eigene CSS-Architektur-Smokes fuer:
  - Home
  - Writing
  - Shopping
  - Devtools
  - Install-Banner

#### S5 Checkpoint C - Abschlussbewertung

- HESTIA besitzt jetzt einen klaren CSS-Einstiegspunkt, klare Owner-Dateien und keine aktive Sammeldatei mehr.
- Code, Service Worker, Modul-Doku, QA und Roadmap sprechen denselben CSS-Vertrag.
- Die noch offenen Live-Smokes sind bewusst als manueller Folgeschritt vorbereitet und nicht mehr als Strukturblocker zu werten.

#### S5 Checkpoint D - Commit-Empfehlung

Empfohlene Commit-Botschaft:
- `refactor(css): split HESTIA styles into bundle, ui, layout and feature files`

Bewertung:
- `S5` ist abgeschlossen.
- Die CSS-Roadmap ist damit insgesamt `DONE`.

## Smokechecks / Regression (Definition)
- Home-Screen sieht nach dem Refaktor unveraendert oder besser aus.
- Writing-Form und offene Liste bleiben funktional und visuell stabil.
- Shopping-Screen bleibt mobil sauber lesbar.
- Checkboxen und Textinputs beeinflussen sich nicht mehr versehentlich.
- Touchlog-/Dev-Panel bleibt oeffnend, lesbar und responsiv.
- Install-Banner bleibt korrekt sichtbar/versteckt.
- Es gibt keinen sichtbaren Flash of broken layout durch falsche Import-Reihenfolge.

## Abnahmekriterien
- HESTIA besitzt einen klaren CSS-Einstiegspunkt.
- Tokens, Base, Layout, globale UI-Patterns und Feature-Styles sind nachvollziehbar getrennt.
- Form-Control-Grundregeln sind robust genug, um Checkbox-/Input-Drift zu verhindern.
- Neue Chats koennen Styling schneller verorten als heute.
- CSS-Doku, Repo-Struktur und sichtbares UI sprechen denselben Vertrag.

## Risiken
- Zu viele Dateien koennten fuer HESTIA mehr Komplexitaet erzeugen als Nutzen.
- Ein zu grosser Refaktor in einem Schritt koennte sichtbare Regressionswellen ausloesen.
- Wenn globale Patterns zu frueh in Feature-Dateien wandern, droht neue Drift statt weniger Drift.
- Wenn MIDAS zu woertlich kopiert wird, verliert HESTIA seinen kleineren, pragmatischen Schnitt.
