import type { Meta } from "@storybook/react";
import ActorList from "@organisms/actorList";
import { SampleActor } from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";
import AddToFavouriteActorsIcon from "@atoms/cardIcons/addToFavouriteActors";
import { BaseActorProps } from "@typings/interfaces";
import Grid from "@mui/material/Grid";

const meta = {
    title: "Organisms/ActorList",
    component: ActorList,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof ActorList>;

export default meta;

export const Basic = () => {
    const actors = [
        { ...SampleActor, id: 1 },
        { ...SampleActor, id: 2 },
        { ...SampleActor, id: 3 },
        { ...SampleActor, id: 4 },
        { ...SampleActor, id: 5 },
    ];
    return (
        <Grid container spacing={5}>
            <ActorList
                actors={actors}
                action={(actor: BaseActorProps) => (
                    <AddToFavouriteActorsIcon {...actor} />
                )}
            />
        </Grid>
    );
};
Basic.storyName = "Default";
