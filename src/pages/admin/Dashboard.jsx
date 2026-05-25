import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getUsername, clearSession, authHeaders } from "../../utils/adminAuth";

const SCORE_LABEL = { 1: "Dentro do prazo", 2: "Prazo ultrapassado" };
const SCORE_COLOR = { 1: "#4a9a65", 2: "#b05c40" };

function PendingRow({ user, token, onDone }) {
  const [loading, setLoading] = useState(false);

  const act = async (action) => {
    setLoading(true);
    const res = await fetch(`http://localhost:3001/admin/auth/pending/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ action }),
    });
    const data = await res.json();
    if (data.success) onDone(user.id, data.status);
    setLoading(false);
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px", borderRadius: "10px",
      border: "1px solid #f0c08a", background: "#fffbf5", gap: "16px",
    }}>
      <div>
        <span style={{ fontWeight: 800, color: "#1c1410" }}>{user.username}</span>
        <span style={{ marginLeft: "12px", fontSize: "12px", color: "#8a7568" }}>
          {new Date(user.createdAt).toLocaleString("pt-PT")}
        </span>
      </div>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          disabled={loading}
          onClick={() => act("reject")}
          style={{
            padding: "6px 16px", borderRadius: "7px", border: "1.5px solid #ddd5c8",
            background: "none", color: "#8a7568", fontWeight: 700, fontSize: "13px",
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Rejeitar
        </button>
        <button
          disabled={loading}
          onClick={() => act("approve")}
          style={{
            padding: "6px 16px", borderRadius: "7px", border: "none",
            background: "#b05c40", color: "#fff", fontWeight: 700, fontSize: "13px",
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}

function RunsChart({ runs }) {
  const dentro   = runs.filter((r) => r.score === 1).length;
  const fora     = runs.filter((r) => r.score === 2).length;
  const total    = dentro + fora;

  if (total === 0) return (
    <p style={{ color: "#8a7568", fontSize: "0.9rem" }}>Sem dados suficientes.</p>
  );

  const data = [
    { name: "Dentro do prazo", value: dentro, pct: Math.round((dentro / total) * 100) },
    { name: "Prazo ultrapassado", value: fora,   pct: Math.round((fora   / total) * 100) },
  ];

  const COLORS = ["#4a9a65", "#b05c40"];

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, pct }) => {
    if (pct === 0) return null;
    const RADIAN = Math.PI / 180;
    const r  = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + r * Math.cos(-midAngle * RADIAN);
    const y  = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: "13px", fontWeight: 700, fontFamily: "Nunito, system-ui" }}>
        {pct}%
      </text>
    );
  };

  return (
    <div style={{ display: "flex", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
      <ResponsiveContainer width={220} height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            labelLine={false}
            label={renderLabel}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} runs`, name]}
            contentStyle={{ fontFamily: "Nunito, system-ui", fontSize: "13px", borderRadius: "8px" }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, color: "#1c1410", fontSize: "1.4rem", lineHeight: 1 }}>
                {d.pct}%
              </div>
              <div style={{ fontSize: "12px", color: "#8a7568", fontWeight: 600, marginTop: "2px" }}>
                {d.name} · {d.value} {d.value === 1 ? "resposta" : "respostas"}
              </div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: "12px", color: "#8a7568", borderTop: "1px solid #ddd5c8", paddingTop: "12px" }}>
          Total: <strong style={{ color: "#1c1410" }}>{total}</strong> calculator runs
        </div>
      </div>
    </div>
  );
}

function FadeSection({ title, children }) {
  const ref     = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        marginBottom: "48px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <h2 style={{
        fontSize: "1rem", fontWeight: 800, color: "#1c1410",
        marginBottom: "16px", letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "48px" }}>
      <h2 style={{
        fontSize: "1rem",
        fontWeight: 800,
        color: "#1c1410",
        marginBottom: "16px",
        letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Table({ cols, rows, empty = "Sem registos." }) {
  if (!rows.length) return (
    <p style={{ color: "#8a7568", fontSize: "0.9rem" }}>{empty}</p>
  );
  return (
    <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #ddd5c8" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ background: "#ede9e1" }}>
            {cols.map((c) => (
              <th key={c.key} style={{
                padding: "10px 14px",
                textAlign: "left",
                fontWeight: 700,
                color: "#8a7568",
                letterSpacing: "0.05em",
                fontSize: "11px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: "1px solid #ddd5c8", background: i % 2 === 0 ? "#fff" : "#faf8f5" }}>
              {cols.map((c) => (
                <td key={c.key} style={{ padding: "10px 14px", color: "#2a2420", verticalAlign: "top" }}>
                  {c.render ? c.render(row[c.key], row) : (row[c.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  const navigate  = useNavigate();
  const username  = getUsername();
  const [pending,  setPending]  = useState([]);
  const [runs,     setRuns]     = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const headers = authHeaders();
    Promise.all([
      fetch("http://localhost:3001/admin/auth/pending",  { headers }).then((r) => r.json()),
      fetch("http://localhost:3001/calculator/runs",     { headers }).then((r) => r.json()),
      fetch("http://localhost:3001/contacts",             { headers }).then((r) => r.json()),
    ]).then(([p, r, c]) => {
      setPending(Array.isArray(p) ? p : []);
      setRuns(Array.isArray(r) ? r : []);
      setContacts(Array.isArray(c) ? c : []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    clearSession();
    navigate("/admin/login");
  };

  const fmt = (dt) => dt ? new Date(dt).toLocaleString("pt-PT") : "—";

  const runCols = [
    { key: "id",          label: "ID" },
    { key: "calcId",      label: "Calc" },
    { key: "contactId",   label: "Contact ID" },
    { key: "contactName", label: "Nome" },
    { key: "contactEmail",label: "Email" },
    { key: "visitorId",   label: "Visitor" },
    {
      key: "score",
      label: "Resultado",
      render: (v) => v != null ? (
        <span style={{ color: SCORE_COLOR[v], fontWeight: 700 }}>
          {SCORE_LABEL[v] ?? v}
        </span>
      ) : "—",
    },
    { key: "createdAt", label: "Data", render: fmt },
  ];

  const contactCols = [
    { key: "id",       label: "ID" },
    { key: "fullName", label: "Nome" },
    { key: "email",    label: "Email" },
    { key: "phone",    label: "Telefone" },
    { key: "message",  label: "Mensagem" },
    {
      key: "resultadoFinal",
      label: "Resultado Final",
      render: (v) => v != null ? (
        <span style={{ color: SCORE_COLOR[v], fontWeight: 700 }}>
          {SCORE_LABEL[v] ?? v}
        </span>
      ) : "—",
    },
    { key: "ultimaCalc", label: "Calc" },
    { key: "createdAt",  label: "Data", render: fmt },
  ];

  return (
    <div style={{
      minHeight: "100svh",
      background: "#f5f1eb",
      fontFamily: "'Nunito', system-ui, sans-serif",
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 36px",
        background: "#fff",
        borderBottom: "1px solid #ddd5c8",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <span style={{ fontWeight: 800, fontSize: "1rem", color: "#1c1410" }}>
          Backoffice SNS
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#8a7568", fontWeight: 600 }}>
            {username}
          </span>
          <button
            onClick={logout}
            style={{
              background: "none",
              border: "1.5px solid #ddd5c8",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "13px",
              color: "#8a7568",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 700,
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        {loading ? (
          <p style={{ color: "#8a7568" }}>A carregar...</p>
        ) : (
          <>
            {pending.length > 0 && (
              <section style={{ marginBottom: "48px" }}>
                <h2 style={{
                  fontSize: "1rem", fontWeight: 800, color: "#1c1410",
                  marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px",
                }}>
                  Pedidos de acesso pendentes
                  <span style={{
                    background: "#b05c40", color: "#fff", borderRadius: "999px",
                    fontSize: "11px", fontWeight: 700, padding: "2px 9px",
                  }}>{pending.length}</span>
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pending.map((u) => (
                    <PendingRow
                      key={u.id}
                      user={u}
                      token={authHeaders().Authorization}
                      onDone={(id, status) => {
                        setPending((prev) => prev.filter((x) => x.id !== id));
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            <Section title={`Calculator Runs (${runs.length})`}>
              <Table cols={runCols} rows={runs} />
            </Section>

            <Section title={`Contactos / Emails (${contacts.length})`}>
              <Table cols={contactCols} rows={contacts} />
            </Section>

            <FadeSection title="Resultados das calculadoras">
              <div style={{
                padding: "28px 32px",
                background: "#fff",
                border: "1px solid #ddd5c8",
                borderRadius: "10px",
              }}>
                <RunsChart runs={runs} />
              </div>
            </FadeSection>
          </>
        )}
      </main>
    </div>
  );
}
