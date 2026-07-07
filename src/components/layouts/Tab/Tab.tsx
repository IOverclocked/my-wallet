import { css, cx } from "styled-system/css";
import Icon from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";
import { Fab } from "@/components/common/Button";

export interface TabProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
  fab?: boolean;
}

const tabStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1",
  flex: 1,
  minW: 0,
  h: "full",
  border: "none",
  bg: "transparent",
  cursor: "pointer",
  color: "textMuted",
  transition: "color 160ms ease",
  _hover: { color: "text" },
  _focusVisible: { outline: "none", boxShadow: "0 0 0 2px token(colors.focusRing)" },
});

const tabActive = css({ color: "accent" });

const labelStyle = css({
  fontSize: "2xs",
  fontWeight: "medium",
  lineHeight: 1,
});

const fabSlotStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  position: "relative",
});

const fabFloatStyle = css({
  position: "absolute",
  bottom: "calc(50% - 10px)",
});

const Tab = ({ icon, label, active = false, onClick, fab = false }: TabProps) => {
  if (fab) {
    return (
      <span className={fabSlotStyle}>
        <Fab aria-label={label} className={fabFloatStyle} onClick={onClick} />
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cx(tabStyle, active && tabActive)}
      onClick={onClick}
    >
      <Icon name={icon} size={22} />
      <span className={labelStyle}>{label}</span>
    </button>
  );
};

export default Tab;
