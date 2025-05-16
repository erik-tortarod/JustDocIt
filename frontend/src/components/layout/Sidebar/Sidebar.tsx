import logo from "../../../../public/logo.png";

//COMPONENTS
import NavSection from "../../ui/NavSection";
import NavLink from "../../ui/NavLink";
import { IUser } from "../../../types/interfaces";
import { Link } from "react-router-dom";

function Sidebar({ userData }: { userData: IUser }) {
	return (
		<aside className="w-64 bg-base-200 border-r border-base-300/10 py-6 flex flex-col h-screen sticky top-0">
			{/* Logo */}
			<div className="flex items-center gap-3 font-bold text-lg px-6 mt-[-2rem] mb-[-1rem]">
				<div className="flex items-center justify-center text-primary">
					<img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
				</div>
				<div className="flex items-center">
					JustDocIt
					<span className="inline-flex items-center bg-gradient-to-r from-secondary to-primary text-white px-2 py-0.5 rounded-full text-[10px] font-semibold ml-2 uppercase tracking-wider">
						<span className="w-1.5 h-1.5 bg-success rounded-full mr-1 animate-pulse"></span>
						Online
					</span>
				</div>
			</div>

			{/* Navegación */}
			<NavSection title="General">
				<NavLink icon="📊" text="Dashboard" active={true} />
				<NavLink icon="📑" text="Proyectos" />
				<NavLink icon="🔄" text="Integraciones" />
			</NavSection>

			<NavSection title="Personal">
				<Link to="/user" className="decoration-transparent">
					<NavLink icon="👤" text="Perfil" />
				</Link>
				<NavLink icon="⚙️" text="Configuración" />
			</NavSection>

			{/* Perfil de usuario */}
			<div className="mt-auto px-6 flex items-center gap-3">
				<div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold overflow-hidden">
					<img src={userData.avatarUrl} alt={userData.username.slice(0, 2)} />
				</div>
				<div className="overflow-hidden">
					<div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
						{userData.username}
					</div>
					<div className="text-xs text-base-content/60 whitespace-nowrap overflow-hidden text-ellipsis">
						{userData.email}
					</div>
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
