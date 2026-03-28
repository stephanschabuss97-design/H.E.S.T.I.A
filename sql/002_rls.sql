-- HESTIA V1 RLS skeleton using a household key in request headers.
-- Expected header at runtime: x-household-key
-- In Supabase client, pass it via global headers.

alter table public.households enable row level security;
alter table public.shopping_items enable row level security;

create or replace function public.current_household_id()
returns uuid
language sql
stable
as $$
  select h.id
  from public.households h
  where h.household_key = current_setting('request.headers', true)::json->>'x-household-key'
  limit 1;
$$;

drop policy if exists "households select by key" on public.households;
create policy "households select by key"
on public.households
for select
using (id = public.current_household_id());

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
