import type { Meta, StoryObj } from "@storybook/react";
import PosterCarousel from "@molecules/posterCarousel";

const meta = {
    title: "Molecules/PosterCarousel",
    component: PosterCarousel,
} satisfies Meta<typeof PosterCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: "Avatar",
        images: [
            { file_path: "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" },
            { file_path: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" },
            { file_path: "/tzsMBxJ8Vj0ne0aicRhoTBhVo7v.jpg" },
            { file_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg" },
            { file_path: "/vgnoTSbLzM4pWEd1uZTUb5FIsCu.jpg" },
            { file_path: "/mQBk6JWRhSXlvmMLl9wcHKQ6grh.jpg" },
        ],
    },
};
Basic.storyName = "Default";

export const Empty: Story = {
    args: {
        title: "Avatar",
        images: [],
    },
};
Empty.storyName = "No posters";
