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
 * Splits the stored value of a multi choice filter back into its parts. The
 * hook stores every filter value as a string, so a set of choices travels as
 * a comma separated list.
 *
 * @param value The stored filter value.
 * @returns The chosen entries, empty when nothing is chosen.
 */
export const splitChoices = (value: string): string[] => {
    return value ? value.split(",").filter(Boolean) : [];
};

/**
 * Matches a movie belonging to any of the chosen genres. No chosen genre
 * means every movie is kept.
 *
 * @param movie The movie being tested.
 * @param value A comma separated list of genre ids.
 * @returns True when the movie should be kept.
 */
export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
    const chosen = splitChoices(value)
        .map(Number)
        .filter((id) => id > 0);
    if (!chosen.length) {
        return true;
    }
    const genreIds = movie.genre_ids;
    return genreIds ? chosen.some((id) => genreIds.includes(id)) : false;
};

/**
 * Reads the release year off a movie.
 *
 * @param movie The movie being tested.
 * @returns The year, or 0 when the movie has no release date.
 */
const releaseYear = (movie: BaseMovieProps): number => {
    return movie.release_date ? Number(movie.release_date.slice(0, 4)) : 0;
};

/**
 * Matches a movie released in or after the given year. An empty value keeps
 * every movie.
 *
 * @param movie The movie being tested.
 * @param value The earliest year to keep, as text.
 * @returns True when the movie should be kept.
 */
export const yearFromFilter = (
    movie: BaseMovieProps,
    value: string,
): boolean => {
    const from = Number(value);
    if (!value || Number.isNaN(from)) {
        return true;
    }
    const year = releaseYear(movie);
    return year === 0 ? false : year >= from;
};

/**
 * Matches a movie released in or before the given year. An empty value keeps
 * every movie.
 *
 * @param movie The movie being tested.
 * @param value The latest year to keep, as text.
 * @returns True when the movie should be kept.
 */
export const yearToFilter = (
    movie: BaseMovieProps,
    value: string,
): boolean => {
    const to = Number(value);
    if (!value || Number.isNaN(to)) {
        return true;
    }
    const year = releaseYear(movie);
    return year === 0 ? false : year <= to;
};

/**
 * Matches a movie rated at or above the given score. An empty value keeps
 * every movie.
 *
 * @param movie The movie being tested.
 * @param value The lowest average score to keep, as text.
 * @returns True when the movie should be kept.
 */
export const ratingFilter = (
    movie: BaseMovieProps,
    value: string,
): boolean => {
    const minimum = Number(value);
    if (!value || Number.isNaN(minimum) || minimum <= 0) {
        return true;
    }
    return movie.vote_average >= minimum;
};
