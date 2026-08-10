import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface HeaderProps {
    title: string;
}

/**
 * Header shown at the top of a movie list page.
 *
 * @param headerProps The title to display between the paging arrows.
 * @returns JSX.Element
 */
const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title;

    return (
        <Paper
            component="div"
            className="mb-6 flex flex-wrap items-center justify-around rounded-xl bg-surface px-4 py-3 text-navajo-white"
        >
            <IconButton aria-label="go back" className="text-ocean-mist">
                <ArrowBackIcon fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3" className="font-semibold">
                {title}
            </Typography>
            <IconButton aria-label="go forward" className="text-ocean-mist">
                <ArrowForwardIcon fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;
