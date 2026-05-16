export default function CalculatorCard({
  title,
  description,
  children,
}) {
  return (
    <div className="calc-card">
      <h2 className="calc-card-title">
        {title}
      </h2>

      <p className="calc-card-description">
        {description}
      </p>

      {children}
    </div>
  );
}