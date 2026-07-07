import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Icon from "./Icon";

describe("Icon", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon name="Wallet" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies size prop as width and height", () => {
    const { container } = render(<Icon name="Wallet" size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("returns null for unknown icon name", () => {
    const { container } = render(<Icon name={"Unknown" as never} />);
    expect(container.querySelector("svg")).toBeNull();
  });
});
