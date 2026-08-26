import React from "react";
import Header from "@molecules/headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "@organisms/movieList";
import { MovieListPageTemplateProps } from "@typings/interfaces";

/**
 * Page layout for any list of movies, pairing a header with the movie grid.
 *
 * @param movies The movies to list.
 * @param title The heading shown above the grid.
 * @param action Renders the icon button shown on each card.
 * @param page The page currently shown, when the list is paged.
 * @param totalPages The number of pages available, when the list is paged.
 * @param onPageChange Called with the newly selected page.
 * @returns JSX.Element
 */
const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({
    movies,
    title,
    action,
    page,
    totalPages,
    onPageChange,
}) => {
    return (
        <Grid container className="bg-jet-black p-4">
            <Grid item xs={12}>
                <Header
                    title={title}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </Grid>
            <Grid item container spacing={2}>
                <MovieList action={action} movies={movies}></MovieList>
            </Grid>
        </Grid>
    );
};
export default MovieListPageTemplate;
