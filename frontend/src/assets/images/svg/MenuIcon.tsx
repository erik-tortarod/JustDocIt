import { SVGProps } from "react";

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		{...props}
	>
		{" "}
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M4 6h16M4 12h8m-8 6h16"
		/>{" "}
	</svg>
);
