import type { Meta, StoryObj } from "@storybook/react";
import AddToPlaylistIcon from "@atoms/cardIcons/addToPlaylist";
import SampleMovie from "@stories/sampleData";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const meta = {
    title: "Atoms/AddToPlaylistIcon",
    component: AddToPlaylistIcon,
    decorators: [
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof AddToPlaylistIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
