import { startOfToday, diffDays } from "../../utils/dates";

export const computeCalc1 = (answers) => {
  const tipo = answers.calc1_tipoCuidado;
  const prio = answers.calc1_prioridade;
  const dataPedido = new Date(answers.calc1_dataPedido);

  const option = findOption(tipo, prio);

  const { tmrg, unit } = option.payload;

  const dataLimite = new Date(dataPedido);

  if (unit === "days") {
    dataLimite.setDate(dataLimite.getDate() + tmrg);
  } else if (unit === "hours") {
    dataLimite.setHours(dataLimite.getHours() + tmrg);
  }

  const hoje = startOfToday();
  const diasRestantes = diffDays(dataLimite, hoje);

  return {
    tmrg,
    dataLimite,
    diasRestantes,
  };
};

const findOption = (tipo, prio) => {
  const map = {
    consulta_geral: [
      { value: "n1", payload: { tmrg: 120, unit: "days" } },
      { value: "n2", payload: { tmrg: 60, unit: "days" } },
    ],
    cirurgia_geral: [
      { value: "n1", payload: { tmrg: 180, unit: "days" } },
      { value: "n4", payload: { tmrg: 72, unit: "hours" } },
    ],
  };

  return map[tipo].find((o) => o.value === prio);
};