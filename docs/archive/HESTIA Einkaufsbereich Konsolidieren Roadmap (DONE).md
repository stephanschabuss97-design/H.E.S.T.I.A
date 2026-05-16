# HESTIA Roadmap 6A - Einkaufsbereich konsolidieren (DONE)

## Ziel (klar und pruefbar)

HESTIA soll im technisch bestehenden `Schreiben`-Bereich das Panel `Offene Liste` zur echten Einkaufsliste weiterentwickeln: gleiche Kopfstruktur wie heute, darunter die charmante Papierliste mit Abhaken, Loeschen, Abschluss und Kassa-Hilfe. Sichtbar darf dieser kombinierte Bereich nach der Umsetzung schlicht `Einkauf` heissen, waehrend interne Route und Modulgrenzen stabil bleiben.

Diese Roadmap loescht den bestehenden separaten `Einkaufen`-Bereich bewusst noch nicht.

Pruefbare Zieldefinition:

- Der aktuelle technische `Schreiben`-Screen bleibt der Umbauort.
- Das obere Schreib-/Formularpanel bleibt in Struktur, Titel und Grundlayout unveraendert.
- Die bisherige `Offene Liste` im Schreiben wird durch die staerkere Papierlisten-Darstellung aus `Einkaufen` ersetzt oder daran angeglichen.
- Der Kopf des `Offene Liste`-Panels bleibt im Grundsatz wie heute:
  - links Titel und Sync-Status.
  - rechts `Liste freigeben` und `Liste leeren`.
- Eintraege koennen im `Offene Liste`-Panel direkt als `Im Wagen` markiert werden.
- `Loeschen` pro Eintrag bleibt im `Offene Liste`-Panel verfuegbar.
- `Liste freigeben`, Sync-Status, Pending-Remote und `Liste leeren` bleiben erhalten.
- `Liste abschliessen` wird in das `Offene Liste`-Panel uebernommen und entfernt nur Eintraege mit `inCart === true`.
- Das Kassa-Karussell wird in das `Offene Liste`-Panel uebernommen und bleibt unterhalb von `Liste abschliessen`.
- Der bestehende separate `screen-shopping` bleibt nach dieser Roadmap technisch bestehen.
- Keine Amazon-Liste wird in dieser Roadmap umgesetzt.
- Keine SQL-, Supabase-Schema- oder Datenvertragsaenderung wird eingefuehrt.

## Problemzusammenfassung

HESTIA hat historisch zwei Hauptbereiche fuer einen einzigen Haushaltsvorgang:

- `Schreiben`: Dinge auf die Einkaufsliste setzen und verwalten.
- `Einkaufen`: dieselbe Liste unterwegs als Papierliste abhaken.

Technisch und fachlich arbeiten beide Bereiche auf derselben Liste. Produktseitig ist `Schreiben` deshalb eher ein Modus des Einkaufsflusses als ein eigener Zielbereich. Die aktuelle Trennung erzeugt auf Home zwei Kacheln fuer denselben Kernprozess und macht die spaetere Amazon-Liste schwerer sauber einzupassen.

Der bessere Zwischenzustand ist kein kompletter Screen-Umbau, sondern ein staerkeres `Offene Liste`-Panel: oben bleibt das Schreiben vertraut, unten wird die Liste endlich zur echten Einkaufsliste. Die Praxis wird zeigen, ob danach noch eine Home-/Screen-Konsolidierung sinnvoll ist.

## Scope

- Bestehenden `screen-writing` gezielt erweitern:
  - oberes Schreibpanel bleibt stabil.
  - Interne Route `writing` bleibt stabil.
  - Sichtbarer Titel und Home-Copy duerfen nach der Konsolidierung zu `Einkauf` wechseln.
  - Produktfeld, Menge, Einheit und Add-Button bleiben im bestehenden Grundlayout.
  - Semantik und Unit-Inferenz bleiben unveraendert.
- Listenbereich im Writing:
  - `Offene Liste` fachlich zu einer Einkaufsliste mit Abhaken weiterentwickeln.
  - Panelkopf mit Titel, Sync-Status, `Liste freigeben` und `Liste leeren` im Grundsatz beibehalten.
  - Papierlisten-Layout aus Shopping uebernehmen oder bewusst wiederverwenden.
  - Checkbox/Zeilentap fuer `Im Wagen` ermoeglichen.
  - `Loeschen` pro Eintrag beibehalten.
  - Mengen-/Einheitenanzeige weiter ueber `formatItemMeta`.
  - Leerer Zustand ruhig halten.
- Listenaktionen:
  - `Liste freigeben` beibehalten.
  - Sync-Status beibehalten.
  - `Anderen Stand uebernehmen` beibehalten.
  - `Liste leeren` beibehalten.
  - `Liste abschliessen` unterhalb der Papierliste aufnehmen.
  - Abschluss entfernt nur `inCart === true`; nicht abgehakte Eintraege bleiben offen.
- Kassa-Karussell:
  - Im `Offene Liste`-Panel unterhalb von `Liste abschliessen` platzieren.
  - Vier feste Kassa-Links bleiben unveraendert.
  - Kein Kassa-Verhalten fuer Amazon in dieser Roadmap.
- Bestehender Shopping-Screen:
  - bleibt zunaechst erhalten.
  - darf als Vergleichs- und Rueckfallflaeche dienen.
  - wird in dieser Roadmap nicht geloescht.
- Home:
  - darf als Folge der Konsolidierung sichtbar nachgezogen werden.
  - `Schreiben` wird sichtbar zu `Einkauf`.
  - keine finale Entfernung der `Einkaufen`-Kachel in dieser Roadmap.
  - die zweite Kachel darf sichtbar `Amazon` heissen, bleibt aber technisch bis zur Amazon-Roadmap ein Platzhalter auf dem bestehenden `shopping`-Ziel.
- Doku und QA:
  - Writing, Shopping, Kassa Carousel, Home, CSS, State/Supabase-Sync und QA nach Abschluss synchronisieren, soweit der Code wirklich betroffen ist.
  - Amazon-Roadmap nach Abschluss als Folge-Roadmap neu bewerten oder erkennbar als abhaengig markieren.

## Not in Scope

- Keine Loeschung des bestehenden `screen-shopping`.
- Keine Entfernung der aktuellen Home-Kachel `Einkaufen`.
- Die bisherige Home-Kachel `Schreiben` darf sichtbar in `Einkauf` umbenannt werden, ohne die interne Navigation `writing` zu aendern.
- Keine Amazon-Liste und keine Amazon-Listenlogik.
- Eine sichtbare Amazon-Home-Kachel ist nur als Platzhalter erlaubt und nutzt bis zur Folge-Roadmap keine eigene Persistenz oder Route.
- Kein `list_type` / `listType`.
- Keine SQL-, RLS-, Auth-, Household-Key- oder Supabase-Schema-Aenderung.
- Keine neue Tabelle.
- Keine Aenderung am Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart`.
- Keine robuste Live-Collaboration.
- Kein Auto-Save bei jedem Tastendruck.
- Auto-Freigabe nach bewusstem `Item hinzufuegen` darf in S4 als eigene Vertragsentscheidung geprueft werden.
- Keine Offline-Queue, kein Background Sync, kein Merge-Editor.
- Keine Push-, Reminder- oder Notification-Logik.
- Keine Undo-/Historienlogik.
- Kein Produktkatalog, keine Kategorienpflicht, keine harte Semantikvalidierung.
- Kein Home-Dashboard und keine weiteren Haushaltsbereiche.
- Keine neue Dependency, kein Build-Step, kein Framework.
- Keine Umgestaltung des Waste-Bereichs.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`
- `app/core/state.js`
- `app/core/router.js`
- `app/core/item-display.js`
- `app/core/semantics.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/modules/kassa-carousel.js`
- `app/supabase/list-sync.js`
- `app/styles/writing.css`
- `app/styles/shopping.css`
- `app/styles/ui.css`
- `app/styles/layout.css`
- `app/styles/home.css`, nur lesend oder fuer spaetere Home-Entscheidung
- `app/app.css`, nur falls CSS-Owner geaendert werden
- `sw.js`, nur falls neue statische Dateien entstehen

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/QA_CHECKS.md`
- `docs/HESTIA Amazon Liste Roadmap.md`
- `docs/archive/HESTIA Einkaufsflow Veredeln Roadmap (DONE).md`
- `docs/archive/HESTIA Schreiben Speichern Listenvertrauen Roadmap (DONE).md`
- `docs/archive/HESTIA Kassa Karussell Roadmap (DONE).md`
- `docs/archive/HESTIA Entsorgung UI Roadmap (DONE).md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/Amazon Module Overview.md`
- `docs/modules/Kassa Carousel Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Home Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`

Regel:

- Erst Produkt-, Writing-, Shopping-, Kassa- und Sync-Vertraege lesen.
- Dann bestehenden Code lesen.
- S1 bis S3 bleiben reine Doku-/Detektivarbeit.
- Erst S4 aendert Code.

## Zielbild fuer das `Offene Liste`-Panel

Finales S2-UI-Ziel:

```text
Offene Liste                                      [Liste freigeben]
Fuer den Haushalt freigegeben um 13:55.            [Liste leeren]

[Papierliste]
[ ] Milch                         2 l        Loeschen
[ ] Joghurt                       3 Weiss    Loeschen
[x] Batterien                               Loeschen

[Liste abschliessen]

[Kassa-Karussell]
```

Wichtige Gestaltungsregel:

- Das obere Schreibpanel bleibt vertraut.
- Der Kopf des `Offene Liste`-Panels bleibt vertraut.
- Die Papierliste wird die Arbeitsflaeche im zweiten Panel.
- Verwaltungsaktionen bleiben sichtbar, aber nicht lauter als die Liste.
- `Liste abschliessen` steht unterhalb der Papierliste und ist nur aktiv, wenn mindestens ein Eintrag `Im Wagen` ist.
- Das Kassa-Karussell steht unterhalb von `Liste abschliessen` und bleibt sichtbar sekundar.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug fuer den gemeinsamen Einkaufsfluss.
- Der Umbau macht den Einkaufsfluss klarer, nicht groesser.
- Der Schreibbereich bleibt weiterhin schneller als Papier plus Zuruf.
- Freitext bleibt immer erlaubt.
- `Im Wagen` bleibt der einzige operative Einkaufsstatus.
- Abschluss loescht nur gekaufte Eintraege; offene Eintraege bleiben sichtbar.
- `Liste freigeben` bleibt bewusster Nutzerimpuls.
- Pending Remote bleibt bewusst und darf lokale Arbeit nicht still ueberschreiben.
- Kassa bleibt Kassahilfe, kein App-Portal.
- Der alte Einkaufsbereich bleibt bis nach dieser Roadmap erhalten.
- Amazon wird nicht vorgezogen.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules.
- Kein Build-Step.
- Keine neue Dependency.
- `state.items` bleibt operative UI-Wahrheit.
- `localStorage`-Key bleibt `hestia.v1.items`.
- Supabase bleibt Snapshot-Sync ueber denselben Datenvertrag.
- Es wird kein neuer Store und keine neue Liste eingefuehrt.
- Gemeinsame Render-/UI-Helper duerfen nur entstehen, wenn sie echte Doppelung zwischen Writing und Shopping reduzieren und den engeren Panel-Umbau nicht ausweiten.
- CSS-Owner:
  - Writing-spezifische Komposition nach `app/styles/writing.css`.
  - Papierlisten-/Shopping-Optik kann aus `app/styles/shopping.css` wiederverwendet oder bewusst in ein gemeinsames Pattern ueberfuehrt werden.
  - Globale Muster nur bei echter Wiederverwendung nach `app/styles/ui.css`.
- PWA-Cache wird nur angepasst, wenn neue statische Dateien entstehen.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus und Codepfade.
- Aendern von:
  - `index.html`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`, nur falls Wiederverwendung/Helper oder Regression es eng erfordert
  - `app/modules/kassa-carousel.js`, nur falls Initialisierung/Markup-Owner eng betroffen ist
  - `app/main.js`, nur falls Kassa-Initialisierung fuer neuen Ort angepasst werden muss
  - `app/core/state.js`, nur falls S1-S3 einen engen Bedarf fuer bestehende Operationen belegen
  - `app/core/item-display.js`, nur falls Darstellung wirklich gemeinsam korrigiert werden muss
  - `app/styles/writing.css`
  - `app/styles/shopping.css`
  - `app/styles/ui.css`
  - `app/styles/layout.css`, nur bei belegtem Layoutbedarf
  - `sw.js`, nur falls neue App-Shell-Dateien entstehen
  - betroffene Module Overviews
  - `docs/QA_CHECKS.md`
  - `docs/future roadmaps.md`
  - diese Roadmap
- Lokale Checks:
  - `node --check`
  - Fake-DOM-/State-Smokes mit Node, falls sinnvoll
  - `git diff --check`
  - lokaler Browser-Smoke ueber `python -m http.server`
  - Desktop-/Mobile-Smoke manuell oder per Playwright, falls verfuegbar

Forbidden:

- Loeschung des bestehenden Shopping-Screens.
- Amazon-Feature, Amazon-UI oder Amazon-Datenmodell.
- SQL/RLS/Auth/Household-Key/Supabase-Schema-Aenderungen.
- Auto-Save bei jedem Tastendruck, Push, Reminder, Notification, Offline-Queue, Merge-Editor, CRDT.
- Auto-Freigabe nach bewusstem Submit ist nur erlaubt, wenn der eigene S4-Contract-Gate sie explizit beschliesst.
- Neue Dependencies oder Build-Tools.
- Waste-Umbau.
- Home-Dashboard oder neue Haushaltsbereiche.
- Bestehende Nutzer- oder Sync-Vertraege still umdeuten.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Doku-, Detektiv- und Contract-Arbeit.
- S4 wird in kleinen Substeps umgesetzt.
- S5 prueft lokal und manuell moegliche Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnis.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 16.05.2026

Review-Frage:

- Darf HESTIA das `Offene Liste`-Panel im `Schreiben`-Bereich um Einkaufsfunktionen erweitern, ohne den Kernfluss zu verkomplizieren?

Entscheidung:

- Ja, wenn der Umbau nur das bestehende `Offene Liste`-Panel erweitert, die Staerken der Papierliste uebernimmt, alle bestehenden Schreib-/Sync-Vertraege erhaelt und den alten `Einkaufen`-Screen noch nicht loescht.

Findings:

- CR-K-F1: Der Produktvertrag nennt `Schreiben` und `Einkaufen` bisher als zwei Kernintentionen. Eine Zusammenfuehrung ist eine bewusste Produktentscheidung und darf nicht still passieren.
- CR-K-F2: Wenn Papierliste, Loeschen, Sync, Abschluss und Kassa im zweiten Panel gleichzeitig sichtbar sind, kann das `Offene Liste`-Panel ueberladen wirken.
- CR-K-F3: `Liste abschliessen` im Schreibbereich kann mit `Liste leeren` verwechselt werden, wenn Hierarchie und Copy nicht sauber sind.
- CR-K-F4: Checkboxen plus `Loeschen` in derselben Zeile koennen auf Mobile zu engen Trefferflaechen oder Fehlklicks fuehren.
- CR-K-F5: Kassa-Karussell im `Offene Liste`-Panel kann zu frueh im Ablauf wirken, wenn es optisch vor Abschluss/Listenaktionen steht.
- CR-K-F6: Eine voreilige Entfernung des alten Shopping-Screens wuerde Vergleich, Regression und Rueckfall unnoetig erschweren.
- CR-K-F7: Gemeinsame Logik zwischen Writing und Shopping kann zu breitem Refactor werden, wenn S4 nicht klein geschnitten wird.
- CR-K-F8: Amazon darf nicht parallel mitgebaut werden, weil sonst Datenmodell- und Informationsarchitekturfragen vermischt werden.
- CR-K-F9: Home-Texte koennen spaeter semantisch neu bewertet werden muessen; in dieser Roadmap bleibt Home aber bewusst stabil.
- CR-K-F10: PWA-Cache und Kassa-Initialisierung koennen brechen, falls Markup/Module verschoben werden.

Korrekturen:

- Scope sagt explizit: nur das `Offene Liste`-Panel im `screen-writing` wird in dieser Roadmap umgebaut.
- Not in Scope verbietet die Loeschung des bestehenden `screen-shopping`.
- Not in Scope verbietet Amazon, `listType`, SQL und Supabase-Schema.
- Zielbild setzt die Papierliste als Arbeitsflaeche in das bestehende `Offene Liste`-Panel.
- S2/S3 muessen Hierarchie von `Liste freigeben`, `Liste abschliessen`, `Liste leeren` und `Loeschen` finalisieren.
- S3 muss Mobile-Trefferflaechen und Row-Layout als Bruchrisiko pruefen.
- S4 muss in Substeps erst Papierliste/Checkboxen, dann Actions, dann Kassa, dann Reviews bauen.
- Home bleibt in dieser Roadmap stabil; keine finale Home-Kachel-Loeschung in dieser Roadmap.
- Amazon-Roadmap wird als Folge-Roadmap betrachtet und nach dieser Konsolidierung neu bewertet.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System-, UI- und Vertragsdetektivarbeit | DONE | Ist-Vertraege gelesen; CSS-/Kassa-Owner, Sync-Grenzen und Future-Roadmap-Scope als Findings dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | UI-, Action-, State-, Sync-, Kassa- und Nicht-Loeschungs-Vertrag fuer das `Offene Liste`-Panel finalisiert. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | Mobile-/Touch-Vertrag, CSS-Owner, Kassa-Mehrinstanz und S4-Substeps konkretisiert. |
| S4 | Umsetzung | DONE | Writing-Panel enthaelt Papierliste, Auto-Freigabe, Abhaken, Loeschen, Abschluss und Kassa; alter Shopping-Screen bleibt. |
| S5 | Tests, Code Review und Contract Review | DONE | Lokale Syntax-, State-, DOM-/Hook-, Kassa-, Sync- und Contract-Smokes gruen; Browser-/Familien-Smokes bleiben manuell. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | Module Overviews, QA, README/PRODUCT, Future Roadmaps und Amazon-Folgeplanung synchronisiert; Roadmap ist archivbereit. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System-, UI- und Vertragsdetektivarbeit

Ziel:

- Ist-Zustand von Writing, Shopping, Kassa, State und Sync verstehen.
- Eingriffsgrenzen klaeren, bevor Code geschrieben wird.

Substeps:

- S1.1 README, PRODUCT und diese Roadmap lesen.
- S1.2 Writing-, Shopping-, Kassa-, State-, Supabase-Sync-, Home- und CSS-Overviews lesen.
- S1.3 DONE-Roadmaps 1, 2 und 4 als Historie fuer Shopping, Writing und Kassa lesen.
- S1.4 `index.html`, `writing.js`, `shopping.js`, `kassa-carousel.js`, `state.js`, `list-sync.js` lesen.
- S1.5 Aktuelle Verantwortlichkeiten dokumentieren:
  - Add/Remove/Clear/Freigabe in Writing.
  - Checkbox/Finish/Kassa in Shopping.
  - gemeinsame `state.items`-Wahrheit.
- S1.6 CSS-Owner und moegliche Wiederverwendungsgrenzen pruefen.
- S1.7 Sync-/Pending-Remote-Vertrag fuer das erweiterte `Offene Liste`-Panel pruefen.
- S1.8 Erste Findings und offene Fragen dokumentieren.
- S1.9 S1 Contract Review.
- S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- Es ist klar, welche Schichten fuer die Kombination betroffen sind und welche ausdruecklich nicht.

### S1 Ergebnisprotokoll 16.05.2026

Gelesene Referenzen:

- `README.md`
- `PRODUCT.md`
- diese Roadmap
- `docs/future roadmaps.md`
- `docs/HESTIA Amazon Liste Roadmap.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/Amazon Module Overview.md`
- `docs/modules/Kassa Carousel Module Overview.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Home Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/QA_CHECKS.md`
- DONE-Roadmaps fuer Writing, Shopping, Kassa und Entsorgung UI als historische Referenz
- `index.html`
- `app/main.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/modules/kassa-carousel.js`
- `app/core/state.js`
- `app/supabase/list-sync.js`
- `app/styles/writing.css`
- `app/styles/shopping.css`
- `app/styles/ui.css`

Ist-Verantwortlichkeiten:

- `writing.js` besitzt aktuell Formular, Add, einzelne `Loeschen`-Aktion, `Liste leeren`, `Liste freigeben`, Sync-Status und Pending-Remote-Uebernahme.
- `shopping.js` besitzt aktuell Papierlisten-Rendering, Checkbox/`Im Wagen`, `Liste abschliessen` und direkte Snapshot-Saves fuer Toggle/Finish.
- `state.js` bleibt gemeinsame operative Wahrheit mit `items`, `toggleInCart`, `removeItem`, `clearAll` und `finishShopping`.
- `list-sync.js` speichert weiterhin nur Snapshots ueber denselben Item-Vertrag `id`, `name`, `quantity`, `unit`, `inCart`.
- `kassa-carousel.js` ist UI-fluechtig, speichert keinen Listen-State und veraendert keine Sync- oder State-Vertraege.

CSS-/Markup-Befund:

- Die Papierlisten- und Kassa-Styles liegen aktuell in `app/styles/shopping.css` und sind groesstenteils an `#screen-shopping` bzw. `#shopping-list.items` gebunden.
- Diese Selektoren wirken deshalb nicht automatisch im Writing-Panel.
- Fuer S4 muss bewusst entschieden werden, ob die Papierlisten-Optik eng nach Writing dupliziert, selektiv in ein gemeinsames Pattern gehoben oder ueber gemeinsame Klassen wiederverwendet wird.
- Ein breiter CSS-Refactor ist nicht durch S1 begruendet; der kleine Panel-Umbau bleibt fuehrend.

Kassa-Befund:

- Das aktuelle Markup enthaelt genau ein `data-kassa-carousel`.
- `initKassaCarousel(document, touchlog)` nutzt `querySelector` und initialisiert damit nur das erste gefundene Karussell.
- Wenn S4 ein zweites Karussell im Writing-Panel ergaenzt und der alte Shopping-Screen erhalten bleibt, muss die Initialisierung mehrinstanzfaehig werden oder das Markup bewusst anders geloest werden.
- Das ist ein S4-Risiko, aber kein Grund fuer Daten- oder Produktvertragsaenderungen.

Sync-/State-Befund:

- Ausgangsbefund vor S4: Add blieb bewusst lokal bis `Liste freigeben`.
- `Loeschen`, `Liste leeren`, Shopping-Toggle und Shopping-Abschluss schreiben bei konfiguriertem Sync direkte Snapshots.
- Pending Remote darf lokale Writing-Arbeit nicht still ueberschreiben.
- Das erweiterte `Offene Liste`-Panel muss diese Regeln bewusst weiterentwickeln: Checkbox und Abschluss duerfen gemeinsame Snapshots speichern; Auto-Freigabe nach Add wurde spaeter in S4.6 als eigene Vertragsentscheidung umgesetzt.

### S1 Findings

- S1-F1: `docs/future roadmaps.md` beschrieb Roadmap 6A noch zu breit als vollstaendige Zusammenfuehrung mit kompakter Eingabe. Das widerspricht der aktuellen Entscheidung, nur das bestehende `Offene Liste`-Panel zu erweitern.
- S1-F2: Papierlisten- und Kassa-CSS sind Shopping-gescoped. S4 darf nicht davon ausgehen, dass Kopieren von Markup allein reicht.
- S1-F3: Die Kassa-Initialisierung ist aktuell Single-Instance. Zwei Karussells im DOM wuerden ohne Anpassung nicht sauber funktionieren.
- S1-F4: `PRODUCT.md` nannte zu diesem Zeitpunkt `Schreiben` und `Einkaufen` weiterhin als zwei Kernintentionen. Das wurde spaeter in S6 auf den sichtbaren Bereich `Einkauf` nachgezogen.
- S1-F5: `Liste abschliessen` im Writing-Panel uebernimmt Shopping-Semantik in einen Bereich, der bisher auch destruktive Verwaltung enthaelt. S2 muss die Action-Hierarchie sauber finalisieren.

### S1 Contract Review

Review-Frage:

- Darf S4 das `Offene Liste`-Panel im Writing-Screen erweitern, ohne den Produkt-, State-, Sync- und CSS-Vertrag still zu verschieben?

Entscheidung:

- Ja. Der Umbau ist vertraglich zulaessig, wenn er auf dem bestehenden Item-Vertrag bleibt, den alten Shopping-Screen nicht loescht, Home stabil laesst, Add/Freigabe/Pending-Remote unveraendert respektiert und CSS-/Kassa-Wiederverwendung bewusst klein entscheidet.

Korrekturen aus S1:

- `docs/future roadmaps.md` wurde auf den engeren 6A-Scope korrigiert: nicht kompletter Bereichsumbau, sondern Erweiterung des `Offene Liste`-Panels im bestehenden Schreiben-Screen.
- Diese Roadmap dokumentiert CSS-Owner, Single-Instance-Kassa-Risiko und Sync-Grenzen ausdruecklich als S1-Ergebnis.

Schritt-Abnahme:

- S1 ist abgeschlossen.
- Doku-Sync-Entscheidung: Nur `docs/future roadmaps.md` und diese Roadmap mussten sofort synchronisiert werden; Module Overviews bleiben bis nach Code-S4 unveraendert.
- Commit-Empfehlung: Noch kein separater Commit noetig; S1 ist Teil der Roadmap-Vorbereitung.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Finaler Produkt-, UI-, Copy-, State-, Sync- und Nicht-Loeschungs-Vertrag fuer das `Offene Liste`-Panel.

Substeps:

- S2.1 Bestaetigen, dass Screen-Titel, oberes Schreibpanel und Home-Kachel zunaechst stabil bleiben; spaetere Namensentscheidung wird nur mit explizitem Contract Review erlaubt.
- S2.2 Kopf des `Offene Liste`-Panels finalisieren:
  - Titel.
  - Sync-Status.
  - `Liste freigeben`.
  - `Liste leeren`.
- S2.3 Papierlisten-Vertrag finalisieren:
  - Checkbox/Zeilentap.
  - `Loeschen` pro Zeile.
  - Mengen-/Einheitenanzeige.
  - Leerzustand.
- S2.4 Action-Hierarchie finalisieren:
  - `Liste freigeben`.
  - `Liste abschliessen`.
  - `Liste leeren`.
  - `Anderen Stand uebernehmen`.
- S2.5 Abschlusslogik im `Offene Liste`-Panel finalisieren.
- S2.6 Kassa-Karussell-Platzierung unterhalb von `Liste abschliessen` finalisieren.
- S2.7 Bestehenden Shopping-Screen als unveraenderten Vergleichsbereich bestaetigen.
- S2.8 Home-Folgeentscheidung fuer spaeter dokumentieren, aber nicht umsetzen.
- S2.9 Contract Review S2.
- S2.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- Es gibt keine offenen Produkt- oder UI-Grundsatzfragen fuer S4.

### S2 Ergebnisprotokoll 16.05.2026

Finaler Produktvertrag:

- Ausgangsentscheidung in S2: `Schreiben` bleibt auf Home und als Screen-Titel zunaechst unveraendert.
- Nachtraegliche S4/S6-Entscheidung: sichtbar wird daraus `Einkauf`, technische Route und Modulname bleiben `writing`.
- Das obere Schreib-/Formularpanel bleibt strukturell unveraendert.
- Roadmap 6A aendert nur das zweite Panel `Offene Liste`.
- Der bestehende separate `Einkaufen`-Screen bleibt erreichbar, initialisiert und funktionsfaehig.
- Home wurde nachtraeglich nur in Copy/Icon nachgezogen: `Einkauf`, `Amazon`, `Muell`.
- Amazon-Listenlogik bleibt vollstaendig ausserhalb dieser Roadmap; die sichtbare Kachel ist nur Platzhalter.

Finaler Kopfvertrag fuer `Offene Liste`:

- Links bleiben:
  - `Offene Liste`
  - Sync-Status wie bisher
- Rechts bleiben:
  - `Liste freigeben`, falls Sync konfiguriert und Items vorhanden sind
  - `Anderen Stand uebernehmen`, nur bei Pending Remote
  - `Liste leeren`
- Die Kopfstruktur bleibt bewusst nahe am heutigen Writing-Panel, damit Stephan und Familie den Bereich wiedererkennen.

Finaler Papierlisten-Vertrag:

- Die Liste im zweiten Panel wird zur Papierliste.
- Jede Zeile zeigt:
  - Checkbox fuer `Im Wagen`
  - Item-Name
  - praesentative Menge/Einheit ueber `formatItemMeta`
  - `Loeschen` als destruktive Einzelaktion
- Checkbox und sinnvoller Zeilentap duerfen `inCart` toggeln.
- `Loeschen` muss getrennt von der Checkbox-/Zeilentap-Flaeche bedienbar bleiben.
- Leerer Zustand bleibt ruhig und heisst im Writing-Panel weiterhin `Noch keine Eintraege.`

Finaler Action-Vertrag:

- `Liste freigeben` bleibt die bewusste Haushaltsfreigabe fuer lokale Schreibarbeit.
- `Liste leeren` bleibt destruktive Verwaltungsaktion und entfernt alle Items.
- `Loeschen` entfernt genau ein Item.
- `Liste abschliessen` wird unterhalb der Papierliste eingefuegt.
- `Liste abschliessen` ist nur aktiv, wenn mindestens ein Item `inCart === true` ist.
- `Liste abschliessen` entfernt nur Items mit `inCart === true`; offene Items bleiben sichtbar.
- Es gibt keine Undo-, Dialog- oder Historienlogik.

Finaler Sync-/State-Vertrag:

- Der Datenvertrag bleibt `id`, `name`, `quantity`, `unit`, `inCart`.
- Ausgangsentscheidung in S2: Add bleibt lokal, bis `Liste freigeben` bewusst gedrueckt wird.
- Nachtraegliche S4.6-Entscheidung: Add speichert nach bewusstem Submit automatisch einen Shared Snapshot, wenn Sync konfiguriert ist; `Liste freigeben` bleibt Retry/Fallback.
- `Loeschen`, `Liste leeren`, Checkbox/`Im Wagen` und `Liste abschliessen` duerfen wie bisher direkte Shared-Snapshots speichern, wenn Supabase konfiguriert ist.
- Pending Remote bleibt bewusst: eingehende Remote-Staende ueberschreiben lokale Writing-Arbeit nicht still.
- `Anderen Stand uebernehmen` bleibt die bewusste destruktive Uebernahme.
- Nach S4.5 wurde ein moeglicher Vertragswechsel erkannt: Auto-Freigabe direkt nach bewusstem `Item hinzufuegen`. Dieser Punkt wird in S4 als eigener Contract-Gate geprueft und erst nach Entscheidung umgesetzt oder verworfen.

Finaler Kassa-Vertrag:

- Das Kassa-Karussell erscheint im `Offene Liste`-Panel unterhalb von `Liste abschliessen`.
- Das bestehende Kassa-Karussell im alten `Einkaufen`-Screen bleibt bis nach dieser Roadmap erhalten.
- In der Uebergangsphase darf es daher zwei Karussell-Instanzen im DOM geben.
- `kassa-carousel.js` muss in S4 mehrinstanzfaehig werden oder eine gleichwertig klare Initialisierung fuer beide Orte erhalten.
- Kassa bleibt reine Linkhilfe: kein Listen-State, keine Speicherung, keine App-Erkennung, keine Amazon-Verwendung.

Finaler CSS-/Owner-Vertrag:

- Writing-spezifische Panel-Komposition gehoert nach `app/styles/writing.css`.
- Papierlisten- und Kassa-Optik duerfen nicht laenger ausschliesslich an `#screen-shopping` haengen, wenn sie im Writing-Panel sichtbar werden.
- S4 soll die kleinste tragfaehige Loesung waehlen:
  - gemeinsame Klassen/Selektoren fuer echte Wiederverwendung, oder
  - bewusst gescopte Writing-Ergaenzungen, wenn ein globales Pattern zu breit waere.
- Kein grosser Design-System- oder CSS-Architektur-Refactor in 6A.

Finaler Home-/Folgevertrag:

- Home bleibt waehrend 6A unveraendert.
- Der alte `Einkaufen`-Button bleibt.
- Eine spaetere Entscheidung kann nach Praxischeck pruefen, ob Home `Einkaufen` entfernt oder Amazon als eigene Kachel aufnimmt.
- Diese Entscheidung ist nicht Teil von 6A.

### S2 Contract Review

Review-Frage:

- Ist der Vertrag fuer S4 eng genug, damit das `Offene Liste`-Panel erweitert werden kann, ohne Writing, Shopping, Kassa, Sync oder Home still umzudeuten?

Entscheidung:

- Ja. S4 darf das `Offene Liste`-Panel zur echten Einkaufsliste erweitern, aber nur innerhalb des bestehenden Datenvertrags und bei Erhalt des alten Shopping-Screens.

Findings:

- S2-F1: Zwei Kassa-Orte sind unvermeidbar, solange der alte Shopping-Screen erhalten bleibt und Kassa auch im Writing-Panel erscheinen soll.
- S2-F2: Die bisherige Shopping-CSS-Scope-Grenze ist fuer Wiederverwendung zu eng.
- S2-F3: `Liste freigeben`, `Liste leeren` und `Liste abschliessen` koennen im selben Panel nur funktionieren, wenn ihre Hierarchie und Platzierung strikt bleiben.
- S2-F4: Checkbox/Zeilentap plus `Loeschen` in einer Zeile braucht in S3 besondere Mobile-Pruefung.
- S2-F5: Direkte Snapshot-Saves fuer Checkbox/Finish im Writing-Panel muessen den bestehenden Pending-Remote-Vertrag respektieren.

Korrekturen aus S2:

- Das Zielbild wurde von `Vorlaeufiges UI-Ziel` zu `Finales S2-UI-Ziel` gehoben.
- Das Zielbild nennt jetzt ausdruecklich, dass `Liste abschliessen` nur bei `inCart`-Items aktiv ist und Kassa darunter sekundar bleibt.
- S4.8 wurde geschaerft: Kassa muss im `Offene Liste`-Panel platziert und mehrinstanzfaehig initialisiert werden, solange der alte Shopping-Screen existiert.
- S5-Kassa-Smokes muessen beide Orte pruefen.

Schritt-Abnahme:

- S2 ist abgeschlossen.
- Doku-Sync-Entscheidung: Nur diese Roadmap musste aktualisiert werden; Module Overviews bleiben bis nach S4 unveraendert.
- Commit-Empfehlung: Noch kein separater Commit noetig; S2 bleibt Teil der Roadmap-Vorbereitung.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Risiken, Testplan und S4-Substeps so konkretisieren, dass Umsetzung schrittweise erfolgen kann.

Substeps:

- S3.1 Bruchrisiken erfassen:
  - Papierliste macht das zweite Panel zu hoch.
  - Papierliste verliert Charme.
  - `Loeschen` und Checkbox kollidieren auf Mobile.
  - `Liste leeren` und `Liste abschliessen` werden verwechselt.
  - Pending Remote wird durch neue Liste falsch angezeigt.
  - Kassa wirkt wie Hauptinhalt statt Kassahilfe.
  - alter Shopping-Screen driftet optisch/fachlich auseinander.
  - Home-Copy muss spaeter neu bewertet werden, bleibt in dieser Roadmap aber stabil.
- S3.2 Mobile-Layout- und Touch-Vertrag konkretisieren.
- S3.3 CSS-Owner-Entscheidung konkretisieren.
- S3.4 Wiederverwendungs-/Helper-Entscheidung konkretisieren:
  - lieber duplizieren, wenn Helper zu breit wuerde.
  - Helper nur fuer echtes gemeinsames Row-Rendering.
- S3.5 S4-Substeps konkretisieren.
- S3.6 S5-Teststrategie konkretisieren.
- S3.7 Contract Review S3.
- S3.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- S4 ist in kleine, pruefbare Substeps zerlegt.

### S3 Ergebnisprotokoll 16.05.2026

Bruchrisiken und Entscheidungen:

- Panel-Hoehe:
  - Risiko: Das zweite Writing-Panel kann durch Papierliste, Abschluss und Kassa zu hoch werden.
  - Entscheidung: akzeptabel, solange das obere Schreibpanel unveraendert bleibt und das zweite Panel klar listenorientiert wirkt.
- Papierlisten-Charme:
  - Risiko: Die Liste wird durch `Loeschen`, Sync und Abschluss zu technisch.
  - Entscheidung: Papierlisten-Optik ist die Hauptflaeche; Verwaltungsaktionen bleiben ausserhalb der eigentlichen Zeilenwirkung bzw. visuell leiser.
- Checkbox plus `Loeschen`:
  - Risiko: Auf Mobile kollidieren Trefferflaechen.
  - Entscheidung: Checkbox/Zeilentap und `Loeschen` muessen getrennte interaktive Bereiche bleiben; `Loeschen` darf nicht innerhalb des Label-/Toggle-Bereichs liegen.
- `Liste leeren` vs. `Liste abschliessen`:
  - Risiko: Beide entfernen Dinge, aber mit anderer Semantik.
  - Entscheidung: `Liste leeren` bleibt im Panelkopf als destruktive Verwaltung; `Liste abschliessen` steht unter der Papierliste als Einkaufsabschluss und ist deaktiviert, solange nichts `Im Wagen` ist.
- Pending Remote:
  - Risiko: Neue Checkbox-/Finish-Aktionen koennen lokale Dirty-/Pending-Signale verwirren.
  - Entscheidung: `hestia:items-updated`-Quellen bleiben wie heute; lokale Aktionen markieren lokal, erfolgreiche Snapshots spiegeln `remote`, Pending Remote bleibt bewusst.
- Kassa:
  - Risiko: Kassa wirkt wie Hauptinhalt oder funktioniert nur an einem Ort.
  - Entscheidung: Kassa bleibt klein unterhalb von `Liste abschliessen`; Initialisierung muss mehrere Instanzen bedienen.
- Alter Shopping-Screen:
  - Risiko: Writing und Shopping driften optisch/fachlich auseinander.
  - Entscheidung: Der alte Screen bleibt Regression und Vergleichsflaeche; keine Loeschung, keine Home-Aenderung.

Mobile-Layout- und Touch-Vertrag:

- Jede Papierlisten-Zeile muss auch auf Mobile lesbar bleiben.
- Checkbox hat eine stabile, kleine Kontrollflaeche, wird aber durch Zeilentap unterstuetzt.
- `Loeschen` hat eine eigene Touchflaeche und darf keinen Toggle ausloesen.
- Lange Artikelnamen duerfen Menge oder `Loeschen` nicht ueberdecken.
- Mengen-/Einheiten-Meta darf auf Mobile umbrechen oder anders positioniert werden, wenn das Ueberdeckung verhindert.
- `Liste freigeben`, `Anderen Stand uebernehmen` und `Liste leeren` behalten die bestehende mobile Stapelung.
- `Liste abschliessen` liegt unterhalb der Liste und darf nicht direkt neben `Liste leeren` erscheinen.
- Kassa bleibt unterhalb der Abschlussaktion und darf die Papierliste nicht nach oben draengen.

CSS-Owner-Entscheidung:

- Writing-spezifisches Panel-Layout und neue Writing-Aktionskomposition gehoeren nach `app/styles/writing.css`.
- Papierlisten-Basis und Kassa-Styles duerfen nicht mehr nur ueber `#screen-shopping` funktionieren.
- S4 soll bevorzugt Klassen verwenden, die an beiden Orten gelten koennen, z. B. fuer Papierliste, Shopping-Row und Kassa.
- Wenn ein gemeinsames Pattern zu breit wuerde, sind gezielte Writing-Selektoren erlaubt.
- `app/styles/ui.css` wird nur beruehrt, wenn ein wirklich globales Muster entsteht.
- Keine neue CSS-Datei; dadurch voraussichtlich keine Service-Worker-Cache-Aenderung.

Wiederverwendungs-/Helper-Entscheidung:

- Kein grosser Shared-Renderer vorab.
- `writing.js` darf zunaechst eigenes Row-Rendering fuer das erweiterte Panel bekommen.
- `shopping.js` bleibt Owner des alten Screens.
- Gemeinsame JS-Helper entstehen nur, wenn waehrend S4 echte, stabile Doppelung sichtbar wird.
- `formatItemMeta` bleibt die gemeinsame praesentative Meta-Quelle.
- State-Operationen werden weiter direkt aus `state.js` verwendet.
- `kassa-carousel.js` ist die einzige absehbar notwendige technische Verallgemeinerung, weil mehrere DOM-Instanzen sonst nicht funktionieren.

Konkretisierter S4-Plan:

- S4.1 Kopf des `Offene Liste`-Panels pruefen und unveraendert stabil halten.
- S4.2 Papierlisten-Klassen/Markup im Writing-Listenbereich einfuehren, noch ohne neue Aktionen zu verbreitern.
- S4.3 Checkbox-/Zeilentap-Interaktion fuer `inCart` im Writing-Panel bauen und Snapshot-Save nach Toggle pruefen.
- S4.4 `Loeschen` als getrennte Zeilenaktion integrieren und Fehl-Toggles verhindern.
- S4.5 Sync-Status, `Liste freigeben`, Pending Remote und `Liste leeren` im neuen Layout regressionstesten.
- S4.6 Auto-Freigabe nach bewusstem `Item hinzufuegen` pruefen:
  - Contract Review gegen bisherigen `Liste freigeben`-Vertrag.
  - Entscheidung dokumentieren: beibehalten, entfernen oder als Fallback behalten.
  - Falls beschlossen: Add speichert nach Submit denselben Snapshot wie andere direkte Listenaktionen.
  - Fehlerfall-Copy und lokaler Fallback bleiben ruhig.
- S4.7 `Liste abschliessen` im Writing-Panel anschliessen, deaktivierten Zustand und Snapshot-Save pruefen.
- S4.8 Kassa-Markup in das Writing-Panel aufnehmen, Styles fuer beide Orte nutzbar machen und `initKassaCarousel` mehrinstanzfaehig machen.
- S4.9 Alter Shopping-Screen: Navigation, Papierliste, Checkbox, Abschluss und Kassa als Regression pruefen.
- S4.10 Code Review und Contract Review; Findings korrigieren.
- S4.11 Schritt-Abnahme und Commit-Empfehlung.

Konkretisierte S5-Teststrategie:

- Syntax:
  - `node --check` fuer alle geaenderten JS-Dateien.
  - `git diff --check`.
- Behavior:
  - Add bleibt lokal bis `Liste freigeben`, sofern S4.6 Auto-Freigabe nicht explizit beschliesst.
  - Falls S4.6 Auto-Freigabe beschliesst: Add speichert nach Submit einen Shared Snapshot oder zeigt weiterhin ruhig lokalen Fallback bei Save-Fehler.
  - Checkbox im Writing-Panel toggelt `inCart`.
  - `Loeschen` loescht genau ein Item und toggelt nicht.
  - `Liste abschliessen` loescht nur `inCart === true`.
  - `Liste leeren` loescht weiterhin alle Items.
  - Pending Remote bleibt bedienbar.
- UI Desktop/Mobile:
  - oberes Schreibpanel unveraendert.
  - `Offene Liste`-Kopf vertraut.
  - Papierliste lesbar.
  - Checkbox, Meta und `Loeschen` ueberlappen nicht.
  - Action-Hierarchie `Freigeben/Leeren` oben, `Abschliessen` unten klar.
  - Kassa ist unterhalb von `Liste abschliessen`.
- Kassa:
  - Writing-Karussell funktioniert.
  - altes Shopping-Karussell funktioniert weiterhin.
  - pro Karussell genau eine aktive Karte im Tabfluss.
  - Buttons, Keyboard und Swipe bleiben plausibel.

### S3 Contract Review

Review-Frage:

- Ist S4 jetzt klein genug geschnitten, um die Writing-Liste zu erweitern, ohne CSS-, Kassa-, Sync- oder Shopping-Regressionen unkontrolliert mitzuziehen?

Entscheidung:

- Ja. S4 bleibt panelzentriert, verzichtet auf einen grossen Shared-Renderer und behandelt nur Kassa-Mehrinstanz als notwendige technische Verallgemeinerung.

Findings:

- S3-F1: `Loeschen` darf nicht in die Checkbox-Label-Flaeche geraten, sonst entstehen Doppelaktionen.
- S3-F2: Eine gemeinsame CSS-Loesung fuer Papierliste/Kassa ist sinnvoll, aber nur so weit, wie Writing und Shopping sie wirklich teilen.
- S3-F3: `Liste abschliessen` braucht deaktivierten Zustand im Writing-Panel, sonst wirkt es wie eine riskante Daueraktion.
- S3-F4: Kassa-Mehrinstanz ist kein Nice-to-have, sondern Voraussetzung, solange zwei Karussells im DOM bleiben.
- S3-F5: S5 muss den alten Shopping-Screen ausdruecklich testen, weil S4 wahrscheinlich CSS-Selektoren verbreitert.

Korrekturen aus S3:

- S4-Substeps wurden von grob zu pruefbaren Umsetzungsschnitten geschaerft.
- S5-Smokes wurden um konkrete Doppel-Kassa- und Mobile-/Touch-Risiken erweitert.
- Der CSS-Vertrag benennt jetzt ausdruecklich: keine neue CSS-Datei, bevorzugt kleine gemeinsame Klassen oder gezielte Writing-Ergaenzungen.

Schritt-Abnahme:

- S3 ist abgeschlossen.
- Doku-Sync-Entscheidung: Nur diese Roadmap musste aktualisiert werden; Module Overviews bleiben bis nach S4 unveraendert.
- Commit-Empfehlung: Noch kein separater Commit noetig; S3 bleibt Teil der Roadmap-Vorbereitung.

## S4 - Umsetzung

Ziel:

- Das bestehende `Offene Liste`-Panel im Writing-Screen um Einkaufsfunktionen erweitern, ohne den separaten Shopping-Screen zu loeschen.

Finalisierte Substeps nach S3:

- S4.1 Kopf des `Offene Liste`-Panels pruefen und unveraendert stabil halten.
- S4.2 Papierlisten-Klassen/Markup im Writing-Listenbereich einfuehren.
- S4.3 Checkbox-/Zeilentap-Interaktion fuer `inCart` im Writing-Panel bauen.
- S4.4 `Loeschen` als getrennte Zeilenaktion integrieren und Fehl-Toggles verhindern.
- S4.5 Sync-Status, `Liste freigeben`, Pending Remote und `Liste leeren` im neuen Layout regressionstesten.
- S4.6 Auto-Freigabe nach bewusstem `Item hinzufuegen` pruefen und nach Entscheidung umsetzen oder verwerfen.
- S4.7 `Liste abschliessen` im Writing-Panel anschliessen, deaktivierten Zustand und Snapshot-Save pruefen.
- S4.8 Kassa-Markup in das Writing-Panel aufnehmen, Styles fuer beide Orte nutzbar machen und `initKassaCarousel` mehrinstanzfaehig machen.
- S4.9 Alter Shopping-Screen: Navigation, Papierliste, Checkbox, Abschluss und Kassa als Regression pruefen.
- S4.10 Code Review und Contract Review; Findings korrigieren.
- S4.11 Schritt-Abnahme und Commit-Empfehlung.

Review-Kriterien fuer jeden S4-Substep:

- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt.
- Liste bleibt schneller nutzbar als vorher.
- Mobile darf keine engen oder ueberlappenden Aktionen bekommen.

Zusatz-Contract fuer S4.6:

- S4.6 darf den bisherigen Add-Sync-Vertrag bewusst aendern.
- Es geht nur um Auto-Freigabe nach bewusstem Submit, nicht um Auto-Save waehrend der Eingabe.
- Falls Auto-Freigabe beschlossen wird, muss `Liste freigeben` entweder entfernt, umgedeutet oder als Fehler-/Fallback-Aktion sauber begruendet werden.
- Save-Fehler duerfen den lokalen Add nicht verlieren.
- Pending Remote darf lokale Schreibarbeit weiterhin nicht still ueberschreiben.

### S4.1 Ergebnisprotokoll 16.05.2026

Umsetzung:

- Das bestehende zweite Writing-Panel hat die Klasse `writing-list-panel` erhalten.
- Der Titel `Offene Liste` hat die ID `writing-list-title` erhalten.
- Das Panel referenziert diesen Titel ueber `aria-labelledby`.

Bewusst unveraendert:

- sichtbarer Text `Offene Liste`
- Sync-Status `writing-sync-status`
- `Liste freigeben`
- `Anderen Stand uebernehmen`
- `Liste leeren`
- Reihenfolge und Kopfstruktur
- `writing.js`-Logik
- Datenvertrag und Sync-Verhalten

Codereview:

- Die Aenderung ist ein stabiler, enger Hook fuer S4.2+ und trifft nur das Listenpanel im Writing-Screen.
- Keine CSS-Regel haengt aktuell an `writing-list-panel`; dadurch entsteht keine sichtbare Layout-Aenderung in S4.1.
- Die bestehende ID-Struktur fuer JS bleibt unveraendert.

Contract Review:

- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt unveraendert.
- Kopf des `Offene Liste`-Panels bleibt optisch und funktional stabil.

Tests:

- `node --check app/modules/writing.js`
- `node --check app/main.js`
- `git diff --check -- index.html "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- Keine offenen Findings aus S4.1.

### S4.2 Ergebnisprotokoll 16.05.2026

Umsetzung:

- `#writing-list` nutzt jetzt die Klassen `items paper-list writing-paper-list`.
- `#shopping-list` nutzt jetzt ebenfalls explizit `items paper-list shopping-paper-list`, damit die Papierlisten-Optik nicht mehr nur an der ID `shopping-list` haengt.
- Writing-Zeilen bekommen die Klasse `writing-paper-row`.
- Die bisherige Papierlisten-Basis aus `app/styles/shopping.css` wurde von `#shopping-list.items` und Teilen von `#screen-shopping .item-row` auf `.paper-list` verallgemeinert.
- Writing bekommt kleine eigene Verfeinerungen fuer Namen, Meta und `Loeschen`, ohne neue Interaktionen einzufuehren.

Bewusst unveraendert:

- Keine Checkbox.
- Kein Zeilentap.
- Keine Abschlussaktion.
- Keine Kassa-Aenderung.
- `Loeschen` bleibt weiterhin die bestehende Writing-Aktion.
- `Liste freigeben`, Pending Remote und `Liste leeren` bleiben unveraendert.
- Alter Shopping-Screen bleibt erhalten und nutzt dieselbe Papierlisten-Basis weiter.

Codereview:

- Die CSS-Verallgemeinerung bleibt auf Papierlisten-Elemente begrenzt und fuehrt keine neue globale UI-Datei ein.
- `writing.js` aendert nur Klassen fuer gerenderte Zeilen; Daten, Events und Persistenz bleiben unveraendert.
- Shopping bekommt nur eine explizite `paper-list`-Klasse und sollte dadurch visuell gleich bleiben.

Contract Review:

- S4.2 erfuellt den Panel-Scope: Nur Writing-Listenbereich und gemeinsam benoetigte Papierlisten-Styles wurden beruehrt.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Keine Loeschung oder Umdeutung des alten Shopping-Screens.

Tests:

- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `git diff --check -- index.html app/modules/writing.js app/styles/shopping.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- Keine offenen Findings aus S4.2.

### S4.3 Ergebnisprotokoll 16.05.2026

Umsetzung:

- Writing-Zeilen nutzen jetzt dieselbe Papierlisten-Aktionsstruktur wie Shopping: Label-Flaeche, Checkbox und Item-Name.
- Checkbox und Zeilentap im Writing-Panel toggeln `inCart`.
- Toggle nutzt `store.toggleInCart`.
- Writing schreibt nach dem Toggle wie Shopping einen direkten Shared-Snapshot, wenn Supabase konfiguriert ist.
- Writing loggt Toggle-Aktionen als `[writing] toggle cart ...`.
- CSS fuer `.shopping-item-action`, `.check-wrap`, Checkboxen und `is-in-cart` wurde von `#screen-shopping` auf `.paper-list` verallgemeinert.

Bewusst unveraendert:

- `Loeschen` bleibt weiterhin vorhanden, aber die finale Zeilenhierarchie und Fehl-Toggle-Pruefung werden in S4.4 geschaerft.
- `Liste abschliessen` ist noch nicht im Writing-Panel vorhanden.
- Kassa ist noch nicht im Writing-Panel vorhanden.
- Alter Shopping-Screen bleibt bestehen.

Codereview:

- Die neue Writing-Interaktion verwendet den bestehenden State-Vertrag `inCart`.
- Kein neuer Store, kein neuer Status und keine neue Datenform wurden eingefuehrt.
- Die CSS-Verallgemeinerung betrifft nur Papierlisten mit `.paper-list`.
- Das bestehende Shopping-Rendering bleibt unveraendert und profitiert von denselben Klassen.

Contract Review:

- S4.3 erfuellt den S2/S3-Vertrag fuer `Im Wagen` im `Offene Liste`-Panel.
- Add bleibt weiterhin lokal bis `Liste freigeben`.
- Checkbox-/Zeilentap-Aenderungen duerfen direkte Shared-Snapshots speichern, analog Shopping.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt.

Tests:

- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `git diff --check -- app/modules/writing.js app/styles/shopping.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- S4.3-F1: `Loeschen` steht jetzt neben einer Label-/Toggle-Flaeche. Funktional ist es getrennt, aber S4.4 muss ausdruecklich pruefen und ggf. absichern, dass `Loeschen` keinen Toggle ausloest und auf Mobile genug Trefferflaeche hat.

### S4.4 Ergebnisprotokoll 16.05.2026

Umsetzung:

- `Loeschen` im Writing-Panel hat jetzt die eigene Klasse `writing-row-remove`.
- Der Delete-Handler ruft `preventDefault()` und `stopPropagation()` auf.
- Die `Loeschen`-Aktion bleibt ausserhalb der Label-/Toggle-Flaeche.
- CSS gibt `Loeschen` eine eigene Mindesthoehe und Mindestbreite, damit es neben der Checkbox-Zeile bedienbar bleibt.
- Mobile CSS reduziert die Breite leicht, behaelt aber eine eigene Touchflaeche.

Bewusst unveraendert:

- Checkbox/Zeilentap toggelt weiter `inCart`.
- `Loeschen` entfernt weiter genau ein Item.
- `Liste freigeben`, Pending Remote und `Liste leeren` bleiben unveraendert.
- `Liste abschliessen` ist noch nicht vorhanden.
- Kassa ist noch nicht im Writing-Panel vorhanden.
- Alter Shopping-Screen bleibt unveraendert.

Codereview:

- Der Event-Schutz verhindert, dass Delete-Klicks in den Toggle-Pfad geraten.
- Die Delete-Aktion bleibt semantisch ein Button und verwendet weiter den bestehenden `removeItem`-/Snapshot-Pfad.
- Styling ist auf `.writing-paper-list .writing-row-remove` begrenzt und veraendert den alten Shopping-Screen nicht.

Contract Review:

- S4.4 behebt S4.3-F1.
- `Loeschen` bleibt eine getrennte destruktive Einzelaktion.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt.

Tests:

- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `git diff --check -- app/modules/writing.js app/styles/shopping.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- Keine offenen Findings aus S4.4.

### S4.5 Ergebnisprotokoll 16.05.2026

Umsetzung:

- Keine Codeaenderung noetig.
- `Liste freigeben`, Sync-Status, Pending Remote und `Liste leeren` wurden gegen die neuen Papierlisten-/Checkbox-Aenderungen gereviewt.

Review-Ergebnis:

- Die IDs und DOM-Vertraege bleiben unveraendert:
  - `writing-sync-status`
  - `save-list`
  - `accept-remote-list`
  - `clear-list`
- `renderSyncState()` wird weiterhin bei leerer Liste, lokalen Aenderungen, Saving, Error, Saved und Pending Remote aufgerufen.
- `Liste freigeben` bleibt bei konfiguriertem Sync und vorhandenen Items sichtbar.
- `Anderen Stand uebernehmen` bleibt nur bei Pending Remote sichtbar.
- `Liste leeren` verwendet weiter `store.clearAll()` und speichert danach den leeren Snapshot, wenn Sync konfiguriert ist.
- Die Papierlisten- und Checkbox-Aenderungen haben keine Kopplung an den Panelkopf eingefuehrt.

Bewusst unveraendert:

- Keine neue Copy.
- Keine neue Sync-Semantik.
- Kein Auto-Save waehrend der Eingabe; Auto-Freigabe nach bewusstem Add wird in S4.6 gesondert entschieden.
- Kein Merge oder Konflikteditor.
- Kein Dialog fuer `Liste leeren`.

Codereview:

- Der Panelkopf nutzt weiter die bestehende `panel-head-actions`-Struktur.
- Die mobile Stapelung aus `writing.css` bleibt aktiv und wurde nicht durch die Papierlisten-CSS ueberschrieben.
- Die neue `writing-list-panel`-Kennung wird nicht fuer eine Kopf-Umgestaltung missbraucht.

Contract Review:

- S4.5 erfuellt den S2-Vertrag: Kopf und Sync-Verhalten bleiben vertraut.
- Add bleibt bis zur S4.6-Entscheidung lokal bis `Liste freigeben`.
- `Liste leeren` bleibt destruktive Verwaltungsaktion im Kopf.
- Pending Remote bleibt bewusst und uebernimmt nichts still.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt.

Tests:

- `node --check app/modules/writing.js`
- `rg -n "saveButton\\.hidden|acceptRemoteButton\\.hidden|syncStatus\\.textContent|clearButton\\.addEventListener|hestia:remote-apply-request|writing-sync-status|save-list|accept-remote-list|clear-list" app/modules/writing.js index.html app/styles/writing.css`
- `git diff --check -- app/modules/writing.js app/styles/writing.css index.html "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- S4.5-F1: Durch die kombinierte Writing-/Shopping-Flaeche wirkt `Liste freigeben` als manueller Add-Sync zunehmend wie ein Altvertrag. Da Abhaken, Loeschen, Leeren und Abschluss direkte Snapshots speichern, soll S4.6 Auto-Freigabe nach bewusstem `Item hinzufuegen` als eigene Vertragsentscheidung pruefen und ggf. umsetzen.

### S4.6 Ergebnisprotokoll 16.05.2026

Contract-Entscheidung:

- Auto-Freigabe nach bewusstem `Item hinzufuegen` wird umgesetzt.
- Das ist kein Auto-Save waehrend der Eingabe.
- `Liste freigeben` bleibt nicht als dauerhafter Hauptbutton sichtbar, sondern als Retry-/Fallback-Aktion fuer dirty, error oder pending Remote.
- Bei Save-Fehler bleibt das lokal hinzugefuegte Item erhalten.

Begruendung:

- In der kombinierten Writing-/Shopping-Flaeche wirken Add, Abhaken, Loeschen, Leeren und spaeter Abschliessen wie gleichwertige Listenaktionen.
- Abhaken, Loeschen und Leeren speichern bereits direkte Snapshots.
- Ein falsch hinzugefuegter Eintrag wird ohnehin ueber `Loeschen` korrigiert, da HESTIA bewusst keinen Edit-Dialog einfuehrt.
- Auto-Freigabe nach Submit reduziert Reibung, ohne Freitext, Semantik oder Datenvertrag zu veraendern.

Umsetzung:

- Nach erfolgreichem lokalen Submit ruft Writing jetzt `persistSharedState("add-item")` auf.
- `Liste freigeben` wird nur noch angezeigt, wenn ein konfigurierter Sync existiert, Items vorhanden sind und der Sync-Zustand `dirty`, `error` oder `pending-remote` ist.
- Bei erfolgreicher Auto-Freigabe zeigt der Status weiterhin `Fuer den Haushalt freigegeben um ...`.
- Bei fehlender Supabase-Konfiguration bleibt der lokale Modus unveraendert.

Bewusst unveraendert:

- Keine Speicherung waehrend der Eingabe.
- Kein neuer Datenvertrag.
- Kein SQL/Supabase-Schema.
- Kein Merge-Editor.
- Pending Remote bleibt bewusst.
- `Liste leeren`, `Loeschen` und Checkbox/`Im Wagen` behalten ihre bestehenden direkten Snapshot-Pfade.

Codereview:

- Der lokale Add passiert weiterhin zuerst, bevor ein Remote-Save versucht wird.
- Save-Fehler koennen das lokale Item nicht entfernen, weil `store.upsertItem` bereits vor dem Snapshot-Save abgeschlossen ist.
- `Liste freigeben` bleibt als manuelle Rettungsaktion verfuegbar, wenn ein Save fehlschlaegt oder lokaler Dirty-/Pending-Zustand besteht.
- Der Touchlog-Grund `add-item` trennt Auto-Freigabe nach Submit sauber von `manual-save`.

Contract Review:

- S4.6 behebt S4.5-F1.
- Die Vertragsaenderung ist bewusst und dokumentiert.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt.

Tests:

- `node --check app/modules/writing.js`
- `rg -n "persistSharedState\\(\"add-item\"\\)|canRetrySharedSave|saveButton\\.hidden|manual-save|add-item" app/modules/writing.js`
- `git diff --check -- app/modules/writing.js "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- Keine offenen Findings aus S4.6.

### S4.7 Ergebnisprotokoll 16.05.2026

Umsetzung:

- Im `Offene Liste`-Panel gibt es jetzt unter der Papierliste den Button `Liste abschließen`.
- Der Button nutzt `id="finish-writing-list"` und die gemeinsame Klasse `shopping-finish-button`.
- Writing prueft ueber `hasCartItems()`, ob mindestens ein Item `inCart === true` ist.
- Der Button ist deaktiviert, solange kein Item `Im Wagen` ist.
- Klick auf `Liste abschließen` ruft `store.finishShopping()` auf.
- Der Abschluss entfernt nur Items mit `inCart === true`; offene Items bleiben sichtbar.
- Nach Abschluss schreibt Writing einen direkten Shared Snapshot mit Grund `writing-finish`, wenn Sync konfiguriert ist.
- Der alte Shopping-Abschlussbutton nutzt dieselbe `shopping-finish-button`-Klasse, bleibt aber bei `id="finish-shopping"`.

Bewusst unveraendert:

- Kein Undo.
- Kein Dialog.
- Keine Historie.
- Keine Aenderung am Datenvertrag.
- Keine Aenderung am alten Shopping-Screen-Verhalten.
- Kassa ist noch nicht im Writing-Panel vorhanden.

Codereview:

- Die Abschlusslogik nutzt die bestehende State-Operation `finishShopping()`.
- `finishButton` wird in jedem Writing-Render aktualisiert und bleibt dadurch nach Toggle, Delete, Clear, Add und Remote-Updates korrekt deaktiviert oder aktiv.
- Der lokale Abschluss passiert vor dem Remote-Save; Save-Fehler koennen offene Restitems oder lokale Abschlusswirkung nicht verlieren.
- Der gemeinsame Disabled-Style wurde von `#finish-shopping` auf `.shopping-finish-button` verallgemeinert, ohne die Shopping-ID zu entfernen.

Contract Review:

- S4.7 erfuellt den Abschlussvertrag aus S2/S3.
- `Liste abschließen` steht unterhalb der Papierliste, nicht neben `Liste leeren`.
- Es werden nur `inCart`-Items entfernt.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.
- Alter Shopping-Screen bleibt.

Tests:

- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `git diff --check -- index.html app/modules/writing.js app/styles/shopping.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`
- `rg -n "finish-writing-list|shopping-finish-button|writing-finish|finishShopping|hasCartItems" index.html app/modules/writing.js app/modules/shopping.js app/styles/shopping.css`

Findings:

- Keine offenen Findings aus S4.7.

### S4.8 Ergebnisprotokoll 16.05.2026

Umsetzung:

- Das Kassa-Karussell wurde unterhalb von `Liste abschließen` in das `Offene Liste`-Panel uebernommen.
- Die vier festen Links bleiben unveraendert:
  - `jö`
  - `MPREIS`
  - `HOFER`
  - `SPAR`
- Der alte Shopping-Screen behaelt sein Kassa-Karussell.
- `kassa-carousel.js` initialisiert jetzt alle `[data-kassa-carousel]`-Instanzen im Dokument.
- Jede Karussell-Instanz behaelt eigenen aktiven Index, eigene ARIA-/Tab-Synchronisierung und eigene Pointer-/Keyboard-Handler.
- Kassa-CSS wurde von `#screen-shopping .kassa-carousel...` auf gemeinsame `.kassa-carousel...`-Selektoren verallgemeinert.

Bewusst unveraendert:

- Keine App-Erkennung.
- Keine Deep Links.
- Keine Speicherung des aktiven Kassa-Index.
- Keine Kassa-Logik fuer Amazon.
- Keine neuen Dateien; Service Worker muss fuer S4.8 nicht angepasst werden.

Codereview:

- `initKassaCarousel()` bleibt rueckwaertskompatibel: Bei einer Instanz gibt es wie bisher eine Instanz zurueck, bei mehreren Instanzen ein Array.
- `main.js` nutzt den Rueckgabewert nicht, daher ist die Mehrinstanz-Rueckgabe unkritisch.
- Die internen Event-Handler sind pro Root geschlossen; ein Klick oder Swipe im Writing-Karussell veraendert nicht den aktiven Index im Shopping-Karussell.
- Die CSS-Verallgemeinerung betrifft nur Kassa-Klassen und nicht allgemeine Buttons oder Listen.

Contract Review:

- S4.8 erfuellt den Kassa-Vertrag aus S2/S3.
- Kassa bleibt unterhalb von `Liste abschließen`.
- Alter Shopping-Screen bleibt mitsamt Kassa erhalten.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.

Tests:

- `node --check app/modules/kassa-carousel.js`
- `node --check app/main.js`
- `git diff --check -- index.html app/modules/kassa-carousel.js app/styles/shopping.css`
- `rg -n "data-kassa-carousel|initKassaCarousel|initKassaCarouselInstance|querySelectorAll|#screen-shopping \\.kassa|\\.kassa-carousel" index.html app/modules/kassa-carousel.js app/styles/shopping.css app/main.js`

Findings:

- Keine offenen Findings aus S4.8.

### S4.9 Ergebnisprotokoll 16.05.2026

Umsetzung:

- Keine Codeaenderung noetig.
- Der bestehende `screen-shopping` wurde als Regression gegen die S4.2-S4.8-Aenderungen geprueft.

Review-Ergebnis:

- Home navigiert weiterhin ueber `data-nav="shopping"` in den alten Shopping-Screen.
- `screen-shopping` existiert weiterhin mit `data-screen="shopping"`.
- `#shopping-list` bleibt vorhanden und nutzt jetzt explizit `items paper-list shopping-paper-list`.
- `#finish-shopping` bleibt vorhanden und nutzt zusaetzlich die gemeinsame Klasse `shopping-finish-button`.
- `shopping.js` bleibt unveraendert Owner fuer:
  - Shopping-Render.
  - Checkbox/`Im Wagen`.
  - `shopping-toggle` Snapshot-Save.
  - `shopping-finish` Snapshot-Save.
  - `Liste abschließen` im alten Screen.
- `Ändern` fuehrt weiterhin ueber `data-nav="writing"` in den Writing-Screen.
- Das alte Shopping-Karussell bleibt im DOM und wird durch die neue Mehrinstanz-Initialisierung weiter initialisiert.

Codereview:

- Die gemeinsamen Papierlisten-Selektoren `.paper-list`, `.shopping-item-action`, `.check-wrap` und `.shopping-finish-button` erhalten die bisherige Shopping-Struktur, weil der alte Shopping-Screen dieselben Klassen weiter nutzt.
- `initKassaCarousel()` nutzt jetzt `querySelectorAll`, sodass das Shopping-Karussell nicht vom neuen Writing-Karussell verdraengt wird.
- `shopping.js` musste nicht angepasst werden; damit bleibt die bestehende Shopping-Fachlogik stabil.

Contract Review:

- S4.9 erfuellt den Nicht-Loeschungs-Vertrag.
- Alter Shopping-Screen bleibt erreichbar.
- Checkbox/Zeilentap/Abschluss bleiben fachlich unveraendert.
- Kassa bleibt im alten Shopping-Screen erhalten.
- Kein Amazon.
- Kein Datenvertragswechsel.
- Kein SQL/Supabase-Schema.

Tests:

- `node --check app/modules/shopping.js`
- `node --check app/modules/kassa-carousel.js`
- `node --check app/main.js`
- `node --check app/core/router.js`
- `rg -n "shopping" index.html`
- `rg -n "screen-shopping|shopping-list|finish-shopping|data-nav" index.html`
- `rg -n "data-kassa-carousel|initKassaCarouselInstance|querySelectorAll|shopping-finish|shopping-toggle" index.html app/modules/shopping.js app/modules/kassa-carousel.js`
- `git diff --check -- index.html app/modules/shopping.js app/modules/kassa-carousel.js app/styles/shopping.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Nicht lokal in S4.9 geprueft:

- Echter Browser-Klick/Tap auf dem alten Shopping-Screen.
- Swipe-Geste am alten Shopping-Karussell.
- Diese Browser-Smokes bleiben fuer S5.

Findings:

- Keine offenen Findings aus S4.9.

### S4.10 Code Review und Contract Review 16.05.2026

Gepruefter Code-Umfang:

- `index.html`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/modules/kassa-carousel.js`
- `app/main.js`
- `app/core/state.js`
- `app/core/router.js`
- `app/styles/shopping.css`
- `app/styles/writing.css`

Code Review:

- Writing rendert die `Offene Liste` jetzt als Papierliste mit Checkbox/Zeilentap, Meta und getrenntem `Loeschen`.
- `Loeschen` liegt ausserhalb der Label-/Toggle-Flaeche und stoppt Events.
- Add speichert nach bewusstem Submit automatisch einen Shared Snapshot, wenn Sync konfiguriert ist.
- `Liste freigeben` bleibt als Retry-/Fallback-Aktion fuer dirty/error/pending Remote.
- `Liste abschließen` im Writing-Panel nutzt `store.finishShopping()` und loescht nur `inCart === true`.
- Kassa ist im Writing-Panel und alten Shopping-Screen vorhanden.
- `initKassaCarousel()` initialisiert mehrere Karussells und haelt Instanz-State getrennt.
- Der alte Shopping-Screen nutzt weiter `shopping.js`; keine Fachlogik wurde aus dem alten Screen entfernt.
- CSS-Verallgemeinerungen sind auf `.paper-list`, `.shopping-finish-button` und `.kassa-carousel` begrenzt.

Contract Review:

- Produktkern bleibt: schnell schreiben, abhaken, erledigtes entfernen.
- Home bleibt unveraendert.
- Der alte `Einkaufen`-Screen bleibt erreichbar und funktionsfaehig.
- Kein Amazon.
- Kein `listType`.
- Kein SQL-, RLS-, Auth- oder Supabase-Schemawechsel.
- Kein neuer Store.
- Kein neuer Datenvertrag; `id`, `name`, `quantity`, `unit`, `inCart` bleiben stabil.
- Kein Auto-Save waehrend der Eingabe; nur Auto-Freigabe nach bewusstem Submit.
- Pending Remote bleibt bewusst und wird nicht still angewendet.
- Kassa bleibt reine Linkhilfe ohne Speicherung, App-Erkennung oder Amazon-Bezug.

Checks:

- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `node --check app/modules/kassa-carousel.js`
- `node --check app/main.js`
- `node --check app/core/state.js`
- `node --check app/core/router.js`
- `rg -n "finish-writing-list|writing-finish|add-item|canRetrySharedSave|writing-row-remove|data-kassa-carousel|querySelectorAll|shopping-finish-button|paper-list|S4\\.10|S4\\.11" index.html app/modules/writing.js app/modules/shopping.js app/modules/kassa-carousel.js app/styles/shopping.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`
- `rg -n "shopping" index.html`
- `rg -n "data-kassa-carousel|initKassaCarouselInstance|querySelectorAll|shopping-finish|shopping-toggle" index.html app/modules/shopping.js app/modules/kassa-carousel.js`
- `git diff --check -- index.html app/modules/writing.js app/modules/shopping.js app/modules/kassa-carousel.js app/styles/shopping.css app/styles/writing.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`

Findings:

- Keine offenen Code- oder Contract-Findings aus S4.10.
- Kein automatisierter Browser-Test-Runner im Repo gefunden; echte Klick-/Tap-Smokes bleiben fuer S5.

### S4.11 Schritt-Abnahme und Commit-Empfehlung 16.05.2026

S4-Abnahme:

- S4.1 erledigt: Kopf des `Offene Liste`-Panels stabilisiert.
- S4.2 erledigt: Papierlisten-Markup/-Optik im Writing-Panel eingefuehrt.
- S4.3 erledigt: Checkbox/Zeilentap im Writing-Panel toggelt `inCart`.
- S4.4 erledigt: `Loeschen` ist getrennte Aktion und loest keinen Toggle aus.
- S4.5 erledigt: Sync-Status, Pending Remote, `Liste freigeben` und `Liste leeren` bleiben stabil.
- S4.6 erledigt: Auto-Freigabe nach bewusstem Add umgesetzt.
- S4.7 erledigt: `Liste abschließen` im Writing-Panel umgesetzt.
- S4.8 erledigt: Kassa im Writing-Panel und Mehrinstanz-Initialisierung umgesetzt.
- S4.9 erledigt: Alter Shopping-Screen statisch und per Syntax-/Hook-Review regressionsgeprueft.
- S4.10 erledigt: Code Review und Contract Review ohne offene Findings.

Doku-Sync-Entscheidung:

- Module Overviews, QA und Future-/Folge-Roadmaps werden erst in S6 synchronisiert.
- S5 muss vorher die lokalen und Browser-Smokes abschliessen.

Commit-Empfehlung:

- Noch nicht committen, bevor S5 und S6 erledigt sind.
- Voraussichtliche Commit-Message bleibt:
  - `refactor(shopping): consolidate writing and shopping surface`

Nachtraegliche Namensentscheidung 16.05.2026:

- Sichtbarer Name der kombinierten Flaeche wird `Einkauf`.
- Home-Kachel `Schreiben` wird sichtbar zu `Einkauf`.
- Screen-Titel `Schreiben` wird sichtbar zu `Einkauf`.
- Home-Hinweis wird zu `Liste schreiben und abhaken`.
- Die zweite Home-Kachel wird sichtbar zu `Amazon` und nutzt ein neutrales Paket-Icon als Amazon-nahe Beschaffungssymbol.
- Bis zur separaten Amazon-Roadmap bleibt diese zweite Kachel technisch noch am bestehenden `shopping`-Ziel. Das ist ein sichtbarer Platzhalter, keine fertige Amazon-Listenlogik.
- Interne Route `writing`, Modulname `writing.js`, DOM-IDs und Touchlog-Kategorie bleiben bewusst stabil, damit der Refactor nicht unnoetig in Router, State oder Sync-Vertrag greift.

## S5 - Tests, Code Review und Contract Review

Ziel:

- Lokale, UI-, Sync- und Regression-Sicherheit herstellen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 State-/Behavior-Smokes:
  - Add bleibt moeglich.
  - Add folgt der S4.6-Entscheidung:
    - bei Auto-Freigabe: Submit speichert einen Shared Snapshot, wenn Sync konfiguriert ist.
    - ohne Auto-Freigabe: Add bleibt lokal bis `Liste freigeben`.
  - Save-Fehler nach Add verlieren das lokale Item nicht.
  - Checkbox toggelt `inCart`.
  - Abschluss entfernt nur `inCart === true`.
  - `Loeschen` entfernt genau ein Item.
  - `Loeschen` loest keinen Checkbox-Toggle aus.
  - `Liste leeren` leert wie bisher die ganze aktive Grocery-Liste.
  - Pending Remote bleibt bedienbar.
- S5.4 UI-Smokes Desktop:
  - oberes Schreibpanel unveraendert.
  - Kopf des `Offene Liste`-Panels vertraut.
  - Papierliste sichtbar.
  - Checkboxen und Loeschen klar.
  - Freigabe/Abschluss/Leeren hierarchisch verstaendlich.
  - Kassa unterhalb der Listenaktionen.
- S5.5 UI-Smokes Mobile:
  - keine Ueberlaeufe.
  - Trefferflaechen ausreichend.
  - oberes Schreibpanel bleibt auf Mobile brauchbar.
  - Papierliste bleibt lesbar.
  - Checkbox, Meta und `Loeschen` ueberlappen nicht.
- S5.6 Kassa-Smokes:
  - Karussell funktioniert im neuen Bereich.
  - Karussell funktioniert weiterhin im alten Shopping-Screen.
  - Links bleiben unveraendert.
  - Swipe/Keyboard/ARIA bleiben plausibel.
- S5.7 Regression alter Shopping-Screen:
  - Shopping oeffnet weiterhin.
  - Checkbox/Zeilentap/Abschluss weiterhin funktionsfaehig.
  - Kassa dort weiterhin funktionsfaehig, solange der alte Screen existiert.
- S5.8 Regression:
  - Home.
  - Muell.
  - PWA Installbanner.
  - Diagnostics/Touchlog.
  - Supabase-Snapshot soweit lokal sinnvoll.
- S5.9 Code Review gegen Modulgrenzen.
- S5.10 Contract Review gegen README, PRODUCT, Module Overviews und diese Roadmap.
- S5.11 Schritt-Abnahme und Commit-Empfehlung.

Nicht lokal oder nur eingeschraenkt pruefbar:

- echte Zwei-Geraete-Supabase-Realtime.
- installierte-PWA-Updateverhalten.
- finale Familien-Nutzungsabnahme am Handy.

### S5 Ergebnisprotokoll 16.05.2026

Ausgefuehrte Checks:

- `Get-ChildItem -Path app -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }`
  - Ergebnis: gruen fuer alle realen JS-Dateien in `app`.
- `git diff --check -- index.html app/modules/writing.js app/modules/shopping.js app/modules/kassa-carousel.js app/styles/shopping.css app/styles/waste.css app/styles/home.css app/styles/writing.css "docs/HESTIA Einkaufsbereich Konsolidieren Roadmap.md"`
  - Ergebnis: keine Whitespace-Fehler; Git meldet nur bekannte LF/CRLF-Hinweise fuer geaenderte Arbeitskopien.
- Node-State-Smoke:
  - `upsertItem` fuegt Eintraege hinzu.
  - `toggleInCart` setzt `inCart`.
  - `finishShopping` entfernt nur `inCart === true`.
  - `removeItem` entfernt genau einen Eintrag.
- DOM-/Hook-Smoke:
  - Home enthaelt `data-nav="writing"`, `data-nav="shopping"` und `data-nav="waste"`.
  - Writing enthaelt `writing-list`, `finish-writing-list`, `save-list`, `clear-list` und `accept-remote-list`.
  - Alter Shopping-Screen enthaelt weiterhin `shopping-list`, `finish-shopping` und `data-nav="writing"` fuer `Aendern`.
  - Beide Kassa-Bloecke enthalten vier unveraenderte Google-Play-Links.
- Kassa-Code-Smoke:
  - `initKassaCarousel` nutzt `querySelectorAll("[data-kassa-carousel]")`.
  - Jede Instanz initialisiert eigene Items, Controls, Stage, Position, Keyboard- und Pointer-Handler.
- Sync-/Behavior-Smoke:
  - Add ruft nach bewusstem Submit `persistSharedState("add-item")` auf.
  - Toggle, Loeschen, Leeren und Abschluss persistieren weiterhin Snapshot-basiert.
  - Save-Fehler setzen `syncMode = "error"` und verlieren lokale Items nicht.
  - `Liste freigeben` bleibt Retry/Fallback fuer `dirty`, `error` und `pending-remote`.

Code Review:

- Keine offenen Code-Findings.
- Modulgrenzen bleiben tragfaehig:
  - State-Vertrag unveraendert: `id`, `name`, `quantity`, `unit`, `inCart`.
  - Router-Ziele bleiben stabil.
  - `writing.js` uebernimmt nur die kombinierte Writing-/Shopping-Flaeche.
  - `shopping.js` bleibt fuer den alten Screen unveraendert.
  - `kassa-carousel.js` wurde nur auf Mehrinstanz-Initialisierung erweitert.
  - `shopping.css` enthaelt nun bewusst wiederverwendbare Papierlisten- und Kassa-Regeln.

Contract Review:

- Roadmap-Scope eingehalten:
  - Kein SQL, keine RLS, keine neue Tabelle, keine neue Dependency.
  - Keine Amazon-Listenlogik.
  - Sichtbare Amazon-Home-Kachel ist nur als Platzhalter dokumentiert und bleibt technisch am bestehenden `shopping`-Ziel.
  - Alter Shopping-Screen bleibt erreichbar und funktionsfaehig.
- Doku-Findings fuer S6:
  - `docs/QA_CHECKS.md` beschreibt noch den alten Home-Stand mit `Schreiben` und `Einkaufen`.
  - `docs/modules/Home Module Overview.md`, `Shopping Module Overview.md`, `Amazon Module Overview.md`, `Kassa Carousel Module Overview.md`, `CSS Module Overview.md` und `Waste Module Overview.md` muessen auf den neuen sichtbaren Home-/Kassa-/Einkauf-Vertrag synchronisiert werden.
  - `PRODUCT.md` und `README.md` koennen in S6 bewusst produktseitig nachgezogen werden, falls `Einkauf`, Amazon-Platzhalter und alte Shopping-Vergleichsflaeche dort bereits sichtbar sein sollen.

Nicht lokal abschliessend pruefbar:

- echte Zwei-Geraete-Supabase-Realtime.
- installierte PWA mit Service-Worker-Updateverhalten.
- Mobile-/Familienabnahme auf realen Geraeten.
- echte Touch-Swipe-Interaktion des Kassa-Karussells.
- externer Google-Play-/Appstore-Aufruf je Geraet.

Manuelle Rueckmeldung von Stephan:

- Item speichern funktioniert.
- Appstore/Store-Oeffnung funktioniert.
- Home-Kachellayout wirkt nach Hoehenangleichung stimmig.

S5-Abnahme:

- Keine offenen S5-Code-Findings.
- Alle lokal sinnvollen S5-Checks erledigt.
- Restliche offene Punkte sind manuelle Browser-/Geraete-Smokes und werden nicht als Codeblocker gewertet.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Code, Doku, QA und Roadmap sprechen denselben Konsolidierungsvertrag.

Substeps:

- S6.1 `docs/modules/Shopping Module Overview.md` aktualisieren.
- S6.2 `docs/modules/Amazon Module Overview.md` aktualisieren.
- S6.3 `docs/modules/Kassa Carousel Module Overview.md` aktualisieren, falls Kassa-Ort/Initialisierung betroffen ist.
- S6.4 `docs/modules/Home Module Overview.md` nur aktualisieren, falls Home-Copy faktisch beruehrt wurde.
- S6.5 `docs/modules/CSS Module Overview.md` aktualisieren.
- S6.6 `docs/modules/State Layer Module Overview.md` und `Supabase Sync` nur aktualisieren, falls Verhalten faktisch beruehrt wurde.
- S6.7 `docs/QA_CHECKS.md` erweitern.
- S6.8 `docs/future roadmaps.md` aktualisieren.
- S6.9 `docs/HESTIA Amazon Liste Roadmap.md` als Folge-Roadmap pruefen und ggf. sichtbar auf den neuen kombinierten Bereich beziehen.
- S6.10 Roadmap mit Ergebnisprotokollen aktualisieren.
- S6.11 Finaler Contract Review:
  - Roadmap vs. Code.
  - Roadmap vs. Module Overviews.
  - Roadmap vs. QA.
  - Roadmap vs. Amazon-Folgeplanung.
- S6.12 Abschluss-Abnahme.
- S6.13 Commit-Empfehlung.
- S6.14 Archiv-Entscheidung.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll 16.05.2026

Fokus:

- S6 wurde als Doku-Vertragsabgleich umgesetzt.
- Schwerpunkt lag bewusst auf exakten Module Overviews, nicht nur auf QA.

Aktualisierte Modul- und Produktdokumente:

- `docs/modules/Shopping Module Overview.md`
  - sichtbarer Bereich `Einkauf`, technische Route `writing`.
  - Formular plus Papierliste, Auto-Freigabe nach Add, `Im Wagen`, `Loeschen`, `Liste abschliessen`, Kassa und Pending-Remote-Vertrag dokumentiert.
- `docs/modules/Amazon Module Overview.md`
  - alter Shopping-Screen als technisch erreichbare Uebergangs-/Vergleichsflaeche beschrieben.
  - sichtbare Amazon-Kachel als Platzhalter auf bestehendem `shopping`-Ziel dokumentiert.
- `docs/modules/Home Module Overview.md`
  - Home-Vertrag auf `Einkauf`, `Amazon`, `Muell` aktualisiert.
  - Amazon als Platzhalter bis Roadmap 6B dokumentiert.
- `docs/modules/Kassa Carousel Module Overview.md`
  - Mehrinstanz-Vertrag fuer Einkauf und alten Shopping-Screen dokumentiert.
  - Kassa bleibt nicht Amazon.
- `docs/modules/CSS Module Overview.md`
  - `shopping.css` als Owner fuer wiederverwendbare Papierlisten-, Checkbox-, Abschluss- und Kassa-Regeln dokumentiert.
  - Waste-Kachel darf die gemeinsame Home-Kartenhoehe nicht mehr kleiner machen.
- `docs/modules/Waste Module Overview.md`
  - Home-Vertrag auf `Einkauf`, `Amazon`, `Muell` aktualisiert.
- `docs/modules/State Layer Module Overview.md`
  - `Einkauf`/technisch `writing` als Owner fuer Add, Toggle, Remove, Clear und Abschluss ergaenzt.
- `docs/modules/Supabase Sync Module Overview.md`
  - Add nach bewusstem Submit als Snapshot-Save dokumentiert.
  - `Liste freigeben` als Retry/Fallback dokumentiert.
- `docs/modules/Touchlog Module Overview.md`
  - neue Writing-/Einkauf-Ereignisse und Save-Gruende dokumentiert.
- `docs/modules/Diagnostics Module Overview.md`
  - Home-Utility-Grenze auf neue Home-Pfade angepasst.
- `README.md`
  - sichtbarer `Einkauf`, technische Route `writing` und Amazon-Platzhalter ergaenzt.
- `PRODUCT.md`
  - Produktkern auf kombinierten `Einkauf`-Flow nachgezogen.
  - alter Shopping-Screen als Uebergangsflaeche dokumentiert.
- `docs/QA_CHECKS.md`
  - Smokechecks auf `Einkauf`, Amazon-Platzhalter, Kassa in Einkauf und altem Shopping-Screen aktualisiert.
- `docs/future roadmaps.md`
  - Roadmap 6A als umgesetzt beschrieben.
  - Amazon 6B als Folgeplanung auf `Einkauf`, `Amazon`, `Muell` ausgerichtet.
- `docs/HESTIA Amazon Liste Roadmap.md`
  - als Roadmap 6B-Folgeplanung aktualisiert.
  - alte Toggle-/Home-Annahmen als nicht final markiert.
  - aktuelles Zielbild: eigener Amazon-Bereich statt bevorzugter Toggle im Einkauf.

Contract Review:

- Code vs. Doku:
  - `index.html` zeigt `Einkauf`, `Amazon`, `Muell`; Overviews und QA sprechen denselben sichtbaren Vertrag.
  - technische Route `writing` bleibt in Doku bewusst erhalten.
  - `shopping` bleibt als alter Screen/Platzhalter-Ziel dokumentiert.
- Datenvertrag:
  - kein `listType`, keine SQL-, RLS- oder Supabase-Schema-Aenderung in Roadmap 6A.
  - Frontend-Vertrag bleibt `id`, `name`, `quantity`, `unit`, `inCart`.
- Kassa-Vertrag:
  - Mehrinstanz-Initialisierung ist dokumentiert.
  - Kassa bleibt Einkauf/alter Shopping-Screen, nicht Amazon.
- Home-Vertrag:
  - Amazon ist sichtbar, aber nur Platzhalter bis Roadmap 6B.
  - Home bleibt kein Dashboard.
- QA-Vertrag:
  - Lokale und manuelle Checks sind auf die neue sichtbare Struktur aktualisiert.

Korrigierte Findings:

- S6-F1: Module Overviews beschrieben noch `Schreiben` und `Einkaufen` als unveraenderten sichtbaren Home-Vertrag.
  - Behoben durch Home-, Writing-, Shopping-, Waste- und Produktdoku-Update.
- S6-F2: Kassa war in der Doku noch nur an Shopping gebunden.
  - Behoben durch Kassa- und CSS-Overview mit Mehrinstanz-Vertrag.
- S6-F3: QA beschrieb den alten Home-Stand.
  - Behoben durch QA-Update.
- S6-F4: Amazon-Roadmap nahm noch Toggle/alte Home-Struktur als Zielbild.
  - Behoben durch Roadmap-6B-Statushinweis und Folgeplanung.

Abschluss-Abnahme:

- S6 ist fachlich abgeschlossen.
- Es gibt keine offenen S6-Findings.
- Roadmap ist commitbereit.
- Archiv-Entscheidung: archivbereit nach finaler Nutzerfreigabe; in diesem Schritt noch nicht verschoben, damit die aktive Roadmap fuer Review sichtbar bleibt.

Commit-Empfehlung:

- `refactor(shopping): consolidate grocery flow`

Nachtraegliche Doku-Namensentscheidung:

- `docs/modules/Writing Module Overview.md` wurde zu `docs/modules/Shopping Module Overview.md`.
- `docs/modules/Shopping Module Overview.md` wurde zu `docs/modules/Amazon Module Overview.md`.
- Diese Umbenennung betrifft nur die Dokumente und Referenzen. Die technischen Dateien `app/modules/writing.js`, `app/modules/shopping.js`, DOM-IDs und Router-Ziele bleiben bewusst stabil.
- Aktive Referenzen wurden auf die neuen Namen umgestellt; archivierte DONE-Roadmaps behalten ihre historischen Modulnamen.

## Smokechecks / Regression

- Home startet.
- `Einkauf` oeffnet weiterhin den technisch bestehenden Schreibbereich.
- Produkt kann schnell eingetragen werden.
- Menge/Einheit bleiben nutzbar.
- Papierliste erscheint im `Offene Liste`-Panel.
- Eintraege koennen im `Offene Liste`-Panel als `Im Wagen` markiert werden.
- `Loeschen` entfernt einzelne Eintraege.
- `Liste freigeben` funktioniert weiter.
- Pending Remote bleibt sichtbar und bedienbar.
- `Liste leeren` funktioniert weiter.
- `Liste abschliessen` entfernt nur abgehakte Eintraege.
- Kassa-Karussell ist unterhalb der Listenaktionen erreichbar.
- Alter `Einkaufen`-Screen bleibt erreichbar und funktionsfaehig.
- Muellbereich bleibt unveraendert.
- App funktioniert ohne Supabase-Konfiguration weiter lokal.
- Keine Amazon-Listenlogik, SQL-, RLS- oder Datenvertragsaenderung wurde eingefuehrt.

## Abnahmekriterien

- Das bisherige `Offene Liste`-Panel fuehlt sich wie eine echte Einkaufsliste an.
- Stephan kann im Bereich `Einkauf` eintragen und im zweiten Panel abhaken, loeschen, freigeben und abschliessen.
- Die Papierlisten-Aesthetik bleibt staerker als das Formular.
- Der Screen ist auf Handy nicht ueberladen.
- Der alte Einkaufsbereich bleibt als technische Vergleichsflaeche bestehen.
- Amazon kann danach als eigene Kachel/eigener Bereich auf demselben Muster geplant werden.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `refactor(shopping): consolidate grocery flow`
