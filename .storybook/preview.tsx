import type { Preview, Decorator } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import "../app/globals.css";

const withDesignSystem: Decorator = (Story, context) => {
  const theme = (context.globals?.theme as string) ?? "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <Story />;
};

const preview: Preview = {
  decorators: [withDesignSystem],

  globalTypes: {
    theme: {
      name: "Theme",
      description: "Design system theme",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
