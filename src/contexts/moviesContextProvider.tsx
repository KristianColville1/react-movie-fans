import React, { useState, useCallback, useEffect, useContext } from "react";
import { BaseMovieProps, FantasyMovie, Review } from "@typings/interfaces";
import { MoviesContext } from "@contexts/moviesContext";
import { AuthContext } from "@contexts/authContext";
import {
    loadFantasyMovies,
    insertFantasyMovie,
    deleteFantasyMovie,
} from "@storage/fantasyMovieStore";
import {
    loadFavourites,
    addFavourite,
    removeFavourite,
} from "@storage/favouritesStore";
import {
    loadFavouriteActors,
    addFavouriteActor,
    removeFavouriteActor,
} from "@storage/favouriteActorsStore";

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const { user } = useContext(AuthContext);
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    const [favouriteActors, setFavouriteActors] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [fantasyMovies, setFantasyMovies] = useState<FantasyMovie[]>([]);

    // Everything stored belongs to a user, so it is read when one signs in
    // and dropped when they sign out rather than lingering for the next one.
    useEffect(() => {
        let active = true;

        if (!user) {
            setFavourites([]);
            setFavouriteActors([]);
            setFantasyMovies([]);
            setMyReviews([]);
            return;
        }

        Promise.all([
            loadFavourites(),
            loadFavouriteActors(),
            loadFantasyMovies(),
        ]).then(([storedFavourites, storedActors, storedMovies]) => {
            if (!active) {
                return;
            }
            setFavourites(storedFavourites);
            setFavouriteActors(storedActors);
            setFantasyMovies(storedMovies);
        });

        return () => {
            active = false;
        };
    }, [user]);

    // The local list is updated first so the card responds immediately, then
    // the write goes out. A failed write is corrected on the next load.
    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) =>
            prevFavourites.includes(movie.id)
                ? prevFavourites
                : [...prevFavourites, movie.id],
        );
        void addFavourite(movie.id);
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) =>
            prevFavourites.filter((mId) => mId !== movie.id),
        );
        void removeFavourite(movie.id);
    }, []);

    const addToFavouriteActors = useCallback((actorId: number) => {
        setFavouriteActors((prevActors) =>
            prevActors.includes(actorId) ? prevActors : [...prevActors, actorId],
        );
        void addFavouriteActor(actorId);
    }, []);

    const removeFromFavouriteActors = useCallback((actorId: number) => {
        setFavouriteActors((prevActors) =>
            prevActors.filter((aId) => aId !== actorId),
        );
        void removeFavouriteActor(actorId);
    }, []);

    // Reviews carry the movie they belong to, so the list stays flat.
    const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
        setMyReviews((prevReviews) => [
            ...prevReviews,
            { ...review, movieId: movie.id },
        ]);
    }, []);

    // The database fills in the id, so the new movie is taken from what the
    // insert returns rather than guessed at here.
    const saveFantasyMovie = useCallback(
        (movie: Omit<FantasyMovie, "id">) => {
            void insertFantasyMovie(movie).then((stored) => {
                if (stored) {
                    setFantasyMovies((prevMovies) => [...prevMovies, stored]);
                }
            });
        },
        [],
    );

    const removeFantasyMovie = useCallback((id: string) => {
        setFantasyMovies((prevMovies) =>
            prevMovies.filter((movie) => movie.id !== id),
        );
        void deleteFantasyMovie(id);
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) =>
            prevMustWatch.includes(movie.id)
                ? prevMustWatch
                : [...prevMustWatch, movie.id],
        );
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                favouriteActors,
                addToFavouriteActors,
                removeFromFavouriteActors,
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
