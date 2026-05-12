# HESTIA Future Roadmaps

Zweck:

- festhalten, welche groesseren Ausbauideen am 09.05.2026 gesammelt wurden
- neuen Chats erklaeren, warum diese Punkte ueberhaupt im Raum stehen
- Scope-Drift vermeiden, indem Nutzen, Timing und Prioritaet sichtbar bleiben

Diese Datei ist keine Umsetzungszusage. Sie ist ein Parkplatz fuer spaetere Roadmaps, damit HESTIA im Alltag wachsen kann, ohne seinen ruhigen Einkaufskern zu verlieren.

## Ausgangspunkt

HESTIA wird bereits im Alltag verwendet und wird als "fein" wahrgenommen. Die naechste Produktfrage ist deshalb nicht, wie moeglichst viele Features eingebaut werden koennen, sondern wie aus einer funktionierenden App ein noch reibungsaermeres und wertigeres Haushaltswerkzeug wird. Der bewusst gewaehlte Bridgerton-/Downton-Abbey-Charakter, besonders die charmante Einkaufsliste, ist Teil der Akzeptanz und soll nicht zugunsten eines generischen SaaS-Looks weggeglattet werden.

Die folgenden Roadmaps sortieren gefundene Verbesserungen von kernnah bis sehr spaet. Roadmap 5, Roadmap 6 und Roadmap 7 sind als Premium-Future-Features gedacht. Roadmap 8 ist Premium Plus und wird wahrscheinlich eher nicht verwendet, solange kein sehr klarer Alltagsnutzen entsteht.

## Roadmap 1 - Einkaufsflow veredeln (DONE)

Status:

- abgeschlossen am 09.05.2026
- abgelegte Detailroadmap: [HESTIA Einkaufsflow Veredeln Roadmap (DONE).md](archive/HESTIA%20Einkaufsflow%20Veredeln%20Roadmap%20(DONE).md)

### 1. Shopping ergonomischer machen

Der Einkaufsmodus wird unterwegs benutzt und ist damit der kritischste Reibungspunkt. Die Papierlisten-Aesthetik soll bleiben, weil sie zur HESTIA-Identitaet und zur Akzeptanz im Haushalt gehoert. Gleichzeitig sollte die moderne App-Ergonomie unter dieser Oberflaeche staerker werden: groessere Trefferflaechen, tapbare Zeilen und klarere Reaktion beim Abhaken. Ziel ist nicht ein neuer Look, sondern ein Einkauf, der sich einhaendig und ablenkungsarm besser anfuehlt.

### 2. Moduswechsel vereinfachen

Der Wechsel zwischen `Schreiben`, `Einkaufen` und Home funktioniert, fuehlt sich aber noch stellenweise wie eine kleine Website-Navigation an. Im Alltag ist der direkte Wechsel zwischen den beiden Kernintentionen wichtiger als der Rueckweg ueber die Startseite. Eine spaetere Roadmap sollte pruefen, ob ein ruhiger direkter Wechsel moeglich ist, ohne den Home-Hub als zeremoniellen Einstieg zu entwerten. Der Home-Screen bleibt dabei weiterhin reduziert und wird nicht zum Dashboard.

### 3. Destruktive Aktionen sauberer hierarchisieren

Aktionen wie `Loeschen`, `Liste leeren` und `Liste abschliessen` haben unterschiedliche Risiken, stehen visuell aber noch relativ nah beieinander. Fuer ein echtes Alltagswerkzeug ist wichtig, dass haeufige sichere Aktionen leicht erreichbar bleiben und riskante Aktionen klarer sekundar oder als destruktiv erkennbar sind. Das reduziert Fehlbedienung, ohne Undo-, Historien- oder Sicherheitsdialog-Komplexitaet einzufuehren. Diese Arbeit gehoert direkt zum Einkaufs- und Listenfluss, weil sie die Systemwahrheit "offen bleibt offen, gekauftes verschwindet" schuetzt.

## Roadmap 2 - Schreiben, Speichern und Listenvertrauen (DONE)

Status:

- abgeschlossen am 12.05.2026
- DONE bestaetigt: Umsetzung, S5-Abnahme, Doku-Sync und Archivierung sind abgeschlossen.
- abgelegte Detailroadmap: [HESTIA Schreiben Speichern Listenvertrauen Roadmap (DONE).md](archive/HESTIA%20Schreiben%20Speichern%20Listenvertrauen%20Roadmap%20(DONE).md)

### 4. Writing weniger formularig machen

Der urspruengliche Writing-Screen war klar, wirkte aber noch wie ein klassisches Formular mit Produkt, Menge, Einheit und Submit-Button. HESTIA sollte sich im Schreiben eher wie "schnell etwas notieren" anfuehlen als wie "Daten erfassen". Umgesetzt wurde eine staerkere Hauptrolle fuer das Produktfeld, waehrend Menge und Einheit dezenter als unterstuetzende Felder bleiben. Freitext bleibt dabei nicht verhandelbar, weil HESTIA kein kontrolliertes Produktkatalog-System werden soll.

### 5. Snapshot-Sync und Save-Gefuehl beruhigen

Der manuelle Save ist fachlich richtig, weil HESTIA nicht bei jedem Tastendruck remote speichern soll. UI-seitig konnte `Liste speichern` aber mentale Last erzeugen: Ist die Liste nur lokal, sieht der Haushalt sie schon, muss ich noch etwas tun? Roadmap 2 hat deshalb den bestehenden Snapshot-Sync-Vertrag geklaert: Add bleibt lokal bis zur bewussten Freigabe, direkte Mutationen folgen dem dokumentierten Shared-Snapshot-Vertrag, und `Last write wins` bleibt als V1-Tradeoff ehrlich beschrieben. Der Button heisst nun `Liste freigeben`, weil sich die Handlung wie eine bewusste Haushaltsfreigabe statt wie ein technischer Speichervorgang anfuehlen soll.

Quelle fuer diese Integration ist die archivierte Legacy-Roadmap [HESTIA Sync Behavior, Conflicts & Status Roadmap (Legacy).md](archive/HESTIA%20Sync%20Behavior,%20Conflicts%20%26%20Status%20Roadmap%20(Legacy).md). Sie wird nicht mehr als parallele aktive Roadmap gefuehrt, sondern als Herkunftsdokument fuer diesen Punkt behandelt.

### 6. Offline- und Reconnect-Ehrlichkeit sichern

HESTIA soll auch bei Netzverlust, Offline-Start und Reconnect ruhig bleiben, ohne eine Offline-Queue oder versteckte Replay-Logik zu versprechen. Lokale Listenarbeit darf moeglich bleiben, aber gemeinsame Speicherung muss klar als gemeinsam gespeichert oder fehlgeschlagen erkennbar sein. Roadmap 2 hat deshalb Save-Fehler, Offline-Fallback-Copy, Dirty-State-Schutz und Pending-Remote bewusst formuliert, damit lokale Arbeit nicht still ueberschrieben wird. Dieser Punkt gehoert zu Roadmap 2, weil er dasselbe Vertrauen schuetzt wie der Save-Status: Der Haushalt soll verstehen, welcher Listenstand wirklich geteilt ist.

Quelle fuer diese Integration ist die archivierte Legacy-Roadmap [HESTIA Offline & Reconnect Reliability Roadmap (Legacy).md](archive/HESTIA%20Offline%20%26%20Reconnect%20Reliability%20Roadmap%20(Legacy).md). Sie wird nicht mehr als eigene aktive technische Roadmap gefuehrt, sondern als Detailquelle fuer diesen Roadmap-2-Vertrag behandelt.

### 7. Listen-Darstellung fachlich glaetten

Strukturierte Felder und natuerliche Sprache konnten sich sichtbar widersprechen, etwa wenn im Produktnamen bereits eine Menge steht und rechts zusaetzlich `1 stk` erschien. Das war kein grosser Architekturfehler, aber ein Alltagsdetail, das Vertrauen in die Liste mindern konnte. Roadmap 2 hat diese Darstellung praesentativ geglaettet: offensichtliche Default-Stueck-Metadaten koennen ausgeblendet werden, wenn der Name bereits eine klare Mengenangabe enthaelt. Ziel bleibt eine ehrliche, lesbare Einkaufsliste, nicht perfekte Datenbereinigung.

## Roadmap 3 - Home und Stil veredeln (DONE)

Status:

- abgeschlossen am 12.05.2026
- DONE bestaetigt: Umsetzung, S5-Abnahme, Doku-Sync und Archivierung sind abgeschlossen.
- abgelegte Detailroadmap: [HESTIA Home Stil Veredeln Roadmap (DONE).md](archive/HESTIA%20Home%20Stil%20Veredeln%20Roadmap%20(DONE).md)

### 8. Home-Kacheln veredeln

Der Home-Hub ist atmosphaerisch stark und soll weiterhin genau zwei primaere Intentionen zeigen: `Schreiben` und `Einkaufen`. Trotzdem konnten die Kacheln noch weniger nach Web-Card und mehr nach wertiger HESTIA-Einstiegstafel wirken. Roadmap 3 hat diese Veredelung CSS-only umgesetzt: mehr Materialitaet, bessere Komposition, leiserer Utility-Einstieg und Mobile-/Font-Preset-Schutz. Kleine Zustandsinformationen wurden bewusst nicht umgesetzt, weil Home nicht nach Dashboard riechen darf.

### 9. Grosse Leere bewusst nutzen

Die grosse Leere ist nicht automatisch ein Problem, sondern Teil der Ruhe und des gewaehlten Stils. Sie sollte nur dort gefuellt werden, wo ein echter Alltagsmoment besser wird. Roadmap 3 hat die Flaeche deshalb nicht befuellt, sondern ueber Rhythmus, Abstaende und eine dezente optische Fuehrung bewusster gemacht. Home selbst wurde nicht aus dem Wunsch nach Flaechennutzung heraus mit allgemeinen Haushaltsinformationen vollgestellt.

## Roadmap 4 - Einkaufsapps und Shopping-Begleiter

### 10. Einkaufsapps als eigenes Shopping-Modul

Loyalty- und Einkaufsapps passen sehr gut zu HESTIA, weil sie direkt im Moment des Einkaufens gebraucht werden. Ein dezentes Modul im Einkaufsfenster koennte Kacheln fuer Hofer, MPreis, Joe, Lidl Plus oder aehnliche Apps anbieten. In einer ersten Version waeren einfache Oeffnen-/Installieren-Links ausreichend; Statuslogik kann spaeter folgen. Wichtig ist, dass dieses Modul den Einkaufsmodus begleitet und nicht den Home-Hub in ein App-Portal verwandelt.

### 11. "Beim Einkaufen"-Kontext staerken

Der Einkaufsmodus koennte langfristig mehr sein als nur Abhaken, ohne gleich ein dritter Kernmodus zu werden. Gemeint ist ein ruhiger Companion-Bereich: Liste oben, darunter kontextnahe Hilfen wie Loyalty-Apps oder spaeter marktnahe Hinweise. Diese Idee passt, weil sie den realen Einkaufsfluss direkt unterstuetzt. Sie darf aber nicht zu einem allgemeinen Marktplatz, Angebotsfeed oder Produktvergleich werden.

### 12. Shopping-Leerflaeche sinnvoll nutzen

Die grosse Flaeche im Einkaufsmodus kann spaeter gezielt fuer Einkaufskontext genutzt werden, wenn die eigentliche Liste dadurch nicht schwerer wird. Dieser Punkt gehoert bewusst nicht in die Home-Roadmap, sondern in den Shopping-Begleiter: dort koennen Einkaufsapps, leise Hinweise oder ein spaeter Companion-Bereich sitzen. Die Flaeche soll keinen Selbstzweck erfuellen und nicht zu Dashboard, Angebotsfeed oder allgemeinem Portal werden. Sie ist nur dann wertvoll, wenn sie den realen Einkauf im Geschaeft ruhiger oder schneller macht.

## Roadmap 5 - Push Awareness als Premium Feature

Detailroadmap: [HESTIA Push Awareness Roadmap.md](HESTIA%20Push%20Awareness%20Roadmap.md)

### 13. Manuellen Awareness-Push vorbereiten

Ein spaeter manueller Push fuer `Einkaufsliste fertig` kann einen echten Haushaltsmoment ersetzen: die kurze Nachricht, dass die Liste bereit ist. Das Feature passt zu HESTIA, wenn es Awareness bleibt und nicht zu Reminder, Chat, Aufgabenlogik oder allgemeinem Notification-System wird. Es braucht deshalb eine eigene Roadmap statt einer kuenstlichen Einordnung in die Haushaltsperipherie. Vor einer Umsetzung muessen Trigger, Copy, Opt-in, Sender-Ausschluss und Delivery-Pfad bewusst geklaert sein, damit Push den ruhigen Listenfluss nicht schwerer macht.

## Roadmap 6 - Realtime Shopping Collaboration als Premium Feature

### 14. Parallel einkaufen koennen

Der Gedanke, dass zwei Personen im selben Markt unterschiedliche Gaenge uebernehmen und live sehen, was der andere bereits gefunden hat, passt sehr gut zum realen HESTIA-Alltag. Das waere echter Haushaltsnutzen: weniger Zurufen, weniger doppelte Wege, weniger "hast du das schon?" im Geschaeft. Gleichzeitig passiert dieser Fall vermutlich selten genug, dass die noetige mentale und technische Last nicht in die naechsten Kernroadmaps gehoert. Diese Roadmap wird deshalb als Premium-Future-Feature gefuehrt und erst angegangen, wenn Snapshot-Sync, Konfliktregeln und Zwei-Geraete-QA bewusst designed werden.

### 15. Abschlussregeln fuer paralleles Einkaufen haerten

Bei einem gemeinsamen Einkauf ist `Liste abschliessen` nicht mehr nur eine lokale Abschlussgeste. Wenn Person A abschliesst, waehrend Person B gerade einen anderen Gang bearbeitet, muss HESTIA eindeutig und ruhig bleiben. Eine spaetere Realtime-Roadmap muss deshalb klaeren, ob Abschluss sofort remote wirkt, ob es Schutz gegen veraltete Snapshots braucht und wie sichtbar Remote-Aenderungen im Papierlistenstil sein sollen. Ziel waere ein vertrauenswuerdiger gemeinsamer Einkaufsmodus, nicht ein hektisches Kollaborationsboard.

## Roadmap 7 - Haushaltsperipherie als Premium Feature

### 16. Sanfte Organizer-Peripherie vorbereiten

HESTIA koennte mit der Zeit ein wenig Richtung Haushaltshelfer wachsen, solange der Einkaufskern sichtbar geschuetzt bleibt. Die richtige Form waere eine leise Peripherie, nicht ein gleichrangiger Familien-Organizer. Premium bedeutet hier: spaeter, bewusst, klar begrenzt und nur fuer Dinge, die dem Haushalt wirklich Ruhe bringen. Diese Schicht darf niemals die zwei Kernintentionen `Schreiben` und `Einkaufen` ueberholen.

### 17. Familienhinweise und Geburtstage

Familienhinweise und Geburtstage sind im Haushalt nuetzlich, aber sie liegen deutlich ausserhalb des aktuellen Einkaufsflusses. Deshalb werden sie als Premium-Future-Feature behandelt und nicht in die naechsten Kernroadmaps gezogen. Falls sie spaeter kommen, sollten sie charmant, selten und sekundar bleiben, etwa als ruhiger Hinweisbereich statt als Aufgaben- oder Kalenderlogik. Diese Idee ist bewusst geparkt, damit HESTIA nicht unbemerkt zur Familienzentrale wird.

### 18. Recyclinghof und Muelltage

Recyclinghof und Muelltage liegen naeher am praktischen Haushalt als Geburtstage, bringen aber schnell Kalender-, Reminder- und Standortfragen mit. Ein Recyclinghof-Hinweis mit Oeffnungszeiten waere noch relativ leichtgewichtig, waehrend Muelltage sofort in wiederkehrende Erinnerung und Push-Logik kippen koennen. Deshalb gehoert dieser Punkt ebenfalls in die Premium-Peripherie und nicht in den Einkaufskern. Wenn er spaeter angegangen wird, sollte zuerst ein rein informativer, nicht draengender Ansatz geprueft werden.

## Roadmap 8 - Kontextautomation als Premium Plus

### 19. Standortbasierte Sortierung

Die Idee "du bist bei Hofer, also rueckt Hofer nach vorne" ist nachvollziehbar, aber technisch und produktseitig schwerer als der unmittelbare Nutzen vermuten laesst. Geolocation bringt Berechtigungen, Datenschutz, Fehlpositionierungen und neue Diagnosefaelle in eine App, deren Kern bewusst ruhig ist. Deshalb wird dieser Punkt als Premium Plus gefuehrt und wahrscheinlich nicht verwendet, solange der Einkaufsapp-Launcher nicht nachweislich im Alltag gebraucht wird. Falls er je umgesetzt wird, muss er optional, lokal verstaendlich und ohne Abhaengigkeit fuer den Kernfluss bleiben.

## Prioritaetsnotiz

Naechste sinnvolle Arbeit bleibt kernnah:

1. Einkaufsflow veredeln.
2. Schreiben, Speichern und Listenvertrauen.
3. Home und Stil veredeln.
4. Einkaufsapps und Shopping-Begleiter als Shopping-nahe Erweiterung.
5. Push Awareness nur als eigenes Premium-Future-Feature.
6. Realtime Shopping Collaboration nur als Premium-Future-Feature.
7. Haushaltsperipherie nur als Premium-Future-Feature.
8. Kontextautomation nur als Premium Plus und eher nicht.

Roadmap 1 und 2 sind bereits abgeschlossen. Diese Reihenfolge schuetzt HESTIA weiterhin davor, durch interessante Ideen schwerer zu werden, bevor der vorhandene Alltagsfluss wirklich poliert ist.
