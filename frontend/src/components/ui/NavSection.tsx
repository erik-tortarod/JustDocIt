import { ReactNode } from "react";

interface INavSectionProps {
	title: string;
	children: ReactNode;
}

function NavSection({ title, children }: INavSectionProps) {
	return (
		<div className="mb-8">
			<h3 className="text-xs uppercase text-base-content/60 font-semibold px-6 mb-2 mt-4">
				{title}
			</h3>
			<nav className="flex flex-col gap-1">{children}</nav>
		</div>
	);
}

export default NavSection;
