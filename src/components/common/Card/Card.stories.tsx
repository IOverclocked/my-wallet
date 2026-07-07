import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "Atoms/Card",
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { children: "Card content goes here." },
};

export const Elevated: Story = {
  args: { elevated: true, children: "Elevated card with shadow." },
};

export const Flush: Story = {
  args: { flush: true, children: "Flush card — no padding." },
};
