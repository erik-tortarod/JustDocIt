import logo from "../../../../public/logo.png";

function Sidebar() {
	return (
		<aside className="col-span-1 px-4 flex flex-col h-dvh fixed shadow-sm shadow-gray-100/10">
			<section className="">
				<a href="" className="flex items-center">
					<img src={logo} alt="" className="w-8" />
					Just Doc It
				</a>
			</section>
			<section className="">
				<h2>General</h2>
				<ul>
					<li>Dashboard</li>
					<li>Documentación</li>
				</ul>
			</section>
			<section className="">
				<h2>Personal</h2>
				<ul>
					<li>Perfil</li>
					<li>Configuración</li>
				</ul>
			</section>
			<section className="flex items-center">
				<img
					src="https://avatars.githubusercontent.com/u/128736440?v=4"
					alt=""
					className="w-10 rounded-full"
				/>
				<div>
					<h4>User name</h4>
					<h4>User email</h4>
				</div>
			</section>
		</aside>
	);
}

export default Sidebar;
