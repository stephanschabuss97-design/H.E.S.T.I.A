# HESTIA Dev Environment

KASRKIN ist seit 2026-10-12 durch ausdrückliche Ownerentscheidung entbunden.
Neue und laufende Roadmaps arbeiten ohne KASRKIN-Aufrufe, Usage-Gates, Permits
oder KASRKIN-Checkpointfelder. Fachliche Readiness, Scope, Review, sichere
Postconditions und produktive Ownergates bleiben verbindlich. Diese Entscheidung
überstimmt ältere KASRKIN-Klauseln, auch in unveränderten aktiven Roadmaps.

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

## KASRKIN-Consumerstatus

KASRKIN ist seit 2026-10-12 durch ausdrückliche Ownerentscheidung entbunden.
Neue und laufende Roadmaps arbeiten ohne KASRKIN-Aufrufe, Usage-Gates, Permits
oder KASRKIN-Checkpointfelder. Fachliche Readiness, Scope, Review, sichere
Postconditions und produktive Ownergates bleiben verbindlich. Diese Entscheidung
überstimmt ältere KASRKIN-Klauseln, auch in unveränderten aktiven Roadmaps.

Installationen und historische Zustände bleiben unverändert außerhalb des
Repositorys erhalten. Keine Binding-, Activation-, Proof- oder Validatorpflicht.
Details: [lokaler Integrationsstatus](../.kasrkin/integration.md).

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
- fachlich geprüfte, sauber resumierbare Roadmap-Ausführung ohne KASRKIN.

Keines dieser Werkzeuge erweitert HESTIA automatisch zu einem größeren
Framework oder Produkt.

Paid Credits bleiben ohne konkrete Ownerfreigabe verboten. Die frühere
KASRKIN-Reset-/Credit-Konsultation ist seit der Entbindung keine Projektpflicht.
