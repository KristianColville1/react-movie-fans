import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "@contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import ratings from "./ratingCategories";
import { BaseMovieProps, MyReview } from "@typings/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const fieldStyle = "mb-4 w-full";
const inputStyle =
    "rounded-t bg-white/95 text-jet-black [&_.MuiSelect-icon]:text-jet-black/60";
const labelStyle = "text-jet-black/70";
const helperStyle = "text-navajo-white/70";

/**
 * Form for writing a review of a movie, which is saved against the signed in
 * user and shown alongside the tmdb reviews for that movie.
 *
 * @param movie The movie being reviewed.
 * @returns JSX.Element
 */
const ReviewForm: React.FC<BaseMovieProps> = (movie) => {
    const defaultValues = {
        defaultValues: {
            author: "",
            content: "",
            agree: false,
            rating: 3,
            movieId: 0,
        },
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<MyReview>(defaultValues);

    const navigate = useNavigate();
    const context = useContext(MoviesContext);
    const [rating, setRating] = useState(3);
    const [open, setOpen] = useState(false);

    const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(Number(event.target.value));
    };

    const onSubmit: SubmitHandler<MyReview> = (review) => {
        review.movieId = movie.id;
        review.rating = rating;
        context.addReview(movie, review);
        setOpen(true);
    };

    const handleSnackClose = () => {
        setOpen(false);
        navigate("/movies/favourites");
    };

    return (
        <Box className="rounded-xl bg-surface p-6 text-navajo-white">
            <Typography variant="h4" component="h2" className="mb-4">
                Write a review
            </Typography>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleSnackClose}
                autoHideDuration={4000}
            >
                <Alert severity="success" onClose={handleSnackClose}>
                    Thank you for submitting a review.
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="author"
                    control={control}
                    rules={{ required: "Name is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            variant="filled"
                            onChange={onChange}
                            value={value}
                            id="author"
                            label="Author's name"
                        />
                    )}
                />
                {errors.author && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.author.message}
                    </Typography>
                )}

                <Controller
                    name="content"
                    control={control}
                    rules={{
                        required: "Review cannot be empty.",
                        minLength: {
                            value: 10,
                            message: "Review is too short",
                        },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            label="Review text"
                            id="review"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.content && (
                    <Typography variant="body2" className="mb-2 text-red-400">
                        {errors.content.message}
                    </Typography>
                )}

                <Controller
                    control={control}
                    name="rating"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            FormHelperTextProps={{ className: helperStyle }}
                            variant="filled"
                            id="select-rating"
                            select
                            label="Rating"
                            value={rating}
                            onChange={handleRatingChange}
                            helperText="Don't forget your rating"
                        >
                            {ratings.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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
                        onClick={() => {
                            reset({
                                author: "",
                                content: "",
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default ReviewForm;
