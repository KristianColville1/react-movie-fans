import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FantasyMovieForm from "@organisms/fantasyMovieForm";
import FantasyMovieList from "@organisms/fantasyMovieList";
import { MoviesContext } from "@contexts/moviesContext";
import { useToast } from "@contexts/toastContext";

const FantasyMoviePage: React.FC = () => {
    const { fantasyMovies, removeFantasyMovie } = useContext(MoviesContext);
    const { triggerToast } = useToast();

    const onDelete = (id: string) => {
        const deleted = fantasyMovies.find((m) => m.id === id);
        removeFantasyMovie(id);
        triggerToast(
            "info",
            "Fantasy movies",
            `${deleted ? deleted.title : "That movie"} has been deleted`,
        );
    };

    return (
        <Grid container spacing={4} className="bg-jet-black p-4">
            <Grid item xs={12} md={5}>
                <FantasyMovieForm />
            </Grid>
            <Grid item xs={12} md={7}>
                <Typography
                    variant="h4"
                    component="h2"
                    className="mb-4 text-navajo-white"
                >
                    Your fantasy movies
                </Typography>

                {fantasyMovies.length > 0 ? (
                    <Grid container spacing={3}>
                        <FantasyMovieList
                            movies={fantasyMovies}
                            onDelete={onDelete}
                        />
                    </Grid>
                ) : (
                    <Paper className="rounded-xl bg-surface p-6 text-navajo-white">
                        <Typography variant="h6" component="p">
                            Nothing yet. Fill in the form and your movie will
                            show up here.
                        </Typography>
                    </Paper>
                )}
            </Grid>
        </Grid>
    );
};

export default FantasyMoviePage;
