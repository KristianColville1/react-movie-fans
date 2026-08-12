import React from "react";
import PageTemplate from "@templates/actorListPage";
import { getActors } from "@api/tmdb-api";
import useFiltering from "@hooks/useFiltering";
import ActorFilterUI from "@organisms/actorFilterUI";
import { nameFilter } from "@organisms/actorFilterUI/filters";
import { PopularActors } from "@typings/interfaces";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";

const nameFiltering = {
    name: "name",
    value: "",
    condition: nameFilter,
};

const ActorsPage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<PopularActors, Error>(
        "actors",
        getActors,
    );
    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        nameFiltering,
    ]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const changeNameFilter = (value: string) => {
        setFilterValues(
            filterValues.map((filter) =>
                filter.name === "name" ? { ...filter, value } : filter,
            ),
        );
    };

    const actors = data ? data.results : [];
    const displayedActors = filterFunction(actors);

    return (
        <>
            <PageTemplate title="Popular Actors" actors={displayedActors} />
            <ActorFilterUI
                onNameChange={changeNameFilter}
                nameFilter={filterValues[0].value}
            />
        </>
    );
};
export default ActorsPage;
