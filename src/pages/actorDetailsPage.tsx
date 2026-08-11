import React from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "@organisms/actorDetails";
import { getActor } from "@api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import { ActorDetailsProps } from "@typings/interfaces";

const ActorDetailsPage: React.FC = () => {
    const { id } = useParams();
    const {
        data: actor,
        error,
        isLoading,
        isError,
    } = useQuery<ActorDetailsProps, Error>(["actor", id], () =>
        getActor(id || ""),
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            {actor ? (
                <ActorDetails {...actor} />
            ) : (
                <p>Waiting for actor details</p>
            )}
        </>
    );
};

export default ActorDetailsPage;
