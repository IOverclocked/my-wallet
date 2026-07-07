import { render } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useThemeStore } from "@/stores/useThemeStore";
import ThemeInitializer from "./ThemeInitializer";

describe("ThemeInitializer", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "dark" });
    document.documentElement.removeAttribute("data-theme");
  });

  it("sets data-theme on mount from store", () => {
    render(<ThemeInitializer />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("updates data-theme when store theme changes", () => {
    render(<ThemeInitializer />);
    useThemeStore.getState().setTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
