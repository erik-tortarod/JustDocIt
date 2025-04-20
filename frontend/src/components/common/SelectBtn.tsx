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
		<details className="dropdown" ref={detailsRef}>
			<summary className="btn m-1">{title}</summary>
			<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
				{children.map((child, index) => (
					<li
						key={index}
						className="hover:bg-info"
						onClick={() => handleSelect(child)}
					>
						{child}
					</li>
				))}
			</ul>
		</details>
	);
}

export default forwardRef(SelectBtn);
