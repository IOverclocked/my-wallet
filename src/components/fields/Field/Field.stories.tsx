import type { Meta, StoryObj } from "@storybook/react";
import Field from "./Field";

const meta: Meta<typeof Field> = {
  component: Field,
  title: "Fields/Field",
};

export default meta;

type Story = StoryObj<typeof Field>;

export const WithLabel: Story = {
  args: {
    label: "Amount",
    children: <input style={{ width: "100%" }} placeholder="0.00" />,
  },
};

export const WithHelper: Story = {
  args: {
    label: "Note",
    helper: "Optional — max 120 characters",
    children: <input style={{ width: "100%" }} placeholder="Add a note..." />,
  },
};

export const WithError: Story = {
  args: {
    label: "Amount",
    error: "Amount is required",
    children: <input style={{ width: "100%" }} placeholder="0.00" />,
  },
};
