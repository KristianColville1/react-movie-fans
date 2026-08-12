import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import FantasyMovieForm from "@organisms/fantasyMovieForm";
import { MoviesContext } from "@contexts/moviesContext";
import { getGenres } from "@api/tmdb-api";
import { GenreData } from "@typings/interfaces";
import { useQuery } from "react-query";

const FantasyMoviePage: React.FC = () => {
    const { fantasyMovie } = useContext(MoviesContext);
    const { data } = useQuery<GenreData, Error>("genres", getGenres);

    // The form stores genre ids, so the names have to be looked back up.
    const genreNames = (ids: number[]) => {
        const genres = data?.genres || [];
        return ids
            .map((id) => genres.find((g) => Number(g.id) === id)?.name)
            .filter((name): name is string => Boolean(name));
    };

    return (
        <Grid container spacing={4} className="bg-jet-black p-4">
            <Grid item xs={12} md={6}>
                <FantasyMovieForm />
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className="rounded-xl bg-surface p-6 text-navajo-white">
                    <Typography variant="h4" component="h2" className="mb-4">
                        Your fantasy movie
                    </Typography>

                    {fantasyMovie ? (
                        <>
                            <Typography
                                variant="h5"
                                component="h3"
                                className="font-semibold text-ocean-mist"
                            >
                                {fantasyMovie.title}
                            </Typography>
                            <Typography variant="h6" component="p" className="my-3">
                                {fantasyMovie.overview}
                            </Typography>

                            <Paper
                                component="ul"
                                className="m-0 flex list-none flex-wrap items-center gap-2 bg-transparent p-0"
                            >
                                {genreNames(fantasyMovie.genreIds).map((name) => (
                                    <li key={name}>
                                        <Chip label={name} />
                                    </li>
                                ))}
                                <li>
                                    <Chip
                                        icon={<AccessTimeIcon />}
                                        label={`${fantasyMovie.runtime} min.`}
                                    />
                                </li>
                                <li>
                                    <Chip
                                        label={`Released: ${fantasyMovie.releaseDate}`}
                                    />
                                </li>
                                {fantasyMovie.productionCompanies && (
                                    <li>
                                        <Chip
                                            icon={<BusinessIcon />}
                                            label={
                                                fantasyMovie.productionCompanies
                                            }
                                        />
                                    </li>
                                )}
                            </Paper>
                        </>
                    ) : (
                        <Typography variant="h6" component="p">
                            Nothing yet. Fill in the form and your movie will
                            show up here.
                        </Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default FantasyMoviePage;
