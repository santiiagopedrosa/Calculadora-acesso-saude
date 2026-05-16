export default function StepResult({ formData, result, prev }) {

  const getLevel = (p) => {
    if (p < 30) return "péssimo acesso";
    if (p < 50) return "mau acesso";
    if (p < 70) return "acesso medíocre";
    if (p < 90) return "acesso razoável";
    return "bom acesso";
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3001/calculator/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: formData,
          result: result,
        }),
      });

      const data = await res.json();

      console.log("✅ enviado:", data);

    } catch (err) {
      console.error("❌ erro ao enviar:", err);
    }
  };

  if (!result) return <p>A calcular...</p>;

  return (
    <div>
      <h2>Resultado</h2>

      <p>Score total: {result.score}</p>
      <p>Máximo: {result.max}</p>

      <h3>Percentagem: {result.percentage}%</h3>
      <h3>Nível: {getLevel(result.percentage)}</h3>

      <button onClick={handleSave}>Guardar</button> {/* 🔥 NOVO */}

      <button onClick={prev}>Voltar</button>
    </div>
  );
}