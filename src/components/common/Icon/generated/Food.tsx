import * as React from "react";
import type { SVGProps } from "react";
const SvgFood = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M5 3v8m3-8v8m-3 0h3m-1.5 0v10M16 3c-1.5 1-2.5 3-2.5 6 0 2 1 3 2.5 3s2.5-1 2.5-3c0-3-1-5-2.5-6m0 9v9" />
  </svg>
);
export default SvgFood;
