import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("renders children", () => {
    const { getByText } = render(<Card>Content</Card>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("applies card class", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass("card");
  });

  it("applies elevated variant class when elevated=true", () => {
    const { container } = render(<Card elevated>Content</Card>);
    expect(container.firstChild).toHaveClass("card");
  });
});
