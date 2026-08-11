import React, { useState, useCallback } from "react";
import { BaseMovieProps, FantasyMovie, Review } from "@typings/interfaces";
import { MoviesContext } from "@contexts/moviesContext";

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [fantasyMovie, setFantasyMovie] = useState<FantasyMovie | null>(null);

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

    const addReview = (movie: BaseMovieProps, review: Review) => {
        setMyReviews({ ...myReviews, [movie.id]: review });
    };

    const saveFantasyMovie = useCallback((movie: FantasyMovie) => {
        setFantasyMovie(movie);
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
                addReview,
                mustWatch,
                addToMustWatch,
                fantasyMovie,
                saveFantasyMovie,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
