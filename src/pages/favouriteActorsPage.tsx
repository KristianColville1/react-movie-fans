import React, { useContext } from "react";
import PageTemplate from "@templates/actorListPage";
import { MoviesContext } from "@contexts/moviesContext";
import { useQueries } from "react-query";
import { getActor } from "@api/tmdb-api";
import Spinner from "@atoms/spinner";
import RemoveFromFavouriteActorsIcon from "@atoms/cardIcons/removeFromFavouriteActors";
import { BaseActorProps } from "@typings/interfaces";

const FavouriteActorsPage: React.FC = () => {
    const { favouriteActors } = useContext(MoviesContext);

    // One query per favourite, run in parallel, the same way the favourite
    // movies page does it.
    const favouriteActorQueries = useQueries(
        favouriteActors.map((actorId) => {
            return {
                queryKey: ["actor", actorId],
                queryFn: () => getActor(actorId.toString()),
            };
        }),
    );

    const isLoading = favouriteActorQueries.find((a) => a.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const actors = favouriteActorQueries
        .map((q) => q.data)
        .filter((a): a is BaseActorProps => Boolean(a));

    return (
        <PageTemplate
            title="Favourite Actors"
            actors={actors}
            action={(actor: BaseActorProps) => (
                <RemoveFromFavouriteActorsIcon {...actor} />
            )}
        />
    );
};

export default FavouriteActorsPage;
