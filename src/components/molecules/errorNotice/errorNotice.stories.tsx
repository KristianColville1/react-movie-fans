import type { Meta, StoryObj } from "@storybook/react";
import ErrorNotice from "@molecules/errorNotice";
import { MemoryRouter } from "react-router";

const meta = {
    title: "Molecules/ErrorNotice",
    component: ErrorNotice,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/"]}>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof ErrorNotice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotFound: Story = {
    args: {
        status: 404,
        title: "We cannot find that page.",
        message:
            "The page you are looking for does not exist. It may have moved, or the address may be wrong.",
    },
};
NotFound.storyName = "404";

export const ServerError: Story = {
    args: {
        status: 500,
        title: "Something went wrong at our end.",
        message:
            "The page could not be loaded. Try again in a moment, and if it keeps happening it is not you, it is us.",
    },
};
ServerError.storyName = "500";
