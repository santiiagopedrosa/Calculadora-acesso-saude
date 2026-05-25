import { useEffect, useState } from "react";

export default function AdminCalculatorRuns() {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/calculator/runs")
      .then((res) => res.json())
      .then((data) => setRuns(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "24px" }}>Calculator Runs</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#f4f4f4" }}>
            <th>ID</th>
            <th>Calc</th>
            <th>Score</th>
            <th>Contact ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Visitor ID</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.calcId ?? "—"}</td>
              <td>{r.score}</td>
              <td>{r.contactId ?? "—"}</td>
              <td>{r.contactName ?? "—"}</td>
              <td>{r.contactEmail ?? "—"}</td>
              <td>{r.visitorId ?? "—"}</td>
              <td>{new Date(r.createdAt).toLocaleString("pt-PT")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
