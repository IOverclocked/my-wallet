import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: "Atoms/Badge",
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Income: Story = {
  args: { tone: "income", children: "Income" },
};

export const Expense: Story = {
  args: { tone: "expense", children: "Expense" },
};

export const Accent: Story = {
  args: { tone: "accent", children: "New" },
};

export const Neutral: Story = {
  args: { tone: "neutral", children: "Neutral" },
};
