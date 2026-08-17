-- generated from supabase/schemas, do not edit
-- change the schema files and run npm run db:diff

-- the six fields the brief limits a basic fantasy movie to, plus the owner

create table if not exists public.fantasy_movies (
    id                   uuid        primary key default gen_random_uuid(),
    user_id              uuid        not null references auth.users on delete cascade default auth.uid(),
    title                text        not null,
    overview             text        not null default '',
    genre_ids            integer[]   not null default '{}',
    release_date         date,
    runtime              integer     not null default 0,
    production_companies text        not null default '',
    created_at           timestamptz not null default now()
);

-- same as favourites but keyed on the tmdb person id

create table if not exists public.favourite_actors (
    user_id    uuid        not null references auth.users on delete cascade default auth.uid(),
    actor_id   integer     not null,
    created_at timestamptz not null default now(),
    primary key (user_id, actor_id)
);

-- a movie a user starred, one row per user per movie

create table if not exists public.favourites (
    user_id    uuid        not null references auth.users on delete cascade default auth.uid(),
    movie_id   integer     not null,
    created_at timestamptz not null default now(),
    primary key (user_id, movie_id)
);

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
