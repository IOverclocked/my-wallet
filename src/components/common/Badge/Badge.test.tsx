import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    const { getByText } = render(<Badge>Income</Badge>);
    expect(getByText("Income")).toBeInTheDocument();
  });

  it("applies income tone class", () => {
    const { container } = render(<Badge tone="income">+</Badge>);
    expect(container.firstChild).toHaveClass("badge");
  });

  it("applies expense tone class", () => {
    const { container } = render(<Badge tone="expense">-</Badge>);
    expect(container.firstChild).toHaveClass("badge");
  });

  it("applies accent tone class", () => {
    const { container } = render(<Badge tone="accent">New</Badge>);
    expect(container.firstChild).toHaveClass("badge");
  });

  it("applies neutral tone by default", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass("badge");
  });
});
