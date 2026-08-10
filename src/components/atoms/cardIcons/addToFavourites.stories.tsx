import type { Meta, StoryObj } from "@storybook/react";
import AddToFavouritesIcon from "@atoms/cardIcons/addToFavourites";
import SampleMovie from "@stories/sampleData";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const meta = {
    title: "Atoms/AddToFavouritesIcon",
    component: AddToFavouritesIcon,
    decorators: [
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof AddToFavouritesIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
