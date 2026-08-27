import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import { useToast } from "@contexts/toastContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BaseMovieProps } from "@typings/interfaces";

/**
 * Icon button that adds a movie to the user's favourites, or takes it out
 * again. Filled means the movie is already a favourite.
 *
 * @param movie The movie to add or remove.
 * @returns JSX.Element
 */
const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
    const { favourites, addToFavourites, removeFromFavourites } =
        useContext(MoviesContext);
    const { triggerToast } = useToast();

    const isFavourite = favourites.includes(movie.id);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFavourite) {
            removeFromFavourites(movie);
            triggerToast(
                "info",
                "Favourites",
                `${movie.title} removed from your favourites`,
            );
            return;
        }
        addToFavourites(movie);
        triggerToast(
            "success",
            "Favourites",
            `${movie.title} added to your favourites`,
        );
    };

    return (
        <IconButton
            aria-label={
                isFavourite ? "remove from favorites" : "add to favorites"
            }
            color="inherit"
            className={isFavourite ? undefined : "text-white/25"}
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

export default AddToFavouritesIcon;
