-- same as favourites but keyed on the tmdb person id

create table if not exists public.favourite_actors (
    user_id    uuid        not null references auth.users on delete cascade default auth.uid(),
    actor_id   integer     not null,
    created_at timestamptz not null default now(),
    primary key (user_id, actor_id)
);
