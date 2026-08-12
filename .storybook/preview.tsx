import type { Preview } from "@storybook/react";
import { fn } from "@storybook/test";
import { StyledEngineProvider } from "@mui/material/styles";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <StyledEngineProvider enableCssLayer>
        <Story />
      </StyledEngineProvider>
    ),
  ],
};

export default preview;
