import { BaseMovieProps } from "@typings/interfaces";

// Sorting is kept out of useFiltering on purpose. That hook narrows a list
// with a predicate per filter, and an ordering has no predicate to give it.
export const sortOptions = [
    { value: "title", label: "Title A-Z" },
    { value: "release_date", label: "Release date, newest" },
    { value: "vote_average", label: "Rating, highest" },
    { value: "popularity", label: "Popularity, highest" },
];

/**
 * Orders a list of movies by one of the criteria in sortOptions. The input
 * array is not modified.
 *
 * @param movies The movies to order.
 * @param sortOption The value of the chosen sort option.
 * @returns A new array in the chosen order.
 */
export const sortMovies = (
    movies: BaseMovieProps[],
    sortOption: string,
): BaseMovieProps[] => {
    const sorted = [...movies];

    switch (sortOption) {
        case "title":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case "release_date":
            return sorted.sort((a, b) =>
                (b.release_date || "").localeCompare(a.release_date || ""),
            );
        case "vote_average":
            return sorted.sort((a, b) => b.vote_average - a.vote_average);
        case "popularity":
            return sorted.sort((a, b) => b.popularity - a.popularity);
        default:
            return sorted;
    }
};
