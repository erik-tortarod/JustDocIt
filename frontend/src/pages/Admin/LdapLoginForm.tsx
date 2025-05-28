import React, { useState } from "react";
import { API_ROUTES } from "../../config/api-routes";

interface ILdapUser {
	username: string;
	password: string;
}

function LdapLoginForm({
	authentication,
}: {
	authentication: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [ldapUser, setLdapUser] = useState<ILdapUser>({
		username: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const url = API_ROUTES.AUTH.LDAP;

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: ldapUser.username,
					password: ldapUser.password,
				}),
			});

			const data = await response.json();

			if (data.authenticated) {
				authentication(true);
			} else {
				setErrorMessage("Invalid credentials");
				setTimeout(() => setErrorMessage(null), 1500);
			}
		} catch (error) {
			console.error("Error: ", error);
			setErrorMessage("An error occurred");
			setTimeout(() => setErrorMessage(null), 1500);
		}
	};

	return (
		<form
			className="flex flex-col gap-4 p-4 bg-base-200 rounded-lg shadow-md"
			onSubmit={(e) => handleFormSubmit(e)}
		>
			{errorMessage && (
				<div className="text-red-500 text-sm">{errorMessage}</div>
			)}
			<input
				type="text"
				value={ldapUser.username}
				onChange={(e) => setLdapUser({ ...ldapUser, username: e.target.value })}
				placeholder="Username"
				className="input input-bordered w-full"
			/>
			<input
				type="password"
				value={ldapUser.password}
				onChange={(e) => setLdapUser({ ...ldapUser, password: e.target.value })}
				placeholder="Password"
				className="input input-bordered w-full"
			/>
			<input type="submit" value="Unlock" className="btn btn-primary w-full" />
		</form>
	);
}

export default LdapLoginForm;
