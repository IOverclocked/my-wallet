import type { Meta, StoryObj } from "@storybook/react";
import CategoryTile from "./CategoryTile";

const meta: Meta<typeof CategoryTile> = {
  component: CategoryTile,
  title: "Atoms/CategoryTile",
};

export default meta;

type Story = StoryObj<typeof CategoryTile>;

export const Food: Story = { args: { category: "food", size: "md" } };
export const Transport: Story = { args: { category: "transport", size: "md" } };
export const Home: Story = { args: { category: "home", size: "md" } };
export const Shopping: Story = { args: { category: "shopping", size: "md" } };
export const Health: Story = { args: { category: "health", size: "md" } };
export const Fun: Story = { args: { category: "fun", size: "md" } };
export const Bills: Story = { args: { category: "bills", size: "md" } };
export const Savings: Story = { args: { category: "savings", size: "md" } };
export const Salary: Story = { args: { category: "salary", size: "md" } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <CategoryTile category="food" size="sm" />
      <CategoryTile category="food" size="md" />
      <CategoryTile category="food" size="lg" />
    </div>
  ),
};
