import type { Meta, StoryObj } from "@storybook/react";
import ActorCard from "@molecules/actorCard";
import { SampleActor } from "@stories/sampleData";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Molecules/ActorCard",
    component: ActorCard,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof ActorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        actor: SampleActor,
    },
};
Basic.storyName = "Default";

const sampleNoProfile = { ...SampleActor, profile_path: undefined };
export const Exceptional: Story = {
    args: {
        actor: sampleNoProfile,
    },
};
Exceptional.storyName = "Exception";
