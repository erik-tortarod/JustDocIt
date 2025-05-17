import { useEffect, useState } from "react";
import { IUser } from "../../types/interfaces";
import Sidebar from "../../components/layout/Sidebar/Sidebar";

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

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex min-h-screen bg-base-100 w-screen">
			<Sidebar userData={userData} />
			<main className="flex-1 bg-base-200 p-8">
				<div className="max-w-4xl mx-auto">
					{/* User Profile Section */}
					<div className="bg-base-100 rounded-box shadow-lg p-8 mb-8">
						<div className="flex items-center gap-8">
							<div className="relative">
								<img
									className="w-32 h-32 rounded-full border-4 border-primary object-cover"
									src={userData?.avatarUrl}
									alt="User Avatar"
								/>
							</div>
							<div>
								<h1 className="text-4xl font-bold mb-2">
									{userData?.username}
								</h1>
								<p className="text-base-content/70 text-lg flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
									{userData?.email}
								</p>
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="stat bg-base-100 rounded-box shadow-lg">
							<div className="stat-figure text-primary text-3xl">📊</div>
							<div className="stat-title">Repositories</div>
							<div className="stat-value">{repositoriesLength}</div>
							<div className="stat-desc">Connected repositories</div>
						</div>
						<div className="stat bg-base-100 rounded-box shadow-lg">
							<div className="stat-figure text-primary text-3xl">📅</div>
							<div className="stat-title">Member Since</div>
							<div className="stat-value text-lg">
								{userData?.createdAt && formatDate(userData.createdAt)}
							</div>
						</div>
						<div className="stat bg-base-100 rounded-box shadow-lg">
							<div className="stat-figure text-primary text-3xl">⚙️</div>
							<div className="stat-title">Preferences</div>
							<div className="stat-value text-lg">
								{userData?.preferences.theme &&
									capitalize(userData.preferences.theme)}
							</div>
							<div className="stat-desc">Current theme</div>
						</div>
					</div>

					{/* Recent Activities */}
					<div className="bg-base-100 rounded-box shadow-lg p-8">
						<h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Recent Activities
						</h2>
						<div className="space-y-4">
							<div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg transition-all hover:bg-base-300">
								<div className="text-primary text-3xl">📄</div>
								<div className="flex-1">
									<p className="font-semibold">
										Updated documentation for{" "}
										<span className="text-primary">"my-project"</span>
									</p>
									<p className="text-sm text-base-content/70">March 10, 2023</p>
								</div>
								<div className="badge badge-primary">Documentation</div>
							</div>
							<div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg transition-all hover:bg-base-300">
								<div className="text-primary text-3xl">🔗</div>
								<div className="flex-1">
									<p className="font-semibold">
										Connected new repository{" "}
										<span className="text-primary">"awesome-repo"</span>
									</p>
									<p className="text-sm text-base-content/70">March 8, 2023</p>
								</div>
								<div className="badge badge-secondary">Integration</div>
							</div>
							<div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg transition-all hover:bg-base-300">
								<div className="text-primary text-3xl">🎨</div>
								<div className="flex-1">
									<p className="font-semibold">
										Changed theme to <span className="text-primary">Dark</span>
									</p>
									<p className="text-sm text-base-content/70">March 5, 2023</p>
								</div>
								<div className="badge badge-accent">Settings</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default User;
