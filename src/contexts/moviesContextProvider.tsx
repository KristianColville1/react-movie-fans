import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, FantasyMovie, Review } from "@typings/interfaces";
import { MoviesContext } from "@contexts/moviesContext";
import {
    loadFantasyMovies,
    saveFantasyMovies,
} from "@storage/fantasyMovieStore";

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [fantasyMovies, setFantasyMovies] =
        useState<FantasyMovie[]>(loadFantasyMovies);

    // The list is written back whenever it changes, so every caller only has
    // to update state and the saved copy keeps up on its own.
    useEffect(() => {
        saveFantasyMovies(fantasyMovies);
    }, [fantasyMovies]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) =>
            prevFavourites.filter((mId) => mId !== movie.id),
        );
    }, []);

    // Reviews carry the movie they belong to, so the list stays flat.
    const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
        setMyReviews((prevReviews) => [
            ...prevReviews,
            { ...review, movieId: movie.id },
        ]);
    }, []);

    const saveFantasyMovie = useCallback((movie: Omit<FantasyMovie, "id">) => {
        setFantasyMovies((prevFantasyMovies) => [
            ...prevFantasyMovies,
            { ...movie, id: crypto.randomUUID() },
        ]);
    }, []);

    const removeFantasyMovie = useCallback((id: string) => {
        setFantasyMovies((prevFantasyMovies) =>
            prevFantasyMovies.filter((movie) => movie.id !== id),
        );
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => {
            const newMustWatch = !prevMustWatch.includes(movie.id)
                ? [...prevMustWatch, movie.id]
                : prevMustWatch;
            console.log(newMustWatch);
            return newMustWatch;
        });
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                myReviews,
                addReview,
                mustWatch,
                addToMustWatch,
                fantasyMovies,
                saveFantasyMovie,
                removeFantasyMovie,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
