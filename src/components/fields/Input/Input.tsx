import type { InputHTMLAttributes, ReactNode } from "react";
import { css, cx } from "styled-system/css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "amount";
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: boolean;
}

const groupStyle = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

const inputBase = css({
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
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  _placeholder: { color: "textSubtle" },
  _focus: {
    borderColor: "accent",
    boxShadow: "0 0 0 3px token(colors.focusRing)",
  },
  _disabled: { opacity: 0.45, cursor: "not-allowed" },
});

const inputError = css({
  borderColor: "expenseFg",
  _focus: {
    borderColor: "expenseFg",
    boxShadow: "0 0 0 3px token(colors.expenseSoft)",
  },
});

const inputAmount = css({
  h: "64px",
  fontSize: "2xl",
  fontFamily: "mono",
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
  px: "5",
});

const prefixStyle = css({
  position: "absolute",
  left: "4",
  color: "textMuted",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
});

const suffixStyle = css({
  position: "absolute",
  right: "4",
  color: "textMuted",
  display: "flex",
  alignItems: "center",
});

const inputWithPrefix = css({ pl: "10" });
const inputWithSuffix = css({ pr: "10" });

const Input = ({ variant = "default", prefix, suffix, error, className, ...props }: InputProps) => {
  const isAmount = variant === "amount";

  return (
    <div className={groupStyle}>
      {prefix && <span className={prefixStyle}>{prefix}</span>}
      <input
        className={cx(
          inputBase,
          isAmount && inputAmount,
          error && inputError,
          prefix && !isAmount && inputWithPrefix,
          suffix && !isAmount && inputWithSuffix,
          className,
        )}
        {...props}
      />
      {suffix && <span className={suffixStyle}>{suffix}</span>}
    </div>
  );
};

export default Input;
