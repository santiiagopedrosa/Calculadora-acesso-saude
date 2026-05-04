import { questions } from "../data/questions";
import { startOfToday, addDays, addHours, diffDays } from "./dates";

// 🔎 encontrar opção selecionada com payload
const findOption = (questionId, parentValue, value) => {
  const q = questions.find(q => q.id === questionId);

  if (!q) return null;

  const options = q.optionsByParent
    ? q.optionsByParent[parentValue]
    : q.options;

  return options?.find(o => o.value === value);
};

// -------------------
// 🧠 CALC 1
// -------------------
export const computeCalc1 = (answers) => {
  const tipo = answers.calc1_tipoCuidado;
  const prio = answers.calc1_prioridade;
  const dataPedido = new Date(answers.calc1_dataPedido);

  const opt = findOption("calc1_prioridade", tipo, prio);

  if (!opt) return { erro: "Dados inválidos" };

  const { tmrg, unit } = opt.payload;

  let dataLimite = new Date(dataPedido);

  if (unit === "hours") {
    dataLimite = addHours(dataPedido, tmrg);
  } else if (unit === "days") {
    dataLimite = addDays(dataPedido, tmrg);
  }

  const hoje = startOfToday();
  const diasRestantes = diffDays(dataLimite, hoje);

  return {
    tmrg,
    unit,
    dataLimite: dataLimite.toLocaleDateString(),
    diasRestantes,
    estado: diasRestantes >= 0 ? "Dentro do prazo" : "Prazo excedido",
  };
};

// -------------------
// 🧠 CALC 2
// -------------------
export const computeCalc2 = (answers) => {
  const base = computeCalc1(answers);

  const estado = answers.calc2_estado;

  const dataComparacao =
    estado === "realizada"
      ? new Date(answers.calc2_dataRealizacao)
      : startOfToday();

  const dataLimite = new Date(base.dataLimite);

  const margem = diffDays(dataLimite, dataComparacao);
  const cumpriu = margem >= 0;

  return {
    ...base,
    estado,
    cumpriu,
    diasMargem: Math.abs(margem),
    mensagem: cumpriu
      ? "Cumprido"
      : "Não cumprido",
  };
};