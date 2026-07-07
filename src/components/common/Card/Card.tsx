import type { HTMLAttributes, ReactNode } from "react";
import { card } from "styled-system/recipes";
import { cx, css } from "styled-system/css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  flush?: boolean;
  children: ReactNode;
}

const flushStyle = css({ p: "0" });

const Card = ({ elevated, flush, children, className, ...props }: CardProps) => {
  return (
    <div
      className={cx(
        card({ elevated: elevated ? true : undefined }),
        flush && flushStyle,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
