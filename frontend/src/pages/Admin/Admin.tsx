function Admin() {
	const handlePostRequest = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/auth/verify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: "slashguy",
					password: "slashguyspassword",
				}),
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<button onClick={handlePostRequest}>Send Post Request</button>
		</div>
	);
}

export default Admin;
