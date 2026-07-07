import * as React from "react";
import type { SVGProps } from "react";
const SvgCash = (props: SVGProps<SVGSVGElement>) => (
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
    <rect width={20} height={12} x={2} y={6} rx={2.5} />
    <circle cx={12} cy={12} r={2.5} />
    <path d="M6 9.5v5m12-5v5" />
  </svg>
);
export default SvgCash;
