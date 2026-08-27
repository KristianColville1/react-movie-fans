import type { Meta, StoryObj } from "@storybook/react";
import SiteFooter from "@templates/siteFooter";

const meta = {
    title: "Templates/SiteFooter",
    component: SiteFooter,
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
Basic.storyName = "Default";
