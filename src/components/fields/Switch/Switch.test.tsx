import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Switch from "./Switch";

describe("Switch", () => {
  it("renders with correct role", () => {
    const { getByRole } = render(<Switch checked={false} onChange={() => {}} />);
    expect(getByRole("switch")).toBeInTheDocument();
  });

  it("is unchecked when checked=false", () => {
    const { getByRole } = render(<Switch checked={false} onChange={() => {}} />);
    expect(getByRole("switch")).not.toBeChecked();
  });

  it("is checked when checked=true", () => {
    const { getByRole } = render(<Switch checked={true} onChange={() => {}} />);
    expect(getByRole("switch")).toBeChecked();
  });

  it("calls onChange with true when toggled from off", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Switch checked={false} onChange={handleChange} />);
    fireEvent.click(getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with false when toggled from on", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Switch checked={true} onChange={handleChange} />);
    fireEvent.click(getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it("does not fire onChange when disabled", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Switch checked={false} onChange={handleChange} disabled />);
    expect(getByRole("switch")).toBeDisabled();
  });

  it("renders label when provided", () => {
    const { getByText } = render(<Switch checked={false} onChange={() => {}} label="Recurring" />);
    expect(getByText("Recurring")).toBeInTheDocument();
  });
});
