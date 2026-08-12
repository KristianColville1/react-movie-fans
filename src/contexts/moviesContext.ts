import React from "react";
import { BaseMovieProps, FantasyMovie, Review } from "@typings/interfaces";

export interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    mustWatch: number[];
    addToMustWatch: (movie: BaseMovieProps) => void;
    fantasyMovie: FantasyMovie | null;
    saveFantasyMovie: (movie: FantasyMovie) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
    mustWatch: [],
    addToMustWatch: () => {},
    fantasyMovie: null,
    saveFantasyMovie: () => {},
};

export const MoviesContext =
    React.createContext<MovieContextInterface>(initialContextState);
