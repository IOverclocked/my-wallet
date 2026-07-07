import * as React from "react";
import type { SVGProps } from "react";
const SvgSun = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={12} cy={12} r={4} />
    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17-7-1.5 1.5m-11 11L5 19m14 0-1.5-1.5m-11-11L5 5" />
  </svg>
);
export default SvgSun;
