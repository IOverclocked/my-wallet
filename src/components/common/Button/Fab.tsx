import type { ButtonHTMLAttributes } from "react";
import { fabStyles } from "./Button.styles";
import Icon from "@/components/common/Icon";

interface FabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
}

const Fab = ({ className, children, ...props }: FabProps) => {
  return (
    <button className={`${fabStyles}${className ? ` ${className}` : ""}`} {...props}>
      {children ?? <Icon name="Plus" size={26} />}
    </button>
  );
};

export default Fab;
