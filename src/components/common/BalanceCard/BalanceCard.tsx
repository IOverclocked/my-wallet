import type { HTMLAttributes, ReactNode } from "react";
import { css, cx } from "styled-system/css";

export interface BalanceCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const balanceCardStyle = css({
  position: "relative",
  borderRadius: "2xl",
  p: "6",
  overflow: "hidden",
  background:
    "linear-gradient(135deg, token(colors.n.900) 0%, token(colors.n.950) 60%, token(colors.n.975) 100%)",
  boxShadow:
    "0 0 0 1px token(colors.border), 0 0 80px -20px token(colors.gold.500), 0 24px 60px -18px oklch(0 0 0 / 0.7)",
  _before: {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background:
      "radial-gradient(ellipse 80% 60% at 50% -20%, oklch(0.800 0.118 87 / 0.12), transparent)",
    pointerEvents: "none",
  },
});

const BalanceCard = ({ children, className, ...props }: BalanceCardProps) => {
  return (
    <div className={cx(balanceCardStyle, className)} {...props}>
      {children}
    </div>
  );
};

export default BalanceCard;
