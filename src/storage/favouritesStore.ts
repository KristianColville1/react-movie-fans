import { supabase } from "@storage/supabaseClient";

const table = "favourites";

/**
 * Reads the signed in user's favourite movie ids. Row level security limits
 * the rows, so no filter by user is needed here.
 *
 * @returns The favourited movie ids, empty when there are none or the read
 * fails.
 */
export const loadFavourites = async (): Promise<number[]> => {
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
 * Marks a movie as a favourite. Adding one that is already there is ignored
 * rather than treated as an error, because the pair is the primary key.
 *
 * @param movieId The TMDB id of the movie.
 */
export const addFavourite = async (movieId: number): Promise<void> => {
    await supabase.from(table).upsert({ movie_id: movieId });
};

/**
 * Removes a movie from the favourites.
 *
 * @param movieId The TMDB id of the movie.
 */
export const removeFavourite = async (movieId: number): Promise<void> => {
    await supabase.from(table).delete().eq("movie_id", movieId);
};
