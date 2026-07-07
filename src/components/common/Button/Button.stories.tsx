import type { Meta, StoryObj } from "@storybook/react";
import { Button, Fab } from "./index";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Atoms/Button",
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "Primary" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Ghost" } };
export const Danger: Story = { args: { variant: "danger", children: "Danger" } };

export const Small: Story = { args: { size: "sm", children: "Small" } };
export const Medium: Story = { args: { size: "md", children: "Medium" } };
export const Large: Story = { args: { size: "lg", children: "Large" } };

export const FullWidth: Story = { args: { fullWidth: true, children: "Full Width" } };
export const Loading: Story = { args: { loading: true, children: "Loading..." } };
export const Disabled: Story = { args: { disabled: true, children: "Disabled" } };

export const FAB: Story = {
  render: () => <Fab aria-label="Add transaction" />,
};
