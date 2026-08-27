import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "@contexts/moviesContext";
import { useToast } from "@contexts/toastContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { BaseMovieProps } from "@typings/interfaces";


/**
 * Icon button that adds a movie to the user's must watch playlist.
 *
 * @param movie The movie to add.
 * @returns JSX.Element
 */
const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
    const context = useContext(MoviesContext);
    const { triggerToast } = useToast();

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToMustWatch(movie);
        triggerToast(
            "success",
            "Must watch",
            `${movie.title} added to your must watch list`,
        );
    };
    return (
        <IconButton aria-label="add to playlist" color="inherit" onClick={onUserSelect}>
            <PlaylistAddIcon color="inherit" fontSize="large" />
        </IconButton>
    );
};

export default AddToPlaylistIcon;
