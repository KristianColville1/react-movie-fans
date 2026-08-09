import { BaseMovieProps } from "@typings/interfaces";

/**
 * Matches a movie whose title contains the search text, ignoring case.
 *
 * @param movie The movie being tested.
 * @param value The title search text.
 * @returns True when the movie should be kept.
 */
export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

/**
 * Matches a movie belonging to the given genre. A genre id of 0 stands for
 * all genres, so every movie is kept.
 *
 * @param movie The movie being tested.
 * @param value The id of the selected genre.
 * @returns True when the movie should be kept.
 */
export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};
