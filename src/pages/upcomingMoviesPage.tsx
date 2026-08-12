import React, { useState } from "react";
import PageTemplate from "@templates/movieListPage";
import { getUpcomingMovies } from "@api/tmdb-api";
import useFiltering from "@hooks/useFiltering";
import MovieFilterUI from "@organisms/movieFilterUI";
import { titleFilter, genreFilter } from "@organisms/movieFilterUI/filters";
import { sortMovies } from "@organisms/movieFilterUI/sorting";
import { BaseMovieProps, DiscoverMovies } from "@typings/interfaces";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import AddToPlaylistIcon from "@atoms/cardIcons/addToPlaylist";

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

const UpcomingMoviesPage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        "upcoming",
        getUpcomingMovies,
    );
    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
    ]);
    const [sortOption, setSortOption] = useState("title");

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const changeFilterValues = (type: string, value: string) => {
        setFilterValues(
            filterValues.map((filter) =>
                filter.name === type ? { ...filter, value } : filter,
            ),
        );
    };

    const movies = data ? data.results : [];
    const displayedMovies = sortMovies(filterFunction(movies), sortOption);

    return (
        <>
            <PageTemplate
                title="Upcoming Movies"
                movies={displayedMovies}
                action={(movie: BaseMovieProps) => {
                    return <AddToPlaylistIcon {...movie} />;
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
export default UpcomingMoviesPage;
