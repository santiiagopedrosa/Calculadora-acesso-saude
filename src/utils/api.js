export const saveRun = async (data) => {
  try {
    const res = await fetch("http://localhost:3001/calculator/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    console.log("✅ resposta backend:", json);

  } catch (err) {
    console.error("❌ erro ao guardar:", err);
  }
};
export const createVisitor = async () => {

  const res = await fetch("http://localhost:3001/visitor", {

    method: "POST",

  });

  const data = await res.json();

  return data.id; // 🔥 importante

};