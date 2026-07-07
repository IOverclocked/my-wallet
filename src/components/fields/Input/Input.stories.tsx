import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import Icon from "@/components/common/Icon";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Fields/Input",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter value..." },
};

export const WithPrefix: Story = {
  args: {
    placeholder: "Search...",
    prefix: <Icon name="Search" size={18} />,
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: "Password",
    type: "password",
    suffix: <Icon name="Eye" size={18} />,
  },
};

export const AmountVariant: Story = {
  args: { variant: "amount", placeholder: "0.00", inputMode: "decimal" },
};

export const ErrorState: Story = {
  args: { placeholder: "Enter value...", error: true, defaultValue: "bad input" },
};
