import { computeCalc1 } from "./calc1";
import { startOfToday, diffDays } from "../../utils/dates";

export const computeCalc2 = (answers) => {
  const base = computeCalc1(answers);

  const estado = answers.calc2_estado;

  const dataComparacao =
    estado === "realizada"
      ? new Date(answers.calc2_dataRealizacao)
      : startOfToday();

  const margem = diffDays(base.dataLimite, dataComparacao);

  return {
    ...base,
    cumpriu: margem >= 0,
    dias: Math.abs(margem),
  };
};