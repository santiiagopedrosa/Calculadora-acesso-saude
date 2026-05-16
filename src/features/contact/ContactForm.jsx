import { useState } from "react";

export default function ContactForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const visitorId = localStorage.getItem("visitorId");

    try {
      const res = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          visitor_id: visitorId,
        }),
      });

      const data = await res.json();
      console.log("SERVER RESPONSE:", data);

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      alert("Contacto guardado!");

if (onSuccess) {
  onSuccess();
}
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar");
    }
  }

 const inputStyle = {
  width: "100%",

  padding: "14px",

  borderRadius: "12px",

  border: "1px solid rgba(255,255,255,0.12)",

  background: "#1a1a1a",

  color: "white",

  fontSize: "16px",

  boxSizing: "border-box",
};

return (
  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <input
      placeholder="Nome"
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={inputStyle}
    />

    <input
      placeholder="Email"
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
      placeholder="Mensagem"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={{
        ...inputStyle,
        minHeight: "120px",
      }}
    />

    <button type="submit">
      Continuar
    </button>
  </form>
);
}