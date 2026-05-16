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
  const { calc1_dataPedido, calc1_prioridade } = answers;

  const getLimite = (p) => {
    if (p === "n1") return 120;
    if (p === "n2") return 60;
    if (p === "n3") return 7;
    if (p === "n4") return 3;
    return 60;
  };

  const limite = getLimite(calc1_prioridade);

  const dataPedido = new Date(calc1_dataPedido);
  const dataLimite = new Date(dataPedido);
  dataLimite.setDate(dataLimite.getDate() + limite);

  const hoje = new Date();
  const ultrapassado = hoje > dataLimite;

  return {
    mensagem: ultrapassado
      ? "O prazo já foi ultrapassado."
      : "Ainda estás dentro do prazo.",

    resumo: ultrapassado
      ? `O prazo terminou em ${dataLimite.toLocaleDateString()}. Podes reclamar.`
      : `Tens direito até ${dataLimite.toLocaleDateString()}.`,
  };
};

// -------------------
// 🧠 CALC 2
// -------------------
export const computeCalc2 = (answers) => {
  const {
    calc2_estado,
    calc2_dataPedido,
    calc2_dataRealizacao,
    calc2_prioridade,
  } = answers;

  const getLimite = (p) => {
    if (p === "n1") return 120;
    if (p === "n2") return 60;
    if (p === "n3") return 7;
    return 60;
  };

  // 👉 EM ESPERA
  if (calc2_estado === "em_espera") {
    if (!calc2_dataPedido) {
      return {
        mensagem: "Faltam dados.",
        resumo: "Indica a data do pedido.",
      };
    }

    const hoje = new Date();
    const dataPedido = new Date(calc2_dataPedido);

    const dias = Math.floor(
      (hoje - dataPedido) / (1000 * 60 * 60 * 24)
    );

    const limite = getLimite(calc2_prioridade);
    const ultrapassado = dias > limite;

    return {
      mensagem: ultrapassado
        ? "O prazo já foi ultrapassado."
        : "Ainda estás dentro do prazo.",

      resumo: ultrapassado
        ? `Já passaram ${dias} dias (limite: ${limite}). Podes reclamar.`
        : `Já passaram ${dias} dias (limite: ${limite}).`,
    };
  }

  // 👉 JÁ REALIZADO
  if (!calc2_dataPedido || !calc2_dataRealizacao) {
    return {
      mensagem: "Faltam dados.",
      resumo: "Preenche todas as datas.",
    };
  }

  const dataPedido = new Date(calc2_dataPedido);
  const dataRealizacao = new Date(calc2_dataRealizacao);

  const dias = Math.floor(
    (dataRealizacao - dataPedido) / (1000 * 60 * 60 * 24)
  );

  const limite = getLimite(calc2_prioridade);
  const cumpriu = dias <= limite;

  return {
    mensagem: cumpriu
      ? "O prazo foi cumprido."
      : "O prazo não foi cumprido.",

    resumo: cumpriu
      ? `Foste atendido em ${dias} dias.`
      : `Esperaste ${dias} dias (limite: ${limite}).`,
  };
};