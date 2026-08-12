import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import TheatersIcon from "@mui/icons-material/Theaters";
import { ActorDetailsProps, CreditedMovie } from "@typings/interfaces";
import { getActorCredits } from "@api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import Filmography from "@molecules/filmography";

/**
 * Body of the actor details page, showing the biography, a set of fact chips
 * and the actor's filmography.
 *
 * @param actor The actor to display.
 * @returns JSX.Element
 */
const ActorDetails: React.FC<ActorDetailsProps> = (actor) => {
    const { data, error, isLoading, isError } = useQuery<CreditedMovie[], Error>(
        ["credits", actor.id],
        () => getActorCredits(actor.id),
    );

    return (
        <div className="flex flex-col gap-4 bg-jet-black p-4 text-navajo-white">
            <Paper className="flex flex-wrap items-center gap-4 rounded-xl bg-surface p-4 text-navajo-white">
                <Avatar
                    className="h-28 w-28"
                    alt={actor.name}
                    src={
                        actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                            : undefined
                    }
                >
                    {actor.name.charAt(0)}
                </Avatar>
                <Typography
                    variant="h4"
                    component="h2"
                    className="font-semibold"
                >
                    {actor.name}
                </Typography>
            </Paper>

            <Paper
                component="ul"
                className="m-0 flex list-none flex-wrap items-center justify-center gap-2 rounded-xl bg-surface p-3 text-navajo-white"
            >
                <li>
                    <Chip
                        icon={<TheatersIcon />}
                        label={actor.known_for_department}
                    />
                </li>
                {actor.birthday && (
                    <li>
                        <Chip
                            icon={<CakeIcon />}
                            label={`Born: ${actor.birthday}`}
                        />
                    </li>
                )}
                {actor.deathday && (
                    <li>
                        <Chip label={`Died: ${actor.deathday}`} />
                    </li>
                )}
                {actor.place_of_birth && (
                    <li>
                        <Chip
                            icon={<PlaceIcon />}
                            label={actor.place_of_birth}
                        />
                    </li>
                )}
            </Paper>

            <Typography variant="h5" component="h3">
                Biography
            </Typography>
            <Typography variant="h6" component="p">
                {actor.biography || "No biography available for this actor."}
            </Typography>

            <Typography variant="h5" component="h3">
                Filmography
            </Typography>
            {isLoading && <Spinner />}
            {isError && <h1>{error.message}</h1>}
            {data && <Filmography credits={data} />}
        </div>
    );
};

export default ActorDetails;
