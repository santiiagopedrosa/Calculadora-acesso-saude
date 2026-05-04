import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header
      style={{
        padding: "20px",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>Meu Site</h2>

      <nav className="nav">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/sobre"
          className={location.pathname === "/sobre" ? "active" : ""}
        >
          Sobre
        </Link>

        <Link
          to="/contacto"
          className={location.pathname === "/contacto" ? "active" : ""}
        >
          Contacto
        </Link>
      </nav>
    </header>
  );
}