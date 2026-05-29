import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">R</div>
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
              <span className="nav-icon">1</span>
              Resumen
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/config"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">2</span>
              Configuracion
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/homes"
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon">3</span>
              Conexion
            </NavLink>
          </li>
        </ul>
      </nav>

      <section className="control-block">
        <label>Velocidad de simulacion</label>
        <div className="side-actions">
          <button className="secondary compact" type="button">1x</button>
          <button className="primary compact" type="button">2x</button>
          <button className="secondary compact" type="button">3x</button>
        </div>
      </section>
    </aside>
  );
}

export default Navbar;
