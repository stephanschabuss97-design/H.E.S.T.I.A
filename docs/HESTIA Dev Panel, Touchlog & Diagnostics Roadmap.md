# HESTIA Dev Panel, Touchlog & Diagnostics Roadmap

## Ziel (klar und pruefbar)
Der bestehende HESTIA-Dev-Bereich soll so weiterentwickelt werden, dass Touchlog und Dev-Toggles im Alltag echte Diagnosearbeit erleichtern, ohne HESTIA in eine laute Werkbank zu verwandeln. HESTIA soll dabei bewusst vom MIDAS-Geist lernen, aber nur die wirklich noetigen Diagnose-Werkzeuge uebernehmen.

Pruefbare Zieldefinition:
- HESTIA besitzt einen klaren Dev-/Diagnostics-Vertrag statt nur eines geparkten Panels.
- Dev-Toggles sind lokal, sichtbar, reversibel und fachlich begrenzt.
- Ein `No Cache Assets`-Modus ist sauber definiert, falls er beschlossen wird.
- Touchlog-Eintraege sind kategorisch klar, ruhig und fuer reale HESTIA-Fragen nuetzlich.
- Produktzustand und Dev-Sonderzustand lassen sich jederzeit eindeutig unterscheiden.
- Doku, Touchlog und Dev-UI sprechen dieselben Begriffe und Guardrails.

## Problemzusammenfassung
HESTIA besitzt heute bereits einen brauchbaren Touchlog und einen kleinen Dev-Zugang. Das hat uns bei PWA-, Sync- und CSS-Arbeit real geholfen.

Der aktuelle Zustand ist aber noch eher ein fruehes Diagnose-Fundament als ein ausformulierter Dev-Vertrag:

- Der Dev-Bereich ist vorhanden, aber noch nicht als eigener Produkt-nearer Diagnose-Surface beschrieben.
- Touchlog zeigt hochwertige Ereignisse, besitzt aber noch keinen expliziten Kategorien-/Toggle-Vertrag.
- Fuer CSS-, PWA- und App-Shell-Arbeit fehlt ein klarer `No Cache Assets`-Hebel.
- Es ist noch nicht verbindlich entschieden, welche Dev-Toggles HESTIA ueberhaupt wirklich braucht.

MIDAS zeigt hier einen nuetzlichen Geist:
- Dev-Toggles sind operativ und nicht dekorativ.
- Flags sind lokal und reversibel.
- `No Cache` dient einem realen Frontend-Problem und nicht bloss Technikromantik.
- Touch-Log ist Diagnoseflaeche, nicht Debug-Spam-Friedhof.

Die Roadmap soll also nicht "mehr Dev-Zeug" bauen, sondern HESTIAs kleine Diagnoseflaeche auf einen sauberen, alltagstauglichen Vertrag bringen.

## Relevante Evidence (aktueller Repo-Stand)
- `index.html`
  - enthaelt heute den `Dev`-Button auf Home und das Touchlog-Panel
- `app/core/touchlog.js`
  - verwaltet Logzeilen, Snapshot und Panelsteuerung
- `app/diagnostics/font-presets.js`
  - stilbezogene Umschaltung im Dev-Bereich
- `app/diagnostics/art-style-presets.js`
  - Art-Style-Umschaltung im Dev-Bereich
- `app/core/pwa-install.js`
  - PWA-/Install-Kontext ist heute eine reale Diagnosequelle
- `app/main.js`
  - fuehrt Boot-, Sync- und PWA-Ereignisse bereits ins Touchlog
- `sw.js`
  - App-Shell-Cache ist fuer CSS-/PWA-Arbeit real relevant

## Relevante Vergleichsreferenzen aus MIDAS
- `C:\Users\steph\Projekte\M.I.D.A.S\app\diagnostics\devtools.js`
  - lokale, reversible Dev-Toggles im Touch-Log-Panel
- `C:\Users\steph\Projekte\M.I.D.A.S\docs\modules\Diagnostics Module Overview.md`
  - dokumentierter Diagnose-Vertrag
- `C:\Users\steph\Projekte\M.I.D.A.S\index.html`
  - sichtbare Dev-Toggles im Touch-Log

## Finding-Katalog - MIDAS-Dev-Geist vs. HESTIA-Stand

### F1 - HESTIA hat bereits einen Touchlog, aber noch keinen expliziten Dev-Vertrag

HESTIA:
- Touchlog ist real nuetzlich.
- Der Dev-Bereich ist aber noch eher geparkt als bewusst geschnitten.

MIDAS:
- Touch-Log und Dev-Toggles sind explizit als Diagnoseflaeche gedacht.

Bewertung:
- HESTIA sollte den Diagnose-Surface jetzt bewusst beschreiben, bevor weitere Toggles hinzukommen.

### F2 - `No Cache Assets` waere fuer HESTIA fachlich sinnvoll

HESTIA:
- PWA, Service Worker, App-Shell und CSS-Refaktoren haben mehrfach echte Cache-Probleme oder Cache-Verwechslungen erzeugt.

MIDAS:
- `No Cache` ist dort ein lokaler, reversibler Frontend-Hebel.

Bewertung:
- HESTIA profitiert wahrscheinlich von einem eng geschnittenen `No Cache Assets`-Modus.

### F3 - Dev-Flags muessen klar von Produktwahrheit getrennt bleiben

MIDAS:
- Flags liegen lokal und sichtbar.

HESTIA:
- braucht denselben Grundsatz noch explizit.

Bewertung:
- Dev-Toggles duerfen nie wie versteckte Produktmodi wirken.

### F4 - Touchlog-Qualitaet ist wichtiger als Toggle-Menge

MIDAS:
- die gute Diagnosewirkung kommt nicht von vielen Schaltern, sondern von lesbaren, deduplizierten, ruhigen Logs.

HESTIA:
- ist klein genug, dass zu viele Toggles schnell lauter waeren als das Produkt.

Bewertung:
- erst Log- und Diagnose-Prinzipien festziehen, dann nur wenige operative Toggles zulassen.

## Guardrails
- HESTIA bleibt klein; der Dev-Bereich wird keine generische Debug-Konsole.
- Neue Toggles muessen eine klare reale Diagnosefrage beantworten.
- Dev-Toggles bleiben lokal, reversibel und ohne Einfluss auf den fachlichen Household-Vertrag.
- Touchlog darf helfen, aber nicht technisch laut oder spammy werden.
- Produkt-UI und Dev-Surface muessen klar trennbar bleiben.
- Keine stillen Spezialmodi, die nur der Code kennt.

## Architektur-Constraints
- Kein neues Build-Tooling.
- Keine Remote-Debug-Infrastruktur.
- Dev-Flags bleiben lokal in Browser-/App-Kontexten.
- Touchlog bleibt die zentrale Diagnoseflaeche.
- PWA-, Sync- und CSS-Diagnose sollen dort sichtbar zusammenlaufen, ohne eigene Parallelwelten zu bilden.

## Zielstruktur (Sollbild fuer HESTIA)

Empfohlenes Sollbild:
- `Dev` oeffnet weiter den kleinen Diagnosebereich.
- Linke Spalte:
  - wenige, klar benannte operative Toggles
- rechte Spalte:
  - Touchlog als ruhiger Event-Trace
- moegliche erste Toggle-Kandidaten:
  - `No Cache Assets`
  - optional spaeter `Realtime Off`
  - optional spaeter `Clear Touchlog`
  - optional spaeter `Reset Dev State`

Hinweis:
- Nicht jeder Kandidat muss am Ende gebaut werden.
- Erst der Vertrag, dann die konkrete Toggle-Menge.

## Tool Permissions
Allowed:
- Touchlog-, Devtools- und PWA-Dateien lesen und innerhalb des Scopes aendern.
- Kleine UI-Ergaenzungen im Dev-Panel einfuehren.
- Doku und QA fuer Diagnostics/Dev nachziehen.

Forbidden:
- Unverwandte Produkt-Features unter diesem Scope bauen.
- Grosses Monitoring, Remote-Logging oder Telemetrie einfuehren.
- Feature-Flag-System fuer das ganze Produkt etablieren.

## Execution Mode
- Erst Diagnosevertrag und Lessons Learned festziehen.
- Erst danach konkrete Toggle-Entscheidungen treffen.
- Implementierung erst nach klarer Begrenzung der Dev-Oberflaeche.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Contract-Check oder kleinen Smoke dokumentieren.

## Statusmatrix
| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | MIDAS-Lessons-Learned fuer Dev/Touchlog auf HESTIA uebertragen | DONE | MIDAS-Lektionen sind auf HESTIA geschnitten: operativer Toggle-Scope, Asset-vs-Data-Cache-Trennung, sichtbare Dev-Flags und ruhige Touchlog-Qualitaet sind die echten Transfers. |
| S2 | HESTIA-Dev-Vertrag und erlaubte Toggle-Klassen finalisieren | DONE | HESTIA erlaubt jetzt nur noch klar begrenzte lokale Dev-Hebel: visuelle Sandbox-Schalter, diagnostische Asset-/Shell-Hebel und kleine Diagnosehilfen. `No Cache Assets` ist fachlich auf lokale App-Assets begrenzt und darf keine Sync-/Household-Wahrheit veraendern. |
| S3 | Touchlog- und Dev-UX-Vertrag festziehen | DONE | Touchlog-Kategorien sind jetzt auf `boot`, `pwa`, `sync`, `writing`, `shopping` und `dev` begrenzt. Aktive Dev-Modi muessen als kleine sichtbare Zustandszeile erscheinen; Touchlog selbst bleibt Event-Trace und kein Toggle-Spiegel. `Clear Touchlog` und `Reset Dev State` sind als kleine Hilfsaktionen fachlich zugelassen. |
| S4 | Repo-Umsetzung der beschlossenen Diagnostics-Verbesserungen | DONE | Dev-Panel, aktive Modi, `No Cache Assets`, `Touchlog leeren` und `Dev State zuruecksetzen` sind jetzt repo-seitig umgesetzt. Die Hilfen bleiben lokal und greifen nicht in Household-, Sync- oder Produktzustand ein. |
| S5 | Doku, QA und Abschlussbewertung | DONE | Diagnostics-Doku, QA-Smokes und Guardrails sind jetzt auf dem echten Repo-Stand. HESTIA besitzt damit einen kleinen, dokumentierten und testbaren Dev-/Diagnostics-Surface. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## Schritte + Subschritte

### S1 - MIDAS-Lessons-Learned fuer Dev/Touchlog auf HESTIA uebertragen
- S1.1 MIDAS-Devtools und Diagnostics-Contract gezielt lesen.
- S1.2 Reale MIDAS-Lektionen von reiner MIDAS-Komplexitaet trennen.
- S1.3 Fuer HESTIA festhalten:
  - was nuetzlich ist
  - was unnoetig waere
  - was gefaehrlich laut werden koennte
- S1.4 HESTIA-spezifische Diagnosefragen benennen:
  - Cache/App-Shell
  - PWA-Kontext
  - Sync/Realtime
  - Household-Key / Runtime-Config
- S1.5 Schritt-Abnahme.
- S1.6 Doku-Sync.
- S1.7 Commit-Empfehlung.
- Output: belastbare Lessons-Learned-Karte fuer HESTIA.

#### S1 Checkpoint A - Welche MIDAS-Lektionen fuer HESTIA wirklich relevant sind

Aus MIDAS sinnvoll uebernehmbar:
- Dev-Toggles muessen operativ sein, nicht dekorativ.
- Dev-Flags muessen lokal, reversibel und sichtbar sein.
- `No Cache` ist nur dann sinnvoll, wenn klar begrenzt ist, was davon betroffen ist.
- Touchlog-Qualitaet entsteht durch:
  - deduplizierte Eintraege
  - klare Reasons
  - ruhige Kategorien
  - wenig technische Chatterei
- Der Dev-Bereich ist Diagnoseflaeche, kein Produktmodus.

Begruendung:
- MIDAS ist an der Stelle stark, weil die Dev-Oberflaeche echte Diagnosefragen beantwortet.
- Genau dieser Geist passt zu HESTIA.

#### S1 Checkpoint B - Was HESTIA bewusst nicht aus MIDAS uebernehmen soll

Bewusst nicht sinnvoll fuer HESTIA:
- eine breite Sammlung vieler Toggles
- eine halbe Werkbank voller Spezialschalter
- allgemeines Monitoring oder Debug-Konsole
- Feature-Flags ohne klaren lokalen Diagnosezweck
- ein Dev-Bereich, der den Produktfluss optisch oder fachlich ueberholt

Bewertung:
- HESTIA ist kleiner als MIDAS und sollte das auch im Diagnostics-Surface bleiben.
- Der Transfer darf Prinzipien kopieren, nicht Umfang.

#### S1 Checkpoint C - Reale Diagnosefragen von HESTIA sind jetzt benannt

HESTIA muss im Dev-Bereich heute vor allem vier Arten von Fragen beantworten:

1. App-Shell / Cache
- Kommt die aktuelle CSS-/JS-Version wirklich an?
- Sehe ich ein PWA-/Service-Worker-/Asset-Cache-Problem?

2. PWA-Kontext
- Bin ich im Browser oder in der installierten PWA?
- Warum zeigt oder versteckt sich ein Banner?

3. Sync / Realtime
- Ist ein Problem lokal, remote oder im Household-/Header-Kontext entstanden?
- Kommt eine Aenderung aus Save, Load oder Realtime?

4. Runtime-Config / Household-Key
- Fehlt Konfiguration?
- Ist ein lokaler Wert kaputt oder ungueltig?

Bewertung:
- Diese Fragen sind klein, aber real.
- Ein kuenftiger Dev-Bereich muss genau diese Fragen schneller beantworten.

#### S1 Checkpoint D - Ist-Zustand von HESTIA gegen diese Fragen

Heute bereits gut:
- Touchlog ist vorhanden und real nuetzlich.
- `Dev` ist sichtbar und leicht erreichbar.
- PWA-, Boot- und Sync-Ereignisse werden schon hochwertig geloggt.
- Dedupe-Fenster und Snapshot helfen gegen Spam und gegen fluechtige Diagnose.

Heute noch offen:
- kein expliziter Dev-Vertrag
- kein sauber definierter `No Cache Assets`-Hebel
- keine sichtbare Darstellung aktiver Dev-Modi
- keine kleinen Hilfen wie `Clear Touchlog` oder `Reset Dev State`
- noch kein formal geschnittener Kategorienvertrag fuer das Touchlog

#### S1 Checkpoint E - Lessons-Learned-Fazit fuer den naechsten Schritt

Die wahrscheinlich sinnvollen ersten HESTIA-Kandidaten sind:
- `No Cache Assets`
- optional spaeter `Clear Touchlog`
- optional spaeter `Reset Dev State`

Noch nicht automatisch gesetzt:
- `Realtime Off`

Begruendung:
- `No Cache Assets` beantwortet eine reale HESTIA-Frage.
- `Clear Touchlog` und `Reset Dev State` sind kleine, risikoarme Diagnosehilfen.
- `Realtime Off` ist erst sinnvoll, wenn S2/S3 den Dev-Vertrag enger begrenzen.

#### S1 Checkpoint F - Schritt-Abnahme, Doku-Sync und Commit-Empfehlung

Contract-Check:
- MIDAS-Transfer ist fuer HESTIA jetzt auf Prinzipien reduziert:
  - operative Toggles
  - lokale Sichtbarkeit
  - Asset-vs-Data-Cache-Trennung
  - ruhige Touchlog-Qualitaet
- Reine MIDAS-Breite oder Toggle-Menge ist explizit ausgeschlossen.

Doku-Sync:
- Diese Roadmap traegt jetzt die belastbare Lessons-Learned-Karte fuer HESTIA.
- Weitere Doku muss fuer `S1` nicht getrennt erweitert werden.

Commit-Empfehlung:
- `S1` gehoert logisch mit `S2` zusammen und muss noch nicht separat committed werden.

### S2 - HESTIA-Dev-Vertrag und erlaubte Toggle-Klassen finalisieren
- S2.1 Verbindlich festlegen, welche Toggle-Arten HESTIA ueberhaupt haben darf.
- S2.2 `No Cache Assets` fachlich definieren:
  - was genau beeinflusst wird
  - was bewusst nicht beeinflusst wird
- S2.3 Sichtbarkeit und Reversibilitaet aller Dev-Flags festziehen.
- S2.4 Verhindern, dass Produktzustand und Dev-Zustand verschwimmen.
- S2.5 Schritt-Abnahme.
- S2.6 Doku-Sync.
- S2.7 Commit-Empfehlung.
- Output: klarer HESTIA-Dev-Vertrag.

#### S2 Checkpoint A - Erlaubte Toggle-Klassen sind jetzt verbindlich begrenzt

HESTIA darf kuenftig nur drei kleine Klassen von Dev-Bedienelementen besitzen:

1. Visuelle Sandbox-Schalter
- lokale Stil-/Praesentationstests wie `Schriftstil` oder `Artstil`
- Zweck: UI- und Gestaltungsarbeit schneller pruefen
- Wirkung: nur lokaler Render-/Praesentationskontext

2. Diagnostische Delivery-/Shell-Hebel
- gezielte Hebel fuer App-Shell-, CSS-, JS- oder PWA-Cache-Fragen
- erster realistischer Kandidat: `No Cache Assets`
- Wirkung: nur lokale Asset-Auslieferung / App-Shell-Diagnose

3. Kleine Diagnosehilfen
- keine Produktmodi, sondern Hilfsaktionen fuer den Debug-Kontext
- realistische Kandidaten: `Clear Touchlog`, `Reset Dev State`
- Wirkung: rein lokal und reversibel

Explizit nicht erlaubt:
- Sync-/Household-/RLS-/Datenmodi
- versteckte Produkt-Feature-Flags
- grossflaechige Debug-Konsole
- allgemeines Monitoring oder Remote-Telemetrie

#### S2 Checkpoint B - `No Cache Assets` ist fachlich sauber geschnitten

`No Cache Assets` darf in HESTIA nur eine Frage beantworten:
- "Sehe ich gerade einen alten lokalen App-Shell-/Asset-Stand?"

Davon betroffen sein duerfen:
- lokal gehostete CSS-Dateien
- lokal gehostete JS-Module / App-Shell-Dateien
- lokale Bild-/Icon-/Manifest-nahe Assets, falls sie direkt fuer PWA-/UI-Diagnose relevant sind

Davon bewusst nicht betroffen:
- Supabase-Requests
- Realtime-Verbindungen
- Household-Key, Runtime-Config oder sonstiger Fachzustand
- `localStorage`-Produktdaten
- Browser-/CDN-Fremdressourcen als Produktwahrheit

Begruendung:
- HESTIA braucht Asset-vs-Data-Cache-Trennung.
- Ein breiter "No Cache Everything"-Modus wuerde die Diagnose verwischen.

#### S2 Checkpoint C - Sichtbarkeit und Reversibilitaet sind Teil des Vertrags

Fuer jeden kuenftigen Dev-Flag gilt:
- lokal gespeichert oder lokal gehalten
- im Dev-Bereich sichtbar
- jederzeit wieder ausschaltbar
- bei aktivem Zustand im Touchlog oder Dev-Panel als aktiv erkennbar

Das bedeutet:
- keine stillen Spezialmodi
- keine halb aktiven Flags ohne sichtbare Rueckmeldung
- kein Zustand, den man nur ueber Konsole oder Code noch versteht

#### S2 Checkpoint D - Produktzustand und Dev-Zustand bleiben strikt getrennt

Verbindliche Trennung:
- Produktzustand beschreibt Household-, Listen-, Sync- und UI-Wahrheit fuer den Nutzer.
- Dev-Zustand beschreibt nur lokale Diagnose- oder Sandbox-Hebel.

Konsequenzen:
- Dev-Flags duerfen nicht in fachliche Save-/Load-Entscheidungen eingreifen.
- Dev-Flags duerfen Household-Key oder Sync-Vertrag nicht umdefinieren.
- Dev-Flags duerfen hoechstens Diagnose erleichtern, nie Produktwahrheit verschieben.

Sonderfall bestehende Stilwahl:
- `Schriftstil` und `Artstil` bleiben lokale visuelle Sandbox-Schalter.
- Sie sind bewusst kein Sync- oder Produktvertrag.

#### S2 Checkpoint E - HESTIA-Entscheidungen fuer den naechsten Schritt

Nach `S2` gilt als wahrscheinlicher Zielkorridor:
- bauen:
  - `No Cache Assets`
- wahrscheinlich sinnvoll:
  - `Clear Touchlog`
  - `Reset Dev State`
- noch nicht beschlossen:
  - `Realtime Off`

Bewertung:
- `No Cache Assets` loest eine reale HESTIA-Frage.
- `Clear Touchlog` und `Reset Dev State` sind kleine, risikoarme Hygienehilfen.
- `Realtime Off` bleibt bewusst ausserhalb des Sofortkerns, bis `S3` die Touchlog-/UX-Regeln enger fasst.

#### S2 Checkpoint F - Schritt-Abnahme, Doku-Sync und Commit-Empfehlung

Contract-Check:
- HESTIA besitzt jetzt einen expliziten Dev-Vertrag:
  - klein
  - lokal
  - sichtbar
  - reversibel
  - fachlich begrenzt
- `No Cache Assets` ist sauber von Sync-/Datenwahrheit getrennt.
- Versteckte Produktmodi ueber den Dev-Bereich sind explizit ausgeschlossen.

Doku-Sync:
- Diese Roadmap enthaelt jetzt den fachlichen Toggle-Vertrag.
- Die Modul-Doku muss erst in `S5` auf den final umgesetzten Stand gehoben werden.

Commit-Empfehlung:
- `S2` gehoert logisch direkt zu `S3` und muss noch nicht separat committed werden.

### S3 - Touchlog- und Dev-UX-Vertrag festziehen
- S3.1 Kategorien und Begriffe fuer HESTIA-Touchlog festlegen.
- S3.2 Festlegen, welche Events hochwertig genug fuer den Touchlog sind.
- S3.3 Sichtbaren Umgang mit aktiven Dev-Modi definieren.
- S3.4 Optional entscheiden, ob `Clear Touchlog` und `Reset Dev State` gebraucht werden.
- S3.5 Schritt-Abnahme.
- S3.6 Doku-Sync.
- S3.7 Commit-Empfehlung.
- Output: ruhiger, lesbarer Diagnosevertrag fuer HESTIA.

#### S3 Checkpoint A - HESTIA-Touchlog-Kategorien sind jetzt begrenzt

Der kuenftige Touchlog darf nur diese sichtbaren Kategorien tragen:
- `boot`
- `pwa`
- `sync`
- `writing`
- `shopping`
- `dev`

Bedeutung:
- `boot`: App-Start, Runtime-Initialisierung, Service Worker
- `pwa`: Install-Kontext, Banner, Standalone-/Browser-Abgrenzung
- `sync`: Config, Load, Save, Realtime, Household-nahe Diagnose
- `writing`: schreibende Listenaktionen
- `shopping`: Einkaufsmodus-Aktionen
- `dev`: Aktivierung oder Reset lokaler Dev-Hebel

Explizit nicht als eigene Kategorien vorgesehen:
- `ui`
- `network`
- `perf`
- `cache` als Vollkategorie

Begruendung:
- HESTIA braucht nur wenige, lesbare Diagnoseachsen.
- Feinere Technikbegriffe gehoeren in die Nachricht, nicht in ein wachsendes Kategorien-System.

#### S3 Checkpoint B - Nur hochwertige Events gehoeren in den Touchlog

Der Touchlog soll nur dann eine Zeile bekommen, wenn eine logische Aktion oder ein echter Zustandswechsel stattfindet.

Hochwertige Event-Beispiele:
- Boot startet / endet
- Runtime-Config geladen
- PWA-Kontext bestimmt
- Remote-Snapshot geladen / fehlgeschlagen
- Realtime subscribed / fehlgeschlagen
- manuelles Speichern, Loeschen, Finish-Shopping
- Dev-Flag aktiviert / deaktiviert
- Touchlog geleert / Dev-State zurueckgesetzt

Bewusst nicht hochwertig genug:
- jede DOM-Interaktion
- jedes Panel-Oeffnen
- Pointer-/Scroll-/Hover-Spam
- rohe Netzwerkdetails ohne Diagnosegewinn
- jede Zwischenstufe eines identischen Fehlers

Konsequenz:
- Touchlog bleibt Event-Trace, nicht Aktivitaetsstream.

#### S3 Checkpoint C - Aktive Dev-Modi muessen sichtbar, aber nicht laut sein

Der sichtbare Umgang mit Dev-Modi wird so festgezogen:
- aktive Dev-Modi erscheinen links im Dev-Bereich als kleine sichtbare Zustandszeile oder Badges
- Touchlog bekommt nur Eintraege, wenn ein Dev-Modus wechselt oder zur Diagnose relevant wird
- der Log selbst wird nicht zur zweiten Toggle-Liste

Ziel:
- ein Blick in den Dev-Bereich soll zeigen, welche Sonderzustaende gerade aktiv sind
- der Touchlog soll trotzdem lesbar bleiben

Beispiele:
- `No Cache Assets aktiv`
- `Dev State zurueckgesetzt`
- `Touchlog geleert`

#### S3 Checkpoint D - Kleine Diagnosehilfen sind jetzt fachlich entschieden

Nach `S3` gelten zwei kleine Hilfsaktionen als fachlich sinnvoll:
- `Clear Touchlog`
- `Reset Dev State`

Schnitt:
- `Clear Touchlog` betrifft nur den lokalen Log-Snapshot
- `Reset Dev State` betrifft nur lokale Dev-Flags und visuelle Sandbox-Zustaende

Explizit nicht Teil davon:
- Household-Key loeschen
- Sync-Daten loeschen
- Produktzustand zuruecksetzen

Begruendung:
- Beide Hilfen beantworten reale Diagnoseprobleme.
- Beide bleiben klein und risikoarm.

#### S3 Checkpoint E - Touchlog- und Panel-UX bleiben bewusst ruhig

HESTIA verfolgt fuer den Dev-Bereich diesen UX-Grundsatz:
- links kleine Diagnosehebel und sichtbare aktive Modi
- rechts der ruhige Log-Trace
- keine Werkbank-Optik
- keine Scroll-Hektik durch unnnoetige Chatterei

Der Dev-Bereich soll sich anfuehlen wie:
- eine kleine Diagnoseseite im Produkt

Nicht wie:
- ein technisches Operator-Dashboard

#### S3 Checkpoint F - Schritt-Abnahme, Doku-Sync und Commit-Empfehlung

Contract-Check:
- Kategorien sind klein und stabil begrenzt.
- Nur hochwertige Event-Typen gehoeren in den Touchlog.
- Aktive Dev-Modi muessen sichtbar sein, aber der Log bleibt Event-Trace.
- `Clear Touchlog` und `Reset Dev State` sind fachlich erlaubt und eng geschnitten.

Doku-Sync:
- Die Touchlog-Doku muss den Kategorien- und UX-Vertrag jetzt mittragen.
- Weitere Doku-Synchronisierung kann in `S5` erfolgen.

Commit-Empfehlung:
- `S3` gehoert logisch direkt zu `S4` und muss noch nicht separat committed werden.

### S4 - Repo-Umsetzung der beschlossenen Diagnostics-Verbesserungen
- S4.1 Dev-Panel auf den finalen Vertrag ziehen.
- S4.2 Falls beschlossen, `No Cache Assets` sauber implementieren.
- S4.3 Touchlog-Kategorien, Sichtbarkeit und Hilfsaktionen nachziehen.
- S4.4 Schritt-Abnahme.
- S4.5 Doku-Sync.
- S4.6 Commit-Empfehlung.
- Output: HESTIA besitzt einen kleinen, klaren Dev-/Diagnostics-Surface.

#### S4 Checkpoint A - Dev-Panel-Struktur folgt jetzt dem Vertrag

In der Repo-Umsetzung von `S4.1` soll der Dev-Bereich sichtbar auf den Vertrag gezogen werden:
- Titel und Panel-Schnitt sprechen explizit `Dev & Touchlog`
- linke Spalte zeigt:
  - aktive Modi
  - visuelle Sandbox
- rechte Spalte bleibt der ruhige Log-Trace

Bereits in `S4.1` sinnvoll:
- sichtbare aktive Modi fuer bestehende Sandbox-Zustaende
- stabile Toggle-/Panel-Aria-Zustaende

Noch bewusst nicht Teil von `S4.1`:
- `No Cache Assets`
- `Clear Touchlog`
- `Reset Dev State`
- neue Daten- oder Sync-Hebel

#### S4 Checkpoint B - `No Cache Assets` ist jetzt als enger lokaler Asset-Hebel umgesetzt

In der Repo-Umsetzung von `S4.2` soll `No Cache Assets` genau den zuvor definierten Schnitt bekommen:
- sichtbarer Toggle im Diagnosebereich
- lokales Persistieren des Flags
- sichtbarer aktiver Modus in der linken Dev-Spalte
- Touchlog-Eintrag nur bei Aktivierungswechsel
- Service-Worker-/Reload-Schnitt nur fuer lokale App-Shell- und Asset-Requests

Explizit weiter ausgeschlossen:
- Supabase-/Realtime-/Household-Verhalten
- Runtime-Config- oder Fachzustand
- Produktdaten im `localStorage`

Ziel:
- CSS-/JS-/PWA-Shell-Fragen sollen schneller isolierbar werden, ohne die Sync-Wahrheit zu verwischen.

#### S4 Checkpoint C - Kleine Diagnosehilfen und ruhige Sichtbarkeit sind jetzt nachgezogen

In der Repo-Umsetzung von `S4.3` sollen die beschlossenen Hilfen eng bleiben:
- `Touchlog leeren`
- `Dev State zuruecksetzen`

Schnitt:
- `Touchlog leeren` betrifft nur den lokalen Log-Snapshot
- `Dev State zuruecksetzen` betrifft nur:
  - visuelle Sandbox-Zustaende
  - lokale Dev-Flags wie `No Cache Assets`

Wichtige UX-Regel:
- die aktive Modusliste zeigt nur echte Sonderzustaende
- Default-Stile sind kein aktiver Sonderzustand
- der Touchlog bekommt nur eine kleine Diagnosezeile fuer das Leeren oder Zuruecksetzen

#### S4 Checkpoint D - Schritt-Abnahme

Contract-Check:
- der Dev-Bereich folgt jetzt sichtbar dem zuvor festgezogenen Vertrag
- `No Cache Assets` bleibt auf lokale Shell-/Asset-Diagnose begrenzt
- `Touchlog leeren` und `Dev State zuruecksetzen` bleiben lokal und klein
- aktive Modi werden sichtbar gemacht, ohne den Touchlog in einen Statusspiegel zu verwandeln

Abnahme:
- `S4.1` bis `S4.3` bilden zusammen einen konsistenten kleinen Diagnostics-Surface
- neue Hilfen beruehren keinen Household-Key, keine Sync-Daten und keinen fachlichen Listenvertrag

#### S4 Checkpoint E - Doku-Sync

Fuer den `S4`-Stand muessen mindestens diese Realitaeten in der Doku sichtbar sein:
- das Dev-Panel besitzt jetzt eine aktive Modusliste
- `No Cache Assets` ist als lokaler Asset-/Shell-Hebel vorhanden
- `Touchlog leeren` und `Dev State zuruecksetzen` sind kleine lokale Diagnosehilfen
- Default-Stile sind kein aktiver Sonderzustand

Die detaillierte QA-Synchronisierung bleibt bewusst `S5`.

#### S4 Checkpoint F - Commit-Empfehlung

Empfohlener Commit:
- `feat(devtools): add diagnostics toggles, active modes and local reset helpers`

Begruendung:
- der Scope ist kein Refactor-only-Schnitt mehr
- sondern eine sichtbare Erweiterung des kleinen HESTIA-Diagnostics-Surface

### S5 - Doku, QA und Abschlussbewertung
- S5.1 Modul-Doku fuer Touchlog/Diagnostics und QA nachziehen.
- S5.2 Dev-/Diagnostics-Smokes definieren.
- S5.3 Restrisiken und Guardrails fuer spaetere Toggle-Erweiterungen festhalten.
- S5.4 Schritt-Abnahme.
- S5.5 Doku-Sync.
- S5.6 Commit-Empfehlung.
- Output: dokumentierter und testbarer Dev-Bereich fuer HESTIA.

#### S5 Checkpoint A - Modul-Doku ist jetzt auf dem echten Diagnostics-Schnitt

Fuer den finalen Stand sind jetzt dokumentiert:
- Touchlog als ruhiger Event-Trace
- Dev-Panel als kleiner lokaler Diagnostics-Surface
- aktive Modi
- `No Cache Assets`
- `Touchlog leeren`
- `Dev State zuruecksetzen`

Die relevante Doku liegt jetzt in:
- `docs/modules/Touchlog Module Overview.md`
- `docs/modules/Diagnostics Module Overview.md`

#### S5 Checkpoint B - QA-Smokes sind fuer Diagnostics erweitert

QA deckt jetzt explizit ab:
- aktive Modi nur bei echten Sonderzustaenden
- `No Cache Assets` an/aus ueber Reload
- `Touchlog leeren`
- `Dev State zuruecksetzen`
- keine versehentliche Beruehrung von Household- oder Produktzustand

Begruendung:
- genau diese Randfaelle sind die realen Regressionspunkte des neuen Dev-Surfaces

#### S5 Checkpoint C - Guardrail-Bewertung fuer spaetere Erweiterungen

Die zentrale Guardrail fuer HESTIA bleibt:
- neue Dev-Hebel muessen eine konkrete Diagnosefrage beantworten

Weiterhin nicht gewuenscht:
- Toggle-Sammlung ohne klaren Nutzen
- Sync-/Household-Modi im Dev-Bereich
- Debug-Konsole oder Monitoring-Ausbau
- stille Spezialzustaende ohne sichtbare Rueckmeldung

Erlaubte spaetere Kandidaten bleiben eng:
- `Realtime Off` nur wenn spaeter wirklich fuer Diagnose noetig
- weitere kleine Hygienehilfen nur bei echtem Bedarf

#### S5 Checkpoint D - Schritt-Abnahme

Abnahme:
- der Dev-/Diagnostics-Surface ist jetzt klein, sichtbar und dokumentiert
- Touchlog, aktive Modi und Dev-Hilfen folgen demselben Vertrag
- QA besitzt dafuer eigene manuelle Smokechecks

Bewertung:
- HESTIA hat den MIDAS-Geist hier sinnvoll uebernommen
- aber bewusst auf den kleineren HESTIA-Scope reduziert

#### S5 Checkpoint E - Doku-Sync

Nachgezogen wurden:
- `docs/modules/Diagnostics Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/QA_CHECKS.md`
- `README.md`

#### S5 Checkpoint F - Commit-Empfehlung

Empfohlener Commit:
- `docs(devtools): finalize HESTIA diagnostics contract and QA coverage`

Hinweis:
- Wenn Repo-Umsetzung und Doku zusammen committed werden sollen, bleibt die staerkere Gesamtformulierung aus `S4` weiterhin gut:
  - `feat(devtools): add diagnostics toggles, active modes and local reset helpers`

## Abnahmekriterien
- HESTIA besitzt einen klaren Diagnostics-Vertrag.
- Dev-Toggles sind klein, lokal und nachvollziehbar.
- Cache-/PWA-/Sync-Diagnose wird einfacher statt diffuser.
- Touchlog bleibt ruhig und hochwertig.
- Der Dev-Bereich vergroessert nicht still die Produktkomplexitaet.

## Risiken
- Zu viele Toggles koennten HESTIA lauter machen als nuetzlich.
- Ein unklar definierter `No Cache`-Modus koennte mehr Verwirrung als Diagnosegewinn erzeugen.
- Wenn Dev-Flags nicht sichtbar genug sind, entstehen schwer reproduzierbare Sonderzustaende.
- Wenn Produkt- und Dev-Vertrag vermischt werden, leidet die Alltagsklarheit von HESTIA.
