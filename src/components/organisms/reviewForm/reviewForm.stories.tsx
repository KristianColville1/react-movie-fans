import type { Meta, StoryObj } from "@storybook/react";
import ReviewForm from "@organisms/reviewForm";
import SampleMovie from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const meta = {
    title: "Organisms/ReviewForm",
    component: ReviewForm,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
    ],
} satisfies Meta<typeof ReviewForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
