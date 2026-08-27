import React from "react";
import Paper from "@mui/material/Paper";

/**
 * Youtube trailer for a movie, kept at 16:9 whatever width it is given.
 * Renders nothing when the movie has no trailer.
 *
 * @param youTubeKey The youtube key of the trailer, or null when there is none.
 * @param title The movie title, used to label the frame.
 * @returns JSX.Element
 */
const MovieTrailer: React.FC<{
    youTubeKey: string | null;
    title: string;
}> = ({ youTubeKey, title }) => {
    if (!youTubeKey) {
        return null;
    }

    return (
        <Paper className="mb-6 aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg shadow-black/40 ring-1 ring-white/5">
            <iframe
                className="h-full w-full border-0"
                src={`https://www.youtube-nocookie.com/embed/${youTubeKey}`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Paper>
    );
};

export default MovieTrailer;
