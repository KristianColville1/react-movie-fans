import React from "react";
import Box from "@mui/material/Box";
import MuiPagination from "@mui/material/Pagination";

// TMDB refuses any page past 500, whatever total_pages reports.
const maxPage = 500;

/**
 * Page control shown under a list. Moving page also returns the view to the
 * top, so the next page starts where the reader is looking.
 *
 * @param page The page currently shown, starting at 1.
 * @param totalPages The number of pages available.
 * @param onChange Called with the newly selected page.
 * @returns JSX.Element
 */
const Pagination: React.FC<{
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
}> = ({ page, totalPages, onChange }) => {
    const count = Math.min(totalPages, maxPage);

    if (count <= 1) {
        return null;
    }

    return (
        <Box className="flex justify-center py-8">
            <MuiPagination
                page={page}
                count={count}
                shape="rounded"
                siblingCount={1}
                onChange={(_event, value) => {
                    onChange(value);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="[&_.MuiPaginationItem-root]:text-navajo-white [&_.MuiPaginationItem-root:hover]:bg-surface-raised [&_.Mui-selected]:bg-ocean-mist [&_.Mui-selected]:font-semibold [&_.Mui-selected]:text-jet-black"
            />
        </Box>
    );
};

export default Pagination;
