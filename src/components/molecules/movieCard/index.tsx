import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "@images/film-poster-placeholder.png";
import { BaseMovieProps } from "@typings/interfaces";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "@contexts/moviesContext";

interface MovieCardProps {
    movie: BaseMovieProps;
    action: (m: BaseMovieProps) => React.ReactNode;
}

/**
 * Card showing a movie's poster, release date and rating.
 *
 * @param movie The movie to display.
 * @param action Renders the icon button shown in the card's actions.
 * @returns JSX.Element
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
    const { favourites } = useContext(MoviesContext);

    const isFavourite = favourites.find((id) => id === movie.id) ? true : false;

    return (
        <Card className="flex h-full max-w-[345px] flex-col overflow-hidden rounded-xl bg-surface text-navajo-white shadow-lg shadow-black/40 ring-1 ring-white/5 transition hover:ring-ocean-mist/60">
            {isFavourite && (
                <CardHeader
                    className="py-2"
                    avatar={
                        <Avatar
                            className="bg-magenta-bloom text-jet-black"
                            aria-label="in your favourites"
                        >
                            <FavoriteIcon />
                        </Avatar>
                    }
                />
            )}

            <CardMedia
                className="aspect-2/3 w-full"
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
                title={movie.title}
            />
            <CardContent className="px-4 py-3">
                <Grid container className="items-center">
                    <Grid item xs={6}>
                        <Typography
                            variant="h6"
                            component="p"
                            className="flex items-center gap-1.5 text-sm text-navajo-white/75"
                        >
                            <CalendarIcon fontSize="small" />
                            {movie.release_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant="h6"
                            component="p"
                            className="flex items-center justify-end gap-1 text-sm font-semibold text-pale-amber"
                        >
                            <StarRateIcon fontSize="small" />
                            {movie.vote_average}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions
                disableSpacing
                className="mt-auto flex items-center justify-between border-t border-white/5 px-2 py-2 text-magenta-bloom"
            >
                {action(movie)}

                <Link to={`/movies/${movie.id}`}>
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

export default MovieCard;
