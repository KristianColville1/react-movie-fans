import type { Meta, StoryObj } from "@storybook/react";
import RemoveFromFavouriteActorsIcon from "@atoms/cardIcons/removeFromFavouriteActors";
import { SampleActor } from "@stories/sampleData";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const meta = {
    title: "Atoms/CardIcons/RemoveFromFavouriteActors",
    component: RemoveFromFavouriteActorsIcon,
    decorators: [
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof RemoveFromFavouriteActorsIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: SampleActor };
Basic.storyName = "Default";
