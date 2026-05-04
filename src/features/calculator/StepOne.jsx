export default function StepOne({ formData, setFormData, next }) {
  return (
    <div>
      <h2>Quanto quer simular?</h2>

      <input
        type="number"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: e.target.value })
        }
      />

      <br /><br />

      <button onClick={next}>Seguinte</button>
    </div>
  );
}