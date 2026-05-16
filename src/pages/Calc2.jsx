import CalculatorRunner from "../components/CalculatorRunner";
import { calc2 } from "../data/calculators/calc2";
import { getQuestionsForCalc } from "../utils/getQuestionsForCalc";
import { computeCalc2 } from "../utils/calc";

export default function Calc2() {
  return (
    <CalculatorRunner
  questions={getQuestionsForCalc(calc2.questionIds)}
  compute={calc2.compute}
/>
  );
}