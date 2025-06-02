import { Link } from "react-router-dom";

function UserProfile() {
	const userData = localStorage.getItem("userData");
	const parsedUserData = userData ? JSON.parse(userData) : null;

	return (
		<Link to="/user">
			<img
				className="w-10 rounded-full"
				src={
					parsedUserData?.avatarUrl
						? parsedUserData.avatarUrl
						: "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
				}
				alt="User Avatar"
			/>
		</Link>
	);
}

export default UserProfile;
