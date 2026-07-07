import { css, cx } from "styled-system/css";

export interface AmountProps {
  value: number;
  currency?: string;
  showCurrency?: boolean;
  tone?: "income" | "expense" | "neutral";
  size?: string;
  weight?: number;
  className?: string;
}

const formatter = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const wrapperBase = css({
  display: "inline-flex",
  alignItems: "baseline",
  gap: "1",
  fontFamily: "mono",
  fontVariantNumeric: "tabular-nums",
});

const incomeColor = css({ color: "incomeFg" });
const expenseColor = css({ color: "expenseFg" });

const currencyStyle = css({
  fontSize: "0.7em",
  color: "textSubtle",
});

const FALLBACK = "—";

const Amount = ({
  value,
  currency = "PLN",
  showCurrency = true,
  tone = "neutral",
  size,
  weight,
  className,
}: AmountProps) => {
  if (isNaN(value)) {
    return (
      <span className={cx(wrapperBase, className)} style={{ fontSize: size, fontWeight: weight }}>
        {FALLBACK}
      </span>
    );
  }

  const absValue = Math.abs(value);
  const formatted = formatter.format(absValue);
  let prefix = "";

  if (tone === "income") prefix = "+";
  else if (tone === "expense") prefix = "−";

  return (
    <span
      className={cx(
        wrapperBase,
        tone === "income" && incomeColor,
        tone === "expense" && expenseColor,
        className,
      )}
      style={{ fontSize: size, fontWeight: weight }}
    >
      <span>
        {prefix}
        {formatted}
      </span>
      {showCurrency && <span className={currencyStyle}>{currency}</span>}
    </span>
  );
};

export default Amount;
