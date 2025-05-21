import { LanguageIcon } from "../../../assets/images/svg/LanguageIcon";
import { MenuIcon } from "../../../assets/images/svg/MenuIcon";
import logo from "../../../../public/logo.png";
import UserProfile from "../../ui/UserProfile";
import SelectBtn from "../../common/SelectBtn";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

function HeaderHero() {
	const [theme, setTheme] = useState("light");

	const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);
	};

	useEffect(() => {
		const setGlobalTheme = () => {
			const body = document.querySelector("body");

			if (body) {
				body.setAttribute("data-theme", theme);
				localStorage.setItem("theme", theme);
			}
		};

		setGlobalTheme();
	}, [theme]);

	return (
		<div className="navbar shadow-sm shadow-gray-100/10 w-screen h-16">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<MenuIcon />
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a>Características</a>
						</li>
						<li>
							<Link to="/proyect_docs">Documentation</Link>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl">
					<img src={logo} alt="Logo image" className="w-10" />
					JustDocIt
				</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>Características</a>
					</li>
					<li>
						<Link to="/proyect_docs">Documentation</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end flex gap-3 lg:pr-6">
				<SelectBtn
					title={<LanguageIcon className="w-10" />}
					children={["Español", "English"]}
				/>
				<select
					name="theme"
					id="theme"
					onChange={(e) => handleThemeChange(e)}
					className="select select-ghost w-25"
				>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
					<option value="dim">Dim</option>
					<option value="autumn">Autumn</option>
					<option value="abyss">Abyss</option>
				</select>
				<UserProfile />
			</div>
		</div>
	);
}

export default HeaderHero;
