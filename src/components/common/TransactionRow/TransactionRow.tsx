import { css } from "styled-system/css";
import CategoryTile from "@/components/common/CategoryTile";
import type { Category } from "@/components/common/CategoryTile";
import Amount from "@/components/common/Amount";
import Badge from "@/components/common/Badge";
import Icon from "@/components/common/Icon";

export interface TransactionRowProps {
  title: string;
  category: Category;
  account: string;
  time: string;
  amount: number;
  currency?: string;
  recurring?: boolean;
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
  gap: "0.5",
});

const titleRowStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "2",
});

const titleStyle = css({
  fontSize: "sm",
  fontWeight: "medium",
  color: "text",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const metaStyle = css({
  fontSize: "xs",
  color: "textMuted",
  display: "flex",
  alignItems: "center",
  gap: "1",
});

const recurringIconStyle = css({ color: "textSubtle" });

const TransactionRow = ({
  title,
  category,
  account,
  time,
  amount,
  currency = "PLN",
  recurring = false,
  onClick,
}: TransactionRowProps) => {
  const tone = amount >= 0 ? "income" : "expense";

  return (
    <div
      role="button"
      tabIndex={0}
      className={rowStyle}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <CategoryTile category={category} size="md" />
      <div className={textBlockStyle}>
        <div className={titleRowStyle}>
          <span className={titleStyle}>{title}</span>
          {recurring && (
            <Badge tone="neutral">
              <Icon name="Repeat" size={10} className={recurringIconStyle} />
            </Badge>
          )}
        </div>
        <span className={metaStyle}>
          {account} · {time}
        </span>
      </div>
      <Amount value={Math.abs(amount)} tone={tone} currency={currency} />
    </div>
  );
};

export default TransactionRow;
