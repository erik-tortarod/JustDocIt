import { LanguageIcon } from "../../../assets/images/svg/LanguageIcon";
import { MenuIcon } from "../../../assets/images/svg/MenuIcon";
import logo from "../../../../public/logo.png";
import UserProfile from "../../ui/UserProfile";
import SelectBtn from "../../common/SelectBtn";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function HeaderHero() {
	const { t, i18n } = useTranslation();
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const newTheme = e.target.value;
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

	const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const newLanguage = e.target.value;
		i18n.changeLanguage(newLanguage);
		localStorage.setItem("language", newLanguage);
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<div className="HeaderHero navbar shadow-sm shadow-gray-100/10 w-screen h-16">
			<div className="HeaderHero__start navbar-start">
				<div className="HeaderHero__dropdown dropdown">
					<div
						tabIndex={0}
						role="button"
						className="HeaderHero__menu-btn btn btn-ghost lg:hidden"
					>
						<MenuIcon />
					</div>
					<ul
						tabIndex={0}
						className="HeaderHero__dropdown-content menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<a className="HeaderHero__dropdown-link">
								{t("header.features")}
							</a>
						</li>
						<li>
							<Link to="/proyect_docs" className="HeaderHero__dropdown-link">
								{t("header.documentation")}
							</Link>
						</li>
						<li>
							<Link to="/dashboard" className="HeaderHero__dropdown-link">
								{t("header.dashboard")}
							</Link>
						</li>
					</ul>
				</div>
				<a className="HeaderHero__brand btn btn-ghost text-xl">
					<img src={logo} alt="Logo image" className="HeaderHero__logo w-10" />
					<span className="HeaderHero__brand-text hidden sm:inline">
						JustDocIt
					</span>
				</a>
			</div>
			<div className="HeaderHero__center navbar-center hidden lg:flex">
				<ul className="HeaderHero__menu menu menu-horizontal px-1">
					<li>
						<a className="HeaderHero__menu-link">{t("header.features")}</a>
					</li>
					<li>
						<Link to="/proyect_docs" className="HeaderHero__menu-link">
							{t("header.documentation")}
						</Link>
					</li>
					<li>
						<Link to="/dashboard" className="HeaderHero__menu-link">
							{t("header.dashboard")}
						</Link>
					</li>
				</ul>
			</div>
			<div className="HeaderHero__end navbar-end flex gap-3 lg:pr-6">
				<select
					name="language"
					id="language"
					value={i18n.language}
					onChange={handleLanguageChange}
					className="HeaderHero__theme-select select select-ghost w-35"
				>
					<option value="es">Español 🇪🇸</option>
					<option value="en">English 🇺🇸</option>
				</select>
				<select
					name="theme"
					id="theme"
					value={theme}
					onChange={handleThemeChange}
					className="HeaderHero__theme-select select select-ghost w-25"
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
