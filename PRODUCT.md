# HESTIA Product And System Contract

## Ein-Satz-Beschreibung

HESTIA ersetzt Block und Bleistift fuer gemeinsame Einkaufslisten in einem bekannten Haushalt.

Nicht mehr, aber auch nicht weniger.

## Produktkern

HESTIA ist kein Familien-Organizer, kein Feature-Sammelbecken und kein SaaS-Produkt.

HESTIA ist ein ruhiges Alltagswerkzeug fuer einen kleinen, bekannten Haushalt. Die App soll Reibung reduzieren, nicht Organisation simulieren. Sie darf wertig wirken, muss aber vor allem schnell, klar und alltagstauglich sein.

Die Produktwahrheit lautet:

- jemand schreibt Dinge auf
- die Liste ist fuer die anderen relevanten Geraete verfuegbar
- jemand anderes uebernimmt den Einkauf
- Dinge werden abgehakt
- nach dem Einkauf wird die Liste wieder leer

HESTIA ist damit ein `fast in, fast out`-Werkzeug fuer den gemeinsamen Einkaufsfluss.

Zusatz zum Einkaufsfluss:

- `Einkauf` ist der Grocery-Fluss fuer Dinge aus dem Markt.
- `Amazon` ist eine kleine Merkliste fuer Dinge, die spaeter bei Amazon bestellt werden sollen.
- Amazon bleibt dabei nur ein zweiter Beschaffungskanal, kein Shop-Portal.

## Reales Alltagsbild

Typischer Ablauf:

- eine Person sitzt zuhause und schreibt die Einkaufsliste
- die Eingabe soll mit so wenig Friktion wie moeglich funktionieren
- die Semantik-Datei hilft schon nach wenigen Buchstaben mit Vorschlaegen
- wenn die Liste fertig ist, kann spaeter optional ein manueller Push `Einkaufsliste fertig` an die anderen Geraete gesendet werden
- die sendende Person selbst erhaelt diesen Push nicht
- eine andere Person sieht den Hinweis unterwegs oder in der Arbeit und kann den Einkauf uebernehmen
- im Einkauf werden Dinge mit `Im Wagen` markiert
- nach dem Bezahlen wird der Einkauf abgeschlossen
- erledigte Eintraege verschwinden und die gemeinsame Liste ist wieder leer

Der Push ist spaeter nur ein Ersatz fuer die kurze WhatsApp-Nachricht. Er ist kein Reminder-System.

## Nicht verhandelbarer Produktvertrag

1. HESTIA bleibt ein Haushaltswerkzeug, kein Haushaltsbetriebssystem.
2. `Einkauf` ist der kombinierte Kernfluss fuer Aufschreiben, Abhaken und Abschliessen; technisch bleibt die Route vorerst `writing`.
3. `Amazon` ist ein eigener kleiner Merkliste-Bereich fuer spaetere Bestellungen, ohne Amazon-Integration.
4. Freitext bleibt immer erlaubt.
5. Semantik, Mengen und Einheiten helfen, sperren aber nicht.
6. Der Listenstatus muss ehrlich bleiben: offen ist offen, gekauftes oder bestelltes verschwindet, Unerledigtes bleibt sichtbar.
7. Schreibende Aktionen brauchen klaren Nutzerimpuls.
8. Push bleibt spaeter Awareness, nicht Druck.
9. Mehr Features sind nur dann gut, wenn sie den gemeinsamen Einkaufsfluss ruhiger, schneller oder klarer machen.

## Was HESTIA bewusst nicht ist

- kein allgemeiner Familien-Organizer
- keine Aufgaben-App
- kein Kalender
- kein Rezept- oder Vorratssystem
- kein soziales Netzwerk fuer Einkaufslisten
- kein offenes Multi-Tenant-SaaS
- kein Reminder- oder Notification-System
- keine Historien- oder Metrik-App fuer Haushaltsprozesse

Wenn eine Idee mehr Verwaltung, mehr Status, mehr Navigation oder mehr Produktlautstaerke erzeugt, ist sie wahrscheinlich kein HESTIA-Feature.

## Produktstatus

Heute ist HESTIA ein fruehes PWA-Scaffold mit klaren Grenzen:

- browser-first App ohne Build-Step
- statisches HTML, CSS und JS
- ruhiger Home-Einstieg mit `Einkauf`, `Amazon` und `Muell`
- sichtbarer `Einkauf`-Flow zum schnellen Erfassen, Entfernen, Abhaken und Abschliessen von Eintraegen
- sichtbarer `Amazon`-Flow zum schnellen Erfassen, Entfernen, Bestellen-Markieren und Entfernen bestellter Eintraege
- alter Shopping-Flow bleibt technisch erreichbar, ist aber nur noch Vergleichs- und Uebergangsflaeche
- Hard Delete der gekauften bzw. bestellten Eintraege beim jeweiligen Abschluss
- lokale Semantik-Hilfe fuer Autocomplete und Einheitshinweise
- lokaler Zustand ueber `localStorage`
- PWA-Basis mit Manifest, Service Worker und Offline-Fallback
- Runtime-Config, manueller Snapshot-Save-Pfad und erster Realtime-Load-Pfad fuer Supabase

## Design- und UX-Haltung

HESTIA soll ruhig, wertig und zeitlos wirken.

- kein Dashboard-Gefuehl
- keine visuelle Lautstaerke
- keine verspielte Produktattituede
- Materialitaet, Tiefe und Ruhe statt Tech-Show
- Geschwindigkeit und Selbstverstaendlichkeit vor Effekt

Wenn die App zu viel Aufmerksamkeit fordert, ist sie zu laut.

## Technisches Modell

### Runtime Shape

- Single-page app aus `index.html`
- native ES modules
- kein Bundler
- keine schwere Workflow-Maschine

### Betriebsmodell

Heute:

- die aktive Liste lebt lokal in `localStorage`
- der Frontend-Vertrag ist `name`, `quantity`, `unit`, `inCart`, `listType`
- Einkauf, Amazon und der alte Shopping-Screen muessen ohne Supabase-Credentials weiter funktionieren

Ziel:

- Supabase wird die gemeinsame Listenoberflaeche zwischen den Geraeten
- das Backend speichert den aktuellen Listenstand, keine Langzeithistorie
- nach abgeschlossenem Einkauf oder entfernten bestellten Amazon-Eintraegen ist der Remote-Stand wieder leer bzw. nur mit offenen Restposten befuellt

### Datenmodell

Aktuelles Supabase-Zielmodell in `shopping_items`:

- `id` (UUID)
- `household_id`
- `name`
- `quantity`
- `unit`
- `in_cart`
- `list_type`
- `created_at`
- `updated_at`

Wichtige Vertragsregel:

- der UI-Vertrag `name`, `quantity`, `unit`, `inCart`, `listType` bleibt stabil, solange keine bewusste Vertragsaenderung beschlossen wird
- `listType` trennt `grocery` und `amazon`
- alte oder ungueltige Typen fallen defensiv auf `grocery` zurueck

### Zugriffsmodell

HESTIA verzichtet in V1 bewusst auf Google-Login oder ein schweres Account-System.

Das bevorzugte Modell ist:

- ein bekannter Haushalt
- ein gemeinsamer Household-Key
- RLS auf Haushaltsebene
- lokal gespeicherter Key pro Geraet

Das passt zum Threat-Model: wenig Reibung, aber trotzdem kein voellig offener Zugriff.

Wichtige Langfrist-Regel:

- Auch bei spaeter mehr beteiligten Personen bleibt HESTIA haushaltsbasiert statt identity-first.
- Einkauf soll nicht an persoenliche Konten oder individuelle Login-Huerden gebunden werden.
- Der schnellste Weg zum Eintrag ist wichtiger als saubere Nutzerverwaltung.
- Personalisierung ist hoechstens optional und weich, nie Voraussetzung fuer den Kernfluss.

### Sync-Modell

Der geplante Shared-Sync bleibt absichtlich schmal:

- Listenstand wird manuell gespeichert, nicht bei jedem Tastendruck
- andere Geraete erhalten denselben aktuellen Listenstand
- Realtime spiegelt eingehende Aenderungen
- spaeterer Push ist rein manueller Awareness-Impuls
- Last-Write-Wins ist fuer V1 ein akzeptierter Tradeoff

### Deletion-Modell

HESTIA ist `fast in, fast out`:

- `Im Wagen` ist operativer Einkaufsstatus
- `Bestellt` ist operativer Amazon-Status
- Abschluss loescht gekaufte Eintraege hart
- Amazon-Abschluss loescht bestellte Eintraege hart
- nicht erledigte Eintraege bleiben sichtbar
- die Systemwahrheit ist die aktuelle offene Liste, nicht eine Historie

## Architektur in Kurzform

1. `index.html`
   statische Einstiegshuelle und Screen-Struktur
2. `app/modules/*`
   UI-Module fuer Home, Writing/Einkauf, Amazon, altes Shopping, Waste und Kassa
3. `app/core/*`
   Router, State, PWA-Install, Semantik
4. `app/supabase/*`
   Supabase-Client-Grenze fuer spaeteren Sync
5. `sql/*`
   Tabellen- und RLS-Skelett fuer Household-Zugriff
6. `sw.js` + `manifest.webmanifest`
   PWA-Flaeche, Offline-Fallback und Installierbarkeit

## Repo-Karte

| Pfad | Zweck |
| --- | --- |
| `index.html` | zentrale HTML-Struktur |
| `app/app.css` | zentraler CSS-Bundle-Einstieg |
| `app/main.js` | Boot und Modulinitialisierung |
| `app/core/` | Router, State, PWA-Install, Semantik |
| `app/modules/` | Home-, Writing/Einkauf-, Amazon-, Shopping-, Waste- und Kassa-Module |
| `app/styles/` | Tokens, Base, Layout, globale UI und Feature-Styles |
| `app/supabase/` | Supabase-Client-Grenze |
| `assets/js/semantics.de.json` | lokale Semantikquelle |
| `setup-supabase.md` | Supabase-Projekt- und Header-Setup |
| `hestia-shared-list-sync-roadmap.md` | geplanter Sync-Umsetzungspfad |
| `docs/modules/` | optionale Modul-Detaildoku |
| `sql/` | Tabellen und RLS-Skelett |
| `sw.js` | Service Worker |
| `manifest.webmanifest` | PWA-Metadaten |

## Start

HESTIA hat aktuell keinen Build-Prozess.

Fuer PWA- und Service-Worker-Verhalten sollte die App ueber `localhost` laufen, nicht ueber `file://`.

```powershell
python -m http.server 8766
```

Danach:

```text
http://127.0.0.1:8766
```

## Regeln fuer neue Chats und Coding-Agents

Lies zuerst [README.md](/c:/Users/steph/Projekte/H.E.S.T.I.A/README.md) und danach diese Datei.

Arbeitsregeln:

- Behandle HESTIA nicht als generische Shopping-App.
- Behandle HESTIA nicht als Familien-Organizer fuer beliebige Lebensbereiche.
- Behandle HESTIA nicht als SaaS-Vorstufe mit komplexem User-Management.
- Priorisiere Ruhe, Klarheit und Reibungsarmut vor Feature-Breite.
- Halte den Datenvertrag `name`, `quantity`, `unit`, `inCart`, `listType` stabil.
- Denke lokale Persistenz, Supabase-Sync und PWA-Verhalten als zusammenhaengende Betriebsrealitaet.
- Wenn ein zentraler Flow geaendert wird, aktualisiere auch die passende Doku.

Bevor du eine Idee oder Aenderung akzeptierst, stelle drei Fragen:

1. Hilft sie dem gemeinsamen Einkaufsfluss?
2. Macht sie Einkauf ruhiger, schneller oder klarer?
3. Reduziert sie Abstimmung statt neue Verwaltung zu erzeugen?

Wenn die Antwort darauf nicht klar `ja` ist, ist die Idee fuer HESTIA wahrscheinlich falsch.
