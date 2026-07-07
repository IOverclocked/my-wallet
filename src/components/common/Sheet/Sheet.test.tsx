import { render, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Sheet from "./Sheet";

describe("Sheet", () => {
  it("renders children when open", () => {
    const { getByText } = render(
      <Sheet open onClose={() => {}}>
        <p>Sheet content</p>
      </Sheet>,
    );
    expect(getByText("Sheet content")).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    const { queryByRole } = render(
      <Sheet open={false} onClose={() => {}}>
        <p>Sheet content</p>
      </Sheet>,
    );
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    const handleClose = vi.fn();
    const { container } = render(
      <Sheet open onClose={handleClose}>
        <p>Content</p>
      </Sheet>,
    );
    const overlay = container.querySelector('[aria-hidden="true"]')!;
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledOnce();
  });

  it("has role=dialog when open", () => {
    const { getByRole } = render(
      <Sheet open onClose={() => {}}>
        <p>Content</p>
      </Sheet>,
    );
    expect(getByRole("dialog")).toBeInTheDocument();
  });
});
