import { computeCalc1 } from "../../utils/calc";

export const calc1 = {
  id: "calc1",
  title: "Qual é o meu prazo legal?",
  description: "Descobre até quando o SNS tem de te atender.",
  questionIds: [
    "calc1_tipoCuidado",
    "calc1_prioridade",
    "calc1_dataPedido",
  ],
  compute: computeCalc1,
};