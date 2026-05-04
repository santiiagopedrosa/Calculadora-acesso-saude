import { questions } from "../questions";

export const calc1Questions = questions.filter(q =>
  ["calc1_tipoCuidado", "calc1_prioridade", "calc1_dataPedido"].includes(q.id)
);