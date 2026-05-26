import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className="site-header">
      <h2 className="site-logo">HealthApp</h2>

      <nav className="nav">
        <Link to="/"      className={location.pathname === "/"      ? "active" : ""}>Home</Link>
        <Link to="/sobre"       className={location.pathname === "/sobre"       ? "active" : ""}>Sobre</Link>
        <Link to="/admin/login" className={location.pathname.startsWith("/admin") ? "active" : ""}>Admin</Link>
      </nav>
    </header>
  );
}
