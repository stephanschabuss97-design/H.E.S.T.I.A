# HESTIA Roadmap 6B - Amazon-Liste (DONE)

## Statushinweis 16.05.2026

Diese Roadmap ist die Folgeplanung nach Roadmap 6A.

Roadmap 6A [HESTIA Einkaufsbereich Konsolidieren Roadmap (DONE).md](archive/HESTIA%20Einkaufsbereich%20Konsolidieren%20Roadmap%20(DONE).md) hat den bisherigen technischen `writing`-Screen sichtbar zu `Einkauf` weiterentwickelt. `Einkauf` ist jetzt der Grocery-Kernfluss: oben schreiben, darunter Papierliste, Abhaken, Loeschen, Abschluss und Kassa.

Roadmap 6B baut darauf auf:

- `Einkauf` bleibt Grocery.
- `Amazon` wird ein eigener Bereich mit eigener Eingabe und eigener Liste.
- Die aktuelle Home-Kachel `Amazon` wird vom Platzhalter zum echten Bereich.
- Die alte technische `shopping`-Route darf nicht unreflektiert als Amazon-Logik missbraucht werden.
- Es gibt noch keine Amazon-Liste, keinen `listType`, keine SQL-Migration und keine Amazon-Listenlogik.

Fruehere Annahmen gelten nicht mehr fuer Roadmap 6B:

- kein Writing-Toggle `Einkauf | Amazon`.
- kein Home-Zielbild `Schreiben` plus geteilter Zeile `Einkaufen | Amazon`.
- kein Amazon-Untermodus im bestehenden Einkauf.

## Ziel (klar und pruefbar)

HESTIA soll neben der normalen Einkaufsliste eine kleine Amazon-Merkliste bekommen: Dinge, die im Haushalt irgendwann online bei Amazon gekauft werden sollen.

Pruefbare Zieldefinition:

- Home zeigt weiterhin:
  - `Einkauf`
  - `Amazon`
  - `Muell`
- `Einkauf` schreibt und zeigt nur `grocery`.
- `Amazon` schreibt und zeigt nur `amazon`.
- Amazon bekommt einen eigenen Bereich mit:
  - Eingabe-Kachel wie im Einkauf.
  - eigener Papierliste.
  - `Loeschen` pro Eintrag.
  - Statuscopy `Bestellt`.
  - Abschlussaktion fuer bestellte Eintraege.
- Bestehende Items ohne Typ gelten defensiv als `grocery`.
- Grocery-Items erscheinen nicht in Amazon.
- Amazon-Items erscheinen nicht in Einkauf.
- Supabase speichert weiterhin dieselbe Haushaltstabelle, erweitert um den Typ `grocery` oder `amazon`.

## Problemzusammenfassung

Der echte Haushalt hat zwei unterschiedliche Beschaffungsarten:

- Dinge fuer den naechsten Einkauf im Geschaeft.
- Dinge, die man irgendwann online bei Amazon bestellen will.

Heute landet beides entweder in derselben Einkaufsliste oder ausserhalb von HESTIA. Das vermischt zwei Situationen: Beim Einkaufen im Markt stoeren Amazon-Merkposten, und Amazon-Merkposten gehen ausserhalb der App leicht verloren.

Die Loesung ist kein Commerce-Feature. HESTIA soll nur denselben ruhigen Haushaltszettel fuer einen zweiten Beschaffungskanal anbieten: schnell aufschreiben, spaeter als erledigt markieren, erledigte Eintraege entfernen.

## Scope

- Datenvertrag:
  - Frontend-Feld `listType`.
  - Remote-Feld `list_type`.
  - erlaubte Werte: `grocery`, `amazon`.
  - Default und Fallback: `grocery`.
  - alte lokale Items ohne `listType` gelten als `grocery`.
  - alte Supabase-Zeilen ohne `list_type` werden per Migration auf `grocery` gesetzt.
- SQL/Supabase:
  - `shopping_items` bekommt `list_type`.
  - Check-Constraint auf `grocery` und `amazon`.
  - RLS/Household-Key-Vertrag bleibt unveraendert.
  - Snapshot-Sync speichert weiterhin die aktuelle offene Haushaltsliste, jetzt mit beiden Typen.
- State:
  - `normalizeItem` setzt fehlendes oder ungueltiges `listType` auf `grocery`.
  - State-Operationen werden typbewusst, wo Filterung, Abschluss oder Leeren betroffen sind.
  - Abschluss und Leeren brauchen entweder typbewusste Parameter oder klar benannte typbewusste Operationen.
  - Bestehender Storage-Key `hestia.v1.items` bleibt, sofern S1-S3 keinen zwingenden Grund fuer einen Key-Wechsel finden.
- Einkauf:
  - bleibt der Grocery-Kernfluss.
  - bestehende Eingabe-, Semantik-, Mengen- und Einheitlogik bleibt erhalten.
  - Einkauf rendert nur `grocery`.
  - `Liste leeren` und `Liste abschliessen` betreffen nur `grocery`.
  - Kassa-Karussell bleibt nur im Grocery-Einkauf.
- Amazon:
  - eigener Screen/Bereich.
  - eigene Route `amazon`.
  - eigener Modul-Owner `app/modules/amazon.js`.
  - eigene Eingabe-Kachel nach dem Einkauf-Muster.
  - eigene Liste nach dem Papierlisten-Muster.
  - Amazon-Submit schreibt `listType: "amazon"`.
  - Amazon-Liste rendert nur `amazon`.
  - Amazon darf den alten `shopping`-Screen nicht semantisch uebernehmen.
  - `Loeschen` entfernt nur den Amazon-Eintrag.
  - `Liste leeren` oder aequivalente Amazon-Copy entfernt nur `amazon`.
  - Abschluss entfernt nur bestellte Amazon-Eintraege.
- Home:
  - vorhandene Amazon-Kachel wird auf den echten Amazon-Bereich umverdrahtet.
  - Reihenfolge bleibt `Einkauf`, `Amazon`, `Muell`.
- Doku und QA:
  - `Amazon Module Overview.md` wird vom Platzhalter zur echten Modulbeschreibung.
  - `Shopping Module Overview.md`, State, Supabase Sync, Home, CSS, QA, README/PRODUCT und Future Roadmaps werden nach Abschluss synchronisiert.
  - SQL-Migration wird dokumentiert.

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
- Kein Kassa-Karussell in Amazon.
- Kein Push, Reminder oder Notification.
- Keine robuste Parallel-Collaboration.
- Keine Umgestaltung des Waste-Bereichs.

## Relevante Referenzen (Code)

- `index.html`
- `app/main.js`
- `app/core/router.js`
- `app/core/state.js`
- `app/core/item-display.js`
- `app/core/semantics.js`
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/modules/amazon.js`
- `app/modules/kassa-carousel.js`, nur Abgrenzung: nicht auf Amazon uebernehmen
- `app/supabase/list-sync.js`
- `app/styles/home.css`
- `app/styles/writing.css`
- `app/styles/shopping.css`
- `app/styles/ui.css`
- `app/app.css`
- `sql/01_setup-supabase.sql`
- neues `sql/02_add-shopping-list-type.sql`
- S2-Entscheidung: `sql/02_add-shopping-list-type.sql` fuer bestehende Projekte und Anpassung von `sql/01_setup-supabase.sql` fuer frische Setups
- `sw.js`, falls neue JS-/CSS-Dateien entstehen

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
- `docs/archive/HESTIA Einkaufsbereich Konsolidieren Roadmap (DONE).md`
- `docs/archive/HESTIA Schreiben Speichern Listenvertrauen Roadmap (DONE).md`
- `docs/archive/HESTIA Kassa Karussell Roadmap (DONE).md`
- `docs/archive/HESTIA Entsorgung UI Roadmap (DONE).md`

Regel:

- Erst Produkt-, State-, Shopping-, Amazon- und Supabase-Vertraege lesen.
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

Deploy-Reihenfolge:

- DB-Migration muss vor App-Code funktionieren.
- Alter App-Code darf durch Default weiterhin `grocery` schreiben.
- Neuer App-Code muss alte Items defensiv als `grocery` lesen.
- Nach Amazon-App-Deploy duerfen alte Clients Amazon-Items nicht versehentlich als reine Grocery-Snapshots ueberschreiben; S1-S3 muessen dieses Risiko gegen PWA-Cache und Deployment bewerten.

S1-Fund zum bestehenden Snapshot-Save:

- `saveSnapshot(items)` loescht aktuell alle `shopping_items` des Haushalts und schreibt danach genau die uebergebenen Items neu.
- Fuer 6B darf deshalb kein gefilterter Teilstand gespeichert werden.
- Jeder Shared-Save muss den vollstaendigen offenen Household-Snapshot mit `grocery` und `amazon` transportieren, ausser S2 beschliesst bewusst einen anderen Sync-Vertrag.
- UI-Filter duerfen nur Darstellung und aktive Operationen steuern, nicht den an Supabase gespeicherten Gesamt-Snapshot versehentlich verkleinern.

S2-Entscheidung zum Snapshot-Save:

- Der bestehende Snapshot-Save bleibt ein Gesamt-Snapshot.
- `saveSnapshot(store.state.items)` bekommt weiterhin den vollstaendigen lokalen State.
- Typfilterung passiert vor UI-Aktionen und Rendering, nicht durch gefilterte Remote-Saves.
- `list-sync.js` erweitert nur Mapping und Select um `list_type`; es fuehrt keinen getrennten Amazon-Save-Pfad ein.

## UI-Vertrag

Home:

```text
Einkauf
Amazon
Muell
```

Einkauf:

- bleibt Grocery.
- schreibt `grocery`.
- zeigt nur `grocery`.
- Copy bleibt:
  - `Im Wagen`
  - `Liste abschliessen`
  - `Alles erledigt.`
- Kassa-Karussell bleibt sichtbar.

Amazon:

- eigener Bereich.
- Route: `amazon`.
- Modul: neues `app/modules/amazon.js`.
- Styling: zuerst bestehende `writing.css`, `shopping.css` und globale UI-Muster wiederverwenden; neues `amazon.css` nur bei belegtem Owner-Bedarf in S4.
- Eingabe-Kachel nach dem Einkauf-Muster.
- Liste nach dem Papierlisten-Muster.
- schreibt `amazon`.
- zeigt nur `amazon`.
- Copy:
  - `Bestellt`
  - Abschluss `Bestellte entfernen`
  - leerer Zustand `Keine Amazon-Eintraege.`
  - Listenpanel `Amazon-Liste`
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
  - `app/modules/amazon.js`
  - `app/supabase/list-sync.js`
  - `app/core/router.js`
  - `app/main.js`
  - `app/styles/home.css`
  - `app/styles/writing.css`
  - `app/styles/shopping.css`
  - `app/styles/ui.css`, falls ein gemeinsames Pattern bewusst gebraucht wird
  - ggf. neues `app/styles/amazon.css`, nur falls S4 belegten eigenen Style-Owner braucht
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

## Vorab Contract Review 16.05.2026

Review-Frage:

- Darf HESTIA eine eigene Amazon-Liste bekommen, ohne zur Commerce-App oder zum Feature-Sammelbecken zu werden?

Entscheidung:

- Ja, wenn Amazon ein eigener, kleiner Beschaffungskanal auf dem bestehenden Listenmuster ist: eigene Eingabe, eigene Liste, typgetrennte Daten, keine Shop-Integration.

Findings:

- CR-6B-F1: Die alte Roadmap enthielt noch Toggle- und Untermodus-Annahmen. Das widerspricht der neuen Produktentscheidung `Einkauf`, `Amazon`, `Muell`.
- CR-6B-F2: Amazon darf nicht einfach den alten `shopping`-Screen semantisch uebernehmen, weil dort `Im Wagen`, Kassa und Grocery-Abschlusslogik stecken.
- CR-6B-F3: `listType/list_type` ist eine bewusste Datenvertragsaenderung und muss in S1-S3 gegen State, Supabase und SQL geprueft werden.
- CR-6B-F4: Alte lokale und Remote-Items ohne Typ duerfen nicht verschwinden.
- CR-6B-F5: `Liste leeren` und Abschluss duerfen nie beide Typen gleichzeitig entfernen, ausser ein spaeterer Contract erlaubt das ausdruecklich.
- CR-6B-F6: Amazon-Copy braucht eigene Sprache (`Bestellt`), darf aber technisch das bestehende `inCart`-Flag wiederverwenden, wenn S2 das bestaetigt.
- CR-6B-F7: Kassa-Karussell darf nicht in Amazon auftauchen.
- CR-6B-F8: PWA-/Deploy-Reihenfolge ist kritisch, weil alte Clients neue `amazon`-Items sonst als fremde Snapshots behandeln koennten.

Korrekturen:

- Roadmap wurde auf eigenen Amazon-Bereich mit eigener Eingabe und eigener Liste umgeschrieben.
- Toggle- und Untermodus-Varianten wurden als 6B-Vertrag entfernt.
- Home-Zielbild ist `Einkauf`, `Amazon`, `Muell`.
- `Einkauf` bleibt Grocery.
- Amazon schreibt und liest `amazon`.
- SQL-Skizze, Defensive Defaults und Deploy-Reihenfolge bleiben explizit.
- Kassa ist ausdruecklich aus Amazon ausgeschlossen.
- S4-Substeps wurden auf eigenen Amazon-Bereich statt Toggle ausgerichtet.

Nachpruefung:

- Keine offenen 6B-Contract-Findings nach Korrektur.
- Verbleibende Nennungen von Toggle/Untermodus sind nur noch historische Ausschluesse im Contract Review, keine Umsetzungsoption.

## Statusmatrix

| ID | Schritt | Status | Ergebnis/Notiz |
| --- | --- | --- | --- |
| S1 | System-, Daten- und SQL-Vertragsdetektivarbeit | DONE | Ist-Vertraege gelesen; globaler State, globaler Snapshot-Save und fehlendes `list_type` als Hauptbruchstellen dokumentiert. |
| S2 | Fachlicher/technischer Contract Review | DONE | Eigener Amazon-Screen, `listType/list_type`, typbewusste State-Operationen, Gesamt-Snapshot-Save und SQL-Migration finalisiert. |
| S3 | Bruchrisiko-, UI-/Copy- und Umsetzungsreview | DONE | Risiken, Copy, UI-Ziel, Teststrategie und S4-Reihenfolge konkretisiert. |
| S4 | Umsetzung | DONE | S4.1 bis S4.13 umgesetzt, reviewed und abgenommen; naechster Schritt S5 Gesamtpruefung. |
| S5 | Tests, Code Review und Contract Review | DONE | Lokale State-, SQL-, Supabase-, UI-, PWA- und Contract-Smokes gruen; Zielgeraete-/Realtime-Resttests fuer S6 dokumentiert. |
| S6 | Doku-Sync, QA-Update und finaler Abschlussreview | DONE | README, PRODUCT, Module Overviews, QA, Future Roadmaps und Roadmap synchronisiert; archivbereit nach finaler Nutzerabnahme. |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`.

## S1 - System-, Daten- und SQL-Vertragsdetektivarbeit

Ziel:

- Ist-Zustand und genaue Eingriffsgrenzen klaeren, bevor Code geschrieben wird.

Substeps:

- S1.1 README, PRODUCT, Future Roadmaps und diese Roadmap lesen.
- S1.2 State-, Shopping-, Amazon- und Supabase-Sync-Overviews lesen.
- S1.3 `app/core/state.js`, `writing.js`, `shopping.js`, `list-sync.js`, `main.js` und `router.js` lesen.
- S1.4 SQL-Bestand in `sql/01_setup-supabase.sql` und Supabase-Setup-Doku pruefen.
- S1.5 Bestehende lokale Storage-Normalisierung pruefen.
- S1.6 Bestehenden Remote-Load/Save-Vertrag pruefen.
- S1.7 Home-Amazon-Platzhalter und Routing pruefen.
- S1.8 Kassa-Karussell-Abgrenzung pruefen.
- S1.9 S1 Contract Review.
- S1.10 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- Alle betroffenen Vertraege sind gelesen und die Umsetzung darf mit S2 weiter konkretisiert werden.

### S1 Ergebnisprotokoll 17.05.2026

Durchgefuehrt:

- S1.1 README, PRODUCT, Future Roadmaps und diese Roadmap gelesen.
- S1.2 State-, Shopping-, Amazon- und Supabase-Sync-Overviews gelesen.
- S1.3 `app/core/state.js`, `writing.js`, `shopping.js`, `list-sync.js`, `main.js` und `router.js` gelesen.
- S1.4 `sql/01_setup-supabase.sql` und Supabase-Setup-Doku geprueft.
- S1.5 lokale Storage-Normalisierung geprueft.
- S1.6 Remote-Load/Save-Vertrag geprueft.
- S1.7 Home-Amazon-Platzhalter und Routing geprueft.
- S1.8 Kassa-Karussell-Abgrenzung geprueft.

Ist-Zustand:

- `state.items` ist weiterhin die operative Gesamtlistenwahrheit.
- Lokaler Storage-Key ist `hestia.v1.items`.
- `normalizeItem` kennt aktuell nur `id`, `name`, `quantity`, `unit`, `inCart`.
- `clearAll()` und `finishShopping()` arbeiten aktuell global auf allen Items.
- `writing.js` rendert aktuell alle Items im sichtbaren `Einkauf`.
- `shopping.js` rendert aktuell alle Items im alten technischen Shopping-Screen.
- Home zeigt `Einkauf`, `Amazon`, `Muell`; `Amazon` navigiert aktuell noch nach `shopping`.
- `shopping` enthaelt noch Grocery-Copy `Einkaufen`, `Im Wagen`-Semantik, Abschluss und Kassa-Karussell.
- `list-sync.js` liest und schreibt aktuell `id`, `name`, `quantity`, `unit`, `in_cart`, aber kein `list_type`.
- `saveSnapshot(items)` loescht aktuell alle Items des Haushalts und schreibt danach den uebergebenen Snapshot neu.
- SQL `shopping_items` enthaelt aktuell kein `list_type`.
- RLS ist haushaltsbasiert und muss fuer 6B nicht neu entworfen werden.
- Kassa-Karussell ist mehrfach instanzfaehig, aber laut Vertrag nur Grocery/Kassa-Hilfe und nicht Amazon.

S1 Contract Review:

- S1-F1: `listType/list_type` ist bestaetigt eine echte Datenvertragsaenderung. Ohne State-, Sync- und SQL-Anpassung ist Amazon nicht sicher trennbar.
- S1-F2: Globale State-Operationen sind die groesste lokale Bruchstelle. `clearAll()` und `finishShopping()` duerfen nach 6B nicht mehr untypisiert aus Einkauf oder Amazon verwendet werden.
- S1-F3: Der bestehende Snapshot-Save ist global. Wenn ein gefilterter Teilstand gespeichert wird, loescht er den anderen Listentyp remote. S2 muss den Save-Vertrag explizit schuetzen.
- S1-F4: Home-Amazon ist aktuell nur Routing auf `shopping`. Dieser Screen darf nicht direkt als fertige Amazon-Ansicht gelten, weil er Grocery-Copy, Grocery-Abschluss und Kassa enthaelt.
- S1-F5: SQL braucht mindestens `list_type`, Backfill, Not-null, Check-Constraint und eine Index-/Query-Entscheidung.
- S1-F6: PWA-Cache muss nur bei neuen Dateien angepasst werden; bei neuem `amazon.js` oder `amazon.css` ist ein `sw.js`-Version-/App-Shell-Update Pflicht.

Korrekturen nach S1:

- Roadmap ergaenzt: Abschluss und Leeren brauchen typbewusste Parameter oder klar benannte typbewusste Operationen.
- Roadmap ergaenzt: `saveSnapshot(items)` darf in 6B keinen gefilterten Teilstand speichern; Shared-Saves muessen den vollstaendigen offenen Household-Snapshot mit beiden Typen transportieren.

S1 Abnahme:

- S1 ist abgeschlossen.
- Keine Code-Aenderungen in S1.
- Doku-Sync-Entscheidung: S1-Findings bleiben vorerst in dieser Roadmap; Module Overviews werden erst in S6 nach finaler Umsetzung synchronisiert.
- Commit-Empfehlung: noch kein eigener Commit nur fuer S1 noetig, sinnvoll zusammen mit S2/S3-Doku oder spaeterem 6B-Umsetzungspaket.

## S2 - Fachlicher/technischer Contract Review

Ziel:

- Finaler Produkt-, Daten-, SQL-, Copy-, Sync- und UI-Vertrag.

Substeps:

- S2.1 Eigenen Amazon-Bereich als finalen 6B-Produktvertrag bestaetigen.
- S2.2 `listType/list_type`-Vertrag finalisieren.
- S2.3 SQL-Migrationsvertrag finalisieren:
  - idempotent oder bewusst einmalig
  - Default
  - Backfill
  - Not-null
  - Check-Constraint
- S2.4 LocalStorage-/State-Normalisierung finalisieren.
- S2.5 Supabase-Load/Save/Realtime-Vertrag finalisieren.
- S2.6 Home-Routing-Vertrag finalisieren.
- S2.7 Amazon-Copy finalisieren.
- S2.8 Grocery-/Amazon-Abschlusslogik finalisieren.
- S2.9 Typbewusste `Liste leeren`-Semantik finalisieren.
- S2.10 Kassa-Karussell-Abgrenzung finalisieren.
- S2.11 PWA-/Deploy-Reihenfolge finalisieren.
- S2.12 Modulzuschnitt finalisieren: `shopping.js` erweitern oder eigenes `amazon.js`.
- S2.13 Contract Review S2.
- S2.14 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- Es gibt keine offenen Produkt- oder Datenmodellfragen mehr fuer S4.

### S2 Ergebnisprotokoll 17.05.2026

Finale Entscheidungen:

- S2.1 Amazon wird ein eigener Bereich mit eigener Route `amazon`.
- S2.2 Der Frontend-Vertrag wird um `listType` erweitert:
  - erlaubt: `grocery`, `amazon`
  - Default/Fallback: `grocery`
  - unbekannte Werte werden defensiv `grocery`
- S2.3 Der Remote-Vertrag wird um `list_type` erweitert:
  - `text not null default 'grocery'`
  - Backfill bestehender Zeilen auf `grocery`
  - Check-Constraint auf `grocery`, `amazon`
  - Index auf `(household_id, list_type, in_cart)`
  - Umsetzung als idempotentes `sql/02_add-shopping-list-type.sql`
  - `sql/01_setup-supabase.sql` wird fuer frische Setups ebenfalls nachgezogen
- S2.4 LocalStorage-Key bleibt `hestia.v1.items`.
- S2.5 `saveSnapshot` bleibt Gesamt-Snapshot:
  - kein gefilterter Grocery-Save
  - kein gefilterter Amazon-Save
  - immer `store.state.items` als vollstaendiger offener Household-Stand
  - `toRow` schreibt `list_type`
  - `toItem` liest `list_type`
  - Load-Select enthaelt `list_type`
- S2.6 Home-Routing:
  - `Einkauf` -> `writing`
  - `Amazon` -> `amazon`
  - `Muell` -> `waste`
  - alter `shopping`-Screen bleibt technisch erhalten, aber nicht als Amazon-Implementierung
- S2.7 Amazon-Copy:
  - Screen: `Amazon`
  - Eingabe wie Einkauf
  - Listenpanel: `Amazon-Liste`
  - Checkbox/Status: `Bestellt`
  - Abschluss: `Bestellte entfernen`
  - leer: `Keine Amazon-Eintraege.`
- S2.8 Abschlusslogik:
  - `finishShopping()` bleibt nicht untypisiert fuer UI-Flows verwendbar.
  - S4 baut `finishByType(listType)` oder aequivalent klar benannte Operationen.
  - Einkauf schliesst nur `grocery` ab.
  - Amazon entfernt nur `amazon` mit `inCart === true`, sichtbar `Bestellt`.
- S2.9 Leeren:
  - `clearAll()` bleibt nicht untypisiert fuer UI-Flows verwendbar.
  - S4 baut `clearByType(listType)` oder aequivalent klar benannte Operationen.
  - Einkauf leert nur `grocery`.
  - Amazon leert nur `amazon`.
- S2.10 Kassa:
  - Kassa-Karussell bleibt nur im Grocery-Einkauf und alten Shopping-Screen.
  - Amazon bekommt kein Kassa-Karussell.
- S2.11 PWA/Deploy:
  - DB-Migration vor App-Code.
  - frische Setups bekommen `list_type` direkt in `01_setup`.
  - bestehende Setups fuehren `02_add-shopping-list-type.sql` aus.
  - wenn `amazon.js` entsteht, muss `sw.js` Cache-Version und `APP_SHELL` aktualisiert werden.
  - bei neuem `amazon.css` gilt dasselbe; S2 bevorzugt aber zunaechst Wiederverwendung bestehender Styles.
- S2.12 Modulzuschnitt:
  - neues `app/modules/amazon.js`.
  - kein Umbau des alten `shopping.js` zur Amazon-Logik.
  - `shopping.js` bleibt alte Vergleichs-/Rueckfallflaeche.

S2 Contract Review:

- S2-F1: Der alte `shopping`-Screen darf nicht der Amazon-Screen werden, weil er Grocery-Semantik und Kassa enthaelt. Entscheidung: neuer `amazon`-Screen plus neues `amazon.js`.
- S2-F2: Gefilterte Saves wuerden remote den jeweils anderen Typ loeschen. Entscheidung: `saveSnapshot` bleibt Gesamt-Snapshot und bekommt immer `store.state.items`.
- S2-F3: Ungetypte State-Operationen sind fuer 6B gefaehrlich. Entscheidung: UI-Flows verwenden nur typbewusste Operationen fuer Abschluss und Leeren.
- S2-F4: Nur ein Migrationsfile waere fuer frische Setups zu wenig, nur `01_setup` waere fuer bestehende Supabase-Projekte zu wenig. Entscheidung: `01_setup` und `02_add-shopping-list-type.sql` werden beide gepflegt.
- S2-F5: Amazon-Copy darf nicht `Im Wagen` oder `Liste abschliessen` erben. Entscheidung: `Bestellt`, `Bestellte entfernen`, `Amazon-Liste`, `Keine Amazon-Eintraege.`
- S2-F6: Ein neues Modul bedeutet PWA-Cache-Pflicht. Entscheidung: `sw.js` nur anpassen, wenn neue Dateien entstehen; bei `amazon.js` ja.

Korrekturen nach S2:

- Roadmap ergaenzt: Amazon bekommt eigene Route `amazon` und eigenen Modul-Owner `app/modules/amazon.js`.
- Roadmap ergaenzt: `shopping.js` wird nicht semantisch als Amazon wiederverwendet.
- Roadmap ergaenzt: `saveSnapshot` bleibt Gesamt-Snapshot.
- Roadmap ergaenzt: konkrete Amazon-Copy und SQL-Dateientscheidung.

S2 Abnahme:

- S2 ist abgeschlossen.
- Keine Code-Aenderungen in S2.
- Doku-Sync-Entscheidung: S2-Vertrag bleibt in dieser Roadmap; Module Overviews folgen in S6 nach Umsetzung.
- Commit-Empfehlung: noch kein separater Commit noetig; sinnvoll nach S3 oder nach erstem Code-Substep.

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
  - Amazon-Bereich schreibt versehentlich `grocery`.
  - Einkauf schreibt versehentlich `amazon`.
  - alter PWA-Client speichert Amazon-Snapshot als Grocery.
  - Kassa taucht in Amazon auf.
- S3.2 Copy Review:
  - `Amazon`
  - `Bestellt`
  - Abschlusscopy `Bestellte entfernen`
  - leere Amazon-Liste.
- S3.3 UI-Layout Review:
  - Home.
  - Amazon-Eingabe-Kachel.
  - Amazon-Papierliste.
  - Amazon-Abschlussaktion.
- S3.4 SQL-/Migration-Teststrategie konkretisieren.
- S3.5 LocalStorage-/State-Teststrategie konkretisieren.
- S3.6 Supabase-/Sync-Teststrategie konkretisieren.
- S3.7 S4-Substeps konkretisieren.
- S3.8 Contract Review S3.
- S3.9 Schritt-Abnahme, Doku-Sync-Entscheidung und Commit-Empfehlung.

Exit-Kriterium:

- S4 ist in kleine, pruefbare Substeps zerlegt.

### S3 Ergebnisprotokoll 17.05.2026

S3.1 Bruchrisiken:

- R1: Bestehende lokale Items ohne `listType` verschwinden, wenn Normalisierung nicht defensiv ist.
- R2: Bestehende Supabase-Zeilen ohne `list_type` verschwinden oder werden nicht geladen, wenn Migration/Select nicht defensiv ist.
- R3: Einkauf-`Liste abschliessen` entfernt Amazon-Items, wenn Abschluss weiter global bleibt.
- R4: Amazon-`Bestellte entfernen` entfernt Grocery-Items, wenn Abschluss weiter global bleibt.
- R5: `Liste leeren` entfernt beide Typen, wenn `clearAll()` direkt aus einem Bereich verwendet wird.
- R6: Gefilterte UI-Arrays werden an `saveSnapshot` uebergeben und loeschen remote den jeweils anderen Typ.
- R7: `toRow` schreibt `list_type` nicht, wodurch neue Amazon-Items remote als `grocery` landen.
- R8: `toItem` liest `list_type` nicht, wodurch Remote-Amazon-Items lokal als Grocery erscheinen.
- R9: Home-Amazon bleibt versehentlich auf `shopping` geroutet.
- R10: Amazon uebernimmt Kassa-Karussell oder `Im Wagen`-Copy aus dem alten Shopping-Screen.
- R11: neuer `amazon.js` wird nicht in `sw.js` aufgenommen, sodass installierte PWA/Offline-Shell den Bereich nicht verlaesslich bekommt.
- R12: alter PWA-Client nach DB-Migration kann Amazon-Items durch einen alten Gesamt-Snapshot verlieren; Deploy-/Testhinweis bleibt Pflicht.

S3.2 Copy Review:

- Home-Kachel bleibt `Amazon`.
- Amazon-Screen-Titel: `Amazon`.
- Eingabe darf wie Einkauf funktionieren, aber schreibt immer `amazon`.
- Listenpanel: `Amazon-Liste`.
- Checkbox-Label/Status: `Bestellt`.
- Abschlussaktion: `Bestellte entfernen`.
- Leerer Zustand: `Keine Amazon-Eintraege.`
- Keine Copy zu Preisen, Links, Shop, Bestellung verfolgen oder Produktdetails.

S3.3 UI-Layout Review:

- Home bleibt dreizeilig und ruhig: `Einkauf`, `Amazon`, `Muell`.
- Amazon bekommt keinen Dashboard- oder Shop-Look.
- Amazon-Bereich darf visuell dem Einkauf folgen:
  - oben Eingabe-Panel.
  - darunter Listenpanel.
  - Papierlistenzeilen mit Checkbox, Name, Meta und `Loeschen`.
  - Abschlussaktion unterhalb der Liste.
- Kein Kassa-Karussell im Amazon-Bereich.
- Kein externer Amazon-Link.
- Alter `screen-shopping` bleibt technisch erreichbar, aber ist nicht der Amazon-Zielbereich.

S3.4 SQL-/Migration-Teststrategie:

- `sql/02_add-shopping-list-type.sql` statisch pruefen:
  - `add column if not exists list_type`.
  - Backfill `where list_type is null`.
  - `alter column list_type set not null`.
  - Check-Constraint idempotent.
  - Index auf `(household_id, list_type, in_cart)`.
- `sql/01_setup-supabase.sql` pruefen:
  - neue Spalte in frischer Tabelle.
  - Check-Constraint vorhanden.
  - Index vorhanden.
- Keine RLS-Neuverhandlung; bestehende Haushaltspolicies bleiben.

S3.5 LocalStorage-/State-Teststrategie:

- `normalizeItem({ name: "Milch" })` ergibt `listType: "grocery"`.
- unbekanntes `listType` ergibt `grocery`.
- neues Grocery-Item enthaelt `listType: "grocery"`.
- neues Amazon-Item enthaelt `listType: "amazon"`.
- `clearByType("grocery")` entfernt nur Grocery.
- `clearByType("amazon")` entfernt nur Amazon.
- `finishByType("grocery")` entfernt nur Grocery mit `inCart === true`.
- `finishByType("amazon")` entfernt nur Amazon mit `inCart === true`.
- `toggleInCart` bleibt id-basiert und darf den Typ nicht veraendern.

S3.6 Supabase-/Sync-Teststrategie:

- `toRow` mappt `listType` nach `list_type`.
- `toItem` mappt `list_type` nach `listType`.
- fehlendes oder ungueltiges `list_type` wird `grocery`.
- REST-Select enthaelt `list_type`.
- `saveSnapshot` wird weiterhin mit dem vollstaendigen `store.state.items` aufgerufen.
- Realtime-Load darf beide Typen laden.
- UI-Filter duerfen nicht in Remote-Save-Filter kippen.

S3.7 S4-Substeps konkretisiert:

- S4.1 SQL zuerst: `01_setup` und `02_add-shopping-list-type.sql`.
- S4.2 State danach: Normalisierung, typed helpers, alte global helpers absichern.
- S4.3 Sync danach: Mapping/Select mit `list_type`, Gesamt-Snapshot beibehalten.
- S4.4 Einkauf filtern und typed operations verwenden.
- S4.5 Amazon-Markup/Route/Modul anlegen.
- S4.6 Amazon-Eingabe und Liste auf `amazon` verdrahten.
- S4.7 Amazon-Aktionen `Bestellt`, `Loeschen`, `Leeren`, `Bestellte entfernen`.
- S4.8 Home auf `amazon` route umverdrahten.
- S4.9 Regression: Grocery, alter Shopping-Screen, Kassa, Waste.
- S4.10 PWA-Cache aktualisieren, weil `amazon.js` entsteht.
- S4.11 Touchlog nur bei echten neuen Diagnosepunkten.
- S4.12 Review/Test/Fix.

S3 Contract Review:

- S3-F1: S4 darf nicht mit UI anfangen, weil sonst Typ- und Remote-Save-Risiken verdeckt bleiben. Korrektur: S4-Reihenfolge bleibt SQL -> State -> Sync -> UI.
- S3-F2: `saveSnapshot` ist die hoechste Sync-Falle. Korrektur: Teststrategie und Review-Kriterien pruefen explizit vollstaendigen Snapshot.
- S3-F3: `shopping.js` darf nicht still verschwinden oder ungetestet bleiben. Korrektur: S4.9 enthaelt Regression fuer alten Shopping-Screen und Kassa.
- S3-F4: Amazon-Copy muss final bleiben, damit S4 keine Grocery-Begriffe erbt. Korrektur: Copy-Vertrag in S3 festgeschrieben.
- S3-F5: Neuer `amazon.js` macht PWA-Cache-Update zwingend. Korrektur: S4.10 ist Pflicht, nicht optional, sobald Datei angelegt ist.

Korrekturen nach S3:

- Statusmatrix auf S3 `DONE` gesetzt.
- S3 dokumentiert jetzt konkrete Risiken, Teststrategie und S4-Reihenfolge.
- S4.10 bleibt als Pflichtpruefung fuer `sw.js`, weil `amazon.js` nach S2 entsteht.

S3 Abnahme:

- S3 ist abgeschlossen.
- Keine Code-Aenderungen in S3.
- Doku-Sync-Entscheidung: S3-Findings bleiben in dieser Roadmap; Module Overviews folgen in S6 nach Umsetzung.
- Commit-Empfehlung: Doku-Commit waere moeglich, sinnvoller aber zusammen mit S1-S3 als Roadmap-Vorbereitung oder spaeterem ersten S4-Substep.

## S4 - Umsetzung

Ziel:

- Amazon-Liste bauen, ohne den bestehenden Grocery-Fluss zu verschlechtern.

Finalisierte Substeps nach S3:

- S4.1 SQL-Migration/Schema-Vertrag umsetzen. DONE 17.05.2026.
- S4.2 State-Normalisierung und typbewusste Operationen bauen. DONE 17.05.2026.
- S4.3 Supabase Mapping und REST-Select/Insert um `list_type` erweitern. DONE 17.05.2026.
- S4.4 Einkauf typbewusst auf `grocery` begrenzen. DONE 17.05.2026.
- S4.5 Amazon-Screen/Bereich mit Eingabe-Kachel bauen. DONE 17.05.2026.
- S4.6 Amazon-Liste rendern und Amazon-Submit auf `amazon` verdrahten. DONE 17.05.2026.
- S4.7 Amazon-`Bestellt`, Loeschen, Leeren und Abschluss typbewusst bauen. DONE 17.05.2026.
- S4.8 Home-Amazon-Kachel auf echten Amazon-Bereich umverdrahten. DONE 17.05.2026.
- S4.9 Grocery-Regression und Kassa-Abgrenzung korrigieren. DONE 17.05.2026.
- S4.10 PWA-/Cache-Vertrag aktualisieren, weil `amazon.js` entsteht. DONE 17.05.2026.
- S4.11 Touchlog/Diagnostics nur ergaenzen, falls echte Diagnosepunkte entstehen. DONE 17.05.2026.
- S4.12 Code Review und Contract Review. DONE 17.05.2026.
- S4.13 Schritt-Abnahme und Commit-Empfehlung. DONE 17.05.2026.

Review-Kriterien fuer jeden S4-Substep:

- Grocery-Default bleibt unveraendert.
- Alte Items ohne Typ bleiben sichtbar.
- Amazon-Items erscheinen nur in Amazon.
- Grocery-Items erscheinen nur in Einkauf.
- Abschluss loescht nur den aktiven Typ.
- `Liste leeren` loescht nur den aktiven Typ.
- Kein Amazon-Fancy-Stuff.

### S4.1 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `sql/01_setup-supabase.sql` von `v1.0.1` auf `v1.1.0` aktualisiert.
- Frische Setups erhalten in `public.shopping_items` jetzt:
  - `list_type text not null default 'grocery'`
  - `shopping_items_list_type_check` fuer `grocery` und `amazon`
  - Index `shopping_items_household_type_idx` auf `(household_id, list_type, in_cart)`
  - Spaltenkommentar fuer `list_type`
- Neues idempotentes Migrationsfile `sql/02_add-shopping-list-type.sql` angelegt.
- Migration fuer bestehende Supabase-Projekte:
  - fuegt `list_type` hinzu, falls fehlend.
  - setzt fehlende oder ungueltige Werte defensiv auf `grocery`.
  - setzt Default `grocery`.
  - setzt `not null`.
  - legt Check-Constraint idempotent an.
  - legt Typ-Index idempotent an.
  - dokumentiert die Spalte.

Code Review:

- Keine RLS-Policy wurde veraendert.
- Household-Key-Vertrag bleibt unveraendert.
- Bestehende Indizes bleiben erhalten.
- Neue Spalte ist fuer alte App-Versionen defensiv, weil Default `grocery` greift.
- Frisches Setup und bestehende Projekte sind beide abgedeckt.

Contract Review:

- S4.1-F1: Nur `01_setup` zu aendern waere fuer bestehende Supabase-Projekte unzureichend. Behoben durch `02_add-shopping-list-type.sql`.
- S4.1-F2: Nur eine Migration zu schreiben waere fuer frische Setups unvollstaendig. Behoben durch Anpassung von `01_setup`.
- S4.1-F3: Bestehende oder fehlerhafte Werte duerfen die Constraint-Anlage nicht brechen. Behoben durch Backfill fuer `null` und unbekannte Werte auf `grocery`.
- S4.1-F4: SQL-Doku sollte fuer frische und bestehende Setups gleichwertig sein. Behoben durch Spaltenkommentar in beiden SQL-Pfaden.

Checks:

- `rg` bestaetigt `list_type`, Default, Check-Constraint, Index und Kommentar in beiden SQL-Pfaden.
- `git diff --check -- sql/01_setup-supabase.sql sql/02_add-shopping-list-type.sql` ohne Whitespace-Fehler; nur Windows-LF/CRLF-Hinweis.

Nicht ausgefuehrt:

- Keine echte Supabase-Migration gegen das Projekt ausgefuehrt.
- Kein `psql`/Supabase-CLI-Lauf, weil S4.1 lokal statisch und ohne Remote-Eingriff gehalten wurde.

S4.1 Abnahme:

- S4.1 ist abgeschlossen.
- Naechster Schritt: S4.2 State-Normalisierung und typbewusste Operationen.

### S4.2 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `app/core/state.js` erweitert um erlaubte Listentypen `grocery` und `amazon`.
- `normalizeItem` setzt fehlendes oder ungueltiges `listType` defensiv auf `grocery`.
- Neue Items ohne expliziten Typ bleiben damit Grocery.
- `listType` wird lokal mitpersistiert, weil `setItems()` weiterhin die normalisierten Items in `hestia.v1.items` schreibt.
- Neue typbewusste Operationen:
  - `clearByType(listType)`
  - `finishByType(listType)`
- `toggleInCart(id, inCart)` bleibt id-basiert und veraendert den Typ nicht.
- Bestehende globale Methoden `clearAll()` und `finishShopping()` bleiben fuer Kompatibilitaet erhalten, duerfen aber nach den UI-Schritten nicht mehr fuer Einkauf/Amazon-Flows verwendet werden.

Code Review:

- Bestehende lokale Items ohne `listType` bleiben sichtbar und werden `grocery`.
- Unbekannte Typen werden nicht in den State uebernommen, sondern zu `grocery` normalisiert.
- `clearByType("grocery")` und `clearByType("amazon")` entfernen jeweils nur den aktiven Typ.
- `finishByType("grocery")` und `finishByType("amazon")` entfernen jeweils nur Items des aktiven Typs mit `inCart === true`.
- Keine Aenderung am Storage-Key.
- Keine UI- oder Sync-Aenderung in S4.2.

Contract Review:

- S4.2-F1: Alte lokale Items ohne Typ duerfen nicht verschwinden. Behoben durch Default `grocery`.
- S4.2-F2: Unbekannte lokale Typen duerfen keine dritte Listenklasse erzeugen. Behoben durch defensive Normalisierung auf `grocery`.
- S4.2-F3: Abschluss/Leeren duerfen kuenftig nicht mehr global laufen. Behoben durch neue typbewusste Operationen; UI-Umschaltung folgt in S4.4 und S4.7.
- S4.2-F4: Der bestehende UI-Code nutzt noch `clearAll()` und `finishShopping()`. Das ist nach S4.2 noch kompatibel, bleibt aber fuer S4.4/S4.7 ein expliziter Fixpunkt.

Checks:

- `node --check app/core/state.js`
- Node-Smoke fuer:
  - altes Item ohne `listType` -> `grocery`
  - unbekannter Typ -> `grocery`
  - `finishByType("amazon")` entfernt nur bestellte Amazon-Items
  - `clearByType("grocery")` entfernt nur Grocery
  - neues Item ohne Typ -> `grocery`

S4.2 Abnahme:

- S4.2 ist abgeschlossen.
- Naechster Schritt: S4.3 Supabase Mapping und REST-Select/Insert um `list_type` erweitern.

### S4.3 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `app/supabase/list-sync.js` erweitert um defensive `listType`-Normalisierung.
- `toRow(item, householdId)` schreibt jetzt `list_type`.
- `toItem(row)` liest jetzt `list_type` und normalisiert fehlende oder unbekannte Werte auf `grocery`.
- REST-Select in `loadItemsForHousehold()` enthaelt jetzt `list_type`.
- `saveSnapshot(items)` bleibt unveraendert ein Gesamt-Snapshot und bekommt weiterhin den uebergebenen Gesamt-Array.
- Kein getrennter Grocery- oder Amazon-Save-Pfad wurde eingefuehrt.
- Kleine Test-Hooks fuer die reinen Mapper wurden exportiert, damit lokale Node-Smokes ohne Remote-Supabase moeglich sind.

Code Review:

- Remote-Amazon-Zeilen werden beim Laden nicht mehr zu Grocery degradiert.
- Neue Amazon-Items koennen nach S4.6/S4.7 remote als `amazon` gespeichert werden.
- Alte Remote-Zeilen ohne `list_type` bleiben defensiv `grocery`.
- Unbekannte Remote-Typen erzeugen keine dritte Klasse, sondern fallen auf `grocery`.
- Realtime nutzt denselben `loadItemsForHousehold()`-Pfad und bekommt damit ebenfalls `list_type`.
- Keine RLS-, Household-Key- oder REST-Delete-Aenderung.

Contract Review:

- S4.3-F1: `toRow` ohne `list_type` wuerde Amazon-Items remote als Grocery speichern. Behoben durch Mapping `listType -> list_type`.
- S4.3-F2: `toItem` ohne `list_type` wuerde Remote-Amazon-Items lokal als Grocery anzeigen. Behoben durch Mapping `list_type -> listType`.
- S4.3-F3: REST-Select ohne `list_type` wuerde das Feld nicht laden. Behoben durch Select-Erweiterung.
- S4.3-F4: Ein getrennter Save-Pfad wuerde den Snapshot-Vertrag aufweichen. Nicht eingefuehrt; `saveSnapshot` bleibt Gesamt-Snapshot.

Checks:

- `node --check app/supabase/list-sync.js`
- Node-Mapping-Smoke fuer:
  - `listType: "amazon"` -> `list_type: "amazon"`
  - fehlendes `listType` -> `list_type: "grocery"`
  - unbekanntes `listType` -> `list_type: "grocery"`
  - `list_type: "amazon"` -> `listType: "amazon"`
  - fehlendes `list_type` -> `listType: "grocery"`
  - unbekanntes `list_type` -> `listType: "grocery"`
- `rg` bestaetigt `list_type` im Select und Mapping.

Nicht ausgefuehrt:

- Kein Remote-Supabase-Load/Save in S4.3.
- Kein Realtime-Zwei-Geraete-Test in S4.3.

S4.3 Abnahme:

- S4.3 ist abgeschlossen.
- Naechster Schritt: S4.4 Einkauf typbewusst auf `grocery` begrenzen.

### S4.4 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `app/modules/writing.js` begrenzt den sichtbaren Einkauf jetzt auf `grocery`.
- Neue lokale Konstante `GROCERY_LIST_TYPE = "grocery"`.
- `getGroceryItems()` filtert die im Einkauf sichtbare Papierliste.
- `hasItems()` und `hasCartItems()` beziehen sich im Einkauf nur noch auf Grocery.
- Neue Eintraege aus dem Einkauf werden explizit mit `listType: "grocery"` angelegt.
- `Liste leeren` nutzt jetzt `store.clearByType("grocery")`.
- `Liste abschliessen` nutzt jetzt `store.finishByType("grocery")`.
- `persistSharedState()` speichert weiterhin `store.state.items` als vollstaendigen Gesamt-Snapshot.

Code Review:

- Amazon-Items werden im Einkauf nicht mehr gerendert.
- Grocery-Items ohne Amazon-Bezug bleiben unveraendert bedienbar.
- Einkauf-Add kann keine Amazon-Items erzeugen.
- Einkauf-`Liste leeren` entfernt keine Amazon-Items.
- Einkauf-`Liste abschliessen` entfernt keine bestellten Amazon-Items.
- Remote-Save bleibt Gesamt-Snapshot; kein gefiltertes Grocery-Array wird gespeichert.

Contract Review:

- S4.4-F1: Wenn der Einkauf weiter `store.state.items` rendert, erscheinen Amazon-Items im Grocery-Flow. Behoben durch `getGroceryItems()`.
- S4.4-F2: Wenn Add keinen Typ setzt, haengt Grocery nur am Default. Behoben durch explizites `listType: "grocery"`.
- S4.4-F3: Wenn Einkauf weiterhin `clearAll()` nutzt, wuerde er Amazon leeren. Behoben durch `clearByType("grocery")`.
- S4.4-F4: Wenn Einkauf weiterhin `finishShopping()` nutzt, wuerde er bestellte Amazon-Items entfernen. Behoben durch `finishByType("grocery")`.
- S4.4-F5: Wenn Grocery-Filter an `saveSnapshot` uebergeben wuerde, ginge Amazon remote verloren. Nicht eingetreten; `saveSnapshot(store.state.items)` bleibt erhalten.
- S4.4-F6: Der Einkauf-Sync-Status bezieht sich jetzt bewusst auf Grocery-Items. Amazon braucht in S4.6/S4.7 einen eigenen Persist-/Statuspfad und darf nicht vom Einkaufs-Panel abhaengen.

Checks:

- `node --check app/modules/writing.js`
- `rg` bestaetigt:
  - `listType: GROCERY_LIST_TYPE`
  - `clearByType(GROCERY_LIST_TYPE)`
  - `finishByType(GROCERY_LIST_TYPE)`
  - kein `clearAll()` oder `finishShopping()` mehr in `writing.js`
  - `saveSnapshot(store.state.items)` bleibt Gesamt-Snapshot

Nicht ausgefuehrt:

- Kein Browser-Smoke in S4.4.
- Kein Supabase-Remote-Save in S4.4.

S4.4 Abnahme:

- S4.4 ist abgeschlossen.
- Naechster Schritt: S4.5 Amazon-Screen/Bereich mit Eingabe-Kachel bauen.

### S4.5 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `index.html` erweitert um neuen Screen `screen-amazon` mit `data-screen="amazon"`.
- Amazon-Screen enthaelt ein Eingabe-Panel nach Einkaufsmuster:
  - Titel `Amazon`
  - `Zur Startseite`
  - Produktfeld
  - Menge
  - Einheit
  - Form-Note
  - Submit-Button `Item hinzufuegen`
- Neues Modul `app/modules/amazon.js` als Amazon-Owner angelegt.
- `app/main.js` importiert und initialisiert `initAmazon(...)`.
- `amazon.js` verhindert aktuell nur den nativen Form-Submit, damit der neue Screen keinen Reload ausloest.
- Keine Amazon-Listenlogik, kein Persist, kein `listType: "amazon"`-Submit in S4.5; das folgt in S4.6.
- `sw.js` Cache-Version auf `v31` erhoeht und `./app/modules/amazon.js` in `APP_SHELL` aufgenommen, weil das neue Modul bereits von `main.js` importiert wird.

Code Review:

- Neuer Amazon-Screen ist vom Router grundsaetzlich adressierbar, weil `data-screen="amazon"` existiert.
- Home-Kachel routet in S4.5 bewusst noch nicht nach `amazon`; Umverdrahtung bleibt S4.8.
- Amazon uebernimmt kein Kassa-Karussell.
- Amazon-Screen enthaelt keine Shop-, Preis-, Link- oder Bestellstatus-Copy.
- Der alte `shopping`-Screen bleibt unveraendert vorhanden.
- Neues Modul ist im Service-Worker-App-Shell-Cache, damit der Import nicht offline/PWA-bricht.

Contract Review:

- S4.5-F1: Neues ES-Modul ohne `sw.js`-Update wuerde den PWA-App-Shell-Vertrag brechen. Behoben durch Cache-Version `v31` und `APP_SHELL`-Eintrag.
- S4.5-F2: Wenn Home jetzt schon auf Amazon routet, wuerde S4.8 vorgezogen. Nicht getan; `data-nav="shopping"` bleibt bis S4.8 Platzhalter.
- S4.5-F3: Wenn das Formular ohne Handler bleibt, kann ein Submit die Seite neu laden. Behoben durch `initAmazon()` mit `preventDefault()`.
- S4.5-F4: Wenn S4.5 bereits speichert, wuerde S4.6/S4.7 vermischt. Nicht getan; Persist und Liste folgen separat.

Checks:

- `node --check app/main.js`
- `node --check app/modules/amazon.js`
- `node --check sw.js`
- `rg` bestaetigt:
  - `screen-amazon`
  - `data-screen="amazon"`
  - `amazon-item-form`
  - `initAmazon`
  - Import `./modules/amazon.js`
  - `./app/modules/amazon.js` im Service Worker
  - `CACHE_VERSION = "v31"`
- `git diff --check -- index.html app/main.js app/modules/amazon.js sw.js`

Nicht ausgefuehrt:

- Kein Browser-Smoke in S4.5.
- Kein Amazon-Submit-Smoke, weil Submit/Persist erst S4.6 ist.

S4.5 Abnahme:

- S4.5 ist abgeschlossen.
- Naechster Schritt: S4.6 Amazon-Liste rendern und Amazon-Submit auf `amazon` verdrahten.

### S4.6 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `index.html` erweitert den Amazon-Screen um ein Listenpanel `Amazon-Liste`.
- Neues Listen-Markup:
  - `amazon-sync-status`
  - `amazon-save-list`
  - `amazon-list`
- `app/modules/amazon.js` rendert jetzt nur Items mit `listType === "amazon"`.
- Amazon-Submit validiert Produkt und Menge.
- Amazon-Submit erzeugt neue Items mit:
  - `inCart: false`
  - `listType: "amazon"`
- Amazon-Submit setzt Menge nach Submit wieder auf `1`.
- Leerer Zustand: `Keine Amazon-Eintraege.`
- Amazon bekommt eigenen Sync-/Persist-Statuspfad.
- `persistSharedState()` speichert weiterhin `store.state.items` als vollstaendigen Gesamt-Snapshot.
- `Liste freigeben` im Amazon-Panel ist als Retry/Fallback fuer Amazon-Dirty/Error sichtbar, wenn Sync konfiguriert ist.

Code Review:

- Grocery-Items erscheinen nicht in der Amazon-Liste.
- Amazon-Items erscheinen in der Amazon-Liste.
- Amazon-Submit erzeugt keine Grocery-Items.
- Amazon-Submit verliert keine vorhandenen Grocery-Items.
- Kein `clearByType`, `finishByType`, `Loeschen` oder `Bestellt` in S4.6; diese Aktionen folgen in S4.7.
- Kein Kassa-Karussell in Amazon.
- Kein Amazon-Link, Preis, Produktdetail oder Bestellstatus.
- Remote-Save bleibt Gesamt-Snapshot; kein gefilterter Amazon-Array wird gespeichert.

Contract Review:

- S4.6-F1: Amazon darf nicht vom Einkauf-Sync-Status abhaengen. Behoben durch eigenen Amazon-Sync-/Persist-Pfad.
- S4.6-F2: Amazon-Submit ohne expliziten Typ koennte nur vom Default leben. Behoben durch `listType: "amazon"`.
- S4.6-F3: Amazon-Render ohne Filter wuerde Grocery anzeigen. Behoben durch `getAmazonItems()`.
- S4.6-F4: Ein gefilterter Amazon-Save wuerde Grocery remote loeschen. Nicht eingetreten; `saveSnapshot(store.state.items)` bleibt erhalten.
- S4.6-F5: S4.6 darf S4.7 nicht vorziehen. `Bestellt`, `Loeschen`, `Leeren` und Abschluss sind noch nicht umgesetzt.

Checks:

- `node --check app/modules/amazon.js`
- `rg` bestaetigt:
  - `AMAZON_LIST_TYPE`
  - `listType: AMAZON_LIST_TYPE`
  - `getAmazonItems`
  - `saveSnapshot(store.state.items)`
  - keine `clearByType`/`finishByType` in `amazon.js`
- Browser-Smoke mit lokalem Static Server und Playwright:
  - gemischter LocalStorage mit Grocery und Amazon vor App-Start
  - Amazon-Liste zeigt Amazon-Item
  - Amazon-Liste zeigt kein Grocery-Item
  - Submit erzeugt neues Item mit `listType: "amazon"`
  - vorhandenes Grocery-Item bleibt nach Amazon-Submit erhalten
- `git diff --check -- app/modules/amazon.js index.html docs/HESTIA Amazon Liste Roadmap.md`

Hinweis zum Browser-Smoke:

- Erster Smoke-Versuch konnte das Amazon-Feld nicht fuellen, weil der Screen bis S4.8 noch nicht ueber Home sichtbar aktiviert wird. Der korrigierte Smoke hat den Amazon-Screen testseitig direkt aktiviert und war gruen.

Nicht ausgefuehrt:

- Kein echter Supabase-Remote-Save.
- Kein Zwei-Geraete-Realtime-Test.

S4.6 Abnahme:

- S4.6 ist abgeschlossen.
- Naechster Schritt: S4.7 Amazon-`Bestellt`, Loeschen, Leeren und Abschluss typbewusst bauen.

### S4.7 Ergebnisprotokoll 17.05.2026

Umsetzung:

- Amazon-Liste rendert jetzt Checkboxen mit ARIA-Copy `Bestellt`.
- Amazon-Zeilen bekommen `is-in-cart`, wenn sie bestellt markiert sind.
- `toggleOrderedItem()` toggelt `inCart` fuer Amazon-Items.
- Pro Amazon-Zeile ist `Loeschen` verfuegbar.
- Amazon-Panel hat `Liste leeren` ueber `amazon-clear-list`.
- Amazon-Panel hat Abschlussaktion `Bestellte entfernen` ueber `finish-amazon-list`.
- `Liste leeren` nutzt `store.clearByType("amazon")`.
- `Bestellte entfernen` nutzt `store.finishByType("amazon")`.
- `Bestellte entfernen` ist deaktiviert, solange kein Amazon-Item bestellt markiert ist.
- Alle Amazon-Aktionen persistieren weiterhin den vollstaendigen Gesamt-State ueber `saveSnapshot(store.state.items)`.

Code Review:

- Amazon nutzt keine globalen `clearAll()`- oder `finishShopping()`-Operationen.
- Amazon-`Liste leeren` entfernt keine Grocery-Items.
- Amazon-`Bestellte entfernen` entfernt keine Grocery-Items.
- Einzelnes Amazon-`Loeschen` entfernt nur den Ziel-Eintrag.
- `Bestellt` ist sichtbarer Amazon-Status, technisch bleibt `inCart` das bestehende operative Flag.
- Kein Kassa-Karussell in Amazon.
- Kein Amazon-Link, Preis-, Produkt- oder Tracking-Verhalten.

Contract Review:

- S4.7-F1: Amazon-Abschluss duerfte keine Grocery-Items entfernen. Behoben durch `finishByType("amazon")`.
- S4.7-F2: Amazon-Leeren duerfte keine Grocery-Items entfernen. Behoben durch `clearByType("amazon")`.
- S4.7-F3: Sichtbare Copy duerfte nicht `Im Wagen` erben. Behoben durch Checkbox-ARIA `Bestellt` und Abschluss `Bestellte entfernen`.
- S4.7-F4: Ein gefilterter Amazon-Save wuerde Grocery remote loeschen. Nicht eingetreten; `saveSnapshot(store.state.items)` bleibt erhalten.
- S4.7-F5: Der alte versteckte Shopping-Screen rendert weiterhin dieselben Daten fuer Regression/Rueckfall. Browser-Smokes muessen deshalb auf `#amazon-list` scopen, damit sie nicht den versteckten alten Screen mitpruefen.

Checks:

- `node --check app/modules/amazon.js`
- `rg` bestaetigt:
  - `Bestellt`
  - `Bestellte entfernen`
  - `amazon-clear-list`
  - `finish-amazon-list`
  - `clearByType(AMAZON_LIST_TYPE)`
  - `finishByType(AMAZON_LIST_TYPE)`
  - `saveSnapshot(store.state.items)`
- Browser-Smoke mit lokalem Static Server und Playwright:
  - Amazon-Liste zeigt Amazon-Items, aber kein Grocery-Item.
  - Amazon-Checkbox markiert Item als bestellt.
  - Amazon-`Loeschen` entfernt nur Ziel-Item.
  - `Bestellte entfernen` entfernt nur bestellte Amazon-Items.
  - `Liste leeren` entfernt nur Amazon-Items.
  - Grocery-Item bleibt nach Toggle, Loeschen, Abschluss und Leeren erhalten.
- Erster Smoke-Versuch war zu breit selektiert und fand auch den alten versteckten Shopping-Screen; korrigierter Smoke auf `#amazon-list` war gruen.

Nicht ausgefuehrt:

- Kein echter Supabase-Remote-Save.
- Kein Zwei-Geraete-Realtime-Test.

S4.7 Abnahme:

- S4.7 ist abgeschlossen.
- Naechster Schritt: S4.8 Home-Amazon-Kachel auf echten Amazon-Bereich umverdrahten.

### S4.8 Ergebnisprotokoll 17.05.2026

Umsetzung:

- Home-Kachel `Amazon` routet jetzt mit `data-nav="amazon"` auf den neuen Amazon-Bereich.
- Zielscreen bleibt `screen-amazon` mit `data-screen="amazon"`.
- Der alte `screen-shopping` bleibt weiterhin im DOM und wird in S4.8 nicht geloescht.
- Home-Reihenfolge bleibt `Einkauf`, `Amazon`, `Muell`.

Code Review:

- Amazon-Klick vom Home oeffnet den neuen Amazon-Screen.
- Einkauf-Klick vom Home oeffnet weiterhin den konsolidierten Einkaufsbereich `writing`.
- Muell-Klick vom Home oeffnet weiterhin den Waste-Bereich.
- Der alte Shopping-Screen wird durch den Home-Amazon-Klick nicht mehr aktiv.
- Keine Amazon-Listenlogik, SQL-Logik, Kassa-Logik oder Service-Worker-Logik wurde in S4.8 veraendert.

Contract Review:

- S4.8-F1: Wenn Home weiter auf `shopping` zeigt, bleibt Amazon nur Platzhalter und nutzt die alte Einkaufsliste. Behoben durch `data-nav="amazon"`.
- S4.8-F2: Wenn der alte `shopping`-Screen in S4.8 entfernt wird, vermischt sich Routing mit Rueckbau/Regression. Nicht getan; alter Screen bleibt fuer S4.9 pruefbar.
- S4.8-F3: Ein zu breit formulierter Browser-Smoke kann Home-Kacheln mit anderen Buttons verwechseln. Behoben durch scoped Selektoren auf `.home-intents [data-nav="..."]`.

Checks:

- `rg` bestaetigt `data-nav="amazon"`, `screen-amazon` und weiterhin vorhandenen `screen-shopping`.
- Browser-Smoke mit lokalem Static Server und Playwright:
  - Home-`Amazon` oeffnet `data-screen="amazon"`.
  - Amazon-Formular ist sichtbar.
  - Alter `screen-shopping` wird nicht aktiv.
  - Home-`Einkauf` oeffnet weiterhin `data-screen="writing"`.
  - Home-`Muell` oeffnet weiterhin `data-screen="waste"`.
- `git diff --check -- index.html docs/HESTIA Amazon Liste Roadmap.md`

Nicht ausgefuehrt:

- Kein echter Supabase-Remote-Save.
- Kein Zwei-Geraete-Realtime-Test.
- Keine volle S5-Regression; diese folgt gesammelt nach S4.

S4.8 Abnahme:

- S4.8 ist abgeschlossen.
- Naechster Schritt: S4.9 Grocery-Regression und Kassa-Abgrenzung.

### S4.9 Ergebnisprotokoll 17.05.2026

Umsetzung:

- Alter technischer `shopping`-Screen wurde auf `grocery` begrenzt.
- `app/modules/shopping.js` nutzt jetzt `GROCERY_LIST_TYPE = "grocery"`.
- Alter Shopping-Render nutzt `getGroceryItems()` statt `store.state.items`.
- Alter Shopping-Abschluss nutzt `store.finishByType("grocery")` statt globalem `finishShopping()`.
- Kassa-Karussell bleibt im konsolidierten Einkauf und im alten technischen Shopping-Screen vorhanden.
- Amazon bleibt ohne Kassa-Karussell.

Code Review:

- Einkauf/Writing zeigt weiterhin nur Grocery-Items.
- Amazon zeigt weiterhin nur Amazon-Items.
- Alter Shopping-Screen zeigt nur Grocery-Items und keine Amazon-Items.
- Alter Shopping-Abschluss entfernt nur Grocery-Items mit `inCart === true`.
- Amazon-Items mit `inCart === true` bleiben nach altem Shopping-Abschluss erhalten.
- Kein Home-Routing, SQL, Supabase-Mapping oder Service-Worker-Vertrag wurde in S4.9 veraendert.

Contract Review:

- S4.9-F1: Der alte `shopping`-Screen renderte noch den gesamten State und haette Amazon-Items angezeigt. Behoben durch Grocery-Filter.
- S4.9-F2: Der alte `shopping`-Screen nutzte noch globales `finishShopping()` und haette bestellte Amazon-Items entfernen koennen. Behoben durch `finishByType("grocery")`.
- S4.9-F3: Kassa darf nicht in Amazon auftauchen. Geprueft: `screen-amazon` enthaelt kein `data-kassa-carousel`.
- S4.9-F4: Kassa soll fuer Grocery erhalten bleiben. Geprueft: `screen-writing` und alter `screen-shopping` enthalten je ein Kassa-Karussell.

Checks:

- `node --check app/modules/shopping.js`
- `node --check app/modules/writing.js`
- `node --check app/modules/amazon.js`
- `node --check app/core/state.js`
- `node --check app/main.js`
- Browser-Smoke mit lokalem Static Server und Playwright:
  - gemischter LocalStorage mit Grocery- und Amazon-Items.
  - Einkauf/Writing zeigt Grocery, aber keine Amazon-Items.
  - Amazon zeigt Amazon, aber keine Grocery-Items.
  - alter Shopping-Screen zeigt Grocery, aber keine Amazon-Items.
  - `screen-amazon` hat kein Kassa-Karussell.
  - `screen-writing` und alter `screen-shopping` haben je ein Kassa-Karussell.
  - alter Shopping-Abschluss entfernt nur das abgehakte Grocery-Item.
  - bestelltes Amazon-Item bleibt nach altem Shopping-Abschluss erhalten.
  - Home-`Amazon` oeffnet weiterhin `data-screen="amazon"`.

Nicht ausgefuehrt:

- Kein echter Supabase-Remote-Save.
- Kein Zwei-Geraete-Realtime-Test.
- Keine volle S5-Regression; diese folgt gesammelt nach S4.

S4.9 Abnahme:

- S4.9 ist abgeschlossen.
- Naechster Schritt: S4.10 PWA-/Cache-Vertrag aktualisieren.

### S4.10 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `sw.js` ist auf `CACHE_VERSION = "v31"` gesetzt.
- `./app/modules/amazon.js` ist in `APP_SHELL` enthalten.
- Kein eigenes `amazon.css` wurde angelegt; damit ist kein zusaetzlicher CSS-Cache-Eintrag noetig.
- Service-Worker-Strategien, Offline-Seite, Runtime-Cache und No-Cache-Dev-Flag wurden nicht veraendert.

Code Review:

- `app/main.js` importiert `./modules/amazon.js`.
- Derselbe neue Modulpfad ist im Service Worker App-Shell-Cache eingetragen.
- Cache-Version wurde gegenueber dem vorherigen Stand erhoeht, damit installierte Clients ein neues statisches Cache-Set bekommen.
- Alle statischen `APP_SHELL`-Pfade existieren lokal.
- Amazon-Routing funktioniert mit registriertem Service Worker.

Contract Review:

- S4.10-F1: Neues ES-Modul ohne App-Shell-Eintrag wuerde installierte/Offline-PWA brechen. Behoben durch `./app/modules/amazon.js` in `APP_SHELL`.
- S4.10-F2: Neuer App-Shell-Inhalt ohne Cache-Versionserhoehung koennte alte Clients auf altem Cache halten. Behoben durch `CACHE_VERSION = "v31"`.
- S4.10-F3: Ein neues CSS-File waere ebenfalls cachepflichtig. Nicht relevant, weil kein `amazon.css` angelegt wurde.
- S4.10-F4: PWA-Updateverhalten mit bereits installierten alten Clients bleibt als manueller Zielgeraete-Test fuer S5/S6 dokumentiert.

Checks:

- `node --check sw.js`
- Statischer Node-App-Shell-Smoke:
  - `CACHE_VERSION = "v31"` vorhanden.
  - `./app/modules/amazon.js` vorhanden.
  - alle `APP_SHELL`-Dateipfade existieren lokal.
- `rg` bestaetigt:
  - `./app/modules/amazon.js` in `sw.js`
  - `import { initAmazon }` in `app/main.js`
- Browser-Smoke mit lokalem Static Server und Playwright:
  - Service Worker registriert aktiv `sw.js`.
  - Home-`Amazon` oeffnet mit registriertem Service Worker weiterhin `data-screen="amazon"`.

Nicht ausgefuehrt:

- Kein echter Offline-Neulade-Test.
- Kein Test mit bereits installierter alter PWA-Version.
- Kein Zwei-Geraete-Realtime-Test.

S4.10 Abnahme:

- S4.10 ist abgeschlossen.
- Naechster Schritt: S4.11 Touchlog/Diagnostics-Pruefung.

### S4.11 Ergebnisprotokoll 17.05.2026

Umsetzung:

- Keine Codeaenderung noetig.
- Keine neuen Diagnostics-Surfaces noetig.
- Keine neuen Dev-Flags noetig.
- Amazon nutzt die bestehende Touchlog-Infrastruktur.

Code Review:

- `app/modules/amazon.js` schreibt eigene `[amazon]`-Events fuer:
  - Item hinzugefuegt.
  - `Bestellt` toggled.
  - einzelnes Item geloescht.
  - Liste geleert.
  - bestellte Items entfernt.
- Amazon nutzt die gemeinsamen `[sync]`-Events fuer Save-Start, Save-Erfolg und Save-Fehler.
- Touchlog bleibt lokaler Event-Trace und veraendert keinen State-, Sync- oder UI-Vertrag.
- Diagnostics-Dateien muessen fuer S4.11 nicht angepasst werden.

Contract Review:

- S4.11-F1: Amazon-Aktionen ohne eigene Touchlog-Events waeren bei QA schwer nachvollziehbar. Nicht eingetreten; alle relevanten Amazon-Aktionen haben eigene `[amazon]`-Events.
- S4.11-F2: Neue Diagnosepunkte ohne echten Bedarf wuerden Debug-Spam erzeugen. Nicht getan; keine zusaetzlichen Diagnostics.
- S4.11-F3: Touchlog darf keine Produktdatenwahrheit werden. Er bleibt rein beobachtend.
- S4.11-F4: Sync-Fehler muessen weiterhin nachvollziehbar sein. Bleibt ueber gemeinsame `[sync]`-Events erhalten.

Checks:

- `rg` bestaetigt Amazon-Touchlog-Events in `app/modules/amazon.js`.
- `rg` bestaetigt bestehende Touchlog-/Diagnostics-Vertraege in den Module Overviews.
- Browser-Smoke mit lokalem Static Server und Playwright:
  - Amazon-Item hinzufuegen schreibt `[amazon] added item ...`.
  - Amazon-Checkbox schreibt `[amazon] toggle ordered ...`.
  - `Bestellte entfernen` schreibt `[amazon] removed ordered items`.
  - Touchlog-Snapshot wird lokal in `hestia_touchlog_snapshot` persistiert.

Nicht ausgefuehrt:

- Kein echter Supabase-Fehlerfall fuer `[sync] save failed`.
- Kein manueller Diagnostics-Panel-Screenshot.
- Keine volle S5-Regression; diese folgt gesammelt nach S4.

S4.11 Abnahme:

- S4.11 ist abgeschlossen.
- Naechster Schritt: S4.12 Code Review und Contract Review.

### S4.12 Ergebnisprotokoll 17.05.2026

Umsetzung:

- Vollstaendiger S4-Code-Review ueber SQL, State, Supabase Sync, Einkauf, Amazon, alten Shopping-Screen, Home-Routing, PWA-Cache und Touchlog.
- Keine weitere Fachlogik-Aenderung noetig.
- Ein kleines Doku-Finding korrigiert: `Item hinzufuegen` ist jetzt in der ASCII-gehaltenen Roadmap konsistent.

Code Review:

- SQL:
  - Frisches Setup und Bestandsmigration enthalten `list_type`.
  - Default/Fallback ist `grocery`.
  - Check-Constraint erlaubt nur `grocery` und `amazon`.
  - Typ-Index ist vorhanden.
- State:
  - `normalizeItem` normalisiert fehlenden oder unbekannten Typ auf `grocery`.
  - `clearByType()` und `finishByType()` sind die aktiven typbewussten UI-Operationen.
  - Globale `clearAll()` und `finishShopping()` bleiben nur fuer Kompatibilitaet erhalten.
- Supabase:
  - `toRow()` schreibt `list_type`.
  - `toItem()` liest `list_type`.
  - REST-Select enthaelt `list_type`.
  - `saveSnapshot(store.state.items)` bleibt Gesamt-Snapshot.
- Einkauf/Writing:
  - schreibt und rendert nur `grocery`.
  - Leeren und Abschluss betreffen nur `grocery`.
  - Kassa bleibt im Grocery-Einkauf.
- Amazon:
  - schreibt und rendert nur `amazon`.
  - `Bestellt`, `Loeschen`, `Liste leeren` und `Bestellte entfernen` sind typbewusst.
  - kein Kassa-Karussell.
  - kein Preis-, Link-, Tracking- oder Amazon-API-Verhalten.
- Alter `shopping`-Screen:
  - bleibt technisch vorhanden.
  - rendert nur `grocery`.
  - Abschluss entfernt nur `grocery`.
- Home/PWA/Touchlog:
  - Home-`Amazon` oeffnet `amazon`.
  - `amazon.js` ist importiert und im Service Worker App-Shell-Cache.
  - Amazon-Aktionen haben Touchlog-Events.

Contract Review:

- S4.12-F1: Amazon-Items duerfen nicht in Grocery erscheinen. Geprueft und erfuellt.
- S4.12-F2: Grocery-Items duerfen nicht in Amazon erscheinen. Geprueft und erfuellt.
- S4.12-F3: Abschluss/Leeren duerfen nur den aktiven Typ betreffen. Geprueft und erfuellt.
- S4.12-F4: Remote-Saves duerfen keinen gefilterten Teilstand speichern. Geprueft: UI-Module speichern `store.state.items`.
- S4.12-F5: Alter `shopping`-Screen darf Amazon nicht versehentlich beruehren. Geprueft und durch S4.9 behoben.
- S4.12-F6: Kassa darf nicht in Amazon auftauchen. Geprueft und erfuellt.
- S4.12-F7: PWA darf das neue Amazon-Modul nicht vergessen. Geprueft und erfuellt.
- S4.12-F8: Roadmap soll ASCII-konsistent bleiben. Ein einzelner Umlaut wurde korrigiert.

Checks:

- `node --check`:
  - `app/core/state.js`
  - `app/main.js`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`
  - `app/modules/amazon.js`
  - `app/supabase/list-sync.js`
  - `sw.js`
- State-Smoke:
  - altes Item ohne Typ wird `grocery`.
  - unbekannter Typ wird `grocery`.
  - `finishByType("grocery")` entfernt nur erledigte Grocery-Items.
  - `clearByType("amazon")` entfernt nur Amazon-Items.
- Supabase-Mapping-Smoke:
  - `toRow()` schreibt `list_type`.
  - `toItem()` liest `list_type`.
  - fehlendes oder unbekanntes `list_type` wird `grocery`.
- SQL-Statik:
  - `list_type` in `01_setup`.
  - idempotente Migration in `02_add-shopping-list-type.sql`.
  - Default, Backfill, Not-null, Constraint, Index und Kommentar vorhanden.
- Browser-End-to-End-Smoke mit lokalem Static Server und Playwright:
  - Grocery-Submit erzeugt `listType: "grocery"`.
  - Amazon-Submit erzeugt `listType: "amazon"`.
  - Einkauf zeigt nur Grocery.
  - Amazon zeigt nur Amazon.
  - Amazon-Abschluss entfernt nur bestellte Amazon-Items.
  - Grocery-Abschluss entfernt nur abgehakte Grocery-Items.
  - Amazon hat kein Kassa-Karussell.
- `git diff --check` ohne Whitespace-Fehler; nur Windows-LF/CRLF-Hinweise.

Nicht ausgefuehrt:

- Kein echter Supabase-Remote-Save im S4.12-Review.
- Kein Zwei-Geraete-Realtime-Test.
- Kein echter Offline-Neulade-Test mit installierter PWA.
- Keine Zielgeraete-Mobile-Pruefung.

S4.12 Abnahme:

- S4.12 ist abgeschlossen.
- Keine offenen S4.12-Findings.
- Naechster Schritt: S4.13 Schritt-Abnahme und Commit-Empfehlung.

### S4.13 Ergebnisprotokoll 17.05.2026

Abnahme:

- S4 ist fachlich und technisch abgeschlossen.
- Amazon ist ein eigener Bereich mit eigener Eingabe und eigener Liste.
- Grocery/Einkauf bleibt der bestehende Haushalts-Einkaufsfluss.
- Supabase-Datenvertrag ist fuer `grocery` und `amazon` vorbereitet.
- Alter `shopping`-Screen bleibt als technische Rueckfall-/Regressionsflaeche erhalten, aber nicht als Amazon-Ziel.
- Kassa bleibt Grocery-only.
- Kein Amazon-Fancy-Stuff wurde eingebaut.

Commit-Empfehlung:

```text
feat: add typed Amazon shopping list

- add grocery/amazon list_type schema and migration
- add Amazon screen with typed list actions
- keep grocery, legacy shopping, kassa and PWA cache contracts safe
```

S4.13 Abnahme:

- S4.13 ist abgeschlossen.
- Naechster Schritt: S5 Gesamtpruefung.

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
  - Default/Backfill vorhanden.
  - Not-null vorhanden.
  - Constraint vorhanden.
  - Index- oder Query-Plan-Entscheidung dokumentiert.
- S5.6 UI-Smokes:
  - Home zeigt `Einkauf`, `Amazon`, `Muell`.
  - Amazon-Kachel fuehrt in den echten Amazon-Bereich.
  - Einkauf-Submit erscheint nur in Einkauf.
  - Amazon-Submit erscheint nur in Amazon.
  - Amazon-Liste zeigt `Bestellt`.
  - Amazon-Abschluss entfernt nur bestellte Amazon-Items.
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
- Mobile Home-/Amazon-Layout auf Zielgeraeten.
- PWA-Updateverhalten mit altem Client.

### S5 Ergebnisprotokoll 17.05.2026

Ausgefuehrt:

- S5.1 `node --check` fuer:
  - `app/core/state.js`
  - `app/main.js`
  - `app/modules/writing.js`
  - `app/modules/shopping.js`
  - `app/modules/amazon.js`
  - `app/modules/waste.js`
  - `app/modules/kassa-carousel.js`
  - `app/supabase/list-sync.js`
  - `sw.js`
- S5.2 `git diff --check`.
- S5.3 State-Smoke:
  - alte Items ohne `listType` werden `grocery`.
  - unbekannte Typen werden `grocery`.
  - neues Grocery-Item bleibt `grocery`.
  - neues Amazon-Item bleibt `amazon`.
  - `finishByType("grocery")` entfernt nur erledigte Grocery-Items.
  - `finishByType("amazon")` entfernt nur bestellte Amazon-Items.
  - `clearByType("amazon")` entfernt nur Amazon-Items.
- S5.4 Supabase-Mapping-Smoke:
  - `toRow()` schreibt `list_type`.
  - `toItem()` liest `list_type`.
  - fehlendes oder unbekanntes `list_type` wird `grocery`.
  - REST-Select enthaelt `list_type`.
- S5.5 SQL-Statik:
  - `01_setup` enthaelt `list_type`, Default, Constraint, Index und Kommentar.
  - `02_add-shopping-list-type.sql` enthaelt Add-Column, Backfill, Default, Not-null, Constraint, Index und Kommentar.
- S5.6 UI-Smoke mit Playwright:
  - Home hat stabile Ziele `writing`, `amazon`, `waste`.
  - Amazon-Kachel oeffnet den echten Amazon-Screen.
  - Einkauf-Submit erzeugt `grocery`.
  - Amazon-Submit erzeugt `amazon`.
  - Einkauf zeigt keine Amazon-Items.
  - Amazon zeigt keine Grocery-Items.
  - Amazon-Checkbox nutzt `Bestellt`.
  - Amazon-Abschluss entfernt nur bestellte Amazon-Items.
  - Grocery-Abschluss entfernt nur abgehakte Grocery-Items.
  - Kassa-Karussell ist nicht in Amazon.
  - Waste-Navigation oeffnet weiterhin `waste`.
- S5.7 Regression:
  - Install-Banner-DOM ist vorhanden.
  - Touchlog-Panel ist vorhanden.
  - PWA-Service-Worker registriert `sw.js`.
  - App-Shell-Cache enthaelt `amazon.js`.
  - Mobile-Smoke mit Pixel-7-Viewport: Amazon-Route funktioniert und erstes Amazon-Panel laeuft nicht breiter als der Viewport.

Manuelle Smokes durch Stephan:

- Amazon-Liste speichert.
- Amazon-Liste loescht.
- Amazon-Liste laesst sich einfach bedienen.
- Shopping-/Einkaufsliste wird weiterhin gerendert.
- Shopping-/Einkaufsliste laesst sich normal bedienen.

Code Review:

- Modulgrenzen sind eingehalten:
  - `writing.js` ist Grocery/Einkauf.
  - `amazon.js` ist Amazon.
  - `shopping.js` bleibt alter Grocery-Rueckfallscreen.
  - `kassa-carousel.js` bleibt unabhaengig und nicht Amazon-spezifisch.
  - `list-sync.js` bleibt Gesamt-Snapshot-Sync.
- Keine Amazon-API, keine Preise, keine Produktlinks, kein Tracking.
- Keine neue Tabelle, kein neues Auth-/RLS-Modell.
- Keine Kassa-Uebernahme in Amazon.

Contract Review:

- S5-F1: README, PRODUCT, QA und mehrere Module Overviews beschreiben Amazon noch als Platzhalter. Das ist ein Doku-Finding, kein Code-Finding, und wird in S6 synchronisiert.
- S5-F2: Echte Zwei-Geraete-Realtime mit beiden Typen bleibt ausserhalb lokaler Testbarkeit. Als Resttest dokumentiert.
- S5-F3: PWA-Updateverhalten mit bereits installiertem altem Client bleibt ausserhalb lokaler Testbarkeit. Als Resttest dokumentiert.
- S5-F4: Echte Supabase-Remote-Saves wurden lokal nicht gegen das Live-Projekt ausgefuehrt. Manuelle App-Smokes und SQL-Ausfuehrung liegen vor; Remote-/Realtime-Resttest bleibt dokumentiert.

Findings/Fixes:

- Keine Code-Findings.
- Keine S5-Codekorrektur noetig.
- Doku-Finding S5-F1 wird bewusst in S6 behoben, weil S6 der Doku-Sync-Block ist.

Nicht lokal oder nur eingeschraenkt geprueft:

- Zwei-Geraete-Realtime-Verhalten mit `grocery` und `amazon`.
- PWA-Updatepfad von bereits installierter alter Version auf neue Version.
- Echter Offline-Neulade-Test nach Service-Worker-Update.
- Vollstaendige Zielgeraete-Optik auf deinem Handy; ein mobiler Playwright-Smoke ist gruen und dein manueller Test ist positiv.

S5 Abnahme:

- S5 ist abgeschlossen.
- Naechster Schritt: S6 Doku-Sync, QA-Update und finaler Abschlussreview.

## S6 - Doku-Sync, QA-Update und finaler Abschlussreview

Ziel:

- Code, SQL, Doku, QA und Roadmap sprechen denselben Amazon-Listen-Vertrag.

Substeps:

- S6.1 `PRODUCT.md` aktualisieren, falls Datenvertrag final erweitert wurde. DONE 17.05.2026.
- S6.2 `README.md` aktualisieren, falls Kurzfassung/Referenzen betroffen sind. DONE 17.05.2026.
- S6.3 `docs/modules/State Layer Module Overview.md` aktualisieren. DONE 17.05.2026.
- S6.4 `docs/modules/Shopping Module Overview.md` aktualisieren. DONE 17.05.2026.
- S6.5 `docs/modules/Amazon Module Overview.md` aktualisieren. DONE 17.05.2026.
- S6.6 `docs/modules/Supabase Sync Module Overview.md` aktualisieren. DONE 17.05.2026.
- S6.7 `docs/modules/Home Module Overview.md` aktualisieren. DONE 17.05.2026.
- S6.8 `docs/modules/CSS Module Overview.md` aktualisieren. DONE 17.05.2026.
- S6.9 `docs/QA_CHECKS.md` erweitern. DONE 17.05.2026.
- S6.10 `docs/future roadmaps.md` nach Abschluss aktualisieren. DONE 17.05.2026.
- S6.11 Roadmap mit Ergebnisprotokollen aktualisieren. DONE 17.05.2026.
- S6.12 Finaler Contract Review. DONE 17.05.2026:
  - Roadmap vs. Code.
  - Roadmap vs. SQL.
  - Roadmap vs. Module Overviews.
  - Roadmap vs. QA.
- S6.13 Abschluss-Abnahme. DONE 17.05.2026.
- S6.14 Commit-Empfehlung. DONE 17.05.2026.
- S6.15 Archiv-Entscheidung. DONE 17.05.2026.

Exit-Kriterium:

- Roadmap ist commit- oder archivbereit.

### S6 Ergebnisprotokoll 17.05.2026

Umsetzung:

- `PRODUCT.md` aktualisiert:
  - Amazon als kleiner zweiter Beschaffungskanal ergaenzt.
  - Datenvertrag auf `listType` erweitert.
  - Supabase-Modell um `list_type` erweitert.
  - Hard-Delete-Modell fuer gekaufte und bestellte Eintraege beschrieben.
- `README.md` aktualisiert:
  - Arbeitsregeln nennen `listType`.
  - Amazon ist nicht mehr Platzhalter, sondern echte Merkliste.
- Module Overviews aktualisiert:
  - State Layer: `listType`, `clearByType`, `finishByType`, Grocery/Amazon-Trennung.
  - Shopping: Einkauf bleibt grocery-only.
  - Amazon: komplett neu als eigener Bereich dokumentiert.
  - Supabase Sync: `list_type`, Gesamt-Snapshot, defensive Fallbacks.
  - Home: Amazon routet auf eigenen Bereich.
  - CSS: Amazon nutzt bestehende Writing-/Shopping-Styles, kein eigenes `amazon.css`.
  - PWA Install: `amazon.js` als App-Shell-Asset dokumentiert.
  - Bootflow: `initAmazon(...)` in Startreihenfolge ergaenzt.
- `docs/QA_CHECKS.md` aktualisiert:
  - Amazon-Smokes ergaenzt.
  - alter Shopping-Screen als Legacy-Grocery-Screen abgegrenzt.
  - Supabase-/Realtime-/Touchlog-Smokes um Amazon/list_type erweitert.
- `docs/future roadmaps.md` aktualisiert:
  - Roadmap 6B als umgesetzt markiert.
  - Prioritaetsnotiz auf Roadmap 1 bis 6B abgeschlossen aktualisiert.

Finaler Contract Review:

- Roadmap vs. Code:
  - Home zeigt und routet `Amazon` auf `screen-amazon`.
  - `writing.js` ist grocery-only.
  - `amazon.js` ist amazon-only.
  - alter `shopping.js` ist Legacy-Grocery.
  - kein Amazon-Fancy-Stuff im Code.
- Roadmap vs. SQL:
  - `01_setup` und `02_add-shopping-list-type.sql` enthalten `list_type`.
  - Default/Fallback ist `grocery`.
  - Check-Constraint erlaubt nur `grocery` und `amazon`.
  - Typ-Index ist vorhanden.
- Roadmap vs. Module Overviews:
  - Platzhalter-Aussagen zu Amazon wurden aus den aktuellen Modulvertraegen entfernt.
  - Amazon ist als eigener Bereich beschrieben.
  - Kassa bleibt aus Amazon ausgeschlossen.
- Roadmap vs. QA:
  - QA prueft Amazon, Einkauf, alten Shopping-Screen, `list_type`, PWA-App-Shell und Touchlog.
  - Zielgeraete-/Realtime-Resttests bleiben ehrlich dokumentiert.

Findings/Fixes:

- S6-F1: README/PRODUCT/QA/Module Overviews beschrieben Amazon noch als Platzhalter. Behoben.
- S6-F2: Bootflow-Doku nannte `initAmazon(...)` noch nicht. Behoben.
- S6-F3: Supabase-Doku kannte `list_type` noch nicht. Behoben.
- S6-F4: CSS/PWA-Doku musste ergaenzen, dass Amazon bestehende Styles nutzt und `amazon.js` gecacht wird. Behoben.

Nicht erledigt / bewusst offen:

- Roadmap wurde noch nicht ins Archiv verschoben, damit Stephan die S6-Doku im aktiven File pruefen kann.
- Echte Zwei-Geraete-Realtime, PWA-Altclient-Update und Offline-Neulade-Test bleiben Zielgeraete-/Betriebstests.

Commit-Empfehlung:

```text
feat: add typed Amazon shopping list

- add grocery/amazon list_type schema and migration
- add Amazon screen with typed list actions
- document Amazon, sync, QA and module contracts
```

Archiv-Entscheidung:

- Roadmap ist archivbereit.
- Empfohlener Archivname nach finaler Sichtpruefung: `docs/archive/HESTIA Amazon Liste Roadmap (DONE).md`.

S6 Abnahme:

- S6 ist abgeschlossen.
- Roadmap 6B ist code- und dokuseitig abgeschlossen.

### Post-S6 Review-Fix 17.05.2026

Finding:

- CR-AZ-POST-F1: `amazon.js` behandelte `pending-remote` nicht wie der Einkauf. Wenn ein Remote-Snapshot waehrend lokaler Amazon-Aenderungen eintraf, war der globale Pending-Remote-Zustand technisch vorhanden, im Amazon-Panel aber nicht sichtbar oder uebernehmbar.

Fix:

- `amazon.js` um `hasPendingRemote`, `pending-remote` Sync-State, Statuscopy, Touchlog und `hestia:remote-apply-request` erweitert.
- `index.html` um `amazon-accept-remote-list` ergaenzt.
- Amazon Module Overview und QA-Checks um den Amazon-Pending-Remote-Vertrag erweitert.

Contract Review:

- Amazon und Einkauf verwenden denselben Konfliktvertrag.
- Remote-Snapshots ueberschreiben lokale Amazon-Aenderungen nicht still.
- Nutzer koennen lokale Amazon-Aenderungen freigeben oder bewusst den anderen Stand uebernehmen.
- Kein neues Amazon-Fancy-Stuff, keine API, keine Produktlinks und keine Commerce-Logik.

## Smokechecks / Regression

- Home bleibt ruhig.
- `Einkauf` bleibt Grocery-Eingang.
- `Amazon` oeffnet den echten Amazon-Bereich.
- Einkauf schreibt in `grocery`.
- Amazon schreibt in `amazon`.
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
