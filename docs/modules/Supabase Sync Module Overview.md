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
- Snapshot-Save fuer manuellen Save, Loeschen, Liste leeren, Toggle und Shopping-Abschluss
- Realtime-Abos fuer eingehende Aenderungen
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
- `household_key` identifiziert den Haushalt
- der Request-Header `x-household-key` bestimmt ueber RLS den Zugriffskontext

---

## 5. Aktuelles Sync-Modell

Der aktuelle Shared-Flow ist bewusst schmal:

1. lokaler UI-State wird veraendert
2. HESTIA speichert den neuen Snapshot, wenn die Aktion den gemeinsamen Zustand veraendern soll
3. andere Geraete laden den veraenderten Stand ueber Realtime-Refresh nach

Wichtige Regeln:

- Add bleibt lokal plus bewusster manueller Save
- destruktive und Shopping-relevante Aktionen schreiben den Shared-Zustand direkt nach
- Last-Write-Wins ist fuer den aktuellen Zuschnitt akzeptiert

---

## 6. Beziehung zum State Layer

Heute:
- `state.items` ist die operative UI-Wahrheit
- Supabase haelt den gemeinsamen Household-Snapshot

Das heisst:
- lokale Aenderungen werden zuerst im State wirksam
- erfolgreiche Remote-Loads und Realtime-Refreshes spiegeln den Snapshot wieder in `state.items`

---

## 7. Realtime

Realtime soll fuer HESTIA nur bedeuten:
- Aenderung auf Geraet A erscheint kurz darauf auf Geraet B

Nicht Ziel:
- Eventflut
- schwer lesbare Zwischenzustaende
- tiefe Mehrbenutzer-Orchestrierung

---

## 8. Laufzeitdiagnostik

Der Sync-Layer loggt heute im Touchlog:

- Runtime-Config-Zusammenfassung
- Initial-Load-Erfolg oder Fehler
- Realtime-Abo
- Realtime-Refreshes
- Save-Erfolg oder Fehler mit Grund

---

## 9. Risiken

- falscher oder korrupter `householdKey` blockiert den Household-Kontext
- Last-Write-Wins kann bei Parallelbearbeitung ueberschreiben
- Echo-Events und spaetere Offline-Reconnects brauchen noch saubere Guardrails

---

## 10. Definition of Done

- Ein neuer Chat versteht sofort, was Supabase in HESTIA heute real leistet.
- Household-Key, RLS, REST-Snapshot und Realtime sind als ein Vertrag beschrieben.
- Die naechsten Roadmap-Schritte koennen darauf ohne begriffliche Unschaerfe aufbauen.
