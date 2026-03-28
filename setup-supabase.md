# Supabase Setup Notes

## Create Project

1. Create Supabase project.
2. Run `sql/01_setup-supabase.sql`.
3. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` to `public/runtime-config.json`.

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
- `householdKey` kann leer bleiben und wird auf jedem Geraet beim ersten Sync-Zugriff lokal abgefragt.
- `service_role` oder andere Secret-Keys gehoeren dort niemals hinein.

## Frontend Header Contract

Pass the household key as request header:

- `x-household-key: <household-key>`

This matches `public.current_household_id()` in RLS.
