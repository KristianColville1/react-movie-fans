import type { Meta, StoryObj } from "@storybook/react";
import BurgerButton from "@atoms/burgerButton";

const meta = {
    title: "Atoms/BurgerButton",
    component: BurgerButton,
} satisfies Meta<typeof BurgerButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
    args: {
        open: false,
        onClick: () => {},
    },
};
Closed.storyName = "Closed";

export const Open: Story = {
    args: {
        open: true,
        onClick: () => {},
    },
};
Open.storyName = "Open";
