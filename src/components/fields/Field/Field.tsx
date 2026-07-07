import type { ReactNode } from "react";
import { css } from "styled-system/css";

export interface FieldProps {
  label?: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}

const wrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5",
});

const labelStyle = css({
  fontSize: "xs",
  fontWeight: "medium",
  color: "textMuted",
  letterSpacing: "0.02em",
});

const helperStyle = css({
  fontSize: "xs",
  color: "textSubtle",
});

const errorStyle = css({
  fontSize: "xs",
  color: "expenseFg",
});

const Field = ({ label, helper, error, children }: FieldProps) => {
  return (
    <div className={wrapperStyle}>
      {label && <label className={labelStyle}>{label}</label>}
      {children}
      {error ? (
        <span role="alert" className={errorStyle}>
          {error}
        </span>
      ) : helper ? (
        <span className={helperStyle}>{helper}</span>
      ) : null}
    </div>
  );
};

export default Field;
