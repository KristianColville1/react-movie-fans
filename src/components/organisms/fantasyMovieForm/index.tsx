import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useQuery } from "react-query";
import { getGenres } from "@api/tmdb-api";
import { MoviesContext } from "@contexts/moviesContext";
import { FantasyMovie, GenreData } from "@typings/interfaces";
import Spinner from "@atoms/spinner";

const fieldStyle = "mb-4 w-full bg-navajo-white/95 rounded-t";

/**
 * Form for inventing a fantasy movie, which is added to the movies context.
 * The id is put on by the context, so the form only collects the details.
 *
 * @returns JSX.Element
 */
const FantasyMovieForm: React.FC = () => {
    const context = useContext(MoviesContext);
    const [open, setOpen] = useState(false);
    const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
        "genres",
        getGenres,
    );

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<Omit<FantasyMovie, "id">>({
        defaultValues: {
            title: "",
            overview: "",
            genreIds: [],
            releaseDate: "",
            runtime: 0,
            productionCompanies: "",
        },
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const genres = data?.genres || [];

    const onSubmit: SubmitHandler<Omit<FantasyMovie, "id">> = (movie) => {
        context.saveFantasyMovie(movie);
        setOpen(true);
        reset();
    };

    return (
        <Box className="rounded-xl bg-surface p-6 text-navajo-white">
            <Typography variant="h4" component="h2" className="mb-4">
                Create your fantasy movie
            </Typography>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={4000}
            >
                <Alert severity="success" onClose={() => setOpen(false)}>
                    Your fantasy movie has been saved.
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Title is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            variant="filled"
                            label="Title"
                            id="fantasy-title"
                        />
                    )}
                />
                {errors.title && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.title.message}
                    </Typography>
                )}

                <Controller
                    name="overview"
                    control={control}
                    rules={{ required: "Overview is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            variant="filled"
                            label="Overview"
                            id="fantasy-overview"
                            multiline
                            minRows={4}
                        />
                    )}
                />
                {errors.overview && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.overview.message}
                    </Typography>
                )}

                <Controller
                    name="genreIds"
                    control={control}
                    render={({ field }) => (
                        <FormControl className={fieldStyle} variant="filled">
                            <InputLabel id="fantasy-genres-label">
                                Genres
                            </InputLabel>
                            <Select
                                {...field}
                                labelId="fantasy-genres-label"
                                id="fantasy-genres"
                                multiple
                            >
                                {genres.map((genre) => (
                                    <MenuItem
                                        key={genre.id}
                                        value={Number(genre.id)}
                                    >
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="releaseDate"
                    control={control}
                    rules={{ required: "Release date is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            variant="filled"
                            label="Release date"
                            id="fantasy-release-date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    )}
                />
                {errors.releaseDate && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.releaseDate.message}
                    </Typography>
                )}

                <Controller
                    name="runtime"
                    control={control}
                    rules={{ min: { value: 1, message: "Runtime must be at least a minute" } }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            variant="filled"
                            label="Runtime in minutes"
                            id="fantasy-runtime"
                            type="number"
                            onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    )}
                />
                {errors.runtime && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.runtime.message}
                    </Typography>
                )}

                <Controller
                    name="productionCompanies"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            variant="filled"
                            label="Production companies"
                            id="fantasy-production-companies"
                            helperText="Separate several companies with commas"
                        />
                    )}
                />

                <Box className="flex gap-3">
                    <Button
                        type="submit"
                        variant="contained"
                        className="bg-magenta-bloom font-semibold text-jet-black hover:bg-magenta-bloom/90"
                    >
                        Submit
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        className="border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-jet-black"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default FantasyMovieForm;
