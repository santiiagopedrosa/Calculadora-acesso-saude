export const calculateStepResult = (answers, questions) => {
  let total = 0;
  let max = 0;

  questions.forEach((q) => {
    max += 25;

    if (q.type === "radio") {
      const map = q.scoreMap || {};
      total += map[answers[q.id]] || 0;
    }

    if (q.type === "numeric") {
      const n = Number(answers[q.id] || 0);
      if (q.score) total += q.score(n);
    }

    if (q.type === "dropdown") {
      const opt = q.options.find(o => o.value === answers[q.id]);
      total += opt?.score || 0;
    }
  });

  const percentage = Math.round((total / max) * 100);

  return {
    score: total,
    max,
    percentage,
  };
};