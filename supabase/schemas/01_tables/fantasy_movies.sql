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
