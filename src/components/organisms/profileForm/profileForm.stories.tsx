import type { Meta, StoryObj } from "@storybook/react";
import ProfileForm from "@organisms/profileForm";

const meta = {
    title: "Organisms/ProfileForm",
    component: ProfileForm,
} satisfies Meta<typeof ProfileForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        email: "moviefan@example.com",
        displayName: "Movie Fan",
        onSaveName: async () => null,
        onChangePassword: async () => null,
    },
};
Basic.storyName = "Default";

export const Failing: Story = {
    args: {
        email: "moviefan@example.com",
        displayName: "",
        onSaveName: async () => "Could not save that just now.",
        onChangePassword: async () => "Password is too weak.",
    },
};
Failing.storyName = "Rejected by the server";
