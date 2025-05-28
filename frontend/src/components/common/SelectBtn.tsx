import { useRef, forwardRef, useImperativeHandle } from "react";

function SelectBtn(
	{
		title,
		children,
		setState,
	}: {
		title: React.ReactNode;
		children: any[];
		setState?: Function;
	},
	ref: any,
) {
	const detailsRef = useRef<HTMLDetailsElement>(null);

	// Exponer método para cerrar el dropdown
	useImperativeHandle(ref, () => ({
		close: () => {
			if (detailsRef.current) {
				detailsRef.current.open = false;
			}
		},
	}));

	const handleSelect = (child: any) => {
		if (setState) {
			setState(child);
		}

		// Cerrar el dropdown automáticamente al seleccionar
		if (detailsRef.current) {
			detailsRef.current.open = false;
		}
	};

	return (
		<details className="SelectBtn dropdown dropdown-end" ref={detailsRef}>
			<summary className="SelectBtn__summary btn btn-primary btn-sm gap-2">
				{title}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="SelectBtn__icon h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</summary>
			<ul className="SelectBtn__list dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2 border border-base-300">
				{children.map((child, index) => (
					<li key={index} className="SelectBtn__item">
						<button
							className="SelectBtn__button flex items-center gap-2 px-4 py-2 hover:bg-primary hover:text-primary-content transition-colors duration-200 rounded-md"
							onClick={() => handleSelect(child)}
						>
							<span className="SelectBtn__emoji text-lg">📝</span>
							<span className="SelectBtn__label">{child}</span>
						</button>
					</li>
				))}
			</ul>
		</details>
	);
}

export default forwardRef(SelectBtn);
