import type { Meta, StoryObj } from "@storybook/react";
import ThemeInitializer from "./ThemeInitializer";

const meta: Meta<typeof ThemeInitializer> = {
  component: ThemeInitializer,
  title: "common/ThemeInitializer",
};

export default meta;

type Story = StoryObj<typeof ThemeInitializer>;

export const Default: Story = {};
