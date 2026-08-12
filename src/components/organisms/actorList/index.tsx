import React from "react";
import Actor from "@molecules/actorCard";
import Grid from "@mui/material/Grid";
import { BaseActorProps } from "@typings/interfaces";

interface ActorListProps {
    actors: BaseActorProps[];
}

/**
 * Grid of actor cards.
 *
 * @param actors The actors to show.
 * @returns JSX.Element
 */
const ActorList: React.FC<ActorListProps> = ({ actors }) => {
    const actorCards = actors.map((a) => (
        <Grid key={a.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Actor key={a.id} actor={a} />
        </Grid>
    ));
    return actorCards;
};

export default ActorList;
