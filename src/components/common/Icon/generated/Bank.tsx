import * as React from "react";
import type { SVGProps } from "react";
const SvgBank = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="m3 9 9-5 9 5M4 9v9m16-9v9M8 9v9m8-9v9M3 21h18" />
  </svg>
);
export default SvgBank;
