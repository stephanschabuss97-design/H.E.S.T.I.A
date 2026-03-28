-- ============================================
-- 01_setup-supabase.sql  (v1.0.1)
-- PostgreSQL 15 | Supabase-kompatibel
-- Ziel: HESTIA Basis-Setup fuer Household-Listen, RLS und Realtime
-- Hinweis: idempotent, sicher mehrfach ausfuehrbar
-- ============================================

begin;

-- (A) Extensions
create extension if not exists pgcrypto;

-- (B) Tabellen
create table if not exists public.households (
  id uuid primary key default gen_random_uuid(),
  household_key text unique not null,
  label text not null default 'Default Household',
  created_at timestamptz not null default now()
);

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null,
  quantity numeric(10,2) not null default 1,
  unit text not null default 'Stk',
  in_cart boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- (C) Indizes
create index if not exists shopping_items_household_idx
  on public.shopping_items (household_id);

create index if not exists shopping_items_open_idx
  on public.shopping_items (household_id, in_cart);

-- (D) Helper-Funktion fuer updated_at
create or replace function public.set_current_timestamp_updated_at()
returns trigger
set search_path = pg_catalog, public
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_shopping_items_set_updated_at on public.shopping_items;
create trigger trg_shopping_items_set_updated_at
  before update on public.shopping_items
  for each row execute function public.set_current_timestamp_updated_at();

-- (E) Household-Kontext aus Request-Header
-- Erwarteter Header zur Laufzeit: x-household-key
create or replace function public.current_household_id()
returns uuid
set search_path = pg_catalog, public
language sql
stable
as $$
  select h.id
  from public.households h
  where h.household_key = current_setting('request.headers', true)::json->>'x-household-key'
  limit 1;
$$;

-- (F) RLS
alter table public.households enable row level security;
alter table public.shopping_items enable row level security;

drop policy if exists "households select by key" on public.households;
create policy "households select by key"
  on public.households
  for select
  using (
    household_key = current_setting('request.headers', true)::json->>'x-household-key'
  );

drop policy if exists "items household read" on public.shopping_items;
create policy "items household read"
  on public.shopping_items
  for select
  using (household_id = public.current_household_id());

drop policy if exists "items household insert" on public.shopping_items;
create policy "items household insert"
  on public.shopping_items
  for insert
  with check (household_id = public.current_household_id());

drop policy if exists "items household update" on public.shopping_items;
create policy "items household update"
  on public.shopping_items
  for update
  using (household_id = public.current_household_id())
  with check (household_id = public.current_household_id());

drop policy if exists "items household delete" on public.shopping_items;
create policy "items household delete"
  on public.shopping_items
  for delete
  using (household_id = public.current_household_id());

-- (G) Realtime-Publication idempotent bestuecken
do $$
begin
  perform 1 from pg_publication where pubname = 'supabase_realtime';
  if not found then
    execute 'create publication supabase_realtime';
  end if;

  begin
    execute 'alter publication supabase_realtime add table public.shopping_items';
  exception when others then
    null;
  end;
end;
$$;

-- (H) Doku-Kommentare
comment on table public.households is 'Bekannter Haushalt fuer HESTIA mit gemeinsamem household_key.';
comment on table public.shopping_items is 'Aktuelle gemeinsame Einkaufsliste eines Haushalts. Kein Langzeitarchiv.';
comment on function public.current_household_id() is 'Leitet den Household-Kontext aus dem Request-Header x-household-key ab.';

commit;
