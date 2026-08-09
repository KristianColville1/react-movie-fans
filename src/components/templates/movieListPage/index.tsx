import React from "react";
import Header from "@molecules/headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "@organisms/movieList";
import { MovieListPageTemplateProps } from "@typings/interfaces";

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
};

/**
 * Page layout for any list of movies, pairing a header with the movie grid.
 *
 * @param movies The movies to list.
 * @param title The heading shown above the grid.
 * @param action Renders the icon button shown on each card.
 * @returns JSX.Element
 */
const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({
    movies,
    title,
    action,
}) => {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                <MovieList action={action} movies={movies}></MovieList>
            </Grid>
        </Grid>
    );
};
export default MovieListPageTemplate;
