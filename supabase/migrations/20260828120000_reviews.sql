-- reviews a user wrote, kept apart from the tmdb reviews so the two can sit
-- in the same table on the movie page without being confused for each other

create table if not exists public.reviews (
    id         uuid        primary key default gen_random_uuid(),
    user_id    uuid        not null references auth.users on delete cascade default auth.uid(),
    movie_id   integer     not null,
    author     text        not null,
    content    text        not null,
    rating     integer     not null default 3,
    agree      boolean     not null default false,
    created_at timestamptz not null default now()
);

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
