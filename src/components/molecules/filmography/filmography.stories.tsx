import type { Meta, StoryObj } from "@storybook/react";
import Filmography from "@molecules/filmography";
import { SampleCredits } from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Molecules/Filmography",
    component: Filmography,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof Filmography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        credits: SampleCredits,
    },
};
Basic.storyName = "Default";

export const Exceptional: Story = {
    args: {
        credits: [],
    },
};
Exceptional.storyName = "Exception";
