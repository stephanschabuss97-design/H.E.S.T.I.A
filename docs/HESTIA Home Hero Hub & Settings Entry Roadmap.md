# HESTIA Home Hero Hub & Settings Entry Roadmap

## Ziel (klar und pruefbar)
Der HESTIA-Startscreen soll von einem neutralen Button-Menue zu einem ruhigeren, moderneren Hero-Hub weiterentwickelt werden, der die zwei Kernintentionen `Schreiben` und `Einkaufen` staerker traegt, ohne in Dashboard-Logik oder App-Store-Kacheloptik abzurutschen. Der bisherige `Dev`-Zugang soll dabei aus der Primaernavigation verschwinden und in einen kleinen Settings-/Utilities-Einstieg uebergehen, der sowohl Stilwahl als auch Entwicklerhilfen sauber aufnimmt.

Pruefbare Zieldefinition:
- Home zeigt genau zwei primaere Intent-Flaechen fuer `Schreiben` und `Einkaufen`.
- Der bisherige `Dev`-Button steht nicht mehr auf derselben Hierarchiestufe wie die Produktpfade.
- Ein kleiner Utilities-/Settings-Einstieg ist vorhanden und fachlich sauber benannt.
- Stilwahl und Entwicklerhilfen sind innerhalb dieses Einstiegs klar getrennt.
- Home wirkt weiterhin ruhig, wertig und leicht, nicht wie ein Dashboard oder Werkzeugkasten.
- Code, Doku, Home-UX und Diagnosezugang sprechen denselben Vertrag.

## Scope
- Ueberarbeitung des Home-/Hero-Hub-Vertrags.
- Entscheidung fuer die Zielhierarchie von `Schreiben`, `Einkaufen` und Utilities.
- Entscheidung, ob Home mit zwei grossen Buttons oder zwei ruhigen Kacheln arbeitet.
- Definition des neuen Einstiegs fuer Stilwahl und Entwicklerhilfen.
- Benennung und Informationsarchitektur der Utilities-/Settings-Flaeche.
- Kleine visuelle Kontextsignale fuer den Home-Hub, falls sie dem Kernfluss helfen.
- Repo-Umsetzung fuer Home-Markup, Home-CSS und den neuen Utility-Einstieg.

## Not in Scope
- Redesign von Writing- oder Shopping-Flow als Ganzes.
- Ausbau des Startscreens zu Dashboard, Statuszentrale oder Aktivitaetsfeed.
- Nutzerkonten, Profile oder personenbezogene Einstellungen.
- Grosse Theme-Engine oder beliebige Personalisierungs-Sammlungen.
- Umbau des Diagnostics-Vertrags selbst, solange dessen bestehende Guardrails erhalten bleiben.
- Push-, Sync-, Offline- oder Datenmodell-Aenderungen unter dem Deckmantel des Hub-Redesigns.

## Problemzusammenfassung
Der aktuelle Home-Screen ist funktional bereits klar und benutzbar. Er fuehrt direkt zu `Schreiben` und `Einkaufen` und hat damit den Produktkern nicht verloren.

Trotzdem zeigt der heutige Stand einige Reibungen:

- Die zwei Kernaktionen und der `Dev`-Zugang erscheinen als drei gleichartige Bedienelemente.
- Dadurch wirkt Home eher wie ein neutrales Menue als wie ein bewusst gestalteter Intent-Hub.
- `Dev` steht visuell auf derselben Ebene wie die zwei Alltagsaktionen und schwaecht damit den Produktkern.
- Stilwahl fuer reale Nutzerinnen und Entwicklerdiagnose teilen sich heute dieselbe technische Flaeche, aber noch ohne saubere alltagsnahe Einstiegslogik.
- Die Startseite wirkt dadurch schneller nach "Listen-App mit Extra-Panel" als nach einem fokussierten Haushaltswerkzeug.

Die Herausforderung ist nicht, mehr Informationen auf Home zu bringen, sondern die Hierarchie klarer zu machen:

- `Schreiben` und `Einkaufen` sind der Kern.
- Utilities gehoeren dazu, aber nicht in den Hero-Mittelpunkt.
- Stilwahl ist ein legitimer Nutzer-Use-Case.
- Entwicklerhilfen bleiben legitim, duerfen den Alltagseindruck aber nicht dominieren.

## Relevante Referenzen (Code)
- `index.html`
  - Home besitzt heute zwei grosse Buttons plus einen separaten `Dev`-Button im Utility-Bereich.
- `app/styles/home.css`
  - traegt Home-Titel, Action-Stack und Home-Utilities.
- `app/styles/ui.css`
  - enthaelt die globalen Button-Patterns, auf denen Home heute basiert.
- `app/styles/devtools.css`
  - traegt die Diagnose-/Touchlog-Flaeche, die kuenftig anders eingestiegen werden koennte.
- `app/core/touchlog.js`
  - verdrahtet heute den `Dev`-Toggle direkt mit dem Touchlog-Panel.
- `app/diagnostics/font-presets.js`
  - Stilwahl sitzt heute im Dev-/Touchlog-Kontext.
- `app/diagnostics/art-style-presets.js`
  - Artstil-Wahl sitzt ebenfalls im Dev-/Touchlog-Kontext.
- `docs/modules/Home Module Overview.md`
  - beschreibt den Home-Screen heute noch mit `Dev` als geparktem Entwicklerzugang.

## Relevante Referenzen (Doku)
- `README.md`
- `PRODUCT.md`
- `docs/modules/Home Module Overview.md`
- `docs/modules/Diagnostics Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/QA_CHECKS.md`
- `docs/archive/HESTIA Dev Panel, Touchlog & Diagnostics Roadmap (DONE).md`
- `docs/archive/HESTIA CSS Separation & Style Architecture Roadmap (DONE).md`

## Finding-Katalog - aktueller Hero-Hub vs. HESTIA-Zielbild

### F1 - Die zwei Kernpfade sind richtig, aber Home ist noch eher Menue als Hub

Heute:
- `Schreiben` und `Einkaufen` sind bereits klar sichtbar.
- Die Flaechen sagen aber vor allem "hier entlang" und noch wenig "wofuer genau".

Bewertung:
- HESTIA braucht keinen komplexeren Startscreen.
- Es braucht eher mehr Intent-Klarheit und weniger Menue-Anmutung.

### F2 - `Dev` steht aktuell zu nah am Produktkern

Heute:
- `Dev` ist sichtbar und leicht erreichbar.
- Die visuelle Distanz zu den Kernintentionen ist aber noch zu klein.

Bewertung:
- Das schwaecht den Eindruck eines ruhigen Alltagswerkzeugs.
- `Dev` oder seine Nachfolgerolle gehoert in Utilities, nicht in die Hero-Mitte.

### F3 - Stilwahl ist kein reiner Dev-Use-Case mehr

Heute:
- Schriftstil und Artstil sitzen im Dev-/Touchlog-Panel.

Bewertung:
- Sobald diese Wahl fuer deine Frau ein realer Nutzerpfad ist, reicht die Bezeichnung `Dev` nicht mehr.
- Die Informationsarchitektur muss deshalb zwischen `Darstellung` und `Entwickler` unterscheiden.

### F4 - Home darf moderner werden, aber nicht lauter

Chance:
- ruhigere Kacheln
- kleine Symbole
- sparsame Kontextsignale wie `Liste leer` oder `2 offen`

Risiko:
- Kachel-UI kippt schnell in App-Store-, Dashboard- oder Produktivitaets-App-Sprache.

Bewertung:
- HESTIA profitiert eher von zwei grossen Intent-Surfaces als von mehr Navigation oder Daten.

## Guardrails
- Home bleibt Intent-Hub, kein Dashboard.
- Genau zwei primaere Produktpfade bleiben sichtbar: `Schreiben` und `Einkaufen`.
- Utilities duerfen vorhanden sein, aber nicht den Kern ueberholen.
- Stilwahl ist erlaubt, aber bleibt klein und lokal.
- Entwicklerhilfen bleiben erreichbar, aber klar sekundar.
- Wenn Home kleine Statussignale zeigt, muessen sie fachlich eindeutig und ehrlich sein; kein Mischzustand aus lokalem Stand, letztem Save und Remote-Wahrheit.
- `Darstellung` darf im gemeinsamen Utility-Einstieg leicht erreichbar sein; `Entwickler` bleibt bewusst nachgeordnet und darf nicht dieselbe Erstlesbarkeit wie Stilwahl erhalten.
- Kleine Statushinweise sind nur erlaubt, wenn sie den Einkaufsfluss ruhiger oder klarer machen.
- Keine Metriken, Historien, Activity-Feeds oder Hausverwaltungs-Logik auf Home.
- Kein generischer Settings-Scope, der spaeter beliebige Produktfunktionen ansammelt.

## Architektur-Constraints
- Kein Build-Tooling und kein Framework-Umbau.
- Home bleibt im bestehenden Screen-/Router-Modell.
- Bestehende Diagnostics-Funktionen duerfen nur umgehangen, nicht fachlich verwischt werden.
- Stilwahl bleibt lokal und wird nicht Teil des Household-Syncs.
- Falls Home spaeter kleine Kontextsignale traegt, brauchen sie einen expliziten Daten-Owner:
  - entweder sofort ehrlicher lokaler Listenstand
  - oder bewusst gar kein Statussignal
- Diagnostics-Hebel wie `No Cache Assets`, `Touchlog leeren` oder `Dev State zuruecksetzen` duerfen im gemeinsamen Utility-Einstieg nicht als gleichrangige Alltagsoptionen erscheinen.
- Bestehende Touchlog- und Dev-Guardrails aus der Diagnostics-Roadmap bleiben gueltig.

## Zielstruktur (Sollbild fuer HESTIA)

Empfohlenes Sollbild:
- Home zeigt weiter den Titel `H.E.S.T.I.A.`
- darunter:
  - zwei grosse, ruhige Intent-Flaechen fuer `Schreiben` und `Einkaufen`
- optional pro Flaeche:
  - kleines ruhiges Symbol
  - kurze Hilfszeile
  - kleiner Zustandsindikator wie `Liste leer` oder `2 offen`
- in einer Ecke oder als kleine Utility-Aktion:
  - Zahnrad-/Utilities-Einstieg
- hinter dem Einstieg:
  - Sektion `Darstellung`
  - Sektion `Entwickler`

Hinweis:
- Ob der Einstieg sichtbar als Zahnrad, Link oder kleine Schaltflaeche erscheint, wird in der Roadmap bewusst entschieden.
- Nicht jede moegliche Kontextzeile muss am Ende gebaut werden; erst der Vertrag, dann die konkrete Dichte.

## Tool Permissions
Allowed:
- `index.html`, Home-/UI-/Devtools-CSS und passende JS-Verdrahtung innerhalb des Scopes aendern.
- Utility-/Settings-Einstieg innerhalb des bestehenden Home-/Diagnostics-Schnitts umhaengen.
- Doku und QA fuer Home und Utilities nachziehen.

Forbidden:
- Home zu einem allgemeinen Kontrollzentrum ausbauen.
- Neue Produkt-Features im Utilities-Bereich verstecken.
- Diagnostics-Vertrag still aufweichen oder in Produkt-Settings verwischen.
- Unverwandte Redesigns von Writing, Shopping oder Sync in denselben Scope ziehen.

## Execution Mode
- Erst `S1` bis `S3` ziehen Produktvertrag, Informationsarchitektur und UI-Hierarchie fest.
- Erst danach setzt `S4` die konkrete Home- und Utility-Umhaengung im Repo um.
- `S5` schliesst mit QA, Doku-Sync und Restrisiken.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Contract- oder Smoke-Check dokumentieren.

## Statusmatrix
| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse des aktuellen Home-Hubs und seiner Driftstellen | DONE | Home ist heute ein klarer, aber noch menuehafter Drei-Zonen-Schnitt: zwei starke Intent-Buttons plus kleiner `Dev`-Entry. Der eigentliche Drift sitzt in der Hierarchie und in der noch unsauberen Vermischung von Stilwahl und Entwicklerzugang. |
| S2 | Produktvertrag fuer den neuen Hero-Hub finalisieren | DONE | Home bleibt ein ruhiger Zwei-Intent-Hub, aber nicht mehr als reines Button-Menue: `Schreiben` und `Einkaufen` werden als ruhige Intent-Kacheln gefasst. Kleine Icons und knappe Hilfscopy sind erlaubt; dynamische Umgewichtung der beiden Pfade je nach Listenstand ist bewusst ausgeschlossen. |
| S3 | Informationsarchitektur fuer Utilities, Darstellung und Entwicklerzugang festziehen | DONE | Der sekundaere Einstieg wird nicht mehr textlich als `Dev` gefuehrt, sondern als kleines stilles Zahnrad/Utility-Signal. Dahinter bleibt ein gemeinsamer Einstieg erlaubt, aber mit klarer Erstebene `Darstellung` und bewusst nachgeordnetem Bereich `Entwickler`. |
| S4 | Repo-Umsetzung des finalen Hero-Hub- und Utility-Vertrags | IN_PROGRESS | `S4.1` bis `S4.3` sind umgesetzt: Home-Markup traegt jetzt `home-hero`, strukturierte Intent-Kacheln und einen kleinen semantisch gelabelten Utility-Einstieg. Das Home-CSS zieht die neue Hierarchie sichtbar auf Hero, Intent-Karten, kleine Hint-Zeilen und dezente Inline-Symbolik; die innere Panel-Informationsarchitektur folgt in den naechsten Substeps. |
| S5 | QA, Doku-Sync und Abschlussbewertung | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## Wiederkehrende Abschluss-Substeps pro Hauptschritt
- `letzter fachlicher Substep + 1: Schritt-Abnahme`
  - Ergebnis gegen Produktvertrag pruefen
  - Home-Drift gegen Guardrails pruefen
  - mindestens einen gezielten Sicht-, Contract- oder Navigations-Check dokumentieren
- `danach: Doku-Sync`
  - betroffene Modul-Overviews, `PRODUCT.md` und `docs/QA_CHECKS.md` sofort nachziehen
- `danach: Commit-Empfehlung`
  - festhalten, ob der Schritt bereits isoliert commitbar ist

## Schritte + Subschritte

### S1 - Ist-Analyse des aktuellen Home-Hubs und seiner Driftstellen
- S1.1 Aktuelles Home-Markup, CSS und Diagnostics-Einstieg gegen den Produktkern mappen.
- S1.2 Sichtbar festhalten, warum der heutige Drei-Elemente-Schnitt eher Menue als Intent-Hub wirkt.
- S1.3 Trennen, welche Teile echte Produktnavigation sind und welche Teile Utilities/Diagnostics sind.
- S1.4 Pruefen, welche Stilwahl-Beduerfnisse bereits reale Nutzerbeduerfnisse sind und nicht mehr nur Dev-Sandbox.
- S1.5 Schritt-Abnahme.
- S1.6 Doku-Sync.
- S1.7 Commit-Empfehlung.
- Output: belastbare Ist-Karte des Home-Hubs.
- Exit-Kriterium: primaere Navigation, Utilities und Diagnose sind klar getrennt benannt.

#### S1 Checkpoint A - Die aktuelle Home-Hierarchie ist sauber beschrieben

Heute besteht Home aus:
- Titel
- zwei grossen Produktbuttons
- einem kleineren `Dev`-Button darunter

Bewertung:
- funktional klar
- visuell noch zu gleichfoermig
- Utility-Einstieg ist zwar kleiner, aber semantisch noch nicht sauber eingeordnet

Repo-Befund:
- `index.html` zeigt auf `#screen-home` heute genau diese Struktur:
  - `h1.home-title`
  - `.actions` mit `Einkaufen` und `Schreiben`
  - `.home-utilities` mit `#dev-panel-toggle`
- `app/styles/home.css` behandelt Home damit heute als gestapelten Action-Bereich plus kleinen Utility-Nachtrag.
- `app/core/touchlog.js` haengt den Home-Entry direkt an das bestehende Touchlog-/Dev-Panel.

Bewertung:
- Die Trennung ueber Groesse und Position ist bereits vorhanden.
- Der Einstieg bleibt aber in derselben Interaktionssprache wie die Produktbuttons und wirkt dadurch eher wie ein dritter Modus als wie ein anderer Bereich.

#### S1 Checkpoint B - Der echte Drift-Punkt ist Hierarchie, nicht Funktionsmangel

Die Hauptfrage ist nicht:
- fehlen Home Features?

Sondern:
- ist sofort klar, was Kernfluss ist und was Hilfsflaeche ist?

Bewertung:
- HESTIA hat hier eher ein Hierarchieproblem als ein Informationsproblem.

Konkrete Beobachtung:
- Home hat aktuell keine Produktueberladung.
- Trotzdem liest sich der Screen noch wie:
  - Titel
  - drei Aktionen

und noch nicht wie:
- zwei Kernintentionen
- eine kleine sekundare Utility-Flaeche

Begruendung:
- Die zwei primaeren Wege sind richtig.
- Der Drift entsteht nicht durch fehlende Inhalte, sondern durch die noch zu schwache semantische Distanz zwischen Alltagspfad und Helferpfad.

#### S1 Checkpoint C - Stilwahl ist als eigener Use-Case anerkannt

Wenn Stilwahl fuer deine Frau ein echter Nutzungsfall ist, gilt:
- sie darf nicht hinter einem rein technischen `Dev`-Label versteckt bleiben
- sie braucht einen legitimen Platz im Produkt, aber ohne den Kernfluss auf Home aufzublasen

Repo-Befund:
- Die heutige Dev-/Touchlog-Flaeche enthaelt bereits:
  - `Aktive Modi`
  - `Diagnose`
  - `Visuelle Sandbox`
  - `Hilfen`
- In `Visuelle Sandbox` liegen mit `Schriftstil` und `Artstil` bereits echte Darstellungsoptionen.

Bewertung:
- Die Flaeche ist fachlich nicht mehr rein Entwicklerdiagnose.
- Der aktuelle `Dev`-Name ist damit fuer den realen Nutzungsfall zu eng geworden.

#### S1 Checkpoint D - Produktnavigation, Utilities und Diagnose sind jetzt sauber getrennt

Nach der Ist-Analyse gilt fuer HESTIA heute:

Primaere Produktnavigation:
- `Schreiben`
- `Einkaufen`

Sekundaerer Home-Einstieg:
- `Dev` als aktueller Utility-/Diagnostics-Zugang

Inhalt hinter dem sekundaeren Einstieg:
- Darstellung:
  - `Schriftstil`
  - `Artstil`
- Entwickler:
  - aktive Modi
  - `No Cache Assets`
  - Touchlog
  - `Touchlog leeren`
  - `Dev State zuruecksetzen`

Bewertung:
- Diese Trennung ist fachlich jetzt benannt, aber im aktuellen UI noch nicht sauber kommuniziert.
- Genau daraus entsteht der Bedarf fuer `S2` und `S3`.

#### S1 Checkpoint E - Schritt-Abnahme

Contract-Check:
- Der aktuelle Home-Schnitt ist jetzt repo-basiert beschrieben und nicht nur aus dem Screenshot hergeleitet.
- Der Hauptdrift ist als Hierarchie- und Benennungsproblem klar benannt.
- Stilwahl ist als legitimer Nutzerpfad anerkannt und nicht mehr nur als Dev-Sandbox eingeordnet.
- Primaere Navigation, Utilities und Entwicklerdiagnose sind fuer den weiteren Verlauf sauber getrennt.

Abnahme:
- `S1` ist fachlich abgeschlossen.
- Die offenen Fragen liegen jetzt nicht mehr im Ist-Verstaendnis, sondern in der Produktentscheidung fuer `S2` und der Informationsarchitektur fuer `S3`.

#### S1 Checkpoint F - Doku-Sync und Commit-Empfehlung

Doku-Sync:
- Diese Roadmap enthaelt jetzt die belastbare Ist-Karte des aktuellen Hero-Hubs.
- Weitere Doku muss fuer `S1` noch nicht getrennt angepasst werden, weil der aktuelle Home-Vertrag in `docs/modules/Home Module Overview.md` weiterhin den echten Repo-Stand beschreibt.

Commit-Empfehlung:
- `S1` muss nicht isoliert committed werden.
- Fachlich gehoert der Analysegewinn direkt zu `S2`, weil erst der Produktvertrag aus dieser Ist-Karte den naechsten echten Stand erzeugt.

### S2 - Produktvertrag fuer den neuen Hero-Hub finalisieren
- S2.1 Verbindlich festlegen, dass Home genau zwei primaere Intent-Flaechen traegt.
- S2.2 Final entscheiden, ob diese Flaechen als grosse Buttons oder ruhige Kacheln umgesetzt werden.
- S2.3 Festlegen, ob kleine Symbole erlaubt sind und wie stark sie visuell auftreten duerfen.
- S2.4 Entscheiden, ob kleine Kontextsignale auf Home sinnvoll sind:
  - `Liste leer`
  - `x offen`
  - kurze Hilfszeile
- S2.5 Festlegen, ob eine der beiden Flaechen je nach Listenstand leicht priorisiert werden darf.
- S2.6 Schritt-Abnahme.
- S2.7 Doku-Sync.
- S2.8 Commit-Empfehlung.
- Output: finaler Home-/Hero-Vertrag fuer HESTIA.
- Exit-Kriterium: keine offene Produktfrage mehr zu primaeren Flaechen, Symbolik und Home-Dichte.

#### S2 Checkpoint A - Zwei primaere Intentionen sind verbindlich

Home traegt kuenftig nur:
- `Schreiben`
- `Einkaufen`

Nicht Teil des Hero-Kerns:
- `Dev`
- Touchlog
- Stilwahl
- Sync-Details
- Listenhistorie

Entscheidung:
- Daran wird auch im Redesign nichts veraendert.
- Home bleibt ein Zwei-Intent-Hub und nicht ein Screen mit mehreren fast gleichrangigen Zielen.

#### S2 Checkpoint B - Kacheln sind nur dann richtig, wenn sie ruhig bleiben

Erlaubt:
- zwei grosse ruhige Intent-Surfaces
- kleine Icons
- kurze Hilfscopy
- dezente Zustandszeile

Nicht erlaubt:
- bunte App-Kacheln
- grosse Symbolillustrationen
- Kartenraster mit Zusatzmodulen
- statuslastiger Dashboard-Look

Entscheidung:
- HESTIA geht fuer Home auf zwei ruhige Intent-Kacheln statt auf drei oder zwei reine Menue-Buttons.
- Der Unterschied zu den heutigen Buttons ist nicht "mehr Deko", sondern:
  - staerkere Intent-Lesbarkeit
  - mehr Materialitaet
  - etwas mehr Platz fuer knappe Orientierung

Begruendung:
- Das passt besser zum wertigen, ruhigen HESTIA-Ton.
- Gleichzeitig bleibt die Home-Flaeche klein genug, um nicht wie ein Dashboard zu wirken.

#### S2 Checkpoint C - Kontext ist nur erlaubt, wenn er den Kernfluss verbessert

Sinnvolle Kandidaten:
- `Liste leer`
- `2 offen`
- `Schnell etwas notieren`
- `Liste mitnehmen und abhaken`

Nicht sinnvoll:
- Verlauf
- letzte Aktivitaet
- Sync-Timestamps als Hero-Inhalt
- Touchlog-Auszug

Entscheidung:
- Pro Intent-Kachel ist hoechstens eine kleine Sekundaerzeile erlaubt.
- Diese Sekundaerzeile darf entweder:
  - kurze Hilfscopy sein
  - oder ein ehrlicher kleiner Zustandsindikator

Nicht erlaubt:
- mehrere Statuszeilen
- Status plus Timestamp
- kleine Info-Stacks unter den Kacheln
- wechselnde Micromessages ohne klaren Nutzwert

#### S2 Checkpoint D - Home-Kontext braucht einen ehrlichen Wahrheitsvertrag

Falls Home spaeter kleine Zustandszeilen oder Kontextsignale zeigt, gilt verbindlich:
- sie muessen fuer Nutzer sofort eindeutig lesbar sein
- sie duerfen keine lokale und remote gespeicherte Wahrheit vermischen
- sie duerfen keinen "fast aktuell"-Eindruck erzeugen, wenn der Stand nur teilweise synchron ist
- sie duerfen nicht wie verbindliche gemeinsame Household-Wahrheit lesbar sein, wenn sie nur lokal berechnet sind

Erlaubte Richtungen:
- rein lokaler aktueller Listenstand
- oder bewusst gar kein Statussignal auf Home

Nicht erlaubt:
- unklare Mischsignale aus:
  - lokalem Bestand
  - letztem manuellen Save
  - zuletzt geladenem Remote-Snapshot

Begruendung:
- `PRODUCT.md` verlangt ehrlichen Listenstatus.
- Ein kleiner Home-Hinweis ist nur dann hilfreich, wenn er fachlich unmissverstaendlich bleibt.

Produktentscheidung:
- Wenn ein Zustandsindikator kommt, soll er sich auf den ehrlichen aktuellen lokalen Listenstand beziehen.
- Ein numerischer Hinweis wie `2 offen` ist nur dann erlaubt, wenn seine Lesart nicht still nach "gemeinsame Liste insgesamt" klingt.
- Fuer den ersten Zielkorridor von Home ist aber kein Pflicht-Status vorgesehen; HESTIA darf bei knapper Hilfscopy bleiben, wenn das ruhiger ist.

#### S2 Checkpoint E - Kleine Symbole sind erlaubt, aber Text bleibt primaer

Erlaubt:
- ein kleines ruhiges Symbol je Intent-Kachel
- naheliegende Symbolik:
  - Stift fuer `Schreiben`
  - Korb oder Wagen fuer `Einkaufen`

Nicht erlaubt:
- grosse Hero-Illustrationen
- dekorative Badge-Symbolik
- Symbolik, die wichtiger wird als das Wort selbst

Entscheidung:
- Symbole duerfen Orientierung unterstuetzen.
- Die Lesbarkeit von `Schreiben` und `Einkaufen` bleibt aber textgetragen.

#### S2 Checkpoint F - Die beiden Kernpfade bleiben strukturell gleich gewichtet

Gepruefte Option:
- einen der beiden Pfade je nach Listenstand staerker gewichten

Bewertung:
- fachlich denkbar
- fuer HESTIA aber zu beweglich und zu unruhig

Entscheidung:
- `Schreiben` und `Einkaufen` bleiben strukturell gleichrangig.
- Keine wechselnde Hauptrolle auf Home nur wegen:
  - leerer Liste
  - offener Liste
  - letztem Nutzungskontext

Erlaubt bleibt:
- eine kleine ehrliche Kontextzeile innerhalb der Kachel

Nicht erlaubt:
- wechselnde Kachelgroessen
- vertauschte Reihenfolge
- starker Primaer-/Sekundaer-Switch je nach Zustand

#### S2 Checkpoint G - Schritt-Abnahme

Contract-Check:
- Home bleibt verbindlich bei genau zwei primaeren Intentionen.
- Die heutige Menue-Anmutung wird kuenftig ueber zwei ruhige Intent-Kacheln ersetzt, nicht ueber mehr Inhalte.
- Kleine Symbole und eine einzige Sekundaerzeile sind erlaubt, aber nur in ruhiger, textgetragener Form.
- Home-Kontext ist auf ehrlichen lokalen Stand begrenzt oder entfaellt ganz.
- Die beiden Kernpfade behalten eine stabile, nicht springende Hierarchie.

Abnahme:
- `S2` ist fachlich abgeschlossen.
- Die offenen Fragen liegen jetzt nicht mehr im Produktvertrag des Hero-Hubs, sondern in der Informationsarchitektur des sekundaeren Einstiegs fuer `S3`.

#### S2 Checkpoint H - Doku-Sync und Commit-Empfehlung

Doku-Sync:
- Diese Roadmap enthaelt jetzt den finalen Produktvertrag fuer den Hero-Hub.
- Weitere Modul-Doku muss erst mit `S4` angepasst werden, wenn der neue Home-Schnitt auch repo-seitig sichtbar ist.

Commit-Empfehlung:
- `S2` muss noch nicht isoliert committed werden.
- Fachlich gehoert der Hero-Vertrag direkt zu `S3`, weil erst die Utilities-/Settings-Informationsarchitektur den Gesamt-Schnitt schliesst.

### S3 - Informationsarchitektur fuer Utilities, Darstellung und Entwicklerzugang festziehen
- S3.1 Final entscheiden, wie der bisherige `Dev`-Entry kuenftig heisst oder visuell markiert wird.
- S3.2 Festlegen, ob der Einstieg als Zahnrad, Utility-Link oder kleine Icon-Taste erscheint.
- S3.3 Die innere Struktur der Flaeche verbindlich trennen:
  - `Darstellung`
  - `Entwickler`
- S3.4 Festlegen, welche heutigen Inhalte in `Darstellung` aufgehen:
  - `Schriftstil`
  - `Artstil`
- S3.5 Festlegen, welche Inhalte explizit unter `Entwickler` bleiben:
  - aktive Modi
  - Diagnostics-Toggles
  - Touchlog
  - Reset-/Clear-Hilfen
- S3.6 Entscheiden, ob die bestehende Touchlog-Flaeche umbenannt, neu eingerahmt oder nur anders eingestiegen wird.
- S3.7 Schritt-Abnahme.
- S3.8 Doku-Sync.
- S3.9 Commit-Empfehlung.
- Output: klare Utilities-/Settings-Informationsarchitektur.
- Exit-Kriterium: keine Verwechslung mehr zwischen Nutzer-Stylewahl und Entwicklerdiagnose.

#### S3 Checkpoint A - Utilities ist der richtige Oberbegriff, nicht `Dev`

Sobald der Einstieg zwei Zielgruppen bedient:
- dich als Builder
- deine Frau als Stil-Nutzerin

reicht `Dev` als Label nicht mehr.

Moegliche Richtungen:
- stilles Zahnrad ohne starken Text
- `Optionen`
- `Darstellung & Diagnose`
- kleine Utility-Flaeche ohne Hero-Gewicht

Entscheidung:
- Auf Home wird der sekundaere Einstieg nicht mehr als sichtbarer Textbutton `Dev` gefuehrt.
- Zielbild ist ein kleines stilles Zahnrad oder gleichwertiges Utility-Signal ohne Hero-Gewicht.
- Der Einstieg darf klein und leise sein, aber nicht semantisch stumm bleiben.

Begruendung:
- Das passt besser dazu, dass die Flaeche nicht mehr nur Entwicklerdiagnose enthaelt.
- Gleichzeitig verhindert es, dass Home wieder einen dritten textlichen Hauptmodus bekommt.

Verbindlicher Zusatz:
- Der Einstieg braucht eine klare semantische Lesbarkeit, zum Beispiel ueber:
  - `aria-label`
  - klaren Panel-Titel nach dem Oeffnen
  - optional kleine Hilfsbezeichnung ausserhalb der Hero-Hauptachse

Nicht Ziel:
- ein bloss dekoratives Zahnrad ohne erkennbare Produktbedeutung

#### S3 Checkpoint B - Darstellung und Entwickler bleiben in einer Flaeche, aber nicht in einem Topf

Verbindliche Trennung:
- `Darstellung`
  - lokale Stilwahl
- `Entwickler`
  - Diagnose und Touchlog

Begruendung:
- gleicher Einstieg ist okay
- gleiche Bedeutung waere falsch

Zusatzvertrag:
- `Darstellung` darf in der ersten Ebene direkt sichtbar sein.
- `Entwickler` bleibt bewusst nachgeordnet:
  - visuell leiser
  - tiefer im Panel oder einklappbar
  - nicht als gleichrangige Alltagsoption neben Stilwahl

Nicht erlaubt:
- `No Cache Assets`
- `Touchlog`
- `Touchlog leeren`
- `Dev State zuruecksetzen`

als gleich prominente erste Utility-Aktionen fuer Alltagsnutzer.

Entscheidung:
- Ein gemeinsamer Einstieg bleibt erlaubt.
- Die erste lesbare Ebene innerhalb dieser Flaeche gehoert `Darstellung`.
- `Entwickler` folgt erst darunter oder hinter einer klaren Sektionstrennung.

#### S3 Checkpoint C - Der bestehende Diagnostics-Vertrag bleibt erhalten

Auch nach dem Umbau gilt:
- aktive Modi bleiben sichtbar
- Diagnostics bleiben lokal
- Touchlog bleibt Event-Trace
- Utilities werden nicht zur allgemeinen Produkt-Einstellungsseite

Entscheidung:
- Die heutige Diagnostics-Flaeche wird nicht fachlich aufgeloest.
- Sie wird nur anders eingestiegen und in eine alltagsnaehere Informationsarchitektur eingehaengt.

#### S3 Checkpoint D - Entwicklerzugang bleibt erreichbar, aber nicht alltagsgleich gewichtet

Der neue Utility-Einstieg muss zwei Ziele gleichzeitig erfuellen:
- Stilwahl fuer Alltagsnutzung legitim machen
- Entwicklerdiagnose weiter schnell erreichbar halten

Verbindlicher Schnitt:
- Diagnose wird nicht versteckt oder entfernt
- Diagnose wird aber auch nicht wie ein normaler Nutzer-Settings-Bereich inszeniert

Zielbild:
- ein gemeinsamer Einstieg ist erlaubt
- gleiche visuelle oder semantische Prioritaet ist nicht erlaubt

Entscheidung:
- Entwicklerzugang bleibt im selben Panel oder Sheet schnell erreichbar.
- Er wird aber nicht als eigene Home-Aktion, nicht als erste Utility-Sektion und nicht als gleichrangiger Nutzerbereich inszeniert.

#### S3 Checkpoint E - Utilities wird bewusst kein allgemeiner Settings-Sammelort

Verbindlicher Scope des sekundaeren Einstiegs:
- `Darstellung`
  - `Schriftstil`
  - `Artstil`
- `Entwickler`
  - aktive Modi
  - Diagnostics-Hebel
  - Touchlog
  - kleine Reset-/Clear-Hilfen

Bewusst nicht Teil dieses Einstiegs:
- Sync-Einstellungen fuer Nutzer
- Household-Verwaltung
- Konten, Profile oder Personenlogik
- allgemeine Produktpraeferenzen ohne klaren Bezug zu Darstellung oder Diagnose

Begruendung:
- Sonst kippt der kleine Utility-Einstieg schnell in einen generischen Settings-Bereich, den HESTIA nicht braucht.

#### S3 Checkpoint F - Schritt-Abnahme

Contract-Check:
- Der bisherige `Dev`-Entry ist als Home-Label fachlich abgeloest.
- Ein stiller Utility-Einstieg ist fuer Home entschieden.
- `Darstellung` und `Entwickler` sind innerhalb eines gemeinsamen Einstiegs klar getrennt.
- Entwicklerdiagnose bleibt erreichbar, aber bewusst nachgeordnet.
- Der sekundaere Einstieg bleibt eng und driftet nicht in allgemeine Settings.

Abnahme:
- `S3` ist fachlich abgeschlossen.
- Der Gesamtvertrag fuer Home und sekundaeren Einstieg ist damit vor `S4` voll staendig.

#### S3 Checkpoint G - Doku-Sync und Commit-Empfehlung

Doku-Sync:
- Die Roadmap enthaelt jetzt auch die finale Informationsarchitektur fuer den sekundaeren Einstieg.
- Modul-Doku muss erst mit `S4` nachgezogen werden, wenn der neue Einstieg auch im Repo sichtbar wird.

Commit-Empfehlung:
- `S3` muss nicht isoliert committed werden.
- Fachlich gehoert `S3` direkt zu `S4`, weil erst die Repo-Umsetzung den neuen Einstieg pruefbar macht.

### S4 - Repo-Umsetzung des finalen Hero-Hub- und Utility-Vertrags
- S4.1 Home-Markup auf den finalen Hero-Schnitt ziehen.
- S4.2 Home-CSS fuer die neue Intent-Hierarchie anpassen.
- S4.3 Falls beschlossen, kleine Symbole oder Kontextzeilen einfuehren.
- S4.4 Bisherigen `Dev`-Entry aus der Hero-Ebene entfernen und in den neuen Utility-Einstieg ueberfuehren.
- S4.5 Utilities-/Settings-Flaeche mit den Sektionen `Darstellung` und `Entwickler` umhaengen oder neu strukturieren.
- S4.6 Touchlog-/Diagnostics-Verdrahtung auf den neuen Einstieg nachziehen.
- S4.7 Schritt-Abnahme.
- S4.8 Doku-Sync.
- S4.9 Commit-Empfehlung.
- Output: Home und Utility-Einstieg folgen sichtbar dem finalen Vertrag.
- Exit-Kriterium: Home wirkt wie ein ruhiger Zwei-Intent-Hub, Utilities bleiben erreichbar aber sekundar.

#### S4 Checkpoint A - Home spricht jetzt klar zwei Intentionen

In der Repo-Umsetzung muss Home auf einen Blick zeigen:
- hier schreiben
- hier einkaufen

Nicht mehr:
- hier ist auch noch ein dritter fast gleichartiger Modus

Aktueller Repo-Stand nach `S4.1`:
- `index.html` traegt auf Home jetzt:
  - `div.home-hero`
  - `div.actions.home-intents`
  - zwei strukturierte `button.home-intent-card`
  - `div.home-utilities.home-utility-bar`
  - den bestehenden Toggle `#dev-panel-toggle` als kleinen Utility-Einstieg mit `aria-label="Optionen öffnen"`
- Die Router- und Touchlog-Hooks bleiben dabei unveraendert intakt.

Bewertung:
- Der markup-seitige Schnitt fuer den neuen Hero-Hub steht.
- Die sichtbare Hierarchie ist CSS-seitig noch nicht fertiggezogen; das ist bewusst Teil von `S4.2`.

Update nach `S4.2`:
- `app/styles/home.css` zieht den neuen Schnitt jetzt sichtbar nach:
  - `home-hero`
  - grosszuegigere Intent-Karten
  - ruhige Hint-Zeilen
  - separater Utility-Trigger in der oberen Ecke
- Der Home-Screen liest sich damit nicht mehr als drei Buttons im selben Stack.

#### S4 Checkpoint B - Utilities sind sichtbar, aber nicht primaer

Der Utility-Einstieg soll:
- schnell erreichbar sein
- klar als sekundar lesbar sein
- auf Desktop und Mobile funktionieren
- die Hero-Mitte nicht aufbrechen

#### S4 Checkpoint C - Utilities-Flaeche ist innen sauber getrennt

Nach `S4` muss die Flaeche sichtbar zwischen:
- `Darstellung`
- `Entwickler`

unterscheiden, auch wenn beides im selben Panel oder Sheet lebt.

### S5 - QA, Doku-Sync und Abschlussbewertung
- S5.1 Home-Smokechecks fuer Desktop und Mobile definieren und fahren.
- S5.2 Navigation zwischen Home, Writing, Shopping und Utilities regressionsseitig pruefen.
- S5.3 Stilwahl und Diagnostics-Zugang gegen ihre neue Informationsarchitektur pruefen.
- S5.4 Betroffene Modul-Doku und QA auf den finalen Vertrag ziehen.
- S5.5 Restrisiken fuer spaetere Home-Ausweitungen explizit notieren.
- S5.6 Schritt-Abnahme.
- S5.7 Doku-Sync.
- S5.8 Commit-Empfehlung.
- Output: dokumentierter und testbarer Hero-Hub fuer HESTIA.
- Exit-Kriterium: Home wirkt moderner und klarer, ohne HESTIA lauter oder komplexer zu machen.

#### S5 Checkpoint A - QA deckt die neuen Hierarchiefragen ab

Explizit pruefen:
- zwei Hero-Flaechen bleiben sofort lesbar
- Utility-Einstieg ist auffindbar, aber nicht dominant
- `Darstellung` und `Entwickler` sind im Utility-Bereich sauber getrennt
- Mobile Home bleibt ruhig und nicht gedrungen

#### S5 Checkpoint B - Doku spricht denselben Home-Vertrag

Nachzuziehen sind mindestens:
- `docs/modules/Home Module Overview.md`
- `docs/modules/Diagnostics Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/QA_CHECKS.md`
- `README.md` falls der Home-Einstieg dort kurz referenziert wird

#### S5 Checkpoint C - Guardrail fuer spaetere Home-Erweiterungen bleibt hart

Auch nach erfolgreichem Umbau gilt:
- Home ist kein Sammelort fuer jede neue Idee
- neue Startscreen-Inhalte brauchen einen klaren Kernfluss-Gewinn
- Utilities duerfen nicht schleichend zu einem zweiten Produktbereich anwachsen

## Smokechecks / Regression (Definition)
- Home zeigt genau zwei klar lesbare Hauptintentionen.
- Utilities/Settings sind erreichbar, ohne die Hero-Hierarchie zu zerstoeren.
- Stilwahl funktioniert weiterhin lokal und nachvollziehbar.
- Entwicklerhilfen und Touchlog bleiben erreichbar und funktional.
- Home bleibt auf Mobile und Desktop ruhig, klar und nicht dashboardig.

## Abnahmekriterien
- Home priorisiert `Schreiben` und `Einkaufen` sichtbar staerker als Utilities.
- Stilwahl und Entwicklerzugang sind innerhalb einer sauberen Informationsarchitektur getrennt.
- Das neue Home fuehlt sich moderner an, ohne HESTIA generischer oder lauter zu machen.
- Code, Doku und QA sprechen denselben Hero-Hub-Vertrag.
- HESTIA bleibt ein ruhiges Haushaltswerkzeug und kippt nicht in Produktivitaets-App-Sprache.

## Risiken
- Kacheln koennten HESTIA zu generisch oder zu app-store-artig wirken lassen, wenn Symbolik und Dichte zu stark werden.
- Ein schlecht benannter Utility-Einstieg koennte Nutzerlogik und Entwicklerlogik wieder vermischen.
- Zu viel Home-Kontext koennte den Startscreen schleichend in Richtung Dashboard ziehen.
- Wenn der neue Einstieg den Touchlog zu stark versteckt, leidet die Diagnosearbeit.
