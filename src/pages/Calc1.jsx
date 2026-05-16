import CalculatorRunner from "../components/CalculatorRunner";
import { calc1 } from "../data/calculators/calc1";
import { getQuestionsForCalc } from "../utils/getQuestionsForCalc";
import { computeCalc1 } from "../utils/calc";

export default function Calc1() {
  return (
    <CalculatorRunner
  questions={getQuestionsForCalc(calc1.questionIds)}
  compute={calc1.compute}
/>
  );
}