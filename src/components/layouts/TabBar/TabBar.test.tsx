import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TabBar from "./TabBar";
import Tab from "@/components/layouts/Tab";

describe("TabBar", () => {
  it("renders nav element", () => {
    const { getByRole } = render(
      <TabBar>
        <Tab icon="Home" label="Home" active />
      </TabBar>,
    );
    expect(getByRole("navigation")).toBeInTheDocument();
  });

  it("renders children tabs", () => {
    const { getAllByRole } = render(
      <TabBar>
        <Tab icon="Home" label="Home" active />
        <Tab icon="List" label="Activity" />
        <Tab icon="Plus" label="Add" fab />
        <Tab icon="Pie" label="Insights" />
        <Tab icon="Wallet" label="Accounts" />
      </TabBar>,
    );
    expect(getAllByRole("button")).toHaveLength(5);
  });

  it("active tab has aria-current=page", () => {
    const { getByText } = render(
      <TabBar>
        <Tab icon="Home" label="Home" active />
        <Tab icon="List" label="Activity" />
      </TabBar>,
    );
    const homeBtn = getByText("Home").closest("button")!;
    expect(homeBtn).toHaveAttribute("aria-current", "page");
  });

  it("fires onClick on tab click", () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <TabBar>
        <Tab icon="Home" label="Home" onClick={handleClick} />
      </TabBar>,
    );
    fireEvent.click(getByText("Home").closest("button")!);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
