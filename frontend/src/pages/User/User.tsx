import { useEffect, useState } from "react";
import { IUser } from "../../types/interfaces";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import useValidation from "@/hooks/useValidation";
import { API_ROUTES } from "@/config/api-routes";
import { motion } from "framer-motion";
import ActivityService from "@/services/ActivitiesService";

interface Activity {
	id: string;
	description: string;
	category: string;
	timestamp: string;
	userId: string;
}

function User() {
	useEffect(() => {
		const checkValidation = async () => {
			const validation = new useValidation();
			const isExpired = await validation.validateToken();

			if (isExpired) {
				window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
			}
		};

		checkValidation();
	}, []);

	const [userData, setUserData] = useState<IUser>();
	const [activities, setActivities] = useState<Activity[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userDataStr = localStorage.getItem("userData");
		if (userDataStr) {
			const userData = JSON.parse(userDataStr) as IUser;
			console.log(userData);
			setUserData(userData);
		}
	}, []);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await ActivityService.getActivities();
				// Sort activities by timestamp in descending order (newest first)
				const sortedActivities = response.sort(
					(a, b) =>
						new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
				);
				setActivities(sortedActivities);
			} catch (error) {
				console.error("Error fetching activities:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchActivities();
	}, []);

	const capitalize = (str: string): string => {
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

		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		return `${days[date.getDay()]}, ${date.getDate()} de ${
			months[date.getMonth()]
		} ${date.getFullYear()} a las ${hours}:${minutes}`;
	};

	const getActivityIcon = (category: string) => {
		switch (category.toLowerCase()) {
			case "documentation":
				return "📄";
			case "integration":
				return "🔗";
			case "settings":
				return "⚙️";
			default:
				return "📌";
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "documentation":
				return "text-info";
			case "integration":
				return "text-success";
			case "settings":
				return "text-warning";
			default:
				return "text-primary";
		}
	};

	const getCategoryBadge = (category: string) => {
		switch (category.toLowerCase()) {
			case "documentation":
				return "badge-info";
			case "integration":
				return "badge-success";
			case "settings":
				return "badge-warning";
			default:
				return "badge-primary";
		}
	};

	const formatDescription = (description: string, category: string) => {
		return description.split(/(\*\*.*?\*\*)/).map((part, index) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				return (
					<span
						key={index}
						className={`${getCategoryColor(category)} font-bold`}
					>
						{part.slice(2, -2)}
					</span>
				);
			}
			return part;
		});
	};

	if (!userData) {
		return (
			<motion.div
				className="flex justify-center items-center h-screen w-screen"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<span className="loading loading-infinity w-50"></span>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="flex min-h-screen bg-base-100 w-screen"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Sidebar userData={userData} />
			<motion.main
				className="flex-1 bg-base-200 p-8 pl-16 md:pl-0"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div className="max-w-4xl mx-auto">
					{/* User Profile Section */}
					<motion.div
						className="bg-base-100 rounded-box shadow-lg p-8 mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<div className="flex items-center gap-8">
							<motion.div
								className="relative"
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300 }}
							>
								<img
									className="w-32 h-32 rounded-full border-4 border-primary object-cover"
									src={userData?.avatarUrl}
									alt="User Avatar"
								/>
							</motion.div>
							<div>
								<motion.h1
									className="text-4xl font-bold mb-2"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.4 }}
								>
									{userData?.username}
								</motion.h1>
								<motion.p
									className="text-base-content/70 text-lg flex items-center gap-2"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: 0.5 }}
								>
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
								</motion.p>
							</div>
						</div>
					</motion.div>

					{/* Stats Grid */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<motion.div
							className="stat bg-base-100 rounded-box shadow-lg"
							whileHover={{
								scale: 1.02,
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							}}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<div className="stat-title">Repositories 📚</div>
							<div className="stat-value">{repositoriesLength}</div>
							<div className="stat-desc">Connected repositories</div>
						</motion.div>
						<motion.div
							className="stat bg-base-100 rounded-box shadow-lg"
							whileHover={{
								scale: 1.02,
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							}}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<div className="stat-title">Member Since 📅</div>
							<div className="stat-value text-lg">
								{userData?.createdAt && formatDate(userData.createdAt)}
							</div>
						</motion.div>
						<motion.div
							className="stat bg-base-100 rounded-box shadow-lg"
							whileHover={{
								scale: 1.02,
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
							}}
							transition={{ type: "spring", stiffness: 300 }}
						>
							<div className="stat-title">Preferences 🔧</div>
							<div className="stat-value text-lg">
								{capitalize(localStorage.getItem("theme") || "Default")}
							</div>
							<div className="stat-desc">Current theme</div>
						</motion.div>
					</motion.div>

					{/* Recent Activities */}
					<motion.div
						className="bg-base-100 rounded-box shadow-lg p-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						<motion.h2
							className="text-2xl font-bold mb-6 flex items-center gap-3"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.8 }}
						>
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
						</motion.h2>
						<motion.div
							className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.9 }}
						>
							{loading ? (
								<div className="flex justify-center items-center p-8">
									<span className="loading loading-spinner loading-lg"></span>
								</div>
							) : activities.length > 0 ? (
								<>
									{activities.slice(0, 3).map((activity) => (
										<motion.div
											key={activity.id}
											className="flex items-center gap-4 p-4 bg-base-200 rounded-lg transition-all hover:bg-base-300"
											whileHover={{ scale: 1.02, x: 10 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="text-primary text-3xl">
												{getActivityIcon(activity.category)}
											</div>
											<div className="flex-1">
												<p className="font-semibold">
													{formatDescription(
														activity.description,
														activity.category,
													)}
												</p>
												<p className="text-sm text-base-content/70">
													{formatDate(activity.timestamp)}
												</p>
											</div>
											<div
												className={`badge ${getCategoryBadge(
													activity.category,
												)}`}
											>
												{capitalize(activity.category)}
											</div>
										</motion.div>
									))}
									{activities.length > 3 && (
										<div className="divider text-base-content/50">
											More activities
										</div>
									)}
									{activities.slice(3).map((activity) => (
										<motion.div
											key={activity.id}
											className="flex items-center gap-4 p-4 bg-base-200 rounded-lg transition-all hover:bg-base-300"
											whileHover={{ scale: 1.02, x: 10 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="text-primary text-3xl">
												{getActivityIcon(activity.category)}
											</div>
											<div className="flex-1">
												<p className="font-semibold">
													{formatDescription(
														activity.description,
														activity.category,
													)}
												</p>
												<p className="text-sm text-base-content/70">
													{formatDate(activity.timestamp)}
												</p>
											</div>
											<div
												className={`badge ${getCategoryBadge(
													activity.category,
												)}`}
											>
												{capitalize(activity.category)}
											</div>
										</motion.div>
									))}
								</>
							) : (
								<div className="text-center p-8 text-base-content/70">
									No activities found
								</div>
							)}
						</motion.div>
					</motion.div>
				</div>
			</motion.main>
		</motion.div>
	);
}

export default User;
