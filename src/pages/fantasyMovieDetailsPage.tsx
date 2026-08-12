import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FantasyMovieDetails from "@organisms/fantasyMovieDetails";
import { MoviesContext } from "@contexts/moviesContext";
import { getGenres } from "@api/tmdb-api";
import { GenreData } from "@typings/interfaces";
import { useQuery } from "react-query";

const FantasyMovieDetailsPage: React.FC = () => {
    const { id } = useParams();
    const { fantasyMovies } = useContext(MoviesContext);
    const { data } = useQuery<GenreData, Error>("genres", getGenres);

    const movie = fantasyMovies.find((m) => m.id === id);

    // The form stores genre ids, so the names have to be looked back up.
    const genres = data?.genres || [];
    const genreNames = (movie?.genreIds || [])
        .map((genreId) => genres.find((g) => Number(g.id) === genreId)?.name)
        .filter((name): name is string => Boolean(name));

    return (
        <Grid container spacing={4} className="bg-jet-black p-4">
            <Grid item xs={12}>
                {movie ? (
                    <FantasyMovieDetails
                        movie={movie}
                        genreNames={genreNames}
                    />
                ) : (
                    <Paper className="rounded-xl bg-surface p-6 text-navajo-white">
                        <Typography variant="h5" component="h2">
                            That fantasy movie is not here any more.
                        </Typography>
                        <Link to="/fantasy">
                            <Button
                                variant="outlined"
                                className="mt-4 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-jet-black"
                            >
                                Back to your fantasy movies
                            </Button>
                        </Link>
                    </Paper>
                )}
            </Grid>
        </Grid>
    );
};

export default FantasyMovieDetailsPage;
