# State Layer Module Overview

Kurze Einordnung:
- Zweck: beschreibt die aktuelle fachliche Wahrheitsquelle von HESTIA.
- Rolle innerhalb von HESTIA: erklaert, wo Listendaten heute leben und welche Operationen darauf erlaubt sind.
- Abgrenzung: keine UI-Doku, kein kompletter Sync-Entwurf.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [Bootflow Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/Bootflow%20Module%20Overview.md)
- [writing.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/writing.md)
- [shopping.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/shopping.md)

---

## 1. Zielsetzung

- Der State Layer soll den aktuellen Listenstand einfach, ehrlich und leicht veraenderbar halten.
- HESTIA braucht keinen komplexen globalen Store, solange der Kernfluss klein bleibt.
- Nichtziel: Historie, Undo-Stack, Mehrstatusmodell oder Store-Abstraktionen auf Vorrat.

---

## 2. Source of Truth heute

- `app/core/state.js` ist die fachliche Kernwahrheit fuer die Liste.
- `state.items` enthaelt die aktuelle offene Einkaufsliste.
- Persistenz erfolgt lokal ueber `localStorage`.

Storage-Key:
- `hestia.v1.items`

---

## 3. Datenvertrag

Jeder Listeneintrag folgt aktuell diesem Frontend-Vertrag:

- `id`
- `name`
- `quantity`
- `unit`
- `inCart`

Wichtige Regel:
- Dieser Vertrag soll stabil bleiben, bis eine bewusste Vertragsaenderung beschlossen wird.

---

## 4. Erlaubte State-Operationen

Der State Layer exportiert aktuell:

- `upsertItem(nextItem)`
- `removeItem(id)`
- `toggleInCart(id, inCart)`
- `clearAll()`
- `finishShopping()`

Bedeutung:

- `upsertItem`: fuegt heute effektiv neue Eintraege hinzu
- `removeItem`: entfernt genau einen Eintrag
- `toggleInCart`: setzt den operativen Einkaufsstatus
- `clearAll`: leert die komplette Liste
- `finishShopping`: loescht alle bereits im Wagen markierten Eintraege

---

## 5. Beziehung zu Writing und Shopping

- Writing erzeugt und entfernt Eintraege.
- Shopping toggelt `inCart` und schliesst die Liste ab.
- Beide Module arbeiten auf demselben State und nicht auf getrennten Kopien.

Damit bleibt die Produktwahrheit einfach:
- eine gemeinsame aktuelle Liste
- kein doppelter Modulzustand

---

## 6. Eventvertrag

Der zentrale UI-Refresh-Impuls ist:

- `hestia:items-updated`

Typischer Ablauf:
- State aendert sich
- Modul rendert lokal neu
- Event wird dispatcht
- andere Module reagieren darauf

Heute:
- Writing dispatcht das Event bei Add/Remove/Clear
- Shopping hoert auf das Event und rendert neu

---

## 7. Aktuelle Grenzen

- Es gibt keine Remote-Wahrheit im produktiven Flow.
- Es gibt keine Konfliktbehandlung.
- `upsertItem` ist aktuell eher ein `appendItem`, nicht ein echtes Update.
- State-Mutationen sind einfach gehalten und noch nicht fuer Mehrgeraete-Konkurrenz entworfen.

---

## 8. Zukuenftige Entwicklung

Mit Supabase wird der State Layer der sensibelste Bereich.

Offene Designfragen fuer spaeter:

- bleibt HESTIA local-first mit manuellem Remote-Save?
- oder wird Supabase die primaere gemeinsame Wahrheitsquelle?
- wie werden eingehende Realtime-Aenderungen in `state.items` gespiegelt?
- wie werden Echo-Events vom eigenen Geraet behandelt?

Wichtig:
- auch mit Sync sollte HESTIA nicht in einen schweren Store oder Event-Bus kippen, wenn der Produktkern das nicht verlangt.

---

## 9. Risiken

- lokale und spaetere Remote-Wahrheit koennen auseinanderlaufen
- zu viele implizite Render-/Event-Muster koennen spaeter schwer zu debuggen sein
- ein zu frueher Umbau des State Layers koennte den heute stabilen lokalen Kern verschlechtern

---

## 10. Definition of Done

- Ein neuer Chat versteht sofort, wo die aktuelle Listenwahrheit liegt.
- Die erlaubten State-Operationen sind klar und begrenzt.
- Der kuenftige Sync kann auf diesen Layer aufbauen, ohne den lokalen Kernfluss zu zerstoeren.
