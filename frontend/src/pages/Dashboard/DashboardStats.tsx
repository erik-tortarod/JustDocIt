function DashboardStats({
	title,
	amount,
	stat,
}: {
	title: string;
	amount: number;
	stat: string;
}) {
	return (
		<div className="border border-base-content rounded p-6 py-2 pt-0 w-full">
			<h2 className="text-sm mb-2 text-base-content">{title}</h2>
			<h3 className="text-3xl font-bold mb-2">{amount}</h3>
			<h3 className="text-sm flex items-center">{stat}</h3>
		</div>
	);
}

export default DashboardStats;
