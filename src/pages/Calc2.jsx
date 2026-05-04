import CalculatorRunner from "../components/CalculatorRunner";
import { calc2Questions } from "../data/calculators/calc2";
import { computeCalc2 } from "../utils/calc";

export default function Calc2() {
  return (
    <CalculatorRunner
      questions={calc2Questions}
      compute={computeCalc2}
    />
  );
}