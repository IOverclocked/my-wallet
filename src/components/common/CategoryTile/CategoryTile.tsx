import { css, cx } from "styled-system/css";
import Icon from "@/components/common/Icon";
import type { IconName } from "@/components/common/Icon";

export type Category =
  | "food"
  | "transport"
  | "home"
  | "shopping"
  | "health"
  | "fun"
  | "bills"
  | "savings"
  | "salary";

export interface CategoryTileProps {
  category: Category;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const CATEGORY_META: Record<Category, { icon: IconName; color: string }> = {
  food: { icon: "Food", color: "token(colors.cat.food)" },
  transport: { icon: "Car", color: "token(colors.cat.transport)" },
  home: { icon: "House", color: "token(colors.cat.home)" },
  shopping: { icon: "Cart", color: "token(colors.cat.shopping)" },
  health: { icon: "Health", color: "token(colors.cat.health)" },
  fun: { icon: "Film", color: "token(colors.cat.fun)" },
  bills: { icon: "Receipt", color: "token(colors.cat.bills)" },
  savings: { icon: "Piggy", color: "token(colors.cat.savings)" },
  salary: { icon: "Cash", color: "token(colors.income)" },
};

const SIZE_MAP = {
  sm: { tile: 36, icon: 18 },
  md: { tile: 44, icon: 22 },
  lg: { tile: 56, icon: 28 },
};

const tileBase = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "md",
  flexShrink: 0,
});

const CategoryTile = ({ category, size = "md", className }: CategoryTileProps) => {
  const meta = CATEGORY_META[category] ?? {
    icon: "Tag" as IconName,
    color: "token(colors.textMuted)",
  };
  const { tile, icon } = SIZE_MAP[size];

  const tileStyle = css({
    w: `${tile}px`,
    h: `${tile}px`,
    bg: `color-mix(in oklch, ${meta.color} 18%, transparent)`,
    color: meta.color,
  });

  return (
    <span className={cx(tileBase, tileStyle, className)} data-category={category}>
      <Icon name={meta.icon} size={icon} />
    </span>
  );
};

export default CategoryTile;
