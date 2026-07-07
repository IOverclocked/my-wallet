import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import AccountRow from "./AccountRow";

const baseProps = {
  name: "Revolut",
  subtitle: "Main account",
  icon: "Wallet" as const,
  category: "savings" as const,
  balance: 12500,
  currency: "PLN",
};

describe("AccountRow", () => {
  it("renders account name", () => {
    const { getByText } = render(<AccountRow {...baseProps} />);
    expect(getByText("Revolut")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    const { getByText } = render(<AccountRow {...baseProps} />);
    expect(getByText("Main account")).toBeInTheDocument();
  });

  it("renders balance", () => {
    const { container } = render(<AccountRow {...baseProps} />);
    expect(container.textContent).toContain("12");
  });

  it("does not show progress bar without goal", () => {
    const { container } = render(<AccountRow {...baseProps} />);
    expect(container.querySelector('[aria-label*="% of goal"]')).not.toBeInTheDocument();
  });

  it("shows progress bar when goal is provided", () => {
    const { container } = render(<AccountRow {...baseProps} goal={25000} />);
    expect(container.querySelector('[aria-label*="% of goal"]')).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<AccountRow {...baseProps} onClick={handleClick} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
