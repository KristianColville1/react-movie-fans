import type { Meta, StoryObj } from "@storybook/react";
import WriteReviewIcon from "@atoms/cardIcons/writeReview";
import SampleMovie from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Atoms/WriteReviewIcon",
    component: WriteReviewIcon,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof WriteReviewIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleMovie,
};
Basic.storyName = "Default";
