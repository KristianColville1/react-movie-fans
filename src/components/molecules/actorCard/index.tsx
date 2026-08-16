import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TheatersIcon from "@mui/icons-material/Theaters";
import img from "@images/film-poster-placeholder.png";
import { BaseActorProps } from "@typings/interfaces";
import { Link } from "react-router-dom";

interface ActorCardProps {
    actor: BaseActorProps;
    action: (a: BaseActorProps) => React.ReactNode;
}

/**
 * Card showing an actor's profile picture, name and department.
 *
 * @param actor The actor to display.
 * @param action Renders the icon button shown in the card's actions.
 * @returns JSX.Element
 */
const ActorCard: React.FC<ActorCardProps> = ({ actor, action }) => {
    return (
        <Card className="flex h-full max-w-[345px] flex-col overflow-hidden rounded-xl bg-surface text-navajo-white shadow-lg shadow-black/40 ring-1 ring-white/5 transition hover:ring-ocean-mist/60">
            <CardMedia
                className="aspect-2/3 w-full"
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : img
                }
                title={actor.name}
            />
            <CardContent className="px-4 py-3">
                <Typography
                    variant="h6"
                    component="p"
                    className="text-base font-semibold text-navajo-white"
                >
                    {actor.name}
                </Typography>
                <Typography
                    variant="h6"
                    component="p"
                    className="flex items-center gap-1.5 text-sm text-navajo-white/75"
                >
                    <TheatersIcon fontSize="small" />
                    {actor.known_for_department}
                </Typography>
            </CardContent>
            <CardActions
                disableSpacing
                className="mt-auto flex items-center justify-between border-t border-white/5 px-2 py-2"
            >
                {action(actor)}
                <Link to={`/actors/${actor.id}`}>
                    <Button
                        variant="outlined"
                        size="medium"
                        className="border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-jet-black"
                    >
                        More Info
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default ActorCard;
