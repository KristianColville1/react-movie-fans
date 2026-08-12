import type { Meta, StoryObj } from "@storybook/react";
import MovieReview from "@molecules/movieReview";
import SampleMovie from "@stories/sampleData";

const sampleReview = {
    id: "1",
    author: "Mark Kermode",
    content:
        "A confident, visually striking entry in the series that takes real risks with its characters, even if the middle act meanders more than it needs to.",
    agree: true,
    rating: 4,
    movieId: SampleMovie.id,
};

const meta = {
    title: "Molecules/MovieReview",
    component: MovieReview,
} satisfies Meta<typeof MovieReview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: sampleReview,
};
Basic.storyName = "Default";
