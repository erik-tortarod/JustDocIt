import { SVGProps } from "react";

export const ExternalLinkIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
   >
      <path d="M3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z" />
      <path d="M6.22 3.22a.75.75 0 011.06 0l9.25 9.25a.75.75 0 11-1.06 1.06L6.22 4.28a.75.75 0 010-1.06z" />
   </svg>
);
