export default function StepResult({ formData, result, prev }) {

  const getLevel = (p) => {
    if (p < 30) return "péssimo acesso";
    if (p < 50) return "mau acesso";
    if (p < 70) return "acesso medíocre";
    if (p < 90) return "acesso razoável";
    return "bom acesso";
  };

  if (!result) return <p>A calcular...</p>;

  return (
    <div>
      <h2>Resultado</h2>

      <p>Score total: {result.score}</p>
      <p>Máximo: {result.max}</p>

      <h3>Percentagem: {result.percentage}%</h3>
      <h3>Nível: {getLevel(result.percentage)}</h3>

      <button onClick={prev}>Voltar</button>
    </div>
  );
}