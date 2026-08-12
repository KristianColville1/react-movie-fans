import type { Meta, StoryObj } from "@storybook/react";
import FantasyMovieDetails from "@organisms/fantasyMovieDetails";
import { SampleFantasyMovie } from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Organisms/FantasyMovieDetails",
    component: FantasyMovieDetails,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof FantasyMovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        movie: SampleFantasyMovie,
        genreNames: ["Drama", "Mystery", "Horror"],
    },
};
Basic.storyName = "Default";
