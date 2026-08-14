import React, { useContext, useState } from "react";
import PageTemplate from "@templates/movieListPage";
import { MoviesContext } from "@contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "@api/tmdb-api";
import Spinner from "@atoms/spinner";
import useFiltering from "@hooks/useFiltering";
import MovieFilterUI from "@organisms/movieFilterUI";
import {
    titleFilter,
    genreFilter,
    yearFromFilter,
    yearToFilter,
    ratingFilter,
} from "@organisms/movieFilterUI/filters";
import { sortMovies } from "@organisms/movieFilterUI/sorting";
import RemoveFromFavourites from "@atoms/cardIcons/removeFromFavourites";
import WriteReview from "@atoms/cardIcons/writeReview";


const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};
const genreFiltering = {
    name: "genre",
    value: "",
    condition: genreFilter,
};
const yearFromFiltering = {
    name: "yearFrom",
    value: "",
    condition: yearFromFilter,
};
const yearToFiltering = {
    name: "yearTo",
    value: "",
    condition: yearToFilter,
};
const ratingFiltering = {
    name: "rating",
    value: "",
    condition: ratingFilter,
};

const FavouriteMoviesPage: React.FC = () => {
    const { favourites: movieIds } = useContext(MoviesContext);
    const { getFilterValue, setFilterValue, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
        yearFromFiltering,
        yearToFiltering,
        ratingFiltering,
    ]);
    const [sortOption, setSortOption] = useState("title");

    // Create an array of queries and run them in parallel.
    const favouriteMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", movieId],
                queryFn: () => getMovie(movieId.toString()),
            };
        }),
    );

    // Check if any of the parallel queries is still loading.
    const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const allFavourites = favouriteMovieQueries.map((q) => q.data);
    const displayedMovies = allFavourites
        ? sortMovies(filterFunction(allFavourites), sortOption)
        : [];

    return (
        <>
            <PageTemplate
                title="Favourite Movies"
                movies={displayedMovies}
                action={(movie) => {
                    return (
                        <>
                            <RemoveFromFavourites {...movie} />
                            <WriteReview {...movie} />
                        </>
                    );
                }}
            />

            <MovieFilterUI
                onFilterValuesChange={setFilterValue}
                titleFilter={getFilterValue("title")}
                genreFilter={getFilterValue("genre")}
                yearFromFilter={getFilterValue("yearFrom")}
                yearToFilter={getFilterValue("yearTo")}
                ratingFilter={getFilterValue("rating")}
                sortOption={sortOption}
                onSortChange={setSortOption}
            />
        </>
    );
};

export default FavouriteMoviesPage;
