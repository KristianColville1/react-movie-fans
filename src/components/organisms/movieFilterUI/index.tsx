import React, { useState } from "react";
import FilterCard from "@organisms/filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    sortOption: string;
    onSortChange: (value: string) => void;
}

/**
 * Floating filter button that opens a drawer holding the filter and sort card.
 *
 * @param onFilterValuesChange Called with the filter that changed and its new value.
 * @param titleFilter The current title search text.
 * @param genreFilter The id of the currently selected genre.
 * @param sortOption The value of the currently selected sort criterion.
 * @param onSortChange Called with the newly selected sort criterion.
 * @returns JSX.Element
 */
const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
    onFilterValuesChange,
    titleFilter,
    genreFilter,
    sortOption,
    onSortChange,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                className="fixed top-24 right-4 bg-magenta-bloom font-semibold text-jet-black hover:bg-magenta-bloom/90"
            >
                Filter
            </Fab>
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
                    sortOption={sortOption}
                    onSortChange={onSortChange}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
