import CalculatorRunner from "../components/CalculatorRunner";
import { calc1Questions } from "../data/calculators/calc1";
import { computeCalc1 } from "../utils/calc";

export default function Calc1() {
  return (
    <CalculatorRunner
      questions={calc1Questions}
      compute={computeCalc1}
    />
  );
}