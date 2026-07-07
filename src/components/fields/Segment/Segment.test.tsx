import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Segment from "./Segment";

describe("Segment", () => {
  it("renders tablist with two tabs", () => {
    const { getAllByRole } = render(<Segment value="income" onChange={() => {}} />);
    expect(getAllByRole("tab")).toHaveLength(2);
  });

  it("marks income tab as selected when value=income", () => {
    const { getAllByRole } = render(<Segment value="income" onChange={() => {}} />);
    const [income, expense] = getAllByRole("tab");
    expect(income).toHaveAttribute("aria-selected", "true");
    expect(expense).toHaveAttribute("aria-selected", "false");
  });

  it("marks expense tab as selected when value=expense", () => {
    const { getAllByRole } = render(<Segment value="expense" onChange={() => {}} />);
    const [income, expense] = getAllByRole("tab");
    expect(income).toHaveAttribute("aria-selected", "false");
    expect(expense).toHaveAttribute("aria-selected", "true");
  });

  it("calls onChange with income when income tab clicked", () => {
    const handleChange = vi.fn();
    const { getAllByRole } = render(<Segment value="expense" onChange={handleChange} />);
    fireEvent.click(getAllByRole("tab")[0]);
    expect(handleChange).toHaveBeenCalledWith("income");
  });

  it("calls onChange with expense when expense tab clicked", () => {
    const handleChange = vi.fn();
    const { getAllByRole } = render(<Segment value="income" onChange={handleChange} />);
    fireEvent.click(getAllByRole("tab")[1]);
    expect(handleChange).toHaveBeenCalledWith("expense");
  });
});
