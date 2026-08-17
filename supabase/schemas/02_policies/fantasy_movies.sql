-- the publishable key is public, so rls is what keeps users apart
-- this one gets an update policy, the others are add and remove only

alter table public.fantasy_movies enable row level security;

drop policy if exists fantasy_movies_select on public.fantasy_movies;
drop policy if exists fantasy_movies_insert on public.fantasy_movies;
drop policy if exists fantasy_movies_update on public.fantasy_movies;
drop policy if exists fantasy_movies_delete on public.fantasy_movies;

create policy fantasy_movies_select on public.fantasy_movies
    for select using (auth.uid() = user_id);

create policy fantasy_movies_insert on public.fantasy_movies
    for insert with check (auth.uid() = user_id);

create policy fantasy_movies_update on public.fantasy_movies
    for update using (auth.uid() = user_id);

create policy fantasy_movies_delete on public.fantasy_movies
    for delete using (auth.uid() = user_id);
