import { computeCalc2 } from "../../utils/calc";

export const calc2 = {
  id: "calc2",
  title: "Tempo de espera",
  description: "Verifica se foste atendido dentro do prazo legal.",
  questionIds: [
    "calc2_estado",
    "calc2_prioridade",
    "calc2_dataPedido",
    "calc2_dataRealizacao",
  ],
  compute: computeCalc2,
};