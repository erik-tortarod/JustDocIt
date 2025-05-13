import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="currentColor"
		{...props}
	>
		<path
			fillRule="evenodd"
			d="M12.79 4.21a.75.75 0 00-1.06-1.06L8 6.94 4.27 3.21a.75.75 0 00-1.06 1.06L6.94 8l-3.73 3.73a.75.75 0 101.06 1.06L8 9.06l3.73 3.73a.75.75 0 001.06-1.06L9.06 8l3.73-3.79z"
			clipRule="evenodd"
		/>
	</svg>
);
