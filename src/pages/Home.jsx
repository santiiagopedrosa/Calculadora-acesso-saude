import { useState, useEffect, useRef } from "react";

import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import ContactForm from "../features/contact/ContactForm";
import CalculatorRunner from "../components/CalculatorRunner";
import CalculatorCard from "../components/CalculatorCard";

import { calc1 } from "../data/calculators/calc1";
import { calc2 } from "../data/calculators/calc2";
import { getQuestionsForCalc } from "../utils/getQuestionsForCalc";

export default function Home() {
  const [calc2Unlocked, setCalc2Unlocked] = useState(false);
  const paywallRef = useRef(null);

  useEffect(() => {
    const checkContact = async () => {
      try {
        const visitorId = localStorage.getItem("visitorId");
        if (!visitorId) return;
        const res  = await fetch(`http://localhost:3001/contacts/check/${visitorId}`);
        const data = await res.json();
        if (data.hasContact) setCalc2Unlocked(true);
      } catch (err) {
        console.error(err);
      }
    };
    checkContact();
  }, []);

  useEffect(() => {
    const el = paywallRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => el.classList.toggle("fade-visible", entry.isIntersecting),
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [calc2Unlocked]);

  return (
    <MainLayout>
      <Hero />

      <section className="calc-section">
        <h2 className="calc-title">Simulação de acesso ao SNS</h2>

        <div className="calc-container">

          <CalculatorCard title={calc1.title} description={calc1.description}>
            <CalculatorRunner
              questions={getQuestionsForCalc(calc1.questionIds)}
              compute={calc1.compute}
            />
          </CalculatorCard>

          {!calc2Unlocked && (
            <div ref={paywallRef} className="calc-card fade-section">
              <h2 className="calc-card-title">Desbloquear análise completa</h2>
              <p className="calc-card-description">Introduz os teus dados para continuar para a segunda calculadora.</p>
              <ContactForm onSuccess={() => setCalc2Unlocked(true)} />
            </div>
          )}

          {calc2Unlocked && (
            <CalculatorCard title={calc2.title} description={calc2.description}>
              <CalculatorRunner
                questions={getQuestionsForCalc(calc2.questionIds)}
                compute={calc2.compute}
              />
            </CalculatorCard>
          )}

        </div>
      </section>
    </MainLayout>
  );
}
