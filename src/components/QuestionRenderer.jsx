export default function QuestionRenderer({
  question,
  value,
  onChange,
}) {
  if (!question) return null;

  switch (question.type) {

    case "radio":
      return (question.options || []).map((opt) => {
        const val = opt.value || opt;
        const label = opt.label || opt;

        return (
          <label key={val} style={{ display: "block" }}>
            <input
              type="radio"
              checked={value === val}
              onChange={() => onChange(val)}
            />
            {label}
          </label>
        );
      });

    case "date":
      return (
        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    default:
      return <p>Tipo não suportado: {question.type}</p>;
  }
}