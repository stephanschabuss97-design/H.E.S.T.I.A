# HESTIA Push Awareness Roadmap

## Ziel (klar und pruefbar)
HESTIA soll einen optionalen, bewusst manuellen Push-Flow fuer `Einkaufsliste fertig` bekommen, der die kurze WhatsApp-Nachricht ersetzt, ohne HESTIA in ein Reminder- oder Account-System zu verwandeln.

Pruefbare Zieldefinition:
- Der Push-Zweck ist als Awareness-Layer klar von Sync und Speichern getrennt.
- Es ist verbindlich entschieden, wann und von wo `Einkaufsliste fertig` gesendet werden darf.
- Der sendende Client erhaelt diesen Push selbst nicht.
- Sender-Ausschluss funktioniert ohne identity-first Login-Modell.
- Push-Copy, Trigger und Delivery-Vertrag sind fuer HESTIA bewusst schmal.
- Repo, Backend-Schnitt und Doku sprechen denselben Push-Vertrag.

## Scope
- Fachliche Definition des HESTIA-Push-Zwecks.
- Entscheidung fuer einen leichten Sender-/Geraetevertrag ohne persoenliche Konten.
- Trigger-Regel fuer `Einkaufsliste fertig`.
- Push-Copy, Notification-Verhalten und opt-in-Vertrag.
- Technischer Delivery-Pfad fuer Web-/PWA-Push in HESTIA.
- Umsetzung des finalen Push-Vertrags im bestehenden HESTIA-Stack.

## Not in Scope
- Reminder-System, Eskalationen oder mehrstufige Benachrichtigungen.
- Nutzerkonten, OAuth oder Rollenmodell.
- Chat, Kommentierung oder Rueckkanal.
- Granulare Push-Einstellungen pro Person.
- Push fuer beliebige Ereignisse ausserhalb des klaren Einkaufslisten-Abschluss-/Bereit-Moments.

## Relevante Referenzen (Code)
- `sw.js`
- `manifest.webmanifest`
- `app/main.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/core/pwa-install.js`
- `app/supabase/list-sync.js`

## Relevante Referenzen (Doku)
- `PRODUCT.md`
- `README.md`
- `setup-supabase.md`
- `docs/modules/Deployment Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/QA_CHECKS.md`

## Guardrails
- Push bleibt in HESTIA Awareness, nicht Druck.
- Push wird nie zum Ersatz fuer ein kompliziertes Nutzer- oder Rollenmodell.
- Der schnellste Weg zum Listeneintrag bleibt unberuehrt.
- HESTIA verschickt keine Push-Flut und keine Reminder-Kaskaden.
- Der sendende Client bekommt seinen eigenen manuellen Push nicht zurueck.
- Push darf den household-basierten Produktkern nicht in identity-first Richtung verschieben.

## Architektur-Constraints
- Household-Modell bleibt bestehen.
- Ein moeglicher Sender-Ausschluss muss ueber ein leichtes Geraete- oder Installationsmodell loesbar sein, nicht ueber Pflicht-Login.
- Push ist Zusatzschicht ueber dem bestehenden Sync, nicht neue Source of Truth.
- Bestehende Runtime- und Supabase-Grenzen sollen wenn moeglich respektiert werden.

## Tool Permissions
Allowed:
- Bestehende PWA-, Sync- und UI-Dateien lesen und innerhalb Scope aendern.
- Neue kleine Client-/Backend-Boundaries innerhalb des HESTIA-Scopes einfuehren.
- Doku, QA und Setup-Hinweise anpassen.

Forbidden:
- OAuth- oder Account-Einfuehrung.
- Allgemeines Notification-System fuer beliebige Ereignisse.
- Unverwandte Redesigns.
- Push in denselben Schritt wie Offline-Queueing oder Konfliktmodell pressen.

## Execution Mode
- Diese Roadmap laeuft nach der Sync-Behavior-Roadmap.
- Sie kann parallel oder nachgelagert zur Offline-/Reconnect-Roadmap laufen, wenn die Zustellung nicht von Connectivity-Fragen abhaengt.
- Erst `S1` bis `S3` finalisieren Produkt-, Sender- und Delivery-Vertrag.
- Erst danach zieht `S4` die konkrete Umsetzung.
- `S5` schliesst mit QA, Doku-Sync und Restrisiken.

## Statusmatrix
| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse und Produktabgrenzung fuer HESTIA-Push | TODO | |
| S2 | Produktvertrag fuer manuellen Awareness-Push finalisieren | TODO | |
| S3 | Technischen Sender-, Delivery- und Opt-in-Vertrag festziehen | TODO | |
| S4 | Repo- und Delivery-Umsetzung des finalen Push-Vertrags | TODO | |
| S5 | QA, Doku-Sync und Abschlussbewertung | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## Wiederkehrende Abschluss-Substeps pro Hauptschritt
- `letzter fachlicher Substep + 1: Schritt-Abnahme`
  - Ergebnis gegen Zielvertrag pruefen
  - Push-Drift gegen Guardrails pruefen
  - mindestens einen gezielten Contract- oder Smoke-Check dokumentieren
- `danach: Doku-Sync`
  - betroffene Overviews, `PRODUCT.md` und `docs/QA_CHECKS.md` sofort nachziehen
- `danach: Commit-Empfehlung`
  - festhalten, ob der Schritt bereits isoliert commitbar ist

## Schritte + Subschritte

### S1 - Ist-Analyse und Produktabgrenzung fuer HESTIA-Push
- S1.1 Den aktuellen PWA-/Service-Worker- und Hosting-Stand fuer Push-Faehigkeit mappen.
- S1.2 Den echten Produktzweck nochmals gegen Sync abgrenzen:
  - was macht Shared Sync
  - was macht Awareness-Push
- S1.3 Aufnehmen, welche Push-Trigger fuer HESTIA sinnvoll sind und welche klar ausgeschlossen bleiben.
- S1.4 Sender-Ausschluss als offene Kernfrage sichtbar machen.
- S1.5 Schritt-Abnahme.
- S1.6 Doku-Sync.
- S1.7 Commit-Empfehlung.
- Output: belastbare Karte des Push-Problems ohne Feature-Drift.
- Exit-Kriterium: Push-Zweck und Abgrenzung zu Sync sind voll klar.

### S2 - Produktvertrag fuer manuellen Awareness-Push finalisieren
- S2.1 Verbindlich festlegen, welcher Trigger den manuellen Push ausloest.
- S2.2 Festlegen, ob der Push an `Liste speichern`, an einen eigenen `Liste fertig`-Impuls oder an einen spaeteren Abschluss-Trigger haengt.
- S2.3 Copy, Titel und Tonalitaet des Push festziehen.
- S2.4 Festlegen, ob Push optional pro Geraet oder nur global als Feature existiert.
- S2.5 Den Sender-Ausschluss fachlich als Pflichtvertrag verankern.
- S2.6 Schritt-Abnahme.
- S2.7 Doku-Sync.
- S2.8 Commit-Empfehlung.
- Output: finaler Produktvertrag fuer den HESTIA-Awareness-Push.
- Exit-Kriterium: keine offene Produktfrage mehr zu Trigger, Ton und Nutzen.

### S3 - Technischen Sender-, Delivery- und Opt-in-Vertrag festziehen
- S3.1 Leichtes Geraete- oder Installationsmodell fuer HESTIA definieren.
- S3.2 Festlegen, wie der sendende Client vom Empfang ausgeschlossen wird.
- S3.3 Den Web-Push-Opt-in-Vertrag fuer Browser/PWA definieren.
- S3.4 Festlegen, welche Daten fuer Delivery und Dedupe minimal gespeichert werden duerfen.
- S3.5 Festlegen, ob der Push ueber Supabase Edge Functions, andere Serverlogik oder einen schlanken Direktpfad laeuft.
- S3.6 Schritt-Abnahme.
- S3.7 Doku-Sync.
- S3.8 Commit-Empfehlung.
- Output: technischer Push-Vertrag ohne Login-Drift.
- Exit-Kriterium: keine offene Technikfrage mehr zu Sender-Ausschluss und Delivery-Pfad.

### S4 - Repo- und Delivery-Umsetzung des finalen Push-Vertrags
- S4.1 Client-seitige Trigger- und Opt-in-Flaechen gemass Vertrag implementieren.
- S4.2 Service Worker und Notification-Darstellung gemass HESTIA-Tonalitaet anpassen.
- S4.3 Delivery-Pfad und Sender-Ausschluss technisch umsetzen.
- S4.4 Status- und Fehlerkommunikation fuer Push im UI nachziehen.
- S4.5 Schritt-Abnahme.
- S4.6 Doku-Sync.
- S4.7 Commit-Empfehlung.
- Output: optionaler Awareness-Push funktioniert gemass HESTIA-Vertrag.
- Exit-Kriterium: `Einkaufsliste fertig` kann gezielt an andere Geraete gehen, nicht an den Sender selbst.

### S5 - QA, Doku-Sync und Abschlussbewertung
- S5.1 Smoke-Matrix fuer Opt-in, Sender-Ausschluss und Delivery definieren und ausfuehren.
- S5.2 Regression gegen Sync- und lokalen Kernflow pruefen.
- S5.3 Modul-Doku, Produktvertrag und QA auf finalen Stand bringen.
- S5.4 Restrisiken fuer spaetere Push-Erweiterungen notieren.
- S5.5 Schritt-Abnahme.
- S5.6 Doku-Sync.
- S5.7 Commit-Empfehlung.
- Output: dokumentierter und testbarer HESTIA-Awareness-Push.
- Exit-Kriterium: Push ersetzt die kurze WhatsApp-Nachricht, ohne HESTIA schwerer zu machen.

## Smokechecks / Regression (Definition)
- Push kann bewusst manuell ausgeloest werden.
- Der sendende Client erhaelt seinen eigenen Push nicht.
- Andere registrierte Geraete desselben Haushalts erhalten den Push.
- Ohne Push-Opt-in bleibt der Sync-Kern weiter voll nutzbar.
- Push fuehlt sich wie Awareness an, nicht wie Reminder-Druck.

## Abnahmekriterien
- Push-Zweck und Sync-Zweck sind sauber getrennt.
- Sender-Ausschluss funktioniert ohne identity-first Login.
- Push bleibt optional und stoert den Listenfluss nicht.
- Code, Delivery-Pfad, Doku und QA sprechen denselben Vertrag.
- HESTIA bleibt auch mit Push ein ruhiges Haushaltswerkzeug.

## Risiken
- Ein unsauberer Sender-Ausschluss wuerde den Nutzen des Push stark schwachen.
- Ein zu schweres Delivery-Modell koennte HESTIA in falsche Produktkomplexitaet treiben.
- Push koennte still in Reminder-Logik kippen, wenn Trigger und Copy nicht streng begrenzt bleiben.
- Browser-/PWA-Push-Einschraenkungen koennen die Alltagstauglichkeit je Plattform begrenzen.
