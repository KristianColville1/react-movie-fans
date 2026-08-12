import type { Meta, StoryObj } from "@storybook/react";
import RemoveFromFavouritesIcon from "@atoms/cardIcons/removeFromFavourites";
import SampleMovie from "@stories/sampleData";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const meta = {
    title: "Atoms/RemoveFromFavouritesIcon",
    component: RemoveFromFavouritesIcon,
    decorators: [
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof RemoveFromFavouritesIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
