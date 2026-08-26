import React, { useState } from "react";
import PageTemplate from "@templates/movieListPage";
import { getMovies } from "@api/tmdb-api";
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
import { BaseMovieProps, DiscoverMovies } from "@typings/interfaces";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import AddToFavouritesIcon from "@atoms/cardIcons/addToFavourites";
import Pagination from "@molecules/pagination";

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

const HomePage: React.FC = () => {
    const [page, setPage] = useState(1);
    // keepPreviousData holds the previous page on screen while the next one
    // loads, so the grid does not blank out between pages.
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["discover", page],
        () => getMovies(page),
        { keepPreviousData: true },
    );
    const { getFilterValue, setFilterValue, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
        yearFromFiltering,
        yearToFiltering,
        ratingFiltering,
    ]);
    const [sortOption, setSortOption] = useState("title");

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const movies = data ? data.results : [];
    const displayedMovies = sortMovies(filterFunction(movies), sortOption);

     return (
         <>
             <PageTemplate
                 title="Discover Movies"
                 page={page}
                 totalPages={data ? data.total_pages : 1}
                 onPageChange={setPage}
                 movies={displayedMovies}
                 action={(movie: BaseMovieProps) => {
                     return <AddToFavouritesIcon {...movie} />;
                 }}
             />
             <Pagination
                 page={page}
                 totalPages={data ? data.total_pages : 1}
                 onChange={setPage}
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
export default HomePage;
