import React from "react";
import { Review } from "@typings/interfaces";

/**
 * Displays the full text of a review and who wrote it.
 *
 * @param props The review to display.
 * @returns JSX.Element
 */
const MovieReview: React.FC<Review> = (props) => {
    return (
        <>
            <p>Review By: {props.author} </p>
            <p>{props.content} </p>
        </>
    );
};
export default MovieReview;
