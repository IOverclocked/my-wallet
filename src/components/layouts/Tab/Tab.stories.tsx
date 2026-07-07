import type { Meta, StoryObj } from "@storybook/react";
import Tab from "./Tab";

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: "Layouts/Tab",
  decorators: [
    (Story) => (
      <div style={{ display: "flex", background: "var(--colors-surface)", height: 64 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: { icon: "Home", label: "Home" },
};

export const Active: Story = {
  args: { icon: "Home", label: "Home", active: true },
};

export const FabSlot: Story = {
  args: { icon: "Plus", label: "Add", fab: true },
};
