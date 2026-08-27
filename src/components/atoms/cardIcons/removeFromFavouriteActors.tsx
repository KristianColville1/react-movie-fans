import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import { useToast } from "@contexts/toastContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BaseActorProps } from "@typings/interfaces";

/**
 * Icon button that takes an actor back out of the user's favourites.
 *
 * @param actor The actor to remove.
 * @returns JSX.Element
 */
const RemoveFromFavouriteActorsIcon: React.FC<BaseActorProps> = (actor) => {
    const context = useContext(MoviesContext);
    const { triggerToast } = useToast();

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromFavouriteActors(actor.id);
        triggerToast(
            "info",
            "Favourite actors",
            `${actor.name} removed from your favourites`,
        );
    };
    return (
        <IconButton
            aria-label="remove actor from favorites"
            color="inherit"
            onClick={onUserSelect}
        >
            <DeleteIcon color="inherit" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavouriteActorsIcon;
