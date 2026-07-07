import * as React from "react";
import type { SVGProps } from "react";
const SvgLogout = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4m6-4 4-4-4-4m4 4H9" />
  </svg>
);
export default SvgLogout;
