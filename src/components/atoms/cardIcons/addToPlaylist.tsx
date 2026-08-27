import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import { useToast } from "@contexts/toastContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import IconButton from "@mui/material/IconButton";
import { BaseMovieProps } from "@typings/interfaces";

/**
 * Icon button that puts a movie on the user's watch list, or takes it off
 * again. A ticked list means it is already on there.
 *
 * @param movie The movie to add or remove.
 * @returns JSX.Element
 */
const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
    const { mustWatch, addToMustWatch, removeFromMustWatch } =
        useContext(MoviesContext);
    const { triggerToast } = useToast();

    const isOnList = mustWatch.includes(movie.id);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isOnList) {
            removeFromMustWatch(movie);
            triggerToast(
                "info",
                "Watch list",
                `${movie.title} taken off your watch list`,
            );
            return;
        }
        addToMustWatch(movie);
        triggerToast(
            "success",
            "Watch list",
            `${movie.title} added to your watch list`,
        );
    };

    return (
        <IconButton
            aria-label={isOnList ? "remove from playlist" : "add to playlist"}
            color="inherit"
            className={isOnList ? "text-ocean-mist" : "text-white/25"}
            onClick={onUserSelect}
        >
            {isOnList ? (
                <PlaylistAddCheckIcon color="inherit" fontSize="large" />
            ) : (
                <PlaylistAddIcon color="inherit" fontSize="large" />
            )}
        </IconButton>
    );
};

export default AddToPlaylistIcon;
