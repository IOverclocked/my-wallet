import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BalanceCard from "./BalanceCard";

describe("BalanceCard", () => {
  it("renders children", () => {
    const { getByText } = render(<BalanceCard>Balance content</BalanceCard>);
    expect(getByText("Balance content")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(<BalanceCard>test</BalanceCard>);
    expect(container.firstChild).toBeInTheDocument();
  });
});
