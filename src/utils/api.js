export const saveRun = async (answers, result) => {
  try {
    await fetch("http://localhost:3001/calculator/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers, result }),
    });
  } catch (err) {
    console.error("Erro ao guardar:", err);
  }
};