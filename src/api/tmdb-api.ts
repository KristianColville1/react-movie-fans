// tmdb names its sort values differently to the ones the sort control uses
const sortValues: Record<string, string> = {
    title: "title.asc",
    release_date: "primary_release_date.desc",
    vote_average: "vote_average.desc",
    popularity: "popularity.desc",
};

/**
 * Fetches a page of movies matching the chosen criteria. The criteria go to
 * tmdb rather than being applied to the page after it arrives, so the results
 * and the page count both cover the whole catalogue.
 *
 * A title goes to the search endpoint, which is the only one that takes text.
 * It ignores the other criteria, so those are left to narrow the page.
 *
 * @param page The page to fetch, starting at 1.
 * @param filters The chosen criteria, all optional.
 * @returns The response, containing the page number, total counts and a
 * results array of movies.
 * @throws If the response status is not ok.
 */
export const getMovies = (
    page = 1,
    filters: {
        title?: string;
        genre?: string;
        yearFrom?: string;
        yearTo?: string;
        rating?: string;
        sort?: string;
    } = {},
) => {
    const query = new URLSearchParams({
        api_key: import.meta.env.VITE_TMDB_KEY,
        language: "en-US",
        include_adult: "false",
        page: String(page),
    });

    const title = filters.title?.trim();

    if (title) {
        query.set("query", title);
    } else {
        query.set("include_video", "false");
        query.set("sort_by", sortValues[filters.sort ?? ""] ?? "popularity.desc");

        // a pipe between ids is how tmdb spells or, which is the reading the
        // genre checkboxes already have
        const genres = filters.genre
            ? filters.genre.split(",").filter(Boolean)
            : [];
        if (genres.length) {
            query.set("with_genres", genres.join("|"));
        }
        if (filters.yearFrom) {
            query.set("primary_release_date.gte", `${filters.yearFrom}-01-01`);
        }
        if (filters.yearTo) {
            query.set("primary_release_date.lte", `${filters.yearTo}-12-31`);
        }
        if (filters.rating && Number(filters.rating) > 0) {
            query.set("vote_average.gte", filters.rating);
        }
    }

    const path = title ? "search/movie" : "discover/movie";

    return fetch(`https://api.themoviedb.org/3/${path}?${query}`)
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
