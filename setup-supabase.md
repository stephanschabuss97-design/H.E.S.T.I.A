# Supabase Setup Notes

## Create Project

1. Create Supabase project.
2. Run `sql/01_setup-supabase.sql`.
3. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to
   `public/runtime-config.json`.

## Seed First Household

```sql
insert into public.households (household_key, label)
values ('replace-with-long-random-key', 'Home');
```

## Frontend Runtime Config

HESTIA loads public runtime config from:

- `public/runtime-config.json`

Current shape:

```json
{
  "supabaseUrl": "https://YOUR_PROJECT.supabase.co",
  "supabasePublishableKey": "YOUR_PUBLISHABLE_KEY",
  "supabaseAnonKey": "",
  "householdKey": ""
}
```

Hinweis:

- `householdKey` muss in der committed und öffentlich ausgelieferten
  `public/runtime-config.json` leer bleiben. Der reale Key wird auf jedem
  Gerät beim ersten Sync-Zugriff lokal abgefragt und darf nicht ins Repo.
- `service_role` oder andere Secret-Keys gehoeren dort niemals hinein.

## Frontend Header Contract

Pass the household key as request header:

- `x-household-key: <household-key>`

This matches `public.current_household_id()` in RLS.

## Relevante Projektquellen und lokale Prüfgrenze

HESTIA nutzt Supabase optional für den Snapshot eines bekannten Haushalts,
keine individuelle Account-/Multi-Tenancy-Pflicht. Der Kern bleibt ohne
Runtime-Credentials lokal nutzbar. Relevante Quellen sind
`public/runtime-config.json`, die ignorierte `.env.supabase.local`, diese
Setupnotizen, `sql/01_setup-supabase.sql`, `sql/02_add-shopping-list-type.sql`,
`app/supabase/client.js`, `app/supabase/list-sync.js` und das
[Syncmodul](docs/modules/Supabase%20Sync%20Module%20Overview.md).
Configform/zulässige Felder besitzt das
[Runtimemodul](docs/modules/Runtime%20Config%20Module%20Overview.md).

SQL/RLS/Schema/Supabaseänderungen, sensible Remote-Reads/-Writes und sonstige
externe Wirkung sind gemäß [PRODUCT][local1]
owner-gated. Alle SQL-/Setupanweisungen dieser Datei benötigen vor Ausführung
die konkrete Freigabe. Migration von Betriebswissen ist keine Ausführung.
Keine Secretwerte in Logs, Screenshots, Terminaltranskripten, Roadmaps,
Evidence oder Antworten; keine `.env`-Datei committen. Namensprüfung ohne Werte
ist möglich, kein pauschaler Read lokaler Secretdateien.

Gemeinsamer technischer CLI-Aufruf `supabase --version` und seine Grenze:
[ATLAS][local2].
Docker oder lokaler Stack nur, wenn eine Roadmap disposable Datenbank-/RLS-
Nachweise verlangt; bewusst vor solchen Containerchecks starten, niemals einen
laufenden Daemon voraussetzen. Normale UI-/Sync-JavaScript-Arbeit benötigt
keinen lokalen Stack. Installation allein erzeugt keine
Dependency/Startfreigabe.

## Security-Watchlist vom 2026-08-28

Disposition: OFFEN, Owner Stephan. Datierter Sweepnachweis unverändert
übernommen; empfohlene Sicherheitsaktion nicht ausgeführt oder geschlossen.

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

[local1]: PRODUCT.md#verbindliche-betriebs--und-secretgrenzen
[local2]: ../codex-tools/apps/atlas/docs/WORKSTATION_CAPABILITIES.md#supabase-cli
