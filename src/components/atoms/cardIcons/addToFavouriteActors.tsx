import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BaseActorProps } from "@typings/interfaces";

/**
 * Icon button that adds an actor to the user's favourites, or takes them out
 * again. Filled means the actor is already a favourite.
 *
 * @param actor The actor to add or remove.
 * @returns JSX.Element
 */
const AddToFavouriteActorsIcon: React.FC<BaseActorProps> = (actor) => {
    const { favouriteActors, addToFavouriteActors, removeFromFavouriteActors } =
        useContext(MoviesContext);

    const isFavourite = favouriteActors.includes(actor.id);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFavourite) {
            removeFromFavouriteActors(actor.id);
            return;
        }
        addToFavouriteActors(actor.id);
    };

    return (
        <IconButton
            aria-label={
                isFavourite
                    ? "remove actor from favorites"
                    : "add actor to favorites"
            }
            color="inherit"
            onClick={onUserSelect}
        >
            {isFavourite ? (
                <FavoriteIcon color="inherit" fontSize="large" />
            ) : (
                <FavoriteBorderIcon color="inherit" fontSize="large" />
            )}
        </IconButton>
    );
};

export default AddToFavouriteActorsIcon;
