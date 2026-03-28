-- HESTIA V1 database skeleton
-- Execute in Supabase SQL editor after project creation.

create extension if not exists pgcrypto;

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

create index if not exists shopping_items_household_idx
  on public.shopping_items(household_id);

create index if not exists shopping_items_open_idx
  on public.shopping_items(household_id, in_cart);
