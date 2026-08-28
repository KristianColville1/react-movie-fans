import React from "react";
import { BaseMovieProps, FantasyMovie, MyReview } from "@typings/interfaces";

export interface MovieContextInterface {
    favourites: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    favouriteActors: number[];
    addToFavouriteActors: (actorId: number) => void;
    removeFromFavouriteActors: (actorId: number) => void;
    myReviews: MyReview[];
    addReview: (movie: BaseMovieProps, review: MyReview) => void;
    mustWatch: number[];
    addToMustWatch: (movie: BaseMovieProps) => void;
    removeFromMustWatch: (movie: BaseMovieProps) => void;
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
    removeFromMustWatch: () => {},
    fantasyMovies: [],
    saveFantasyMovie: () => {},
    removeFantasyMovie: () => {},
};

export const MoviesContext =
    React.createContext<MovieContextInterface>(initialContextState);
