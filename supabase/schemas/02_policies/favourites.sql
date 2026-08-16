-- the publishable key is public, so rls is what keeps users apart

alter table public.favourites enable row level security;

drop policy if exists favourites_select on public.favourites;
drop policy if exists favourites_insert on public.favourites;
drop policy if exists favourites_delete on public.favourites;

create policy favourites_select on public.favourites
    for select using (auth.uid() = user_id);

create policy favourites_insert on public.favourites
    for insert with check (auth.uid() = user_id);

create policy favourites_delete on public.favourites
    for delete using (auth.uid() = user_id);
