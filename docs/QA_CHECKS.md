# HESTIA QA Checks

Zweck:

- kompakte manuelle Smokechecks fuer den HESTIA-Kern
- Grundlage fuer Regressionen, bevor groessere Features wie Sync oder Push
  dazukommen

---

## 1. Lokaler Kernflow

### Einkauf

- App oeffnet auf Home und zeigt `Einkauf`, `Amazon` und `Muell`.
- Home zeigt zusaetzlich eine leisere `Muell`-Kachel mit kurzer Tickerzeile.
- Wechsel nach `Einkauf` funktioniert und oeffnet den technischen
  `writing`-Screen.
- Produktname kann frei eingegeben werden.
- Semantik zeigt Vorschlaege nach wenigen Buchstaben.
- Einheit wird sinnvoll vorgeschlagen, wenn das Einheitenfeld leer ist.
- Item mit gueltiger Menge laesst sich hinzufuegen.
- Item wird nach bewusstem Submit automatisch freigegeben, wenn Sync
  konfiguriert ist.
- Ungueltige Eingaben zeigen eine ruhige Inline-Notiz und erzeugen kein kaputtes
  Item.
- Item erscheint sofort in der offenen Liste.
- Natuerliche Mengen im Produktnamen erzeugen keine stoerende doppelte
  Default-Meta, z. B. `24 Stueck AA und AAA Batterien`.
- Dezimalmengen werden deutschsprachig angezeigt, z. B. `1,5 l`.
- `Im Wagen` laesst sich in der offenen Papierliste per Checkbox toggeln.
- Einzelnes Item laesst sich loeschen.
- `Loeschen` toggelt die Checkbox nicht mit.
- `Liste abschliessen` entfernt nur markierte Eintraege.
- `Liste abschliessen` ist nur aktiv, wenn mindestens ein Eintrag im Wagen ist.
- `Liste leeren` entfernt alle Grocery-Eintraege.
- Kassa-Karussell sitzt unterhalb der Listenaktionen.

### Amazon

- Wechsel nach `Amazon` funktioniert und oeffnet den technischen
  `amazon`-Screen.
- Produktname kann frei eingegeben werden.
- Item mit gueltiger Menge laesst sich hinzufuegen.
- Amazon-Item erscheint sofort in der Amazon-Liste.
- Amazon-Items erscheinen nicht im normalen Einkauf.
- Grocery-Items erscheinen nicht in Amazon.
- `Bestellt` laesst sich per Checkbox toggeln.
- Einzelnes Amazon-Item laesst sich loeschen.
- `Loeschen` toggelt die Checkbox nicht mit.
- `Bestellte entfernen` entfernt nur als `Bestellt` markierte Amazon-Eintraege.
- `Bestellte entfernen` ist nur aktiv, wenn mindestens ein Amazon-Item bestellt
  markiert ist.
- `Liste leeren` entfernt nur Amazon-Eintraege.
- Leere Amazon-Liste zeigt `Keine Amazon-Eintraege.`.
- Amazon enthaelt kein Kassa-Karussell.
- Es gibt keine Amazon-API, keine Amazon-Produktlinks, keine Preise und kein
  Bestelltracking.

### Alter Shopping-Screen

- Der alte technische `shopping`-Screen bleibt erreichbar, ist aber nicht
  Home-Amazon-Ziel.
- Offene Grocery-Liste wird dort korrekt angezeigt.
- Amazon-Items erscheinen dort nicht.
- `Im Wagen` laesst sich per Zeilentap toggeln.
- Die Checkbox selbst toggelt genau einmal.
- Zeilentap und Checkbox erzeugen keine doppelten Toggle-Events.
- Gekaufte Zeilen bleiben lesbar und sind ruhig als `Im Wagen` erkennbar.
- `Liste abschliessen` entfernt nur markierte Grocery-Eintraege.
- Nicht markierte Grocery-Eintraege bleiben erhalten.
- Amazon-Eintraege bleiben vom alten Shopping-Abschluss unberuehrt.
- `Aendern` fuehrt direkt nach `Einkauf` und bleibt optisch sekundar.
- Leere Grocery-Liste zeigt `Alles erledigt.`.
- Kassa-Karussell sitzt unterhalb von `Liste abschliessen` und `Aendern`.
- Kassa-Karussell zeigt genau `joe`, `MPREIS`, `HOFER`, `SPAR`.
- Zurueck-/Weiter-Buttons wechseln den aktiven Kassa-Eintrag.
- Pfeiltasten wechseln den aktiven Kassa-Eintrag, wenn der Fokus im Karussell
  liegt.
- Swipe/Drag wechselt den aktiven Kassa-Eintrag auf Touch/Mobile.
- Nur die aktive Kassa-Karte ist im normalen Tabfluss.
- Normaler Linksklick auf die aktive Kassa-Karte oeffnet Google Play in einem
  neuen Ziel.
- Kassa-Karussell behauptet keinen Installationsstatus und zeigt keine
  App-Erkennung.

---

## 2. Persistenz lokal

- Nach Reload bleiben offene Eintraege erhalten.
- `Im Wagen`-Status bleibt nach Reload erhalten.
- Nach `Liste leeren` oder `Liste abschliessen` ist der neue Zustand auch nach
  Reload korrekt.

---

## 3. PWA / Offline

- Service Worker registriert sich ohne sichtbaren Fehler.
- Install-Banner erscheint nur, wenn der Browser installierbar meldet.
- App laesst sich offline erneut oeffnen, wenn sie vorher einmal geladen wurde.
- Offline-Fallback erscheint bei Navigationsausfall verstaendlich.
- Offline-Fallback verspricht kein automatisches Wieder-Synchronisieren.

---

## 4. UI / Grundverhalten

- Home wirkt ruhig und nicht wie ein Dashboard.
- Home wirkt wertig und absichtsvoll, nicht wie schnell zusammengestellte
  Web-Karten.
- Home zeigt drei ruhige Kacheln:
  - `Einkauf`
  - `Amazon`
  - `Muell`
- `Einkauf` ist der echte kombinierte Einkaufsfluss.
- `Amazon` ist die echte Amazon-Merkliste.
- `Muell` bleibt Haushaltsperipherie und darf nicht wie eine allgemeine
  Haushaltszentrale wirken.
- Alle drei Home-Kacheln haben dieselbe Grundhoehe.
- Der Muell-Ticker ersetzt statischen Erklaertext und zeigt entweder den
  naechsten Termin oder einen ruhigen Fallback.
- Die grosse Home-Flaeche wirkt bewusst ruhig und nicht unfertig.
- Der kleine Utility-Einstieg ist auffindbar, aber nicht gleichrangig mit den
  zwei Kernpfaden.
- Einkauf bleibt schneller als ein Formular.
- Der alte Shopping-Screen bleibt klar und reduziert, solange er erreichbar ist.
- Kassa-Karussell bleibt sichtbar sekundar und wirkt nicht wie ein App-Launcher.
- Navigation zwischen Home, Einkauf, Amazon, altem Shopping-Screen und
  Muelluebersicht funktioniert ohne Haken.
- Shopping-Zeilen haben unterwegs brauchbare Trefferflaechen.
- Lange Artikelnamen und Mengen ueberlappen nicht.
- Einkauf-Status spricht von Haushaltsfreigabe, nicht von technischem Sync.
- `Liste freigeben`, `Anderen Stand uebernehmen` und `Liste leeren` ueberlappen
  auf Mobile nicht.
- `Liste leeren` ist als destruktiv erkennbar, bleibt aber sekundar.
- Mobile Layout bleibt brauchbar.
- Mobile Home hat keine Titel-, Karten- oder Hint-Ueberlappung.
- Home bleibt mit den relevanten Schrift- und Artstilen lesbar.

---

## 5. CSS-Architektur-Smokes

- App laedt Styling nur ueber `app/app.css`.
- Home, Einkauf, Amazon, alter Shopping-Screen, Devtools und Install-Banner
  sehen nach dem Refaktor nicht sichtbar zerbrochen aus.
- Checkboxen in Einkauf, Amazon und altem Shopping-Screen bleiben klein und
  proportional und werden nicht von globalen Textfeld-Regeln aufgeblasen.
- `surface-button`, `inline-link`, `items` und `item-row` wirken konsistent
  ueber Einkauf, Amazon und alten Shopping-Screen.
- Mobile Home-, Einkauf-, Amazon- und Shopping-Ansicht brechen nicht sichtbar
  durch die neue Import-Reihenfolge.
- Home-spezifische Veredelung bleibt in `app/styles/home.css` verortet und
  erzeugt keine globalen Button-/Token-Seiteneffekte.
- Touchlog-Panel bleibt auf Desktop und Mobil oeffnend und lesbar.
- Install-Banner bleibt in installierter PWA versteckt und im Browser-Kontext
  weiter korrekt steuerbar.
- Neue ES-Module wie das Kassa-Karussell, das Waste-Modul und das Amazon-Modul
  sind im Service-Worker-App-Shell-Cache enthalten.

---

## 6. Sync-Vorbereitung

Diese Checks sind relevant, sobald der erste Supabase-Schritt beginnt:

- App funktioniert weiterhin ohne Supabase-Konfiguration.
- Mit gueltiger Runtime-Config erscheint `Liste freigeben` als Retry/Fallback,
  wenn ein Dirty-, Error- oder Pending-Remote-Zustand besteht.
- Household-Key wird sauber gesetzt.
- Savefehler, lokaler Datenerhalt und ehrlicher Status: [HQA-001](#hqa-001--lokaler-stand-bei-remote-savefehler).
- `list_type` wird fuer Grocery und Amazon gespeichert und geladen.
- Alte oder fehlende `list_type`-Werte erscheinen defensiv als `grocery`.

---

## 7. Realtime-Zusatzchecks

Diese Checks pruefen den aktuellen Snapshot-/Realtime-Vertrag. Robuste parallele
Einkaufskoordination bleibt eine eigene Roadmap:

- Aenderung auf Geraet A erscheint auf Geraet B.
- Eigenes Save erzeugt keine doppelte UI-Aktualisierung.
- Einkauf-, Amazon- und alter Shopping-Abschluss auf Geraet A spiegeln sich auf
  Geraet B korrekt.
- Offline/Reconnect fuehrt nicht zu unklaren Zwischenzustaenden.
- Dirty-State-Schutz, Pending-Hinweis und bewusste destruktive Übernahme
  für Einkauf und Amazon: [HQA-002](#hqa-002--pending-remote-schützt-unfreigegebene-änderungen).

---

## Zwei wiederverwendbare Pilotfälle

Gemeinsamer Kontext für HQA-001/002: konkrete Tests und Produktowner bleiben
HESTIA. Informationsqualität, Dimensionen, Isolation und Aussagegrenzen:
direkt [NOMOS-QA](../../codex-tools/apps/nomos/QA_STANDARDS.md), Revision gemäß
[AGENTS](../AGENTS.md). Diese Definitionen enthalten keine Laufergebnisse.

- Ebene/Methode: manueller Browser-/UI-Flow über Einkauf (`writing`) und
  Amazon; beide Typvarianten getrennt beobachten. State und lokale Persistenz
  sowie sichtbaren Freigabestatus vergleichen, kein bloßer API-Aufruf.
  Der gesamte Snapshot transportiert weiterhin Grocery und Amazon zusammen.
- Isolierte Variante nur hypothetisch: synthetischer lokaler Zustand in einem
  getrennten Browserprofil/-kontext, keine produktiven Credentials und
  kontrollierte Remoteantwort einschließlich Realtime/Initialload. Eine solche
  Umgebung ist nicht als verfügbar nachgewiesen. Ohne diese Voraussetzungen
  nicht als isoliert ausführen; kein Harness ist durch die Definition gegeben.
  Wirkung: eigene lokale Liste, Storage, Dirty-/Pending-State und UI ändern;
  kontrollierte Antworten ersetzen echte Haushaltszugriffe, kein Remote-Write.
  Nachher nur eigenen Kontext/Testzustand entfernen, keine fremden Daten,
  Keys oder Historie leeren. Ausgangs- und erwarteten Endstand vorher festlegen.
- Reale Haushaltsvariante: nur bekannter Haushalt mit passender Konfiguration
  und konkreter Ownerautorität gemäß [PRODUCT][hqa-product] und
  [Setup/Watchlist][hqa-setup]. Zwei Geräte sind bei HQA-002 reale Consumer;
  Reads können sensible Haushaltsdaten offenlegen, Saves den gemeinsamen
  Gesamtsnapshot ändern, Übernahme lokale Änderungen verwerfen. Ein
  `read-only`-Label erteilt keine Lesefreigabe. Fehleranlass, Testeinträge,
  betroffene Geräte und zulässigen Rückweg vorab konkret abdecken; ohne sichere
  Grenze nicht starten. Kein pauschales Haushaltsreset oder Remote-Cleanup.
- Keine Credentialwerte/-teile oder Haushaltsrohdaten in Ausgaben übernehmen.
  Abbruch bei unklarer Isolation/Autorität oder gefährdeter fremder Arbeit;
  nur gedeckten eigenen Zustand bereinigen. Lokaler Kernbetrieb ohne
  Runtime-Credentials bleibt Pflicht; optionaler Sync wird nicht vorausgesetzt.
  [F-03/Runtimebeschreibung][hqa-runtime] ist kein Livebefund: Runtime UNKNOWN,
  Security-Watchlist vom 2026-08-28 OFFEN, Rotation separat owner-gated.
- Aussage nur für beobachtete Variante und Consumer; synthetische Antworten
  belegen keinen Provider-/Gerätepfad. Ergebnisgeltung und Retests besitzt
  [BLUEPRINT][hqa-reviews]. Diese Dokumentadoption führt die Fälle nicht aus.

### HQA-001 — Lokaler Stand bei Remote-Savefehler

Vertrag: Abschnitte 1/2/6 dieser Datei, [State 2/5][hqa-state],
[Sync 5/6][hqa-sync] und Fehlerstatus in [Einkauf][hqa-shopping]/[Amazon][hqa-amazon].
Ausgangslage: bekannte lokale Liste mit getrennten Grocery-/Amazon-Einträgen;
Sync-Savepfad für die gewählte Variante vorbereitet, erwarteter Zielstand nach
der folgenden lokalen Aktion festgehalten. Keine laufende Remote-Übernahme.

Aktion: je Variante einen eigenen Eintrag in Einkauf beziehungsweise Amazon
bewusst absenden; den dadurch vorgesehenen Remote-Save kontrolliert fehlschlagen
lassen (isoliert: vorbereitete Fehlerantwort; real: nur abgedeckter Fehleranlass).
Nach abgeschlossener Fehlerantwort Liste, Status und lokale Persistenz prüfen.

Erwartung: Eintrag erscheint sofort und bleibt mit dem erwarteten lokalen
Listenstand erhalten; der Savefehler rollt die lokale Aktion nicht zurück und
unterbricht den lokalen Flow nicht. Status erklärt alltagssprachlich, dass die
Liste lokal bleibt, und behauptet keine erfolgreiche Haushaltsfreigabe.
`Liste freigeben` bleibt bei konfiguriertem Sync als Retry/Fallback verfügbar.
Abschnitt 2 bleibt maßgeblich für Reloadpersistenz: deren isolierte Probe muss
einen überschreibenden Remote-Initialload ausschließen, statt beides zu vermischen.
Wirkung/Cleanup wie gemeinsamer Kontext; ein fehlgeschlagener Save beweist
keine atomare Remote-Unverändertheit und autorisiert keinen weiteren Retry.

Invalidiert durch Änderungen an lokalem State/Storage, Add-/Savepfad,
Fehler-/Freigabestatus, Typnormalisierung, Initialload oder Snapshotvertrag.

### HQA-002 — Pending Remote schützt unfreigegebene Änderungen

Vertrag: Abschnitt 7 dieser Datei, [State 5–7][hqa-state], [Sync 5–7][hqa-sync],
[Boot 3.4/3.7][hqa-boot] und [Einkauf][hqa-shopping]/[Amazon][hqa-amazon].
Ausgangslage: B hat bekannte lokale unfreigegebene Änderungen, einmal in
Einkauf, einmal in Amazon. Ein unterscheidbarer Remote-Gesamtsnapshot von A
steht für Zustellung bereit. Isoliert sind A/B synthetische Zustände;
ein fehlgeschlagener Save wie in HQA-001 kann den Dirty-State herstellen.
Real gelten vor jedem Zugriff die Grenzen des gemeinsamen Kontexts.

Aktion: Remote-Snapshot während Dirty-State an B zustellen, ohne dort eine
Übernahme anzufordern; lokalen Stand und beide Statusflächen beobachten.
Danach im jeweiligen Bereich ausdrücklich `Anderen Stand uebernehmen` wählen,
nur wenn der lokale Verlust für diese Variante gedeckt ist.

Erwartung: keine stille Überschreibung der lokalen Einkaufs- beziehungsweise
Amazon-Änderungen. Pending Remote zeigt in beiden Bereichen
`Anderer Listenstand verfuegbar...` und bietet die bewusste Übernahme an.
Erst der ausdrückliche Nutzerimpuls übernimmt den Remote-Gesamtsnapshot
bewusst destruktiv und verwirft lokale unfreigegebene Änderungen.
Kein Merge, Undo oder Retentionversprechen; Last-Write-Wins und bestehende
Hard-Delete-Semantik bleiben unverändert. Wirkung/Cleanup wie gemeinsamer
Kontext; Übernahme ist eine lokale Ersetzung, die vorausgehende reale
Bereitstellung auf A kann den gemeinsamen Remotezustand schreiben.

Invalidiert durch Änderungen an Dirty-/Pending-State, Snapshotzustellung,
Boot-/Reconnectpfad, Übernahmeaktion/-copy, Typtrennung oder LWW-Vertrag.

[hqa-product]: ../PRODUCT.md#verbindliche-betriebs--und-secretgrenzen
[hqa-setup]: ../setup-supabase.md#security-watchlist-vom-2026-08-28
[hqa-runtime]: modules/Runtime%20Config%20Module%20Overview.md#6-laufzeitdiagnostik
[hqa-state]: modules/State%20Layer%20Module%20Overview.md
[hqa-sync]: modules/Supabase%20Sync%20Module%20Overview.md
[hqa-shopping]: modules/Shopping%20Module%20Overview.md
[hqa-amazon]: modules/Amazon%20Module%20Overview.md
[hqa-boot]: modules/Bootflow%20Module%20Overview.md
[hqa-reviews]: ../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md#gemeinsame-ausführungs--und-reviewregeln

---

## 8. Touchlog

- Der kleine Utility-Einstieg auf Home oeffnet `Darstellung & Diagnose`.
- `Shift + D` toggelt das Panel ebenfalls.
- Das Panel zeigt `Darstellung` vor `Entwickler`.
- Boot zeigt einen knappen, nachvollziehbaren Start-Trace.
- `Item hinzufuegen`, `Loeschen`, `Liste leeren`, `Liste freigeben`,
  Pending-Remote, Einkauf-, Amazon- und Shopping-Aktionen erscheinen als
  hochwertige Eintraege.
- Kassa-Karussell-Wechsel duerfen als ruhige `[kassa]`-Eintraege erscheinen,
  aber keine Pointer-/Gesture-Details loggen.
- Waste-Kalenderladung darf als ruhiger `[waste]`-Eintrag erscheinen:
  - erfolgreich: `[waste] calendar loaded collections=...`
  - Fehler: `[waste] calendar load failed ...`
- Waste darf keine einzelnen Termine, Collections oder
  Recyclinghof-Minutenstatus ins Touchlog schreiben.
- Realtime-Ereignisse erscheinen als eigene Sync-Eintraege.
- Wiederholte identische Ereignisse werden aggregiert statt gespammt.
- Auf Mobile bleibt das Panel viewport-begrenzt und intern scrollbar; der obere
  Bereich darf nicht aus dem sichtbaren Fenster herausragen.

---

## 9. Diagnostics / Dev

- Die Sektion `Aktuelle Wahl` zeigt nur lokale Darstellungszustaende.
- Default-`Schriftstil` und Default-`Artstil` erscheinen nicht als aktiver
  Diagnosemodus.
- Ohne aktive Stilabweichung zeigt `Aktuelle Wahl` den Default-Hinweis
  `Standardstil aktiv.`.
- Die Sektion `Aktive Diagnosemodi` zeigt aktive Sonderzustaende nur dann, wenn
  wirklich ein Diagnosemodus aktiv ist.
- `No Cache Assets` laesst sich aktivieren und bleibt nach Reload sichtbar
  aktiv.
- `No Cache Assets` laesst sich wieder deaktivieren und verschwindet danach aus
  den aktiven Modi.
- `Touchlog leeren` leert den Log sichtbar und hinterlaesst genau eine kleine
  Diagnosezeile.
- `Dev State zuruecksetzen` setzt nur Dev-/Sandbox-Zustaende zurueck, nicht
  Household-Key oder Produktdaten.
- Nach `Dev State zuruecksetzen` sind `No Cache Assets`,
  Schriftstil-Sonderzustand und Artstil-Sonderzustand wieder auf Default.

---

## 10. Entsorgungsdaten-Pipeline

Diese Checks pruefen nur das Datenfundament. Sichtbare Entsorgungs-UI steht in
Abschnitt 11; Erinnerungen bleiben eine eigene Future-Roadmap.

- Script-Syntax ist gueltig:
  - `node --check scripts/update-waste-calendar.mjs`
- Discovery gegen Axams liefert fuer alle drei Collections Seite `200`, iCal
  `200` und aktuell keinen Fallback:
  - `node scripts/update-waste-calendar.mjs --check-discovery`
- Live-JSON ist parsebar und enthaelt genau drei Collections:
  - `bio-west`
  - `rest-axams-dorf`
  - `gelber-sack-axams-dorf`
- `assets/data/waste-calendar.axams.json` enthaelt:
  - `schemaVersion: 1`
  - `municipality: "Axams"`
  - `source.type: "axams-ical"`
  - `source.pages[]` mit `collectionId`, `pageUrl`, `icalUrl`
  - `collections[].dates[]` mit `date`, `title`, `sourceUid`
- Das JSON enthaelt keine Laufzeit- oder Diagnosefelder:
  - kein `generatedAt`
  - kein `fetchedAt`
  - kein `validUntil`
  - kein `warnings`
  - kein `diagnostics`
  - kein `description`
  - kein `endDate`
- Termine sind je Collection stabil sortiert.
- Doppelte `sourceUid`-Werte oder doppelte Datum/Titel-Paare je Collection
  treten im erzeugten JSON nicht auf.
- Zweiter `node scripts/update-waste-calendar.mjs --write-json`-Lauf erzeugt
  keine inhaltliche Aenderung, wenn die Quellen unveraendert sind.
- Fehlerfall-Smokes pruefen:
  - leerer Feed failt hart
  - fehlender Feed failt hart
  - ungueltiges Datum failt hart
- Workflow-Contract ist statisch erfuellt:
  - `workflow_dispatch`
  - beide Cron-Zeilen
  - `contents: write`
  - `concurrency`
  - `node scripts/update-waste-calendar.mjs --write-json`
  - Diff-Guard auf `assets/data/waste-calendar.axams.json`
  - keine Secrets
  - keine Dependency-Installation
- Keine `.ics`-Rohdaten werden versioniert.
- Home, Einkauf/Writing, Shopping, Supabase und Service Worker bleiben durch
  Roadmap 5A unberuehrt.

Nur auf GitHub pruefbar:

- echter geplanter Schedule-Lauf
- manueller `workflow_dispatch`-Lauf
- Bot-Commit und Bot-Push
- moegliche Branch-Protection- oder Repository-Permission-Blockaden

---

## 11. Entsorgungs-UI

Diese Checks pruefen die sichtbare Muelluebersicht auf Basis des lokalen JSON.

Home:

- Home zeigt `Einkauf`, `Amazon` und `Muell`.
- `Einkauf` ist der echte Einkaufsfluss.
- `Amazon` ist die echte Amazon-Merkliste.
- Die `Muell`-Kachel wirkt wie Haushaltsperipherie und nicht wie ein
  Dashboard-Widget.
- Der Home-Ticker zeigt den naechsten relevanten Termin, z. B. `In 4 Tagen
  Biomuell`.
- Bei fehlendem JSON bleibt der Ticker ruhig, z. B. `Termine gerade nicht
  verfuegbar`.

Navigation:

- Klick auf `Muell` oeffnet `Muelluebersicht`.
- `Zur Startseite` fuehrt zurueck nach Home.
- Ein unbekanntes Router-Ziel deaktiviert keinen aktiven Screen.

Muelluebersicht:

- Titel `Muelluebersicht` ist sichtbar.
- Der naechste Termin ist schnell erfassbar.
- Fraktionen werden angezeigt:
  - Biomuell
  - Restmuell
  - Gelber Sack
- Wohngebietsdetails wie `westlich Axamer Bach` oder `Axams Dorf` erscheinen
  nicht als dauerhafte Familien-UI-Copy.
- Fraktionskarten zeigen Label, naechstes Datum und Hinweis.
- Datumsdetail:
  - heute: volles Datum plus `Heute`
  - morgen: volles Datum plus `Morgen`
  - 2 bis 6 Tage: volles Datum plus `In X Tagen`
  - ab 7 Tage: nur volles Datum

Recyclinghof:

- Status zeigt offen/geschlossen plausibel.
- Montag 13:00-18:00 ist offen.
- Mittwoch 08:00-12:00 und 13:00-17:00 ist offen.
- Mittwoch 12:00-13:00 ist geschlossen.
- Samstag 07:00-12:00 ist offen.
- Nach Fensterschluss wird die naechste regulaere Oeffnung angezeigt.
- Details zeigen nur regulaere Wochenfenster, keine Adresse und keinen
  dauerhaften Sonder-Schliessungen-Hinweis.

Fallbacks:

- Fehlendes oder blockiertes JSON zeigt ruhige Fallbacks.
- Leeres JSON zeigt `Keine Abholtermine im lokalen Kalender.`
- Vergangenes/altes JSON zeigt `Keine kommenden Termine`.
- Knappes JSON zeigt `Daten reichen nur bis ...`.
- Recyclinghof-Status bleibt auch sichtbar, wenn das Termin-JSON nicht geladen
  werden kann.

PWA/Offline:

- `app/styles/waste.css`, `app/modules/waste.js` und
  `assets/data/waste-calendar.axams.json` sind im
  Service-Worker-App-Shell-Cache.
- Nach Erstladung bleibt die Muelluebersicht offline plausibel, soweit der
  Service Worker aktiv ist.
- Die App fragt im Browser keine Axams- oder iCal-Live-Quelle ab.

Nichtziele:

- Keine Push-, Reminder- oder Kalenderlogik.
- Keine Supabase-, Auth-, RLS- oder Household-Key-Aenderung.
- Keine selbst erfundenen Termine.

---

## 12. Definition of Done

- Der lokale HESTIA-Kern besteht alle Checks aus Abschnitt 1 bis 5.
- Neue Features duerfen diese Baseline nicht verschlechtern.
- Sync und Realtime werden erst als stabil betrachtet, wenn auch Abschnitt 6 und
  7 reproduzierbar gruen sind.
- Touchlog bleibt hilfreich und ruhig statt technisch laut zu werden.
- Der Home-Hub bleibt bei genau zwei primaeren Intentionen; Utilities duerfen
  diese Hierarchie nicht aufweichen.
- Dev-/Diagnostics-Hebel bleiben klein, lokal und ohne Eingriff in
  Produktwahrheit.
- Entsorgungsdaten und Entsorgungs-UI bleiben eine ruhige Haushaltsperipherie
  auf Basis des lokalen JSON.

## Lokale Source- und Dokumentchecks

Diese Checks ergänzen die fachliche Basis oben nach betroffenem Scope.
Dokumentänderungen allein erfordern keine Runtime-/Browser-/Datenbankprüfung.
Standardshell ist PowerShell; vor jeder Änderung Dirty-/Indexgrenzen prüfen
und fremde Arbeit bewahren:

```powershell
git status --short --branch
rg -n "Suchbegriff" app docs
rg --files app docs
```

Quellenabdeckung, aktuelle Vertragsbasis und Wiederverwendung von Nachweisen:
direkt [BLUEPRINT Quellen][hqa-sources]. Gemeinsame Technik und Pfadnachweise stehen
in [ATLAS](../../codex-tools/apps/atlas/README.md), keine lokale Versionskopie.
Git/rg dienen lokaler Arbeit, Node gezielten Syntaxchecks, Python dem
[HTTP-Betrieb](modules/Deployment%20Module%20Overview.md#4-lokaler-betrieb),
Playwright bei tatsächlichem Browserbedarf. Deno/Docker/Supabase/gh sind nur
für den konkreten Auftrag relevant, keine automatische Projektdependency.
HESTIA erhält allein für Tests weder Root-`package.json` noch Buildsystem,
Bundler oder automatisch erzeugte Playwrightdateien/Dependencies.

Nach JavaScriptänderungen nur tatsächlich geänderte Dateien und relevante
Producer/Consumer prüfen. Konkrete Beispiele je betroffenem Bereich:

```powershell
node --check app/main.js
node --check app/modules/writing.js
node --check app/modules/amazon.js
node --check app/modules/shopping.js
node --check app/supabase/list-sync.js
node --check sw.js
git diff --check
```

Bei Sync-/Supabase-JavaScript zusätzlich `node --check app/supabase/client.js`
und `node --check app/supabase/list-sync.js`; Datenvertrag, lokale Fallbacks,
Typtrennung und Secretgrenzen prüfen. Nach HTML/CSS/PWA-Änderungen
`git diff --check` und relevanten Browser-/PWA-Smoke ausführen.
Nach Doku-/Roadmapänderungen:

```powershell
git diff --check
rg -n "TODO|BLOCKED|P0|P1" docs\<betroffene-datei>.md
```

PowerShell kann `npm.ps1` blockieren: `npm.cmd` verwenden, technische Aufrufe
stehen in [ATLAS Node/npm][local1].
VS Code nach separat autorisierten PATH-/Tooländerungen vollständig neu starten;
diese Anweisung ist keine Autorisierung für solche Änderungen.

## Browser- und PWA-Prüfumfang

Nur scopeabhängige Fälle aus Abschnitt 1–11 prüfen. Home startet ruhig;
Einkauf, Amazon und Muell öffnen korrekt. Freitext bleibt erlaubt, Menge und
Einheit bleiben optional. Grocery und Amazon bleiben typgetrennt; Abhaken,
Bestellt-Markieren und Abschluss verändern nur den zuständigen Bereich.
Lokale Nutzung ohne Supabase-Konfiguration und ehrlicher Snapshot-/Fehlerstatus
bleiben verpflichtend. Mobile Layouts dürfen nicht überlappen und benötigen
ausreichende Touchziele. Offline-Fallback, Service Worker und Cacheänderungen
müssen dem tatsächlichen Scope entsprechen.

Über HTTP testen; Port/Fallback siehe [Deployment][local2].
Wenn verfügbar zuerst dokumentierten In-App-Browser verwenden, sonst globales
Playwright mit kurz dokumentiertem Grund. Desktop und relevante Mobile-
Viewports in einer gebündelten Session prüfen. Aussagegrenzen direkt
[NOMOS-QA Abschnitt 6][hqa-limits], Retests [BLUEPRINT][hqa-reviews].
Gemeinsamer `playwright.cmd --version` und
gegebenenfalls temporärer `$env:NODE_PATH = npm.cmd root -g` stehen in
[ATLAS Playwright][local3].
Installation beweist keinen Browserpayload oder laufenden Dienst. Service
Worker/Cache bei reinen UI-Smokes bewusst behandeln; bei echten PWA-Smokes
muss der Service Worker Teil des Tests sein.

## CodeRabbit-Route

Gemeinsame Commands/WSL-Shim, datierte Nachweisgrenzen, Dateiscope und
Indexschutz: [ATLAS CodeRabbit][local4].
Geltung, Reihenfolge, Reviewbudget, Findings/Retests und Fehlerdisposition:
[BLUEPRINT-Reviewvertrag][local5].
Die dort erhaltene HESTIA-Code-Roadmappflicht bleibt verbindlich gemäß der
tatsächlich adoptierten Revision; bestehende eingefrorene Roadmaps behalten
ihre Basis. Keine lokale Workflowkopie oder neue Dokumentreviewpflicht.
Fehlender kanonischer Command oder Auth hält den externen Pfad offen;
Wiederherstellung/Login braucht einen eigenen begrenzten Ownerauftrag,
keine alternative CLI installieren. Diese Dokumentmigration startet weder
CodeRabbit noch Authchecks.

[local1]: ../../codex-tools/apps/atlas/docs/WORKSTATION_CAPABILITIES.md#nodejs-und-npm
[local2]: modules/Deployment%20Module%20Overview.md#4-lokaler-betrieb
[local3]: ../../codex-tools/apps/atlas/docs/WORKSTATION_CAPABILITIES.md#playwright
[local4]: ../../codex-tools/apps/atlas/docs/WORKSTATION_CAPABILITIES.md#coderabbit
[local5]: ../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md#coderabbit-geltung-budget-und-fehlerdisposition

[hqa-sources]: ../../codex-tools/docs/blueprint/ROADMAP_AUTHORING_CONTRACT.md#auftrag-kontext-und-quellen
[hqa-limits]: ../../codex-tools/apps/nomos/QA_STANDARDS.md#6-ehrliche-aussagegrenzen-und-consumerabdeckung
