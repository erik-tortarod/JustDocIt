import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminContent() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleGetReport = async () => {
		try {
			setLoading(true);
			setError(null);
			const url = "http://localhost:8082/api/reports/users";

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch report");
			}

			// Get the blob from the response
			const blob = await response.blob();

			// Create a URL for the blob
			const url2 = window.URL.createObjectURL(blob);

			// Create a temporary link element
			const link = document.createElement("a");
			link.href = url2;
			link.setAttribute("download", "user-report.pdf");

			// Append to body, click and remove
			document.body.appendChild(link);
			link.click();
			link.remove();

			// Clean up the URL
			window.URL.revokeObjectURL(url2);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-8">
			<div className="card bg-base-100 shadow-xl">
				<div className="card-body">
					<div className="flex justify-between items-center">
						<h2 className="card-title">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							System Reports
						</h2>
						<button
							onClick={() => navigate("/dashboard")}
							className="btn btn-ghost gap-2"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							Exit to Dashboard
						</button>
					</div>
					<p className="text-base-content/70">
						Download comprehensive reports about system usage, user statistics,
						and documentation progress.
					</p>
					<div className="card-actions justify-end mt-4">
						<button
							className="btn btn-primary"
							onClick={handleGetReport}
							disabled={loading}
						>
							{loading ? (
								<span className="loading loading-spinner"></span>
							) : (
								<span className="flex items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
									Download User Report
								</span>
							)}
						</button>
					</div>
					{error && (
						<div className="alert alert-error mt-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>{error}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default AdminContent;
