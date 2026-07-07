export type Theme = "dark" | "light";

export type ThemeState = {
  theme: Theme;
};

export type ThemeActions = {
  toggle: () => void;
  setTheme: (theme: Theme) => void;
};
