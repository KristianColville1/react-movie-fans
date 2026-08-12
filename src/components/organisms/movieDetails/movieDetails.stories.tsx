import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "@organisms/movieDetails";
import SampleMovie from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const meta = {
    title: "Organisms/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
        (Story) => (
            <QueryClientProvider client={queryClient}>
                {Story()}
            </QueryClientProvider>
        ),
      ],
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SampleMovie
};
Basic.storyName = "Default";