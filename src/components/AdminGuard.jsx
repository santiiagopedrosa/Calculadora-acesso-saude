import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearSession } from "../utils/adminAuth";

export default function AdminGuard({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    fetch("http://localhost:3001/admin/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          clearSession();
          navigate("/admin/login", { replace: true });
        } else {
          setChecking(false);
        }
      })
      .catch(() => {
        navigate("/admin/login", { replace: true });
      });
  }, [navigate]);

  if (checking) return null;
  return children;
}
