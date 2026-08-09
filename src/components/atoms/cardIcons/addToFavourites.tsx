import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "@typings/interfaces";

/**
 * Icon button that adds a movie to the user's favourites.
 *
 * @param movie The movie to add.
 * @returns JSX.Element
 */
const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
    const context = useContext(MoviesContext);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToFavourites(movie);
    };
    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavouritesIcon;
