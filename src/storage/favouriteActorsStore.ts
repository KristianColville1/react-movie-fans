import { supabase } from "@storage/supabaseClient";

const table = "favourite_actors";

/**
 * Reads the signed in user's favourite actor ids. Row level security limits
 * the rows, so no filter by user is needed here.
 *
 * @returns The favourited actor ids, empty when there are none or the read
 * fails.
 */
export const loadFavouriteActors = async (): Promise<number[]> => {
    const { data, error } = await supabase
        .from(table)
        .select("actor_id")
        .order("created_at", { ascending: true });

    if (error || !data) {
        return [];
    }
    return data.map((row) => row.actor_id as number);
};

/**
 * Marks an actor as a favourite. Adding one that is already there is ignored
 * rather than treated as an error, because the pair is the primary key.
 *
 * @param actorId The TMDB id of the actor.
 */
export const addFavouriteActor = async (actorId: number): Promise<void> => {
    await supabase.from(table).upsert({ actor_id: actorId });
};

/**
 * Removes an actor from the favourites.
 *
 * @param actorId The TMDB id of the actor.
 */
export const removeFavouriteActor = async (actorId: number): Promise<void> => {
    await supabase.from(table).delete().eq("actor_id", actorId);
};
