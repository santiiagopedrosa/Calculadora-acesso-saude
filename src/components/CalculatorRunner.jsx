import { useState, useEffect } from "react";
import QuestionRenderer from "./QuestionRenderer";
import ResultCard from "./ResultCard";
import { saveRun, createVisitor} from "../utils/api";

export default function CalculatorRunner({ questions, compute }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [visitorId, setVisitorId] = useState(null);
  const rawQuestion = questions[step];


  useEffect(() => {
  const initVisitor = async () => {
    try {
      const id = await createVisitor();
      console.log("🟢 visitor criado:", id);
      setVisitorId(id);
    } catch (err) {
      console.error("❌ erro visitor:", err);
    }
  };

  initVisitor();
}, []);

  // 🔥 opções dinâmicas
  const getOptions = (q) => {
    if (q.optionsByParent) {
      const parentValue = answers[q.dependsOn];
      if (!parentValue) return [];
      return q.optionsByParent[parentValue] || [];
    }
    return q.options || [];
  };

  // 🔥 inject options
  const question = rawQuestion
    ? {
        ...rawQuestion,
        options: getOptions(rawQuestion),
      }
    : null;

  // 🔥 showIf
  const isVisible = (q) => {
    if (!q.showIf) return true;
    return answers[q.showIf.questionId] === q.showIf.equals;
  };

  // 🔥 validação
  const validate = () => {
    if (!question) return false;

    const value = answers[question.id];

    if (!value) {
      alert("Preenche este campo");
      return false;
    }

    if (question.type === "date") {
      const selected = new Date(value);
      const today = new Date();

      if (selected > today) {
        alert("Data não pode ser no futuro");
        return false;
      }
    }

    return true;
  };

  const next = () => {
  if (!validate()) return;

  let nextStep = step + 1;

  // saltar escondidas
  while (questions[nextStep] && !isVisible(questions[nextStep])) {
    nextStep++;
  }

  if (nextStep >= questions.length) {
    const res = compute(answers);

    setResult(res);

    // 🔥 guardar
    saveRun({
      answers,
      result: res,
      visitorId,
    });

  } else {
    setStep(nextStep); // 🔥 FALTAVA ISTO
  }
};

  const prev = () => setStep(step - 1);

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return (
      <div>
        <ResultCard result={result} />
        <button onClick={reset}>Recomeçar</button>
      </div>
    );
  }

  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <p className="step-counter">Passo {step + 1} / {questions.length}</p>

      <h3 className="step-question">{question.question}</h3>

      <QuestionRenderer
        key={question.id + JSON.stringify(question.options)}
        question={question}
        value={answers[question.id]}
        onChange={(val) =>
          setAnswers((prev) => ({
            ...prev,
            [question.id]: val,
          }))
        }
      />

      <div className="step-nav">
        {step > 0 && <button className="btn-ghost" onClick={prev}>Voltar</button>}
        <button onClick={next}>Seguinte</button>
      </div>
    </div>
  );
}