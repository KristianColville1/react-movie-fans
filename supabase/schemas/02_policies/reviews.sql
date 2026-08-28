-- the publishable key is public, so rls is what keeps users apart

alter table public.reviews enable row level security;

drop policy if exists reviews_select on public.reviews;
drop policy if exists reviews_insert on public.reviews;
drop policy if exists reviews_delete on public.reviews;

create policy reviews_select on public.reviews
    for select using (auth.uid() = user_id);

create policy reviews_insert on public.reviews
    for insert with check (auth.uid() = user_id);

create policy reviews_delete on public.reviews
    for delete using (auth.uid() = user_id);
