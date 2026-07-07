import { css } from "styled-system/css";

export const fabStyles = css({
  width: "60px",
  height: "60px",
  borderRadius: "full",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  bg: "primary",
  color: "primaryText",
  border: "none",
  cursor: "pointer",
  shadow: "lg",
  transition: "transform 220ms cubic-bezier(0.16,1,0.3,1)",
  _hover: { transform: "translateY(-2px) scale(1.03)" },
  _active: { transform: "scale(0.96)" },
});
