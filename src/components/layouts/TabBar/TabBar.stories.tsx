import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TabBar from "./TabBar";
import Tab from "@/components/layouts/Tab";

const meta: Meta<typeof TabBar> = {
  component: TabBar,
  title: "Layouts/TabBar",
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

type NavItem = "home" | "activity" | "insights" | "accounts";

const NavBar = ({ initial }: { initial: NavItem }) => {
  const [active, setActive] = useState<NavItem>(initial);

  return (
    <TabBar>
      <Tab icon="Home" label="Home" active={active === "home"} onClick={() => setActive("home")} />
      <Tab
        icon="List"
        label="Activity"
        active={active === "activity"}
        onClick={() => setActive("activity")}
      />
      <Tab icon="Plus" label="Add" fab />
      <Tab
        icon="Pie"
        label="Insights"
        active={active === "insights"}
        onClick={() => setActive("insights")}
      />
      <Tab
        icon="Wallet"
        label="Accounts"
        active={active === "accounts"}
        onClick={() => setActive("accounts")}
      />
    </TabBar>
  );
};

export const HomeActive: Story = {
  render: () => <NavBar initial="home" />,
};

export const ActivityActive: Story = {
  render: () => <NavBar initial="activity" />,
};
