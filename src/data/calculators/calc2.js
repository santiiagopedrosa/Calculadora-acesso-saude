import { questions } from "../questions";

export const calc2Questions = questions.filter(q =>
  [
    "calc1_tipoCuidado",
    "calc1_prioridade",
    "calc1_dataPedido",
    "calc2_estado",
    "calc2_dataRealizacao"
  ].includes(q.id)
);