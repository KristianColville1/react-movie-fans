// tmdb hands dates back as yyyy-mm-dd. splitting the string keeps this out of
// the browser timezone, which shifts a date parsed as utc back a day
const parts = (value: string) => value.slice(0, 10).split("-");

/**
 * Formats a tmdb date for reading.
 *
 * @param value The date as tmdb gives it, yyyy-mm-dd.
 * @param fallback What to show when there is no date.
 * @returns The date as mm/dd/yyyy, or the fallback.
 */
export const formatDate = (value?: string, fallback = "Unknown"): string => {
    if (!value) {
        return fallback;
    }
    const [year, month, day] = parts(value);
    if (!year || !month || !day) {
        return fallback;
    }
    return `${month}/${day}/${year}`;
};
