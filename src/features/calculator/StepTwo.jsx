export default function StepTwo({ formData, setFormData, next, prev }) {
  return (
    <div>
      <h2>Escolhe uma opção</h2>

      <label>
        <input
          type="radio"
          name="option"
          value="A"
          checked={formData.option === "A"}
          onChange={(e) =>
            setFormData({ ...formData, option: e.target.value })
          }
        />
        Opção A
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="option"
          value="B"
          checked={formData.option === "B"}
          onChange={(e) =>
            setFormData({ ...formData, option: e.target.value })
          }
        />
        Opção B
      </label>

      <br /><br />

      <button onClick={prev}>Anterior</button>
      <button onClick={next}>Seguinte</button>
    </div>
  );
}