import type { Meta, StoryObj } from "@storybook/react";
import TransactionRow from "./TransactionRow";

const meta: Meta<typeof TransactionRow> = {
  component: TransactionRow,
  title: "Molecules/TransactionRow",
};

export default meta;

type Story = StoryObj<typeof TransactionRow>;

export const Expense: Story = {
  args: {
    title: "Biedronka",
    category: "food",
    account: "Revolut",
    time: "10:30",
    amount: -45.5,
    currency: "PLN",
  },
};

export const Income: Story = {
  args: {
    title: "Salary — June",
    category: "salary",
    account: "mBank",
    time: "09:00",
    amount: 8500,
    currency: "PLN",
  },
};

export const Recurring: Story = {
  args: {
    title: "Netflix",
    category: "fun",
    account: "Card",
    time: "00:00",
    amount: -49,
    currency: "PLN",
    recurring: true,
  },
};
