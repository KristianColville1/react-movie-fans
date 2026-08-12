import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "@atoms/spinner";

const meta = {
    title: "Atoms/Spinner",
    component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
Basic.storyName = "Default";
