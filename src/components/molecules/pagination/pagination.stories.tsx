import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "@molecules/pagination";

const meta = {
    title: "Molecules/Pagination",
    component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        page: 3,
        totalPages: 42,
        onChange: () => {},
    },
};
Basic.storyName = "Default";

export const Capped: Story = {
    args: {
        page: 1,
        totalPages: 40000,
        onChange: () => {},
    },
};
Capped.storyName = "Capped at the TMDB limit";
