import type { Meta } from "@storybook/react";
import FantasyMovieList from "@organisms/fantasyMovieList";
import { SampleFantasyMovie } from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";

const meta = {
    title: "Organisms/FantasyMovieList",
    component: FantasyMovieList,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof FantasyMovieList>;

export default meta;

export const Basic = () => {
    const movies = [
        { ...SampleFantasyMovie, id: "a", title: "The Last Lighthouse" },
        { ...SampleFantasyMovie, id: "b", title: "Winter Harbour" },
        { ...SampleFantasyMovie, id: "c", title: "Sixteen Miles Out" },
    ];
    return (
        <Grid container spacing={3}>
            <FantasyMovieList movies={movies} onDelete={() => {}} />
        </Grid>
    );
};
Basic.storyName = "Default";
