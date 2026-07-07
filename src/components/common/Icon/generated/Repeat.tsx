import * as React from "react";
import type { SVGProps } from "react";
const SvgRepeat = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M4 9a5 5 0 0 1 5-5h8m3 4-3-4m3 11a5 5 0 0 1-5 5H7m-3-4 3 4" />
  </svg>
);
export default SvgRepeat;
