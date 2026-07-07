import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Field from "./Field";

describe("Field", () => {
  it("renders label", () => {
    const { getByText } = render(
      <Field label="Amount">
        <input />
      </Field>,
    );
    expect(getByText("Amount")).toBeInTheDocument();
  });

  it("renders children", () => {
    const { getByRole } = render(
      <Field>
        <input />
      </Field>,
    );
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    const { getByText } = render(
      <Field helper="Enter amount in PLN">
        <input />
      </Field>,
    );
    expect(getByText("Enter amount in PLN")).toBeInTheDocument();
  });

  it("renders error text as alert", () => {
    const { getByRole } = render(
      <Field error="Required">
        <input />
      </Field>,
    );
    expect(getByRole("alert")).toHaveTextContent("Required");
  });

  it("prefers error over helper when both provided", () => {
    const { getByRole, queryByText } = render(
      <Field error="Required" helper="Some hint">
        <input />
      </Field>,
    );
    expect(getByRole("alert")).toHaveTextContent("Required");
    expect(queryByText("Some hint")).not.toBeInTheDocument();
  });
});
