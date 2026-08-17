import React, { useState, useContext } from "react";
import FilterCard from "@organisms/filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { AuthContext } from "@contexts/authContext";

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    yearFromFilter: string;
    yearToFilter: string;
    ratingFilter: string;
    sortOption: string;
    onSortChange: (value: string) => void;
}

/**
 * Floating filter button that opens a drawer holding the filter and sort card.
 *
 * @param onFilterValuesChange Called with the filter that changed and its new value.
 * @param titleFilter The current title search text.
 * @param genreFilter The chosen genre ids, comma separated.
 * @param yearFromFilter The earliest release year to keep.
 * @param yearToFilter The latest release year to keep.
 * @param ratingFilter The lowest average score to keep.
 * @param sortOption The value of the currently selected sort criterion.
 * @param onSortChange Called with the newly selected sort criterion.
 * @returns JSX.Element
 */
const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
    onFilterValuesChange,
    titleFilter,
    genreFilter,
    yearFromFilter,
    yearToFilter,
    ratingFilter,
    sortOption,
    onSortChange,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // Filtering and sorting are the premium feature, so anonymous visitors
    // get an invitation rather than the control.
    const { session } = useContext(AuthContext);

    return (
        <>
            {session ? (
                <Fab
                    variant="extended"
                    onClick={() => setDrawerOpen(true)}
                    className="fixed top-24 right-4 bg-magenta-bloom font-semibold text-jet-black hover:bg-magenta-bloom/90"
                >
                    Filter
                </Fab>
            ) : (
                <Typography
                    variant="body2"
                    className="fixed top-24 right-4 rounded-full bg-surface-raised px-4 py-2 text-navajo-white/80"
                >
                    Sign in to filter and sort
                </Typography>
            )}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ className: "bg-surface text-navajo-white" }}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    yearFromFilter={yearFromFilter}
                    yearToFilter={yearToFilter}
                    ratingFilter={ratingFilter}
                    sortOption={sortOption}
                    onSortChange={onSortChange}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
