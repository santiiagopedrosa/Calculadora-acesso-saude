import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Termos from "./pages/Termos";
import Fontes from "./pages/Fontes";
import Contacto from "./pages/Contacto";
import Sobre from "./pages/Sobre";
import Result from "./pages/Result";
import Calc1 from "./pages/Calc1";
import Calc2 from "./pages/Calc2";

import AdminLogin from "./pages/admin/Login";
import Approve from "./pages/admin/Approve";
import Dashboard from "./pages/admin/Dashboard";
import AdminGuard from "./components/AdminGuard";

import { createVisitor } from "./utils/api";

function App() {
  useEffect(() => {
    const initVisitor = async () => {
      const existing = localStorage.getItem("visitorId");
      if (existing) {
        const res = await fetch(`http://localhost:3001/visitor/${existing}`).catch(() => null);
        if (res && res.ok) return;
        localStorage.removeItem("visitorId");
      }
      const id = await createVisitor();
      if (id) localStorage.setItem("visitorId", id);
    };
    initVisitor().catch(console.error);
  }, []);

  return (
    <Routes>
      {/* Público */}
      <Route path="/"         element={<Home />} />
      <Route path="/termos"   element={<Termos />} />
      <Route path="/fontes"   element={<Fontes />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/sobre"    element={<Sobre />} />
      <Route path="/resultado" element={<Result />} />
      <Route path="/calc1"    element={<Calc1 />} />
      <Route path="/calc2"    element={<Calc2 />} />

      {/* Backoffice — login e aprovação públicos, dashboard protegido */}
      <Route path="/admin/login"           element={<AdminLogin />} />
      <Route path="/admin/approve/:token"  element={<Approve />} />
      <Route
        path="/admin/dashboard"
        element={<AdminGuard><Dashboard /></AdminGuard>}
      />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;
