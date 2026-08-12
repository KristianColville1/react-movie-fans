import type { Meta } from "@storybook/react";
import ActorList from "@organisms/actorList";
import { SampleActor } from "@stories/sampleData";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";

const meta = {
    title: "Organisms/ActorList",
    component: ActorList,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof ActorList>;

export default meta;

export const Basic = () => {
    const actors = [
        { ...SampleActor, id: 1 },
        { ...SampleActor, id: 2 },
        { ...SampleActor, id: 3 },
        { ...SampleActor, id: 4 },
        { ...SampleActor, id: 5 },
    ];
    return (
        <Grid container spacing={5}>
            <ActorList actors={actors} />
        </Grid>
    );
};
Basic.storyName = "Default";
