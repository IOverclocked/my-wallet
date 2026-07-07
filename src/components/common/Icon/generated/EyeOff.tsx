import * as React from "react";
import type { SVGProps } from "react";
const SvgEyeOff = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="m3 3 18 18M10.6 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.3 3.9M6.3 6.4A17 17 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.3-.5" />
    <path d="M9.5 9.5a3 3 0 0 0 4.2 4.2" />
  </svg>
);
export default SvgEyeOff;
