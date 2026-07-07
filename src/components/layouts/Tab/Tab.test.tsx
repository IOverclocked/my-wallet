import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Tab from "./Tab";

describe("Tab", () => {
  it("renders label", () => {
    const { getByText } = render(<Tab icon="Home" label="Home" />);
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("renders icon svg", () => {
    const { container } = render(<Tab icon="Home" label="Home" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("sets aria-current=page when active", () => {
    const { getByRole } = render(<Tab icon="Home" label="Home" active />);
    expect(getByRole("button")).toHaveAttribute("aria-current", "page");
  });

  it("does not set aria-current when not active", () => {
    const { getByRole } = render(<Tab icon="Home" label="Home" />);
    expect(getByRole("button")).not.toHaveAttribute("aria-current");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Tab icon="Home" label="Home" onClick={handleClick} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders Fab button when fab=true", () => {
    const { getByRole } = render(<Tab icon="Plus" label="Add" fab />);
    expect(getByRole("button")).toHaveAttribute("aria-label", "Add");
  });
});
