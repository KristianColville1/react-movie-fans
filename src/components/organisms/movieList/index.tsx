import React from "react";
import Movie from "@molecules/movieCard";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "@typings/interfaces";

/**
 * Grid of movie cards.
 *
 * @param movies The movies to show.
 * @param action Renders the icon button shown on each card.
 * @returns JSX.Element
 */
const MovieList: React.FC<BaseMovieListProps> = ({ movies, action }) => {
    const siblingIds = movies.map((m) => m.id);
    const movieCards = movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <Movie
                key={m.id}
                movie={m}
                action={action}
                siblingIds={siblingIds}
            />
        </Grid>
    ));
    return movieCards;
};

export default MovieList;
