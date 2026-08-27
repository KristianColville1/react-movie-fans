import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

/**
 * Oops panel shown when a page cannot be given.
 *
 * @param status The http status behind it.
 * @param title A short line saying what went wrong.
 * @param message What the visitor can do about it.
 * @returns JSX.Element
 */
const ErrorNotice: React.FC<{
    status: number;
    title: string;
    message: string;
}> = ({ status, title, message }) => {
    return (
        <Paper className="mx-auto mt-16 max-w-xl rounded-xl bg-surface p-10 text-center text-navajo-white">
            <Typography
                variant="h1"
                component="p"
                className="font-semibold text-ocean-mist"
            >
                {status}
            </Typography>

            <Typography variant="h4" component="h2" className="mt-2 mb-3">
                Oops. {title}
            </Typography>

            <Typography variant="body1" className="mb-6 text-navajo-white/70">
                {message}
            </Typography>

            <Link to="/">
                <Button
                    variant="contained"
                    className="bg-ocean-mist font-semibold text-jet-black hover:bg-ocean-mist/90"
                >
                    Back to the movies
                </Button>
            </Link>
        </Paper>
    );
};

export default ErrorNotice;
