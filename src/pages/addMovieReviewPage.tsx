import React from "react";
import PageTemplate from "@templates/moviePage";
import ReviewForm from "@organisms/reviewForm";
import { useLocation, Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "@api/tmdb-api";
import Spinner from "@atoms/spinner";
import { MovieDetailsProps } from "@typings/interfaces";

const WriteReviewPage: React.FC = () => {
    const location = useLocation();
    // The form is reached from a movie card, which passes the id in route
    // state. Landing here directly leaves that empty.
    const state = location.state as { movieId?: number } | null;
    const movieId = state?.movieId;

    const {
        data: movie,
        error,
        isLoading,
        isError,
    } = useQuery<MovieDetailsProps, Error>(
        ["movie", movieId],
        () => getMovie(String(movieId)),
        { enabled: movieId !== undefined },
    );

    if (movieId === undefined) {
        return <Navigate to="/" replace />;
    }

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {movie ? (
                <PageTemplate movie={movie}>
                    <ReviewForm {...movie} />
                </PageTemplate>
            ) : (
                <p>Waiting for movie review details</p>
            )}
        </>
    );
};

export default WriteReviewPage;
