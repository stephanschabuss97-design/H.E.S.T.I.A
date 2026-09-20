# HESTIA Dev Environment

Dieses Dokument beschreibt die lokale Entwicklungsumgebung für HESTIA. Es ist
für Stephan und für neue LLM-/Coding-Agent-Chats geschrieben: Ein neuer Chat
soll schnell erkennen, welche Werkzeuge vorhanden sind, welche Checks sinnvoll
sind und welche Grenzen gelten.

Letzter verifizierter Toolchain-Abgleich: `2026-08-28`.

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

## Verifizierte Toolchain

| Werkzeug | Stand | Rolle in HESTIA |
| --- | --- | --- |
| Git | `2.55.0.windows.2` | Status, Diff, Historie, Commit |
| Node.js | `24.18.0` | JS-Syntaxchecks und lokale Testskripte |
| npm | `11.18.0` | nur bei bewusstem Toolbedarf; kein Projekt-Build |
| ripgrep | `15.2.0` | schnelle, gezielte Quellensuche |
| Python | `3.14.6` | lokaler statischer HTTP-Server |
| VS Code | `1.135.0` | Entwicklungsumgebung |
| Playwright | `1.61.1` | gebündelte Browser-/Responsive-/PWA-Smokes |
| Deno | `2.9.5` | optional für TypeScript-Tools; derzeit keine Runtimepflicht |
| Supabase CLI | `2.109.1` | nur bei bewusstem lokalen/Remote-Supabase-Auftrag |
| Docker CLI | `29.7.2` | optional für disposable Datenbanktests |
| WSL | `2.6.1.0` | Toolbrücke, insbesondere CodeRabbit |
| GitHub CLI | `2.96.0` | Workflow-/Run-Inspektion und GitHub-Aktionen |
| CodeRabbit CLI | `0.7.5` | externer S5-Code-Review |

Aktueller Betriebszustand beim Abgleich:

- Docker Desktop/Engine war nicht gestartet. Die CLI ist vorhanden, aber der
  Server war nicht erreichbar. Das blockiert normale HESTIA-Frontendarbeit
  nicht.
- `psql` ist nicht global im Windows-PATH. PostgreSQL-Prüfungen verwenden bei
  bewusstem Bedarf einen disposable Docker-Container oder eine dokumentierte
  Supabase-Schnittstelle.
- Playwright ist global installiert und keine HESTIA-Projektdependency.

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

- Installierter Refresh-Sensor:
  `C:\Users\steph\Documents\Rainmeter\Skins\illustro\Tokens\GetCodexUsage.ps1`
- Versionsgebundener KASRKIN-Einstieg: stabiler Command `kasrkin` mit der
  projektlokalen Bindung `.kasrkin/binding.json`.
- Aktives HESTIA-Integrationsprofil: `.kasrkin/activation.json`; lokaler Proof:
  `.kasrkin/Test-HestiaKasrkinActivation.ps1`.
- Kanonischer State-Validator-Aufruf: `kasrkin validate -Refresh`.
- Die frühere lokale Sensor-/Validator-Kopie wurde in W7 nach bewiesenem
  KASRKIN-Cutover retiret. Recovery stützt sich auf die gebundene Installation,
  `codex-tools`-Source und versionierte Receipts.
- Autoritativer State:
  `C:\Users\steph\Documents\Rainmeter\Skins\illustro\Tokens\UsageState.json`
- Schema: `schemaVersion = 3`
- Sensorversion: `sensorVersion = 3.1.0`
- Pflichtfenster: `300` und `10080` Minuten
- Maximales Messalter: `120` Sekunden

Die KASRKIN-Source of Truth liegt in `codex-tools`; HESTIA bindet eine konkrete
lokal installierte Releaseidentität und verwendet niemals `latest`. Der
Rainmeter-Sensor und der Sensor im gebundenen Release müssen bytegleich bleiben.
Der alte HESTIA-Snapshot bleibt ausschließlich als BH-Rollbackquelle erhalten.

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
