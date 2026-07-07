import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Amount from "./Amount";

describe("Amount", () => {
  it("renders formatted value", () => {
    const { container } = render(<Amount value={1234.5} />);
    expect(container.textContent).toContain("1");
  });

  it("shows + prefix for income tone", () => {
    const { container } = render(<Amount value={500} tone="income" showCurrency={false} />);
    expect(container.textContent).toContain("+");
  });

  it("shows − prefix for expense tone", () => {
    const { container } = render(<Amount value={200} tone="expense" showCurrency={false} />);
    expect(container.textContent).toContain("−");
  });

  it("shows no prefix for neutral tone", () => {
    const { container } = render(<Amount value={100} tone="neutral" showCurrency={false} />);
    expect(container.textContent).not.toContain("+");
    expect(container.textContent).not.toContain("−");
  });

  it("shows currency suffix by default", () => {
    const { getByText } = render(<Amount value={100} currency="PLN" />);
    expect(getByText("PLN")).toBeInTheDocument();
  });

  it("hides currency when showCurrency=false", () => {
    const { queryByText } = render(<Amount value={100} currency="PLN" showCurrency={false} />);
    expect(queryByText("PLN")).toBeNull();
  });

  it("renders fallback for NaN value", () => {
    const { container } = render(<Amount value={NaN} />);
    expect(container.textContent).toContain("—");
  });
});
