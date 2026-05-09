# HESTIA Future Roadmaps

Zweck:

- festhalten, welche groesseren Ausbauideen am 09.05.2026 gesammelt wurden
- neuen Chats erklaeren, warum diese Punkte ueberhaupt im Raum stehen
- Scope-Drift vermeiden, indem Nutzen, Timing und Prioritaet sichtbar bleiben

Diese Datei ist keine Umsetzungszusage. Sie ist ein Parkplatz fuer spaetere Roadmaps, damit HESTIA im Alltag wachsen kann, ohne seinen ruhigen Einkaufskern zu verlieren.

## Ausgangspunkt

HESTIA wird bereits im Alltag verwendet und wird als "fein" wahrgenommen. Die naechste Produktfrage ist deshalb nicht, wie moeglichst viele Features eingebaut werden koennen, sondern wie aus einer funktionierenden App ein noch reibungsaermeres und wertigeres Haushaltswerkzeug wird. Der bewusst gewaehlte Bridgerton-/Downton-Abbey-Charakter, besonders die charmante Einkaufsliste, ist Teil der Akzeptanz und soll nicht zugunsten eines generischen SaaS-Looks weggeglattet werden.

Die folgenden Roadmaps sortieren gefundene Verbesserungen von kernnah bis sehr spaet. Roadmap 5 ist als Premium-Future-Feature gedacht. Roadmap 6 ist Premium Plus und wird wahrscheinlich eher nicht verwendet, solange kein sehr klarer Alltagsnutzen entsteht.

## Roadmap 1 - Einkaufsflow veredeln

### 1. Shopping ergonomischer machen

Der Einkaufsmodus wird unterwegs benutzt und ist damit der kritischste Reibungspunkt. Die Papierlisten-Aesthetik soll bleiben, weil sie zur HESTIA-Identitaet und zur Akzeptanz im Haushalt gehoert. Gleichzeitig sollte die moderne App-Ergonomie unter dieser Oberflaeche staerker werden: groessere Trefferflaechen, tapbare Zeilen und klarere Reaktion beim Abhaken. Ziel ist nicht ein neuer Look, sondern ein Einkauf, der sich einhaendig und ablenkungsarm besser anfuehlt.

### 2. Moduswechsel vereinfachen

Der Wechsel zwischen `Schreiben`, `Einkaufen` und Home funktioniert, fuehlt sich aber noch stellenweise wie eine kleine Website-Navigation an. Im Alltag ist der direkte Wechsel zwischen den beiden Kernintentionen wichtiger als der Rueckweg ueber die Startseite. Eine spaetere Roadmap sollte pruefen, ob ein ruhiger direkter Wechsel moeglich ist, ohne den Home-Hub als zeremoniellen Einstieg zu entwerten. Der Home-Screen bleibt dabei weiterhin reduziert und wird nicht zum Dashboard.

### 3. Destruktive Aktionen sauberer hierarchisieren

Aktionen wie `Loeschen`, `Liste leeren` und `Liste abschliessen` haben unterschiedliche Risiken, stehen visuell aber noch relativ nah beieinander. Fuer ein echtes Alltagswerkzeug ist wichtig, dass haeufige sichere Aktionen leicht erreichbar bleiben und riskante Aktionen klarer sekundar oder als destruktiv erkennbar sind. Das reduziert Fehlbedienung, ohne Undo-, Historien- oder Sicherheitsdialog-Komplexitaet einzufuehren. Diese Arbeit gehoert direkt zum Einkaufs- und Listenfluss, weil sie die Systemwahrheit "offen bleibt offen, gekauftes verschwindet" schuetzt.

## Roadmap 2 - Schreiben schneller machen

### 4. Writing weniger formularig machen

Der aktuelle Writing-Screen ist klar, wirkt aber noch wie ein klassisches Formular mit Produkt, Menge, Einheit und Submit-Button. HESTIA soll sich im Schreiben eher wie "schnell etwas notieren" anfuehlen als wie "Daten erfassen". Eine spaetere Iteration kann das Produktfeld staerker als Hauptaktion behandeln und Menge/Einheit dezenter, optionaler oder chip-artiger fuehren. Freitext bleibt dabei nicht verhandelbar, weil HESTIA kein kontrolliertes Produktkatalog-System werden soll.

### 5. Sync-Sprache und Save-Gefuehl beruhigen

Der manuelle Save ist fachlich richtig, weil HESTIA nicht bei jedem Tastendruck remote speichern soll. UI-seitig kann `Liste speichern` aber mentale Last erzeugen: Ist die Liste nur lokal, sieht der Haushalt sie schon, muss ich noch etwas tun? Eine spaetere Roadmap sollte die Sprache und Statusanzeige so klaeren, dass der gemeinsame Zustand sofort vertrauenswuerdig wirkt. Der Button darf technisch weiterhin manuell bleiben, sollte sich aber eher wie eine bewusste Haushaltsfreigabe als wie ein technischer Speichervorgang anfuehlen.

### 6. Listen-Darstellung fachlich glaetten

Strukturierte Felder und natuerliche Sprache koennen sich heute sichtbar widersprechen, etwa wenn im Produktnamen bereits eine Menge steht und rechts zusaetzlich `1 stk` erscheint. Das ist kein grosser Architekturfehler, aber ein Alltagsdetail, das Vertrauen in die Liste mindern kann. Eine spaetere Iteration sollte pruefen, wie Menge und Einheit dargestellt werden, wenn der Name bereits stark semantisch formuliert ist. Ziel ist eine ehrliche, lesbare Einkaufsliste, nicht perfekte Datenbereinigung.

## Roadmap 3 - Home und Stil veredeln

### 7. Home-Kacheln veredeln

Der Home-Hub ist atmosphaerisch stark und soll weiterhin genau zwei primaere Intentionen zeigen: `Schreiben` und `Einkaufen`. Trotzdem koennen die Kacheln noch weniger nach Web-Card und mehr nach wertiger HESTIA-Einstiegstafel wirken. Kleine Zustandsinformationen wie "1 Eintrag offen" koennten spaeter helfen, muessen aber sehr leise bleiben. Sobald Home nach Dashboard riecht, ist die Grenze dieser Roadmap ueberschritten.

### 8. Grosse Leere bewusst nutzen

Die grosse Leere ist nicht automatisch ein Problem, sondern Teil der Ruhe und des gewaehlten Stils. Sie sollte nur dort gefuellt werden, wo ein echter Alltagsmoment besser wird. Besonders im Shopping-Screen kann die Flaeche spaeter kontextnah genutzt werden, etwa fuer einen Einkaufsbegleiter oder App-Launcher. Home selbst sollte nicht aus dem Wunsch nach Flaechennutzung heraus mit allgemeinen Haushaltsinformationen vollgestellt werden.

## Roadmap 4 - Einkaufsapps-Modul

### 9. Einkaufsapps als eigenes Shopping-Modul

Loyalty- und Einkaufsapps passen sehr gut zu HESTIA, weil sie direkt im Moment des Einkaufens gebraucht werden. Ein dezentes Modul im Einkaufsfenster koennte Kacheln fuer Hofer, MPreis, Joe, Lidl Plus oder aehnliche Apps anbieten. In einer ersten Version waeren einfache Oeffnen-/Installieren-Links ausreichend; Statuslogik kann spaeter folgen. Wichtig ist, dass dieses Modul den Einkaufsmodus begleitet und nicht den Home-Hub in ein App-Portal verwandelt.

### 10. "Beim Einkaufen"-Kontext staerken

Der Einkaufsmodus koennte langfristig mehr sein als nur Abhaken, ohne gleich ein dritter Kernmodus zu werden. Gemeint ist ein ruhiger Companion-Bereich: Liste oben, darunter kontextnahe Hilfen wie Loyalty-Apps oder spaeter marktnahe Hinweise. Diese Idee passt, weil sie den realen Einkaufsfluss direkt unterstuetzt. Sie darf aber nicht zu einem allgemeinen Marktplatz, Angebotsfeed oder Produktvergleich werden.

## Roadmap 5 - Haushaltsperipherie als Premium Feature

### 11. Sanfte Organizer-Peripherie vorbereiten

HESTIA koennte mit der Zeit ein wenig Richtung Haushaltshelfer wachsen, solange der Einkaufskern sichtbar geschuetzt bleibt. Die richtige Form waere eine leise Peripherie, nicht ein gleichrangiger Familien-Organizer. Premium bedeutet hier: spaeter, bewusst, klar begrenzt und nur fuer Dinge, die dem Haushalt wirklich Ruhe bringen. Diese Schicht darf niemals die zwei Kernintentionen `Schreiben` und `Einkaufen` ueberholen.

### 12. Familienhinweise und Geburtstage

Familienhinweise und Geburtstage sind im Haushalt nuetzlich, aber sie liegen deutlich ausserhalb des aktuellen Einkaufsflusses. Deshalb werden sie als Premium-Future-Feature behandelt und nicht in die naechsten Kernroadmaps gezogen. Falls sie spaeter kommen, sollten sie charmant, selten und sekundar bleiben, etwa als ruhiger Hinweisbereich statt als Aufgaben- oder Kalenderlogik. Diese Idee ist bewusst geparkt, damit HESTIA nicht unbemerkt zur Familienzentrale wird.

### 13. Recyclinghof und Muelltage

Recyclinghof und Muelltage liegen naeher am praktischen Haushalt als Geburtstage, bringen aber schnell Kalender-, Reminder- und Standortfragen mit. Ein Recyclinghof-Hinweis mit Oeffnungszeiten waere noch relativ leichtgewichtig, waehrend Muelltage sofort in wiederkehrende Erinnerung und Push-Logik kippen koennen. Deshalb gehoert dieser Punkt ebenfalls in die Premium-Peripherie und nicht in den Einkaufskern. Wenn er spaeter angegangen wird, sollte zuerst ein rein informativer, nicht draengender Ansatz geprueft werden.

## Roadmap 6 - Kontextautomation als Premium Plus

### 14. Standortbasierte Sortierung

Die Idee "du bist bei Hofer, also rueckt Hofer nach vorne" ist nachvollziehbar, aber technisch und produktseitig schwerer als der unmittelbare Nutzen vermuten laesst. Geolocation bringt Berechtigungen, Datenschutz, Fehlpositionierungen und neue Diagnosefaelle in eine App, deren Kern bewusst ruhig ist. Deshalb wird dieser Punkt als Premium Plus gefuehrt und wahrscheinlich nicht verwendet, solange der Einkaufsapp-Launcher nicht nachweislich im Alltag gebraucht wird. Falls er je umgesetzt wird, muss er optional, lokal verstaendlich und ohne Abhaengigkeit fuer den Kernfluss bleiben.

## Prioritaetsnotiz

Naechste sinnvolle Arbeit bleibt kernnah:

1. Einkaufsflow veredeln.
2. Schreiben schneller und weniger formularig machen.
3. Home und Stil veredeln.
4. Einkaufsapps-Modul als Shopping-nahe Erweiterung.
5. Haushaltsperipherie nur als Premium-Future-Feature.
6. Kontextautomation nur als Premium Plus und eher nicht.

Diese Reihenfolge schuetzt HESTIA davor, durch interessante Ideen schwerer zu werden, bevor der vorhandene Alltagsfluss wirklich poliert ist.
