import * as React from "react";
import type { SVGProps } from "react";
const SvgPie = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M12 3a9 9 0 1 0 9 9h-9z" />
    <path d="M12 3v9l7.8-4.5A9 9 0 0 0 12 3" />
  </svg>
);
export default SvgPie;
