import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSession } from "../../utils/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [info,     setInfo]     = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res  = await fetch("http://localhost:3001/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      saveSession(data.token, data.username);
      navigate("/admin/dashboard");
    } catch {
      setError("Sem ligação ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const res  = await fetch("http://localhost:3001/admin/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setInfo(data.message);
      setUsername("");
      setPassword("");
    } catch {
      setError("Sem ligação ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  const inp = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1.5px solid #ddd5c8",
    background: "#fff",
    fontSize: "15px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    marginBottom: "12px",
  };

  return (
    <div style={{
      minHeight: "100svh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f1eb",
      fontFamily: "'Nunito', system-ui, sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "380px",
        background: "#fff",
        border: "1px solid #ddd5c8",
        borderRadius: "14px",
        padding: "36px 32px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>
        <h1 style={{
          fontSize: "1.35rem",
          fontWeight: 800,
          color: "#1c1410",
          marginBottom: "6px",
          letterSpacing: "-0.02em",
        }}>
          Backoffice SNS
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#8a7568", marginBottom: "28px" }}>
          Acesso reservado à equipa interna.
        </p>

        {/* tabs */}
        <div style={{
          display: "flex",
          gap: "4px",
          background: "#f5f1eb",
          borderRadius: "8px",
          padding: "4px",
          marginBottom: "24px",
        }}>
          {[["login", "Entrar"], ["register", "Registar"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); setError(""); setInfo(""); }}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                background: tab === key ? "#fff" : "transparent",
                color: tab === key ? "#1c1410" : "#8a7568",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: tab === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin}>
            <input
              style={inp}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              style={inp}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: "#c0392b", fontSize: "13px", marginBottom: "10px" }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "#b05c40",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontFamily: "inherit",
              }}
            >
              {loading ? "A entrar..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            {info ? (
              <div style={{
                background: "rgba(74,154,101,0.08)",
                border: "1px solid rgba(74,154,101,0.3)",
                borderRadius: "8px",
                padding: "14px 16px",
                color: "#3a7a52",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: 1.5,
              }}>
                {info}
              </div>
            ) : (
              <>
                <input
                  style={inp}
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  style={inp}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p style={{ color: "#c0392b", fontSize: "13px", marginBottom: "10px" }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#b05c40",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    fontFamily: "inherit",
                  }}
                >
                  {loading ? "A enviar pedido..." : "Pedir acesso"}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
