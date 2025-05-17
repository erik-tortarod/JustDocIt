import { useEffect, useState } from "react";
import { IUser } from "../../types/interfaces";

function User() {
	const [userData, setUserData] = useState<IUser>();
	useEffect(() => {
		const userDataStr = localStorage.getItem("userData");
		if (userDataStr) {
			const userData = JSON.parse(userDataStr) as IUser;
			console.log(userData);
			setUserData(userData);
		}
	}, []);

	const capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	};

	const repositoriesLength = localStorage.getItem("addedRepositoriesLength");

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const days = [
			"Domingo",
			"Lunes",
			"Martes",
			"Miércoles",
			"Jueves",
			"Viernes",
			"Sábado",
		];
		const months = [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		];

		return `${days[date.getDay()]}, ${date.getDate()} de ${
			months[date.getMonth()]
		} ${date.getFullYear()}`;
	};

	return (
		<div className="min-h-screen bg-base-200 p-6 w-screen">
			<div className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-lg p-6">
				{/* User Profile Section */}
				<div className="flex items-center gap-6 mb-8">
					<img
						className="w-24 h-24 rounded-full border-4 border-primary"
						src={userData?.avatarUrl}
						alt="User Avatar"
					/>
					<div>
						<h1 className="text-3xl font-bold">{userData?.username}</h1>
						<p className="text-base-content/70 text-sm">{userData?.email}</p>
					</div>
				</div>

				{/* User Details Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
					<div className="card bg-base-100 shadow-lg rounded-lg">
						<div className="card-body">
							<h2 className="card-title text-2xl font-bold text-primary mb-2">
								Account Details
							</h2>
							<p className="text-base-content/80 text-lg">
								<strong>Username:</strong> {userData?.username}
							</p>
							<p className="text-base-content/80 text-lg">
								<strong>Joined:</strong>{" "}
								{userData?.createdAt && formatDate(userData.createdAt)}
							</p>
							<p className="text-base-content/80 text-lg">
								<strong>Repositories:</strong> {repositoriesLength} connected
							</p>
						</div>
					</div>
					<div className="card bg-base-100 shadow-lg rounded-lg">
						<div className="card-body">
							<h2 className="card-title text-2xl font-bold text-primary mb-2">
								Preferences
							</h2>
							<p className="text-base-content/80 text-lg">
								<strong>Theme:</strong>{" "}
								{userData?.preferences.theme &&
									capitalize(userData.preferences.theme)}
							</p>
							<p className="text-base-content/80 text-lg">
								<strong>Language:</strong>{" "}
								{userData?.preferences.language &&
									capitalize(userData.preferences.language)}
							</p>
						</div>
					</div>
				</div>

				{/* User Activities Section */}
				<div>
					<h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
					<ul className="list-none space-y-4">
						<li className="p-4 bg-base-200 rounded-lg shadow-md flex items-center gap-4">
							<div className="text-primary text-3xl">📄</div>
							<div>
								<p>
									<span className="font-semibold">Updated documentation</span>{" "}
									for repository{" "}
									<span className="text-primary">"my-project"</span>
								</p>
								<p className="text-sm text-base-content/70">
									<span className="text-secondary">March 10, 2023</span>
								</p>
							</div>
						</li>
						<li className="p-4 bg-base-200 rounded-lg shadow-md flex items-center gap-4">
							<div className="text-primary text-3xl">🔗</div>
							<div>
								<p>
									<span className="font-semibold">
										Connected new repository
									</span>{" "}
									<span className="text-primary">"awesome-repo"</span>
								</p>
								<p className="text-sm text-base-content/70">
									<span className="text-secondary">March 8, 2023</span>
								</p>
							</div>
						</li>
						<li className="p-4 bg-base-200 rounded-lg shadow-md flex items-center gap-4">
							<div className="text-primary text-3xl">🎨</div>
							<div>
								<p>
									<span className="font-semibold">Changed theme</span> to{" "}
									<span className="text-primary">Dark</span>
								</p>
								<p className="text-sm text-base-content/70">
									<span className="text-secondary">March 5, 2023</span>
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default User;
