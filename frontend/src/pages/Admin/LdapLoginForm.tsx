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
	const [showPassword, setShowPassword] = useState<boolean>(false);

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
			className="flex flex-col gap-6 max-w-md mx-auto"
			onSubmit={(e) => handleFormSubmit(e)}
		>
			{errorMessage && (
				<div className="alert alert-error shadow-lg">
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
					<span>{errorMessage}</span>
				</div>
			)}
			<div className="form-control">
				<label className="label">
					<span className="label-text text-base">Username</span>
				</label>
				<div className="relative">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
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
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</span>
					<input
						type="text"
						value={ldapUser.username}
						onChange={(e) =>
							setLdapUser({ ...ldapUser, username: e.target.value })
						}
						placeholder="Enter your username"
						className="input input-bordered w-full pl-10"
					/>
				</div>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text text-base">Password</span>
				</label>
				<div className="relative">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
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
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</span>
					<input
						type={showPassword ? "text" : "password"}
						value={ldapUser.password}
						onChange={(e) =>
							setLdapUser({ ...ldapUser, password: e.target.value })
						}
						placeholder="Enter your password"
						className="input input-bordered w-full pl-10 pr-12"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-sm"
					>
						{showPassword ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>
			<button type="submit" className="btn btn-primary w-full mt-4">
				<span className="flex items-center justify-center gap-2">
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
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
					Unlock Admin Panel
				</span>
			</button>
		</form>
	);
}

export default LdapLoginForm;
