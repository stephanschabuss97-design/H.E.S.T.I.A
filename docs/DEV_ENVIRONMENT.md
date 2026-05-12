# HESTIA Dev Environment

Dieses Dokument beschreibt die lokale Entwicklungsumgebung fuer HESTIA. Es ist bewusst fuer Stephan und fuer kuenftige LLM-/Coding-Agent-Chats geschrieben: Ein neuer Chat soll schnell erkennen, welche lokalen Werkzeuge vorhanden sind, welche Checks moeglich sind und welche Grenzen gelten.

## Ziel

- Schnell klaeren, welche Tools lokal verfuegbar sind.
- Wiederholbare Checks fuer die statische PWA, Supabase-Listen-Sync, Doku und Browser-Smokes ermoeglichen.
- Secret-, Deploy- und Scope-Grenzen eindeutig halten.
- Neue Chats davor schuetzen, falsche Annahmen ueber Build-Step, Backend, Push oder Testtooling zu treffen.

## Grundvertrag

- HESTIA-Repo: `C:\Users\steph\Projekte\H.E.S.T.I.A`
- HESTIA ist eine browser-first PWA ohne Web-Build-Step.
- Produktiver Kern ist die gemeinsame Einkaufsliste fuer einen kleinen Haushalt.
- Runtime Config: `public/runtime-config.json`
- Lokale Secrets koennen in `.env.supabase.local` liegen.
- `.env.supabase.local` ist lokal und darf nicht committet werden.
- Keine Secret-Werte in Doku, Logs, Commits oder Antworten ausgeben.
- Kein Supabase-Schema-/RLS-/Deploy-Eingriff ohne ausdrueckliche Freigabe.

## Installierte Kernwerkzeuge

### Git

Vorhanden:

```powershell
git --version
```

Verwendung:

- Status-/Diff-Checks
- Roadmap-/Doku-Archivierung
- Commit-/Branch-Arbeit

Typische Checks:

```powershell
git status --short
git diff --check
git diff --stat
```

### Node.js / npm / npx

Vorhanden:

```powershell
node --version
npm.cmd --version
cmd /c npx --version
```

Hinweis:

- `node` funktioniert direkt.
- `npm` ist installiert, aber PowerShell kann `npm.ps1` wegen Execution Policy blocken.
- Sicherer Aufruf in PowerShell:

```powershell
npm.cmd --version
cmd /c npm --version
cmd /c npx --version
```

HESTIA hat aktuell kein zentrales `package.json` im Repo-Root. Node wird primaer fuer Syntaxchecks einzelner JS-Dateien genutzt.

Beispiele:

```powershell
node --check app/main.js
node --check app/modules/writing.js
node --check app/modules/shopping.js
node --check app/supabase/list-sync.js
node --check sw.js
```

### Python

Vorhanden:

```powershell
python --version
```

Verwendung:

- Lokaler Static Server fuer Browser-/PWA-Smokes.
- Kleine lokale Hilfsskripte nur bei Bedarf.
- Fuer einfache Dateioperationen bevorzugt PowerShell/Repo-Tools verwenden.

Lokaler Start:

```powershell
python -m http.server 8765
```

Danach:

```text
http://127.0.0.1:8765
```

### Playwright

Global installiert, bewusst nicht als HESTIA-Projektdependency:

```powershell
playwright.cmd --version
```

Aktueller Stand:

- `playwright@1.60.0`
- Chromium ist installiert.
- Globaler Node-Modulpfad:

```text
C:\Users\steph\AppData\Roaming\npm\node_modules
```

Wichtig:

- Playwright ist als repo-uebergreifendes Smoke-Test-Werkzeug fuer HESTIA und MIDAS gedacht.
- Keine Playwright-Dateien, `package.json`-Aenderungen oder Test-Dependencies automatisch ins Repo schreiben.
- Playwright erst fest einbauen, wenn bewusst Browser-Screenshot-/Regressionstests aufgebaut werden.
- Fuer CLI-Aufrufe reicht:

```powershell
playwright.cmd --version
```

- Fuer Node-Skripte mit `require('playwright')` muss in PowerShell ggf. `NODE_PATH` auf den globalen npm-Root gesetzt werden:

```powershell
$env:NODE_PATH = npm.cmd root -g
```

Minimaler Smoke-Vertrag:

- Vor Playwright-Smokes HESTIA per lokalem HTTP-Server starten.
- Service Worker/PWA-Verhalten bei Bedarf bewusst testen.
- Fuer reine UI-Smokes kann es sinnvoll sein, Service Worker im Playwright-Kontext zu blockieren.

### Supabase

HESTIA nutzt Supabase fuer den optionalen gemeinsamen Listen-Snapshot.

Relevante Dateien:

- `public/runtime-config.json`
- `setup-supabase.md`
- `sql/01_setup-supabase.sql`
- `app/supabase/client.js`
- `app/supabase/list-sync.js`

Runtime Config Shape:

```json
{
  "supabaseUrl": "",
  "supabasePublishableKey": "",
  "supabaseAnonKey": "",
  "householdKey": ""
}
```

Regeln:

- `service_role` oder andere Secret-Keys gehoeren niemals in `public/runtime-config.json`.
- `householdKey` darf leer bleiben und wird lokal abgefragt.
- Keine RLS-/SQL-/Schema-Aenderung ohne ausdrueckliche Roadmap- oder Nutzerfreigabe.
- Kein Deploy-/Remote-Eingriff ohne Freigabe.

Falls Supabase CLI genutzt wird:

```powershell
supabase --version
```

## Browser / PWA

HESTIA ist eine statische PWA ohne Root-Build-Step.

Relevante Dateien:

- `index.html`
- `sw.js`
- `manifest.webmanifest`
- `offline.html`
- `public/runtime-config.json`
- `app/**/*.js`
- `app/styles/*.css`

Browser-/PWA-Smokes sind fuer HESTIA weiterhin wichtig, weil Layout, Service Worker, Offline-Fallback und Touch-Verhalten nicht vollstaendig durch Syntaxchecks abgedeckt werden.

## Lokale Env-Dateien

Moeglich:

```text
.env.supabase.local
```

Regeln:

- Keine Werte aus `.env.supabase.local` ausgeben.
- Keine `.env`-Datei committen.
- Keine Secrets in Roadmaps oder finalen Antworten dokumentieren.
- Variablennamen duerfen bei Bedarf ohne Werte geprueft werden.

## Typische Agent-Checklisten

### Vor Code-Aenderungen

```powershell
git status --short
```

- Dirty Worktree respektieren.
- Keine fremden Aenderungen revertieren.
- README, `PRODUCT.md` und betroffene Modul-Overview lesen.
- Roadmap-/Guardrail-Kontext pruefen.

### Nach Frontend-JS-Aenderungen

```powershell
node --check <datei.js>
git diff --check
```

Bei mehreren Dateien gezielt alle geaenderten JS-Dateien pruefen.

### Nach CSS-/HTML-Aenderungen

```powershell
git diff --check
```

Zusaetzlich nach Bedarf:

```powershell
rg -n "TODO|FIXME|justify-content: stretch" app/styles index.html
```

### Nach Sync-/Supabase-Aenderungen

```powershell
node --check app/supabase/list-sync.js
node --check app/supabase/client.js
git diff --check
```

Zusaetzlich:

- Kein Secret loggen.
- `public/runtime-config.json` nur mit public Keys / leerem Household-Key.
- Kein SQL/RLS/Schema-Drift ohne Freigabe.

### Nach Doku-/Roadmap-Aenderungen

```powershell
git diff --check
rg -n "TODO|BLOCKED|P0|P1" docs/<betroffene-datei>.md
```

### Browser-Smoke

Lokaler Start:

```powershell
python -m http.server 8765
```

Manuell im Browser:

```text
http://127.0.0.1:8765
```

Typische Smokes:

- Home startet.
- `Schreiben` funktioniert.
- Item kann frei eingetragen werden.
- Menge/Einheit bleiben optional und nutzbar.
- `Liste freigeben` wirkt plausibel.
- `Einkaufen`, Toggle und `Liste abschliessen` funktionieren.
- Mobile Layout ueberlappt nicht.
- Offline-Fallback ist ehrlich.

### Playwright-Smoke

Nur als Hilfswerkzeug verwenden, nicht automatisch ins Repo einbauen.

Beispiel-Setup fuer Node-Skripte:

```powershell
$env:NODE_PATH = npm.cmd root -g
```

Danach kann ein temporaeres Playwright-Skript gegen den lokalen Server laufen.

## Bekannte Eigenheiten

- VS Code muss nach PATH-Aenderungen komplett neu gestartet werden.
- `npm.ps1` kann in PowerShell durch Execution Policy blockiert sein; `npm.cmd` oder `cmd /c npm ...` verwenden.
- Playwright ist global installiert, aber `require('playwright')` braucht ggf. `NODE_PATH`.
- HESTIA hat keinen Build-Step und kein Root-`package.json`.
- Service Worker kann Browser-Smokes beeinflussen; bei reinen UI-Smokes bewusst beruecksichtigen.
- Historische Archivdokus koennen alte Pfade oder alte Produktentscheidungen enthalten; aktive Roadmaps und Module Overviews gelten vorrangig.

## Aktueller Stand

Diese Toolchain reicht fuer die normale HESTIA-Arbeit:

- Frontend-Syntaxchecks mit Node.
- Lokaler Static Server mit Python.
- Browser-/PWA-Smokes manuell oder mit globalem Playwright.
- Supabase-Listen-Sync-Checks auf JS-/Runtime-Config-Ebene.
- Git-/Diff-/Doku-Reviews mit lokalen Repo-Tools.

Damit kann ein neuer LLM-/Coding-Agent die meisten HESTIA-Aufgaben lokal pruefen, ohne HESTIA in ein groesseres Build-, Backend- oder Testframework zu verschieben.
