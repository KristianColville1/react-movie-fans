import type { Meta, StoryObj } from "@storybook/react";
import TemplateMoviePage from "@templates/moviePage";
import SampleMovie from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";
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
    title: "Templates/MoviePage",
    component: TemplateMoviePage,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
        (Story) => (
            <MoviesContextProvider>
                <Story />
            </MoviesContextProvider>
        ),
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
} satisfies Meta<typeof TemplateMoviePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        movie: SampleMovie,
        children: <p>Page content goes here.</p>,
    },
};
Basic.storyName = "Default";
