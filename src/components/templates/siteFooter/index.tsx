import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const repository = "https://github.com/KristianColville1/react-movie-fans";

/**
 * Footer shown at the foot of every page.
 *
 * @returns JSX.Element
 */
const SiteFooter: React.FC = () => {
    return (
        <footer className="mt-12 bg-black/40 py-6 text-navajo-white/70">
            <Typography variant="body2" className="text-center">
                &copy; {new Date().getFullYear()} MovieFans. Created by{" "}
                <Link
                    href={repository}
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-ocean-mist underline-offset-2"
                >
                    Kristian Colville
                </Link>
            </Typography>
        </footer>
    );
};

export default SiteFooter;
