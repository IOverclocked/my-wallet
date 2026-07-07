import type { SelectHTMLAttributes } from "react";
import { css, cx } from "styled-system/css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const selectStyle = css({
  w: "full",
  h: "48px",
  px: "4",
  bg: "surface2",
  border: "1px solid",
  borderColor: "border",
  borderRadius: "md",
  fontSize: "sm",
  color: "text",
  fontFamily: "sans",
  outline: "none",
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23595954' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  pr: "10",
  cursor: "pointer",
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  _focus: {
    borderColor: "accent",
    boxShadow: "0 0 0 3px token(colors.focusRing)",
  },
  _disabled: { opacity: 0.45, cursor: "not-allowed" },
});

const selectError = css({
  borderColor: "expenseFg",
  _focus: {
    borderColor: "expenseFg",
    boxShadow: "0 0 0 3px token(colors.expenseSoft)",
  },
});

const Select = ({ error, className, children, ...props }: SelectProps) => {
  return (
    <select className={cx(selectStyle, error && selectError, className)} {...props}>
      {children}
    </select>
  );
};

export default Select;
