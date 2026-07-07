import * as React from "react";
import type { SVGProps } from "react";
const SvgCar = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M5 16h14M4 16l1.5-6a2 2 0 0 1 1.9-1.5h9.2a2 2 0 0 1 1.9 1.5l1.5 6M4 16v3m16-3v3" />
    <circle cx={7.5} cy={16} r={1.4} />
    <circle cx={16.5} cy={16} r={1.4} />
  </svg>
);
export default SvgCar;
