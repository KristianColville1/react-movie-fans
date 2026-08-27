import { supabase } from "@storage/supabaseClient";

const table = "must_watch";

/**
 * Reads the signed in user's watch list. Row level security limits the rows,
 * so no filter by user is needed here.
 *
 * @returns The movie ids on the list, empty when there are none or the read
 * fails.
 */
export const loadMustWatch = async (): Promise<number[]> => {
    const { data, error } = await supabase
        .from(table)
        .select("movie_id")
        .order("created_at", { ascending: true });

    if (error || !data) {
        return [];
    }
    return data.map((row) => row.movie_id as number);
};

/**
 * Puts a movie on the watch list. Adding one that is already there is ignored
 * rather than treated as an error, because the pair is the primary key.
 *
 * @param movieId The TMDB id of the movie.
 */
export const addMustWatch = async (movieId: number): Promise<void> => {
    await supabase.from(table).upsert({ movie_id: movieId });
};

/**
 * Takes a movie back off the watch list.
 *
 * @param movieId The TMDB id of the movie.
 */
export const removeMustWatch = async (movieId: number): Promise<void> => {
    await supabase.from(table).delete().eq("movie_id", movieId);
};
