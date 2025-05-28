import { useState } from "react";

function AdminContent() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

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
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

			<div className="p-6 rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-4">Informes</h2>
				<p className="text-gray-600 mb-4">
					Descarga el informe de usuarios del sistema en formato PDF.
				</p>

				<button
					className="btn btn-info"
					onClick={handleGetReport}
					disabled={loading}
				>
					{loading ? "Cargando..." : "Descargar Informe de Usuarios"}
				</button>

				{error && <div className="text-red-500 mt-2">{error}</div>}
			</div>
		</div>
	);
}

export default AdminContent;
