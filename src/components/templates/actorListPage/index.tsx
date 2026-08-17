import React from "react";
import Header from "@molecules/headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "@organisms/actorList";
import { BaseActorProps } from "@typings/interfaces";

interface ActorListPageTemplateProps {
    actors: BaseActorProps[];
    title: string;
    action: (a: BaseActorProps) => React.ReactNode;
}

/**
 * Page layout for any list of actors, pairing a header with the actor grid.
 *
 * @param actors The actors to list.
 * @param title The heading shown above the grid.
 * @param action Renders the icon button shown on each card.
 * @returns JSX.Element
 */
const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = ({
    actors,
    title,
    action,
}) => {
    return (
        <Grid container className="bg-jet-black p-4">
            <Grid item xs={12}>
                <Header title={title} />
            </Grid>
            <Grid item container spacing={5}>
                <ActorList actors={actors} action={action} />
            </Grid>
        </Grid>
    );
};
export default ActorListPageTemplate;
