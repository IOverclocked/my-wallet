import type { Meta, StoryObj } from "@storybook/react";
import AccountRow from "./AccountRow";

const meta: Meta<typeof AccountRow> = {
  component: AccountRow,
  title: "Molecules/AccountRow",
};

export default meta;

type Story = StoryObj<typeof AccountRow>;

export const Basic: Story = {
  args: {
    name: "Revolut",
    subtitle: "Main account",
    icon: "Wallet",
    category: "savings",
    balance: 12500,
    currency: "PLN",
  },
};

export const WithGoal: Story = {
  args: {
    name: "Emergency Fund",
    subtitle: "Savings goal",
    icon: "Target",
    category: "savings",
    balance: 8000,
    currency: "PLN",
    goal: 20000,
  },
};
