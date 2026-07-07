import type { SVGProps } from "react";
import * as icons from "./generated";
import type { IconName } from "./generated";

export type { IconName };

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
}

const Icon = ({ name, size = 20, ...props }: IconProps) => {
  const IconComponent = icons[name as keyof typeof icons] as React.FC<SVGProps<SVGSVGElement>>;
  if (!IconComponent) return null;
  return <IconComponent width={size} height={size} {...props} />;
};

export default Icon;
