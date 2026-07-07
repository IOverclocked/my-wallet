import * as React from "react";
import type { SVGProps } from "react";
const SvgFilm = (props: SVGProps<SVGSVGElement>) => (
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
    <rect width={18} height={16} x={3} y={4} rx={2.5} />
    <path d="M3 9h18M3 15h18M8 4v16m8-16v16" />
  </svg>
);
export default SvgFilm;
