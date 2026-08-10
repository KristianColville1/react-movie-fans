import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "@contexts/moviesContext";
import { BaseMovieProps } from "@typings/interfaces";

/**
 * Icon button that removes a movie from the user's favourites.
 *
 * @param movie The movie to remove.
 * @returns JSX.Element
 */
const RemoveFromFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
    const context = useContext(MoviesContext);

    const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromFavourites(movie);
    };

    return (
        <IconButton aria-label="remove from favorites" color="inherit" onClick={onUserRequest}>
            <DeleteIcon color="inherit" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavouritesIcon;
