import type { Meta, StoryObj } from "@storybook/react";
import AuthForm from "@organisms/authForm";
import { MemoryRouter } from "react-router";
import { AuthContext } from "@contexts/authContext";

const meta = {
    title: "Organisms/AuthForm",
    component: AuthForm,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/login"]}>
                <Story />
            </MemoryRouter>
        ),
        // A stub context keeps the story off the network and off Supabase.
        (Story) => (
            <AuthContext.Provider
                value={{
                    session: null,
                    user: null,
                    isLoading: false,
                    signUp: async () => null,
                    signIn: async () => null,
                    signOut: async () => {},
                    updateDisplayName: async () => null,
                    updatePassword: async () => null,
                }}
            >
                <Story />
            </AuthContext.Provider>
        ),
    ],
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
Basic.storyName = "Default";
