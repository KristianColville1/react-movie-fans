import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { maxPage } from "@molecules/pagination";

interface HeaderProps {
    title: string;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

/**
 * Header shown at the top of a movie list page. The arrows step through the
 * pages when the list is paged, and are left out when it is not.
 *
 * @param headerProps The title, and the paging state when the list has any.
 * @returns JSX.Element
 */
const Header: React.FC<HeaderProps> = ({
    title,
    page,
    totalPages,
    onPageChange,
}) => {
    const paged = onPageChange !== undefined && page !== undefined;
    const lastPage = Math.min(totalPages ?? 1, maxPage);

    // matches the control at the bottom, the next page starts where the
    // reader is looking
    const goTo = (next: number) => {
        onPageChange?.(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Paper
            component="div"
            className="mb-6 flex flex-wrap items-center justify-around rounded-xl bg-surface px-4 py-3 text-navajo-white"
        >
            {paged && (
                <IconButton
                    aria-label="go back"
                    className="text-ocean-mist disabled:text-navajo-white/25"
                    disabled={page <= 1}
                    onClick={() => goTo(page - 1)}
                >
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            )}

            <Typography variant="h4" component="h3" className="font-semibold">
                {title}
            </Typography>

            {paged && (
                <IconButton
                    aria-label="go forward"
                    className="text-ocean-mist disabled:text-navajo-white/25"
                    disabled={page >= lastPage}
                    onClick={() => goTo(page + 1)}
                >
                    <ArrowForwardIcon fontSize="large" />
                </IconButton>
            )}
        </Paper>
    );
};

export default Header;
