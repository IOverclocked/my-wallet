import type { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Fields/Select",
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360, padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = (
  <>
    <option value="">Select category...</option>
    <option value="food">Food</option>
    <option value="transport">Transport</option>
    <option value="home">Home</option>
    <option value="health">Health</option>
  </>
);

export const Default: Story = {
  render: () => <Select>{options}</Select>,
};

export const WithValue: Story = {
  render: () => <Select defaultValue="food">{options}</Select>,
};

export const ErrorState: Story = {
  render: () => <Select error>{options}</Select>,
};
