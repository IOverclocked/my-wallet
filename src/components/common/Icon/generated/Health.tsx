import * as React from "react";
import type { SVGProps } from "react";
const SvgHealth = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M3 12h4l2-5 3 11 3-8 2 2h4" />
  </svg>
);
export default SvgHealth;
