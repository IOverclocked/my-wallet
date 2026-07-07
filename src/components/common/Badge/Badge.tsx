import type { ReactNode } from "react";
import { badge } from "styled-system/recipes";
import type { BadgeVariantProps } from "styled-system/recipes";

export interface BadgeProps extends BadgeVariantProps {
  children: ReactNode;
  className?: string;
}

const Badge = ({ tone, children, className }: BadgeProps) => {
  return (
    <span className={`${badge({ tone })}${className ? ` ${className}` : ""}`}>{children}</span>
  );
};

export default Badge;
