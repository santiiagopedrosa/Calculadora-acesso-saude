import { useState } from "react";

export default function ContactForm() {
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
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Telefone (opcional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button type="submit">Enviar</button>
    </form>
  );
}