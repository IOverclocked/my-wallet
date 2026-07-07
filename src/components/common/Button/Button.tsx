import type { ButtonHTMLAttributes, ReactNode } from "react";
import { button, type ButtonVariantProps } from "styled-system/recipes";
import { cx } from "styled-system/css";
import Icon from "@/components/common/Icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantProps {
  children?: ReactNode;
  fullWidth?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
}

const Button = ({
  variant,
  size,
  fullWidth,
  iconOnly,
  loading,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cx(
        button({ variant, size }),
        fullWidth ? "btn--full" : "",
        iconOnly ? "btn--icon" : "",
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Icon name="More" size={18} /> : children}
    </button>
  );
};

export default Button;
