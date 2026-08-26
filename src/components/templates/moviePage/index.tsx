import React from "react";
import MovieHeader from "@molecules/headerMovie";
import Grid from "@mui/material/Grid";
import { getMovieImages, getMovieVideos } from "@api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "@typings/interfaces";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import MovieTrailer from "@molecules/movieTrailer";
import PosterCarousel from "@molecules/posterCarousel";

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}

/**
 * Page layout for a single movie, showing the movie header, the main poster
 * beside the trailer and whatever content the page passes in, and the rest of
 * the posters underneath.
 *
 * @param movie The movie the page is about.
 * @param children The content shown beside the poster.
 * @returns JSX.Element
 */
const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({
    movie,
    children,
}) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id),
    );

    // the trailer is not worth blocking the page for, so it fills in late
    const { data: trailerKey } = useQuery<string | null, Error>(
        ["videos", movie.id],
        () => getMovieVideos(movie.id),
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const images = data as MovieImage[];
    // tmdb returns every localised poster, which is far more than anyone
    // wants to scroll through
    const [mainPoster, ...otherPosters] = images.slice(0, 13);

    return (
        <>
            <MovieHeader {...movie} />

            <Grid container spacing={4} className="py-4">
                <Grid item xs={12} md={3}>
                    {mainPoster && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${mainPoster.file_path}`}
                            alt={`${movie.title} poster`}
                            className="w-full rounded-xl shadow-lg shadow-black/40 ring-1 ring-white/5"
                        />
                    )}
                </Grid>

                <Grid item xs={12} md={9}>
                    <MovieTrailer
                        youTubeKey={trailerKey ?? null}
                        title={movie.title}
                    />
                    {children}
                </Grid>

                <Grid item xs={12}>
                    <PosterCarousel
                        images={otherPosters}
                        title={movie.title}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
