import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { devtools, persist } from "zustand/middleware";
import type { Theme, ThemeState, ThemeActions } from "./types";

type ThemeStore = ThemeState & ThemeActions;

const STORAGE_KEY = "mw-theme";
const DEFAULT_THEME: Theme = "dark";

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;

  document.documentElement.dataset.theme = theme;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;

  const stored = localStorage.getItem(STORAGE_KEY);

  return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: getInitialTheme(),

        setTheme: (theme: Theme) => {
          applyTheme(theme);
          set({ theme }, false, "setTheme");
        },

        toggle: () => {
          set(
            (state) => {
              const next: Theme = state.theme === "dark" ? "light" : "dark";
              applyTheme(next);
              return { theme: next };
            },
            false,
            "toggle",
          );
        },
      }),
      { name: STORAGE_KEY },
    ),
  ),
);

export const useTheme = () =>
  useThemeStore(useShallow((s) => ({ theme: s.theme, toggle: s.toggle, setTheme: s.setTheme })));
