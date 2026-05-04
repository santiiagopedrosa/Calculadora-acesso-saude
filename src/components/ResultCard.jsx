export default function ResultCard({ result }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20 }}>
      <h2>Resultado</h2>

      {result.erro && <p>{result.erro}</p>}

      {!result.erro && (
        <>
          <p><strong>TMRG:</strong> {result.tmrg} {result.unit}</p>
          <p><strong>Data limite:</strong> {result.dataLimite}</p>
          <p><strong>Estado:</strong> {result.estado}</p>

          {result.diasRestantes !== undefined && (
            <p>Dias restantes: {result.diasRestantes}</p>
          )}

          {result.cumpriu !== undefined && (
            <>
              <p><strong>{result.mensagem}</strong></p>
              <p>Dias: {result.diasMargem}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}