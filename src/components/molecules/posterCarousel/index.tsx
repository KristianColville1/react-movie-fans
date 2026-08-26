import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { MovieImage } from "@typings/interfaces";

/**
 * Horizontal strip of the remaining posters for a movie, scrolled by the
 * arrows either side. Renders nothing when there is nothing to show.
 *
 * @param images The posters to show.
 * @param title The movie title, used in the alt text.
 * @returns JSX.Element
 */
const PosterCarousel: React.FC<{
    images: MovieImage[];
    title: string;
}> = ({ images, title }) => {
    const strip = useRef<HTMLDivElement>(null);

    if (!images.length) {
        return null;
    }

    // one poster plus its gap, so a click lands on the next one
    const scrollBy = (direction: number) => {
        strip.current?.scrollBy({
            left: direction * 176,
            behavior: "smooth",
        });
    };

    return (
        <section className="mt-8">
            <div className="mb-2 flex items-center justify-between">
                <Typography variant="h5" component="h3">
                    Posters
                </Typography>
                <div>
                    <IconButton
                        aria-label="scroll posters left"
                        className="text-ocean-mist"
                        onClick={() => scrollBy(-1)}
                    >
                        <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        aria-label="scroll posters right"
                        className="text-ocean-mist"
                        onClick={() => scrollBy(1)}
                    >
                        <ChevronRightIcon fontSize="large" />
                    </IconButton>
                </div>
            </div>

            <div
                ref={strip}
                className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3"
            >
                {images.map((image) => (
                    <img
                        key={image.file_path}
                        src={`https://image.tmdb.org/t/p/w342${image.file_path}`}
                        alt={`${title} poster`}
                        loading="lazy"
                        className="w-40 shrink-0 snap-start rounded-xl shadow-lg shadow-black/40 ring-1 ring-white/5"
                    />
                ))}
            </div>
        </section>
    );
};

export default PosterCarousel;
