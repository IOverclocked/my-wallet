import * as React from "react";
import type { SVGProps } from "react";
const SvgMore = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.75}
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <circle cx={5} cy={12} r={1.5} />
    <circle cx={12} cy={12} r={1.5} />
    <circle cx={19} cy={12} r={1.5} />
  </svg>
);
export default SvgMore;
