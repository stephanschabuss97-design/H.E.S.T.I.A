# HESTIA Roadmap Templates

Dieser Ordner enthält die stabilen Prozessartefakte für neue
HESTIA-Roadmaps. Aktive Roadmaps und Arbeitsnachweise gehören direkt unter
`docs/`; abgeschlossene Roadmaps werden mit `(DONE)` nach `docs/archive/`
verschoben.

## Dateien und Rollen

| Datei | Rolle |
| --- | --- |
| `HESTIA Roadmap Workflow Contract.md` | Stabiler Ausführungs-, Review-, Usage- und Kontextvertrag |
| `HESTIA Roadmap Template.md` | Schlanke Kopiervorlage für eine aktive Roadmap |
| `HESTIA Roadmap Evidence Template.md` | Optionale technische Evidence bei produktiven oder riskanten Gates |

`README.md`, `PRODUCT.md`, `docs/DEV_ENVIRONMENT.md`, Module Overviews und
`docs/QA_CHECKS.md` bleiben lebende Sources of Truth und werden nicht in die
Roadmap kopiert.

KASRKIN besitzt die ausführbare Usage-Entscheidungsemantik des in
`.kasrkin/binding.json` gepinnten Releases. HESTIA-Templates beschreiben nur
Konsultation, lokale Ausführung und Evidence; sie bilden keine zweite aktive
Policy. `.kasrkin/activation.json` bindet die dafür konsultierten Verträge.

## Neue Roadmap erstellen

1. `AGENTS.md`, `README.md`, `PRODUCT.md` und
   `docs/DEV_ENVIRONMENT.md` lesen.
2. Diesen Einstieg und den Workflow-Vertrag vollständig lesen.
3. Nur die für den Scope relevanten Module Overviews, QA-Abschnitte und
   technischen Quellen lesen.
4. Ziel, Nicht-Ziel, Datenwirkung, PWA-/Sync-Wirkung, Owner-Gates und
   Rollback festlegen.
5. Die Roadmap-Vorlage anpassen und unter `docs/[Titel] Roadmap.md` ablegen.
6. Eine Evidence-Datei nur dann anlegen, wenn der Workflow-Vertrag sie
   verlangt.
7. Initialen Contract Review und Fresh-Chat-Test durchführen; Findings vor S1
   korrigieren.
8. Die Startkarte muss einen neuen Chat ohne Nacherzählung auf Ziel, Quellen,
   Autonomie, Usage-Gates und ersten Schritt setzen.

## Grundregeln

- HESTIA-Roadmaps bleiben proportional zum tatsächlichen Haushalts-Scope und
  behalten nur die Abschnitte, die für den konkreten Auftrag gebraucht werden.
- S1-S3 und optional S4R dürfen als autonome Discovery Wave laufen. Die
  Schritte bleiben getrennt dokumentiert; nur unnötige Gesprächspausen
  entfallen.
- S4 baut. S5 prüft den finalen Gesamtdiff einschließlich CodeRabbit bei
  Codeänderungen. S6 synchronisiert die Sources of Truth und archiviert.
- S5 und S6 bleiben getrennte kohärente Blöcke mit Usage-Gate dazwischen.
- Große Quellen zuerst über Abschnitt, Symbol, Producer oder Consumer
  eingrenzen. Gültige fingerprintgebundene Context Receipts dürfen wiederholte
  Rohreads ersetzen, sind aber nie Source of Truth.
- Eine Roadmap soll kompakt sein. Sie darf länger werden, wenn sonst
  Entscheidungen, Gates, Findings oder Fresh-Chat-Kontext verloren gehen;
  Wiederholungen und Terminaltranskripte gehören nicht hinein.

## Kurzauftrag

```text
Erstelle eine HESTIA-Roadmap analog zu docs/templates/. Lege aktive Dateien
unter docs/ ab, halte den Produktvertrag aus README.md und PRODUCT.md ein,
führe einen initialen Contract Review samt Fresh-Chat-Test durch, korrigiere
berechtigte Findings und beginne noch nicht mit der Umsetzung.
```
