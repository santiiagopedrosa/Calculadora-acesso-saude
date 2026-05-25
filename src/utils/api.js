export const saveRun = async (data) => {
  try {
    const res = await fetch("http://localhost:3001/calculator/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("❌ erro backend calculator/run:", json);
      return;
    }

    console.log("✅ run guardado:", json);
  } catch (err) {
    console.error("❌ erro ao guardar run:", err);
  }
};

export const createVisitor = async () => {
  const res = await fetch("http://localhost:3001/visitor", {
    method: "POST",
  });

  if (!res.ok) {
    console.error("❌ erro ao criar visitor");
    return null;
  }

  const data = await res.json();
  return data.id;
};
