import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../../data/questions";
import { trackEvent } from "../../utils/analytics";
import QuestionRenderer from "../../components/QuestionRenderer";

export default function Calculator() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [visitorId, setVisitorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);

  const navigate = useNavigate();

  // 🔥 FETCH DISTRITOS
  useEffect(() => {
    fetch("http://localhost:3001/districts")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 PERGUNTAS DINÂMICAS
  const dynamicQuestions = questions.map((q) => {
    if (q.id === "q_district") {
      return {
        ...q,
        options: districts.map((d) => ({
          label: d.name,
          value: d.name,
        })),
      };
    }
    return q;
  });

  const currentQuestion = dynamicQuestions?.[step];

  useEffect(() => {
    localStorage.setItem("calculatorStep", step);
  }, [step]);

  useEffect(() => {
    const savedStep = localStorage.getItem("calculatorStep");
    if (savedStep) setStep(parseInt(savedStep));
  }, []);

  useEffect(() => {
    localStorage.setItem("calculatorData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const saved = localStorage.getItem("calculatorData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // 🔥 VISITOR
  useEffect(() => {
    const initVisitor = async () => {
      const storedVisitor = localStorage.getItem("visitorId");

      if (storedVisitor) {
        setVisitorId(storedVisitor);
        trackEvent("start", { visitor_id: storedVisitor });
        return;
      }

      const res = await fetch("http://localhost:3001/visitor", {
        method: "POST",
      });

      const data = await res.json();
      localStorage.setItem("visitorId", data.id);
      setVisitorId(data.id);

      trackEvent("start", { visitor_id: data.id });
    };

    initVisitor();
  }, []);

  // validação
  const validateStep = () => {
    const q = dynamicQuestions[step];
    const value = formData[q.id];

    if (q.required && (!value || value.length === 0)) {
      setErrors({ [q.id]: "Campo obrigatório" });
      return false;
    }

    setErrors({});
    return true;
  };

  const next = () => {
    trackEvent("step_completed", {
      step,
      question: currentQuestion.id,
    });

    if (validateStep()) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => setStep((s) => s - 1);

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (!visitorId) {
      alert("Erro: visitor não criado");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: formData,
          visitor_id: visitorId,
        }),
      });

      const data = await res.json();

      trackEvent("completion", {
        visitor_id: visitorId,
        answers: formData,
      });

      navigate("/resultado", {
        state: {
          ...data,
          answers: formData, // 🔥 IMPORTANTE
        },
      });

    } catch (err) {
      console.error(err);
      alert("Erro ao guardar");
    } finally {
      setLoading(false);
    }

    localStorage.removeItem("calculatorData");
    localStorage.removeItem("calculatorStep");
  };

  if (!currentQuestion || (currentQuestion.id === "q_district" && districts.length === 0)) {
  return <p>Loading distritos...</p>;
}


  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <p>
        Step {step + 1} / {dynamicQuestions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      <QuestionRenderer
        question={currentQuestion}
        formData={formData}
        value={formData[currentQuestion.id]}
        onChange={(val) =>
          setFormData({
            ...formData,
            [currentQuestion.id]: val,
          })
        }
      />

      {errors[currentQuestion.id] && (
        <p style={{ color: "red" }}>
          {errors[currentQuestion.id]}
        </p>
      )}

      <br />

      {step > 0 && <button onClick={prev}>Anterior</button>}

      {step < dynamicQuestions.length - 1 && (
        <button onClick={next}>Seguinte</button>
      )}

      {step === dynamicQuestions.length - 1 && (
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "A guardar..." : "Submeter"}
        </button>
      )}

      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}