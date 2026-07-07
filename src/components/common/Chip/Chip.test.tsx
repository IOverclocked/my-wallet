import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Chip from "./Chip";

describe("Chip", () => {
  it("renders children", () => {
    const { getByText } = render(<Chip>All</Chip>);
    expect(getByText("All")).toBeInTheDocument();
  });

  it("sets aria-pressed=false by default", () => {
    const { getByRole } = render(<Chip>All</Chip>);
    expect(getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("sets aria-pressed=true when pressed", () => {
    const { getByRole } = render(<Chip pressed>All</Chip>);
    expect(getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Chip onClick={handleClick}>All</Chip>);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
