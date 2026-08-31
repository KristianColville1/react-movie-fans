import { supabase } from "@storage/supabaseClient";
import { MyReview } from "@typings/interfaces";

const table = "reviews";

/**
 * Reads the reviews the signed in user has written. Row level security limits
 * the rows, so no filter by user is needed here.
 *
 * @returns The reviews, oldest first, empty when there are none or the read
 * fails.
 */
export const loadMyReviews = async (): Promise<MyReview[]> => {
    const { data, error } = await supabase
        .from(table)
        .select("id, movie_id, author, content, rating, agree")
        .order("created_at", { ascending: true });

    if (error || !data) {
        return [];
    }
    return data.map((row) => ({
        id: row.id as string,
        movieId: row.movie_id as number,
        author: row.author as string,
        content: row.content as string,
        rating: row.rating as number,
        agree: row.agree as boolean,
    }));
};

/**
 * Saves a review against the signed in user.
 *
 * @param review The review to store.
 * @returns The stored review with the id the database gave it, or undefined
 * when the write fails.
 */
export const addMyReview = async (
    review: MyReview,
): Promise<MyReview | undefined> => {
    const { data, error } = await supabase
        .from(table)
        .insert({
            movie_id: review.movieId,
            author: review.author,
            content: review.content,
            rating: review.rating,
            agree: review.agree,
        })
        .select("id")
        .single();

    if (error || !data) {
        return undefined;
    }
    return { ...review, id: data.id as string };
};

/**
 * Removes a review the user wrote.
 *
 * @param id The id of the review.
 */
export const removeMyReview = async (id: string): Promise<void> => {
    await supabase.from(table).delete().eq("id", id);
};
