import LdapLoginForm from "./LdapLoginForm";
import AdminContent from "./AdminContent";
import { useState, useEffect } from "react";
import AuthService from "@/services/AuthService";
import StorageService from "@/services/StorageService";
import useValidation from "@/hooks/useValidation";
import { API_ROUTES } from "@/config/api-routes";

function Admin() {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		const initializeAdmin = async () => {
			try {
				// Primero procesar los parámetros de URL para obtener el token si existe
				const authResult = await AuthService.processUrlParams();

				if (!authResult.sucess) {
					setError(authResult.error);
					setLoading(false);
					return;
				}

				// Verificar si hay un token después de procesar los parámetros
				if (!StorageService.getToken()) {
					setError("You have not logged in yet");
					setLoading(false);
					return;
				}

				// Validar el token con el backend
				const validation = new useValidation();
				const isExpired = await validation.validateToken();

				if (isExpired) {
					window.location.href = `${API_ROUTES.AUTH.LOGIN}`;
					return;
				}

				// Verificar autenticación LDAP
				const ldapResponse = await fetch(API_ROUTES.AUTH.LDAP, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${StorageService.getToken()}`,
					},
				});

				if (!ldapResponse.ok) {
					setAuthenticated(false);
					setLoading(false);
					return;
				}

				const ldapData = await ldapResponse.json();
				if (ldapData.authenticated) {
					setAuthenticated(true);
				} else {
					setAuthenticated(false);
				}
			} catch (error) {
				console.error(`Error: ${error}`);
				setError(`Error : ${error}`);
			} finally {
				setLoading(false);
			}
		};

		initializeAdmin();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen w-screen">
				<span className="loading loading-infinity w-50"></span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen w-screen">
				<div className="text-error">{error}</div>
			</div>
		);
	}

	return (
		<div className="w-screen p-4">
			{!authenticated && <LdapLoginForm authentication={setAuthenticated} />}
			{authenticated && <AdminContent />}
		</div>
	);
}

export default Admin;
