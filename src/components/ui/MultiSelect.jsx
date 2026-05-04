export default function MultiSelect({ options = [], value = [], onChange }) {

  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div>
      {options.map((opt) => (
        <label key={opt} style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={value.includes(opt)}
            onChange={() => toggleOption(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}