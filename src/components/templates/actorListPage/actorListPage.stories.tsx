import type { Meta, StoryObj } from "@storybook/react";
import ActorListPageTemplate from "@templates/actorListPage";
import { SampleActor } from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";
import AddToFavouriteActorsIcon from "@atoms/cardIcons/addToFavouriteActors";
import { BaseActorProps } from "@typings/interfaces";

const meta = {
    title: "Templates/ActorListPage",
    component: ActorListPageTemplate,
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
} satisfies Meta<typeof ActorListPageTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: "Popular Actors",
        action: (actor: BaseActorProps) => (
            <AddToFavouriteActorsIcon {...actor} />
        ),
        actors: [
            { ...SampleActor, id: 1 },
            { ...SampleActor, id: 2 },
            { ...SampleActor, id: 3 },
            { ...SampleActor, id: 4 },
            { ...SampleActor, id: 5 },
        ],
    },
};
Basic.storyName = "Default";
