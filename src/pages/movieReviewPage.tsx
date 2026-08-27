import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "@templates/moviePage";
import MovieReview from "@molecules/movieReview";
import ErrorNotice from "@molecules/errorNotice";
import { MovieDetailsProps, Review } from "@typings/interfaces";

/**
 * The full text of one review. The review travels with the link from the
 * movie page, so arriving here any other way has nothing to show.
 *
 * @returns JSX.Element
 */
const MovieReviewPage: React.FC = () => {
    const { state } = useLocation();
    const passed = state as {
        movie?: MovieDetailsProps;
        review?: Review;
    } | null;

    if (!passed?.movie || !passed?.review) {
        return (
            <ErrorNotice
                status={404}
                title="We cannot find that review."
                message="Reviews open from the movie they belong to. Pick a movie and choose Reviews to read them."
            />
        );
    }

    return (
        <PageTemplate movie={passed.movie}>
            <MovieReview {...passed.review} />
        </PageTemplate>
    );
};

export default MovieReviewPage;
