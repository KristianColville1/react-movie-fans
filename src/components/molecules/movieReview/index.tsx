import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Review } from "@typings/interfaces";

/**
 * Displays the full text of a review and who wrote it.
 *
 * @param props The review to display.
 * @returns JSX.Element
 */
const MovieReview: React.FC<Review> = (props) => {
    return (
        <Paper className="rounded-xl bg-surface p-6 text-navajo-white">
            <div className="mb-4 flex items-center gap-3">
                <Avatar className="bg-ocean-mist font-semibold text-jet-black">
                    {props.author?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" component="h3">
                    {props.author}
                </Typography>
            </div>

            <Typography
                variant="body1"
                component="p"
                className="leading-relaxed whitespace-pre-line text-navajo-white/80"
            >
                {props.content}
            </Typography>
        </Paper>
    );
};

export default MovieReview;
