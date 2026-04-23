import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function linkClass(path) {
    return location.pathname === path
      ? "nav-link nav-link-custom active"
      : "nav-link nav-link-custom";
  }

  return (
    <nav className="navbar navbar-expand-lg app-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand brand-custom" to="/home">
          <img
            src="/images/logo.png"
            alt="Restaurant Reviews"
            className="brand-logo"
          />
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse navbar-collapse-custom" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-list-custom">
            <li className="nav-item">
              <Link className={linkClass("/home")} to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className={linkClass("/create-review")} to="/create-review">
                Crear reseña
              </Link>
            </li>

            <li className="nav-item">
              <Link className={linkClass("/profile")} to="/profile">
                Perfil
              </Link>
            </li>
          </ul>

          <button className="btn logout-btn" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;