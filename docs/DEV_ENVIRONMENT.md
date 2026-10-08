# Aktueller KASRKIN-Commandkontext (2026-10-03)

Installation: C:\Users\steph\.local\share\kasrkin-gate-v1.
Release: `kasrkin-846014632990bb03`. Vor allen unten dokumentierten
kasrkin-Aufrufen in jedem neuen PowerShell-Prozess Receipt und ausgewählten
Bootstrap in .kasrkin/command.json verifizieren, dann diesen Bootstrap mit
-ProjectRoot dieses Projekts ausführen. K0: .kasrkin/Test-HestiaKasrkinActivation.ps1.
Kein globaler PATHwrite oder Fallback zum bisherigen Shared-Shim.

# HESTIA Dev Environment

Dieses Dokument ist das HESTIA-Projekt-Overlay. Owner ist Stephan; HESTIA
besitzt Nutzung, Anforderungen und Grenzen. Aktuelle gemeinsame Versionen
und Installationspfade stehen in der [ATLAS-Workstation-SoT](../../codex-tools/environment/DEV_ENVIRONMENT.md).
Normale Projektarbeit erfordert keinen zentralen Full-Read. Bei Toolabhängigkeit
gezielt den passenden Abschnitt und den [Capability-Preflight](../../codex-tools/environment/README.md)
lesen; Ergebnis in Startkarte/Context Receipt der neuen Roadmap festhalten.

## Grundvertrag

- Repository: `C:\Users\steph\Projekte\H.E.S.T.I.A`
- HESTIA ist eine browser-first PWA aus statischem HTML, CSS und JavaScript.
- Es gibt keinen Root-Build-Step und kein Root-`package.json`.
- Der Produktvertrag steht in `README.md` und `PRODUCT.md`.
- Der Agentenvertrag steht in `AGENTS.md`.
- Roadmap-Prozess: `docs/templates/README.md` und
  `docs/templates/HESTIA Roadmap Workflow Contract.md`.
- Runtime Config: `public/runtime-config.json`.
- Lokale Supabase-Secrets dürfen in `.env.supabase.local` liegen; die Datei ist
  ignoriert und ihre Werte dürfen nie ausgegeben oder committet werden.
- Kein produktives SQL, RLS, Supabase-Write, Deploy, Workflow, Push oder andere
  externe Wirkung ohne ausdrückliche Freigabe.

## Projektnutzung gemeinsamer Werkzeuge

HESTIA nutzt Git und rg für lokale Arbeit, Node für gezielte Syntaxchecks,
Python für einen HTTP-Server und bei Bedarf Playwright für Browser-Smokes.
Es entsteht kein Root-Buildsystem und keine globale Versionskopie.
Docker, Deno, Supabase und GitHub CLI werden nur beim jeweiligen konkreten
Auftrag benötigt; Installation allein erzeugt keine Projektdependency.
Gemeinsame Verfügbarkeit und Grenzen stehen in [ATLAS](../../codex-tools/environment/DEV_ENVIRONMENT.md).
Ein laufender Docker-Daemon oder vorhandener Browserpayload wird hier nicht
als dauerhafter Zustand behauptet. Datenbankprüfungen bleiben bewusst gated.

## Standardshell und Suche

Standardshell ist PowerShell. Vor jeder Änderung:

```powershell
git status --short --branch
```

Für Text- und Dateisuche zuerst `rg` verwenden:

```powershell
rg -n "Suchbegriff" app docs
rg --files app docs
```

Große Quellen zuerst nach Abschnitt, Symbol, Producer oder Consumer
eingrenzen. Unveränderte Dateien und bereits gültige Nachweise nicht aus
Gewohnheit erneut vollständig lesen.

## Node.js, npm und Syntaxchecks

PowerShell kann `npm.ps1` über die Execution Policy blockieren. Deshalb:

```powershell
node --version
npm.cmd --version
cmd /c npx --version
```

Typische Syntaxchecks:

```powershell
node --check app/main.js
node --check app/modules/writing.js
node --check app/modules/amazon.js
node --check app/modules/shopping.js
node --check app/supabase/list-sync.js
node --check sw.js
```

Bei Änderungen nur tatsächlich betroffene JavaScript-Dateien plus relevante
Producer/Consumer prüfen. HESTIA erhält nicht allein für Tests ein
`package.json` oder einen Bundler.

## Lokaler Server und Browser

Für PWA-, Service-Worker- und Browserverhalten HESTIA über HTTP starten:

```powershell
python -m http.server 8766
```

Danach:

```text
http://127.0.0.1:8766
```

Ist Port `8766` belegt, einen freien Port wählen und ihn im Testnachweis
angeben. `file://` ist kein belastbarer PWA-Test.

Browserprüfung:

1. Wenn verfügbar, zuerst den dokumentierten In-App-Browser verwenden.
2. Andernfalls den globalen Playwright-Fallback verwenden und den Grund kurz
   dokumentieren.
3. Desktop und relevante Mobile-Viewports in einer gebündelten Session prüfen.
4. Nur durch Korrekturen invalidierte Browserfälle wiederholen.

Playwright-Version:

```powershell
playwright.cmd --version
```

Für temporäre Node-Skripte mit globalem Playwright kann nötig sein:

```powershell
$env:NODE_PATH = npm.cmd root -g
```

Keine Playwright-Dateien oder Dependencies automatisch ins Repository
schreiben. Service Worker bei reinen UI-Smokes bewusst behandeln; bei echten
PWA-Smokes muss er dagegen Teil des Tests sein.

## Browser-/PWA-Smokevertrag

Je nach betroffenem Scope prüfen:

- Home startet und bleibt ruhig.
- `Einkauf`, `Amazon` und `Muell` öffnen korrekt.
- Freitext kann erfasst werden; Menge und Einheit bleiben optional.
- Grocery- und Amazon-Einträge bleiben typgetrennt.
- Abhaken, Bestellt-Markieren und jeweiliger Abschluss wirken nur im richtigen
  Bereich.
- Lokale Nutzung funktioniert ohne Supabase-Konfiguration.
- Shared-Snapshot-Status und Fehlercopy bleiben ehrlich.
- Mobile Layouts überlappen nicht und besitzen ausreichende Touchziele.
- Service Worker, Offline-Fallback und Cacheänderung entsprechen dem Scope.

`docs/QA_CHECKS.md` ist die aktuelle manuelle Regressionsbasis. Nur relevante
Abschnitte lesen und ausführen.

## Supabase

HESTIA nutzt Supabase optional für den gemeinsamen Listen-Snapshot eines
bekannten Haushalts.

Relevante Dateien:

- `public/runtime-config.json`
- `.env.supabase.local`
- `setup-supabase.md`
- `sql/01_setup-supabase.sql`
- `sql/02_add-shopping-list-type.sql`
- `app/supabase/client.js`
- `app/supabase/list-sync.js`
- `docs/modules/Supabase Sync Module Overview.md`

Runtime-Config-Vertrag:

```json
{
  "supabaseUrl": "",
  "supabasePublishableKey": "",
  "supabaseAnonKey": "",
  "householdKey": ""
}
```

Regeln:

- `service_role`, Secret Keys und private Tokens gehören niemals in
  `public/runtime-config.json`.
- `householdKey` bleibt in der committed und öffentlich ausgelieferten
  `public/runtime-config.json` leer. Der reale Key wird bei Bedarf lokal
  abgefragt und darf nicht ins Repository gelangen.
- HESTIA muss ohne Runtime-Credentials lokal nutzbar bleiben.
- Household-Sync bleibt haushaltsbasiert und wird nicht still auf individuelle
  Accounts oder Multi-Tenancy umgestellt.
- SQL, RLS, Schema, Remote-Reads mit sensibler Wirkung und Remote-Writes sind
  owner-gated.
- Keine Secret-Werte in Logs, Roadmaps, Evidence oder Antworten ausgeben.

CLI-Prüfung:

```powershell
supabase --version
```

Docker oder ein lokaler Supabase-Stack werden nur gestartet, wenn eine
Roadmap disposable Datenbank- oder RLS-Nachweise verlangt. Für normale UI- und
Sync-JavaScript-Arbeit sind sie keine Voraussetzung.

## GitHub CLI und Workflow

HESTIA besitzt einen Workflow für den Axams-Müllkalender. GitHub CLI darf für
read-only Status- und Run-Inspektion genutzt werden:

```powershell
gh --version
gh workflow list
gh run list --limit 10
```

Workflow-Ausführung, Secretänderung, Push oder andere externe Wirkung bleibt
owner-gated.

## CodeRabbit

Der kanonische Windows-Aufruf lautet:

```powershell
coderabbit --version
coderabbit
```

Der Befehl routet zur bereits authentifizierten WSL-CLI. Regeln:

- In Roadmaps mit Codeänderungen nur in S5 verwenden.
- Genau ein Initiallauf und höchstens ein Verifikationslauf nach berechtigten
  Korrekturen.
- Findings gegen HESTIA-Produktvertrag, Roadmap und reale Implementierung
  bewerten; niemals blind korrigieren.
- Bei Doku-only Roadmaps kein CodeRabbit.
- Außerhalb von Roadmaps nur auf ausdrücklichen Auftrag.
- Schlägt der kanonische Befehl oder die Authentifizierung fehl, nicht neu
  installieren und keinen alternativen CLI-Pfad improvisieren. Das Evidence-
  Gap sichtbar dokumentieren.
- Ein nativer Review wird nie als CodeRabbit-Ergebnis bezeichnet.

## Lokale Codex-Usage-Telemetrie

Diese Telemetrie ist der verbindliche Sensor für Usage-aware Continuation
Gates bei lokaler Roadmap-Ausführung. Rainmeter zeigt denselben Zustand für
Menschen; die Anzeige selbst entscheidet nichts.

- Gemeinsame Sensor-/State-Pfade: [ATLAS](../../codex-tools/environment/DEV_ENVIRONMENT.md#kasrkin-installation-und-state-pfade).
- Versionsgebundener KASRKIN-Einstieg: stabiler Command `kasrkin` mit der
  projektlokalen Bindung `.kasrkin/binding.json`.
- Aktives HESTIA-Integrationsprofil: `.kasrkin/activation.json`; lokaler Proof:
  `.kasrkin/Test-HestiaKasrkinActivation.ps1`.
- Kanonischer State-Validator-Aufruf: `kasrkin validate -Refresh`.
- Die frühere lokale Sensor-/Validator-Kopie wurde in W7 nach bewiesenem
  KASRKIN-Cutover retiret. Recovery stützt sich auf die gebundene Installation,
  `codex-tools`-Source und versionierte Receipts.
- Autoritativer Quota-State: `UsageState.json` am zentral dokumentierten Ort.
- Schema: `schemaVersion = 3`
- Sensorversion: `sensorVersion = 3.1.0`
- Pflichtfenster: `300` und `10080` Minuten
- Maximales Messalter: `120` Sekunden

Die KASRKIN-Source of Truth liegt in `codex-tools`; HESTIA bindet eine konkrete
lokal installierte Releaseidentität und verwendet niemals `latest`. Der
Rainmeter-Sensor und der Sensor im gebundenen Release müssen bytegleich bleiben.
Der alte lokale HESTIA-Snapshot wurde in W7 retiret; Recovery folgt dem
bewiesenen Source-/Installations-/Receipt-Vertrag.

Roadmap-Agenten starten ausschließlich `kasrkin validate -Refresh`. Der
Resolver prüft zuerst Projektbindung, Receipt, Release und Payload und ruft
danach den installierten Validator auf. Dieser verwendet die installierte
Rainmeter-Kopie und hält `UsageState.json` außerhalb des Repositorys.

Kanonischer Gate-Aufruf:

```powershell
$validation = & kasrkin validate -Refresh
if ($LASTEXITCODE -ne 0) {
  throw "Codex usage state validation failed with exit code $LASTEXITCODE."
}
$usage = $validation | ConvertFrom-Json
```

Der Validator prüft unter anderem:

- SHA-256-Gleichheit von Rainmeter-Sensor und gebundenem Release-Sensor,
- Schema und Sensorversion,
- erfolgreichen Status,
- beide vollständigen Buckets,
- numerische Rest-/Verbrauchswerte und Resetidentitäten,
- identische Attempt-/Success-Zeitstempel,
- maximal zwei Minuten alte Messung.

Nur Exitcode `0` plus kompakte Validatorausgabe ist ein gültiger Messnachweis.
Das rohe JSON wird nicht eigenständig neu interpretiert. Vollständige States
werden nicht ins Repository geschrieben. Der exakt gebundene KASRKIN-Release
besitzt die ausführbare Entscheidungsemantik. Der HESTIA Workflow Contract
besitzt Konsultationszeitpunkte, projektspezifische Ausführung, Rollback und
Safe Closure; seine lesbare Entscheidungstabelle ist eine Verbraucherprojektion
und darf den Release nicht überschreiben. `.kasrkin/activation.json` bindet
beide Seiten; ein Widerspruch ist Contract Drift und sperrt den nächsten Block.

## Lokale Env- und Secretgrenzen

Möglich:

```text
.env.supabase.local
```

- Keine Env-Werte ausgeben.
- Keine `.env`-Datei committen.
- Variablennamen dürfen ohne Werte geprüft werden.
- Secrets nicht in Screenshots, Terminaltranskripte, Roadmaps oder Evidence
  übernehmen.

### Security-Watchlist vom 2026-08-28

Beim Tooling-Sweep wurde festgestellt, dass `.env.supabase.local` trotz der
beabsichtigten Ignore-Regel bereits im Git-Index lag. Ursache war eine
UTF-16-kodierte `.gitignore`, die Git nicht als normale Ignore-Datei auswerten
konnte.

Lokal korrigiert wurde:

- `.gitignore` auf UTF-8 normalisiert,
- `.env`/`.env.*` als wirksame Ignore-Regel bestätigt,
- `.env.supabase.local` nur aus dem Git-Index entfernt; die lokale Datei blieb
  erhalten,
- die frühere lokale Usage-State-Ignore-Regel in W7 gemeinsam mit der
  duplizierten Toolkopie retiret.

Bewusst nicht Teil dieses Sweeps:

- keine Secret-Werte lesen oder dokumentieren,
- keine Git-History umschreiben,
- keine produktiven Credentials rotieren.

Da frühere Commits gesetzte lokale Werte enthalten können, sollten mindestens
das Supabase-Datenbankpasswort und der Household-Key in einer eigenen,
owner-gated Sicherheitsaktion rotiert werden. Ein neuer Commit entfernt die
Datei nur aus dem aktuellen Repositoryzustand, nicht rückwirkend aus der
Historie.

## Typische Abschlusschecks

Vor Änderungen:

```powershell
git status --short --branch
```

Nach JavaScript-Änderungen:

```powershell
node --check <geänderte-datei.js>
git diff --check
```

Nach HTML/CSS/PWA-Änderungen:

```powershell
git diff --check
```

Zusätzlich den relevanten Browser-/PWA-Smoke ausführen.

Nach Sync-/Supabase-JavaScript-Änderungen:

```powershell
node --check app/supabase/client.js
node --check app/supabase/list-sync.js
git diff --check
```

Zusätzlich Datenvertrag, lokale Fallbacks, Typtrennung und Secretgrenzen
prüfen.

Nach Doku-/Roadmap-Änderungen:

```powershell
git diff --check
rg -n "TODO|BLOCKED|P0|P1" docs\<betroffene-datei>.md
```

## Bekannte Eigenheiten

- VS Code nach PATH- oder Tooländerungen vollständig neu starten.
- `npm.ps1` kann blockiert sein; `npm.cmd` verwenden.
- Globales Playwright braucht in temporären Node-Skripten gegebenenfalls
  `NODE_PATH`.
- Service Worker und Cache können Browser-Smokes beeinflussen.
- Docker ist optional und muss vor Containerchecks bewusst gestartet werden.
- Historische Roadmaps können alte Produkt- oder Pfadstände enthalten;
  `AGENTS.md`, README, PRODUCT, aktive Roadmap und Module Overviews haben
  Vorrang.

## Aktueller Stand

Die vorhandene Toolchain reicht für HESTIAs reale Arbeit:

- statische PWA-Entwicklung ohne Buildsystem,
- gezielte JS- und Dokuchecks,
- gebündelte Browser-/Responsive-/PWA-Smokes,
- optionalen Supabase-/RLS-Test mit explizitem Gate,
- GitHub-Workflow-Inspektion,
- kontrollierten CodeRabbit-Review in S5,
- usage-aware, sauber resumierbare Roadmap-Ausführung.

Keines dieser Werkzeuge erweitert HESTIA automatisch zu einem größeren
Framework oder Produkt.

### Optionaler KASRKIN Reset-Hinweis

Seit dem Paid-Credit-Consumerupdate vom 2026-09-20 ist
`kasrkin-4f3f71b333dfe784` exakt
gebunden. Der bestehende Gate-Aufruf `kasrkin validate -Refresh` bleibt unverändert.
Optional kann `kasrkin validate -ResetAdvisory` die bereits vorhandene frische
Telemetrie um einen rein informativen Reset-Hinweis ergänzen. Kein zusätzlicher
Refresh oder dauerhafter Beobachtungsauftrag ist dafür vorgesehen.

Nur bei VALID entsteht ein `kasrkin-validate-advisory/1`-Wrapper mit `telemetry`
und `resetAdvisory`; bei LIMIT oder Fehler bleibt es beim kanonischen Envelope
und Exitcode. Der optionale Wrapper ersetzt nicht das Ausgabeformat des normalen
Usage-Gates. Ein erwarteter Reset erzeugt weder Budget noch Arbeitsfreigabe;
Floors, LIMIT, Restricted Episode und Owner-/Fachgates bleiben unverändert.
Die 300-Sekunden-Nähegrenze ist eine Versuchshypothese, kein bewiesenes Optimum.

### Paid-Credit-Telemetrie

Das gebundene Release ergänzt die regulären Usage-Fenster um die getrennte,
maschinenlesbare Dimension `paidCredits`. Deren Quelle ist der lokale Codex
App Server; der separate Runtime-State liegt in
[zentral dokumentierten Runtime-Verzeichnis](../../codex-tools/environment/DEV_ENVIRONMENT.md#kasrkin-installation-und-state-pfade)
als `PaidCreditState.json`.
`UsageState.json`, dessen Writer und die reguläre Quota-Policy bleiben
unverändert.

Credit availability is not permission to spend. Ein positiver Creditstand,
Rainmeter, ein erfolgreiches Validate oder eine frühere Freigabe autorisieren
keine Nutzung. Paid Credits benötigen eine ausdrückliche, zeitlich und
fingerprintgebundene Ownerfreigabe für exakt den aktuellen Arbeitsblock; alle
HESTIA-, Security-, Data-, Review-, External-Write-, Floor-, Safe-Closure- und
Anti-Splitting-Gates bleiben zusätzlich wirksam.


Current KASRKIN execution: Activation/3, separate kasrkin-admin-v1 installation.
Use the receipt-bound local K0 proof and selected bootstrap in explicit Windows
PowerShell 5.1. Work Begin/Complete performs the required fresh measurement per
operation; a separate setup validate is unnecessary for that same operation.
Legacy validate remains available; no owner/domain/paid-spend rule changes.



## Explicit KRC-C2 Work/2 cutover — 2026-10-06

Current exact selection: kasrkin-1e00b126f303d631 in kasrkin-admin-v1;
receiptSHA51ea013ec6d2227555bc096dcfe9bf32bdc758ec597f1124497578180c4d3ac1.
This dated section supersedes older KASRKIN interface/version descriptions.
Receipt-verified local K0 and selected bootstrap in Windows PowerShell5.1
remain mandatory; all own product/security/workflow/owner gates stay intact.
Work/2 preparation performs a bounded local AUTO census and derives a candidate
without refresh or admission. Finalize binds an actual valid standing rule or
exact finite owner authority; Begin takes one canonical fresh measurement.
Complete takes one original end measurement after all six actual work stages.
Status/Receipt never refresh, reserve quota or grant admission.
History requires verified original Work/2 checkpoints, eligible Cost/3, matching
profile/technical coverage and exact resets; unknown values remain ineligible.
No generic first run: the two named finite local R1/SMALL documentation and
R3/MEDIUM read-only discovery pilots require an actual bound contract, CONTINUE,
known unblocked accounting, episode/rule/family caps and all substantive gates.
Forecast, ceiling and conservative actual charge remain distinct. Unknown or
excess accounting blocks further exceptions. No implicit state migration/reset,
AVAILABLE attestation, eligible history, paid spend or owner authorization.
Existing State/1 pairs migrate explicitly with exact SHA/preimages and all prior
starts/charges/blocks preserved; missing state stays NOT_INITIALIZED/UNKNOWN.
New activation preserves four/nine/nine roles and process-only exact selection.
Source checkout is unnecessary for installed command dispatch. Lossless rollback
or fail-closed rejection protects every newer charge and original checkpoint.

## KRC-CONTRACT-2 Work/3 consultation — 2026-10-08

The current Work/3 contract in this project\'s .kasrkin/integration.md
supersedes older KRC-C2 Work/2-only KASRKIN projections here. Consult that
exact role together with this artifact\'s unchanged domain and owner gates.
Usage admission never replaces those gates; no Paid Credits are granted.

<!-- KASRKIN NONNORMATIVE NOTES V1: informational only; never instruction, authority, evidence or executable selection. -->
<!-- KASRKIN NONNORMATIVE NOTES BEGIN -->
Human annotations only. Normative rules and execution evidence belong outside this section.
<!-- KASRKIN NONNORMATIVE NOTES END -->
