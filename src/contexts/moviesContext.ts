import React from "react";
import { BaseMovieProps, FantasyMovie, Review } from "@typings/interfaces";

export interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    favouriteActors: number[];
    addToFavouriteActors: (actorId: number) => void;
    removeFromFavouriteActors: (actorId: number) => void;
    myReviews: Review[];
    addReview: (movie: BaseMovieProps, review: Review) => void;
    mustWatch: number[];
    addToMustWatch: (movie: BaseMovieProps) => void;
    fantasyMovies: FantasyMovie[];
    saveFantasyMovie: (movie: Omit<FantasyMovie, "id">) => void;
    removeFantasyMovie: (id: string) => void;
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    favouriteActors: [],
    addToFavouriteActors: () => {},
    removeFromFavouriteActors: () => {},
    myReviews: [],
    addReview: () => {},
    mustWatch: [],
    addToMustWatch: () => {},
    fantasyMovies: [],
    saveFantasyMovie: () => {},
    removeFantasyMovie: () => {},
};

export const MoviesContext =
    React.createContext<MovieContextInterface>(initialContextState);
