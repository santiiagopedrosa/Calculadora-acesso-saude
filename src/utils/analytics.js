export const trackEvent = async (event, data = {}) => {
  try {
    await fetch("http://localhost:3001/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event,
        data,
        created_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Erro tracking:", err);
  }
};