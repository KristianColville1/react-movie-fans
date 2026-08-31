-- a review a user wrote for a movie, kept apart from the tmdb reviews

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
