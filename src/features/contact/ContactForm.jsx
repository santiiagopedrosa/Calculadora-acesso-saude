import { useState } from "react";

export default function ContactForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatusMsg("O email é obrigatório.");
      return;
    }

    const visitorId = localStorage.getItem("visitorId");
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          visitor_id: visitorId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMsg("Erro ao guardar. Tenta novamente.");
        console.error("Backend error:", data);
        return;
      }

      if (data.id) {
        localStorage.setItem("contactId", data.id);
      }

      if (data.alreadyExists) {
        setStatusMsg("Este email já está registado. A desbloquear acesso...");
      } else {
        setStatusMsg("Registo concluído! A desbloquear acesso...");
      }

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1200);
    } catch (err) {
      console.error("Fetch error:", err);
      setStatusMsg("Sem ligação ao servidor. Verifica a tua ligação.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1.5px solid #ddd5c8",
    background: "#ede9e1",
    color: "#2a2420",
    fontSize: "16px",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
    >
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Email *"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Telefone (opcional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Mensagem (opcional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ ...inputStyle, minHeight: "100px" }}
      />

      {statusMsg && (
        <p style={{
          color: statusMsg.includes("Erro") || statusMsg.includes("Sem ligação") ? "#f87171" : "#c084fc",
          fontSize: "14px",
          margin: 0,
        }}>
          {statusMsg}
        </p>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "A enviar..." : "Continuar"}
      </button>
    </form>
  );
}
