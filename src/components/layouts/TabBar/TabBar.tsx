import type { ReactNode } from "react";
import { css } from "styled-system/css";

export interface TabBarProps {
  children: ReactNode;
}

const barStyle = css({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  h: "64px",
  display: "flex",
  alignItems: "stretch",
  bg: "oklch(from token(colors.surface) l c h / 0.85)",
  backdropFilter: "blur(20px) saturate(1.6)",
  borderTop: "1px solid",
  borderColor: "border",
  zIndex: 100,
  paddingBottom: "env(safe-area-inset-bottom)",
  WebkitAppRegion: "no-drag",
} as object);

const TabBar = ({ children }: TabBarProps) => {
  return (
    <nav aria-label="Main navigation" className={barStyle}>
      {children}
    </nav>
  );
};

export default TabBar;
