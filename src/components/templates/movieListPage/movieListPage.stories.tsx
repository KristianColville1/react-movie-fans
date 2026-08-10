import type { Meta, StoryObj } from "@storybook/react";
import MovieListPageTemplate from "@templates/movieListPage";
import SampleMovie from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "@contexts/moviesContextProvider";
import AddToFavouritesIcon from "@atoms/cardIcons/addToFavourites";

const movies = [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
];

const meta = {
    title: "Templates/MovieListPage",
    component: MovieListPageTemplate,
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
    ],
} satisfies Meta<typeof MovieListPageTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: "Discover Movies",
        movies: movies,
        action: (movie) => <AddToFavouritesIcon {...movie} />,
    },
};
Basic.storyName = "Default";

export const Empty: Story = {
    args: {
        title: "Favourite Movies",
        movies: [],
        action: (movie) => <AddToFavouritesIcon {...movie} />,
    },
};
Empty.storyName = "No movies";
