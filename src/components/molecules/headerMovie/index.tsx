import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps } from "@typings/interfaces";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
/**
 * Header shown at the top of a movie details page. The arrows walk the list
 * the visitor arrived from, and are left out when there is no list, which is
 * what a bookmarked link gives you.
 *
 * @param movie The movie whose title, tagline and homepage are shown.
 * @param onPrevious Opens the movie before this one in that list.
 * @param onNext Opens the movie after this one in that list.
 * @returns JSX.Element
 */
const MovieHeader: React.FC<
    MovieDetailsProps & {
        onPrevious?: () => void;
        onNext?: () => void;
    }
> = ({ onPrevious, onNext, ...movie }) => {
    // get the favourites from localStorage
    const favourites: { id: number }[] = JSON.parse(
        localStorage.getItem("favourites") || "[]",
    );

    return (
        <Paper
            component="div"
            className="mb-6 flex flex-wrap items-center justify-around rounded-xl bg-surface px-4 py-3 text-navajo-white"
        >
            {onPrevious && (
                <IconButton
                    aria-label="go back"
                    className="text-ocean-mist"
                    onClick={onPrevious}
                >
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            )}

            {favourites.some((f) => f.id === movie.id) ? (
                <Avatar className="bg-magenta-bloom text-jet-black">
                    <FavoriteIcon />
                </Avatar>
            ) : null}
            <Typography
                variant="h4"
                component="h3"
                className="text-center font-semibold"
            >
                {movie.title}
                {"   "}
                <a href={movie.homepage}>
                    <HomeIcon className="text-ocean-mist" fontSize="large" />
                </a>
                <br />
                <span className="text-base text-navajo-white/70">
                    {`${movie.tagline}`}{" "}
                </span>
            </Typography>
            {onNext && (
                <IconButton
                    aria-label="go forward"
                    className="text-ocean-mist"
                    onClick={onNext}
                >
                    <ArrowForwardIcon fontSize="large" />
                </IconButton>
            )}
        </Paper>
    );
};

export default MovieHeader;
