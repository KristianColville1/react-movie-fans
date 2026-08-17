import type { Meta, StoryObj } from "@storybook/react";
import ActorCard from "@molecules/actorCard";
import { SampleActor } from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";
import AddToFavouriteActorsIcon from "@atoms/cardIcons/addToFavouriteActors";
import { BaseActorProps } from "@typings/interfaces";

const meta = {
    title: "Molecules/ActorCard",
    component: ActorCard,
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
} satisfies Meta<typeof ActorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        actor: SampleActor,
        action: (actor: BaseActorProps) => (
            <AddToFavouriteActorsIcon {...actor} />
        ),
    },
};
Basic.storyName = "Default";

const sampleNoProfile = { ...SampleActor, profile_path: undefined };
export const Exceptional: Story = {
    args: {
        actor: sampleNoProfile,
        action: (actor: BaseActorProps) => (
            <AddToFavouriteActorsIcon {...actor} />
        ),
    },
};
Exceptional.storyName = "Exception";
