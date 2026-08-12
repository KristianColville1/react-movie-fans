import React from "react";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FantasyMovie } from "@typings/interfaces";
import { Link } from "react-router-dom";

/**
 * Full page view of one invented movie.
 *
 * @param movie The fantasy movie to display.
 * @param genreNames The genre names, already looked up from the stored ids.
 * @returns JSX.Element
 */
const FantasyMovieDetails: React.FC<{
    movie: FantasyMovie;
    genreNames: string[];
}> = ({ movie, genreNames }) => {
    return (
        <Paper className="rounded-xl bg-surface p-6 text-navajo-white">
            <Typography
                variant="h3"
                component="h2"
                className="font-semibold text-ocean-mist"
            >
                {movie.title}
            </Typography>

            <Typography variant="h6" component="p" className="my-4">
                {movie.overview}
            </Typography>

            <Paper
                component="ul"
                className="m-0 flex list-none flex-wrap items-center gap-2 bg-transparent p-0"
            >
                {genreNames.map((name) => (
                    <li key={name}>
                        <Chip label={name} />
                    </li>
                ))}
                <li>
                    <Chip
                        icon={<AccessTimeIcon />}
                        label={`${movie.runtime} min.`}
                    />
                </li>
                <li>
                    <Chip
                        icon={<CalendarMonthIcon />}
                        label={`Released: ${movie.releaseDate}`}
                    />
                </li>
                {movie.productionCompanies && (
                    <li>
                        <Chip
                            icon={<BusinessIcon />}
                            label={movie.productionCompanies}
                        />
                    </li>
                )}
            </Paper>

            <Link to="/fantasy">
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    className="mt-6 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-jet-black"
                >
                    Back to your fantasy movies
                </Button>
            </Link>
        </Paper>
    );
};

export default FantasyMovieDetails;
