import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "@typings/interfaces";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "@contexts/moviesContext";

/**
 * Header shown at the top of a movie details page. The arrows walk the list
 * the visitor arrived from, and are left out when there is no list, which is
 * what a bookmarked link gives you.
 *
 * @param movie The movie whose title and tagline are shown.
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
    const { favourites } = useContext(MoviesContext);

    return (
        <Paper
            component="div"
            className="mb-6 flex items-center gap-1 rounded-xl bg-surface px-1 py-3 text-navajo-white sm:gap-2 sm:px-3"
        >
            <div className="w-12 shrink-0">
                {onPrevious && (
                    <IconButton
                        aria-label="go back"
                        className="text-ocean-mist"
                        onClick={onPrevious}
                    >
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <div className="flex items-center justify-center gap-2">
                    {favourites.includes(movie.id) && (
                        <Avatar
                            className="h-7 w-7 bg-magenta-bloom text-jet-black"
                            aria-label="in your favourites"
                        >
                            <FavoriteIcon fontSize="small" />
                        </Avatar>
                    )}
                    <Typography
                        variant="h5"
                        component="h3"
                        className="text-lg leading-tight font-semibold break-words sm:text-2xl"
                    >
                        {movie.title}
                    </Typography>
                </div>

                {movie.tagline && (
                    <Typography
                        variant="body2"
                        className="mt-1 text-xs text-navajo-white/70 sm:text-sm"
                    >
                        {movie.tagline}
                    </Typography>
                )}
            </div>

            <div className="flex w-12 shrink-0 justify-end">
                {onNext && (
                    <IconButton
                        aria-label="go forward"
                        className="text-ocean-mist"
                        onClick={onNext}
                    >
                        <ArrowForwardIcon fontSize="large" />
                    </IconButton>
                )}
            </div>
        </Paper>
    );
};

export default MovieHeader;
