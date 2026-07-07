import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Switch from "./Switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Fields/Switch",
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Off: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} label="Recurring" />;
  },
};

export const On: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <Switch checked={checked} onChange={setChecked} label="Recurring" />;
  },
};

export const Disabled: Story = {
  args: { checked: false, onChange: () => {}, disabled: true, label: "Disabled" },
};
