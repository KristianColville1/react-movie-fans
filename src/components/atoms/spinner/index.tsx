import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const styles = {
    root: {
        display: "flex",
        justifyContent: "center",
        "& > * + *": {
            marginLeft: 2,
        },
    },
};

/**
 * Loading indicator shown while a request is in flight.
 *
 * @returns JSX.Element
 */
const CircularIndeterminate: React.FC = () => {
    return (
        <div style={styles.root}>
            <CircularProgress />
            <CircularProgress />
        </div>
    );
};

export default CircularIndeterminate;
