-- the publishable key is public, so rls is what keeps users apart

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
