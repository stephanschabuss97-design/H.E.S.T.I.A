# Supabase Setup Notes

## Create Project

1. Create Supabase project.
2. Run `sql/001_init.sql`.
3. Run `sql/002_rls.sql`.

## Seed First Household

```sql
insert into public.households (household_key, label)
values ('replace-with-long-random-key', 'Home');
```

## Frontend Header Contract

Pass the household key as request header:

- `x-household-key: <household-key>`

This matches `public.current_household_id()` in RLS.
