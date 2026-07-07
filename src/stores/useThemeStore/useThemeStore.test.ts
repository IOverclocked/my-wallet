import { describe, it, expect, beforeEach, vi } from "vitest";
import { useThemeStore } from "./useThemeStore";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "dark" });
  });

  it("has dark as initial theme", () => {
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("toggle switches dark → light", () => {
    useThemeStore.getState().toggle();
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("toggle switches light → dark", () => {
    useThemeStore.setState({ theme: "light" });
    useThemeStore.getState().toggle();
    expect(useThemeStore.getState().theme).toBe("dark");
  });

  it("setTheme sets given theme", () => {
    useThemeStore.getState().setTheme("light");
    expect(useThemeStore.getState().theme).toBe("light");
  });

  it("sets data-theme attribute on documentElement", () => {
    useThemeStore.getState().setTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
