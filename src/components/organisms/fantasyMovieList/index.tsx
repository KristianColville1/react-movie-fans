import React from "react";
import FantasyMovieCard from "@molecules/fantasyMovieCard";
import Grid from "@mui/material/Grid";
import { FantasyMovie } from "@typings/interfaces";

/**
 * Grid of fantasy movie cards.
 *
 * @param movies The fantasy movies to show.
 * @param onDelete Called with the movie id when one is deleted.
 * @returns JSX.Element
 */
const FantasyMovieList: React.FC<{
    movies: FantasyMovie[];
    onDelete: (id: string) => void;
}> = ({ movies, onDelete }) => {
    const movieCards = movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4}>
            <FantasyMovieCard movie={m} onDelete={onDelete} />
        </Grid>
    ));
    return movieCards;
};

export default FantasyMovieList;
