import type { Meta, StoryObj } from "@storybook/react";
import ActorDetails from "@organisms/actorDetails";
import { SampleActor } from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const meta = {
    title: "Organisms/ActorDetails",
    component: ActorDetails,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
} satisfies Meta<typeof ActorDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: SampleActor,
};
Basic.storyName = "Default";
