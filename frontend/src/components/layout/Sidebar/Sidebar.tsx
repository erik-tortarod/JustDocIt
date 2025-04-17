import { ReactNode } from "react";
// Nota: Dejamos la importación del logo, pero lo usaremos de manera diferente
import logo from "../../../../public/logo.png";

// Interfaces para los componentes
interface NavLinkProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  href?: string;
}

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

// Componente para los enlaces de navegación
const NavLink = ({ icon, text, active = false, href = "#" }: NavLinkProps) => {
  return (
    <a 
      href={href}
      className={`flex items-center gap-3 py-2 px-6 text-base-content/70 hover:text-base-content hover:bg-primary/10 transition-all relative ${
        active ? "text-base-content bg-primary/10 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary" : ""
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{text}</span>
    </a>
  );
};

// Componente para las secciones del sidebar
const NavSection = ({ title, children }: NavSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xs uppercase text-base-content/60 font-semibold px-6 mb-2 mt-4">{title}</h3>
      <nav className="flex flex-col gap-1">
        {children}
      </nav>
    </div>
  );
};

function Sidebar() {
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300/10 py-6 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 font-bold text-lg px-6 mt-[-2rem] mb-[-1rem]">
        <div className="flex items-center justify-center text-primary">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </div>
        <div className="flex items-center">
          CodeDocs
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
        <NavLink icon="👤" text="Perfil" />
        <NavLink icon="⚙️" text="Configuración" />
      </NavSection>

      {/* Perfil de usuario */}
      <div className="mt-auto px-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold">
          JS
        </div>
        <div className="overflow-hidden">
          <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            Juan Silva
          </div>
          <div className="text-xs text-base-content/60 whitespace-nowrap overflow-hidden text-ellipsis">
            juan.silva@ejemplo.com
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;