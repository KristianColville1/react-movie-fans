/**
 * Fetches a page of discoverable movies from TMDB.
 *
 * @param page The page to fetch, starting at 1.
 * @returns The discover response, containing the page number, total counts
 * and a results array of movies.
 * @throws If the response status is not ok.
 */
export const getMovies = (page = 1) => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch movies. Response status: ${response.status}`,
                );
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the full details of a single movie.
 *
 * @param id The TMDB id of the movie.
 * @returns The movie details, including its genres and production countries.
 * @throws If the response status is not ok.
 */
export const getMovie = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Failed to get movie data. Response status: ${response.status}`,
                );
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the full list of movie genres, used to populate the filter menu.
 *
 * @returns An object with a genres array of id and name pairs.
 * @throws If the response status is not ok.
 */
export const getGenres = () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
            import.meta.env.VITE_TMDB_KEY +
            "&language=en-US",
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch genres. Response status: ${response.status}`,
                );
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the poster images for a movie.
 *
 * @param id The TMDB id of the movie.
 * @returns The posters array from the images response, not the whole payload.
 * @throws If the response status is not ok.
 */
export const getMovieImages = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`,
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("failed to fetch images");
            }
            return response.json();
        })
        .then((json) => json.posters)
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the reviews written for a movie.
 *
 * @param id The TMDB id of the movie.
 * @returns The results array of reviews, not the whole payload.
 */
export const getMovieReviews = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`,
    )
        .then((res) => res.json())
        .then((json) => {
            return json.results;
        });
};

/**
 * Fetches a page of popular actors.
 *
 * @param page The page to fetch, starting at 1.
 * @returns The popular people response, containing the page number, total
 * counts and a results array of actors.
 * @throws If the response status is not ok.
 */
export const getActors = (page = 1) => {
    return fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch actors. Response status: ${response.status}`,
                );
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the full details of a single actor.
 *
 * @param id The TMDB id of the actor.
 * @returns The actor details, including their biography and birthday.
 * @throws If the response status is not ok.
 */
export const getActor = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch actor. Response status: ${response.status}`,
                );
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the movies an actor has appeared in.
 *
 * @param id The TMDB id of the actor.
 * @returns The cast array of the credits response, not the whole payload.
 * @throws If the response status is not ok.
 */
export const getActorCredits = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch actor credits. Response status: ${response.status}`,
                );
            return response.json();
        })
        .then((json) => json.cast)
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the youtube key of a movie trailer.
 *
 * @param id The TMDB id of the movie.
 * @returns The key of the first youtube trailer, or null when there is none.
 * @throws If the response status is not ok.
 */
export const getMovieVideos = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch movie videos. Response status: ${response.status}`,
                );
            return response.json();
        })
        // official trailers first, then any trailer, then anything on youtube
        .then((json) => {
            const youTube = json.results.filter(
                (video: { site: string }) => video.site === "YouTube",
            );
            const trailers = youTube.filter(
                (video: { type: string }) => video.type === "Trailer",
            );
            const best =
                trailers.find((video: { official: boolean }) => video.official) ??
                trailers[0] ??
                youTube[0];
            return best ? (best.key as string) : null;
        })
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches the billed cast of a movie.
 *
 * @param id The TMDB id of the movie.
 * @returns The cast array of the credits response, not the whole payload.
 * @throws If the response status is not ok.
 */
export const getMovieCredits = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch movie credits. Response status: ${response.status}`,
                );
            return response.json();
        })
        .then((json) => json.cast)
        .catch((error) => {
            throw error;
        });
};

/**
 * Fetches a page of upcoming movie releases.
 *
 * @param page The page to fetch, starting at 1.
 * @returns The same shape as the discover response, with a results array
 * of movies.
 * @throws If the response status is not ok.
 */
export const getUpcomingMovies = (page = 1) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`,
    )
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Unable to fetch movies. Response status: ${response.status}`,
                );
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};
