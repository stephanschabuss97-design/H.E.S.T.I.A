# HESTIA Roadmap 4 - Kassa-Karussell und Shopping-Begleiter (DONE)

## Ziel (klar und pruefbar)

Der Einkaufsmodus soll direkt vor dem Bezahlen eine kleine, ruhige Hilfe fuer relevante Loyalty-/Haendler-Apps bekommen, ohne HESTIA in ein App-Portal, einen Launcher oder ein konfigurierbares Shopping-Cockpit umzubauen.

Pruefbare Zieldefinition:

- Im Einkaufsmodus erscheint unterhalb von `Liste abschliessen` und `Aendern` ein kleines Kassa-Karussell.
- Das Karussell zeigt genau vier feste Symbole:
  - `jö`
  - `MPREIS`
  - `HOFER`
  - `SPAR`
- Die Symbole oeffnen robuste Google-Play-Detailseiten, deren finale URLs in S1 verifiziert wurden.
- Keine App-Installation wird erkannt oder angezeigt.
- Keine Android-App-Picker-, Deep-Link-, Intent- oder Standortlogik wird als V1-Kern eingefuehrt.
- Kein `+`, kein `i`, kein Konfigurationsscreen und kein Status wie `installiert`.
- Das Karussell bleibt visuell sekundar: eine kleine Kassahilfe, keine neue Shopping-Hauptsektion.
- Der Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart` bleibt unveraendert.

## Problemzusammenfassung

Roadmap 1 hat den Einkaufsflow ergonomischer gemacht, Roadmap 2 hat Schreiben und Listenvertrauen beruhigt, Roadmap 3 hat Home und Stil veredelt. Der naechste Shopping-nahe Reibungspunkt liegt nicht in der Liste selbst, sondern im Kassamoment: Wenn alles im Wagen liegt, braucht man oft noch eine Haendler- oder Loyalty-App. HESTIA soll diesen Moment unterstuetzen, aber nicht versuchen, Android-Apps zu erkennen, installierte Apps zu scannen oder einen neuen App-Launcher zu bauen. Die pragmatische V1-Loesung ist deshalb ein kleines, festes Kassa-Karussell mit vier kuratierten Play-Store-Links.

## Scope

- Shopping-Screen:
  - kleines Kassa-Karussell unterhalb der bestehenden Shopping-Actions platzieren
  - `Liste abschliessen` und `Aendern` als primaere Listenaktionen unveraendert lassen
  - Kassasymbole optisch sekundar halten
  - Mobile-Touchflaechen und horizontales Wischen pruefen
- Kassa-Quicklinks:
  - vier feste Eintraege fuer `joe`, `MPREIS`, `HOFER`, `SPAR`
  - Google-Play-Links als robuste V1-Ziele verwenden
  - Linkziele in einer klaren lokalen Struktur halten
  - keine Nutzerkonfiguration in V1
- Karussell-Verhalten:
  - kleine Symbolleiste statt grosser Kacheln
  - horizontal nutzbar, ohne die Liste zu verdraengen
  - keine Scrollposition oder zuletzt sichtbares Symbol in V1 merken
  - keine Statuslogik aus UI-Position ableiten
- Doku und QA:
  - Shopping Module Overview aktualisieren
  - CSS Module Overview aktualisieren, falls neuer Shopping-Owner-Schnitt entsteht
  - QA um Kassa-Karussell-Smokes erweitern
  - Future Roadmaps nach Abschluss synchronisieren

## Not in Scope

- Keine automatische App-Erkennung.
- Keine Abfrage installierter Apps.
- Keine Android-App-Picker-Integration.
- Keine Deep-Link- oder Intent-Link-Pflege als V1-Kern.
- Kein `+` zum Hinzufuegen eigener Apps.
- Kein `i` oder eigener Erklaer-/Verwaltungsbereich.
- Kein Konfigurationsscreen.
- Kein Installationsstatus wie `installiert`, `oeffnen` oder `installieren`.
- Keine Standortlogik oder marktbasierte Sortierung.
- Kein Angebotsfeed, Produktvergleich, Rabatt-Cockpit oder allgemeines App-Portal.
- Keine Aenderung am Datenvertrag `id`, `name`, `quantity`, `unit`, `inCart`.
- Keine Supabase-, SQL-, RLS-, Auth-, Household-Key- oder Runtime-Config-Aenderung.
- Keine Push-, Reminder- oder Notification-Logik.
- Keine neue Dependency, kein Build-Step, kein Framework.
- Keine Umgestaltung von Home oder Writing.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`, falls lokales Karussell-Modul initialisiert wird
- `app/modules/kassa-carousel.js`, falls fluechtiger Fokus-/Swipe-State umgesetzt wird
- `app/modules/shopping.js`, nur lesend zur Abgrenzung der bestehenden Listenlogik
- `app/core/router.js`, nur falls Linkverhalten mit Navigation kollidiert
- `app/core/state.js`, nur lesend zur Abgrenzung
- `app/styles/shopping.css`
- `app/styles/ui.css`
- `app/styles/layout.css`
- `app/styles/pwa.css`, nur lesend fuer externe Link-/PWA-Kontextfragen
- `sw.js`, nur fuer PWA-/Navigation-Fallback-Verstaendnis und ggf. Cache-Referenz auf neues JS-Modul

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/QA_CHECKS.md`
- `docs/archive/HESTIA Einkaufsflow Veredeln Roadmap (DONE).md`
- `docs/archive/HESTIA Schreiben Speichern Listenvertrauen Roadmap (DONE).md`
- `docs/archive/HESTIA Home Stil Veredeln Roadmap (DONE).md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/Kassa Carousel Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- MIDAS-Referenz: MIDAS Hub Module Overview.

Regel:

- Erst README, PRODUCT, `docs/future roadmaps.md` und `docs/DEV_ENVIRONMENT.md` lesen.
- Dann Roadmap 1 bis 3 DONE als aktuellen Produktstand lesen.
- Dann Shopping-, CSS-, Touchlog-/PWA- und QA-Dokus lesen.
- Dann MIDAS-Hub-Referenz lesen und bewusst kleiner auf HESTIA uebersetzen.
- Dann erst Code lesen.
- Erst nach S1-S3 Code aendern.

## Kassa-Link-Kandidaten

Die V1 soll mit robusten Google-Play-Zielen starten. S1 hat stabile App-Detailseiten als bessere V1-Ziele gegenueber Suchlinks bestaetigt.

| Symbol | Kandidat | V1-Linkquelle |
| --- | --- | --- |
| `jö` | jö Bonus Club | `https://play.google.com/store/apps/details?id=at.joeclub.app.joecard` |
| `MPREIS` | MPREIS | `https://play.google.com/store/apps/details?id=at.mpreis.app` |
| `HOFER` | HOFER. Da bin ich mir sicher. | `https://play.google.com/store/apps/details?id=de.apptiv.business.android.aldi_at` |
| `SPAR` | SPAR | `https://play.google.com/store/apps/details?id=at.spar.app` |

Link-Regel:

- V1 verspricht nur: Symbol oeffnet das hinterlegte Google-Play-Ziel.
- Wenn Android/Play Store danach `Oeffnen` oder `Installieren` anbietet, ist das Plattformverhalten und kein HESTIA-Status.
- HESTIA zeigt keinen Installationszustand und wertet keinen Ruecksprung aus.

## Guardrails

- HESTIA bleibt ein ruhiges Haushaltswerkzeug fuer gemeinsame Einkaufslisten.
- `Schreiben` und `Einkaufen` bleiben die zwei Kernintentionen.
- Der Einkaufsmodus bleibt Liste zuerst, Kassa-Hilfe danach.
- `Liste abschliessen` und `Aendern` bleiben fachlich wichtiger als das Karussell.
- Das Karussell darf nicht nach App-Portal, Marktplatz oder Dashboard aussehen.
- Die vier Symbole sind kuratierte Kassahilfen, keine frei wachsende App-Sammlung.
- Externe Links brauchen einen bewussten Nutzerimpuls.
- User-facing Copy bleibt minimal; idealerweise erklaert die UI sich ueber Symbol, Titel/ARIA und Position.
- Mobile Bedienbarkeit ist wichtiger als dekorative Symbolwirkung.
- Keine technische Magie vortaeuschen: keine App-Erkennung, keine Deep-Link-Garantie.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules ohne Build-Step.
- Shopping-spezifische Karussell-Struktur gehoert in V1 primaer nach `index.html`, `app/modules/kassa-carousel.js`, `app/main.js` und `app/styles/shopping.css`.
- Globale Button-/Link-Muster nur bei echtem wiederverwendbarem Bedarf nach `app/styles/ui.css`.
- Das Karussell darf den Listen-State nicht lesen oder schreiben.
- Der aktive Karussell-Index darf nur als fluechtiger UI-State im Modul-Scope leben.
- Keine Persistenz fuer aktives Symbol, keine Scrollposition, kein `localStorage`, kein `sessionStorage`.
- Keine Supabase- oder Household-Sync-Beruehrung.
- Externe Links muessen PWA-/Browser-konform bleiben und duerfen die App-Shell nicht blockieren.
- MIDAS-Carousel ist Referenz fuer Fokuswechsel, Swipe-Gefuehl, Enter-/Exit-Bewegung und klare aktive Mitte; HESTIA uebersetzt das bewusst kleiner und kassanah.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus, DONE-Roadmaps, MIDAS-Hub-Referenz und betroffenen Codepfade.
- Aendern von:
  - `index.html`
  - `app/main.js`, nur zum Initialisieren des lokalen Kassa-Carousel-Moduls
  - `app/modules/kassa-carousel.js`, nur fuer fluechtigen UI-State, Swipe/Keyboard und ARIA-Sync
  - `app/styles/shopping.css`
  - `app/styles/ui.css`, nur fuer belegte globale Link-/Iconbutton-Muster
  - `app/styles/layout.css`, nur fuer belegten Panel-/Action-Layout-Bedarf
  - `sw.js`, nur falls ein neues JS-Modul fuer Offline/PWA-Cache referenziert werden muss
  - betroffene Module Overviews und `docs/QA_CHECKS.md`
  - `docs/future roadmaps.md` beim Abschluss
- Lokale Checks:
  - `node --check` fuer geaenderte JS-Dateien
  - `git diff --check`
  - gezielte `rg`-Scans auf Scope-Drift und Linkziele
  - lokaler HTTP-Smoke ueber `python -m http.server`
  - Playwright- oder manueller Browser-Smoke fuer Desktop/Mobile, falls sinnvoll
  - manueller Android-/PWA-Link-Smoke durch Stephan fuer die vier Play-Store-Ziele

Forbidden:

- Neue Dependencies oder Build-Tools.
- App-Erkennung, Package-Scan, Android-App-Picker oder native Bridge.
- Deep-Link-/Intent-Link-Vertrag als V1-Kern.
- Standort-, Geolocation- oder Marktnaehe-Logik.
- Push-, Reminder- oder Notification-Funktionen.
- Supabase-, SQL-, RLS-, Auth-, Household-Key- oder Runtime-Config-Umbau.
- Home- oder Writing-Redesign.
- Angebotsfeed, Produktvergleich, Marktplatz oder Loyalty-Statusmaschine.
- Frei konfigurierbarer App-Launcher.
- Bestehende Shopping-Abschluss- oder Listenloeschlogik still umdeuten.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Detektivarbeit, Vertragsklaerung, Bruchrisiko-, UI-/Copy- und Contract Review.
- S4 ist die Umsetzung und wird in kleine Substeps geteilt.
- S5 prueft lokal moegliche Syntax-, Layout-, Browser-, Mobile-, Link- und Regression-Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnisprotokolle.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 12.05.2026

Review-Frage:

- Bleibt Roadmap 4 innerhalb des HESTIA-Produktvertrags, wenn sie vier feste Loyalty-/Haendler-Quicklinks im Einkaufsmodus einbaut?

Entscheidung:

- Ja, wenn Roadmap 4 strikt als kleines Kassa-Karussell direkt im Shopping-Flow behandelt wird und keine App-Erkennung, keine Konfiguration, keine Deep-Link-Pflege und kein App-Portal einfuehrt.

Findings:

- CR-F1: "Einkaufsapps" kann als allgemeiner App-Launcher oder Portal missverstanden werden.
- CR-F2: Ein Karussell kann visuell zu prominent werden und die Shopping-Actions ueberholen.
- CR-F3: Deep Links waeren eleganter, erzeugen fuer vier Apps aber zu viel technische Schuld.
- CR-F4: Play-Store-Links koennen wie Installationsfeature wirken, obwohl HESTIA keinen Installationsstatus kennt.
- CR-F5: Ein `+`, `i` oder Konfigurationsscreen wuerde Roadmap 4 sofort in Verwaltung und App-Sammlung ziehen.
- CR-F6: Scrollposition merken kann harmlos sein, darf aber nicht zu Statuslogik oder Personalisierungspflicht werden.
- CR-F7: MIDAS-Carousel darf nicht als Architekturvorlage missverstanden werden; HESTIA braucht nur ein kleines UI-Muster.
- CR-F8: Externe Links koennen PWA-/Mobile-Smokes erfordern, weil Verhalten je nach Geraet/Browser unterschiedlich ist.

Korrekturen:

- Scope nennt explizit Kassa-Karussell unterhalb der Shopping-Actions.
- Not in Scope grenzt App-Erkennung, Deep Links, `+`, `i`, Konfiguration, Standort und Portal-Logik hart aus.
- Guardrails sagen: Liste zuerst, Kassa-Hilfe danach.
- Link-Regel verspricht nur das Oeffnen verifizierter Google-Play-Ziele.
- MIDAS wird als visuelle/technische Referenz genannt, aber bewusst kleiner uebersetzt.
- Scrollposition wurde nach S1/S2 fuer V1 verworfen, damit das Feature ohne lokale UI-Persistenz klein bleibt.
- S5 verlangt neben lokalen Smokes auch einen manuellen Android-/PWA-Link-Smoke durch Stephan.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System- und Vertragsdetektivarbeit | DONE | Shopping-, Link-, Carousel-, PWA- und CSS-Vertraege gelesen; Detailseiten-Links und Ist-Zustand dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Zielvertrag nach S4.4 korrigiert: kleine Kassahilfe mit Play-Store-Links, fluechtigem UI-State und ohne Storage-/Listen-/App-Erkennung. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | UI-, Copy-, Accessibility- und Linkvertrag bestaetigt; S4-Schnitt nach S4.4 auf HESTIA-Mini-Fokus-Karussell erweitert. |
| S4 | Umsetzung | DONE | S4.1-S4.9 abgeschlossen: Kassa-Karussell steht als kleines HESTIA-Mini-Fokus-Karussell mit statischen Google-Play-Links, fluechtigem UI-State und finalem Code-/Contract-Review. |
| S5 | Tests, Code Review und Contract Review | DONE | Lokale Desktop-/Mobile-/Link-/Regression-Smokes bestanden; Stephan hat Live-Server-Smoke bestaetigt. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | Module Overviews, QA, Future Roadmaps und Roadmap final synchronisiert; Roadmap ist archiviert. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System- und Vertragsdetektivarbeit

Ziel:

- Bestehenden Shopping-, Actions-, CSS-, Link- und PWA-Kontext verstehen.
- Klaeren, welche Schichten fuer ein kleines Kassa-Karussell wirklich betroffen sind.
- Noch keinen Code aendern, ausser diese Roadmap selbst wird aktualisiert.

Substeps:

- S1.1 README, `PRODUCT.md`, `docs/future roadmaps.md` und `docs/DEV_ENVIRONMENT.md` erneut lesen.
- S1.2 Roadmap 1 bis 3 DONE als aktuellen Produktstand lesen.
- S1.3 Shopping, CSS, Touchlog, PWA Install und QA Module/Dokus lesen.
- S1.4 MIDAS-Hub-Referenz lesen und nur die passende Carousel-Idee extrahieren.
- S1.5 Betroffene Codepfade lesen:
  - `index.html`
  - `app/modules/shopping.js`
  - `app/styles/shopping.css`
  - `app/styles/ui.css`
  - `app/styles/layout.css`
  - ggf. `sw.js` und `app/styles/pwa.css` nur lesend
- S1.6 Link-Kandidaten pruefen:
  - Suchlinks vs. stabile Play-Store-Detailseiten
  - Desktop-/Mobile-Erwartung
  - PWA-/neuer-Tab-Verhalten
- S1.7 Ist-Zustand dokumentieren:
  - Shopping-Actions
  - Platz unter den Actions
  - Mobile Hoehe und Scrollverhalten
  - vorhandene Button-/Icon-/Linkmuster
  - externe Link-Patterns im Repo
  - Risiken fuer Listen- und Abschlusslogik
- S1.8 Erste Findings und offene Fragen dokumentieren.
- S1.9 S1 Contract Review.
- S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Systemkarte fuer Shopping-Actions, Kassa-Platzierung, Linkziele und Carousel-Umsetzung.
- Relevante Dateien.
- Erste Findings fuer S2/S3.

Exit-Kriterium:

- Es ist klar, ob Roadmap 4 reine HTML/CSS-Arbeit bleibt oder ob kleine JS-Arbeit fuer Linkdaten/Scrollposition sinnvoll ist.

### S1 Ergebnisprotokoll 13.05.2026

#### S1.1 bis S1.5 Kontext, Doku und Codepfade

Umsetzung/Review:

- Gelesen:
  - `README.md`
  - `PRODUCT.md`
  - `docs/future roadmaps.md`
  - `docs/DEV_ENVIRONMENT.md`
  - `docs/HESTIA Kassa Karussell Roadmap.md`
  - `docs/modules/Shopping Module Overview.md`
  - `docs/modules/CSS Module Overview.md`
  - `docs/modules/Touchlog Module Overview.md`
  - `docs/modules/PWA Install Module Overview.md`
  - `docs/QA_CHECKS.md`
  - MIDAS Hub Module Overview als Referenz
- `.env.supabase.local` nur auf Variablennamen geprueft, keine Werte ausgegeben.
- Gelesene Codepfade:
  - `index.html`
  - `app/modules/shopping.js`
  - `app/styles/shopping.css`
  - `app/styles/ui.css`
  - `app/styles/layout.css`
  - `app/styles/pwa.css`
  - `sw.js`
- `rg`-Scan auf bestehende externe Linkmuster im Repo ausgefuehrt.

Findings:

- S1-F1: Shopping hat aktuell genau eine Panel-Struktur mit Liste und darunter `.row-actions.shopping-actions`; das ist der richtige Einbaupunkt fuer das Kassa-Karussell.
- S1-F2: `Liste abschliessen` und `Aendern` sind bereits sauber als primaere bzw. sekundaere Shopping-Aktion getrennt. Das Karussell muss darunter liegen und darf diese Hierarchie nicht aufbrechen.
- S1-F3: `shopping.js` rendert aktuell nur die Liste dynamisch; die Actions sind statisch in `index.html`. Ein statisches Karussell kann wahrscheinlich ohne Listen-State-Beruehrung umgesetzt werden.
- S1-F4: Wenn Scrollposition oder aktive Kachel gemerkt werden soll, braucht es kleine JS-Arbeit. Fuer den Kernnutzen ist das nicht erforderlich und sollte in S2/S3 bewusst entschieden werden.
- S1-F5: `shopping.css` ist der richtige CSS-Owner fuer Papierliste, Shopping-Actions und kuenftige Kassa-Zeile. Globale `ui.css`-Aenderungen sind nur noetig, wenn ein wirklich wiederverwendbares Iconbutton-Muster entsteht.
- S1-F6: Mobile `.row-actions` wird global unter 640px gestapelt; ein darunterliegendes Karussell muss die mobile Hoehe und Touchflaechen gezielt beruecksichtigen.
- S1-F7: Es gibt im App-Body bisher keine echten externen App-/Store-Links. Externe Links muessen deshalb in S3 bewusst mit `target`, `rel`, `aria-label` und PWA-Erwartung entschieden werden.
- S1-F8: `sw.js` ignoriert Cross-Origin-Fetches bereits. Google-Play-Navigation wird nicht durch den Service Worker abgefangen, solange normale externe Links verwendet werden.
- S1-F9: MIDAS nutzt Carousel als zentrales Hub-Muster. Fuer HESTIA sind aktive Mitte, bewusstes Weiterblaettern und dezente Bewegung brauchbar, nicht die Hub-/Panel-/Voice-Orchestrierung.
- S1-F10: Die Play-Store-Recherche bestaetigt fuer alle vier Kandidaten stabile Detailseiten. Diese sind fuer V1 besser als Suchlinks.

#### S1.6 Link-Kandidaten

Umsetzung/Review:

- Google-Play-Ziele fuer die vier Kandidaten recherchiert.
- Ergebnis in der Tabelle `Kassa-Link-Kandidaten` von Suchlinks auf Detailseiten korrigiert.

Finale S1-Linkkandidaten:

- `joe`: `https://play.google.com/store/apps/details?id=at.joeclub.app.joecard`
- `MPREIS`: `https://play.google.com/store/apps/details?id=at.mpreis.app`
- `HOFER`: `https://play.google.com/store/apps/details?id=de.apptiv.business.android.aldi_at`
- `SPAR`: `https://play.google.com/store/apps/details?id=at.spar.app`

Contract Review:

- Diese Links bleiben Google-Play-Ziele und behaupten keinen Installationsstatus.
- Es wird keine App-Erkennung, kein Deep Link und kein Intent-Vertrag eingefuehrt.
- Android-/PWA-Verhalten bleibt Plattformverhalten und muss in S5 durch Stephan manuell gesmoked werden.

#### S1.7 Ist-Zustand

Shopping-Actions:

- `index.html` enthaelt unter `#shopping-list` eine `.row-actions.shopping-actions`-Gruppe.
- Darin stehen:
  - `#finish-shopping`
  - `.shopping-edit-action`
- Das Karussell gehoert darunter, nicht zwischen diese beiden Aktionen.

Platz und Layout:

- Desktop: Panel ist maximal 780px breit; unter den Actions ist genug Raum fuer eine kleine, zentrierte Symbolleiste.
- Mobile: `.row-actions` stapelt Buttons; das Karussell muss darunter kompakt bleiben und darf die Liste nicht verdraengen.

Vorhandene Muster:

- Buttons: `.surface-button`, `.inline-link`.
- Shopping-spezifische Aktion: `.shopping-edit-action`.
- Es gibt noch kein lokales Iconbutton-/Quicklink-Muster fuer externe Links.

Externe Links / PWA:

- Bisherige externe Ressourcen sind Fonts, Supabase-CDN und Three.js-Import; keine vergleichbare Nutzer-Quicklink-Flaeche.
- Service Worker greift nicht in Cross-Origin-Requests ein.
- PWA-/Browser-Smoke bleibt wichtig, weil Google-Play-Ziele je nach Plattform unterschiedlich oeffnen koennen.

#### S1.8 Erste offene Fragen fuer S2/S3

- Soll das Karussell rein statisch in `index.html` liegen oder ueber `shopping.js` aus einer konstanten Linkliste gerendert werden?
- Reicht eine rein sichtbare Symbol-/Textmarke, oder braucht jedes Symbol eine sehr kleine Schriftmarke fuer Lesbarkeit?
- Werden Links in derselben Browser/PWA-Ansicht oder in neuem Tab geoeffnet?
- Wird Scrollposition in V1 bewusst verworfen, um JS und lokale UI-Persistenz zu vermeiden?
- Braucht es eine sichtbare Gruppenbezeichnung oder reichen `aria-label` und Position?

#### S1.9 S1 Contract Review

Review-Frage:

- Bleibt Roadmap 4 nach S1 innerhalb des HESTIA-Vertrags, wenn das Kassa-Karussell als kleine externe Linkleiste umgesetzt wird?

Entscheidung:

- Ja. S1 bestaetigt, dass das Feature eng im Shopping-Screen bleiben kann und keine Listen-, Sync-, Supabase-, Home- oder Writing-Logik braucht.

Findings:

- S1-CR-F1: Die Detailseiten-Links sind besser als Suchlinks, weil sie stabiler und weniger suchergebnisabhaengig sind.
- S1-CR-F2: Eine dynamische Renderlogik fuer Linkdaten ist nicht noetig. Nach S4.4 ist aber eine kleine lokale UI-Schicht fuer aktiven Fokus, Swipe und ARIA-Sync sinnvoll.
- S1-CR-F3: Externe Links sind das groesste Plattformrisiko, aber kein Produktvertragsbruch, solange HESTIA nur das Oeffnen eines Google-Play-Ziels verspricht.
- S1-CR-F4: Mobile Hoehe und Button-Hierarchie sind die groessten UI-Risiken.

Korrekturen:

- Kassa-Link-Kandidaten von Suchlinks auf stabile Google-Play-Detailseiten aktualisiert.
- S1-Statusmatrix auf `DONE` gesetzt.

#### S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Schritt-Abnahme:

- S1 ist abgeschlossen.
- S2 kann den finalen Vertrag fuer statisches vs. JS-gerendertes Karussell, Linkoeffnung, sichtbare Labels und Scrollposition treffen.

Doku-Sync-Entscheidung:

- Noch keine Module Overview aktualisieren. Die neue `Kassa Carousel Module Overview.md` wird gemaess Roadmap erst in S6 angelegt.

Commit-Empfehlung:

- Noch kein Commit nur fuer S1 noetig. Sinnvoller Commit nach Abschluss der Roadmap oder nach einem groesseren Doku-/Codeblock.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Den finalen Roadmap-4-Vertrag festlegen, bevor Code entsteht.
- Klar entscheiden, wie klein das Kassa-Karussell bleibt.

Substeps:

- S2.1 Produktvertrag gegen README, PRODUCT und Future Roadmaps pruefen.
- S2.2 Position finalisieren:
  - unterhalb von `Liste abschliessen` und `Aendern`
  - nicht zwischen den Buttons
  - nicht im Home-Hub
- S2.3 Linkvertrag finalisieren:
  - Google-Play-Link oeffnen
  - keine Installationsaussage
  - keine Deep-Link-Garantie
  - kein Ruecksprung-/Erfolgszustand
- S2.4 Karussell-Vertrag finalisieren:
  - vier feste Symbole
  - keine Konfiguration
  - keine erweiterbare App-Sammlung
  - kein persistierter UI-Merker fuer Scrollposition oder aktives Symbol in V1
  - fluechtiger aktiver Index im Karussell-Modul ist erlaubt
- S2.5 Not-in-Scope gegen Roadmap 5 bis 8 pruefen.
- S2.6 Contract Findings und Korrekturen dokumentieren.
- S2.7 Statusmatrix aktualisieren.
- S2.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- Finaler fachlicher und technischer Vertrag fuer S3/S4.

Exit-Kriterium:

- Keine offene Grundsatzfrage zu Position, App-Liste, Linkverhalten oder Nicht-Zielen.

### S2 Ergebnisprotokoll 13.05.2026

#### S2.1 Produktvertrag gegen README, PRODUCT und Future Roadmaps

Umsetzung/Review:

- Roadmap 4 gegen README, PRODUCT und `docs/future roadmaps.md` geprueft.
- Ergebnis: Das Feature ist produktvertragskonform, wenn es Shopping-nah, klein und ohne technische Magie bleibt.

Finaler Produktvertrag:

- HESTIA bekommt keinen App-Launcher.
- HESTIA bekommt eine kleine Kassahilfe im Einkaufsmodus.
- Die Liste bleibt Hauptinhalt.
- `Liste abschliessen` und `Aendern` bleiben die fachlich primaeren Aktionen.
- Das Karussell ist nur eine nachgelagerte Hilfe fuer den Moment vor dem Bezahlen.

#### S2.2 Position finalisieren

Entscheidung:

- Das Kassa-Karussell sitzt unterhalb von `Liste abschliessen` und `Aendern`.
- Es sitzt nicht zwischen den beiden Buttons.
- Es sitzt nicht im Home-Hub.
- Es wird keine globale Navigation und kein dritter Kernpfad.

Begruendung:

- Zwischen den Buttons wuerde das Karussell die eigentlichen Listenaktionen verwischen.
- Unterhalb liest sich der Ablauf korrekt: Liste abarbeiten, dann bei Bedarf Kassahilfe oeffnen.
- Home bleibt nach Roadmap 3 bewusst leer und ruhig; Roadmap 4 gehoert in Shopping.

#### S2.3 Linkvertrag finalisieren

Entscheidung:

- V1 nutzt vier Google-Play-Detailseiten:
  - `joe`: `https://play.google.com/store/apps/details?id=at.joeclub.app.joecard`
  - `MPREIS`: `https://play.google.com/store/apps/details?id=at.mpreis.app`
  - `HOFER`: `https://play.google.com/store/apps/details?id=de.apptiv.business.android.aldi_at`
  - `SPAR`: `https://play.google.com/store/apps/details?id=at.spar.app`
- HESTIA verspricht nur: Der Link wird geoeffnet.
- Kein Installationsstatus wird angezeigt.
- Kein Ruecksprung, kein Erfolgszustand und keine Auswertung des Plattformverhaltens.
- Keine Deep-Link-, Intent- oder native Android-Verpflichtung in V1.

Offen fuer S3:

- Externe Linkattribute final entscheiden:
  - `target="_blank"` vs. gleicher Kontext
  - `rel="noopener noreferrer"` bei neuem Kontext
  - Screenreader-Text fuer "oeffnet Google Play"

#### S2.4 Karussell-Vertrag finalisieren

Entscheidung:

- V1 startet mit statischen Google-Play-Links in `index.html`.
- Das finale Karussell darf eine kleine lokale UI-Schicht bekommen, damit es sich wie ein echtes Karussell anfuehlt.
- Kein Rendering ueber `shopping.js` in V1; Shopping bleibt Listenlogik.
- Ein separates `app/modules/kassa-carousel.js` ist erlaubt, wenn es nur fluechtigen UI-State, Swipe/Keyboard und ARIA-Sync verwaltet.
- Keine lokale Scrollposition.
- Kein persistiertes zuletzt sichtbares Symbol.
- Aktiver Index ist nur im Speicher erlaubt.
- Keine Personalisierung.
- Keine Statuslogik.
- Keine Erweiterbarkeit in V1.

Begruendung:

- Vier feste Links brauchen keine Daten-, Sync- oder Storage-Schicht.
- Ein echtes Fokus-Karussell braucht aber fluechtigen UI-State fuer aktive Mitte, Swipe und ARIA-Fuehrung.
- Statische Linkziele plus lokaler UI-State halten Accessibility, Linkpruefung und QA klein.

#### S2.5 Not-in-Scope gegen Roadmap 5 bis 8

Review:

- Roadmap 5 Push bleibt unberuehrt.
- Roadmap 6 Realtime Shopping Collaboration bleibt unberuehrt.
- Roadmap 7 Haushaltsperipherie bleibt unberuehrt.
- Roadmap 8 Standort-/Kontextautomation bleibt unberuehrt.

Entscheidung:

- Keine Standortsortierung, keine Geolocation, keine Push- oder Realtime-Beruehrung.

#### S2.6 Contract Findings und Korrekturen

Findings:

- S2-F1: Die Roadmap erlaubte Scrollposition noch optional. Nach S1 ist das fuer V1 zu viel, weil es lokale UI-Persistenz ohne starken Nutzen erzeugt.
- S2-F2: S4 war zuerst auf einen optionalen UI-Merker vorbereitet und danach zu hart auf "kein JS" geschnitten. Nach dem MIDAS-Review ist fluechtiger UI-State fuer ein echtes Karussell angemessen.
- S2-F3: Der Linkvertrag muss in S3 noch entscheiden, ob externe Links im selben Kontext oder in neuem Kontext oeffnen.

Korrekturen:

- Scope und Architektur-Constraints auf "keine Persistenz, keine Scrollposition, kein Storage" geschaerft.
- Fluechtiger aktiver Karussell-Index ist nach S4.4 erlaubt.
- Tool Permissions auf `index.html`, `app/modules/kassa-carousel.js`, `app/main.js`, `app/styles/shopping.css` und Doku erweitert; `shopping.js` und `state.js` bleiben fuer V1 nur Lesekontext.
- Statusmatrix fuer S2 auf `DONE` gesetzt.

#### S2.7 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Schritt-Abnahme:

- S2 ist abgeschlossen.
- S3 kann sich auf UI-Hierarchie, Symbol-/Copy-Vertrag, Linkattribute und konkrete S4-Schnittpunkte konzentrieren.

Doku-Sync-Entscheidung:

- Keine Module Overview in S2 aktualisieren. Die neue `Kassa Carousel Module Overview.md` bleibt fuer S6.

Commit-Empfehlung:

- Noch kein Commit nur fuer S2 noetig.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Bruchrisiken und die konkrete S4-Umsetzung zuschneiden.
- UI darf hilfreich werden, aber nicht lauter.

Substeps:

- S3.1 Bruchrisiken dokumentieren:
  - Shopping-Actions verlieren Hierarchie
  - Karussell wirkt wie Portal
  - Play-Store-Link wirkt wie Installationsstatus
  - Mobile Hoehe oder Scroll kippt
  - externer Link bricht PWA-Erwartung
  - Screenreader-/ARIA-Vertrag unklar
- S3.2 UI-Vertrag definieren:
  - Symbolgroesse
  - Touchflaeche
  - horizontaler Rhythmus
  - sekundaere Materialitaet
  - kein lauter Titel, hoechstens sehr leise Gruppensemantik
- S3.3 Copy-/Accessibility-Vertrag definieren:
  - sichtbare Copy minimal halten
  - aussagekraeftige `aria-label`/`title`
  - Linkziel ehrlich benennen
- S3.4 Linkdaten-Vertrag definieren:
  - statische Linkeintraege in `index.html`
  - Name, Short Label, URL, ggf. CSS-Key
  - keine remote geladenen Appdaten
- S3.5 S4-Substeps final schneiden.
- S3.6 S3 Contract Review und Findings-Korrektur.
- S3.7 Statusmatrix aktualisieren.
- S3.8 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Output:

- S4-Plan mit klaren Substeps und Bruchrisiken.

Exit-Kriterium:

- S4 kann ohne Produktinterpretation umgesetzt werden.

### S3 Ergebnisprotokoll 13.05.2026

#### S3.1 Bruchrisiken

Review:

- Shopping-Actions koennen Hierarchie verlieren, wenn das Karussell zwischen `Liste abschliessen` und `Aendern` gesetzt wird.
- Das Karussell kann wie ein App-Portal wirken, wenn es grosse Kacheln, laute Labels oder Erklaer-Copy bekommt.
- Google-Play-Links koennen wie ein Installationsstatus wirken, wenn HESTIA "oeffnen" oder "installieren" andeutet.
- Mobile Hoehe kann kippen, wenn die Leiste zu viel vertikalen Abstand bekommt.
- Externe Links koennen je nach Desktop, Browser, Android oder PWA unterschiedlich oeffnen.
- Screenreader brauchen ehrliche Linknamen, weil rein visuelle Symbole nicht genuegen.

Entscheidung:

- Das Karussell bleibt unterhalb der Shopping-Actions.
- Es bekommt keine Headline und keinen erklaerenden Infoblock.
- Es darf nicht den Zustand der Liste, App-Installation oder Plattformaktion kommentieren.

#### S3.2 UI-Vertrag

Finaler UI-Vertrag:

- Position: direkt unter `.shopping-actions`, innerhalb des Shopping-Panels.
- Erscheinung: kleine, sekundare Kassaplakette mit ruhiger Materialitaet.
- Rhythmus: aktive Mitte mit kontrolliertem Wechsel zwischen vier Links.
- Touch: jede Linkflaeche mindestens 44px hoch und breit.
- Desktop: aktive Karte und dezente Navigation duerfen praesent sein; kein grosses Kartenraster.
- Mobile: per Swipe wechselbar, ohne die Liste oder Actions zu verdraengen.
- Hierarchie: `Liste abschliessen` und `Aendern` bleiben optisch und semantisch wichtiger.

Nicht verwenden:

- keine grossen App-Kacheln
- keine Badge-/Statuszeilen
- keine auffaellige Ueberschrift
- kein `+`, kein `i`, keine Konfiguration

#### S3.3 Copy- und Accessibility-Vertrag

Finaler Copy-Vertrag:

- Sichtbar pro Link nur die kurze Marke:
  - `joe`
  - `MPREIS`
  - `HOFER`
  - `SPAR`
- Keine sichtbare Erklaer-Copy wie "Loyalty Apps" oder "Kassa Apps".
- Keine Plattformversprechen wie "App oeffnen" oder "installieren".

Finaler Accessibility-Vertrag:

- Die Linkgruppe bekommt eine leise Semantik, z. B. `aria-label="Kassa-Apps in Google Play oeffnen"`.
- Jeder Link bekommt ein ehrliches `aria-label`, z. B. `joe Bonus Club in Google Play oeffnen`.
- Jeder Link bekommt ein passendes `title` mit demselben Versprechen.
- Die sichtbaren Labels bleiben echte Textinhalte, keine reinen Hintergrundbilder.
- Fokuszustand muss sichtbar sein und darf nicht nur ueber Farbe funktionieren.

#### S3.4 Link- und HTML-Vertrag

Finaler Linkvertrag:

- Umsetzung als statische Links in `index.html`.
- Keine remote geladenen Linkdaten und kein Rendering ueber `shopping.js`.
- Eine kleine lokale UI-Schicht darf die vorhandenen statischen Links als Karussell bedienen.
- Kein Listen-State, kein Storage, keine Supabase-Schicht.
- Jeder Link nutzt die in S1 verifizierte Google-Play-Detailseite.
- Links oeffnen in neuem Kontext mit `target="_blank"` und `rel="noopener noreferrer"`.

Begruendung:

- Neuer Kontext verhindert, dass HESTIA im PWA-/Browser-Kontext einfach durch Google Play ersetzt wird.
- `noopener noreferrer` ist der passende Sicherheitsvertrag fuer externe Ziele.
- Bei Android entscheidet die Plattform danach selbst, ob Play Store, Browser, `Oeffnen` oder `Installieren` sichtbar wird.

#### S3.5 S4-Schnitt

Urspruenglicher S4-Schnitt, durch den S4.4-Nachtrag korrigiert:

- S4.1 HTML-Struktur fuer eine kleine Linkgruppe unterhalb der Shopping-Actions anlegen.
- S4.2 Vier statische Google-Play-Links mit sichtbaren Kurzlabels, `aria-label`, `title`, `target` und `rel` setzen.
- S4.3 Shopping-CSS fuer sekundare Symbolleiste, horizontales Verhalten, Touchflaechen und Fokuszustand umsetzen.
- S4.4 Desktop-/Mobile-Feinschliff gegen Hierarchie, Hoehe und Ueberlauf.
- S4.5 Code Review, Contract Review und Korrektur der Findings.

Aktiver S4-Schnitt nach S4.4:

- S4.1 bis S4.3 bleiben als Linkbasis und erster UI-Zwischenstand gueltig.
- S4.4 korrigiert den Zielvertrag auf HESTIA-Mini-Fokus-Karussell.
- S4.5 bis S4.9 bauen Markup, lokales UI-Modul, CSS, Feinschliff und finalen Review fuer das echte Karussell.

#### S3.6 Contract Review und Findings

Review-Frage:

- Kann S4 mit diesem Vertrag umgesetzt werden, ohne App-Launcher-, Deep-Link-, State- oder Portal-Logik einzubauen?

Entscheidung:

- Ja. S3 begrenzt die Umsetzung weiterhin auf Shopping-nahes Markup, statische Google-Play-Links, lokale UI-Bedienung und Accessibility-Attribute.
- Nach S4.4 ist eine kleine isolierte JS-Schicht erlaubt, solange sie nur fluechtigen Karussell-UI-State verwaltet.

Findings:

- S3-F1: "lokale konstante Liste" aus dem S3-Plan klang noch nach JS-Datenstruktur. Fuer V1 ist statisches HTML klarer.
- S3-F2: Sichtbare Gruppen-Copy koennte die Leiste lauter machen als gewuenscht.
- S3-F3: Linkattribute waren nach S2 noch offen und mussten vor S4 entschieden werden.
- S3-F4: S4 hatte zunaechst einen zu kleinen Zielzuschnitt und waere mit einer Pillbar stehen geblieben.
- S3-F5: Der statische S3-Schnitt war fuer Linkzugriff korrekt, fuer den gewuenschten Karussell-Charakter aber zu eng.

Korrekturen:

- S3.4 auf statische Linkeintraege in `index.html` geschaerft.
- Linkattribute final entschieden: `target="_blank"` und `rel="noopener noreferrer"`.
- Sichtbare Copy auf vier Kurzlabels begrenzt.
- S4-Substeps nach S4.4 auf HESTIA-Mini-Fokus-Karussell erweitert.
- Lokale JS-Schicht fuer fluechtigen UI-State erlaubt; `shopping.js`, `state.js`, Storage und Supabase bleiben ausserhalb.
- Statusmatrix fuer S3 auf `DONE` gesetzt.

#### S3.7 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung

Schritt-Abnahme:

- S3 ist abgeschlossen.
- S4 kann nach S4.4 ohne weitere Produktinterpretation als HESTIA-Mini-Fokus-Karussell weiterlaufen.

Doku-Sync-Entscheidung:

- Keine Module Overview in S3 aktualisieren. Die neue `Kassa Carousel Module Overview.md` bleibt fuer S6.

Commit-Empfehlung:

- Noch kein Commit nur fuer S3 noetig.

### S1-S3 Nachreview nach S4.4 13.05.2026

Review-Frage:

- Sind S1 bis S3 nach dem MIDAS-inspirierten S4.4-Schwenk noch widerspruchsfrei genug, damit S4 sauber weiterlaufen kann?

Entscheidung:

- Ja, wenn die alten "statisch/kein JS"-Aussagen als urspruenglicher Zwischenstand verstanden und durch den aktiven S4.4-Vertrag ersetzt werden.

Findings:

- S1-S3-CR-F1: S1-F9 war zu eng formuliert. HESTIA uebernimmt nicht nur eine "kleine horizontale UI-Idee", sondern gezielt das MIDAS-Prinzip aus aktiver Mitte, Swipe-Gefuehl und Enter-/Exit-Bewegung.
- S1-S3-CR-F2: S2.4 verbot faktisch aktiven UI-State. Fuer ein echtes Karussell ist fluechtiger aktiver Index jedoch notwendig und produktvertragskonform.
- S1-S3-CR-F3: S3.5 war nach der Pillbar-Umsetzung zu klein geschnitten und haette S4 ohne echten Karussell-Charakter beendet.
- S1-S3-CR-F4: Tool Permissions mussten `app/modules/kassa-carousel.js`, `app/main.js` und ggf. `sw.js` erlauben, damit die neue lokale UI-Schicht sauber und cachebar integriert werden kann.
- S1-S3-CR-F5: Die Tests in S5 mussten von "wischbar oder voll sichtbar" auf echtes Fokus-/Swipe-/Tastenverhalten erweitert werden.

Korrekturen:

- Statusmatrix fuer S2 und S3 auf den korrigierten Vertrag aktualisiert.
- S2.4 auf statische Links plus fluechtigen UI-State korrigiert.
- S2-F2 korrigiert: nicht "kein UI-Merker", sondern "kein persistierter Merker"; fluechtiger aktiver Index ist erlaubt.
- S3.4 und S3.5 auf lokale UI-Schicht und aktiven S4.4-Schnitt korrigiert.
- S3-Findings erweitert: Pillbar war korrekt als Zwischenstand, aber zu wenig fuer das Ziel "echtes Karussell".
- S5-Smokes auf aktive Mitte, Zurueck/Weiter, Pfeiltasten, Swipe und Tabfluss erweitert.

Aktiver Vertrag fuer S4:

- Linkziele bleiben statisch in `index.html`.
- `app/modules/kassa-carousel.js` darf nur UI-State und Bedienung verwalten.
- `app/main.js` darf dieses Modul initialisieren.
- `sw.js` darf nur bei Bedarf um das neue Modul als Cache-Referenz erweitert werden.
- Keine App-Erkennung, kein Deep Link, kein Installationsstatus, kein Storage, kein Listen-State, kein Supabase.

## S4 - Umsetzung

Ziel:

- Kassa-Karussell klein, ruhig und robust umsetzen.
- Ergebnis von S4 soll kein reiner horizontaler Linkstreifen sein, sondern ein HESTIA-angepasstes Mini-Fokus-Karussell nach MIDAS-Prinzip:
  - eine klare aktive Mitte
  - lesbarer Wechsel zwischen vier Apps
  - Swipe-/Tasten-/Button-Navigation ohne Portalgefuehl
  - ruhige, Bridgerton-/Downton-kompatible Materialitaet
  - nur fluechtiger UI-State, keine Persistenz und keine App-Erkennung

Finale Substeps:

- S4.1 HTML-Struktur fuer eine kleine Linkgruppe unterhalb der Shopping-Actions anlegen. `DONE`
- S4.2 Vier statische Google-Play-Links mit sichtbaren Kurzlabels, `aria-label`, `title`, `target` und `rel` setzen. `DONE`
- S4.3 Erste Shopping-CSS-Basis fuer Linkleiste, Touchflaechen und Fokuszustand umsetzen. `DONE`
- S4.4 Roadmap-/Contract-Nachtrag: MIDAS-Hub-Referenz vertiefen und HESTIA-Fokus-Karussell-Zielvertrag korrigieren. `DONE`
- S4.5 Markup auf Fokus-Karussell erweitern: `DONE`
  - aktive Buehne
  - vorher/zurueck und weiter/naechste Steuerung
  - Positionsanzeige ohne laute Copy
  - vier Linkkarten behalten
- S4.6 Lokales Kassa-Carousel-Modul umsetzen: `DONE`
  - aktiver Index nur im Speicher
  - Button-/Swipe-/Keyboard-Wechsel
  - `aria-hidden`, `tabindex`, aktive Klassen und Positionsanzeige synchronisieren
  - Klick auf aktive Karte oeffnet weiterhin den statischen Google-Play-Link
  - keine Persistenz, kein Listen-State, kein Supabase
- S4.7 CSS von Pillbar zu HESTIA-Mini-Fokus-Karussell umbauen: `DONE`
  - aktive Mitte als kleine noble Plakette
  - Nachbarn/Rotation nur angedeutet
  - Enter-/Exit-/Seitwaertsbewegung dezent
  - `prefers-reduced-motion` beruecksichtigen
  - Touchflaechen mindestens 44px
- S4.8 Desktop-/Mobile-Feinschliff gegen Hierarchie, Hoehe, Textfit, Fokus und Ueberlauf. `DONE`
- S4.9 Code Review, Contract Review und Korrektur der Findings. `DONE`

Jeder S4-Substep dokumentiert:

- Umsetzung
- betroffene Dateien
- lokaler Check
- Contract Review
- Findings
- Korrekturen
- Restrisiken

Output:

- Implementiertes HESTIA-Mini-Fokus-Karussell im Einkaufsmodus innerhalb der Roadmap-4-Grenzen.

Exit-Kriterium:

- Das Karussell fuehlt sich wie ein echtes kleines Karussell an und hilft beim Kassamoment, ohne Shopping schwerer oder portalartig zu machen.

### S4.1 Ergebnisprotokoll 13.05.2026

Umsetzung:

- In `index.html` direkt unterhalb von `.shopping-actions` eine `nav.kassa-carousel` angelegt.
- Innerhalb der Navigation eine `div.kassa-carousel-track` als spaetere horizontale Linkspur angelegt.
- Die Huelle bleibt bis S4.2 per `hidden` unsichtbar, damit der Zwischenstand keine leere Navigation anzeigt.

Betroffene Dateien:

- `index.html`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `git diff --check` fuer `index.html` und Roadmap.
- `rg`-Scan auf `kassa-carousel`, `kassa-carousel-track`, `hidden` und Shopping-Actions.

Code Review:

- Die Struktur sitzt fachlich korrekt unter `Liste abschliessen` und `Aendern`.
- Es wurde kein `shopping.js`, kein State und keine neue Dependency beruehrt.
- Die Huelle ist noch nicht sichtbar und erzeugt deshalb keine unfertige leere UI.

Contract Review:

- S4.1 bleibt innerhalb des S3-Vertrags: statische HTML-Struktur, keine App-Erkennung, kein Deep Link, keine Statuslogik.
- `hidden` ist fuer den Substep bewusst, weil S4.2 erst die vier echten Links und Attribute liefert.

Findings:

- S4.1-F1: Eine sichtbare leere Navigation waere ein Accessibility- und UX-Problem.

Korrekturen:

- Die neue `nav.kassa-carousel` bleibt bis zur Linkbefuellung in S4.2 `hidden`.

Restrisiken:

- S4.2 muss `hidden` entfernen, sobald die vier Links vollstaendig gesetzt sind.
- S4.3 muss die Huelle visuell sekundar stylen und Fokus-/Touchflaechen sichern.

### S4.2 Ergebnisprotokoll 13.05.2026

Umsetzung:

- In `index.html` vier statische Linkeintraege in `nav.kassa-carousel` gesetzt.
- `hidden` von `nav.kassa-carousel` entfernt, weil die Linkgruppe nun vollstaendig befuellt ist.
- Sichtbare Kurzlabels gesetzt:
  - `joe`
  - `MPREIS`
  - `HOFER`
  - `SPAR`
- Alle Links nutzen die in S1/S3 festgelegten Google-Play-Detailseiten.
- Alle Links nutzen `target="_blank"` und `rel="noopener noreferrer"`.
- Alle Links haben ehrliche `aria-label` und `title`, die nur das Oeffnen in Google Play versprechen.

Betroffene Dateien:

- `index.html`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `git diff --check` fuer `index.html` und Roadmap.
- `Select-String`-Scan auf die vier Play-Store-Package-IDs.
- `Select-String`-Scan auf `target="_blank"`, `rel="noopener noreferrer"`, `aria-label`, `title` und entfernten `hidden`-Status der Kassa-Navigation.

Code Review:

- Die Linkdaten liegen statisch im HTML und fuehren keine JS-Datenstruktur ein.
- `shopping.js`, `state.js`, Supabase und Router bleiben unberuehrt.
- Die Links enthalten sichtbaren Text und sind nicht nur dekorative Hintergrundflaechen.

Contract Review:

- S4.2 bleibt innerhalb des S3-Linkvertrags.
- Es wird kein Installationsstatus, kein Deep Link, kein Intent und keine App-Erkennung behauptet.
- Die Plattform entscheidet nach dem Klick selbst ueber Play Store, Browser, `Oeffnen` oder `Installieren`.

Findings:

- S4.2-F1: Die Linkgruppe ist nach S4.2 sichtbar, aber noch nicht final gestaltet. Das ist ein erwarteter Zwischenstand bis S4.3.

Korrekturen:

- Keine Code-Korrektur noetig; S4.3 ist der geplante Styling-Substep.

Restrisiken:

- S4.3 muss List-Default-Styling, horizontales Verhalten, Fokuszustand und Touchflaechen sauber setzen.
- S4.4 muss pruefen, ob die sichtbare Linkgruppe auf Desktop/Mobile sekundar genug bleibt.

### S4.3 Ergebnisprotokoll 13.05.2026

Umsetzung:

- In `app/styles/shopping.css` lokale Styles fuer `kassa-carousel`, `kassa-carousel-track`, `kassa-carousel-item` und `kassa-carousel-link` ergaenzt.
- Die Linkgruppe ist nun eine kleine horizontale Symbol-/Markenleiste mit sekundarer Materialitaet.
- Der Track ist horizontal scrollbar und nutzt `scroll-snap-type: x proximity`.
- Jede Linkflaeche hat mindestens 44px Hoehe und ausreichend Breite fuer Touch.
- Fokus, Hover und Active States sind sichtbar, aber ruhiger als die primaeren Shopping-Actions.
- Mobile-Anpassung fuer kompakte Abstaende und Touchbreite ergaenzt.

Betroffene Dateien:

- `app/styles/shopping.css`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `git diff --check` fuer `app/styles/shopping.css` und Roadmap.
- `rg`-Scan auf alle neuen `kassa-carousel`-Selektoren.
- Contract-Scan auf Scope-Drift: keine JS-, State-, App-Erkennungs- oder Deep-Link-Erweiterung.
- Lokaler Playwright-Smoke ueber `python -m http.server`:
  - 390px Mobile: 4 Links, Mindesthoehe 44px, aktive Shopping-Ansicht.
  - 320px Mobile: 4 Links, Mindesthoehe 44px.
  - 1365px Desktop: 4 Links, Mindesthoehe 44px.

Code Review:

- Styles bleiben im Shopping-Owner `app/styles/shopping.css`.
- Keine globale UI-Klasse wurde eingefuehrt, weil das Muster in V1 nur im Shopping-Screen genutzt wird.
- List-Default-Styling wird lokal entfernt; die HTML-Liste bleibt semantisch erhalten.
- Fokuszustand ist nicht nur ueber Farbe sichtbar.

Contract Review:

- S4.3 bleibt innerhalb des S3-UI-Vertrags: klein, horizontal, sekundar, keine Headline, keine Portaloptik.
- `Liste abschliessen` und `Aendern` bleiben optisch dominanter.
- Keine sichtbare Copy ausser den vier Kurzlabels wurde eingefuehrt.

Findings:

- S4.3-F1: Die Scrollbar kann je nach Browser sichtbar sein. Das ist fuer V1 akzeptabel, weil sie Nutzbarkeit signalisiert und keine dekorative Pflicht verletzt.
- S4.3-F2: Auf 320px und 390px passen die vier Links bereits vollstaendig in den Track. Das ist kein Vertragsbruch; horizontales Verhalten bleibt vorhanden, wird aber nur bei engeren oder geaenderten Labels relevant.

Korrekturen:

- Keine Code-Korrektur noetig.

Restrisiken:

- S4.4 muss im Browser pruefen, ob die Leiste auf Desktop und Mobile wirklich sekundar genug wirkt.
- S4.4 muss auf Textfit, Fokusumrandung und horizontale Layoutpannen achten.

### S4.4 Roadmap-/Contract-Nachtrag 13.05.2026

Ausloeser:

- Nach S4.3 war sichtbar: Die Umsetzung ist sauber, aber eher eine noble Link-/Pillbar als ein echtes Karussell.
- Stephan moechte ausdruecklich ein HESTIA-passendes Feature, das sich am coolen MIDAS-Hub-Karussell orientiert, aber nicht 1:1 MIDAS nachbaut.

MIDAS-Referenz gelesen:

- MIDAS Hub Module Overview.
- Referenzierte MIDAS-Dokus:
  - `bootflow overview.md`
  - `Assistant Module Overview.md`
  - `VAD Module Overview.md`
  - `Hydration Target Module Overview.md`
- Relevanter MIDAS-Code:
  - `app/modules/hub/index.js`
  - `app/styles/hub.css`
  - `index.html` Hub-/Carousel-Markup

Extrahierte MIDAS-Prinzipien fuer HESTIA:

- Nicht die MIDAS-Orbit-Groesse uebernehmen.
- Nicht die Panel-, Voice-, Dashboard- oder Aura-Architektur uebernehmen.
- Uebernehmen:
  - aktiver Fokus statt gleichwertiger Linkreihe
  - bewusstes Weiterblaettern statt bloss horizontaler Scrollleiste
  - dezente Enter-/Exit-Bewegung
  - gute Touch-/Swipe-Ergonomie
  - klare ARIA-/Tab-Fuehrung fuer das aktive Element

Neuer S4-Zielvertrag:

- Am Ende von S4 steht ein HESTIA-Mini-Fokus-Karussell.
- Eine App ist sichtbar aktiv und wird als kleine Kassaplakette praesentiert.
- Links/rechts oder ueber dezente Steuerelemente ist erkennbar, dass weitere Apps vorhanden sind.
- Nutzer kann per Swipe, Zurueck/Weiter und optional Pfeiltasten wechseln.
- Nur die aktive Karte ist im normalen Tabfluss.
- Aktivstatus lebt nur im fluechtigen Modul-Scope.
- Keine Speicherung von aktiver App oder Scrollposition.
- Kein Installationsstatus, keine Deep Links, keine App-Erkennung, kein Launcher.

Contract-Korrektur gegen S2/S3:

- Die fruehere Entscheidung "kein JS in V1" wird fuer das echte Karussell korrigiert.
- Erlaubt ist eine kleine lokale JS-Schicht fuer UI-State und Bedienung.
- Weiterhin verboten sind State-/Sync-/Storage-/Supabase- oder Android-nahe Erweiterungen.
- `shopping.js` bleibt fuer Listenlogik zustaendig; das Karussell bekommt ein eigenes kleines Modul oder wird eng isoliert initialisiert.

Findings:

- S4.4-F1: Die Pillbar erfuellt Linkzugriff und Touchflaechen, aber nicht den gewuenschten Karussell-Charakter.
- S4.4-F2: Ein echtes Fokus-Karussell braucht minimalen UI-State; der bisherige "kein JS"-Vertrag waere dafuer zu eng.
- S4.4-F3: MIDAS ist als Architektur zu gross fuer HESTIA, aber als Interaktionsprinzip wertvoll.

Korrekturen:

- S4-Ziel und S4-Substeps auf HESTIA-Mini-Fokus-Karussell erweitert.
- Architektur-Constraints erlauben nun fluechtigen UI-State im Karussell-Modul.
- Tool Permissions erlauben `app/modules/kassa-carousel.js`, `app/main.js` und bei Bedarf `sw.js`.
- Statusmatrix aktualisiert.

Restrisiken:

- S4.5-S4.8 muessen verhindern, dass das Feature zu gross oder portalartig wird.
- Das Karussell darf nicht wie ein weiterer Hauptmodus wirken.
- Bewegung muss unter `prefers-reduced-motion` ruhig bleiben.

S4.4 Review- und Check-Abschluss:

- Code Review:
  - Keine produktive Codeaenderung in S4.4 noetig; S4.4 ist ein Roadmap-/Contract-Korrekturschritt.
  - Die bereits vorhandenen S4.1-S4.3 Codeaenderungen bleiben als Linkbasis und Zwischenstand gueltig.
  - Der naechste Codeeingriff ist S4.5 Markup-Erweiterung.
- Contract Review:
  - S1 bis S3 widersprechen dem aktiven S4-Vertrag nicht mehr.
  - Alte "statisch/kein JS"-Aussagen sind nur noch als historischer Zwischenstand oder Finding dokumentiert.
  - Aktiver Vertrag: statische Linkziele plus isoliertes, fluechtiges UI-Modul fuer Fokus, Swipe, Keyboard und ARIA-Sync.
- Checks:
  - `git diff --check` fuer Roadmap ausgefuehrt.
  - `rg`-Scan auf blockierende Altvertraege wie `kein JS`, `statisch`, `Pillbar`, `kassa-carousel.js`, `fluechtig` und S4-Substeps ausgefuehrt.
  - Markdown-Table-Pipe-Scan ausgefuehrt.
- Korrektur der Findings:
  - Keine weitere Korrektur noetig.

### S4.5 Ergebnisprotokoll 13.05.2026

Umsetzung:

- `index.html` von einfacher Linkspur auf Fokus-Karussell-Markup erweitert.
- `nav.kassa-carousel` mit `data-kassa-carousel` als lokaler Modul-Hook markiert.
- Zurueck-/Weiter-Steuerung angelegt:
  - `data-kassa-carousel-prev`
  - `data-kassa-carousel-next`
- Eine `kassa-carousel-stage` als aktive Buehne angelegt.
- Vier vorhandene Linkkarten behalten und mit stabilen Hooks versehen:
  - `data-kassa-carousel-item`
  - `data-kassa-carousel-index`
  - `data-kassa-carousel-link`
- Initialzustand gesetzt:
  - `joe` ist `is-active`
  - nicht aktive Eintraege sind `aria-hidden="true"`
  - nicht aktive Links sind aus dem Tabfluss genommen (`tabindex="-1"`)
- Positionsanzeige ohne laute Copy angelegt:
  - `data-kassa-carousel-position`
  - `aria-live="polite"`
  - initial `1 / 4`

Betroffene Dateien:

- `index.html`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `git diff --check` fuer `index.html` und Roadmap.
- `Select-String`-/`rg`-Scan auf `data-kassa-carousel`, Controls, Items, Linkhooks, `aria-hidden`, `tabindex` und Positionsanzeige.
- Linkziel-Scan auf die vier Google-Play-Package-IDs.
- Node-basierter Markup-Count:
  - 1 Carousel-Root
  - 1 Prev-Control
  - 1 Next-Control
  - 1 Stage
  - 4 Items
  - 4 Links
  - 4 Indizes
  - 1 Positionsanzeige
  - 4 `target="_blank"`
  - 4 `rel="noopener noreferrer"`
  - 3 inaktive `tabindex="-1"`
- Lokaler Playwright-DOM-Smoke ueber `python -m http.server`:
  - Shopping-Screen aktiv
  - Root, Prev, Next, Stage und Position vorhanden
  - 4 Items, 4 Links
  - 1 aktives Item, 3 `aria-hidden` Items
  - 3 inaktive Tabstops
  - alle Links mit `_blank` und `noopener noreferrer`

Code Review:

- S4.5 aendert nur Markup und Doku.
- Keine JS-, State-, Storage-, Supabase- oder Router-Schicht wurde beruehrt.
- Die vier statischen Google-Play-Links bleiben unveraendert.
- Das Markup liefert S4.6 klare Hooks fuer aktiven Index, ARIA-Sync, Buttons, Swipe und Keyboard.

Contract Review:

- S4.5 bleibt innerhalb des S4.4-Vertrags: Fokus-Karussell-Markup, aber noch kein persistierter UI-State.
- `Liste abschliessen` und `Aendern` bleiben oberhalb und fachlich primaer.
- Keine App-Erkennung, kein Deep Link, kein Installationsstatus und keine Konfiguration eingefuehrt.

Findings:

- S4.5-F1: Bis S4.7 kann das neue Markup visuell noch nicht wie das finale Fokus-Karussell wirken, weil Controls, Buehne und aktive Karte noch nicht final gestylt sind.
- S4.5-F2: Bis S4.6 ist nur `joe` im initialen Tabfluss; die Umschaltung der aktiven Karte kommt bewusst erst mit dem lokalen UI-Modul.
- S4.5-F3: Die erste Markup-Fassung hatte lange `li`- und Positionszeilen, die kuenftige Wartung erschweren.

Korrekturen:

- Lange `li`-Attribute und die Positionsanzeige auf mehrere Zeilen gezogen.
- S4.5-F1 und S4.5-F2 bleiben erwartete Zwischenstaende fuer S4.6/S4.7.

Restrisiken:

- S4.6 muss `aria-hidden`, `tabindex`, `is-active` und Positionsanzeige synchron halten.
- S4.7 muss die sichtbare Linkliste in eine echte kleine Kassaplakette mit dezenter Rotation uebersetzen.

### S4.6 Ergebnisprotokoll 13.05.2026

Umsetzung:

- Neues lokales Modul `app/modules/kassa-carousel.js` angelegt.
- `initKassaCarousel(document, touchlog)` in `app/main.js` initialisiert.
- `sw.js` um das neue Modul erweitert und Cache-Version von `v28` auf `v29` angehoben.
- Aktiver Index bleibt ausschliesslich im Modulspeicher.
- Zurueck-/Weiter-Buttons wechseln zyklisch durch die vier Kassa-Apps.
- Pfeiltasten, `Home` und `End` wechseln den aktiven Eintrag, wenn der Fokus im Karussell liegt.
- Swipe-/Drag-Wechsel ueber Pointer Events umgesetzt.
- Link-Drag auf den Karten deaktiviert, damit Swipe nicht durch Browser-Link-Drag gestoert wird.
- `is-active`, `is-prev`, `is-next`, `is-hidden`, `aria-hidden`, `tabindex` und Positionsanzeige werden bei jedem Wechsel synchronisiert.
- Klick auf eine inaktive Karte waehlt sie aus; Klick auf die aktive Karte laesst den statischen Google-Play-Link normal oeffnen.

Betroffene Dateien:

- `app/modules/kassa-carousel.js`
- `app/main.js`
- `sw.js`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `node --check` fuer:
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `sw.js`
- `git diff --check` fuer geaenderte Code- und Roadmap-Dateien.
- Contract-Scan auf verbotene Begriffe im neuen Modul:
  - kein `localStorage`
  - kein `sessionStorage`
  - kein `createState`
  - kein `setItems`
  - kein `listSync`
  - kein `supabase`
  - kein `intent`
  - kein `market://`
  - kein Installationsstatus
- Lokaler Playwright-Smoke ueber `python -m http.server`:
  - Initialzustand `joe`, Position `1 / 4`
  - Weiter-Button wechselt zu `MPREIS`, Position `2 / 4`
  - Zurueck-Button wechselt zurueck zu `joe`, Position `1 / 4`
  - Pfeiltaste rechts wechselt zu `MPREIS`
  - Swipe/Drag wechselt weiter zu `HOFER`, Position `3 / 4`
  - genau ein aktives Item
  - drei `aria-hidden` Items
  - drei inaktive Tabstops
  - ein aktiver Tabstop
  - alle Links bleiben `_blank` und `noopener noreferrer`

Code Review:

- Das neue Modul kapselt nur Karussell-Bedienung und ARIA-Sync.
- `shopping.js`, `state.js`, Supabase und Listen-Sync bleiben unberuehrt.
- `main.js` enthaelt nur die Initialisierung, keine neue Fachlogik.
- `sw.js` bekommt nur die noetige Cache-Referenz fuer das neue Modul.
- Die externe Navigation bleibt in den vorhandenen HTML-Links, nicht in JS-Logik.

Contract Review:

- S4.6 bleibt innerhalb des korrigierten S4-Vertrags: fluechtiger UI-State, keine Persistenz, keine App-Erkennung, keine Deep Links und keine Konfiguration.
- Das Karussell bleibt unterhalb der Shopping-Actions und veraendert weder Liste noch Abschlusslogik.
- Der aktive Eintrag wird bedienbar und im Tabfluss gehalten; inaktive Eintraege bleiben fuer Tastatur und Screenreader ruhig.

Findings:

- S4.6-F1: Der erste Swipe-Smoke wechselte den aktiven Eintrag nicht zuverlaessig, weil Browser-Link-Drag und kleine Buehnenflaechen den Abschluss der Geste stoeren konnten.
- S4.6-F2: Das neue Modul muss im Service-Worker-Cache stehen, sonst kann die PWA nach Installation mit altem App-Shell-Cache ohne Karussell-Verhalten starten.

Korrekturen:

- Pointer Capture und dokumentweiter Pointer-Abschluss ergaenzt.
- Link-Drag auf den vier Karussell-Links deaktiviert.
- `sw.js` um `./app/modules/kassa-carousel.js` erweitert und Cache-Version auf `v29` angehoben.

Restrisiken:

- S4.7 muss das vorhandene Pillbar-CSS in die finale HESTIA-Mini-Fokus-Karussell-Optik umbauen.
- Der echte Android-/PWA-Link-Smoke bleibt fuer S5 bei Stephan, weil Plattformverhalten ausserhalb des lokalen Browser-Smokes liegt.

### S4.7 Ergebnisprotokoll 13.05.2026

Umsetzung:

- Alte Pillbar-Optik in `app/styles/shopping.css` durch eine kleine Fokus-Buehne ersetzt.
- `nav.kassa-carousel` als zentriertes 3-Spalten-Layout aufgebaut:
  - Zurueck-Control
  - aktive Buehne
  - Weiter-Control
- Controls als ruhige runde 44px-Touchflaechen gestaltet.
- Aktive App als kleine noble Plakette in der Mitte gestaltet.
- Vorherige und naechste App werden seitlich nur angedeutet.
- Weitere inaktive App bleibt visuell ausgeblendet.
- Positionsanzeige dezent unterhalb der Buehne belassen.
- `touch-action: pan-y` gesetzt, damit horizontale Karussell-Gesten und vertikales Seitenscrollen sauber zusammenspielen.
- `prefers-reduced-motion: reduce` beruecksichtigt.
- Mobile Breiten, Plakettengroesse und seitliche Nachbarpositionen angepasst.

Betroffene Dateien:

- `app/styles/shopping.css`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `node --check` fuer:
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `sw.js`
- `git diff --check` fuer geaenderte Code- und Roadmap-Dateien.
- `rg`-Scan auf:
  - `kassa-carousel`
  - `prefers-reduced-motion`
  - `touch-action`
  - `pointer-events`
  - `tabindex`
  - `aria-hidden`
- Lokaler Playwright-Layout-Smoke ueber `python -m http.server`:
  - Desktop-Karussell bleibt im Panel
  - Mobile-Karussell bleibt im Panel
  - Karussell sitzt unterhalb der Shopping-Actions
  - Zurueck- und Weiter-Control sind jeweils 44x44px
  - aktive Plakette ist mindestens 44px hoch
  - aktive Marke bleibt `joe`, nicht kuenstlich `JOE`
  - genau ein aktives Item
  - ein vorheriges und ein naechstes Item werden als Nachbarn gefuehrt
  - drei inaktive Items bleiben `aria-hidden`
  - ein aktiver Tabstop, drei inaktive Tabstops
  - Weiter-Button aktualisiert Position auf `2 / 4`

Code Review:

- S4.7 aendert nur Shopping-CSS und Roadmap-Doku.
- Keine JS-, State-, Supabase-, Link- oder Service-Worker-Logik wurde veraendert.
- Die S4.6-Hooks bleiben unveraendert und werden rein visuell uebersetzt.
- Die Karussell-Hierarchie bleibt sekundar unterhalb der Shopping-Actions.

Contract Review:

- S4.7 erfuellt den MIDAS-inspirierten, aber HESTIA-eigenen Zielvertrag: aktiver Fokus, seitlich angedeutete Nachbarn, ruhige Bewegung, keine Portalwirkung.
- Es gibt weiterhin keine App-Erkennung, keine Deep Links, keinen Installationsstatus und keine Konfiguration.
- Touchflaechen und Tabfluss bleiben innerhalb der Roadmap-Grenzen.

Findings:

- S4.7-F1: Die erste CSS-Fassung haette `joe` durch `text-transform: uppercase` visuell zu `JOE` gemacht und damit die Marke unnoetig veraendert.
- S4.7-F2: Der browserseitige Nachweis fuer `prefers-reduced-motion` war ueber Playwright-CSSOM nicht verlaesslich, der statische `rg`-Check bestaetigt die Regel aber eindeutig.

Korrekturen:

- `text-transform: uppercase` entfernt, damit die Linklabels exakt wie im Markup erhalten bleiben.
- `prefers-reduced-motion` statisch im CSS verifiziert und nicht als Browser-CSSOM-Kriterium gewertet.

Restrisiken:

- S4.8 muss im echten Live-Server-Blick noch Hierarchie, Hoehe, Ueberlauf und Textfit auf Desktop und Mobile feinpruefen.
- Android-/PWA-Linkverhalten bleibt weiterhin ein S5-Smoke durch Stephan.

### S4.8 Ergebnisprotokoll 13.05.2026

Umsetzung:

- Desktop-/Mobile-Feinschliff fuer das Kassa-Karussell durchgefuehrt.
- Karussell-Hoehe, Panel-Fit, Touchflaechen, aktive Plakette, Textfit und Ueberlauf auf 320px, 390px und Desktop geprueft.
- Der Track bekam mehr vertikale Luft fuer Fokus-Outline und Offset:
  - Desktop-Track von 58px auf 64px
  - Mobile-Track von 56px auf 62px
  - Buehne von 78px auf 84px
- Keine weitere Hierarchie-Verschaerfung vorgenommen, weil Stephan den S4.7-Stand bereits als nett bestaetigt hat und das Feature sekundar bleiben soll.

Betroffene Dateien:

- `app/styles/shopping.css`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `node --check` fuer:
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `sw.js`
- `git diff --check` fuer geaenderte Code- und Roadmap-Dateien.
- `rg`-Scan auf finale Karussell-Hoehen und Selektoren.
- Lokaler Playwright-Responsive-Smoke ueber `python -m http.server`:
  - 320x740
  - 390x844
  - 1365x768
- Geprueft in allen Viewports:
  - Karussell bleibt im Panel
  - Karussell sitzt unterhalb der Shopping-Actions
  - Karussell-Bottom bleibt im Panel
  - kein horizontaler Ueberlauf
  - aktive Plakette mindestens 44px hoch
  - Zurueck-/Weiter-Control mindestens 44x44px
  - mindestens 10px vertikale Luft zwischen aktiver Plakette und Track
  - aktives Label bleibt `joe`

Code Review:

- S4.8 bleibt ein reiner CSS-/Doku-Feinschliff.
- Keine JS-, Link-, State-, Supabase- oder Service-Worker-Logik wurde veraendert.
- Die Hoehenanpassung ist lokal auf das Kassa-Karussell begrenzt.
- Das Feature bleibt kleiner als Liste und Shopping-Actions.

Contract Review:

- S4.8 erfuellt den Feinschliff-Vertrag: bessere Fokusluft, keine Ueberlaeufe, keine groessere Portalwirkung.
- Keine App-Erkennung, keine Deep Links, kein Installationsstatus und keine Konfiguration eingefuehrt.
- Die Shopping-Hierarchie bleibt: Liste zuerst, Actions danach, Kassahilfe darunter.

Findings:

- S4.8-F1: Die S4.7-Trackhoehe war technisch funktionsfaehig, aber fuer Fokus-Outline plus Outline-Offset zu knapp.

Korrekturen:

- Track- und Buehnenhoehe leicht erhoeht, sodass die aktive Plakette in Desktop und Mobile mindestens 10px vertikale Luft im Track hat.

Restrisiken:

- S4.9 muss als finaler Code-/Contract-Review pruefen, ob S4.1-S4.8 zusammen konsistent sind.
- Android-/PWA-Linkverhalten bleibt weiterhin ein S5-Smoke durch Stephan.

### S4.9 Ergebnisprotokoll 13.05.2026

Umsetzung:

- Finaler Code Review fuer S4.1-S4.8 durchgefuehrt.
- Finaler Contract Review gegen aktiven S4-Vertrag durchgefuehrt.
- Finalen Browser-Smoke fuer Desktop und Mobile ausgefuehrt.
- Ein Touchflaechen-Finding aus dem finalen Smoke korrigiert.
- S4 in der Statusmatrix auf `DONE` gesetzt.

Betroffene Dateien:

- `index.html`
- `app/modules/kassa-carousel.js`
- `app/main.js`
- `app/styles/shopping.css`
- `sw.js`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `node --check` fuer:
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `sw.js`
- `git diff --check` fuer:
  - `index.html`
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `app/styles/shopping.css`
  - `sw.js`
  - `docs/HESTIA Kassa Karussell Roadmap.md`
- Contract-Scan im neuen Modul auf:
  - kein `localStorage`
  - kein `sessionStorage`
  - kein `createState`
  - kein `setItems`
  - kein `listSync`
  - kein `supabase`
  - kein `intent`
  - kein `market://`
  - kein Installationsstatus
- Markdown-Table-Pipe-Scan fuer Roadmap.
- Finaler Playwright-Smoke ueber `python -m http.server`:
  - Desktop 1365x768
  - Mobile 390x844
  - Initialzustand `joe`, Position `1 / 4`
  - Weiter-Button zu `MPREIS`, Position `2 / 4`
  - Zurueck-Button zu `joe`, Position `1 / 4`
  - `End` zu `SPAR`, Position `4 / 4`
  - `Home` zu `joe`, Position `1 / 4`
  - Swipe zu `MPREIS`, Position `2 / 4`
  - genau ein aktives Item
  - ein vorheriges und ein naechstes Item
  - drei `aria-hidden` Items
  - ein aktiver Tabstop, drei inaktive Tabstops
  - alle Links `_blank` und `noopener noreferrer`
  - Karussell bleibt im Panel und unterhalb der Shopping-Actions
  - aktive Plakette und Controls bleiben mindestens 44px hoch/breit

Code Review:

- `index.html` enthaelt nur statisches Markup, statische Play-Store-Links und ehrliche Linklabels.
- `app/modules/kassa-carousel.js` kapselt ausschliesslich fluechtigen UI-State, Bedienung und ARIA-/Tab-Sync.
- `app/main.js` initialisiert nur das Karussell-Modul.
- `app/styles/shopping.css` bleibt der lokale Styling-Owner.
- `sw.js` enthaelt nur die noetige Cache-Referenz und Cache-Versionserhoehung.
- `shopping.js`, `state.js`, Supabase, Router und Listenabschlusslogik bleiben unberuehrt.

Contract Review:

- S4 erfuellt den Roadmap-Vertrag:
  - Kassa-Hilfe unterhalb der Shopping-Actions
  - vier fixe Google-Play-Links
  - echtes kleines Fokus-Karussell statt Pillbar
  - Button-, Keyboard- und Swipe-Bedienung
  - nur aktive Karte im normalen Tabfluss
  - kein Storage, keine App-Erkennung, keine Deep Links, kein Installationsstatus, keine Konfiguration
- Shopping bleibt Liste zuerst; das Karussell bleibt eine kleine Kassahilfe.
- Das Feature wirkt nicht wie ein neuer Hauptmodus oder App-Launcher.

Findings:

- S4.9-F1: Im ersten finalen Smoke unterschritten aktive Karten waehrend der Wechselanimation kurz die 44px-Mindesthoehe, weil die Nachbar-/Zwischen-Skalierung zu klein war.

Korrekturen:

- Karussell-Skalierung von `0.78`/`0.76` auf `0.88` angehoben.
- Finaler Smoke danach bestanden; aktive Plakette und Controls bleiben auch waehrend Wechseln mindestens 44px gross.

Restrisiken:

- S5 muss noch den manuellen Live-Server-/Android-/PWA-Link-Smoke abdecken.
- Externe Google-Play-Zielseiten bleiben ausserhalb der Kontrolle von HESTIA.

## S5 - Tests, Code Review und Contract Review

Ziel:

- Alles pruefen, was lokal sinnvoll pruefbar ist.
- Link-Smokes und mobile Ergonomie sauber von technischer Magie trennen.

Substeps:

- S5.1 `git diff --check` fuer geaenderte Dateien.
- S5.2 `node --check` fuer geaenderte JS-Dateien.
- S5.3 Desktop-Smoke:
  - Shopping startet
  - Liste sichtbar
  - Actions sichtbar
  - Mini-Fokus-Karussell unterhalb der Actions sichtbar und sekundar
  - aktive App ist klar erkennbar
  - Zurueck/Weiter und Pfeiltasten wechseln den aktiven Eintrag
  - keine horizontale Layoutpanne
- S5.4 Mobile-Smoke:
  - Symbol-Touchflaechen mindestens 44px
  - Karussell per Swipe wechselbar
  - aktive Plakette bleibt lesbar
  - keine Ueberlappung mit Liste/Actions
  - Shopping bleibt einhaendig bedienbar
- S5.5 Link-Smoke:
  - vier Links sind vorhanden
  - nur aktive Karte ist im normalen Tabfluss
  - Links oeffnen robuste Google-Play-Ziele
  - Desktop-Verhalten im Browser plausibel
  - Android-/PWA-Linkverhalten durch Stephan manuell testen
- S5.6 Regression:
  - `Im Wagen` toggle
  - `Liste abschliessen`
  - `Aendern`
  - Home/Writing/Shopping Navigation
  - Diagnostics bleibt unberuehrt
- S5.7 Code Review gegen CSS-Owner, JS-Grenzen und Bruchrisiken.
- S5.8 Contract Review gegen README, PRODUCT, Future Roadmaps und Module Overviews.
- S5.9 Schritt-Abnahme und Commit-Empfehlung.

Output:

- Gepruefter Kassa-Karussell-Stand.
- Klare Liste ausgefuehrter Checks.
- Klare Liste manueller Android-/PWA-Smokes fuer Stephan.

Exit-Kriterium:

- Alle lokal moeglichen Checks sind erledigt oder bewusst als nicht verfuegbar markiert.

### S5 Ergebnisprotokoll 13.05.2026

Umsetzung:

- Lokale S5-Checks ausgefuehrt.
- Desktop-, Mobile-, Link-, Regression-, Code- und Contract-Smokes lokal abgedeckt.
- S5 bleibt bis zu Stephans Live-Server-/Android-/PWA-Link-Smoke auf `IN_PROGRESS`.

Betroffene Dateien:

- `docs/HESTIA Kassa Karussell Roadmap.md`

Lokale Checks:

- `node --check` fuer:
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `sw.js`
- `git diff --check` fuer:
  - `index.html`
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `app/styles/shopping.css`
  - `sw.js`
  - `docs/HESTIA Kassa Karussell Roadmap.md`
- Contract-Scan im neuen Modul auf:
  - kein `localStorage`
  - kein `sessionStorage`
  - kein `createState`
  - kein `setItems`
  - kein `listSync`
  - kein `supabase`
  - kein `intent`
  - kein `market://`
  - kein Installationsstatus

Desktop-/Mobile-Smoke:

- Lokaler Playwright-Smoke ueber `python -m http.server`.
- Viewports:
  - Desktop 1365x768
  - Mobile 390x844
- Geprueft:
  - Schreiben legt Testartikel an.
  - Shopping startet und zeigt Testartikel.
  - `Liste abschliessen` ist ohne Warenkorb-Item deaktiviert.
  - Checkbox setzt Artikel in den Wagen.
  - `Liste abschliessen` wird danach aktiv.
  - Abschluss entfernt erledigten Artikel und zeigt `Alles erledigt.`
  - `Aendern` navigiert zu Schreiben.
  - Home-/Shopping-Navigation bleibt intakt.
  - Touchlog-/Diagnostics-Panel bleibt unberuehrt.

Karussell-Smoke:

- Geprueft:
  - Root vorhanden.
  - Initialzustand `jö`, Position `1 / 4`.
  - Weiter-Button zu `MPREIS`, Position `2 / 4`.
  - Zurueck-Button zu `jö`, Position `1 / 4`.
  - Pfeiltaste rechts zu `MPREIS`.
  - Swipe/Drag zu `HOFER`, Position `3 / 4`.
  - genau ein aktives Item.
  - ein vorheriges und ein naechstes Item.
  - drei `aria-hidden` Items.
  - ein aktiver Tabstop, drei inaktive Tabstops.
  - Karussell bleibt im Panel und unterhalb der Shopping-Actions.
  - aktive Plakette und Controls bleiben mindestens 44px gross.

Link-Smoke:

- Statische Linkziele und Attribute geprueft:
  - `https://play.google.com/store/apps/details?id=at.joeclub.app.joecard`
  - `https://play.google.com/store/apps/details?id=at.mpreis.app`
  - `https://play.google.com/store/apps/details?id=de.apptiv.business.android.aldi_at`
  - `https://play.google.com/store/apps/details?id=at.spar.app`
- Alle aktiven Linkzustaende behalten:
  - sichtbaren Text
  - `target="_blank"`
  - `rel="noopener noreferrer"`
  - `title` mit Google-Play-Hinweis
  - `aria-label` mit Google-Play-Hinweis

Code Review:

- Karussell-Code bleibt in `app/modules/kassa-carousel.js` isoliert.
- `shopping.js`, `state.js`, Supabase, Router und Listenabschlusslogik bleiben unberuehrt.
- `app/styles/shopping.css` bleibt lokaler CSS-Owner.
- `sw.js` enthaelt nur Cache-Version und Modulreferenz.

Contract Review:

- Roadmap-Vertrag weiterhin erfuellt:
  - vier fixe Google-Play-Links
  - keine App-Erkennung
  - keine Deep Links
  - kein Installationsstatus
  - kein Storage fuer aktives Symbol
  - keine Konfiguration
  - Shopping bleibt Liste zuerst

Findings:

- S5-F1: Ein Headless-Popup-Smoke fuer echte `_blank`-Oeffnung war nicht verlaesslich, weil Playwright kein `popup`-Event erhielt.
- S5-F2: Ein erster statischer Linkvergleich fiel wegen nicht-ASCII-Vergleich mit `jö` in der Testquelle falsch negativ aus.
- S5-F3: Stephans Live-Server-Test zeigte: Rechtsklick auf die Kassa-App konnte den Google-Play-Link oeffnen, normaler Linksklick aber nicht bequem.
- S5-F4: Die erste Linksklick-Korrektur nutzte eine programmatische Linkoeffnung mit Same-Tab-Fallback. Das war unnoetig, weil das HTML bereits `target="_blank"` und `rel="noopener noreferrer"` enthaelt.
- S5-F5: Pointer-Capture direkt bei `pointerdown` blockierte den normalen Linksklick; der zusaetzliche Mouse-Fallback ueberschrieb spaeter den Pointer-Drag-State und machte Swipe wieder instabil.

Korrekturen:

- Link-Smoke auf stabile DOM-/Attributpruefung umgestellt.
- Nicht-ASCII-Literal nicht mehr als hartes Testkriterium verwendet; sichtbarer Text wird weiterhin als nicht leer geprueft, konkrete ASCII-Labels fuer `MPREIS`, `HOFER`, `SPAR` werden geprueft.
- Programmatische Linkoeffnung entfernt; aktive Kassa-Links nutzen wieder das native Browser-Verhalten aus `target="_blank"` und `rel="noopener noreferrer"`.
- Pointer-Capture wird erst nach echter horizontaler Bewegung gesetzt, nicht mehr beim Antippen.
- Doppelter Mouse-Fallback entfernt; moderne Pointer Events decken Desktop und Touch ab.
- Nach der Korrektur bestanden:
  - aktiver Linksklick oeffnet neuen Tab
  - HESTIA bleibt im Ursprungstab
  - Swipe wechselt weiter sauber
  - Tabflow und ARIA-State bleiben stabil

Offen fuer Stephan:

- Live Server Desktop:
  - Normaler Linksklick auf aktive Kassa-App oeffnet Google Play in neuem Tab.
- Android/PWA:
  - Swipe wechselt sauber.
  - Aktiver Link fuehrt plausibel in Google Play oder Browser.
  - Rueckkehr zu HESTIA fuehlt sich sauber an.
  - Keine Ueberlappung mit Liste oder Aktionen.

Restrisiko:

- Externe Google-Play-Seiten und Android/PWA-Linkhandling bleiben Plattformverhalten und muessen manuell gegengeprueft werden.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Source-of-Truth-Dokus synchronisieren.
- QA aktualisieren.
- Roadmap final abschliessen.
- Commit- und Archiventscheidung dokumentieren.

Substeps:

- S6.1 `docs/modules/Kassa Carousel Module Overview.md` analog der bestehenden Module Overviews neu anlegen.
- S6.2 `docs/modules/Shopping Module Overview.md` aktualisieren und auf die neue Kassa-Carousel-Overview verweisen.
- S6.3 `docs/modules/CSS Module Overview.md` aktualisieren, falls CSS-Owner-Vertrag ergaenzt wurde.
- S6.4 `docs/modules/PWA Install Module Overview.md` oder Touchlog-/Diagnostics-Dokus nur aktualisieren, falls externe Link-/PWA-Hierarchie betroffen ist.
- S6.5 `docs/QA_CHECKS.md` um Kassa-Karussell- und Link-Smokes erweitern.
- S6.6 `docs/future roadmaps.md` nach Abschluss mit `(DONE)` und Archivlink aktualisieren.
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

- Code, Doku, QA und Roadmap sprechen denselben finalen Kassa-Karussell-Vertrag.

Exit-Kriterium:

- Roadmap ist archiviert und commitbereit.

### S6 Ergebnisprotokoll 13.05.2026

Umsetzung:

- `docs/modules/Kassa Carousel Module Overview.md` neu angelegt.
- `docs/modules/Shopping Module Overview.md` um Kassa-Karussell-Vertrag erweitert.
- `docs/modules/CSS Module Overview.md` um Shopping-CSS-Owner fuer das Kassa-Karussell erweitert.
- `docs/modules/PWA Install Module Overview.md` um App-Shell-Cache- und externe-Link-Hinweise erweitert.
- `docs/modules/Touchlog Module Overview.md` um den kleinen `[kassa]`-Eventvertrag erweitert.
- `docs/QA_CHECKS.md` um Kassa-Karussell-, Link-, PWA-Cache- und Touchlog-Smokes erweitert.
- `docs/future roadmaps.md` fuer Roadmap 4 auf `(DONE)` mit Archivlink aktualisiert.
- Roadmap 4 final auf `DONE` gesetzt und ins Archiv verschoben.

Betroffene Dateien:

- `docs/modules/Kassa Carousel Module Overview.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/QA_CHECKS.md`
- `docs/future roadmaps.md`
- `docs/HESTIA Kassa Karussell Roadmap.md`

Checks:

- `node --check` fuer:
  - `app/modules/kassa-carousel.js`
  - `app/main.js`
  - `sw.js`
- `git diff --check` fuer Code-, Doku- und Roadmap-Dateien.
- `rg`-Scan auf absolute MIDAS-/Windows-Pfade.
- `rg`-Scan auf programmatische Linkoeffnung im Karussellmodul.
- `rg`-Scan auf Kassa-Carousel-Dokuanker, QA-Eintraege und Archivlink.

Contract Review:

- Code und Doku stimmen ueberein:
  - genau vier feste Kassa-Links
  - native externe Linkoeffnung ueber HTML-Linkvertrag
  - Button-/Keyboard-/Swipe-Bedienung
  - nur fluechtiger aktiver Index
  - keine App-Erkennung
  - kein Installationsstatus
  - kein Storage fuer aktives Symbol
  - kein Listen-State-Zugriff im Karussell
- Shopping-, CSS-, PWA-, Touchlog- und QA-Dokus beschreiben denselben Schnitt.
- Future Roadmaps markiert Roadmap 4 als abgeschlossen und verweist auf die archivierte Detailroadmap.

Findings:

- S6-F1: Die neue `Kassa Carousel Module Overview.md` war noetig, weil das Karussell technisch zwar im Shopping-Screen sitzt, aber eigenen Markup-, JS-, CSS-, QA- und Touchlog-Vertrag hat.
- S6-F2: Touchlog-Doku musste den neuen `[kassa]`-Prefix kennen, sonst waere die Kategorienliste unvollstaendig.
- S6-F3: PWA-Doku musste den App-Shell-Cache-Hinweis aufnehmen, weil `sw.js` fuer das neue Modul bewusst aktualisiert wurde.

Korrekturen:

- Kassa-Carousel-Overview neu angelegt.
- Shopping-, CSS-, PWA-, Touchlog- und QA-Dokus synchronisiert.
- Future Roadmaps auf DONE und Archivlink vorbereitet.

Restrisiko:

- Externe Google-Play-Seiten bleiben Plattformverhalten und koennen sich ausserhalb von HESTIA aendern.

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

- Shopping zeigt weiter die offene Liste als Hauptinhalt.
- `Liste abschliessen` und `Aendern` bleiben sichtbar und fachlich primaer.
- Kassa-Karussell sitzt unterhalb der Shopping-Actions.
- Genau vier Symbole sind sichtbar oder per kleinem horizontalem Wischen erreichbar.
- Symbole oeffnen die vorgesehenen Google-Play-Ziele.
- Kein Installationsstatus wird angezeigt.
- Keine App-Erkennung wird behauptet.
- Keine Deep-Link-Garantie wird in Copy oder UI versprochen.
- Mobile Touchflaechen bleiben brauchbar.
- Shopping-Liste, Checkboxen, `Im Wagen`, Abschluss und `Aendern` funktionieren unveraendert.
- Home und Writing bleiben optisch und fachlich unberuehrt.
- PWA-/Service-Worker-Verhalten bleibt unveraendert, soweit Roadmap 4 es nicht bewusst beruehrt.

## Abnahmekriterien

- Das Kassa-Karussell ist im richtigen Moment erreichbar: nach dem Einkauf, vor dem Zahlen.
- Es wirkt wie eine kleine Kassahilfe, nicht wie ein App-Launcher.
- Es erzeugt keine neue Verwaltung und keine technische Magie.
- Es ist auf Desktop und Mobile lesbar, tappbar und ruhig.
- Der persoenliche HESTIA-Stil bleibt erhalten.
- Keine neue Feature-Flaeche ausserhalb des Einkaufsmodus wurde eingefuehrt.
