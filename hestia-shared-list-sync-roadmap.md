# HESTIA Shared List Sync Roadmap

## Ziel
Die Einkaufsliste kann manuell als Snapshot nach Supabase gespeichert werden und erscheint auf anderen Geraeten desselben Haushalts per Realtime-Sync, ohne Regression im bestehenden lokalen Schreib-/Einkaufsflow.

---

## Scope (In Scope)
- UI-Erweiterung im Schreiben-Flow: zusaetzlicher Button `Liste speichern` sobald mindestens ein Item existiert.
- Persistenz eines Listen-Snapshots nach Supabase (household-basiert).
- Realtime-Abo fuer eingehende Listen-Aenderungen auf anderen Geraeten.
- Sichtbarer Sync-Status im UI (`nicht gespeichert`, `gespeichert`, `fehlerhaft`).
- Minimale technische Doku fuer Ablauf, Datenfluss und Tests.

---

## Scope-Erweiterungen (optional, versioniert)
- Initial: keine Erweiterung.
- Erweiterungen nur nach expliziter Freigabe (z. B. Konflikt-Loesung mit Versionsnummern oder Offline-Queueing).

---

## Not in Scope
- Kein Full-Redesign von Home/Schreiben/Einkaufen.
- Kein Wechsel auf neues Auth-Modell (kein OAuth-Zwang in V1).
- Kein automatisches Live-Speichern bei jedem Tastendruck.
- Keine Push-Notification-Implementierung in diesem Schritt.
- Keine Querschnitts-Refactors ausserhalb Sync-Feature.

---

## Relevante Referenzen (Code)
- `app/modules/writing.js`
- `app/modules/shopping.js`
- `app/core/state.js`
- `app/main.js`
- `app/supabase/client.js`
- `sql/01_setup-supabase.sql`
- `index.html`
- `app/styles/components.css`

---

## Relevante Referenzen (Doku)
- `README.md`
- `PRODUCT.md`
- `docs/modules/Writing Module Overview.md`
- `docs/modules/Shopping Module Overview.md`
- `setup-supabase.md`

---

## Guardrails (Verhaltensregeln)
- Nur Dateien im Scope anfassen.
- Keine Aenderungen am Auth-/Session-Modell.
- Keine Breaking Changes an Datenmodell oder API-Vertraegen.
- Jeder Schritt muss einzeln testbar sein.
- Bei Seiteneffekten sofort stoppen und dokumentieren.

---

## Architektur-Constraints
- Bestehende Ordnerstruktur beibehalten.
- Bestehende Modulgrenzen respektieren.
- Keine neuen globalen Singletons.
- Bestehende Public APIs nur erweitern, nicht brechen.
- Keine Querschnitts-Refactors ausserhalb des Scopes.

---

## Tool Permissions

### Allowed
- Bestehende Dateien lesen.
- Bestehende Dateien innerhalb des Scopes aendern.
- Neue Dateien nur innerhalb bestehender Ordner anlegen, falls noetig.

### Forbidden
- Neue Dependencies einfuehren.
- Build-/Bundler-Konfiguration aendern.
- Unverwandte Dateien automatisch reformatieren.
- Dateien ausserhalb des Scopes aendern.

---

## Execution Mode
- Schritte strikt sequenziell abarbeiten.
- Keine Schritte ueberspringen.
- Nach Abschluss jedes Schritts Status aktualisieren.
- Nach jedem Schritt mindestens einen gezielten Check/Smokecheck durchfuehren.
- Bei Ambiguitaet oder Scope-Konflikt stoppen und Entscheidung einholen.

---

## Statusuebersicht
| ID | Schritt | Status | Ergebnis/Notiz |
|----|--------|--------|---------------|
| S1 | Datenfluss und Contract finalisieren | DONE | Produktvertrag, SQL und Sync-Doku stehen |
| S2 | Supabase-Schreibpfad fuer Listen-Snapshot implementieren | DONE | manueller Save-Path live gegen Supabase verifiziert |
| S3 | UI-Trigger `Liste speichern` im Schreiben-Flow integrieren | DONE | Button und Sync-Status im Writing-Flow aktiv |
| S4 | Realtime-Lesepfad fuer Fremdgeraet-Aenderungen integrieren | DONE | Initial-Load plus Realtime-Refresh auf weiterem Geraet verdrahtet |
| S5 | Sync-Status im UI anzeigen | DONE | Writing-Status reagiert auf lokale und entfernte Aenderungen |
| S6 | Smokechecks, Regression, Doku-Update | IN_PROGRESS | Syntax-Checks erledigt, Cross-Device-Live-Test noch offen |

Status-Legende: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`

---

## Umsetzungsplan (deterministisch)

### S1 - Datenfluss und Contract finalisieren
- S1.1 Finalen Snapshot-Vertrag definieren (`id`, `name`, `quantity`, `unit`, `in_cart`, `household_id`).
- S1.2 Verbindliche Trigger-Regel festlegen: Speichern nur per manuellem Button.
- S1.3 Konfliktregel festlegen: Last-Write-Wins fuer V1.

#### S1 Ergebnisprotokoll
- Datenvertrag und Verhaltensregeln dokumentiert.
- Datei: `PRODUCT.md`
- Check-Ergebnis: Vertragsabgleich mit vorhandenem `sql/01_setup-supabase.sql`.

---

### S2 - Supabase-Schreibpfad fuer Listen-Snapshot implementieren
- S2.1 Supabase-Client-Boundary fuer Listen-Write vorbereiten.
- S2.2 Snapshot-Speichern als deterministische Upsert/Delete-Sequenz umsetzen.
- S2.3 Fehlerpfad und Timeouts sauber rueckmelden.

#### S2 Ergebnisprotokoll
- Schreibfunktion vorhanden und manuell ausloesbar.
- Dateien: `app/supabase/client.js`, `app/modules/writing.js`
- Check-Ergebnis: Save-Aufruf liefert Erfolg/Fehlerstatus ohne UI-Blockade.

---

### S3 - UI-Trigger `Liste speichern` im Schreiben-Flow integrieren
- S3.1 Button nur anzeigen, wenn mindestens ein Item in der lokalen Liste ist.
- S3.2 Klick-Flow mit Busy/Disabled-Handling absichern.
- S3.3 Nach Erfolg lokalen Status auf `gespeichert` setzen.

#### S3 Ergebnisprotokoll
- Button-Sichtbarkeit und Interaktion wie spezifiziert.
- Dateien: `index.html`, `app/modules/writing.js`, `app/styles/components.css`
- Check-Ergebnis: Ohne Items kein Save-Button; mit Items sichtbar und klickbar.

---

### S4 - Realtime-Lesepfad fuer Fremdgeraet-Aenderungen integrieren
- S4.1 Realtime-Subscription auf `shopping_items` pro Haushalt aufsetzen.
- S4.2 Eingehende Aenderungen deterministisch in lokalen State spiegeln.
- S4.3 Echo-Events vom eigenen Save robust behandeln.

#### S4 Ergebnisprotokoll
- Realtime-Sync zwischen zwei Browserinstanzen funktioniert.
- Dateien: `app/main.js`, `app/core/state.js`, `app/supabase/list-sync.js`, `app/modules/shopping.js`, `app/modules/writing.js`
- Check-Ergebnis: Aenderung auf Geraet A erscheint auf Geraet B.

---

### S5 - Sync-Status im UI anzeigen
- S5.1 Statuszeile im Schreiben-Panel einfuehren.
- S5.2 Statuswerte: `Nicht gespeichert`, `Gespeichert um HH:MM`, `Sync fehlgeschlagen`.
- S5.3 Status bei Realtime-Ereignissen sinnvoll aktualisieren.

#### S5 Ergebnisprotokoll
- Transparenter Sync-Status sichtbar.
- Dateien: `index.html`, `app/modules/writing.js`, `app/styles/components.css`
- Check-Ergebnis: Erfolg/Fehler klar und reproduzierbar sichtbar.

---

### S6 - Smokechecks, Regression, Doku-Update
- S6.1 Kern-Smokes fuer Schreiben/Einkaufen/Sync ausfuehren.
- S6.2 Regression gegen bestehende lokale Flows pruefen.
- S6.3 Doku und Setup-Hinweise auf finalen Stand bringen.

#### S6 Ergebnisprotokoll
- Feature stabil, keine bekannten Regressionen.
- Dateien: `docs/modules/Writing Module Overview.md`, `docs/modules/Shopping Module Overview.md`, `PRODUCT.md`, `setup-supabase.md`
- Check-Ergebnis: Smokes dokumentiert, offene Punkte erfasst.

---

## Smokechecks + Regression
- Test A: Schreiben-Flow lokal ohne Supabase-Config bleibt nutzbar -> PENDING
- Test B: `Liste speichern` sendet Snapshot erfolgreich nach Supabase -> DONE
- Test C: Realtime-Aenderung von zweitem Geraet erscheint innerhalb weniger Sekunden -> PENDING
- Test D: Fehlerfall (Netzwerk weg) zeigt `Sync fehlgeschlagen` ohne Datenverlust -> PENDING
- Regression: Normalverhalten (Add/Remove/Finish Shopping) unveraendert -> DONE

---

## Abnahmekriterien
- `Liste speichern` erscheint nur bei vorhandenen Items.
- Gespeicherte Liste wird in Supabase persistiert und ist auf anderem Geraet sichtbar.
- Realtime-Sync funktioniert fuer denselben Haushalt in beide Richtungen.
- Sync-Status ist fuer Nutzer klar sichtbar.
- Keine Regressionseffekte in bestehenden Schreiben-/Einkaufen-Flows.

---

## Risiken / Offene Punkte
- Household-Key-Header muss im Client konsistent gesetzt sein, sonst greift RLS nicht wie erwartet.
- Realtime-Echo vom eigenen Geraet kann doppelte UI-Updates erzeugen, wenn nicht sauber gefiltert.
- Bei gleichzeitigen Edits bleibt V1 bei Last-Write-Wins (bewusster Tradeoff).
- Offline-Faelle und spaete Reconnects brauchen ggf. eine spaetere Queue-Strategie.
