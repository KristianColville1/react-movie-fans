import { FantasyMovie } from "@typings/interfaces";
import { supabase } from "@storage/supabaseClient";

const table = "fantasy_movies";

// The database is snake case and the app is camel case. The mapping lives
// here and nowhere else, so no component has to know either shape.
interface FantasyMovieRow {
    id: string;
    title: string;
    overview: string;
    genre_ids: number[];
    release_date: string | null;
    runtime: number;
    production_companies: string;
}

const toFantasyMovie = (row: FantasyMovieRow): FantasyMovie => ({
    id: row.id,
    title: row.title,
    overview: row.overview,
    genreIds: row.genre_ids ?? [],
    releaseDate: row.release_date ?? "",
    runtime: row.runtime,
    productionCompanies: row.production_companies,
});

/**
 * Reads the signed in user's fantasy movies, oldest first. Row level security
 * limits the rows, so no filter by user is needed here.
 *
 * @returns The stored movies, or an empty list when there are none or the
 * read fails.
 */
export const loadFantasyMovies = async (): Promise<FantasyMovie[]> => {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: true });

    if (error || !data) {
        return [];
    }
    return (data as FantasyMovieRow[]).map(toFantasyMovie);
};

/**
 * Stores one new fantasy movie against the signed in user. The id and the
 * owner are both filled in by the database.
 *
 * @param movie The details collected by the form.
 * @returns The stored movie, or null when the write fails.
 */
export const insertFantasyMovie = async (
    movie: Omit<FantasyMovie, "id">,
): Promise<FantasyMovie | null> => {
    const { data, error } = await supabase
        .from(table)
        .insert({
            title: movie.title,
            overview: movie.overview,
            genre_ids: movie.genreIds,
            release_date: movie.releaseDate || null,
            runtime: movie.runtime,
            production_companies: movie.productionCompanies,
        })
        .select()
        .single();

    if (error || !data) {
        return null;
    }
    return toFantasyMovie(data as FantasyMovieRow);
};

/**
 * Removes one fantasy movie. Row level security means a user can only ever
 * delete their own.
 *
 * @param id The id of the movie to remove.
 */
export const deleteFantasyMovie = async (id: string): Promise<void> => {
    await supabase.from(table).delete().eq("id", id);
};
