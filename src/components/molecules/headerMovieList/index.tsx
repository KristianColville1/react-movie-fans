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
            className="mb-6 flex items-center gap-1 rounded-xl bg-surface px-1 py-3 text-navajo-white sm:gap-2 sm:px-3"
        >
            <div className="w-12 shrink-0">
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
            </div>

            <Typography
                variant="h4"
                component="h1"
                className="min-w-0 flex-1 text-center text-xl leading-tight font-semibold break-words sm:text-3xl"
            >
                {title}
            </Typography>

            <div className="flex w-12 shrink-0 justify-end">
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
            </div>
        </Paper>
    );
};

export default Header;
