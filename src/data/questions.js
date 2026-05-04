export const questions = [
  // 👉 CALCULADORA 1

  {
    id: "calc1_tipoCuidado",
    type: "radio",
    question: "Qual o serviço que marcaste?",
    options: [
      { label: "Consulta hospitalar", value: "consulta_geral" },
      { label: "Consulta oncologia", value: "consulta_onco" },
      { label: "Cirurgia", value: "cirurgia_geral" },
    ],
  },

  {
    id: "calc1_prioridade",
    type: "radio",
    question: "Qual o estado?",
    dependsOn: "calc1_tipoCuidado",

    optionsByParent: {
      consulta_geral: [
        { label: "Normal", value: "n1", payload: { tmrg: 120, unit: "days" } },
        { label: "Prioritária", value: "n2", payload: { tmrg: 60, unit: "days" } },
      ],

      consulta_onco: [
        { label: "Urgente", value: "n3", payload: { tmrg: 7, unit: "days" } },
        { label: "Normal", value: "n1", payload: { tmrg: 30, unit: "days" } },
      ],

      cirurgia_geral: [
        { label: "Normal", value: "n1", payload: { tmrg: 180, unit: "days" } },
        { label: "Urgente", value: "n4", payload: { tmrg: 72, unit: "hours" } },
      ],
    },
  },

  {
    id: "calc1_dataPedido",
    type: "date",
    question: "Quando fizeste o pedido?",
  },

  // 👉 CALCULADORA 2

  {
    id: "calc2_estado",
    type: "radio",
    question: "Situação",
    options: [
      { label: "Já realizado", value: "realizada" },
      { label: "Em espera", value: "em_espera" },
    ],
  },

  {
    id: "calc2_dataRealizacao",
    type: "date",
    question: "Data realização",
    showIf: { questionId: "calc2_estado", equals: "realizada" },
  },
];