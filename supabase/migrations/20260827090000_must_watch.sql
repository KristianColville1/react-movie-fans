-- the watch list, same shape as favourites but its own table so the two
-- lists stay independent

create table if not exists public.must_watch (
    user_id    uuid        not null references auth.users on delete cascade default auth.uid(),
    movie_id   integer     not null,
    created_at timestamptz not null default now(),
    primary key (user_id, movie_id)
);

alter table public.must_watch enable row level security;

drop policy if exists must_watch_select on public.must_watch;
drop policy if exists must_watch_insert on public.must_watch;
drop policy if exists must_watch_delete on public.must_watch;

create policy must_watch_select on public.must_watch
    for select using (auth.uid() = user_id);

create policy must_watch_insert on public.must_watch
    for insert with check (auth.uid() = user_id);

create policy must_watch_delete on public.must_watch
    for delete using (auth.uid() = user_id);
