import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TransactionRow from "./TransactionRow";

const baseProps = {
  title: "Biedronka",
  category: "food" as const,
  account: "Revolut",
  time: "10:30",
  amount: -45.5,
  currency: "PLN",
};

describe("TransactionRow", () => {
  it("renders title", () => {
    const { getByText } = render(<TransactionRow {...baseProps} />);
    expect(getByText("Biedronka")).toBeInTheDocument();
  });

  it("renders account and time", () => {
    const { container } = render(<TransactionRow {...baseProps} />);
    expect(container.textContent).toContain("Revolut");
    expect(container.textContent).toContain("10:30");
  });

  it("renders amount with expense tone for negative amount", () => {
    const { container } = render(<TransactionRow {...baseProps} amount={-45.5} />);
    expect(container.textContent).toContain("45");
  });

  it("renders amount with income tone for positive amount", () => {
    const { container } = render(<TransactionRow {...baseProps} amount={3500} />);
    expect(container.textContent).toContain("3");
  });

  it("shows recurring badge when recurring=true", () => {
    const { container } = render(<TransactionRow {...baseProps} recurring />);
    expect(container.querySelector(".badge")).toBeInTheDocument();
  });

  it("does not show recurring badge by default", () => {
    const { container } = render(<TransactionRow {...baseProps} />);
    expect(container.querySelector(".badge")).not.toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<TransactionRow {...baseProps} onClick={handleClick} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
