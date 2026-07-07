import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select from "./Select";

describe("Select", () => {
  it("renders a select element", () => {
    const { getByRole } = render(<Select />);
    expect(getByRole("combobox")).toBeInTheDocument();
  });

  it("renders options", () => {
    const { getByRole } = render(
      <Select>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
      </Select>,
    );
    expect(getByRole("combobox")).toHaveDisplayValue("Food");
  });

  it("fires onChange on selection", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <Select onChange={handleChange}>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
      </Select>,
    );
    fireEvent.change(getByRole("combobox"), { target: { value: "transport" } });
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop set", () => {
    const { getByRole } = render(<Select disabled />);
    expect(getByRole("combobox")).toBeDisabled();
  });
});
