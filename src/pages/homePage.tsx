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
    const { getFilterValue, setFilterValue, filterFunction } = useFiltering([
        titleFiltering,
        genreFiltering,
        yearFromFiltering,
        yearToFiltering,
        ratingFiltering,
    ]);
    // tmdb orders by popularity when asked for nothing, and that is what the
    // page used to show, so it stays the default now the sort is a real query
    const [sortOption, setSortOption] = useState("popularity");

    const title = getFilterValue("title");
    const filters = {
        title,
        genre: getFilterValue("genre"),
        yearFrom: getFilterValue("yearFrom"),
        yearTo: getFilterValue("yearTo"),
        rating: getFilterValue("rating"),
        sort: sortOption,
    };

    // keepPreviousData holds the previous page on screen while the next one
    // loads, so the grid does not blank out between pages. the criteria are
    // part of the key, so changing one fetches a new list rather than
    // narrowing the page already on screen.
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["discover", page, filters],
        () => getMovies(page, filters),
        { keepPreviousData: true },
    );

    // a new set of criteria is a new list, so page 40 of the old one means
    // nothing
    const changeFilter = (name: string, value: string) => {
        setPage(1);
        setFilterValue(name, value);
    };

    const changeSort = (value: string) => {
        setPage(1);
        setSortOption(value);
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const movies = data ? data.results : [];
    // searching by title is the one case tmdb cannot narrow for us, so the
    // rest of the criteria are applied to the page it returns
    const displayedMovies = title
        ? sortMovies(filterFunction(movies), sortOption)
        : movies;

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
                 onFilterValuesChange={changeFilter}
                 titleFilter={getFilterValue("title")}
                 genreFilter={getFilterValue("genre")}
                yearFromFilter={getFilterValue("yearFrom")}
                yearToFilter={getFilterValue("yearTo")}
                ratingFilter={getFilterValue("rating")}
                 sortOption={sortOption}
                 onSortChange={changeSort}
             />
         </>
     );
};
export default HomePage;
