import type { Meta, StoryObj } from "@storybook/react";
import MovieFilterUI from "@organisms/movieFilterUI";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

const meta = {
    title: "Organisms/MovieFilterUI",
    component: MovieFilterUI,
    decorators: [
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
