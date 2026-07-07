import * as React from "react";
import type { SVGProps } from "react";
const SvgPiggy = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M3 12a6 6 0 0 1 6-6h4a6 6 0 0 1 6 5l2 1v3l-2 .5a6 6 0 0 1-3 3.5v2h-3v-1.5h-2V21H8v-2.2A6 6 0 0 1 3 13z" />
    <circle cx={8} cy={11} r={1} />
    <path d="M11 6V4h3" />
  </svg>
);
export default SvgPiggy;
