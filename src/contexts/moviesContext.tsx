import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void; // NEW
    mustWatch: number[]; // NEW
    addToMustWatch: (movie: BaseMovieProps) => void; // NEW
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => {
        (movie.id, review);
    }, // NEW
    mustWatch: [],
    addToMustWatch: () => {} // NEW
};

export const MoviesContext =
    React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]); // NEW
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);

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
         // NEW
         setMyReviews({ ...myReviews, [movie.id]: review });
    };

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
                addToMustWatch
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
