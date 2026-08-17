import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseActorProps } from "@typings/interfaces";

/**
 * Icon button that adds an actor to the user's favourites.
 *
 * @param actor The actor to add.
 * @returns JSX.Element
 */
const AddToFavouriteActorsIcon: React.FC<BaseActorProps> = (actor) => {
    const context = useContext(MoviesContext);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToFavouriteActors(actor.id);
    };
    return (
        <IconButton
            aria-label="add actor to favorites"
            color="inherit"
            onClick={onUserSelect}
        >
            <FavoriteIcon color="inherit" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavouriteActorsIcon;
