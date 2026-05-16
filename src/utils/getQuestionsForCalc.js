import { questions } from "../data/questions";

export const getQuestionsForCalc = (ids) => {
  return questions.filter(q => ids.includes(q.id));
};