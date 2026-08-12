import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import { CreditedMovie } from "@typings/interfaces";
import { Link } from "react-router-dom";

interface FilmographyProps {
    credits: CreditedMovie[];
}

/**
 * List of the movies an actor has appeared in, each linking back to the
 * movie's page. Newest first.
 *
 * @param credits The movies the actor is credited on.
 * @returns JSX.Element
 */
const Filmography: React.FC<FilmographyProps> = ({ credits }) => {
    if (!credits.length) {
        return (
            <Typography variant="h6" component="p">
                No movie credits listed for this actor.
            </Typography>
        );
    }

    const ordered = [...credits].sort((a, b) =>
        (b.release_date || "").localeCompare(a.release_date || ""),
    );

    return (
        <Paper
            component="ul"
            className="m-0 flex list-none flex-col gap-2 rounded-xl bg-surface p-4 text-navajo-white"
        >
            {ordered.map((credit) => (
                <li
                    key={`${credit.id}-${credit.character}`}
                    className="border-b border-white/5 pb-2 last:border-b-0"
                >
                    <Link
                        to={`/movies/${credit.id}`}
                        className="flex flex-wrap items-center gap-3 no-underline"
                    >
                        <Typography
                            variant="body1"
                            className="font-semibold text-ocean-mist"
                        >
                            {credit.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="text-navajo-white/70"
                        >
                            as {credit.character || "Unlisted"}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="flex items-center gap-1 text-navajo-white/70"
                        >
                            <CalendarIcon fontSize="small" />
                            {credit.release_date || "Unreleased"}
                        </Typography>
                        <Typography
                            variant="body2"
                            className="flex items-center gap-1 font-semibold text-pale-amber"
                        >
                            <StarRateIcon fontSize="small" />
                            {credit.vote_average}
                        </Typography>
                    </Link>
                </li>
            ))}
        </Paper>
    );
};

export default Filmography;
