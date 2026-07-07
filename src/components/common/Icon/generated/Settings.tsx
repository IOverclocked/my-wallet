import * as React from "react";
import type { SVGProps } from "react";
const SvgSettings = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={12} cy={12} r={3} />
    <path d="M12 2v3m0 14v3m10-10h-3M5 12H2m17 7-2-2M7 7 5 5m14 0-2 2M7 17l-2 2" />
  </svg>
);
export default SvgSettings;
