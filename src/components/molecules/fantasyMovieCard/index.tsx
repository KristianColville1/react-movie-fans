import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import img from "@images/film-poster-placeholder.png";
import { FantasyMovie } from "@typings/interfaces";
import { Link } from "react-router-dom";

/**
 * Card showing one invented movie, with a way through to its own page.
 *
 * @param movie The fantasy movie to display.
 * @param onDelete Called with the movie id when the delete button is used.
 * @returns JSX.Element
 */
const FantasyMovieCard: React.FC<{
    movie: FantasyMovie;
    onDelete: (id: string) => void;
}> = ({ movie, onDelete }) => {
    return (
        <Card className="flex h-full max-w-[345px] flex-col overflow-hidden rounded-xl bg-surface text-navajo-white shadow-lg shadow-black/40 ring-1 ring-white/5 transition hover:ring-ocean-mist/60">
            <CardMedia
                className="aspect-2/3 w-full"
                image={img}
                title={movie.title}
            />
            <CardContent className="px-4 py-3">
                <Typography
                    variant="h6"
                    component="p"
                    className="text-base font-semibold text-navajo-white"
                >
                    {movie.title}
                </Typography>
                <Typography
                    variant="h6"
                    component="p"
                    className="flex items-center gap-1.5 text-sm text-navajo-white/75"
                >
                    <CalendarMonthIcon fontSize="small" />
                    {movie.releaseDate}
                </Typography>
                <Typography
                    variant="h6"
                    component="p"
                    className="flex items-center gap-1.5 text-sm text-navajo-white/75"
                >
                    <AccessTimeIcon fontSize="small" />
                    {movie.runtime} min.
                </Typography>
            </CardContent>
            <CardActions
                disableSpacing
                className="mt-auto flex items-center justify-between border-t border-white/5 px-2 py-2"
            >
                <IconButton
                    aria-label={`Delete ${movie.title}`}
                    color="inherit"
                    onClick={() => onDelete(movie.id)}
                >
                    <DeleteIcon />
                </IconButton>
                <Link to={`/fantasy/${movie.id}`}>
                    <Button
                        variant="outlined"
                        size="medium"
                        className="border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-jet-black"
                    >
                        More Info
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default FantasyMovieCard;
