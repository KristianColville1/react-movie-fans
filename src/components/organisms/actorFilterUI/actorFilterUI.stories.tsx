import type { Meta, StoryObj } from "@storybook/react";
import ActorFilterUI from "@organisms/actorFilterUI";
import { action } from "@storybook/addon-actions";
import { AuthContext } from "@contexts/authContext";
import { Session } from "@supabase/supabase-js";

// Filtering is premium, so the story stands in a signed in user. Only the
// presence of a session is read, which is why an empty object will do.
const signedIn = {
    session: {} as Session,
    user: null,
    isLoading: false,
    signUp: async () => null,
    signIn: async () => null,
    signOut: async () => {},
    updateDisplayName: async () => null,
    updatePassword: async () => null,
};

const meta = {
    title: "Organisms/ActorFilterUI",
    component: ActorFilterUI,
    decorators: [
        (Story) => (
            <AuthContext.Provider value={signedIn}>
                <Story />
            </AuthContext.Provider>
        ),
    ],
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

export const SignedOut: Story = {
    decorators: [
        (Story) => (
            <AuthContext.Provider value={{ ...signedIn, session: null }}>
                <Story />
            </AuthContext.Provider>
        ),
    ],
    args: {
        onNameChange: action("name input"),
        nameFilter: "",
    },
};
SignedOut.storyName = "Signed out, filtering withheld";
