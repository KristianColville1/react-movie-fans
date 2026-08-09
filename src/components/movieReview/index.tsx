import React from "react";
import { Review } from "@typings/interfaces";

const MovieReview: React.FC<Review> = (props) => {
    return (
        <>
            <p>Review By: {props.author} </p>
            <p>{props.content} </p>
        </>
    );
};
export default MovieReview;
