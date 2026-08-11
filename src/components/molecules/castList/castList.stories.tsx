import type { Meta, StoryObj } from "@storybook/react";
import CastList from "@molecules/castList";
import { SampleCast } from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Molecules/CastList",
    component: CastList,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof CastList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        cast: SampleCast,
    },
};
Basic.storyName = "Default";

export const Exceptional: Story = {
    args: {
        cast: [],
    },
};
Exceptional.storyName = "Exception";
