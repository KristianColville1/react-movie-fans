import React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CastMember } from "@typings/interfaces";
import { Link } from "react-router-dom";

interface CastListProps {
    cast: CastMember[];
}

/**
 * Horizontal strip of cast members, each linking to the actor's page.
 *
 * @param cast The billed cast to display.
 * @returns JSX.Element
 */
const CastList: React.FC<CastListProps> = ({ cast }) => {
    if (!cast.length) {
        return (
            <Typography variant="h6" component="p">
                No cast listed for this title.
            </Typography>
        );
    }

    return (
        <Paper
            component="ul"
            className="m-0 flex list-none flex-wrap gap-4 rounded-xl bg-surface p-4 text-navajo-white"
        >
            {cast.map((member) => (
                <li key={member.id} className="w-24 text-center">
                    <Link
                        to={`/actors/${member.id}`}
                        className="flex flex-col items-center gap-1 no-underline"
                    >
                        <Avatar
                            className="h-16 w-16"
                            alt={member.name}
                            src={
                                member.profile_path
                                    ? `https://image.tmdb.org/t/p/w185/${member.profile_path}`
                                    : undefined
                            }
                        >
                            {member.name.charAt(0)}
                        </Avatar>
                        <Typography
                            variant="body2"
                            className="font-semibold text-ocean-mist"
                        >
                            {member.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            className="text-navajo-white/70"
                        >
                            {member.character}
                        </Typography>
                    </Link>
                </li>
            ))}
        </Paper>
    );
};

export default CastList;
