# Supabase Sync Module Overview

Kurze Einordnung:
- Zweck: beschreibt die aktuelle Rolle von Supabase im produktiven Shared-List-Flow.
- Rolle innerhalb von HESTIA: definiert die technische Grenze zwischen lokalem UI-State, gemeinsamem Household-Snapshot und Realtime.
- Abgrenzung: kein detaillierter Offline-/Konfliktplan und keine Roadmap im Volltext.

Related docs:
- [PRODUCT.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/PRODUCT.md)
- [setup-supabase.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/setup-supabase.md)
- [hestia-shared-list-sync-roadmap.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/hestia-shared-list-sync-roadmap.md)
- [State Layer Module Overview.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/docs/modules/State%20Layer%20Module%20Overview.md)

---

## 1. Zielsetzung

- HESTIA soll denselben aktuellen Listenstand auf mehreren Geraeten desselben Haushalts verfuegbar machen.
- Supabase ist dafuer Infrastruktur, nicht der Produktzweck selbst.
- Nichtziel: OAuth-Zwang, Rollenmodell, offenes Nutzersystem oder komplexe Konfliktverwaltung.

---

## 2. Aktueller Stand

Heute ist Supabase im echten produktiven Kernfluss angekommen.

Vorhanden:
- Runtime-Config ueber `public/runtime-config.json`
- Household-Key-Validierung und lokale Household-Key-Persistenz
- Household-Resolve gegen `public.households`
- Snapshot-Load beim App-Start
- Snapshot-Save fuer Add nach bewusstem Submit, manuellen Retry/Fallback, Loeschen, Liste leeren, Toggle und Abschluss
- Realtime-Abos fuer eingehende Aenderungen
- Dirty-State-Schutz gegen stilles Ueberschreiben lokaler Einkaufs- oder Amazon-Aenderungen
- Touchlog-Diagnostik fuer Sync- und PWA-Randfaelle

---

## 3. Technischer Zuschnitt heute

### REST fuer Load/Save
- `app/supabase/list-sync.js` nutzt den REST-Pfad direkt fuer:
  - Household-Resolve
  - Snapshot-Load
  - Snapshot-Save

### `supabase-js` fuer Realtime
- `app/supabase/client.js` bleibt fuer Realtime-Channels im Einsatz.

Grund fuer den Schnitt:
- der direkte REST-Pfad ist fuer HESTIA kleiner, transparenter und leichter zu diagnostizieren
- Realtime bleibt ueber den Client am sinnvollsten

---

## 4. Household-Modell

HESTIA arbeitet nicht mit klassischen Nutzerkonten als Kernlogik.

Stattdessen:

- `households` definiert den gemeinsamen Haushalt
- `shopping_items` haelt die aktuelle offene Liste
- `shopping_items.list_type` trennt `grocery` und `amazon`
- `household_key` identifiziert den Haushalt
- der Request-Header `x-household-key` bestimmt ueber RLS den Zugriffskontext

---

## 5. Aktuelles Sync-Modell

Der aktuelle Shared-Flow ist bewusst schmal:

1. lokaler UI-State wird veraendert
2. HESTIA speichert den neuen Snapshot, wenn die Aktion den gemeinsamen Zustand veraendern soll
3. andere Geraete laden den veraenderten Stand ueber Realtime-Refresh nach

Wichtige Regeln:

- Add schreibt nach bewusstem Submit einen Shared Snapshot, wenn Sync konfiguriert ist.
- `Liste freigeben` bleibt als manueller Retry/Fallback fuer Dirty-, Error- oder Pending-Remote-Zustaende.
- destruktive und einkaufsrelevante Aktionen schreiben den Shared-Zustand direkt nach
- Grocery- und Amazon-UI filtern lokal, speichern aber weiterhin den vollstaendigen `state.items`-Snapshot.
- `list_type` wird remote gespeichert und beim Laden wieder zu `listType` normalisiert.
- fehlendes oder unbekanntes `list_type` wird defensiv als `grocery` gelesen.
- eingehende Remote-Snapshots werden bei lokalem Dirty-State nicht automatisch angewendet
- ein Remote-Snapshot waehrend Dirty-State wird als pending Remote gehalten und kann bewusst uebernommen werden
- Last-Write-Wins ist fuer den aktuellen Zuschnitt akzeptiert
- der aktuelle Vertrag ist Snapshot-Sync, nicht robuste Live-Kollaboration fuer paralleles Einkaufen

---

## 6. Beziehung zum State Layer

Heute:
- `state.items` ist die operative UI-Wahrheit
- Supabase haelt den gemeinsamen Household-Snapshot

Das heisst:
- lokale Aenderungen werden zuerst im State wirksam
- erfolgreiche Remote-Loads und Realtime-Refreshes spiegeln den Snapshot wieder in `state.items`, wenn kein lokaler Dirty-State geschuetzt werden muss
- pending Remote wird im Boot-/UI-Modulvertrag gehalten, nicht im Supabase-Modul selbst
- der Sync-Layer entscheidet nicht fachlich zwischen Grocery und Amazon; er transportiert den gesamten Snapshot mit Typinformationen

---

## 7. Realtime

Realtime soll fuer HESTIA nur bedeuten:
- Aenderung auf Geraet A erscheint kurz darauf auf Geraet B
- Falls Geraet B lokal unfreigegebene Einkaufs- oder Amazon-Aenderungen hat, wird der Remote-Stand nicht still angewendet.

Nicht Ziel:
- Eventflut
- schwer lesbare Zwischenzustaende
- tiefe Mehrbenutzer-Orchestrierung
- garantierte parallele Einkaufskoordination mit Konfliktaufloesung

---

## 8. Laufzeitdiagnostik

Der Sync-Layer loggt heute im Touchlog:

- Runtime-Config-Zusammenfassung
- Initial-Load-Erfolg oder Fehler
- Realtime-Abo
- Realtime-Refreshes
- Pending-Remote-Faelle im Boot-/UI-Modulvertrag
- Save-Erfolg oder Fehler mit Grund

---

## 9. Risiken

- falscher oder korrupter `householdKey` blockiert den Household-Kontext
- Last-Write-Wins kann bei bewusst freigegebenen Snapshots weiterhin juengere Staende ersetzen
- Pending Remote ist kein Merge und keine robuste Live-Collaboration
- spaetere Offline-Reconnects duerfen den Dirty-State-Schutz nicht umgehen
- alte PWA-Clients ohne `listType`-Bewusstsein koennen bei eigenen Gesamt-Snapshot-Saves Amazon-Eintraege gefaehrden; Service-Worker-Update und Zielgeraete-Smokes bleiben wichtig

---

## 10. Definition of Done

- Ein neuer Chat versteht sofort, was Supabase in HESTIA heute real leistet.
- Household-Key, RLS, REST-Snapshot und Realtime sind als ein Vertrag beschrieben.
- Dirty-State-Schutz ist als V1-Grenze beschrieben, ohne robuste Collaboration zu behaupten.
- Die naechsten Roadmap-Schritte koennen darauf ohne begriffliche Unschaerfe aufbauen.
