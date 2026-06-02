import { LayoutDashboard, Recycle, Settings, Wifi } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Recycle size={22} aria-hidden="true" strokeWidth={2.2} />
        </div>
        <div>
          <strong>Simulador</strong>
          <span>Reciclaje de cables</span>
        </div>
      </div>

      <nav className="nav" aria-label="Principal">
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">
                <LayoutDashboard size={18} aria-hidden="true" />
              </span>
              Resumen
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/config"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">
                <Settings size={18} aria-hidden="true" />
              </span>
              Configuracion
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/connection"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">
                <Wifi size={18} aria-hidden="true" />
              </span>
              Red
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;
