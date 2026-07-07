import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    const { getByRole } = render(<Input />);
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("renders prefix", () => {
    const { getByText } = render(<Input prefix={<span>€</span>} />);
    expect(getByText("€")).toBeInTheDocument();
  });

  it("renders suffix", () => {
    const { getByText } = render(<Input suffix={<span>PLN</span>} />);
    expect(getByText("PLN")).toBeInTheDocument();
  });

  it("fires onChange", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(<Input onChange={handleChange} />);
    fireEvent.change(getByRole("textbox"), { target: { value: "100" } });
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it("applies error styling class", () => {
    const { getByRole } = render(<Input error />);
    const input = getByRole("textbox");
    expect(input.className).toContain("border");
  });

  it("is disabled when disabled prop set", () => {
    const { getByRole } = render(<Input disabled />);
    expect(getByRole("textbox")).toBeDisabled();
  });
});
