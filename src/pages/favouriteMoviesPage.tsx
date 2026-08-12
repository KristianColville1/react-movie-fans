import React, { useContext, useState } from "react";
import PageTemplate from "@templates/movieListPage";
import { MoviesContext } from "@contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "@api/tmdb-api";
import Spinner from "@atoms/spinner";
import useFiltering from "@hooks/useFiltering";
import MovieFilterUI from "@organisms/movieFilterUI";
import { titleFilter, genreFilter } from "@organisms/movieFilterUI/filters";
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
    value: "0",
    condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
    const { favourites: movieIds } = useContext(MoviesContext);
    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
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

    const changeFilterValues = (type: string, value: string) => {
        setFilterValues(
            filterValues.map((filter) =>
                filter.name === type ? { ...filter, value } : filter,
            ),
        );
    };


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
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
                sortOption={sortOption}
                onSortChange={setSortOption}
            />
        </>
    );
};

export default FavouriteMoviesPage;
