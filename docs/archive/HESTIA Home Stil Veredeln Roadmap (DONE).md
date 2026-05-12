# HESTIA Roadmap 3 - Home und Stil veredeln (DONE)

## Ziel (klar und pruefbar)

Der Home-Hub soll sich wertiger, ruhiger und weniger nach Web-Card-Oberflaeche anfuehlen, ohne HESTIA in ein Dashboard, einen Organizer oder ein App-Portal umzubauen.

Pruefbare Zieldefinition:

- Home zeigt weiterhin genau zwei primaere Intentionen: `Schreiben` und `Einkaufen`.
- Die Home-Kacheln wirken mehr wie eine HESTIA-Einstiegstafel und weniger wie generische Web-Cards.
- Die grosse Flaeche wird bewusst gestaltet: ruhig, atmosphaerisch und nicht leer oder unfertig.
- Kleine Zustandsinformationen werden nur umgesetzt, wenn sie leise bleiben und den Start schneller oder klarer machen.
- Der Bridgerton-/Downton-Abbey-Charakter bleibt erkennbar und wird nicht durch generische SaaS-Optik ersetzt.
- `Darstellung & Diagnose` bleibt auffindbar, aber nicht gleichrangig mit den zwei Produktpfaden.
- Keine neue Fachlogik, kein Dashboard, keine Haushaltsperipherie und kein Einkaufsapp-Launcher werden eingefuehrt.

## Problemzusammenfassung

Roadmap 1 hat den Einkaufsmodus veredelt, Roadmap 2 hat Schreiben, Freigabe und Listenvertrauen beruhigt. Der naechste sichtbare Reibungspunkt ist der Home-Hub: Er ist atmosphaerisch stark und produktseitig richtig reduziert, kann aber stellenweise noch wie zwei moderne Web-Karten auf grosser Flaeche wirken. Die grosse Leere ist dabei nicht automatisch ein Fehler, sondern Teil der HESTIA-Ruhe. Diese Roadmap klaert deshalb, wie Home wertiger und absichtsvoller werden kann, ohne die Grenze zum Dashboard oder Familien-Organizer zu ueberschreiten.

## Scope

- Home-Hub:
  - visuelle Hierarchie der zwei Intent-Flaechen pruefen
  - Kacheln weniger generisch und mehr HESTIA-spezifisch wirken lassen
  - Home-Titel, Abstaende, Flaechenrhythmus und Fokuspunkt pruefen
  - Utility-Einstieg `Darstellung & Diagnose` optisch korrekt unterordnen
- Grosse Leere:
  - pruefen, ob sie bewusst atmosphaerisch genug wirkt
  - pruefen, ob subtile Struktur, Szene, Licht, Materialitaet oder Layout-Balance helfen
  - keine Flaeche fuellen, nur weil sie frei ist
- Leise Zustandsinformationen:
  - maximal kleine, ruhige Hinweise wie offene Eintraege pruefen
  - nur umsetzen, wenn sie den Home-Hub klarer machen und nicht dashboardartig wirken
  - keine Metriken, kein Verlauf, keine Activity- oder Familienuebersicht
- Stilvertrag:
  - Bridgerton-/Downton-Abbey-/HESTIA-Charakter schuetzen
  - App-Store-Wertigkeit herstellen, ohne den persoenlichen Stil wegzuglaetten
  - responsive Lesbarkeit und Touch-Flaechen pruefen
- Doku- und QA-Sync fuer Home, CSS und betroffene UI-Smokes.

## Not in Scope

- Kein Home-Dashboard.
- Kein Familien-Organizer.
- Keine Geburtstage, Familienhinweise, Muelltage oder Recyclinghof-Informationen.
- Kein Einkaufsapps- oder Loyalty-App-Launcher; das bleibt Roadmap 4.
- Keine Push-Notifications; Push bleibt Roadmap 5.
- Keine Realtime-Shopping-Collaboration; das bleibt Roadmap 6.
- Keine Kontextautomation oder Standortlogik.
- Keine Aenderung am Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart`.
- Keine Supabase-, SQL-, RLS-, Auth- oder Household-Key-Aenderung.
- Kein Service-Worker-, Manifest- oder Deployment-Umbau, ausser S1-S3 belegen einen engen visuellen/PWA-Bedarf.
- Keine neue Dependency, kein Build-Step, kein Framework.
- Keine Umgestaltung von Writing oder Shopping ausser sehr kleinen Navigations-/Status-Bezuegen, falls S1-S3 sie zwingend belegen.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`
- `app/core/router.js`
- `app/core/state.js`, nur falls ein leiser abgeleiteter Home-Hinweis geprueft wird
- `app/modules/home-scene.js`
- `app/diagnostics/ambient-touch.js`
- `app/styles/home.css`
- `app/styles/tokens.css`
- `app/styles/layout.css`
- `app/styles/ui.css`
- `app/styles/base.css`
- `app/styles/devtools.css`, nur falls Utility-Einstieg oder Panel-Hierarchie betroffen ist
- `manifest.webmanifest`, nur lesend fuer PWA-/Home-Kontext

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/QA_CHECKS.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/archive/HESTIA Einkaufsflow Veredeln Roadmap (DONE).md`
- `docs/archive/HESTIA Schreiben Speichern Listenvertrauen Roadmap (DONE).md`
- `docs/modules/Home Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/Diagnostics Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/modules/Bootflow Module Overview.md`

Regel:

- Erst README, PRODUCT und `docs/future roadmaps.md` lesen.
- Dann Roadmap 1 und Roadmap 2 DONE als aktuellen Produktstand lesen.
- Dann Home-, CSS-, Diagnostics-/Touchlog- und PWA-Overviews lesen.
- Dann erst `index.html`, `home.css`, `tokens.css`, `home-scene.js` und ggf. angrenzende UI-Dateien lesen.
- Erst nach S1-S3 Code aendern.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug fuer gemeinsame Einkaufslisten.
- Home bleibt Einstieg in genau zwei Kernintentionen: `Schreiben` und `Einkaufen`.
- Der Home-Hub wird nicht zum Dashboard, Cockpit oder Organizer.
- Leere darf bleiben, wenn sie bewusst und hochwertig wirkt.
- Flaeche wird nicht mit Status, Karten oder Funktionen gefuellt, nur weil sie vorhanden ist.
- Der persoenliche HESTIA-Stil bleibt sichtbar; Ziel ist Veredelung, nicht Neutralisierung.
- User-facing Copy bleibt knapp, ruhig und alltagstauglich.
- Utility-/Diagnostics-Zugang bleibt klein und sekundar.
- Mobile und Desktop muessen denselben ruhigen Einstieg behalten.
- Keine Feature-Drift in Roadmap 4 bis 8.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules ohne Build-Step.
- CSS bleibt ueber `app/app.css` und die bestehende Owner-Struktur organisiert.
- Home-spezifisches Styling gehoert nach `app/styles/home.css`.
- Globale Tokens gehoeren nur bei echtem wiederverwendbarem Stilbedarf nach `app/styles/tokens.css`.
- Globale UI-Patterns gehoeren nur bei echtem Pattern-Bedarf nach `app/styles/ui.css`.
- Home darf nicht still fachliche Listenlogik besitzen, ausser S1-S3 entscheiden bewusst eine kleine abgeleitete Anzeige.
- Falls Home minimale Listendaten liest, bleibt `state.items` Source of Truth und Home schreibt keine Listendaten.
- WebGL-/Atmosphaere darf den produktkritischen Boot nicht blockieren.
- PWA-/Service-Worker-Verhalten bleibt unveraendert, solange kein belegter Shell-Bedarf entsteht.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus, DONE-Roadmaps und betroffenen Codepfade.
- Aendern von:
  - `index.html`
  - `app/styles/home.css`
  - `app/styles/tokens.css`, nur fuer wiederverwendbare Stilwerte
  - `app/styles/ui.css`, nur fuer echte globale UI-Patterns
  - `app/styles/layout.css`, nur fuer belegten Screen-/Panel-Bedarf
  - `app/modules/home-scene.js`, nur fuer belegten atmosphaerischen Home-Bedarf
  - `app/diagnostics/ambient-touch.js`, nur falls Home-Touch-Feedback faktisch betroffen ist
  - `app/main.js`, `app/core/state.js` und `app/core/router.js`, nur wenn S1-S3 einen engen Home-Vertragsbedarf belegen
  - betroffene Module Overviews und `docs/QA_CHECKS.md`
- Lokale Checks:
  - `node --check` fuer geaenderte JS-Dateien
  - `git diff --check`
  - gezielte `rg`-Scans auf Scope-Drift oder alte Copy
  - lokaler HTTP-Smoke ueber `python -m http.server`
  - manueller oder Playwright-gestuetzter Browser-Smoke fuer Desktop/Mobile, falls sinnvoll

Forbidden:

- Neue Dependencies oder Build-Tools.
- Supabase-, SQL-, RLS-, Auth-, Household-Key- oder Runtime-Config-Umbau.
- Push-, Notification-, Reminder- oder Awareness-Logik.
- Einkaufsapps, Loyalty-Apps oder App-Launcher.
- Haushaltsperipherie wie Geburtstage, Familienhinweise, Muelltage oder Recyclinghof.
- Realtime-Shopping-Collaboration.
- Produktkatalog, Kategorien, Historie, Metriken oder Activity-Feed.
- Service-Worker-/Manifest-Umbau ohne belegten engen Bedarf.
- Writing- oder Shopping-Redesign unter dem Deckmantel von Home.
- Utility-/Diagnostics-Flaeche optisch zum dritten Kernmodus machen.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Detektivarbeit, Vertragsklaerung, Bruchrisiko-, UI-/Copy- und Contract Review.
- S4 ist die Umsetzung und wird in kleine Substeps geteilt.
- S5 prueft lokal moegliche Syntax-, Layout-, Browser-, Mobile- und Regression-Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnisprotokolle.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 12.05.2026

Review-Frage:

- Bleibt Roadmap 3 innerhalb des HESTIA-Produktvertrags, wenn sie Home-Kacheln, grosse Leere und Stilwertigkeit gemeinsam behandelt?

Entscheidung:

- Ja, wenn Roadmap 3 als Home- und Stil-Veredelung verstanden wird und nicht als Einstieg in Dashboard, Organizer, Einkaufsapps oder Haushaltsperipherie.

Findings:

- CR-F1: "Grosse Leere nutzen" kann faelschlich als Auftrag verstanden werden, Home mit weiteren Inhalten zu fuellen.
- CR-F2: Kleine Zustandsinformationen koennen schnell wie Dashboard-Metriken wirken, obwohl Home laut Produktvertrag kein Status-Cockpit ist.
- CR-F3: "Moderner App-Store-Look" koennte den bewusst persoenlichen Bridgerton-/Downton-Abbey-Stil zu stark neutralisieren.
- CR-F4: Home-Kacheln zu stark zu veredeln kann Writing/Einkaufen optisch wie Features in einem Portal statt wie zwei klare Kernwege wirken lassen.
- CR-F5: Eingriffe in `tokens.css` oder globale UI-Patterns koennen Writing und Shopping unbeabsichtigt veraendern.
- CR-F6: Atmosphaerische Arbeit an `home-scene.js` kann Boot, Performance oder PWA-Verhalten beruehren, obwohl Roadmap 3 kein Technikumbau sein soll.
- CR-F7: Der Utility-Einstieg darf durch bessere Gestaltung nicht zum dritten primaeren Pfad werden.

Korrekturen:

- Scope sagt explizit: Leere darf bleiben; Flaeche wird nur bewusst gestaltet und nicht automatisch gefuellt.
- Leise Zustandsinformationen sind nur Pruefoption, keine gesetzte Umsetzung.
- Not in Scope grenzt Dashboard, Organizer, Einkaufsapps, Haushaltsperipherie, Push und Realtime hart aus.
- Guardrails schuetzen den persoenlichen HESTIA-Stil vor generischer SaaS-Glattung.
- Architektur-Constraints binden CSS-Aenderungen an bestehende Owner-Dateien und verhindern globale Seiteneffekte.
- Tool Permissions erlauben Home-Scene-/Boot-nahe Aenderungen nur bei belegtem Bedarf.
- S1-S3 muessen vor S4 klaeren, ob kleine Home-Hinweise ueberhaupt sinnvoll sind.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System- und Vertragsdetektivarbeit | DONE | Home-, CSS-, Stil-, Utility-, Scene- und Layout-Vertraege gelesen; Ist-Zustand, Findings und Korrekturen dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Zielvertrag finalisiert: Home bleibt zwei Intent-Flaechen plus ruhige Atmosphaere; dynamische Home-Zustandsinfos werden fuer Roadmap 3 verworfen. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | Bruchrisiken, Copy-/Stilvertrag und konkreter S4-Schnitt finalisiert; Umsetzung bleibt Home/CSS-zentriert. |
| S4 | Umsetzung | DONE | S4.1 bis S4.7 abgeschlossen: Home wurde CSS-only veredelt, reviewt und ohne weitere Findings freigegeben. |
| S5 | Tests, Code Review und Contract Review | DONE | Lokale Checks, Browser-Smoke, Contract Review und Stephan-Live-Server-Abnahme abgeschlossen. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | Home/CSS/Diagnostics-Doku, QA, Future Roadmaps, Abschlussreview und Archiventscheidung abgeschlossen. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System- und Vertragsdetektivarbeit

Ziel:

- Bestehenden Home-, Stil-, Layout- und Utility-Vertrag verstehen.
- Klaeren, welche Schichten fuer Home wirklich betroffen sind.
- Noch keinen Code aendern, ausser diese Roadmap selbst wird aktualisiert.

Substeps:

- S1.1 README, `PRODUCT.md`, `docs/future roadmaps.md` und `docs/DEV_ENVIRONMENT.md` erneut lesen.
- S1.2 Roadmap 1 DONE und Roadmap 2 DONE als aktuellen Produktstand lesen.
- S1.3 Home, CSS, Diagnostics, Touchlog, PWA Install und Bootflow Module Overviews lesen.
- S1.4 Betroffene Codepfade lesen:
  - `index.html`
  - `app/styles/home.css`
  - `app/styles/tokens.css`
  - `app/styles/layout.css`
  - `app/styles/ui.css`
  - `app/modules/home-scene.js`
  - `app/diagnostics/ambient-touch.js`
  - ggf. `app/main.js`, `app/core/router.js`, `app/core/state.js`
- S1.5 Ist-Zustand dokumentieren:
  - Home-Hierarchie
  - Kachel-Layout und Trefferflaechen
  - grosse Leere / atmosphaerische Flaeche
  - Utility-Einstieg
  - mobile Home-Ansicht
  - Stil-/Token-Abhaengigkeiten
  - Performance-/Boot-/PWA-Beruehrung
- S1.6 Erste Findings und offene Fragen dokumentieren.
- S1.7 S1 Contract Review.
- S1.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Systemkarte fuer Home, Stil, grosse Leere und Utility-Einstieg.
- Relevante Dateien.
- Erste Findings fuer S2/S3.

Exit-Kriterium:

- Es ist klar, ob Roadmap 3 reine CSS-/HTML-Arbeit bleibt oder ob minimale JS-/State-Beruehrung fachlich noetig ist.

### S1 Ergebnisprotokoll 12.05.2026

#### S1.1 bis S1.4 Kontext, Doku und Codepfade

Umsetzung/Review:

- README, `PRODUCT.md`, `docs/future roadmaps.md` und `docs/DEV_ENVIRONMENT.md` wurden als aktueller Produkt- und Arbeitsvertrag herangezogen.
- Roadmap 1 DONE und Roadmap 2 DONE wurden als aktueller Produktstand eingeordnet: Shopping und Writing/Freigabe sind bereits poliert, Roadmap 3 darf diese Flows nicht erneut oeffnen.
- Home-, CSS-, Diagnostics-, Touchlog-, PWA-Install- und Bootflow-Overviews wurden fuer die Modulgrenzen geprueft.
- Gelesene Codepfade:
  - `index.html`
  - `app/styles/home.css`
  - `app/styles/tokens.css`
  - `app/styles/layout.css`
  - `app/styles/ui.css`
  - `app/styles/base.css`
  - `app/styles/devtools.css`
  - `app/modules/home-scene.js`
  - `app/diagnostics/ambient-touch.js`
  - `app/core/router.js`
  - `app/core/state.js`
  - `app/main.js`
  - `manifest.webmanifest`

Contract Review:

- Home ist aktuell fachlich sauber: genau zwei primaere Intent-Flaechen, kein eigener fachlicher Storage, kein Dashboard, kein Produktstatus-Cockpit.
- Der Utility-Einstieg ist technisch und visuell separat vom Home-Kern gehalten.
- Die WebGL-/Ambient-Schicht ist optional/degradierbar und darf in Roadmap 3 nicht zum produktkritischen Pfad werden.

Checks:

- `rg`-Scan auf Home-, Utility-, Scene- und Intent-Selektoren ausgefuehrt.
- `git status --short` geprueft; Roadmap 3 ist neu, weitere bestehende Aenderungen bleiben unangetastet.

Findings:

- S1-F1: Home rendert heute exakt zwei Intent-Buttons mit `data-nav="writing"` und `data-nav="shopping"`. Das bestaetigt den Produktvertrag.
- S1-F2: Die Home-Karten basieren stark auf dem globalen `.surface-button`-Muster. Dadurch entsteht ein wertiger, aber noch relativ generischer Card-/Button-Eindruck.
- S1-F3: Die Home-Flaeche ist durch zentrierte Hero-Position, grosse Canvas-/Ambient-Szene und absolute Utility-Schaltflaeche stark atmosphaerisch. Die Leere ist technisch bewusst angelegt, muss aber in S2/S3 gegen "leer" vs. "ruhig" bewertet werden.
- S1-F4: `Darstellung & Diagnose` ist als einzelner Gear-Button oben rechts geloest. Er bleibt klein, kann aber bei visueller Home-Veredelung leicht zu stark oder zu verloren wirken.
- S1-F5: Kleine Zustandsinformationen waeren aktuell keine reine CSS-Aenderung. Home liest heute keine Listendaten; ein Hinweis wie "1 Eintrag offen" wuerde mindestens `state.items`, Eventbindung und Renderlogik beruehren.
- S1-F6: `home-scene.js` ist bereits eine eigenstaendige atmosphaerische Schicht mit Three.js-Remote-Import, Motion-Respect, Qualitaetsprofil und Art-Style-Paletten. Aenderungen daran sind moeglich, aber riskanter als reine Home-CSS-Arbeit.
- S1-F7: Globale Tokens und `.surface-button` werden von Writing, Shopping und Devtools mitgenutzt. Roadmap 3 darf dort nur sehr gezielt eingreifen.
- S1-F8: Mobile Home-Regeln existieren bereits, muessen aber bei jeder visuellen Veredelung gegen lange Texte, Font-Presets und Touch-Flaechen geprueft werden.

Korrekturen:

- S2 muss explizit entscheiden, ob leise Zustandsinformationen den Nutzen rechtfertigen. Ohne klaren Nutzen bleiben sie aus S4 draussen.
- S4 sollte primaer mit `index.html` und `app/styles/home.css` rechnen. `tokens.css`, `ui.css`, `state.js`, `main.js` oder `home-scene.js` sind nur bei belegtem Bedarf erlaubt.
- S3 muss einen eigenen Mobile-/Font-Preset-Risikocheck aufnehmen, weil Home mehrere Font-Stile und grosse Titelvarianten traegt.
- S3 muss Utility-Fokusbalance bewerten: auffindbar, aber nicht dritter Kernpfad.
- S5 braucht echte Desktop-/Mobile-Sichtpruefung, weil die zentrale Frage visuelle Wertigkeit ist und nicht nur Syntax.

Restrisiko:

- Ohne Screenshot-/Browser-Smoke kann S1 nur den Vertrag und die Codeform bewerten, nicht die finale visuelle Wirkung. Diese Bewertung gehoert nach S4/S5.

#### S1.5 bis S1.8 Ist-Zustand, Contract Review und Abnahme

Umsetzung/Review:

- Ist-Zustand Home-Hierarchie:
  - `H.E.S.T.I.A.` als zentrierter Markentitel
  - zwei gestapelte Intent-Flaechen mit Icon, Titel und kurzer Hint-Zeile
  - Utility-Einstieg oben rechts
- Ist-Zustand Layout:
  - `.screen-home.is-active` zentriert den Home-Hero im Viewport
  - `.home-hero` begrenzt die Breite auf 620px
  - `.home-intents` nutzt volle Hero-Breite
  - Mobile Regeln reduzieren Padding, Kachelhoehe und Typografie
- Ist-Zustand Stil:
  - globale Blau-/Champagner-/Ivory-Tokens
  - Serif-/Script-nahe Font-Presets
  - Ambient-CSS plus optionale WebGL-Szene
  - `surface-button` als globaler materieller Button-/Card-Baustein

Contract Review:

- Roadmap 3 bleibt nach S1 innerhalb des HESTIA-Vertrags, wenn sie als visuelle Home-Veredelung behandelt wird.
- Es gibt nach S1 keinen belegten Bedarf fuer Supabase, Runtime Config, Service Worker, Manifest, Push, Shopping-Collaboration oder Haushaltsperipherie.
- Es gibt nach S1 keinen belegten Bedarf, Writing oder Shopping funktional zu veraendern.

Checks:

- Relevante Datei- und Selektorpfade wurden gelesen bzw. per `rg` verifiziert.
- PowerShell-Quoting-Fehler im ersten `rg`-Lauf wurde korrigiert und der Scan wiederholt.

Findings:

- S1-F9: Roadmap 3 kann sehr wahrscheinlich ohne Datenvertrag- oder Sync-Beruehrung umgesetzt werden.
- S1-F10: Falls Home-Hinweise spaeter doch kommen, muss der Vertrag lauten: abgeleitete, leise Anzeige, keine Home-Listenverwaltung und keine Schreiboperationen.
- S1-F11: Die zentrale Designfrage fuer S2/S3 ist nicht "mehr Inhalt", sondern "wirkt die vorhandene Reduktion absichtlich genug?".

Korrekturen:

- Statusmatrix fuer S1 auf `DONE` gesetzt.
- S2/S3 erhalten aus S1 klare Pflichtfragen:
  - Zustandsinfo erlauben oder verwerfen
  - reine Home-CSS-Arbeit priorisieren
  - Utility sekundar halten
  - globale Token-/Button-Seiteneffekte vermeiden
  - visuelle Browser-Smokes fest einplanen

Restrisiko:

- S1 hat bewusst noch keine visuelle Alternative entworfen. Das bleibt S2/S3-Vertrag und S4-Umsetzung vorbehalten.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Zielvertrag fuer Home-Veredelung finalisieren.
- Klaeren, ob kleine Home-Hinweise erlaubt, sinnvoll oder abzulehnen sind.
- Technische Grenzen fuer CSS, Scene und Layout festlegen.

Substeps:

- S2.1 Ziel gegen README- und PRODUCT-Guardrails pruefen.
- S2.2 Ziel gegen Home- und CSS-Module-Overviews pruefen.
- S2.3 Home-Kachel-Vertrag definieren:
  - weiterhin zwei primaere Intent-Flaechen
  - keine Portal- oder Dashboard-Anmutung
  - klare Touch-Flaechen
- S2.4 Vertrag fuer grosse Leere definieren:
  - bewusste Ruhe
  - keine Flaechenbefuellung ohne Nutzen
  - atmosphaerische Wertigkeit statt Informationsdichte
- S2.5 Vertrag fuer moegliche leise Zustandsinformationen definieren:
  - erlaubt oder verworfen
  - falls erlaubt: welche Quelle, welche Copy, welche Sichtbarkeit
- S2.6 CSS-/Scene-Constraints finalisieren.
- S2.7 Findings und Pflichtkorrekturen fuer S4 definieren.
- S2.8 Contract Review S2.
- S2.9 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Belastbarer Zielvertrag fuer Home und Stil.
- Explizite Abgrenzung zu Dashboard, Organizer und Roadmap 4 bis 8.
- Erste S4-Pflichtpunkte.

Exit-Kriterium:

- S4 kann starten, ohne dass offen ist, ob Home neue Inhalte anzeigen darf.

### S2 Ergebnisprotokoll 12.05.2026

#### S2.1 bis S2.4 Zielvertrag, Home-Kacheln und grosse Leere

Umsetzung/Review:

- README- und PRODUCT-Guardrails gegen Roadmap 3 geprueft.
- Home- und CSS-Module-Overviews gegen den S1-Ist-Zustand abgeglichen.
- Future-Roadmaps-Abgrenzung geprueft: Roadmap 3 endet vor Roadmap 4 Einkaufsapps, Roadmap 5 Push, Roadmap 6 Realtime und Roadmap 7 Haushaltsperipherie.

Finaler Zielvertrag:

- Home bleibt Einstieg, nicht Inhaltsseite.
- Home zeigt genau zwei primaere Intent-Flaechen:
  - `Schreiben`
  - `Einkaufen`
- Home darf wertiger, materieller und HESTIA-spezifischer wirken.
- Home darf nicht mehr Produktbereiche, Metriken, Statusgruppen oder allgemeine Haushaltsinformationen anzeigen.
- Die grosse Leere ist als Ruheflaeche erlaubt und soll ueber Komposition, Materialitaet, Licht und Rhythmus absichtsvoller wirken.
- Der Home-Hub darf eine Einstiegstafel werden, aber kein Portal.

Contract Review:

- Der Vertrag erfuellt PRODUCT-Frage 1 und 2: Er hilft der Orientierung in den gemeinsamen Einkaufsfluss und macht den Einstieg klarer, ohne neue Verwaltung zu erzeugen.
- Der Vertrag verletzt nicht die Home-Module-Abgrenzung: kein Status-Cockpit, kein Activity-Feed, keine dichte Haushaltsuebersicht.
- Der Vertrag respektiert CSS-Owner: primaer `home.css`, nur gezielt globale Owner.

Checks:

- Abgleich gegen `PRODUCT.md`: `Schreiben` und `Einkaufen` bleiben zwei Kernintentionen.
- Abgleich gegen `docs/modules/Home Module Overview.md`: Home bleibt ohne Fachlogik.
- Abgleich gegen `docs/modules/CSS Module Overview.md`: Styling bleibt owner-basiert.

Findings:

- S2-F1: Der groesste Nutzen liegt nicht in neuen Inhalten, sondern in besserer Hierarchie und staerkerer HESTIA-Materialitaet.
- S2-F2: Die bestehende Leere ist produktseitig richtig. S4 soll sie nicht fuellen, sondern rahmen.
- S2-F3: Die Karten duerfen weniger generisch werden, muessen aber weiterhin klar als zwei direkte Wege lesbar bleiben.
- S2-F4: Neue globale Stilwerte sind riskant, weil `surface-button`, Tokens und Schatten quer durch Writing, Shopping und Devtools genutzt werden.

Korrekturen:

- S4 wird auf Home-Hierarchie, Kachelmaterialitaet, Flaechenrhythmus, Utility-Unterordnung und Mobile-Feinschliff ausgerichtet.
- Globale Token-/UI-Aenderungen bleiben Ausnahme, nicht Standard.
- Die grosse Leere wird als bewusstes Gestaltungselement behandelt, nicht als Content-Luecke.

Restrisiko:

- "Wertiger" bleibt teilweise visuell subjektiv. S5 muss deshalb echte Desktop-/Mobile-Sichtpruefung durch Stephan enthalten.

#### S2.5 Leise Zustandsinformationen

Umsetzung/Review:

- S1-F5 wurde bewertet: Home liest aktuell keine Listendaten und besitzt keine fachliche Renderlogik.
- Ein Hinweis wie `1 Eintrag offen` wuerde `state.items`, Eventbindung und Home-Renderlogik beruehren.
- Gegen PRODUCT und Home-Overview geprueft, ob dieser Nutzen Roadmap 3 rechtfertigt.

Entscheidung:

- Dynamische Home-Zustandsinformationen werden fuer Roadmap 3 verworfen.
- Bestehende statische Hint-Copy innerhalb der zwei Intent-Karten darf in S3/S4 geprueft und veredelt werden.
- Keine Zaehlwerte, keine Sync-/Freigabe-Hinweise, keine offenen Items, keine Einkaufsstatus-Anzeige auf Home.

Contract Review:

- Diese Entscheidung schuetzt Home vor Dashboard-Drift.
- Sie haelt Home frei von fachlicher Listenlogik.
- Sie verhindert JS-/State-Beruehrung ohne starken Alltagsnutzen.

Checks:

- Abgleich gegen Future Roadmaps: "Kleine Zustandsinformationen wie 1 Eintrag offen koennten spaeter helfen" bleibt als Idee verstaendlich, wird aber fuer diese Roadmap bewusst nicht umgesetzt.

Findings:

- S2-F5: Der Nutzen eines Home-Zaehlers ist aktuell zu gering gegenueber dem Risiko, Home in Richtung Status-Cockpit zu schieben.
- S2-F6: Die vorhandene Kachel-Hint-Copy kann den Einstieg ausreichend klar machen, ohne dynamische Daten zu lesen.

Korrekturen:

- S4.4 wurde korrigiert: keine dynamische Home-Zustandsinformation, nur bestehende Hint-Copy pruefen.
- S3 muss Copy und Hierarchie so pruefen, dass Home ohne Zaehlstatus trotzdem klarer wirkt.

Restrisiko:

- Spaeter kann ein einzelner leiser Hinweis erneut diskutiert werden, wenn Home trotz visueller Veredelung unklar bleibt. Das waere dann eine neue bewusste Entscheidung, nicht Teil von Roadmap 3.

#### S2.6 bis S2.9 CSS-/Scene-Constraints, Findings und Abnahme

Umsetzung/Review:

- CSS-/Scene-Grenzen fuer S4 finalisiert.
- S4-Pflichtpunkte aus S1/S2 abgeleitet.

Finale technische Grenzen:

- Primaere Schreibflaeche fuer S4 ist `app/styles/home.css`.
- `index.html` darf fuer Home-Markup nur eng angepasst werden, wenn die Kachel-/Hero-Struktur es braucht.
- `app/styles/tokens.css` nur bei echtem wiederverwendbarem Stilwert.
- `app/styles/ui.css` nur bei echtem globalem Pattern-Bedarf.
- `app/modules/home-scene.js` bleibt in S4 standardmaessig unberuehrt; Aenderung nur, wenn S3 einen klaren Atmosphaere-/Performance-Befund liefert.
- `app/core/state.js`, `app/main.js` und `app/core/router.js` bleiben fuer S4 voraussichtlich unberuehrt.

S4-Pflichtpunkte:

- S4 muss die zwei Intent-Flaechen als Kern behalten.
- S4 muss den generischen `surface-button`-Eindruck auf Home gezielt reduzieren, ohne globale Buttons zu brechen.
- S4 muss die grosse Leere ueber Komposition und Materialitaet bewusster wirken lassen.
- S4 muss den Utility-Einstieg optisch sekundar halten.
- S4 muss alle Font-Presets und mobile Breiten mitdenken.
- S4 darf keine neuen Features, Statusanzeigen oder Haushaltsperipherie einfuehren.

Contract Review:

- S2 ist konsistent mit README, PRODUCT, Home Overview, CSS Overview und Future Roadmaps.
- Roadmap 3 bleibt nach S2 frei von Datenvertrag-, Sync-, PWA-, Push- und Organizer-Beruehrung.

Checks:

- Roadmap gegen S1-Findings geprueft.
- S4.4 an die S2-Entscheidung angepasst.

Findings:

- Kein P0/P1-Blocker offen.
- Kein Grundsatzkonflikt mit dem Produktvertrag offen.

Korrekturen:

- Statusmatrix fuer S2 auf `DONE` gesetzt.
- Dynamische Home-Zustandsinfos aus dem S4-Umsetzungsplan entfernt.

Restrisiko:

- S3 muss noch konkretisieren, wie weit Home-Markup veraendert werden darf, ohne Barrierefreiheit, Touch-Flaechen oder PWA-Hero-Verhalten zu verschlechtern.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Risiken finden, bevor Home visuell geaendert wird.
- User-Facing-Copy und Stilentscheidungen gegen HESTIA-Charakter pruefen.
- Konkrete S4-Substeps ableiten.

Substeps:

- S3.1 Bruchrisiken identifizieren:
  - Home wird versehentlich Dashboard
  - Kacheln werden zu laut oder zu generisch
  - grosse Leere wirkt leer statt bewusst
  - Utility-Einstieg wird zu dominant
  - mobile Ansicht verliert Fokus oder Text ueberlappt
  - globale Tokens veraendern Writing/Shopping unbeabsichtigt
  - Home-Scene belastet Boot oder wirkt instabil
- S3.2 User-Facing Copy Review:
  - Kacheltexte bleiben kurz und alltagstauglich
  - moegliche Hinweise bleiben leise und nicht metrisch
  - keine erklaerenden Featuretexte im Home-Hub
- S3.3 Visueller Stilreview:
  - HESTIA bleibt charaktervoll
  - keine SaaS-Kartenoptik
  - keine decorative orbs oder generische Gradient-Spielerei
  - Materialitaet und Ruhe statt Effekthascherei
- S3.4 Tooling und lokal moegliche Checks klaeren.
- S3.5 S4-Substeps konkretisieren.
- S3.6 Contract Review S3.
- S3.7 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Bruchrisiko-Liste.
- Home-Copy- und Stil-Vertrag.
- Konkreter Umsetzungsplan fuer S4.

Exit-Kriterium:

- S4 hat klare Substeps und bekannte Review-Kriterien fuer Desktop, Mobile und Stil.

### S3 Ergebnisprotokoll 12.05.2026

#### S3.1 Bruchrisiken

Umsetzung/Review:

- Home-Markup, `home.css`, bestehende QA-Checks und S1/S2-Ergebnisse gegen typische UI-/Scope-Brueche geprueft.
- Risiken nach Produktvertrag, CSS-Owner-Struktur, mobiler Nutzbarkeit und HESTIA-Stil bewertet.

Bruchrisiken:

- S3-R1: Home wird versehentlich Dashboard, wenn neue Informationen, Statuswerte oder Listenmetriken eingebaut werden.
- S3-R2: Home wird zu generisch, wenn die zwei Intent-Flaechen nur als modernere Cards poliert werden.
- S3-R3: Home wird zu laut, wenn Materialitaet, Glow, Schatten oder Kontrast staerker werden, ohne die ruhige Einstiegsfunktion zu schuetzen.
- S3-R4: Die grosse Leere wirkt unfertig, wenn der Hero nur mittig bleibt, ohne bewusstes Raumgefuehl oder klare Komposition.
- S3-R5: Die grosse Leere wirkt zu gefuellt, wenn sie mit weiteren Karten, Hinweisen oder dekorativen Effekten bespielt wird.
- S3-R6: Der Utility-Button kann entweder zu prominent wirken oder durch die Veredelung des Hero-Bereichs zu sehr verloren gehen.
- S3-R7: Font-Presets C, D und G koennen wegen groesserer Script-/Handschriftwirkung schneller Text- oder Hoehenprobleme erzeugen.
- S3-R8: Aenderungen an `tokens.css`, `.surface-button` oder globalen Schatten koennen Writing, Shopping und Devtools ungewollt veraendern.
- S3-R9: Aenderungen an `home-scene.js` koennen Performance, Motion-Verhalten oder Boot-Degradation beruehren und sind fuer Roadmap 3 nicht automatisch noetig.
- S3-R10: Mobile Home kann durch groessere Materialitaet, Rahmen oder Labels an vertikaler Ruhe verlieren.

Contract Review:

- Kein Risiko verlangt aktuell eine neue Funktion, einen neuen State-Vertrag oder eine Scene-Aenderung.
- Die Risiken sprechen fuer einen engen visuellen Schnitt: `home.css` zuerst, `index.html` nur bei Strukturbedarf, globale Dateien nur als Ausnahme.

Korrekturen:

- S4 bekommt einen eigenen Font-Preset-/Mobile-Feinschliff.
- S4 darf keine dynamischen Home-Daten einfuehren.
- S4 muss Utility-Unterordnung und Auffindbarkeit explizit pruefen.

Restrisiko:

- Die visuelle Balance kann erst im Browser final bewertet werden; S5 muss Desktop- und Mobile-Smokes enthalten.

#### S3.2 User-Facing Copy Review

Umsetzung/Review:

- Bestehende Home-Copy geprueft:
  - `Schreiben`
  - `Schnell etwas notieren`
  - `Einkaufen`
  - `Liste mitnehmen und abhaken`
  - `Darstellung und Diagnose oeffnen`

Copy-Vertrag:

- Die zwei Kacheltitel bleiben kurz und direkt.
- Hint-Copy darf helfen, aber nicht erklaeren, belehren oder Feature-Marketing werden.
- Keine Zaehler, keine Statuswerte, keine Sync-/Freigabe-Sprache, keine technische Copy auf Home.
- `Darstellung & Diagnose` bleibt als Utility klar benannt, aber nur ueber `aria-label`/Title oder kleinen Utility-Kontext sichtbar.
- Home braucht keine erklaerenden Texte wie "So funktioniert HESTIA".

Findings:

- S3-C1: Die aktuelle Hint-Copy ist alltagstauglich und darf bestehen bleiben.
- S3-C2: Falls S4 Kachelstruktur veraendert, darf die Copy hoechstens minimal gestrafft werden.
- S3-C3: Jede neue Home-Copy muss sofort gegen Dashboard- und Marketing-Gefuehl geprueft werden.

Korrekturen:

- S4.4 bleibt ein Copy-Review-Schritt, aber kein Feature-Schritt.
- S5 muss Home-Copy im realen Layout pruefen, nicht nur im Text.

Restrisiko:

- Unterschiedliche Font-Presets koennen dieselbe Copy unterschiedlich dominant wirken lassen.

#### S3.3 Visueller Stilreview

Umsetzung/Review:

- Bestehende Stilmittel bewertet: Serif-/Script-Fonts, Blau-/Champagner-Tokens, Ambient-Flows, WebGL-Raum, `surface-button`-Material, Icon-Linien.

Stilvertrag:

- HESTIA darf gehobener, ruhiger und materieller wirken.
- Die zwei Intent-Flaechen sollen eher wie eine HESTIA-Einstiegstafel wirken als wie generische App-Karten.
- Materialitaet darf aus Rahmen, Innenlicht, Textur, Rhythmus und Schatten entstehen.
- Keine decorative orbs, keine generische Gradient-Show, kein SaaS-Hero, kein Dashboard-Raster.
- Iconografie bleibt dezent und unterstuetzend; Icons werden nicht zum Hauptmotiv.
- Die bestehende Home-Szene bleibt der atmosphaerische Hintergrund, nicht ein interaktives Feature.

Findings:

- S3-S1: `home-intent-card` kann Home-spezifischer gestaltet werden, ohne `.surface-button` global zu veraendern.
- S3-S2: Eine dezente interne Struktur der Karten ist sinnvoller als neue externe Inhalte.
- S3-S3: Die grosse Flaeche sollte ueber Hero-Position, Breite, Abstaende und Kartenmaterialitaet wirken, nicht ueber weitere Module.
- S3-S4: `home-scene.js` bleibt fuer S4 standardmaessig tabu, weil CSS-/Kompositionsarbeit zuerst reicht.

Korrekturen:

- S4.1 fokussiert auf Home-Karten als Einstiegstafel.
- S4.2 fokussiert auf Komposition/Ruheflaeche statt Background-Technik.
- Globale Tokens bleiben nur bei echtem Bedarf Teil der Umsetzung.

Restrisiko:

- Zu wenig Veraenderung koennte die Roadmap kaum sichtbar machen; zu viel Veraenderung koennte den HESTIA-Stil ueberdrehen. S4 muss kleine, reviewbare Schritte behalten.

#### S3.4 bis S3.7 Tooling, S4-Plan, Contract Review und Abnahme

Tooling und Checks:

- Lokal moeglich:
  - `git diff --check`
  - `node --check`, falls JS geaendert wird
  - `rg`-Scans auf verbotene neue Home-Begriffe oder unerwuenschte dynamische Statuslogik
  - Browser-Smoke ueber lokalen HTTP-Server
  - optional Playwright-Screenshot-Smoke, falls visueller Vergleich gebraucht wird
- Manuell durch Stephan sinnvoll:
  - Live-Server-Desktop-Pruefung
  - Mobile-/Responsive-Pruefung
  - Font-/Artstil-Umschalter kurz pruefen

Finaler S4-Plan:

- S4.1 Home-Intent-Karten als HESTIA-Einstiegstafel veredeln.
  - Primaer `app/styles/home.css`
  - `index.html` nur bei engem Strukturbedarf
  - keine neuen Daten, keine neuen Bereiche
- S4.2 Home-Komposition und grosse Ruheflaeche bewusst justieren.
  - Hero-Abstaende, Breite, Rhythmus, Raumgefuehl
  - kein neuer Content
  - `home-scene.js` nur bei belegtem Befund
- S4.3 Utility-Einstieg sekundar und sauber erreichbar halten.
  - Gear bleibt Utility
  - nicht dritter Hauptpfad
  - Desktop/Mobile erreichbar
- S4.4 Bestehende Home-Hint-Copy pruefen und ruhig halten.
  - keine dynamischen Home-Zustandsinformationen
  - keine Zaehler, Sync- oder Statussprache
- S4.5 Mobile-/Font-Preset-/Responsive-Feinschliff.
  - keine Ueberlappung
  - stabile Touch-Flaechen
  - Titel/Karten bei Font-Sets C, D, G pruefen
- S4.6 Code Review, CSS-Owner-Review und Contract Review.
- S4.7 Korrektur der Findings.

Contract Review:

- S3 ist konsistent mit S2: Home bleibt Einstieg, nicht Inhalts- oder Statusseite.
- S3 gibt S4 klare Grenzen: keine dynamischen Daten, kein Dashboard, keine Roadmap-4-bis-8-Features.
- S3 schuetzt CSS-Owner: Home-spezifisch in `home.css`, globale Aenderungen nur begruendet.
- S3 schuetzt Produktstil: persoenliche HESTIA-Wertigkeit statt generischer App-Store-Neutralitaet.

Findings:

- Kein P0/P1-Blocker offen.
- S4 darf starten, sobald der Nutzer Coding freigibt.
- Der wahrscheinlichste Umsetzungsschnitt ist CSS-first mit optional kleiner HTML-Strukturkorrektur.

Korrekturen:

- Statusmatrix fuer S3 auf `DONE` gesetzt.
- S4-Substeps praezisiert.
- S4.4 explizit als Copy-Review ohne dynamische Zustandsinfos definiert.

Restrisiko:

- Finale Qualitaet ist stark visuell. Nach S4 muss Stephan per Live Server bestaetigen, ob es noch HESTIA bleibt und nicht nur "huebscher" wird.

## S4 - Umsetzung

Ziel:

- Home und Stil sequenziell veredeln.
- Nicht alle Ebenen gleichzeitig anfassen.
- Nach jedem Substep direkt pruefen und dokumentieren.

Vorgeschlagene Substeps:

- S4.1 Home-Intent-Karten als HESTIA-Einstiegstafel veredeln.
- S4.2 Home-Komposition und grosse Ruheflaeche bewusst justieren.
- S4.3 Utility-Einstieg sekundar und sauber erreichbar halten.
- S4.4 Bestehende Home-Hint-Copy pruefen und ruhig halten; keine dynamische Home-Zustandsinformation umsetzen.
- S4.5 Mobile-/Font-Preset-/Responsive-Feinschliff fuer Home.
- S4.6 Code Review, CSS-Owner-Review und Contract Review.
- S4.7 Korrektur der Findings.

Jeder S4-Substep dokumentiert:

- Umsetzung
- betroffene Dateien
- lokaler Check
- Contract Review
- Findings
- Korrekturen
- Restrisiken

Output:

- Implementierter Home-/Stil-Stand innerhalb der Roadmap-3-Grenzen.

Exit-Kriterium:

- Home wirkt wertiger und absichtsvoller, ohne neue Produktbereiche einzufuehren.

### S4 Ergebnisprotokoll

#### S4.1 Home-Intent-Karten als HESTIA-Einstiegstafel veredeln

Umsetzung:

- `app/styles/home.css` angepasst.
- Keine HTML-Struktur geaendert.
- Keine JS-, State-, Sync- oder Datenlogik beruehrt.
- Home-Karten bleiben zwei Buttons mit:
  - `data-nav="writing"`
  - `data-nav="shopping"`
- Die Karten haben jetzt home-spezifische Materialitaet:
  - dezente innere Kontur
  - seitliche Champagner-Linie
  - ruhigere mehrschichtige Flaeche
  - staerkere, aber kleine Icon-Medaillons
  - Hint-Copy optisch als unterstuetzende Zeile untergeordnet
- Die globale `.surface-button`-Definition wurde nicht veraendert.

Contract Review:

- S4.1 bleibt innerhalb des S3-Vertrags:
  - keine neuen Inhalte
  - keine dynamischen Zustandsinfos
  - kein Dashboard
  - kein Organizer
  - keine Roadmap-4-bis-8-Features
- CSS-Owner-Grenze eingehalten: Aenderung liegt nur in `app/styles/home.css`.
- Writing, Shopping, Devtools, Sync und PWA-Verhalten bleiben fachlich unberuehrt.

Checks:

- `git diff --check -- app/styles/home.css "docs/HESTIA Home Stil Veredeln Roadmap.md"`
- Scope-Scan auf Home-, State-, Sync- und Statusbegriffe gegen `app/styles/home.css`, `index.html`, `app/main.js` und `app/core/state.js`.
- Code Review gegen S3-Risiken:
  - kein neuer Content
  - keine State-Beruehrung
  - keine globale Token-/Button-Aenderung
  - keine Scene-Aenderung

Findings:

- S4.1-F1: Die neue Kartenmaterialitaet bleibt CSS-only und home-spezifisch.
- S4.1-F2: Der Scope-Scan zeigt erwartbare bestehende State-/Sync-Stellen ausserhalb der Home-Aenderung, aber keine neue Home-Statuslogik.
- S4.1-F3: Die finale Wirkung muss visuell im Browser geprueft werden; Syntax-/Diff-Checks koennen nur Strukturfehler ausschliessen.

Korrekturen:

- Keine Code-Korrektur nach Review notwendig.
- S4-Statusmatrix auf `IN_PROGRESS` gesetzt und S4.1 als abgeschlossen dokumentiert.

Restrisiko:

- Mobile und Font-Preset-Wirkung bleiben bis S4.5/S5 visuell zu pruefen.
- Falls die Karten im Live-Smoke zu dekorativ oder zu laut wirken, muss S4.7 die Materialitaet zuruecknehmen.

#### S4.2 Home-Komposition und grosse Ruheflaeche bewusst justieren

Umsetzung:

- `app/styles/home.css` angepasst.
- Keine HTML-Struktur geaendert.
- Keine JS-, State-, Sync-, Scene- oder Datenlogik beruehrt.
- Home-Komposition justiert:
  - Home-Screen-Padding oben und unten leicht erweitert
  - Hero-Breite von 620px auf 660px erweitert
  - Hero rhythmisch etwas nach oben gesetzt
  - Hero-Gap responsiv gemacht
  - Intent-Bereich leicht verbreitert und Zwischenraum erhoeht
  - leise horizontale Abschlusslinie unter dem Hero eingefuegt
- Mobile Komposition angepasst:
  - etwas mehr unterer Atemraum
  - schwaechere vertikale Verschiebung
  - kuerzere Abschlusslinie

Contract Review:

- S4.2 bleibt innerhalb des S3-Vertrags:
  - keine neuen Inhalte
  - keine Dashboard-Flaeche
  - keine dynamischen Zustandsinfos
  - keine Scene-Aenderung
  - keine globale Token-/UI-Aenderung
- Die grosse Leere wird nicht befuellt, sondern ueber Rhythmus und Komposition absichtsvoller gerahmt.

Checks:

- `git diff --check -- app/styles/home.css "docs/HESTIA Home Stil Veredeln Roadmap.md"`
- Scope-Scan auf verbotene neue Begriffe und unbeabsichtigte Status-/State-/Sync-Beruehrung.
- CSS Review gegen S3-Risiken:
  - keine decorative orbs
  - keine neuen Cards
  - keine neuen Home-Inhalte
  - keine `home-scene.js`-Aenderung

Findings:

- S4.2-F1: Die grosse Ruheflaeche wird nur durch Komposition, Abstand und eine dezente Linie veraendert.
- S4.2-F2: Der Scope-Scan zeigt nur bestehende Index-/App-Begriffe ausserhalb der Home-CSS-Aenderung.
- S4.2-F3: Die vertikale Verschiebung braucht Browser-Smoke, weil sie viewport- und Font-abhaengig wirken kann.

Korrekturen:

- Keine Code-Korrektur nach Review notwendig.

Restrisiko:

- Auf sehr kleinen Viewports oder mit grossen Font-Presets koennte der nach oben gesetzte Hero zu knapp wirken. Das wird in S4.5/S5 gezielt geprueft.
- Die Abschlusslinie kann im Live-Bild zu dekorativ wirken; falls ja, wird sie in S4.7 abgeschwaecht oder entfernt.

#### S4.3 Utility-Einstieg sekundar und sauber erreichbar halten

Umsetzung:

- `app/styles/home.css` angepasst.
- Keine HTML-Struktur geaendert.
- Keine JS-, State-, Sync- oder Datenlogik beruehrt.
- Utility-Button visuell untergeordnet:
  - kleinere Icon-Wirkung
  - weniger deckende Flaeche
  - weniger Schattenlast
  - gedimmte Standardfarbe
  - klarer Hover-/Focus-Zustand
- Mindest-Touchflaeche bleibt bei 44px.

Contract Review:

- S4.3 bleibt innerhalb des S3-Vertrags:
  - `Darstellung & Diagnose` bleibt erreichbar
  - Utility wird nicht dritter Hauptpfad
  - keine neue Utility-Copy im Home-Hero
  - kein Eingriff in das Touchlog-/Diagnostics-Panel selbst
- CSS-Owner-Grenze eingehalten: Aenderung liegt nur in `app/styles/home.css`.

Checks:

- `git diff --check -- app/styles/home.css "docs/HESTIA Home Stil Veredeln Roadmap.md"`
- Scope-Scan auf Home-Utility-, State-, Sync- und Statusbegriffe.
- Code Review gegen S3-R6:
  - Button bleibt auffindbar
  - Button wirkt sekundar
  - Touchflaeche bleibt brauchbar

Findings:

- S4.3-F1: Erste CSS-Fassung machte den Utility-Button visuell leiser, reduzierte die Touchflaeche aber auf 40-42px.
- S4.3-F2: 40-42px ist fuer einen mobilen Utility-Button zu knapp, auch wenn der Button sekundar bleiben soll.

Korrekturen:

- Mindestgroesse auf 44px fuer Desktop und Mobile gesetzt.
- Sekundarwirkung wird ueber Farbe, Deckkraft und Schatten erreicht statt ueber zu kleine Trefferflaeche.

Restrisiko:

- Im Live-Smoke muss geprueft werden, ob der Button auf dem helleren Artstil B noch sichtbar genug bleibt.

#### S4.4 Bestehende Home-Hint-Copy pruefen und ruhig halten

Umsetzung/Review:

- Bestehende Home-Copy erneut gegen S3-Copy-Vertrag geprueft:
  - `Schreiben`
  - `Schnell etwas notieren`
  - `Einkaufen`
  - `Liste mitnehmen und abhaken`
  - `Darstellung und Diagnose oeffnen`
- Keine UI-Copy in `index.html` geaendert.
- Keine dynamische Home-Zustandsinformation eingefuehrt.
- Keine neuen Labels, Zaehler, Statuswerte, Sync-/Freigabe-Sprache oder technischen Hinweise auf Home eingefuehrt.

Entscheidung:

- Die bestehende Copy bleibt unveraendert.
- Begruendung: Sie ist kurz, alltagstauglich, beschreibt die zwei Kernintentionen und erzeugt weder Dashboard- noch Marketing-Gefuehl.

Contract Review:

- S4.4 bleibt innerhalb des S2/S3-Vertrags:
  - Home bleibt Einstieg, nicht Statusseite
  - keine Zaehler
  - keine Sync-/Freigabe-Sprache
  - keine technische Copy im Home-Hub
  - Utility bleibt ueber `aria-label` und `title` klar benannt

Checks:

- `rg`-Scan auf bestehende Home-Copy und verbotene Copy-Richtungen in `index.html`, Roadmap, Future Roadmaps und QA.
- `git diff -- index.html app/styles/home.css` geprueft: keine `index.html`-Aenderung fuer S4.4.

Findings:

- S4.4-F1: Die bestehende Hint-Copy ist bereits ausreichend ruhig und klar.
- S4.4-F2: Jede alternative Copy waere entweder laenger, erklaerender oder naehme dem Home-Hub etwas von seiner Selbstverstaendlichkeit.
- S4.4-F3: Das erste `rg` hatte wieder ein Pfad-Quoting-Problem bei Dateien mit Leerzeichen; der Scan wurde mit korrekter Quotierung wiederholt.

Korrekturen:

- Keine Code-Korrektur notwendig.
- Keine Copy-Aenderung vorgenommen.

Restrisiko:

- Die Copy muss nach S4.5/S5 im echten Layout nochmals gegen Font-Presets geprueft werden, weil Typografie die Wirkung der unveraenderten Worte veraendern kann.

#### S4.5 Mobile-/Font-Preset-/Responsive-Feinschliff fuer Home

Umsetzung:

- `app/styles/home.css` angepasst.
- Keine HTML-Struktur geaendert.
- Keine JS-, State-, Sync-, Scene- oder Datenlogik beruehrt.
- Mobile Font-Preset-Korrektur ergaenzt:
  - `.home-title` erhaelt `max-width: 100%`
  - Font-Sets `c`, `d` und `g` werden auf Mobile kleiner begrenzt
- Ziel: Script-/Handschrift-Fonts duerfen den Hero nicht breiter als den Viewport machen.

Contract Review:

- S4.5 bleibt innerhalb des S3-Vertrags:
  - kein neuer Inhalt
  - keine neue Copy
  - keine Status-/State-Logik
  - keine globale Token-/Button-Aenderung
  - keine Scene-Aenderung
- Die Korrektur schuetzt Mobile-Layout und Font-Presets, ohne den Home-Vertrag zu erweitern.

Checks:

- Playwright-Layout-Smoke ueber lokalen HTTP-Server:
  - Viewports: Desktop 1366x768, Mobile 390x844, 360x640, 320x568
  - Font-Sets: `a`, `c`, `d`, `g`
  - geprueft: horizontaler Overflow, Hero/Title/Karten/Hints im Viewport, Utility-Touchflaeche mindestens 44px
- `git diff --check -- app/styles/home.css "docs/HESTIA Home Stil Veredeln Roadmap.md"`
- Scope-Scan auf Font-, Home-, State-, Status- und Sync-Begriffe.

Findings:

- S4.5-F1: Der erste Playwright-Lauf wurde durch einen Service-Worker-/PWA-Reload unterbrochen. Der Test wurde mit blockierten Service Workern und stabilisierter Messung wiederholt.
- S4.5-F2: Auf 320x568 mit Font-Set `c` war der `H.E.S.T.I.A.`-Titel zu breit. Dadurch wurden auch die Home-Karten ueber den Viewport hinausgezogen.
- S4.5-F3: Nach der mobilen Font-Korrektur besteht der Layout-Smoke fuer Desktop/Mobile und Font-Sets `a`, `c`, `d`, `g`.

Korrekturen:

- Mobile Fontgroesse fuer `html[data-font-set="c"]`, `d` und `g` reduziert.
- `max-width: 100%` fuer `.home-title` gesetzt.

Restrisiko:

- Der Playwright-Smoke prueft Geometrie, nicht Geschmack. Artstil B und die finale visuelle Wertigkeit muessen in S5 bzw. durch Stephan im Live Server bewertet werden.

#### S4.6 Code Review, CSS-Owner-Review und Contract Review

Review:

- Geaenderte Home-Implementierung gegen S2/S3-Vertrag geprueft.
- `app/styles/home.css` ist weiterhin der einzige Code-Owner fuer die Umsetzung.
- `index.html`, Navigation, Home-Copy, State, Sync, Service Worker, Supabase und Einkaufslogik bleiben fachlich unberuehrt.
- Home bleibt exakt:
  - ein Titel
  - zwei primaere Intent-Flaechen
  - ein sekundaerer Utility-Einstieg
  - atmosphaerische Ruheflaeche
- Keine Dashboard-, Organizer-, Push-, Realtime-, Einkaufsapp- oder Haushaltsperipherie-Funktion wurde eingefuehrt.

Checks:

- `git diff --check -- app/styles/home.css "docs/HESTIA Home Stil Veredeln Roadmap.md"`
- Scope-Scan auf Dashboard-, Status-, Sync-, Realtime-, Push-, Haushalts- und Einkaufsapp-Begriffe gegen `app/styles/home.css`, `index.html` und diese Roadmap.
- Playwright-Layout-Smoke ueber lokalen HTTP-Server:
  - Viewports: Desktop 1366x768, Mobile 390x844, 360x640, 320x568
  - Font-Sets: `a`, `c`, `d`, `g`
  - Art-Styles: `a`, `b`
  - geprueft: horizontaler Overflow, Hero/Title/Karten/Hints im Viewport, Utility-Touchflaeche mindestens 44px
- JS-Syntaxcheck nicht notwendig, weil S4 keine JS-Dateien geaendert hat.

Findings:

- S4.6-F1: Keine P0/P1-Findings im Code- oder Contract Review.
- S4.6-F2: Playwright-Smoke besteht fuer Desktop, Mobile, Font-Sets `a`, `c`, `d`, `g` und Art-Styles `a`, `b`.
- S4.6-F3: Der Scope-Scan zeigt nur erwartbare bestehende Begriffe in `index.html` und der Roadmap, aber keine neue Home-Status- oder State-Logik.
- S4.6-F4: Die Home-Veredelung bleibt absichtlich CSS-only und erweitert den Produktvertrag nicht.

Restrisiko:

- Finale Geschmacks-/Stimmigkeitsbewertung bleibt S5 und dem Live-Server-Smoke durch Stephan vorbehalten.

#### S4.7 Korrektur der Findings

Korrekturen:

- Keine weitere Code-Korrektur notwendig, weil S4.6 keine technischen oder vertraglichen Findings mit Korrekturbedarf gefunden hat.
- S4-Statusmatrix auf `DONE` gesetzt.

Abschluss:

- S4 ist abgeschlossen.
- Naechster sinnvoller Schritt ist S5 mit Tests, Code Review, Contract Review und Stephan-Smoke im Live Server.

## S5 - Tests, Code Review und Contract Review

Ziel:

- Alles pruefen, was lokal sinnvoll pruefbar ist.
- Browser-/Device-Smokes sauber definieren.
- Code und Roadmap gegen Guardrails reviewen.

Substeps:

- S5.1 `git diff --check` fuer geaenderte Dateien.
- S5.2 `node --check` fuer geaenderte JS-Dateien.
- S5.3 Desktop-Smoke:
  - Home startet
  - zwei primaere Intent-Flaechen sichtbar
  - Utility bleibt sekundar
  - keine Dashboard-Anmutung
- S5.4 Mobile-Smoke:
  - keine Textueberlappung
  - Intent-Flaechen bleiben gut tappbar
  - grosse Flaeche wirkt bewusst, nicht gebrochen
- S5.5 Regression:
  - Navigation nach `Schreiben` und `Einkaufen`
  - Diagnostics-Zugang
  - PWA-/Service-Worker-Basics, falls beruehrt
- S5.6 User-Facing Copy Review nach realem Smoke.
- S5.7 Code Review gegen CSS-Owner und Bruchrisiken.
- S5.8 Contract Review gegen README, PRODUCT, Future Roadmaps und Module Overviews.
- S5.9 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Gepruefter Home-/Stil-Stand.
- Klare Liste ausgefuehrter Checks.
- Klare Liste manueller Smokes fuer Stephan, falls lokale Automatisierung nicht reicht.

Exit-Kriterium:

- Alle lokal moeglichen Checks sind erledigt oder bewusst als nicht verfuegbar markiert.

### S5 Ergebnisprotokoll

#### S5.1 `git diff --check` fuer geaenderte Dateien

Umsetzung/Review:

- Geaenderte Dateien geprueft:
  - `PRODUCT.md`
  - `app/styles/home.css`
  - `docs/future roadmaps.md`
  - `docs/HESTIA Home Stil Veredeln Roadmap.md`

Checks:

- `git diff --check -- PRODUCT.md app/styles/home.css "docs/future roadmaps.md" "docs/HESTIA Home Stil Veredeln Roadmap.md"`

Findings:

- Keine Whitespace-/Patch-Fehler.
- Git meldet nur die bekannte lokale CRLF-Hinweiszeile fuer bereits geaenderte Dateien.

Korrekturen:

- Keine Korrektur notwendig.

#### S5.2 `node --check` fuer geaenderte JS-Dateien

Umsetzung/Review:

- S4 hat keine JS-Dateien geaendert.
- Zur Regression wurden die relevanten App-/Diagnostics-/PWA-JS-Dateien trotzdem syntaktisch geprueft.

Checks:

- `node --check app/main.js`
- `node --check app/core/router.js`
- `node --check app/core/touchlog.js`
- `node --check app/modules/writing.js`
- `node --check app/modules/shopping.js`
- `node --check app/modules/home-scene.js`
- `node --check app/diagnostics/font-presets.js`
- `node --check app/diagnostics/art-style-presets.js`
- `node --check app/diagnostics/dev-flags.js`
- `node --check sw.js`

Findings:

- Alle Syntaxchecks bestanden.

Korrekturen:

- Keine Korrektur notwendig.

#### S5.3 Desktop-Smoke

Umsetzung/Review:

- Playwright-Smoke ueber lokalen Python-HTTP-Server ausgefuehrt.
- Desktop-Viewport: 1366x768.
- Font-Sets: `a`, `c`, `d`, `g`.
- Art-Styles: `a`, `b`.

Checks:

- Home startet.
- Genau zwei Home-Intent-Flaechen sind sichtbar.
- Reihenfolge bleibt `Schreiben` vor `Einkaufen`.
- Hero, Titel, Karten, Hints und Utility liegen im Viewport.
- Kein horizontaler Overflow.
- Navigation nach `Schreiben` und `Einkaufen` funktioniert.
- Diagnostics-Zugang oeffnet das Panel.

Findings:

- Desktop-Smoke bestanden.

Korrekturen:

- Keine Korrektur notwendig.

#### S5.4 Mobile-Smoke

Umsetzung/Review:

- Playwright-Smoke ueber lokalen Python-HTTP-Server ausgefuehrt.
- Mobile-Viewports:
  - 390x844
  - 360x640
  - 320x568
- Font-Sets: `a`, `c`, `d`, `g`.
- Art-Styles: `a`, `b`.

Checks:

- Keine Text-/Kachelueberlappung in den geprueften Geometrien.
- Home-Intent-Flaechen bleiben im Viewport.
- Utility-Touchflaeche bleibt mindestens 44px.
- Kein horizontaler Overflow.
- Navigation und Diagnostics funktionieren auch mobil.

Findings:

- Mobile-Smoke bestanden.

Korrekturen:

- Keine Korrektur notwendig.

#### S5.5 Regression

Umsetzung/Review:

- Kleiner Writing-to-Shopping-Kernflow automatisiert geprueft.
- Service-Worker-Basisregistrierung in einem separaten Browser-Kontext geprueft.

Checks:

- Item `Milch` in `Schreiben` hinzugefuegt.
- Item erscheint in der offenen Liste.
- Wechsel nach `Einkaufen`.
- Item erscheint in der Einkaufsliste.
- Zeilentap markiert Item als im Wagen.
- `Liste abschliessen` wird danach aktiv.
- Service Worker API verfuegbar und Registrierung nach App-Load vorhanden.

Findings:

- Regression-Smoke bestanden.
- Tiefer Offline-Fallback-Smoke wurde nicht automatisiert, weil Roadmap 3 Service Worker, Manifest und Offline-Fallback nicht geaendert hat.

Korrekturen:

- Keine Korrektur notwendig.

#### S5.6 User-Facing Copy Review nach realem Smoke

Umsetzung/Review:

- Automatisiert geprueft:
  - Home zeigt weiter `Schreiben` und `Einkaufen`.
  - Home-Hints bleiben unveraendert.
  - Diagnostics-Label bleibt `Darstellung und Diagnose`.

Findings:

- Keine neue Copy eingefuehrt.
- Kein Hinweis auf Dashboard, Organizer, Sync, Push oder Einkaufsapps auf Home.

Offen:

- Finale Geschmacks-/Stimmigkeitspruefung im Live Server durch Stephan.

#### S5.7 Code Review gegen CSS-Owner und Bruchrisiken

Umsetzung/Review:

- `app/styles/home.css` gegen CSS-Owner-Vertrag und S3-Bruchrisiken geprueft.
- Keine globalen Token-, Layout-, UI-, Writing-, Shopping- oder Devtools-Owner geaendert.

Findings:

- Home-Veredelung bleibt CSS-only und home-spezifisch.
- Utility bleibt sekundar, aber erreichbar.
- Grosse Leere wird kompositorisch gefuehrt, nicht mit neuen Inhalten gefuellt.

Korrekturen:

- Keine Korrektur notwendig.

#### S5.8 Contract Review gegen README, PRODUCT, Future Roadmaps und Module Overviews

Umsetzung/Review:

- Geprueft gegen:
  - `README.md`
  - `PRODUCT.md`
  - `docs/future roadmaps.md`
  - `docs/DEV_ENVIRONMENT.md`
  - `docs/modules/Home Module Overview.md`
  - `docs/modules/CSS Module Overview.md`
  - `docs/modules/Diagnostics Module Overview.md`
  - `docs/QA_CHECKS.md`

Findings:

- Roadmap 3 bleibt innerhalb des Produktvertrags:
  - zwei Kernintentionen
  - kein Dashboard
  - kein Organizer
  - keine Einkaufsapps
  - kein Push
  - kein Realtime
  - keine Datenvertragsaenderung
- DEV_ENVIRONMENT wurde eingehalten:
  - kein Build-Step eingefuehrt
  - Playwright nur als globales Smoke-Werkzeug genutzt
  - keine Testdependencies ins Repo geschrieben
  - `npm.cmd` statt blockiertem `npm.ps1` verwendet

Korrekturen:

- Keine Korrektur notwendig.

#### S5.9 Schritt-Abnahme und Commit-Empfehlung

Status:

- Lokale S5-Checks sind abgeschlossen.
- Stephans Live-Server-Smoke ist abgeschlossen.

Live-Server-Abnahme durch Stephan:

- Home gefaellt Stephan und seiner Frau.
- Alles laedt.
- Home wirkt wertiger.
- S5 ist damit fachlich abgeschlossen.

Commit-Empfehlung:

- Commit erst nach S6-Doku-Sync und Archivierung sinnvoll.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Source-of-Truth-Dokus synchronisieren.
- QA aktualisieren.
- Roadmap final abschliessen.
- Commit- und Archiventscheidung dokumentieren.

Substeps:

- S6.1 `docs/modules/Home Module Overview.md` aktualisieren.
- S6.2 `docs/modules/CSS Module Overview.md` aktualisieren, falls CSS-Vertrag oder Owner-Grenzen betroffen sind.
- S6.3 `docs/modules/Diagnostics Module Overview.md` oder `Touchlog Module Overview.md` aktualisieren, falls Utility-/Diagnostics-Hierarchie betroffen ist.
- S6.4 `docs/QA_CHECKS.md` um neue Home-/Stil-/Mobile-Smokes erweitern.
- S6.5 `docs/future roadmaps.md` nach Abschluss mit `(DONE)` und Archivlink aktualisieren.
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

- Code, Doku, QA und Roadmap sprechen denselben finalen Home-/Stil-Vertrag.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll

#### S6.1 `docs/modules/Home Module Overview.md` aktualisieren

Umsetzung/Review:

- Home-UI-Vertrag aktualisiert:
  - Intent-Karten duerfen wertiger wirken.
  - Home bleibt reine Navigation in `Schreiben` und `Einkaufen`.
  - grosse Ruheflaeche ist bewusst und wird nicht automatisch befuellt.

Contract Review:

- Kein Dashboard-, Organizer- oder App-Portal-Vertrag eingefuehrt.

#### S6.2 `docs/modules/CSS Module Overview.md` aktualisieren

Umsetzung/Review:

- CSS-Owner-Vertrag ergaenzt:
  - Home-spezifische Materialitaet und Komposition gehoeren nach `app/styles/home.css`.
  - Globale Button-/Token-Vertraege bleiben unberuehrt.

Contract Review:

- CSS-Separation bleibt erhalten.
- Kein neues Design-System oder Build-Setup eingefuehrt.

#### S6.3 `docs/modules/Diagnostics Module Overview.md` aktualisieren

Umsetzung/Review:

- Diagnostics-Vertrag zum Home-Utility-Einstieg ergaenzt.
- Der Utility-Einstieg bleibt erreichbar, aber sekundar gegenueber `Schreiben` und `Einkaufen`.

Contract Review:

- Diagnostics bleibt lokaler Hilfsbereich und kein Produktfeature.

#### S6.4 `docs/QA_CHECKS.md` aktualisieren

Umsetzung/Review:

- QA um Roadmap-3-Smokes ergaenzt:
  - Home wirkt wertig und absichtsvoll.
  - grosse Home-Flaeche wirkt bewusst.
  - Mobile Home hat keine Titel-/Karten-/Hint-Ueberlappung.
  - relevante Schrift- und Artstile bleiben lesbar.
  - Home-Veredelung bleibt in `home.css` ohne globale Seiteneffekte.

Contract Review:

- QA bleibt Kernflow-orientiert und fuehrt keine neuen Featurepflichten ein.

#### S6.5 `docs/future roadmaps.md` nach Abschluss aktualisieren

Umsetzung/Review:

- Roadmap 3 auf `(DONE)` gesetzt.
- DONE-Status, Abschlussdatum und Archivlink ergaenzt.
- Punkte 8 und 9 auf den umgesetzten Roadmap-3-Stand umformuliert.

Contract Review:

- Future Roadmaps fuehren Roadmap 3 nicht mehr als offene Arbeit.
- Roadmap 4 bleibt naechster nicht abgeschlossener kernnaher Ausbaubereich.

#### S6.6 Roadmap mit Ergebnisprotokollen aktualisieren

Umsetzung/Review:

- S5 mit Stephan-Live-Server-Abnahme geschlossen.
- S6 Ergebnisprotokoll ergaenzt.
- Statusmatrix auf S5 `DONE` und S6 `DONE` gesetzt.

#### S6.7 Finaler Contract Review

Review:

- Roadmap vs. Code:
  - Code-Aenderung bleibt `app/styles/home.css`.
  - Keine JS-, State-, Sync-, PWA- oder Datenvertragsaenderung.
- Roadmap vs. Module Overviews:
  - Home, CSS und Diagnostics beschreiben denselben finalen Vertrag.
- Roadmap vs. README-/PRODUCT-Guardrails:
  - Home bleibt zwei Kernintentionen.
  - keine Dashboard-, Organizer-, Einkaufsapp-, Push- oder Realtime-Erweiterung.
- Roadmap vs. QA:
  - QA enthaelt die neuen Home-/Stil-/Mobile-Smokes.

Findings:

- Keine P0/P1-Findings.
- Keine Korrektur mit Codebedarf.

#### S6.8 Abschluss-Abnahme

Abnahme:

- Stephan hat S5 auf dem Live Server positiv getestet.
- Stephans Frau gefaellt der neue Stand.
- Roadmap-Ziel erreicht: Home wirkt wertiger und bleibt HESTIA.

#### S6.9 Commit-Empfehlung

Empfehlung:

- Commit nach Archivierung der Roadmap sinnvoll.
- Vorgeschlagener Commit-Text:

```text
docs: archive home style roadmap
```

Optional etwas sprechender:

```text
docs: close HESTIA home style roadmap
```

#### S6.10 Archiv-Entscheidung

Entscheidung:

- Diese Roadmap wird als abgeschlossen archiviert.
- Zielpfad:
  - `docs/archive/HESTIA Home Stil Veredeln Roadmap (DONE).md`

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
- Home wirkt ruhig und nicht wie ein Dashboard.
- Home-Kacheln sind auf Desktop und Mobile gut lesbar und tappbar.
- Grosse Leere wirkt bewusst, nicht unfertig.
- Utility-Einstieg bleibt auffindbar, aber sekundar.
- Navigation nach `Schreiben` und `Einkaufen` funktioniert.
- `Darstellung & Diagnose` oeffnet weiter korrekt.
- Writing- und Shopping-Screens werden durch globale Stil- oder Token-Aenderungen nicht sichtbar verschlechtert.
- Mobile Home-Ansicht hat keine Text- oder Kachelueberlappung.
- PWA-/Install-Banner-Verhalten bleibt unveraendert, sofern nicht explizit betroffen.

## Abnahmekriterien

- Home fuehlt sich wertiger und absichtsvoller an.
- Der persoenliche HESTIA-Stil bleibt erhalten.
- Keine neue Feature-Flaeche wurde eingefuehrt.
- Keine Dashboard-, Organizer- oder Portal-Anmutung ist entstanden.
- Die zwei Kernintentionen sind schneller und klarer erfassbar.
- Die grosse Flaeche wirkt als bewusste Ruhe.
- Betroffene Dokus und QA sind synchron.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `feat(home): refine hub style and intent hierarchy`
