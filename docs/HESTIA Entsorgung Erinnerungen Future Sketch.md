# HESTIA Roadmap 5C - Entsorgung Erinnerungen Future Sketch

Status:

- Future Sketch, keine aktive Umsetzungsroadmap.
- Baut fachlich auf Roadmap 5A `Entsorgung Datenfundament` und Roadmap 5B `Entsorgung UI` auf.
- Darf erst konkretisiert werden, wenn Datenfundament und UI im Alltag geprueft sind.

## Idee

HESTIA koennte spaeter sehr sanfte Entsorgungs-Erinnerungen bekommen. Gemeint ist nicht ein allgemeines Reminder-System, sondern ein kleiner Haushaltsimpuls: Wenn morgen Biomuell, Restmuell oder Gelber Sack ansteht, darf HESTIA das ruhig sichtbar machen oder optional per Push melden.

Der Nutzen waere real, weil Muelltermine leicht vergessen werden und Feiertagsverschiebungen nicht intuitiv sind. Gleichzeitig ist genau hier Scope-Drift gefaehrlich: Aus "morgen Biomuell" darf kein Kalender, kein Aufgabenboard und kein Push-Spam entstehen.

## Voraussetzung

Roadmap 5C setzt voraus:

- Roadmap 5A liefert ein verlaessliches lokales JSON.
- Roadmap 5B zeigt Termine und Recyclinghof-Status ruhig und korrekt an.
- Die UI hat im Alltag gezeigt, welche Hinweise wirklich gebraucht werden.
- Push Awareness aus Roadmap 5 ist fachlich geklaert oder bereits umgesetzt.

Ohne diese Voraussetzungen bleibt Roadmap 5C geparkt.

## Moeglicher Zielzustand

HESTIA kann spaeter:

- auf Home eine leise Badge zeigen:
  - `Morgen Biomuell`
  - `Heute Restmuell`
  - `Gelber Sack in 2 Tagen`
- im Entsorgungsmodus eine klare Vorabend-Zeile zeigen:
  - `Morgen ab 7:00 bereitstellen`
- optional einen manuellen oder konfigurierten Push am Vorabend senden.
- keine Erinnerung senden, wenn Terminlage unklar oder Daten alt sind.

## Nicht gemeint

- Kein allgemeines Reminder-System.
- Kein Familienkalender.
- Keine Aufgabenliste.
- Keine wiederkehrenden frei konfigurierbaren Erinnerungen.
- Keine Eskalation, Snooze-Logik oder "ueberfaellig"-Druck.
- Keine Benachrichtigungen fuer jeden Recyclinghof-Oeffnungstag.
- Keine Pushes ohne bewusste Entscheidung.
- Keine Standortlogik.

## Produktvertrag

Die Copy bleibt ruhig:

- Gut:
  - `Morgen Biomuell`
  - `Heute Restmuell`
  - `Ab 7:00 bereitstellen`
- Nicht gut:
  - `Du musst den Biomuell rausstellen`
  - `Achtung! Restmuell faellig`
  - `Verpasst`

Normale Termine sind keine Alarme. HESTIA informiert, sie tadelt nicht.

## Technischer Ansatz

Roadmap 5C sollte keine neue Terminquelle einfuehren. Sie nutzt ausschliesslich das JSON aus Roadmap 5A und die Anzeige-/Datumslogik aus Roadmap 5B.

Moegliche Schichten:

- Home-Badge:
  - rein lokal berechnet
  - kein Push noetig
  - gute erste Erweiterung
- Entsorgungsmodus-Hinweis:
  - zeigt Vorabend-/Heute-Zustand
  - bleibt ohne Notification Permission nutzbar
- Push:
  - nur wenn Roadmap 6 Push Awareness stabil ist
  - Opt-in
  - kein Sender-/Empfaenger-Konzept wie Shopping-Push noetig, falls lokal pro Geraet
  - keine Pushes bei alten oder unklaren Daten

## Offene Designfragen

- Soll es ueberhaupt Push geben oder reicht eine Home-Badge?
- Soll der Hinweis am Vortag oder nur am Abholtag erscheinen?
- Soll Biomuell, Restmuell und Gelber Sack gleich behandelt werden?
- Soll HESTIA bei alten Daten schweigen oder eine ruhige Datenwarnung zeigen?
- Soll jedes Geraet lokal entscheiden oder gibt es einen gemeinsamen Household-Status?
- Wie wird verhindert, dass Push Awareness und Entsorgungs-Erinnerungen zusammen zu laut werden?

## Roadmap-C-Schnitt, falls sie spaeter aktiv wird

Wenn diese Skizze spaeter zu einer aktiven Roadmap wird, sollte sie vermutlich so geschnitten werden:

1. S1 bis S3:
   - Roadmap 5A/B lesen
   - Roadmap 6 Push-Vertrag lesen
   - Produktvertrag gegen Reminder-Scope pruefen
   - Copy Review sehr streng machen
2. S4:
   - zuerst nur Home-Badge und Entsorgungsmodus-Hinweis
   - Push nur als eigener Substep oder eigene Folgeroadmap
3. S5:
   - Datumsrandfaelle testen
   - alte Daten testen
   - kein Push bei unklaren Daten testen
   - mobile Home-Hierarchie testen
4. S6:
   - Waste Module Overview, Home Overview, Push Overview und QA synchronisieren

## Abbruchkriterium

Wenn Roadmap 5B im Alltag bereits reicht, wird Roadmap 5C nicht umgesetzt. Ein sichtbarer Entsorgungsbereich kann genug sein. Push oder Badges sind nur gerechtfertigt, wenn Stephan im Alltag wirklich merkt: "Ich habe es trotz Anzeige vergessen."

## Kurzfassung fuer spaetere Chats

Roadmap 5C ist die optionale Erinnerungs-Schicht fuer Entsorgung. Sie darf nur auf Roadmap 5A/B aufbauen, keine eigene Terminlogik einfuehren und keine allgemeine Reminder-App werden. Der erste sinnvolle Schritt waere wahrscheinlich eine leise Home-Badge, nicht sofort Push.
