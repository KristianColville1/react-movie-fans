import React from "react";
import { BaseMovieProps, Review } from "@typings/interfaces";

export interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    mustWatch: number[];
    addToMustWatch: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
    mustWatch: [],
    addToMustWatch: () => {},
};

export const MoviesContext =
    React.createContext<MovieContextInterface>(initialContextState);
