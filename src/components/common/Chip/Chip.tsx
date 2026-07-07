import type { ReactNode } from "react";
import { css, cx } from "styled-system/css";

export interface ChipProps {
  pressed?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const chipBase = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "1.5",
  h: "32px",
  px: "3",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "medium",
  border: "1px solid",
  borderColor: "border",
  bg: "surface2",
  color: "textMuted",
  cursor: "pointer",
  transition: "all 160ms ease",
  _hover: { borderColor: "borderStrong", color: "text" },
  _focusVisible: { outline: "none", boxShadow: "0 0 0 3px token(colors.focusRing)" },
});

const chipPressed = css({
  bg: "text",
  color: "bg",
  borderColor: "text",
  _hover: { bg: "text", color: "bg" },
});

const Chip = ({ pressed = false, onClick, children, className }: ChipProps) => {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(chipBase, pressed && chipPressed, className)}
    >
      {children}
    </button>
  );
};

export default Chip;
