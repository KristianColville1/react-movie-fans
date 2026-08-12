import type { Meta, StoryObj } from "@storybook/react";
import FantasyMovieCard from "@molecules/fantasyMovieCard";
import { SampleFantasyMovie } from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Molecules/FantasyMovieCard",
    component: FantasyMovieCard,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof FantasyMovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        movie: SampleFantasyMovie,
        onDelete: () => {},
    },
};
Basic.storyName = "Default";
