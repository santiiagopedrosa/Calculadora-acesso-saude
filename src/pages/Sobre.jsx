import MainLayout from "../layouts/MainLayout";

const stats = [
  { value: "51,6%", label: "das primeiras consultas hospitalares ultrapassaram o prazo legal" },
  { value: "13,2%", label: "das cirurgias programadas nos hospitais públicos ultrapassaram o TMRG" },
  { value: "1 007 445", label: "utentes em espera para primeira consulta em junho de 2025" },
  { value: "87,4%", label: "das consultas de cardiologia realizadas ultrapassaram o tempo máximo legal" },
];

const tmrg = [
  { tipo: "Primeira consulta — Prioridade Normal", prazo: "120 dias" },
  { tipo: "Primeira consulta — Prioritária", prazo: "60 dias" },
  { tipo: "Primeira consulta — Muito Prioritária", prazo: "30 dias" },
  { tipo: "Cirurgia programada — Prioridade Normal", prazo: "180 dias" },
  { tipo: "Cirurgia programada — Prioritária", prazo: "60 dias" },
  { tipo: "Cirurgia programada — Muito Prioritária", prazo: "15 dias" },
  { tipo: "Cirurgia oncológica — Prioridade Normal", prazo: "60 dias" },
  { tipo: "Cirurgia oncológica — Prioritária", prazo: "45 dias" },
];

const sources = [
  {
    title: "ERS — Tempos de Espera no SNS no 1.º Semestre de 2025",
    description: "Relatório de monitorização da Entidade Reguladora da Saúde (outubro de 2025). Base principal dos dados utilizados nesta plataforma.",
    url: "https://www.ers.pt/pt/atividade/supervisao/selecionar/informacao-de-monitorizacao/",
  },
  {
    title: "Portaria n.º 153/2017, de 4 de maio",
    description: "Diploma legal que fixa os Tempos Máximos de Resposta Garantidos (TMRG) para cirurgias, consultas e cuidados de saúde primários no SNS.",
    url: "https://dre.pt/dre/detalhe/portaria/153-2017-106888207",
  },
  {
    title: "SNS — Sistema Nacional de Saúde",
    description: "Portal oficial do Serviço Nacional de Saúde com informação sobre cobertura, taxas moderadoras e acesso a cuidados de saúde.",
    url: "https://www.sns.gov.pt",
  },
  {
    title: "ACSS — Administração Central do Sistema de Saúde",
    description: "Dados sobre financiamento, desempenho e organização do sistema de saúde português, incluindo o SIGIC (gestão de inscritos para cirurgia).",
    url: "https://www.acss.min-saude.pt",
  },
  {
    title: "DGS — Direção-Geral da Saúde",
    description: "Orientações e normas clínicas da autoridade de saúde pública em Portugal.",
    url: "https://www.dgs.pt",
  },
];

export default function Sobre() {
  return (
    <MainLayout>

      {/* ── INTRO ── */}
      <section style={{
        background: "var(--bg-alt)",
        borderBottom: "1px solid var(--border)",
        padding: "60px 24px 52px",
        textAlign: "center",
      }}>
        <span style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--accent)",
          background: "rgba(176, 92, 64, 0.1)",
          border: "1px solid rgba(176, 92, 64, 0.25)",
          borderRadius: "999px",
          padding: "4px 16px",
          marginBottom: "20px",
        }}>
          Sobre o projeto
        </span>
        <h1 style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 800,
          color: "var(--text-h)",
          letterSpacing: "-0.03em",
          marginBottom: "16px",
          lineHeight: 1.15,
        }}>
          Conhece os teus direitos no SNS
        </h1>
        <p style={{
          maxWidth: "560px",
          margin: "0 auto",
          color: "var(--muted)",
          fontSize: "1.05rem",
          lineHeight: 1.7,
        }}>
          Esta plataforma ajuda qualquer pessoa a perceber, de forma simples e transparente,
          se o seu pedido de consulta ou cirurgia no SNS cumpre os prazos legalmente garantidos —
          os <strong style={{ color: "var(--text-h)" }}>Tempos Máximos de Resposta Garantidos (TMRG)</strong>.
        </p>
      </section>

      {/* ── STATS ── */}
      <section style={{
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        padding: "48px 24px",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "32px",
          }}>
            A realidade em Portugal — 1.º Semestre de 2025 (ERS)
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: "var(--bg-alt)",
                padding: "28px 20px",
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                  fontWeight: 600,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTEÚDO ── */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "64px 24px" }}>

        {/* O que são os TMRG */}
        <section style={{ marginBottom: "56px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}>
            <div style={{
              width: "3px",
              height: "22px",
              background: "var(--accent)",
              borderRadius: "999px",
              flexShrink: 0,
            }} />
            <h2 style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "var(--text-h)",
              margin: 0,
            }}>
              O que são os TMRG?
            </h2>
          </div>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "24px" }}>
            São os prazos máximos que o SNS tem de cumprir para atender um utente, contados
            desde a data do pedido ou da indicação clínica. Dependem do tipo de cuidado e do
            nível de prioridade atribuído pelo médico.
          </p>

          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
          }}>
            {tmrg.map((row, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px 20px",
                background: i % 2 === 0 ? "var(--bg-alt)" : "var(--bg)",
                borderBottom: i < tmrg.length - 1 ? "1px solid var(--border)" : "none",
                gap: "16px",
              }}>
                <span style={{ fontSize: "0.88rem", color: "var(--text)", fontWeight: 600 }}>
                  {row.tipo}
                </span>
                <span style={{
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                  background: "rgba(176, 92, 64, 0.1)",
                  padding: "3px 10px",
                  borderRadius: "999px",
                }}>
                  {row.prazo}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Como funciona */}
        <section style={{ marginBottom: "56px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}>
            <div style={{
              width: "3px",
              height: "22px",
              background: "var(--accent)",
              borderRadius: "999px",
              flexShrink: 0,
            }} />
            <h2 style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "var(--text-h)",
              margin: 0,
            }}>
              Como funciona esta ferramenta
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              {
                n: "1",
                title: "Calculadora 1",
                desc: "Indica o tipo de serviço, o nível de prioridade e a data do pedido. A calculadora verifica se ainda estás dentro do TMRG ou se já tens direito a reclamar.",
              },
              {
                n: "2",
                title: "Calculadora 2",
                desc: "Para situações já realizadas ou em espera, analisa quantos dias decorreram face ao limite legal e informa se o prazo foi ou não cumprido.",
              },
            ].map((item) => (
              <div key={item.n} style={{
                display: "flex",
                gap: "16px",
                padding: "20px 22px",
                background: "var(--bg-alt)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                alignItems: "flex-start",
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}>
                  {item.n}
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "var(--text-h)", marginBottom: "4px", fontSize: "0.95rem" }}>
                    {item.title}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.65 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limitações */}
        <section style={{ marginBottom: "56px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}>
            <div style={{
              width: "3px",
              height: "22px",
              background: "var(--accent)",
              borderRadius: "999px",
              flexShrink: 0,
            }} />
            <h2 style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "var(--text-h)",
              margin: 0,
            }}>
              Limitações e transparência
            </h2>
          </div>
          <p style={{
            color: "var(--muted)",
            lineHeight: 1.75,
            padding: "18px 20px",
            background: "rgba(176, 92, 64, 0.06)",
            borderLeft: "3px solid var(--accent)",
            borderRadius: "0 var(--radius) var(--radius) 0",
            fontSize: "0.92rem",
          }}>
            Os resultados são estimativas baseadas nos TMRG legais e nos dados que o utilizador
            introduz. Esta ferramenta <strong style={{ color: "var(--text-h)" }}>não substitui aconselhamento jurídico ou médico</strong>.
            Para reclamar formalmente junto do SNS, consulta o portal da ERS ou do SNS.
          </p>
        </section>

        {/* Fontes */}
        <section>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}>
            <div style={{
              width: "3px",
              height: "22px",
              background: "var(--accent)",
              borderRadius: "999px",
              flexShrink: 0,
            }} />
            <h2 style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "var(--text-h)",
              margin: 0,
            }}>
              Fontes
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {sources.map((s, i) => (
              <div key={s.url} style={{
                padding: "16px 20px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                background: "var(--bg-alt)",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start",
              }}>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--muted)",
                  background: "var(--border)",
                  borderRadius: "4px",
                  padding: "2px 7px",
                  flexShrink: 0,
                  marginTop: "2px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--accent)",
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {s.title} ↗
                  </a>
                  <p style={{ margin: 0, fontSize: "0.82rem", lineHeight: 1.6, color: "var(--muted)" }}>
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </MainLayout>
  );
}
