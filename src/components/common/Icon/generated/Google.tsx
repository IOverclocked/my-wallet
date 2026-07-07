import * as React from "react";
import type { SVGProps } from "react";
const SvgGoogle = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M21 12.2c0-.7-.06-1.2-.18-1.8H12v3.4h5.1c-.1.9-.66 2.2-1.9 3.1l-.02.1 2.76 2.1.2.02C19.9 17.5 21 15.1 21 12.2" />
    <path d="M12 21c2.5 0 4.6-.8 6.1-2.2l-2.9-2.2c-.8.5-1.8.9-3.2.9-2.4 0-4.5-1.6-5.2-3.8l-.1.01-2.9 2.2-.04.1A9 9 0 0 0 12 21" />
    <path d="M6.8 13.7a5.5 5.5 0 0 1 0-3.5l-.04-.2-2.93-2.2-.1.04A9 9 0 0 0 3 12c0 1.45.35 2.82.96 4.04z" />
    <path d="M12 6.6c1.7 0 2.85.74 3.5 1.36l2.56-2.5A8.8 8.8 0 0 0 12 3a9 9 0 0 0-8.07 4.84L6.8 10.2c.7-2.15 2.8-3.6 5.2-3.6" />
  </svg>
);
export default SvgGoogle;
