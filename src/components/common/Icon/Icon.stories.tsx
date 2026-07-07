import type { Meta, StoryObj } from "@storybook/react";
import Icon from "./Icon";
import type { IconName } from "./generated";

const ALL_ICONS: IconName[] = [
  "ArrowDown",
  "ArrowRight",
  "ArrowUp",
  "Bank",
  "Bell",
  "Calendar",
  "Car",
  "Card",
  "Cart",
  "Cash",
  "Chart",
  "Check",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "Edit",
  "Eye",
  "EyeOff",
  "Film",
  "Filter",
  "Food",
  "Google",
  "Health",
  "Home",
  "House",
  "List",
  "Lock",
  "Logout",
  "Mail",
  "Moon",
  "More",
  "Note",
  "Pie",
  "Piggy",
  "Plus",
  "Receipt",
  "Repeat",
  "Search",
  "Settings",
  "Sun",
  "Tag",
  "Target",
  "Trash",
  "User",
  "Wallet",
  "X",
];

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Atoms/Icon",
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Single: Story = {
  args: { name: "Wallet", size: 24 },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, padding: 8 }}>
      {ALL_ICONS.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            width: 72,
          }}
        >
          <Icon name={name} size={24} />
          <span style={{ fontSize: 10, color: "var(--colors-text-muted)" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
