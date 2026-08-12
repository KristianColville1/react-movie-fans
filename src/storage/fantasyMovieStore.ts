import { FantasyMovie } from "@typings/interfaces";

// Everything the app knows about fantasy movies lives under this one key, so
// the whole list is read and written together.
const storageKey = "fantasyMovies";

/**
 * Reads the saved fantasy movies out of local storage.
 *
 * @returns The stored movies, or an empty list when nothing has been saved
 * yet or the stored value cannot be read back.
 */
export const loadFantasyMovies = (): FantasyMovie[] => {
    try {
        const stored = window.localStorage.getItem(storageKey);
        if (!stored) {
            return [];
        }
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

/**
 * Writes the fantasy movies to local storage, replacing what was there.
 *
 * @param movies The full list to store.
 */
export const saveFantasyMovies = (movies: FantasyMovie[]): void => {
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(movies));
    } catch {
        // Storage can be full or turned off by the browser. The movies are
        // still in memory for this session, so carry on without them saved.
    }
};
