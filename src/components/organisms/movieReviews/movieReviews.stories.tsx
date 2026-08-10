import type { Meta, StoryObj } from "@storybook/react";
import MovieReviews from "@organisms/movieReviews";
import SampleMovie from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Organisms/MovieReviews",
    component: MovieReviews,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof MovieReviews>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
