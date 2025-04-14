import { LanguageIcon } from "../../../assets/images/svg/LanguageIcon";
import { MoonIcon } from "../../../assets/images/svg/MoonIcon";
import { MenuIcon } from "../../../assets/images/svg/MenuIcon";
import logo from "../../../../public/logo.png";
import UserProfile from "../../ui/UserProfile";
import SelectBtn from "../../common/SelectBtn";

function HeaderHero() {
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
							<a>Cómo funciona</a>
							<ul className="p-2">
								<li>
									<a>Documentación</a>
								</li>
								<li>
									<a>Foro</a>
								</li>
							</ul>
						</li>
						<li>
							<a>Dashboard</a>
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
						<details>
							<summary>Cómo funciona</summary>
							<ul className="p-2">
								<li>
									<a>Documentación</a>
								</li>
								<li>
									<a>Foro</a>
								</li>
							</ul>
						</details>
					</li>
					<li>
						<a>Dashboard</a>
					</li>
				</ul>
			</div>
			<div className="navbar-end flex gap-3 lg:pr-6">
				<SelectBtn
					title={<LanguageIcon className="w-10" />}
					children={["Español", "English"]}
				/>
				<MoonIcon className="w-10" />
				<UserProfile />
			</div>
		</div>
	);
}

export default HeaderHero;
