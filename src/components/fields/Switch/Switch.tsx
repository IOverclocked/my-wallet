import { css } from "styled-system/css";

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

const wrapperStyle = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "3",
  cursor: "pointer",
  userSelect: "none",
});

const wrapperDisabled = css({
  opacity: 0.45,
  cursor: "not-allowed",
  pointerEvents: "none",
});

const trackBase = css({
  position: "relative",
  w: "44px",
  h: "26px",
  borderRadius: "full",
  bg: "surface3",
  border: "1px solid",
  borderColor: "border",
  transition: "background 200ms ease, border-color 200ms ease",
  flexShrink: 0,
  _focusWithin: {
    boxShadow: "0 0 0 3px token(colors.focusRing)",
    outline: "none",
  },
});

const trackChecked = css({
  bg: "primary",
  borderColor: "primary",
});

const thumbStyle = css({
  position: "absolute",
  top: "2px",
  left: "2px",
  w: "20px",
  h: "20px",
  borderRadius: "full",
  bg: "textMuted",
  transition: "transform 200ms cubic-bezier(0.16,1,0.3,1), background 200ms ease",
  pointerEvents: "none",
});

const thumbChecked = css({
  transform: "translateX(18px)",
  bg: "primaryText",
});

const labelStyle = css({
  fontSize: "sm",
  color: "text",
});

const hiddenInput = css({
  position: "absolute",
  opacity: 0,
  w: "full",
  h: "full",
  cursor: "inherit",
  m: 0,
  p: 0,
});

const Switch = ({ checked, onChange, disabled = false, label }: SwitchProps) => {
  return (
    <label className={`${wrapperStyle}${disabled ? ` ${wrapperDisabled}` : ""}`}>
      <span className={`${trackBase}${checked ? ` ${trackChecked}` : ""}`}>
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className={hiddenInput}
        />
        <span className={`${thumbStyle}${checked ? ` ${thumbChecked}` : ""}`} />
      </span>
      {label && <span className={labelStyle}>{label}</span>}
    </label>
  );
};

export default Switch;
