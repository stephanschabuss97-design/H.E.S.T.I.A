# State Layer Module Overview

Kurze Einordnung:
- Zweck: beschreibt die operative Wahrheitsquelle von HESTIA und ihre Beziehung zur Remote-Haushaltsebene.
- Rolle innerhalb von HESTIA: erklaert, wo Listendaten heute leben und wie lokale und entfernte Aenderungen zusammenlaufen.
- Abgrenzung: keine UI-Doku und kein kompletter Offline-/Konflikt-Plan.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Bootflow Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md)
- [Writing Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Writing%20Module%20Overview.md)
- [Shopping Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Shopping%20Module%20Overview.md)
- [Supabase Sync Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Supabase%20Sync%20Module%20Overview.md)

---

## 1. Zielsetzung

- Der State Layer soll den aktuellen Listenstand einfach, ehrlich und leicht veraenderbar halten.
- HESTIA braucht keinen schweren globalen Store, solange der Produktkern klein bleibt.
- Nichtziel: Historie, Undo-Stack oder Store-Abstraktionen auf Vorrat.

---

## 2. Source of Truth heute

- `app/core/state.js` ist die operative UI-Wahrheit fuer die Liste.
- `state.items` enthaelt die aktuelle offene Einkaufsliste.
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

Der Remote-Vertrag in Supabase wird in `app/supabase/list-sync.js` nach `in_cart` gespiegelt und wieder zurueck normalisiert.

---

## 4. Erlaubte State-Operationen

- `setItems(nextItems)`
- `upsertItem(nextItem)`
- `removeItem(id)`
- `toggleInCart(id, inCart)`
- `clearAll()`
- `finishShopping()`

---

## 5. Beziehung zu Writing, Shopping und Sync

- Writing erzeugt, entfernt und leert Eintraege.
- Shopping toggelt `inCart` und schliesst die Liste ab.
- Der Sync-Layer spiegelt erfolgreiche Remote-Loads wieder in `state.items`.

Heute gilt:
- lokale Aenderung schreibt zuerst in den State
- danach wird, wenn konfiguriert, der gemeinsame Snapshot gespeichert
- eingehende Realtime-Aenderungen ersetzen den lokalen operativen Stand deterministisch

---

## 6. Eventvertrag

Der zentrale UI-Refresh-Impuls ist:

- `hestia:items-updated`

Typische Nutzung:
- `source: "local"` fuer lokale UI-Aenderungen
- `source: "remote"` fuer erfolgreich angewendete Remote-Snapshots

---

## 7. Aktuelle Grenzen

- Es gibt noch keine echte Konfliktlogik jenseits von Last-Write-Wins.
- `upsertItem` ist weiterhin eher ein `appendItem`.
- Remote-Reaktionen ersetzen aktuell den Snapshot als Ganzes statt feiner Item-Diffs.

---

## 8. Risiken

- lokale und entfernte Wahrheit koennen bei spaeteren Randfaellen auseinanderlaufen
- Echo-Events und kuenftige Offline-Reconnects koennen Statusflattern erzeugen
- zu viele implizite Render-/Persist-Muster koennen spaeter schwerer zu debuggen sein

---

## 9. Definition of Done

- Ein neuer Chat versteht sofort, wo HESTIAs operative Listenwahrheit lebt.
- Die erlaubten State-Operationen sind klar und begrenzt.
- Die Beziehung zwischen lokalem UI-State und gemeinsamem Household-Snapshot ist beschrieben.
