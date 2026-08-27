-- a movie a user put on their watch list, one row per user per movie

create table if not exists public.must_watch (
    user_id    uuid        not null references auth.users on delete cascade default auth.uid(),
    movie_id   integer     not null,
    created_at timestamptz not null default now(),
    primary key (user_id, movie_id)
);
