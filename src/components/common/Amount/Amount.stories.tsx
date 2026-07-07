import type { Meta, StoryObj } from "@storybook/react";
import Amount from "./Amount";

const meta: Meta<typeof Amount> = {
  component: Amount,
  title: "Atoms/Amount",
};

export default meta;

type Story = StoryObj<typeof Amount>;

export const Income: Story = {
  args: { value: 3500, tone: "income", currency: "PLN" },
};

export const Expense: Story = {
  args: { value: 149.99, tone: "expense", currency: "PLN" },
};

export const Neutral: Story = {
  args: { value: 10000, tone: "neutral", currency: "PLN" },
};

export const BalanceHero: Story = {
  args: { value: 24850.5, tone: "neutral", showCurrency: false, size: "2.5rem", weight: 700 },
};
