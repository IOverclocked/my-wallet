"use client";

import { useEffect } from "react";
import { useTheme } from "@/stores/useThemeStore";

const ThemeInitializer = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
};

export default ThemeInitializer;
