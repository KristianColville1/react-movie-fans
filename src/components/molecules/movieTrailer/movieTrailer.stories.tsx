import type { Meta, StoryObj } from "@storybook/react";
import MovieTrailer from "@molecules/movieTrailer";

const meta = {
    title: "Molecules/MovieTrailer",
    component: MovieTrailer,
} satisfies Meta<typeof MovieTrailer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        youTubeKey: "d9MyW72ELq0",
        title: "Avatar",
    },
};
Basic.storyName = "Default";

export const NoTrailer: Story = {
    args: {
        youTubeKey: null,
        title: "Avatar",
    },
};
NoTrailer.storyName = "No trailer";
