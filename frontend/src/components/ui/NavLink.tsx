import { ReactNode } from "react";

interface INavLinkProps {
	icon: ReactNode;
	text: string;
	active?: boolean;
	href?: string;
}

function NavLink({ icon, text, active = false, href = "#" }: INavLinkProps) {
	return (
		<div>
			<a
				href={href}
				className={`flex items-center gap-3 py-2 px-6 text-base-content/70 hover:text-base-content hover:bg-primary/10 transition-all relative ${
					active
						? "text-base-content bg-primary/10 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary decoration-none"
						: ""
				}`}
			>
				<span className="text-xl">{icon}</span>
				<span>{text}</span>
			</a>
		</div>
	);
}

export default NavLink;
