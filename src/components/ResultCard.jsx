export default function ResultCard({ result }) {
  if (!result) return null;

  // 🔥 normalizar estado
  const isBad =
    result.ultrapassado === true ||
    result.cumpriu === false;

  return (
    <div className={`result-card ${isBad ? "result-bad" : "result-ok"}`}>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        {result.mensagem}
      </p>

      <p>{result.resumo}</p>

      {result.dataLimite && (
        <small>
          Data limite:{" "}
          {new Date(result.dataLimite).toLocaleDateString()}
        </small>
      )}
    </div>
  );
}