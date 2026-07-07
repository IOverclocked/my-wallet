import * as React from "react";
import type { SVGProps } from "react";
const SvgCart = (props: SVGProps<SVGSVGElement>) => (
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
    <circle cx={9} cy={20} r={1.5} />
    <circle cx={17} cy={20} r={1.5} />
    <path d="M2 3h2.5l2 12h11l2-8H6" />
  </svg>
);
export default SvgCart;
