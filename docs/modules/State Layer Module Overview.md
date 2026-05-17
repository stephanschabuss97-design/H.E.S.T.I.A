# State Layer Module Overview

Kurze Einordnung:
- Zweck: beschreibt die operative Wahrheitsquelle von HESTIA und ihre Beziehung zur Remote-Haushaltsebene.
- Rolle innerhalb von HESTIA: erklaert, wo Listendaten heute leben und wie lokale und entfernte Aenderungen zusammenlaufen.
- Abgrenzung: keine UI-Doku und kein kompletter Offline-/Konflikt-Plan.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Bootflow Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Amazon Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Amazon%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Der State Layer soll den aktuellen Listenstand einfach, ehrlich und leicht veraenderbar halten.
- HESTIA braucht keinen schweren globalen Store, solange der Produktkern klein bleibt.
- Nichtziel: Historie, Undo-Stack oder Store-Abstraktionen auf Vorrat.

---

## 2. Source of Truth heute

- `app/core/state.js` ist die operative UI-Wahrheit fuer die Liste.
- `state.items` enthaelt die aktuelle offene Haushaltsliste mit `grocery`- und `amazon`-Eintraegen.
- Persistenz erfolgt lokal ueber `localStorage`.

Storage-Key:
- `hestia.v1.items`

Wichtige Einordnung:
- Der UI-State ist lokal sofort wirksam.
- Der gemeinsame Haushaltsstand entsteht zusaetzlich ueber den Sync-Layer.

---

## 3. Datenvertrag

Jeder Listeneintrag folgt aktuell diesem Frontend-Vertrag:

- `id`
- `name`
- `quantity`
- `unit`
- `inCart`
- `listType`

`listType` trennt die aktiven Listenbereiche:

- `grocery`: normaler Einkauf
- `amazon`: Amazon-Merkliste

Fallback-Regel:

- fehlendes oder unbekanntes `listType` wird defensiv zu `grocery`.

Der Remote-Vertrag in Supabase wird in `app/supabase/list-sync.js` nach `in_cart` und `list_type` gespiegelt und wieder zurueck normalisiert.

---

## 4. Erlaubte State-Operationen

- `setItems(nextItems)`
- `upsertItem(nextItem)`
- `removeItem(id)`
- `toggleInCart(id, inCart)`
- `clearAll()`
- `finishShopping()`
- `clearByType(listType)`
- `finishByType(listType)`

Einordnung:

- `clearAll()` und `finishShopping()` bleiben nur als Kompatibilitaetsoperationen vorhanden.
- Aktive UI-Flows fuer Einkauf und Amazon verwenden typbewusst `clearByType(...)` und `finishByType(...)`.

---

## 5. Beziehung zu Writing, Shopping und Sync

- Der sichtbare Bereich `Einkauf`/technisch `writing` erzeugt, entfernt, leert, toggelt `inCart` und schliesst nur `grocery` ab.
- Der Amazon-Bereich erzeugt, entfernt, leert, toggelt `inCart` als sichtbar `Bestellt` und schliesst nur `amazon` ab.
- Der alte Shopping-Screen toggelt und schliesst nur `grocery`, solange er als Vergleichs- und Rueckfallflaeche existiert.
- Der Sync-Layer spiegelt erfolgreiche Remote-Loads wieder in `state.items`.

Heute gilt:
- lokale Aenderung schreibt zuerst in den State
- danach wird, wenn konfiguriert, der gemeinsame Snapshot gespeichert
- eingehende Realtime-Aenderungen ersetzen den lokalen operativen Stand nur, wenn kein lokaler Dirty-State geschuetzt werden muss
- Remote-Snapshots waehrend lokaler Einkaufs- oder Amazon-Aenderungen werden im Boot-/UI-Modulvertrag als pending Remote gehalten

---

## 6. Eventvertrag

Der zentrale UI-Refresh-Impuls ist:

- `hestia:items-updated`

Typische Nutzung:
- `source: "local"` fuer lokale UI-Aenderungen
- `source: "remote"` fuer erfolgreich angewendete Remote-Snapshots
- `source: "pending-remote"` fuer einen verfuegbaren Remote-Stand, der lokale Aenderungen nicht still ueberschreiben darf

Zusaetzlich:
- `hestia:remote-apply-request` fordert die bewusste Uebernahme eines pending Remote-Snapshots an.

---

## 7. Aktuelle Grenzen

- Es gibt noch keine echte Konfliktlogik jenseits von Last-Write-Wins und pending Remote.
- `upsertItem` ist weiterhin eher ein `appendItem`.
- Remote-Reaktionen ersetzen aktuell den Snapshot als Ganzes statt feiner Item-Diffs.
- Pending Remote ist bewusst kein Merge und kein CRDT.

---

## 8. Risiken

- lokale und entfernte Wahrheit koennen bei spaeteren Randfaellen weiterhin auseinanderlaufen, wenn Nutzer bewusst den anderen Stand uebernimmt
- Echo-Events und kuenftige Offline-Reconnects muessen den Dirty-State-Schutz respektieren
- zu viele implizite Render-/Persist-Muster koennen spaeter schwerer zu debuggen sein

---

## 9. Definition of Done

- Ein neuer Chat versteht sofort, wo HESTIAs operative Listenwahrheit lebt.
- Die erlaubten State-Operationen sind klar und begrenzt.
- Die Beziehung zwischen lokalem UI-State und gemeinsamem Household-Snapshot ist beschrieben.
