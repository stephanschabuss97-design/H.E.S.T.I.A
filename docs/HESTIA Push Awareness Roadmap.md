# HESTIA Technical Roadmap - Push Awareness

## Ziel (klar und pruefbar)

HESTIA soll spaeter optional einen bewusst manuellen Awareness-Push fuer `Einkaufsliste fertig` bekommen, der die kurze WhatsApp-Nachricht ersetzt, ohne HESTIA in ein Reminder-, Chat- oder Account-System zu verwandeln.

Pruefbare Zieldefinition:

- Push-Zweck ist klar von Sync, Save und Realtime getrennt.
- Trigger, Copy und Tonalitaet sind als schmaler Awareness-Vertrag beschrieben.
- Der sendende Client erhaelt den eigenen Push nicht.
- Sender-Ausschluss funktioniert ohne Pflicht-Login oder identity-first Produktmodell.
- Push bleibt optional und der Einkaufslisten-Kern funktioniert ohne Push vollstaendig.
- Code, Delivery-Pfad, Setup, Doku und QA sprechen denselben Vertrag.

## Problemzusammenfassung

HESTIA soll im Alltag die kurze Nachricht "Einkaufsliste ist fertig" ersetzen koennen. Dieser Nutzen ist real, aber Push ist heikel: Berechtigungen, Browser-Unterschiede, Service Worker, Delivery-Backend und Sender-Ausschluss koennen schnell schwerer werden als der eigentliche Haushaltsmoment. Diese Roadmap behandelt Push deshalb nur als optionalen Awareness-Layer. Sie darf nicht zu Remindern, Aufgabenlogik, Chat, Rollenmodell oder allgemeinem Notification-System werden.

## Future-Roadmap-Einordnung

- Eigene Premium-Future-Roadmap mit Produktbezug aus `PRODUCT.md`.
- Einordnung in `docs/future roadmaps.md`: Roadmap 5 `Push Awareness als Premium Feature`.
- Thematisch nach Roadmap 2, weil Push eine stabile Sync-/Offline-Basis voraussetzt.
- Historische Detailquellen:
  - `docs/archive/HESTIA Sync Behavior, Conflicts & Status Roadmap (Legacy).md`
  - `docs/archive/HESTIA Offline & Reconnect Reliability Roadmap (Legacy).md`
- Prioritaet: spaeter, optional, nur wenn der manuelle Haushalts-Awareness-Moment wirklich gebraucht wird.
- Nicht Teil von Roadmap 6 Realtime Shopping Collaboration.

## Scope

- Fachlicher Push-Vertrag fuer `Einkaufsliste fertig`.
- Entscheidung, von welchem Nutzerimpuls Push gesendet werden darf.
- Copy, Titel, Tonalitaet und Zustellungsversprechen.
- Leichter Geraete-/Installationsvertrag fuer Sender-Ausschluss.
- Web-/PWA-Push-Opt-in-Vertrag.
- Minimaler Delivery-Pfad im bestehenden HESTIA-Stack.
- Setup-, QA- und Modul-Doku.

## Not in Scope

- Keine Reminder, Eskalationen oder wiederkehrenden Benachrichtigungen.
- Kein Chat, Kommentar- oder Rueckkanal.
- Keine Pushes fuer beliebige Ereignisse.
- Keine Nutzerkonten, OAuth, Rollen oder identity-first Modell.
- Keine granularen Personalisierungs- oder Benachrichtigungseinstellungen.
- Keine Offline-Queue oder Background-Sync-Roadmap.
- Kein Redesign des Schreib- oder Einkaufsflows.

## Relevante Referenzen (Code)

- `sw.js`
- `manifest.webmanifest`
- `app/main.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/core/pwa-install.js`
- `app/supabase/list-sync.js`
- `public/runtime-config.json`, falls Delivery-Konfiguration noetig wird

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `setup-supabase.md`
- `docs/QA_CHECKS.md`
- `docs/modules/Deployment Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Touchlog Module Overview.md`
- `docs/modules/Runtime Config Module Overview.md`

Regel:

- Erst Produktzweck und Browser-/PWA-Grenzen klaeren.
- Dann Delivery- und Sender-Ausschluss-Vertrag definieren.
- Erst nach S1-S3 Code aendern.

## Guardrails

- Push bleibt Awareness, nicht Druck.
- Push ersetzt eine kurze Haushaltsnachricht, nicht Sync.
- Der schnellste Weg zum Listeneintrag bleibt unberuehrt.
- Push darf nie zum Reminder-System anwachsen.
- Kein Pflicht-Login fuer Sender-Ausschluss.
- Ohne Push-Opt-in bleibt HESTIA voll nutzbar.
- Push-Copy bleibt ruhig und alltagstauglich.

## Architektur-Constraints

- Household-Modell bleibt bestehen.
- Sender-Ausschluss muss leichtgewichtig ueber Geraet/Installation loesbar sein oder bewusst als Blocker dokumentiert werden.
- Push ist Zusatzschicht ueber bestehendem Sync, keine Source of Truth.
- Service Worker bleibt vorhanden, wird aber nicht zum allgemeinen Event-Orchestrator.
- Delivery-Pfad muss zum statischen HESTIA-Deployment passen oder als explizite Backend-Erweiterung beschlossen werden.

## Tool Permissions

Allowed:

- Lesen und Aendern von:
  - `sw.js`
  - `manifest.webmanifest`
  - `app/main.js`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`, nur falls Trigger fachlich dort landet
  - `app/core/pwa-install.js`
  - `app/supabase/list-sync.js`, nur falls Delivery/Household-Kontext es verlangt
  - Runtime-/Setup-Doku
  - betroffene Module Overviews und `docs/QA_CHECKS.md`
- Kleine neue Client-/Delivery-Boundaries innerhalb des HESTIA-Scopes, falls S1-S3 sie begruenden.
- Lokale und manuelle PWA-/Push-Smokes dokumentieren.

Forbidden:

- OAuth, Account- oder Rollenmodell.
- Allgemeines Notification-System.
- Reminder- oder Aufgabenlogik.
- Push in Sync-, Offline- oder Realtime-Roadmaps pressen.
- Unverwandte UI-Refactors.
- Neue schwere Backend-Plattform ohne explizite Produktentscheidung.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- Diese Roadmap startet erst, wenn Sync-/Offline-Basis ausreichend stabil oder bewusst als Voraussetzung dokumentiert ist.
- S1 bis S3 klaeren Produkt-, Sender- und Delivery-Vertrag.
- S4 setzt nur den finalen Vertrag um.
- S5 prueft Opt-in, Sender-Ausschluss und Delivery.
- S6 synchronisiert Doku, QA und Roadmap.

## Vorab Bewertung 09.05.2026

Bewertung:

- Push bleibt ein valider HESTIA-Gedanke aus dem Produktvertrag, aber er ist spaeter und optional.
- Die alte Roadmap war bereits gut abgegrenzt, brauchte aber schaerfere Template-Struktur, klare Abhaengigkeit von Sync/Offline und harte Reminder-Abgrenzung.

## Vorab Contract Review 09.05.2026

Review-Frage:

- Bleibt diese Roadmap innerhalb des HESTIA-Produktvertrags, wenn sie manuellen Push fuer `Einkaufsliste fertig` vorbereitet?

Entscheidung:

- Ja, wenn Push strikt Awareness bleibt, optional ist und kein Account-/Reminder-System einfuehrt.

Findings:

- CR-F1: Sender-Ausschluss ist der Kernrisiko-Punkt; ohne sauberen Vertrag ist Push stoerend.
- CR-F2: Browser-/PWA-Push braucht wahrscheinlich Delivery-Infrastruktur und darf nicht als reine Frontend-Kleinigkeit behandelt werden.
- CR-F3: Push darf nicht mit Sync verwechselt werden; die Liste muss bereits gemeinsam verfuegbar sein.
- CR-F4: Permission-Friktion kann den schnellen HESTIA-Kern stoeren.
- CR-F5: Trigger an `Liste speichern`, `Liste fertig` oder Shopping-Abschluss ist eine Produktentscheidung, keine technische Nebensache.

Korrekturen:

- Scope trennt Awareness-Push klar von Sync, Realtime und Reminder.
- S1-S3 muessen Trigger, Sender-Ausschluss und Delivery vor Code klaeren.
- Not in Scope/Forbidden schliessen Account-, Reminder- und allgemeine Notification-Drift aus.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
|---|---|---|---|
| S1 | Ist-Analyse und Produktabgrenzung fuer HESTIA-Push | TODO | |
| S2 | Produktvertrag fuer manuellen Awareness-Push finalisieren | TODO | |
| S3 | Technischen Sender-, Delivery- und Opt-in-Vertrag festziehen | TODO | |
| S4 | Repo- und Delivery-Umsetzung des finalen Push-Vertrags | TODO | |
| S5 | QA, Delivery-Smokes und Regression | TODO | |
| S6 | Doku-Sync und Abschlussreview | TODO | |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - Ist-Analyse und Produktabgrenzung

Ziel:

- Aktuelle PWA-, Service-Worker-, Sync- und Deployment-Basis gegen Push-Faehigkeit bewerten.

Substeps:

- S1.1 README, PRODUCT und PWA-/Deployment-Dokus lesen.
- S1.2 `sw.js`, Manifest, PWA-Install und Runtime-Config lesen.
- S1.3 Produktzweck gegen Sync und Realtime abgrenzen.
- S1.4 Moegliche Trigger erfassen und unpassende Trigger ausschliessen.
- S1.5 Sender-Ausschluss als Kernfrage dokumentieren.
- S1.6 S1 Contract Review.
- S1.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Push-Problemkarte ohne Feature-Drift.

Exit-Kriterium:

- Push-Zweck und Abgrenzung zu Sync sind klar.

## S2 - Produktvertrag fuer manuellen Awareness-Push

Ziel:

- Den genauen Haushaltsmoment fuer Push finalisieren.

Substeps:

- S2.1 Trigger festlegen:
  - eigener `Liste fertig`-Impuls
  - `Liste speichern`
  - anderer klarer Nutzerimpuls
- S2.2 Copy, Titel und Tonalitaet festlegen.
- S2.3 Optionalitaet und Opt-in-Erwartung festlegen.
- S2.4 Sender-Ausschluss fachlich als Pflicht oder Blocker verankern.
- S2.5 Keine-Reminder-Grenze pruefen.
- S2.6 S2 Contract Review.
- S2.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Finaler Produktvertrag fuer Awareness-Push.

Exit-Kriterium:

- Keine offene Produktfrage zu Trigger, Ton und Nutzen.

## S3 - Technischer Sender-, Delivery- und Opt-in-Vertrag

Ziel:

- Technischen Pfad ohne Login-Drift definieren.

Substeps:

- S3.1 Leichtes Geraete-/Installationsmodell bewerten.
- S3.2 Sender-Ausschluss technisch festlegen.
- S3.3 Web-Push-Opt-in und Browsergrenzen definieren.
- S3.4 Minimal zu speichernde Delivery-Daten festlegen.
- S3.5 Delivery-Pfad entscheiden:
  - Supabase Edge Function
  - anderer schlanker Serverpfad
  - bewusst blockieren, falls Infrastruktur nicht passt
- S3.6 S3 Contract Review.
- S3.7 Schritt-Abnahme, Doku-Sync-Entscheidung, Commit-Empfehlung.

Output:

- Technischer Push-Vertrag.

Exit-Kriterium:

- Keine offene Technikfrage zu Sender-Ausschluss und Delivery.

## S4 - Repo- und Delivery-Umsetzung

Ziel:

- Awareness-Push gemass finalem Vertrag umsetzen.

Substeps:

- S4.1 Opt-in-/Trigger-Flaeche implementieren.
- S4.2 Service Worker und Notification-Darstellung anpassen.
- S4.3 Delivery-Pfad und Sender-Ausschluss implementieren.
- S4.4 Status-/Fehlerkommunikation fuer Push ergaenzen.
- S4.5 Code- und Contract Review.
- S4.6 Fehler korrigieren.
- S4.7 Schritt-Abnahme.

Output:

- Optionaler Awareness-Push funktioniert gemaess Vertrag.

Exit-Kriterium:

- `Einkaufsliste fertig` kann andere Geraete erreichen, nicht den Sender selbst.

## S5 - QA, Delivery-Smokes und Regression

Ziel:

- Push auf echten Browser-/PWA-Grenzen pruefen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 Opt-in-Smoke.
- S5.4 Sender-Ausschluss-Smoke.
- S5.5 Delivery-Smoke auf mindestens zwei Geraeten/Browsing-Kontexten.
- S5.6 Regression gegen Sync- und lokalen Kernflow.
- S5.7 Contract Review gegen Guardrails.
- S5.8 Schritt-Abnahme.

Output:

- Dokumentierter und testbarer Awareness-Push.

Exit-Kriterium:

- Push ersetzt die kurze Haushaltsnachricht, ohne HESTIA schwerer zu machen.

## S6 - Doku-Sync und Abschlussreview

Ziel:

- Produkt-, Setup-, Modul- und QA-Doku synchronisieren.

Substeps:

- S6.1 `PRODUCT.md` pruefen und ggf. aktualisieren.
- S6.2 `docs/modules/PWA Install Module Overview.md` oder Deployment-Doku aktualisieren.
- S6.3 `docs/modules/Touchlog Module Overview.md` aktualisieren, falls Diagnose erweitert wurde.
- S6.4 `setup-supabase.md` oder Runtime-Doku aktualisieren, falls Delivery-Konfiguration noetig ist.
- S6.5 `docs/QA_CHECKS.md` aktualisieren.
- S6.6 Roadmap-Ergebnisprotokolle finalisieren.
- S6.7 Finaler Contract Review.
- S6.8 Commit-Empfehlung.
- S6.9 Archiv-Entscheidung.

Output:

- Roadmap ist commit- oder archivbereit.

Exit-Kriterium:

- Code, Delivery-Pfad, Doku und QA sprechen denselben Push-Vertrag.

## Ergebnisprotokoll-Format

```md
### Sx Ergebnisprotokoll DD.MM.YYYY

Umsetzung/Review:
- [...]

Contract Review:
- [...]

Checks:
- [...]

Findings und Korrekturen:
- [...]

Restrisiko:
- [...]
```

## Smokechecks / Regression

- Push kann bewusst manuell ausgeloest werden.
- Der sendende Client erhaelt seinen eigenen Push nicht.
- Andere registrierte Geraete desselben Haushalts erhalten den Push.
- Ohne Push-Opt-in bleibt der Sync-Kern voll nutzbar.
- Push fuehlt sich wie Awareness an, nicht wie Reminder-Druck.
- Browser/PWA-Einschraenkungen sind dokumentiert.

## Abnahmekriterien

- Push-Zweck und Sync-Zweck sind sauber getrennt.
- Sender-Ausschluss funktioniert ohne identity-first Login.
- Push bleibt optional und stoert den Listenfluss nicht.
- Code, Delivery-Pfad, Doku und QA sprechen denselben Vertrag.
- HESTIA bleibt auch mit Push ein ruhiges Haushaltswerkzeug.

## Commit-Empfehlung

Nach Abschluss voraussichtlich geeignet:

- `feat(push): add manual shopping list awareness push`
