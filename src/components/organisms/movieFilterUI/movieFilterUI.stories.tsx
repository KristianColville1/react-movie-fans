import type { Meta, StoryObj } from "@storybook/react";
import MovieFilterUI from "@organisms/movieFilterUI";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthContext } from "@contexts/authContext";
import { Session } from "@supabase/supabase-js";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

// Filtering is premium, so the story stands in a signed in user. Only the
// presence of a session is read, which is why an empty object will do.
const signedIn = {
    session: {} as Session,
    user: null,
    isLoading: false,
    signUp: async () => null,
    signIn: async () => null,
    signOut: async () => {},
};

const meta = {
    title: "Organisms/MovieFilterUI",
    component: MovieFilterUI,
    decorators: [
        (Story) => (
            <AuthContext.Provider value={signedIn}>
                <Story />
            </AuthContext.Provider>
        ),
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
} satisfies Meta<typeof MovieFilterUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onFilterValuesChange: action("filter input"),
        titleFilter: "",
        genreFilter: "",
        yearFromFilter: "",
        yearToFilter: "",
        ratingFilter: "",
        sortOption: "title",
        onSortChange: action("sort input"),
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
        onFilterValuesChange: action("filter input"),
        titleFilter: "",
        genreFilter: "",
        yearFromFilter: "",
        yearToFilter: "",
        ratingFilter: "",
        sortOption: "title",
        onSortChange: action("sort input"),
    },
};
SignedOut.storyName = "Signed out, filtering withheld";
