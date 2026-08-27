import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { getMovieReviews } from "@api/tmdb-api";
import { excerpt } from "@/util";

import { MovieDetailsProps, Review } from "@typings/interfaces";

const cellStyle = "border-white/10 text-navajo-white";

/**
 * Table of the reviews TMDB holds for a movie, each row linking to the full
 * text of that review.
 *
 * @param movie The movie whose reviews are listed.
 * @returns JSX.Element
 */
const MovieReviews: React.FC<MovieDetailsProps> = (movie) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovieReviews(movie.id).then((reviews) => {
            setReviews(reviews);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mx-auto w-full max-w-7xl p-4">
            <Typography
                variant="h5"
                component="h2"
                className="mb-3 text-navajo-white"
            >
                Reviews of {movie.title}
            </Typography>

            {reviews.length === 0 ? (
                <Paper className="rounded-xl bg-surface p-6 text-navajo-white">
                    <Typography variant="body1">
                        Nobody has reviewed this one yet.
                    </Typography>
                </Paper>
            ) : (
                <TableContainer
                    component={Paper}
                    className="rounded-xl bg-surface"
                >
                    <Table aria-label="reviews table">
                        <TableHead>
                            <TableRow className="bg-surface-raised">
                                <TableCell
                                    className={`${cellStyle} font-semibold`}
                                >
                                    Author
                                </TableCell>
                                <TableCell
                                    className={`${cellStyle} font-semibold`}
                                >
                                    Excerpt
                                </TableCell>
                                <TableCell
                                    align="right"
                                    className={`${cellStyle} font-semibold`}
                                >
                                    More
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviews.map((r: Review) => (
                                <TableRow
                                    key={r.id}
                                    className="hover:bg-surface-raised"
                                >
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        className={`${cellStyle} font-semibold whitespace-nowrap`}
                                    >
                                        {r.author}
                                    </TableCell>
                                    <TableCell
                                        className={`${cellStyle} text-navajo-white/75`}
                                    >
                                        {excerpt(r.content)}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={cellStyle}
                                    >
                                        <Link
                                            to={`/reviews/${r.id}`}
                                            state={{
                                                review: r,
                                                movie: movie,
                                            }}
                                            className="font-semibold whitespace-nowrap text-ocean-mist"
                                        >
                                            Full Review
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default MovieReviews;
