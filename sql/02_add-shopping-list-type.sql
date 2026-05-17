-- ============================================
-- 02_add-shopping-list-type.sql
-- PostgreSQL 15 | Supabase-kompatibel
-- Ziel: bestehende HESTIA shopping_items um grocery/amazon Listentyp erweitern
-- Hinweis: idempotent, sicher mehrfach ausfuehrbar
-- ============================================

begin;

alter table public.shopping_items
  add column if not exists list_type text default 'grocery';

update public.shopping_items
set list_type = 'grocery'
where list_type is null
   or list_type not in ('grocery', 'amazon');

alter table public.shopping_items
  alter column list_type set default 'grocery';

alter table public.shopping_items
  alter column list_type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'shopping_items_list_type_check'
      and conrelid = 'public.shopping_items'::regclass
  ) then
    alter table public.shopping_items
      add constraint shopping_items_list_type_check
      check (list_type in ('grocery', 'amazon'));
  end if;
end;
$$;

create index if not exists shopping_items_household_type_idx
  on public.shopping_items (household_id, list_type, in_cart);

comment on column public.shopping_items.list_type is
  'HESTIA list channel: grocery for normal Einkauf, amazon for Amazon-Merkliste.';

commit;
