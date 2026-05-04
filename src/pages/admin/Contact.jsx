import { useEffect, useState } from "react";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Contacts</h2>

      {contacts.map((c) => (
        <div key={c.id} style={{ borderBottom: "1px solid #ccc" }}>
          <p><b>Nome:</b> {c.fullName}</p>
          <p><b>Email:</b> {c.email}</p>
        </div>
      ))}
    </div>
  );
}