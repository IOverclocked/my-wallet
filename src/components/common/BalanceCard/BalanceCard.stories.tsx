import type { Meta, StoryObj } from "@storybook/react";
import BalanceCard from "./BalanceCard";

const meta: Meta<typeof BalanceCard> = {
  component: BalanceCard,
  title: "Atoms/BalanceCard",
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof BalanceCard>;

export const Default: Story = {
  render: () => (
    <BalanceCard>
      <p style={{ color: "var(--colors-text-muted)", fontSize: "0.75rem", marginBottom: 4 }}>
        Total balance
      </p>
      <p
        style={{
          color: "var(--colors-text)",
          fontSize: "2rem",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
        }}
      >
        24 850,00 PLN
      </p>
    </BalanceCard>
  ),
};
