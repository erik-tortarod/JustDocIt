function SelectBtn({
	title,
	children,
	setState,
}: {
	title: React.ReactNode;
	children: any[];
	setState?: Function;
}) {
	return (
		<details className="dropdown">
			<summary className="btn m-1">{title}</summary>
			<ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
				{children.map((child, index) => (
					<li
						key={index}
						className="hover:bg-info"
						onClick={() => setState?.(child)}
					>
						{child}
					</li>
				))}
			</ul>
		</details>
	);
}

export default SelectBtn;
