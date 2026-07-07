import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Segment from "./Segment";

const meta: Meta<typeof Segment> = {
  component: Segment,
  title: "Fields/Segment",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Segment>;

export const IncomeSelected: Story = {
  render: () => {
    const [value, setValue] = useState<"income" | "expense">("income");
    return <Segment value={value} onChange={setValue} />;
  },
};

export const ExpenseSelected: Story = {
  render: () => {
    const [value, setValue] = useState<"income" | "expense">("expense");
    return <Segment value={value} onChange={setValue} />;
  },
};
