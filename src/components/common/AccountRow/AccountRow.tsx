import { css } from "styled-system/css";
import CategoryTile from "@/components/common/CategoryTile";
import type { Category } from "@/components/common/CategoryTile";
import Amount from "@/components/common/Amount";
import type { IconName } from "@/components/common/Icon";

export interface AccountRowProps {
  name: string;
  subtitle: string;
  icon: IconName;
  category: Category;
  balance: number;
  currency?: string;
  goal?: number;
  onClick?: () => void;
}

const rowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "3",
  px: "4",
  py: "3",
  borderRadius: "md",
  cursor: "pointer",
  transition: "background 160ms ease",
  _hover: { bg: "surface2" },
});

const textBlockStyle = css({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "1",
});

const nameStyle = css({
  fontSize: "sm",
  fontWeight: "medium",
  color: "text",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const subtitleStyle = css({
  fontSize: "xs",
  color: "textMuted",
});

const progressTrackStyle = css({
  h: "4px",
  borderRadius: "full",
  bg: "surface3",
  overflow: "hidden",
  mt: "1",
});

const progressFillStyle = css({
  h: "full",
  borderRadius: "full",
  bg: "accent",
  transition: "width 400ms ease",
});

const AccountRow = ({
  name,
  subtitle,
  category,
  balance,
  currency = "PLN",
  goal,
  onClick,
}: AccountRowProps) => {
  const progressPct = goal ? Math.min(100, Math.round((balance / goal) * 100)) : null;

  return (
    <div
      role="button"
      tabIndex={0}
      className={rowStyle}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <CategoryTile category={category} size="lg" />
      <div className={textBlockStyle}>
        <span className={nameStyle}>{name}</span>
        <span className={subtitleStyle}>{subtitle}</span>
        {progressPct !== null && (
          <div className={progressTrackStyle} aria-label={`${progressPct}% of goal`}>
            <div className={progressFillStyle} style={{ width: `${progressPct}%` }} />
          </div>
        )}
      </div>
      <Amount value={balance} tone="neutral" currency={currency} />
    </div>
  );
};

export default AccountRow;
