import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { CastMember, MovieDetailsProps } from "@typings/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "@organisms/movieReviews";
import CastList from "@molecules/castList";
import { getMovieCredits } from "@api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import { formatDate } from "@tools/dates";

const chipStyle =
    "bg-jet-black/60 text-navajo-white ring-1 ring-white/10 [&_.MuiChip-icon]:text-ocean-mist";
const chipHeadingStyle = "bg-ocean-mist font-semibold text-jet-black";
const chipSetStyle =
    "m-0 flex list-none flex-wrap items-center justify-center gap-2 rounded-xl bg-surface p-3 text-navajo-white";

/**
 * Body of the movie details page, showing the overview, the genre and stat
 * chips, the billed cast, and a drawer holding the reviews.
 *
 * @param movie The movie to display.
 * @returns JSX.Element
 */
const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {
        data: cast,
        error: castError,
        isLoading: castLoading,
        isError: castIsError,
    } = useQuery<CastMember[], Error>(["credits", movie.id], () =>
        getMovieCredits(movie.id),
    );

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" className={chipSetStyle}>
                <li>
                    <Chip label="Genres" className={chipHeadingStyle} />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} className={chipStyle} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" className={chipSetStyle}>
                <Chip
                    icon={<AccessTimeIcon />}
                    label={`${movie.runtime} min.`}
                    className={chipStyle}
                />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                    className={chipStyle}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average.toFixed(1)} (${movie.vote_count})`}
                    className={`${chipStyle} cursor-pointer hover:ring-ocean-mist`}
                    onClick={() => setDrawerOpen(true)}
                    aria-label="read the reviews"
                />
                <Chip
                    label={`Released: ${formatDate(movie.release_date)}`}
                    className={chipStyle}
                />
            </Paper>

            <Typography variant="h5" component="h3">
                Cast
            </Typography>
            {castLoading && <Spinner />}
            {castIsError && <h1>{castError.message}</h1>}
            {cast && <CastList cast={cast.slice(0, 12)} />}

            <Fab
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                className="fixed right-6 bottom-6 bg-ocean-mist font-semibold text-jet-black shadow-lg shadow-black/40 hover:bg-ocean-mist/90"
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ className: "bg-jet-black text-navajo-white" }}
            >
                <MovieReviews {...movie} />
            </Drawer>
        </>
    );
};
export default MovieDetails;
