# Supabase Sync Module Overview

Kurze Einordnung:
- Zweck: beschreibt die geplante Rolle von Supabase in HESTIA.
- Rolle innerhalb von HESTIA: definiert die technische Grenze zwischen lokalem Listenkern und spaeterem Shared-Household-Sync.
- Abgrenzung: kein vollstaendiger Implementierungsplan; dafuer existiert die Roadmap.

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

Heute ist Supabase in HESTIA im ersten produktiven Shared-Flow angekommen.

Vorhanden:
- `app/supabase/client.js`
- `app/supabase/list-sync.js`
- `sql/01_setup-supabase.sql`
- `public/runtime-config.json`
- Setup- und Roadmap-Doku
- manueller Snapshot-Save nach Supabase
- Initial-Load aus Supabase beim App-Start
- Realtime-Refresh fuer eingehende Remote-Aenderungen

Noch nicht abgeschlossen:
- echter Cross-Device-Live-Test als Smokecheck
- spaetere Schaerfung fuer Echo-Behandlung und Offline-Reconnects

---

## 3. Technische Rolle von Supabase

Supabase soll in HESTIA spaeter:

- den gemeinsamen aktuellen Listenstand speichern
- Aenderungen zwischen Geraeten spiegeln
- Household-Zugriff ueber RLS begrenzen

Supabase soll nicht:

- Nutzeridentitaeten zum Produktmittelpunkt machen
- Historie oder Analytics erzwingen
- HESTIA ohne Remote-Konfiguration unbrauchbar machen

---

## 4. Konfiguration

Relevante Werte:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY` oder vorerst `SUPABASE_ANON_KEY`
- `HOUSEHOLD_KEY`

Der aktuelle Frontend-Vertrag laeuft ueber:

- `public/runtime-config.json`

Der Household-Key kann dort gesetzt oder beim ersten manuellen Save lokal erfasst werden.

---

## 5. Household-Modell

HESTIA arbeitet nicht mit klassischen Nutzerkonten als Kernlogik.

Stattdessen:

- `households` definiert den gemeinsamen Haushalt
- `shopping_items` haelt die aktuelle offene Liste
- `household_key` identifiziert den Haushalt
- der Request-Header `x-household-key` bestimmt ueber RLS den Zugriffskontext

Das macht HESTIA leichtgewichtig und passend fuer einen bekannten Familienkontext.

Wichtige Produktgrenze:

- Auch wenn HESTIA spaeter von mehr Familienmitgliedern genutzt wird, bleibt das Modell haushaltsbasiert.
- HESTIA soll nicht in ein identity-first System mit verpflichtenden Einzelkonten kippen.
- Das Haushaltsmodell ist hier keine Uebergangsloesung, sondern Teil des Produktkerns.

---

## 6. Geplantes Sync-Modell

Der Zielpfad ist bewusst schmal:

1. lokale Liste schreiben
2. manuell `Liste speichern`
3. Snapshot nach Supabase uebertragen
4. andere Geraete erhalten den aktuellen Listenstand
5. Realtime spiegelt spaetere Aenderungen

Wichtige Regeln:

- kein Auto-Save bei jedem Tastendruck
- Last-Write-Wins ist fuer V1 akzeptabel
- lokaler Flow bleibt wichtig
- Push ist spaeter ein separater Awareness-Layer, kein Bestandteil des Datenmodells

---

## 7. Beziehung zum State Layer

Heute:
- `state.items` plus `localStorage` sind die einzige operative Wahrheit

Spaeter:
- lokaler State bleibt das unmittelbare UI-Modell
- Supabase wird die gemeinsame Haushaltsebene
- Realtime muss eingehende Aenderungen deterministisch in den State spiegeln

Der schwierigste kuenftige Punkt ist nicht SQL, sondern die saubere Beziehung zwischen lokalem Zustand und Remote-Wahrheit.

---

## 8. Realtime

Realtime ist fuer HESTIA nur dann sinnvoll, wenn es den Kernfluss ruhiger macht.

Das heisst:

- keine Eventflut
- keine schwer verstaendlichen Zwischenzustaende
- keine doppelte UI-Aktualisierung durch Echo vom selben Geraet

Realtime soll schlicht bedeuten:
- Aenderung auf Geraet A erscheint kurz darauf auf Geraet B

---

## 9. Risiken

- falscher oder fehlender `x-household-key` hebelt den Household-Kontext aus
- lokale und Remote-Wahrheit koennen auseinanderlaufen
- Echo-Events koennen doppelte Render oder Statusflattern erzeugen
- zu fruehe Komplexitaet im Sync-Layer kann den heute guten lokalen Kern verschlechtern

---

## 10. Definition of Done

- Ein neuer Chat versteht sofort, was Supabase in HESTIA leisten soll und was bewusst nicht.
- Household-Key, RLS und Shared-List-Logik sind als ein zusammenhaengender Vertrag beschrieben.
- Der naechste Sync-Ausbauschritt kann ohne konzeptionelle Unklarheit begonnen werden.
