import React, { useState } from "react";
import PageTemplate from "@templates/actorListPage";
import { getActors } from "@api/tmdb-api";
import useFiltering from "@hooks/useFiltering";
import ActorFilterUI from "@organisms/actorFilterUI";
import { nameFilter } from "@organisms/actorFilterUI/filters";
import { PopularActors } from "@typings/interfaces";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import Pagination from "@molecules/pagination";

const nameFiltering = {
    name: "name",
    value: "",
    condition: nameFilter,
};

const ActorsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    // keepPreviousData holds the previous page on screen while the next one
    // loads, so the grid does not blank out between pages.
    const { data, error, isLoading, isError } = useQuery<PopularActors, Error>(
        ["actors", page],
        () => getActors(page),
        { keepPreviousData: true },
    );
    const { getFilterValue, setFilterValue, filterFunction } = useFiltering([
        nameFiltering,
    ]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const actors = data ? data.results : [];
    const displayedActors = filterFunction(actors);

    return (
        <>
            <PageTemplate title="Popular Actors" actors={displayedActors} />
            <Pagination
                page={page}
                totalPages={data ? data.total_pages : 1}
                onChange={setPage}
            />
            <ActorFilterUI
                onNameChange={(value) => setFilterValue("name", value)}
                nameFilter={getFilterValue("name")}
            />
        </>
    );
};
export default ActorsPage;
