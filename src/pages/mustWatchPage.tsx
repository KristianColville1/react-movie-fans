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
import AddToPlaylist from "@atoms/cardIcons/addToPlaylist";
import AddToFavourites from "@atoms/cardIcons/addToFavourites";

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

const MustWatchPage: React.FC = () => {
    const { mustWatch: movieIds } = useContext(MoviesContext);
    const { getFilterValue, setFilterValue, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
        yearFromFiltering,
        yearToFiltering,
        ratingFiltering,
    ]);
    const [sortOption, setSortOption] = useState("title");

    const mustWatchQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", movieId],
                queryFn: () => getMovie(movieId.toString()),
            };
        }),
    );

    const isLoading = mustWatchQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const allMustWatch = mustWatchQueries.map((q) => q.data);
    const displayedMovies = allMustWatch
        ? sortMovies(filterFunction(allMustWatch), sortOption)
        : [];

    return (
        <>
            <PageTemplate
                title="Your Watch List"
                movies={displayedMovies}
                action={(movie) => {
                    return (
                        <>
                            <AddToPlaylist {...movie} />
                            <AddToFavourites {...movie} />
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

export default MustWatchPage;
