import * as React from "react";
import type { SVGProps } from "react";
const SvgNote = (props: SVGProps<SVGSVGElement>) => (
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
    <rect width={16} height={18} x={4} y={3} rx={2.5} />
    <path d="M8 8h8m-8 4h8m-8 4h5" />
  </svg>
);
export default SvgNote;
