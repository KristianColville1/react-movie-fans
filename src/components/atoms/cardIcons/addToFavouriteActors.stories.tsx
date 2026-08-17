import type { Meta, StoryObj } from "@storybook/react";
import AddToFavouriteActorsIcon from "@atoms/cardIcons/addToFavouriteActors";
import { SampleActor } from "@stories/sampleData";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const meta = {
    title: "Atoms/CardIcons/AddToFavouriteActors",
    component: AddToFavouriteActorsIcon,
    decorators: [
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof AddToFavouriteActorsIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: SampleActor };
Basic.storyName = "Default";
