import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CategoryTile from "./CategoryTile";

describe("CategoryTile", () => {
  it("renders an svg icon for food category", () => {
    const { container } = render(<CategoryTile category="food" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("sets data-category attribute", () => {
    const { container } = render(<CategoryTile category="transport" />);
    expect(container.firstChild).toHaveAttribute("data-category", "transport");
  });

  it("renders for all categories without crashing", () => {
    const categories = [
      "food",
      "transport",
      "home",
      "shopping",
      "health",
      "fun",
      "bills",
      "savings",
      "salary",
    ] as const;
    categories.forEach((category) => {
      const { container } = render(<CategoryTile category={category} />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });

  it("applies sm size (36px tile)", () => {
    const { container } = render(<CategoryTile category="food" size="sm" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies lg size (56px tile)", () => {
    const { container } = render(<CategoryTile category="food" size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
