import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Approve() {
  const { token } = useParams();
  const [user,   setUser]   = useState(null);
  const [status, setStatus] = useState("loading"); // loading | found | done | error
  const [result, setResult] = useState(null);
  const [msg,    setMsg]    = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/admin/auth/approve/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setMsg(data.error); setStatus("error"); return; }
        setUser(data);
        setStatus("found");
      })
      .catch(() => { setMsg("Sem ligação ao servidor."); setStatus("error"); });
  }, [token]);

  const act = async (action) => {
    setStatus("loading");
    const res  = await fetch(`http://localhost:3001/admin/auth/approve/${token}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ action }),
    });
    const data = await res.json();
    if (!res.ok) { setMsg(data.error); setStatus("error"); return; }
    setResult(data.status);
    setStatus("done");
  };

  const card = {
    minHeight:   "100svh",
    display:     "flex",
    alignItems:  "center",
    justifyContent: "center",
    background:  "#f5f1eb",
    fontFamily:  "'Nunito', system-ui, sans-serif",
  };

  const box = {
    width:        "100%",
    maxWidth:     "420px",
    background:   "#fff",
    border:       "1px solid #ddd5c8",
    borderRadius: "14px",
    padding:      "40px 36px",
    boxShadow:    "0 8px 32px rgba(0,0,0,0.08)",
    textAlign:    "center",
  };

  if (status === "loading") return (
    <div style={card}><div style={box}><p style={{ color: "#8a7568" }}>A carregar...</p></div></div>
  );

  if (status === "error") return (
    <div style={card}>
      <div style={box}>
        <p style={{ color: "#c0392b", fontWeight: 700 }}>{msg}</p>
      </div>
    </div>
  );

  if (status === "done") return (
    <div style={card}>
      <div style={box}>
        <div style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: result === "approved" ? "#4a9a65" : "#b05c40",
          margin: "0 auto 16px",
        }} />
        <h2 style={{ color: "#1c1410", fontWeight: 800, marginBottom: "8px" }}>
          {result === "approved" ? "Acesso aprovado" : "Acesso negado"}
        </h2>
        <p style={{ color: "#8a7568", fontSize: "0.9rem" }}>
          {result === "approved"
            ? `${user?.username} já pode entrar no backoffice.`
            : `${user?.username} foi removido do sistema.`}
        </p>
      </div>
    </div>
  );

  return (
    <div style={card}>
      <div style={box}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: "#b05c40", margin: "0 auto 20px",
        }} />

        <h2 style={{ color: "#1c1410", fontWeight: 800, marginBottom: "8px", fontSize: "1.2rem" }}>
          Pedido de acesso
        </h2>
        <p style={{ color: "#8a7568", fontSize: "0.9rem", marginBottom: "28px" }}>
          O utilizador abaixo quer aceder ao backoffice do SNS.
        </p>

        <div style={{
          background: "#f5f1eb",
          borderRadius: "10px",
          padding: "16px 20px",
          marginBottom: "28px",
          textAlign: "left",
        }}>
          <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a7568" }}>
            Username
          </p>
          <p style={{ margin: "4px 0 0", fontWeight: 800, color: "#1c1410", fontSize: "1.1rem" }}>
            {user?.username}
          </p>
          <p style={{ margin: "10px 0 0", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a7568" }}>
            Pedido em
          </p>
          <p style={{ margin: "4px 0 0", color: "#555", fontSize: "0.85rem" }}>
            {user?.createdAt ? new Date(user.createdAt).toLocaleString("pt-PT") : "—"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => act("reject")}
            style={{
              flex: 1,
              padding: "12px",
              background: "none",
              border: "1.5px solid #ddd5c8",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              color: "#8a7568",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Rejeitar
          </button>
          <button
            onClick={() => act("approve")}
            style={{
              flex: 1,
              padding: "12px",
              background: "#b05c40",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "14px",
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Aprovar
          </button>
        </div>
      </div>
    </div>
  );
}
