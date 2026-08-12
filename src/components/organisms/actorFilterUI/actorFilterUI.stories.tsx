import type { Meta, StoryObj } from "@storybook/react";
import ActorFilterUI from "@organisms/actorFilterUI";
import { action } from "@storybook/addon-actions";

const meta = {
    title: "Organisms/ActorFilterUI",
    component: ActorFilterUI,
} satisfies Meta<typeof ActorFilterUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onNameChange: action("name input"),
        nameFilter: "",
    },
};
Basic.storyName = "Default";
