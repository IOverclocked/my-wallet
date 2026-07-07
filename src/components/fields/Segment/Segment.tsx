import { css, cx } from "styled-system/css";

export interface SegmentProps {
  value: "income" | "expense";
  onChange: (value: "income" | "expense") => void;
}

const trackStyle = css({
  display: "flex",
  bg: "surface2",
  border: "1px solid",
  borderColor: "border",
  borderRadius: "md",
  p: "1",
  gap: "1",
});

const tabBase = css({
  flex: 1,
  h: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2",
  fontSize: "sm",
  fontWeight: "medium",
  color: "textMuted",
  borderRadius: "sm",
  border: "none",
  bg: "transparent",
  cursor: "pointer",
  transition: "all 180ms ease",
  _hover: { color: "text" },
  _focusVisible: { outline: "none", boxShadow: "0 0 0 3px token(colors.focusRing)" },
});

const tabIncome = css({
  color: "incomeFg",
  bg: "incomeSoft",
});

const tabExpense = css({
  color: "expenseFg",
  bg: "expenseSoft",
});

const Segment = ({ value, onChange }: SegmentProps) => {
  return (
    <div role="tablist" className={trackStyle}>
      <button
        role="tab"
        aria-selected={value === "income"}
        className={cx(tabBase, value === "income" && tabIncome)}
        onClick={() => onChange("income")}
      >
        + Income
      </button>
      <button
        role="tab"
        aria-selected={value === "expense"}
        className={cx(tabBase, value === "expense" && tabExpense)}
        onClick={() => onChange("expense")}
      >
        − Expense
      </button>
    </div>
  );
};

export default Segment;
