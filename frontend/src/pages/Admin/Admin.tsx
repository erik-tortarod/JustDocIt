import LdapLoginForm from "./LdapLoginForm";
import AdminContent from "./AdminContent";
import { useState } from "react";

function Admin() {
	const [authenticated, setAuthenticated] = useState<boolean>(false);

	return (
		<div className="w-screen p-4">
			{!authenticated && <LdapLoginForm authentication={setAuthenticated} />}
			{authenticated && <AdminContent />}
		</div>
	);
}

export default Admin;
