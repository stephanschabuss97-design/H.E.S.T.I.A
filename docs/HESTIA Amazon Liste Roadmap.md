# HESTIA Roadmap 6B - Amazon-Liste

## Statushinweis 16.05.2026

Diese Roadmap bleibt als Amazon-Folgeplanung erhalten und muss vor Umsetzung noch einmal vollstaendig gegen Roadmap 6A gereviewt werden.

Roadmap 6A [HESTIA Einkaufsbereich Konsolidieren Roadmap (DONE).md](archive/HESTIA%20Einkaufsbereich%20Konsolidieren%20Roadmap%20(DONE).md) hat den bisherigen technischen `Schreiben`-Screen sichtbar zu `Einkauf` weiterentwickelt. Das Panel `Offene Liste` enthaelt jetzt die echte Papierliste mit Abhaken, Loeschen, Abschluss und Kassa. Home zeigt bereits `Einkauf`, `Amazon`, `Muell`.

Wichtig:

- Die sichtbare `Amazon`-Kachel ist bis zur Umsetzung dieser Roadmap nur ein Platzhalter auf dem bestehenden technischen `shopping`-Ziel.
- Es gibt noch keine Amazon-Liste, keinen `listType`, keine SQL-Migration und keine Amazon-Listenlogik.
- Der alte `Einkaufen`/`shopping`-Screen bleibt als Uebergangs- und Vergleichsflaeche erhalten.

Bis zu einem erneuten Contract Review nach Roadmap 6A gelten insbesondere diese frueheren Annahmen nicht als final:

- Writing-Toggle `Einkauf | Amazon` als bevorzugter Einstieg.
- Home-Zielbild `Schreiben` plus geteilte Zeile `Einkaufen | Amazon`.
- Amazon als Untermodus des Writing-Screens.

Aktuelle Arbeitshypothese nach Roadmap 6A:

- Home-Zielbild ist `Einkauf`, `Amazon`, `Muell`.
- `Einkauf` bleibt der Grocery-Kernfluss.
- `Amazon` wird voraussichtlich ein eigener Bereich auf demselben Listenmuster, nicht ein Toggle im bestehenden Einkauf.
- Die alte `shopping`-Route darf fuer Amazon nicht einfach wiederverwendet werden, ohne vorher den Uebergangs-/Platzhaltervertrag sauber aufzuloesen.

Das fachliche Ziel bleibt bestehen:

- Amazon bleibt eine kleine Merkliste fuer spaetere Bestellungen.
- Keine Amazon-API, keine Preise, keine Produktlinks, kein Bestelltracking.
- Der spaetere Datenvertrag mit `grocery`/`amazon` muss weiterhin defensiv fuer alte Items geplant werden.

## Ziel (klar und pruefbar)

HESTIA soll neben der normalen Einkaufsliste eine kleine Amazon-Liste bekommen: Dinge, die im Haushalt irgendwann online bei Amazon gekauft werden sollen.

Pruefbare Zieldefinition:

- `Einkauf` bleibt der gemeinsame Grocery-Kernfluss fuer neue Markt-Eintraege.
- `Amazon` bekommt einen eigenen Einstieg und voraussichtlich einen eigenen Bereich.
- Neue Amazon-Eintraege werden im Amazon-Bereich in `amazon` geschrieben.
- Home zeigt:
  - `Einkauf`
  - `Amazon`
  - `Muell`
- Die Amazon-Liste nutzt das bestehende Listenlayout weitgehend 1:1.
- Amazon-Eintraege werden mit `Bestellt` markiert statt `Im Wagen`.
- Abschluss entfernt nur bestellte Amazon-Eintraege.
- Bestehende Grocery-Items bleiben sichtbar und werden nicht in Amazon verschoben.
- Bestehende Items ohne neuen Typ gelten defensiv als `grocery`.
- Supabase speichert weiterhin eine gemeinsame Liste, erweitert um den Typ `grocery` oder `amazon`.

## Problemzusammenfassung

Der echte Haushalt hat zwei unterschiedliche Beschaffungsarten:

- Dinge fuer den naechsten Einkauf im Geschaeft.
- Dinge, die man irgendwann online bei Amazon bestellen will.

Heute landet beides entweder in derselben Einkaufsliste oder ausserhalb von HESTIA. Das vermischt zwei unterschiedliche Alltagssituationen: Beim Einkaufen im Markt stoeren Amazon-Merkposten, und Amazon-Merkposten gehen ausserhalb der App leicht verloren.

Die Loesung soll kein Commerce-Feature werden. HESTIA soll nur den bestehenden Kern erweitern: schnell aufschreiben, spaeter erledigen. Amazon ist dabei ein zweiter Beschaffungskanal, kein Shop-Portal.

## Scope

- Datenvertrag:
  - neues Feld `list_type`.
  - erlaubte Werte: `grocery`, `amazon`.
  - Default und Fallback: `grocery`.
  - alte lokale Items ohne `list_type` gelten als `grocery`.
  - alte Supabase-Zeilen ohne `list_type` werden per Migration auf `grocery` gesetzt.
- SQL/Supabase:
  - `shopping_items` bekommt `list_type`.
  - Check-Constraint auf `grocery` und `amazon`.
  - RLS/Household-Key-Vertrag bleibt unveraendert.
  - Snapshot-Sync speichert weiterhin die aktuelle offene Liste, jetzt mit beiden Typen.
- State:
  - `normalizeItem` setzt fehlendes oder ungueltiges `listType` auf `grocery`.
  - State-Operationen muessen typbewusst werden, wo Abschluss oder Filterung betroffen ist.
  - `Liste leeren` braucht typbewusste Semantik; ein Amazon- oder Grocery-Filter darf nicht versehentlich beide Listen leeren.
  - Bestehender Storage-Key `hestia.v1.items` bleibt, sofern S1-S3 keinen zwingenden Grund fuer einen Key-Wechsel finden.
- Einkauf:
  - bestehender sichtbarer `Einkauf` bleibt Grocery.
  - bestehende Semantik-, Mengen- und Einheitlogik bleibt erhalten.
  - Grocery-Liste zeigt nur `grocery`.
  - `Liste leeren` und `Liste abschliessen` bleiben Grocery-sicher.
- Home:
  - sichtbare Reihenfolge bleibt `Einkauf`, `Amazon`, `Muell`.
  - die bestehende Amazon-Platzhalter-Kachel wird in einen echten Amazon-Einstieg ueberfuehrt.
  - `Muell` bleibt Haushaltsperipherie.
- Grocery-Shopping:
  - rendert nur `grocery`.
  - `Im Wagen` bleibt Copy.
  - `Liste abschliessen` entfernt nur `grocery`-Items mit `inCart === true`.
  - Kassa-Karussell bleibt nur im Grocery-Einkauf.
- Amazon-Liste:
  - eigener Screen oder bewusst wiederverwendeter Shopping-Screen-Kontrakt, final in S1-S3 zu klaeren.
  - rendert nur `amazon`.
  - gleiches ruhiges Listenlayout wie Grocery.
  - Statuscopy: `Bestellt`.
  - Abschlusscopy: voraussichtlich `Bestellte entfernen`.
  - leere Liste: ruhige Copy, z. B. `Keine Amazon-Eintraege.`
  - Abschluss entfernt nur `amazon`-Items mit `inCart === true`; technisch darf das bestehende Flag weiterverwendet werden, sichtbar heisst es `Bestellt`.
- Doku und QA:
  - PRODUCT/README nur falls der Produktvertrag bewusst erweitert werden muss.
  - State, Writing, Shopping, Supabase Sync, Home, CSS und QA synchronisieren.
  - SQL-Anleitung/Migration dokumentieren.

## Not in Scope

- Keine Amazon-API.
- Keine Produktsuche.
- Keine Preisvergleiche.
- Keine Links zu Amazon-Produkten.
- Kein Affiliate.
- Kein Warenkorb-Import.
- Kein Bestellstatus von Amazon.
- Kein Versandtracking.
- Keine Automatisierung.
- Keine Amazon-KI-Integration.
- Keine Produktkatalog- oder Kategoriepflicht.
- Keine zweite Supabase-Tabelle, solange S1-S3 keinen harten Grund belegen.
- Kein neues Auth-, Account-, Rollen- oder RLS-Modell.
- Keine Multi-Shop-Logik.
- Keine generische Online-Shopping-Plattform.
- Keine Aenderung am Waste-, PWA-Install-, Touchlog- oder Kassa-Karussell-Vertrag ausser dokumentierter Anzeigegrenzen.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`
- `app/core/router.js`
- `app/core/state.js`
- `app/core/item-display.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/modules/kassa-carousel.js`, nur Abgrenzung: nicht auf Amazon uebernehmen
- `app/supabase/list-sync.js`
- `app/styles/home.css`
- `app/styles/writing.css`
- `app/styles/shopping.css`
- `app/styles/ui.css`
- `app/app.css`
- `sql/01_setup-supabase.sql`
- ggf. neues SQL-Migrationsfile, final in S1 klaeren
- `sw.js`, nur falls neue JS-/CSS-Dateien entstehen

## Relevante Referenzen (Doku)

- `README.md`
- `PRODUCT.md`
- `docs/future roadmaps.md`
- `docs/DEV_ENVIRONMENT.md`
- `docs/QA_CHECKS.md`
- `docs/modules/State Layer Module Overview.md`
- `docs/modules/Shopping Module Overview.md`
- `docs/modules/Amazon Module Overview.md`
- `docs/modules/Supabase Sync Module Overview.md`
- `docs/modules/Home Module Overview.md`
- `docs/modules/CSS Module Overview.md`
- `docs/modules/PWA Install Module Overview.md`
- `docs/modules/Kassa Carousel Module Overview.md`
- `docs/archive/HESTIA Schreiben Speichern Listenvertrauen Roadmap (DONE).md`
- `docs/archive/HESTIA Kassa Karussell Roadmap (DONE).md`
- `docs/archive/HESTIA Entsorgung UI Roadmap (DONE).md`

Regel:

- Erst Produkt-, State-, Writing-, Shopping- und Supabase-Vertraege lesen.
- Dann SQL-/RLS-Bestand klaeren.
- Dann erst UI-Code aendern.

## Geplanter Datenvertrag

Frontend-Feld:

```js
listType: "grocery" | "amazon"
```

Remote-Feld:

```sql
list_type text not null default 'grocery'
```

Erlaubte Werte:

- `grocery`
- `amazon`

Normalisierung:

- fehlendes `listType` im Frontend wird `grocery`.
- unbekanntes `listType` wird `grocery`.
- fehlendes `list_type` aus Supabase wird `grocery`, bis die Migration sicher durch ist.

SQL-Skizze, in S1/S2 gegen echten Bestand zu pruefen:

```sql
alter table public.shopping_items
add column if not exists list_type text default 'grocery';

update public.shopping_items
set list_type = 'grocery'
where list_type is null;

alter table public.shopping_items
alter column list_type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'shopping_items_list_type_check'
  ) then
    alter table public.shopping_items
    add constraint shopping_items_list_type_check
    check (list_type in ('grocery', 'amazon'));
  end if;
end;
$$;

create index if not exists shopping_items_household_type_idx
on public.shopping_items (household_id, list_type, in_cart);
```

Nicht-idempotente Kurzform, nur falls S2 sie bewusst erlaubt:

```sql
alter table public.shopping_items
add constraint shopping_items_list_type_check
check (list_type in ('grocery', 'amazon'));
```

Hinweis:

- Ob `add constraint if not exists` verfuegbar oder ein idempotenter DO-Block noetig ist, wird in S1/S2 entschieden.
- Bestandsdatenrisiko ist niedrig, aber defensive Migration bleibt Pflicht.
- Deploy-Reihenfolge pruefen:
  - DB-Migration muss vor App-Code funktionieren.
  - alter App-Code darf durch Default weiterhin `grocery` schreiben.
  - nach Amazon-App-Deploy sollte kein alter Client Amazon-Items wieder als reine Grocery-Snapshots speichern.

## UI-Vertrag

Home-Zielbild:

```text
Einkauf
Amazon
Muell
```

Einkauf:

- bleibt Grocery.
- Amazon darf die Einkaufsgeschwindigkeit nicht verschlechtern.
- Semantik bleibt Hilfe, nicht Pflicht.

Grocery:

- Copy bleibt:
  - `Im Wagen`
  - `Liste abschliessen`
  - `Alles erledigt.`
- Kassa-Karussell bleibt sichtbar.

Amazon:

- Copy:
  - `Bestellt`
  - `Bestellte entfernen`
  - leerer Zustand voraussichtlich `Keine Amazon-Eintraege.`
- Kein Kassa-Karussell.
- Kein Amazon-Link.
- Kein Preis-/Produkt-/Bestellstatus.

## Guardrails

- `Einkauf` bleibt der wichtigste Grocery-Eingang.
- `Amazon` ist zweiter Beschaffungskanal, nicht zweiter Produktkern.
- Amazon bleibt Merkliste, nicht Commerce-Integration.
- Die App bleibt schneller als eine Notiz auf Papier.
- Keine neue mentale Last im Standard-Grocery-Flow.
- Bestehende Grocery-Liste darf durch Amazon nicht verschwinden oder anders funktionieren.
- Amazon darf nicht das Kassa-Karussell oder Shopping-App-Launcher-Verhalten erben.
- Sync bleibt Snapshot-Sync, nicht robuste parallele Collaboration.

## Architektur-Constraints

- HESTIA bleibt statisches HTML, CSS und native ES modules.
- Kein Build-Step.
- Keine neue Dependency.
- Keine Amazon- oder Drittanbieter-API.
- SQL-/Schema-Aenderung nur explizit und dokumentiert.
- RLS/Household-Key bleibt haushaltsbasiert.
- Ohne Supabase-Konfiguration muss die App lokal weiter funktionieren.
- Lokale alte Items muessen weiter sichtbar sein.
- Remote alte Items muessen nach Migration als `grocery` sichtbar sein.
- PWA-Cache nur anpassen, wenn neue statische Dateien entstehen.

## Tool Permissions

Allowed:

- Lesen aller relevanten HESTIA-Dokus, SQL und App-Module.
- Aendern von:
  - `index.html`
  - `app/core/state.js`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`
  - `app/supabase/list-sync.js`
  - `app/core/router.js`
  - `app/main.js`, falls neuer Screen/Modulstart noetig wird
  - `app/styles/home.css`
  - `app/styles/writing.css`
  - `app/styles/shopping.css`
  - `app/styles/ui.css`, falls ein globaler Toggle-Pattern bewusst gebraucht wird
  - `app/app.css`, falls neue CSS-Datei entsteht
  - `sw.js`, falls neue App-Shell-Datei entsteht
  - `sql/*`
  - betroffene Module Overviews
  - `docs/QA_CHECKS.md`
  - `docs/future roadmaps.md` beim Abschluss
  - diese Roadmap
- Lokale Checks:
  - `node --check`
  - State-/Sync-Smokes mit Node/Fake-DOM
  - `git diff --check`
  - Browser-Smokes, falls verfuegbar

Forbidden ohne neue ausdrueckliche Entscheidung:

- Amazon-API, Produktlinks, Preise, Affiliate, Tracking.
- zweites Backend oder zweite Tabelle.
- OAuth/Login/User-Accounts.
- RLS-Neudesign.
- Push, Reminder oder Notification.
- Auto-Sync bei jedem Tastendruck.
- robuste Parallel-Collaboration neu versprechen.
- Kassa-Karussell auf Amazon uebertragen.

## Execution Mode

- Sequenziell arbeiten: `S1` bis `S6`.
- S1 bis S3 sind Doku-, Detektiv- und Contract-Arbeit.
- S4 wird wieder in Substeps umgesetzt.
- S5 prueft lokal und manuell moegliche Smokes.
- S6 synchronisiert Doku, QA und Roadmap-Ergebnis.
- Nach jedem Hauptschritt Statusmatrix aktualisieren.
- Nach jedem Hauptschritt mindestens einen Check oder Review dokumentieren.
- Jeder Hauptschritt endet mit:
  - Schritt-Abnahme
  - Doku-Sync-Entscheidung
  - Commit-Empfehlung

## Vorab Contract Review 15.05.2026

Review-Frage:

- Darf HESTIA eine Amazon-Liste bekommen, ohne zur Commerce-App oder zum Feature-Sammelbecken zu werden?

Entscheidung:

- Ja, wenn Amazon nur ein zweiter Beschaffungstyp innerhalb des bestehenden Schreib-/Listenflusses ist und keine Shop-Integration einfuehrt.

Findings:

- CR-AZ-F1: Der Produktvertrag nennt bisher `name`, `quantity`, `unit`, `inCart` als stabilen Datenvertrag; `listType` ist eine bewusste Vertragsaenderung und muss in S1-S3 sauber begruendet werden.
- CR-AZ-F2: SQL-/Supabase-Schemaaenderungen koennen bestehende Remote-Daten ausblenden, wenn alte Zeilen keinen Typ haben.
- CR-AZ-F3: Ein zweiter Home-Button kann `Einkaufen` optisch verwischen, wenn er wie ein neuer Kernbereich wirkt.
- CR-AZ-F4: `Im Wagen` passt fachlich nicht fuer Amazon.
- CR-AZ-F5: Gemeinsames `inCart` fuer Grocery und Amazon kann als Statusname technisch bleiben, aber die UI-Copy muss typabhaengig sein.
- CR-AZ-F6: `Liste abschliessen` darf nicht versehentlich beide Listentypen leeren.
- CR-AZ-F7: Kassa-Karussell darf nicht in der Amazon-Liste auftauchen.
- CR-AZ-F8: Supabase-Realtime und Snapshot-Sync muessen beide Typen gemeinsam transportieren, ohne Filterverlust.
- CR-AZ-F9: Amazon darf keine Erwartung an Preise, Links, Bestellstatus oder Automatisierung erzeugen.
- CR-AZ-F10: `Liste leeren` im Einkauf oder Amazon-Bereich darf ohne Typbewusstsein nicht beide Listen leeren.
- CR-AZ-F11: Ein persistenter Amazon-Modus koennte unbemerkt neue Items in die falsche Liste schreiben, falls S1-S3 doch einen gemeinsamen Screen statt getrennten Bereich beschliessen.
- CR-AZ-F12: Alte Clients nach der Migration koennen `list_type` per Default als `grocery` schreiben; Deploy-Reihenfolge und PWA-Cache muessen bedacht werden.

Korrekturen:

- Roadmap benennt `listType/list_type` als bewusste Datenvertragsaenderung.
- Bestandsdaten werden defensiv als `grocery` normalisiert.
- SQL-Skizze enthaelt Default, Backfill, Not-null und Check-Constraint.
- Home-Vertrag formuliert `Einkauf`, `Amazon`, `Muell`; Amazon wird eigener Beschaffungskanal neben dem Grocery-Kernfluss.
- Amazon-Copy nutzt `Bestellt` und `Bestellte entfernen`.
- S4 muss Abschlusslogik typbewusst bauen.
- Einkauf-/Amazon-Listenansichten und `Liste leeren` muessen typbewusst werden.
- Falls S2 doch einen gemeinsamen Modus beschliesst, startet dieser defensiv immer in `Einkauf`, solange keine bewusste Persistenzentscheidung trifft.
- Kassa-Karussell ist explizit nur Grocery.
- Not in Scope grenzt Amazon-API, Preise, Links, Affiliate, Tracking und Automatisierung aus.
- SQL-Skizze enthaelt idempotenten Constraint-Plan, Index-Vorschlag und Deploy-Reihenfolge als S1/S2-Pruefpunkt.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System-, Daten- und SQL-Vertragsdetektivarbeit | TODO | Produkt-, State-, Sync-, SQL- und UI-Vertrag klaeren. |
| S2 | Fachlicher/technischer Contract Review | TODO | Datenmodell, Copy, Home-Hierarchie, Migration und Sync-Vertrag finalisieren. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | TODO | Risiken, Teststrategie und S4-Substeps konkretisieren. |
| S4 | Umsetzung | TODO | Listentyp, Amazon-Bereich/Filter, SQL, Sync und UI bauen. |
| S5 | Tests, Code Review und Contract Review | TODO | Lokale, Supabase- und Browser-Smokes ausfuehren. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | TODO | Module Overviews, QA, Future Roadmaps und Roadmap final synchronisieren. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System-, Daten- und SQL-Vertragsdetektivarbeit

Ziel:

- Ist-Zustand und genaue Eingriffsgrenzen klaeren, bevor Code geschrieben wird.

Substeps:

- S1.1 README, PRODUCT und diese Roadmap lesen.
- S1.2 State-, Writing-, Shopping- und Supabase-Sync-Overviews lesen.
- S1.3 `app/core/state.js`, `writing.js`, `shopping.js`, `list-sync.js` lesen.
- S1.4 SQL-Bestand in `sql/01_setup-supabase.sql` und ggf. Supabase-Setup-Doku pruefen.
- S1.5 Bestehende lokale Storage-Normalisierung pruefen.
- S1.6 Bestehenden Remote-Load/Save-Vertrag pruefen.
- S1.7 Home-Layout-Vertrag nach Roadmap 5B pruefen.
- S1.8 Kassa-Karussell-Abgrenzung pruefen.
- S1.9 S1 Contract Review.
- S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- Alle betroffenen Vertrage sind gelesen und die Umsetzung darf mit S2 weiter konkretisiert werden.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Finaler Produkt-, Daten-, SQL-, Copy-, Sync- und UI-Vertrag.

Substeps:

- S2.1 Produktnamen und sichtbare Copy finalisieren.
- S2.2 `listType/list_type`-Vertrag finalisieren.
- S2.3 SQL-Migrationsvertrag finalisieren:
  - idempotent oder bewusst einmalig
  - Default
  - Backfill
  - Not-null
  - Check-Constraint
- S2.4 LocalStorage-/State-Normalisierung finalisieren.
- S2.5 Supabase-Load/Save/Realtime-Vertrag finalisieren.
- S2.6 Home-Layout-Vertrag finalisieren.
- S2.7 Einstiegs-/Modusentscheidung finalisieren: eigener Amazon-Bereich bevorzugt; Toggle nur bei belegtem Vorteil.
- S2.8 Grocery-/Amazon-Abschlusslogik finalisieren.
- S2.9 Typbewusste `Liste leeren`-Semantik finalisieren.
- S2.10 Kassa-Karussell-Abgrenzung finalisieren.
- S2.11 PWA-/Deploy-Reihenfolge finalisieren.
- S2.12 Contract Review S2.
- S2.13 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- Es gibt keine offenen Produkt- oder Datenmodellfragen mehr fuer S4.

## S3 - Bruchrisiko-, UI-/Copy- und Umsetzungsreview

Ziel:

- Risiken, Testplan und S4-Substeps so konkretisieren, dass Umsetzung schrittweise erfolgen kann.

Substeps:

- S3.1 Bruchrisiken erfassen:
  - bestehende Grocery-Items verschwinden.
  - alte Supabase-Zeilen ohne `list_type`.
  - Abschluss loescht falschen Typ.
  - `Liste leeren` loescht beide Typen.
  - Remote-Snapshot verliert Typ.
  - Amazon-UI wird zu Commerce.
  - persistierter Modus schreibt versehentlich in Amazon.
  - alter PWA-Client speichert Amazon-Snapshot als Grocery.
  - Mobile Home-Zeile wird zu eng.
- S3.2 Copy Review:
  - `Amazon`
  - `Bestellt`
  - `Bestellte entfernen`
  - leere Amazon-Liste.
- S3.3 UI-Layout Review:
  - Home zweite Zeile.
  - Amazon-Einstieg und Bereichswechsel.
  - Amazon-Liste.
- S3.4 SQL-/Migration-Teststrategie konkretisieren.
- S3.5 LocalStorage-/State-Teststrategie konkretisieren.
- S3.6 Supabase-/Sync-Teststrategie konkretisieren.
- S3.7 S4-Substeps konkretisieren.
- S3.8 Contract Review S3.
- S3.9 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- S4 ist in kleine, pruefbare Substeps zerlegt.

## S4 - Umsetzung

Ziel:

- Amazon-Liste bauen, ohne den bestehenden Grocery-Fluss zu verschlechtern.

Vorlaeufige Substeps:

- S4.1 SQL-Migration/Schema-Vertrag umsetzen.
- S4.2 State-Normalisierung und typbewusste Operationen bauen.
- S4.3 Supabase Mapping und REST-Select/Insert um `list_type` erweitern.
- S4.4 Amazon-Einstieg und Amazon-Bereich bauen.
- S4.5 Einkauf-/Amazon-Listen, `Liste leeren` und Loeschen typbewusst machen.
- S4.6 Home-Platzhalter `Amazon` auf echten Amazon-Bereich umverdrahten.
- S4.7 Amazon-Listenansicht bauen oder Shopping-Modul typbewusst wiederverwenden.
- S4.8 Grocery-Regression und Kassa-Abgrenzung korrigieren.
- S4.9 PWA-/Cache-Vertrag aktualisieren, falls neue Dateien entstanden sind.
- S4.10 Touchlog/Diagnostics nur ergaenzen, falls echte Diagnosepunkte entstehen.
- S4.11 Code Review und Contract Review.
- S4.12 Schritt-Abnahme und Commit-Empfehlung.

Review-Kriterien fuer jeden S4-Substep:

- Grocery-Default bleibt unveraendert.
- Alte Items ohne Typ bleiben sichtbar.
- Amazon-Items erscheinen nur in Amazon.
- Grocery-Items erscheinen nur in Einkauf.
- Abschluss loescht nur den aktiven Typ.
- `Liste leeren` loescht nur den aktiven Typ.
- Kein Amazon-Fancy-Stuff.

## S5 - Tests, Code Review und Contract Review

Ziel:

- Lokale, Supabase- und UI-Regressionssicherheit herstellen.

Substeps:

- S5.1 `node --check` fuer geaenderte JS-Dateien.
- S5.2 `git diff --check`.
- S5.3 State-Smokes:
  - altes Item ohne `listType` wird `grocery`.
  - neues Grocery-Item.
  - neues Amazon-Item.
  - Abschluss nur aktiver Typ.
  - `Liste leeren` nur aktiver Typ.
- S5.4 Supabase-Smokes:
  - `toRow` schreibt `list_type`.
  - `toItem` liest `list_type`.
  - fehlendes `list_type` wird `grocery`.
  - Load-Select enthaelt `list_type`.
- S5.5 SQL-Smokes:
  - Migration syntaktisch plausibel.
  - Constraint vorhanden.
  - Backfill vorhanden.
  - Index- oder Query-Plan-Entscheidung dokumentiert.
- S5.6 UI-Smokes:
  - Home zeigt `Einkauf`, `Amazon`, `Muell`.
  - Amazon-Kachel fuehrt in den echten Amazon-Bereich.
  - Reload landet nicht versehentlich in einem falschen Schreibmodus, falls S2 doch einen Modus statt getrennten Bereich beschlossen hat.
  - Amazon-Submit erscheint in Amazon.
  - Grocery-Submit erscheint in Einkauf.
  - Amazon-Liste zeigt `Bestellt`.
  - Kassa-Karussell nicht in Amazon.
- S5.7 Regression:
  - Einkauf unveraendert schnell.
  - Einkauf/Kassa unveraendert.
  - Muell unveraendert.
  - PWA/Install-Banner unveraendert.
  - Diagnostics unveraendert.
- S5.8 Code Review gegen Modulgrenzen.
- S5.9 Contract Review gegen README, PRODUCT, Module Overviews und diese Roadmap.
- S5.10 Schritt-Abnahme und Commit-Empfehlung.

Nicht lokal oder nur eingeschraenkt pruefbar:

- echte Supabase-Migration im Projekt, falls nicht lokal ausgefuehrt.
- Zwei-Geraete-Realtime-Verhalten mit beiden Typen.
- Mobile Home-Layout auf Zielgeraeten.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Code, SQL, Doku, QA und Roadmap sprechen denselben Amazon-Listen-Vertrag.

Substeps:

- S6.1 `PRODUCT.md` aktualisieren, falls Datenvertrag final erweitert wurde.
- S6.2 `README.md` aktualisieren, falls Kurzfassung/Referenzen betroffen sind.
- S6.3 `docs/modules/State Layer Module Overview.md` aktualisieren.
- S6.4 `docs/modules/Shopping Module Overview.md` aktualisieren.
- S6.5 `docs/modules/Amazon Module Overview.md` aktualisieren.
- S6.6 `docs/modules/Supabase Sync Module Overview.md` aktualisieren.
- S6.7 `docs/modules/Home Module Overview.md` aktualisieren.
- S6.8 `docs/modules/CSS Module Overview.md` aktualisieren.
- S6.9 `docs/QA_CHECKS.md` erweitern.
- S6.10 `docs/future roadmaps.md` nach Abschluss aktualisieren.
- S6.11 Roadmap mit Ergebnisprotokollen aktualisieren.
- S6.12 Finaler Contract Review:
  - Roadmap vs. Code.
  - Roadmap vs. SQL.
  - Roadmap vs. Module Overviews.
  - Roadmap vs. QA.
- S6.13 Abschluss-Abnahme.
- S6.14 Commit-Empfehlung.
- S6.15 Archiv-Entscheidung.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

## Smokechecks / Regression

- Home bleibt ruhig.
- `Einkauf` bleibt Grocery-Eingang.
- Default schreibt in Grocery.
- Amazon-Einstieg schreibt in Amazon.
- Grocery und Amazon filtern korrekt.
- `Bestellt` wirkt fuer Amazon klarer als `Im Wagen`.
- Abschluss loescht nur den aktiven Typ.
- Kassa-Karussell bleibt nur Grocery.
- Bestehende Items ohne Typ bleiben Grocery.
- Supabase-Snapshot speichert und laedt `list_type`.
- App funktioniert ohne Supabase-Konfiguration weiter lokal.
- Keine Amazon-API, Preise, Links, Affiliate oder Bestellstatus wurden eingefuehrt.

## Abnahmekriterien

- Stephan kann schnell notieren, was im Markt gekauft werden soll.
- Stephan kann genauso schnell notieren, was spaeter bei Amazon bestellt werden soll.
- Im Markt stoeren Amazon-Merkposten nicht.
- In Amazon stoeren Grocery-Eintraege nicht.
- Die App bleibt HESTIA: ruhig, klein, alltagstauglich.
- Der Datenvertrag ist migrationssicher und fuer alte Items defensiv.
