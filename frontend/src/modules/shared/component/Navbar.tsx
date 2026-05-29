import { NavLink } from "react-router-dom";

function Navbar() {
  const classNameDefault = "px-5 py-1.5 ";
  return (
    <nav className="navbar place-content-center flex flex-col
      font-medium rounded-lg shadow-md
      hover:shadow-indigo-500/20 transition-all duration-200 ease-in-out">
      <ul className="text-lg opacity-70 group-hover:opacity-100 gap-1.5 p-5">
        <li
          className={`${classNameDefault}  m-4 transition-opacity transition-all duration-100 ease-in-out active:scale-90`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${classNameDefault}  ${
                isActive ? "navbar-active" : "navbar-links"
              }`}
          >
            Home
          </NavLink>
        </li>
        <li className=" transition-opacity transition-all duration-100 ease-in-out active:scale-90 ">
          <NavLink
            to="/config"
            className={({ isActive }) =>
              `${classNameDefault} ${
                isActive ? "navbar-active" : "navbar-links"
              }`}
          >
            Config
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
