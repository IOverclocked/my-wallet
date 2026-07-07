import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("applies btn class", () => {
    const { getByRole } = render(<Button>Click</Button>);
    expect(getByRole("button")).toHaveClass("btn");
  });

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled=true", () => {
    const { getByRole } = render(<Button disabled>Click</Button>);
    expect(getByRole("button")).toBeDisabled();
  });

  it("is disabled when loading=true", () => {
    const { getByRole } = render(<Button loading>Click</Button>);
    expect(getByRole("button")).toBeDisabled();
  });

  it("does not fire onClick when disabled", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>,
    );
    fireEvent.click(getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("sets aria-busy when loading", () => {
    const { getByRole } = render(<Button loading>Click</Button>);
    expect(getByRole("button")).toHaveAttribute("aria-busy", "true");
  });
});
