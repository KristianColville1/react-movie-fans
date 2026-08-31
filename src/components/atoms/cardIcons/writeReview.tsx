import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BaseMovieProps } from "@typings/interfaces";
import { Link } from "react-router-dom";

/**
 * Link that takes the user to the review form for a movie.
 *
 * @param movie The movie being reviewed, its id is passed on in route state.
 * @returns JSX.Element
 */
const WriteReviewIcon: React.FC<BaseMovieProps> = (movie) => {
    return (
        <Link
            to={"/reviews/form"}
            aria-label={`write a review of ${movie.title}`}
            state={{
                movieId: movie.id,
            }}
        >
            <RateReviewIcon color="inherit" fontSize="large" />
        </Link>
    );
};

export default WriteReviewIcon;
