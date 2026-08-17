-- the publishable key is public, so rls is what keeps users apart

alter table public.favourite_actors enable row level security;

drop policy if exists favourite_actors_select on public.favourite_actors;
drop policy if exists favourite_actors_insert on public.favourite_actors;
drop policy if exists favourite_actors_delete on public.favourite_actors;

create policy favourite_actors_select on public.favourite_actors
    for select using (auth.uid() = user_id);

create policy favourite_actors_insert on public.favourite_actors
    for insert with check (auth.uid() = user_id);

create policy favourite_actors_delete on public.favourite_actors
    for delete using (auth.uid() = user_id);
