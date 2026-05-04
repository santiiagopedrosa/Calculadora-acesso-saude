const KEYS = {
    INSCRIPTIONS: "inscriptions",
    FEEDBACKS: "feedbacks",
};

export function getInscriptions() {
  return JSON.parse(localStorage.getItem(KEYS.INSCRIPTIONS) || []);
}

export function saveInscriptions(data) {
    localStorage.setItem(KEYS.INSCRIPTIONS, JSON.stringify(data));
}

export function getFeedbacks() {
    return JSON.parse(localStorage.getItem(KEYS.FEEDBACKS)) || [];
}

export function saveFeedbacks(data) {
    localStorage.setItem(KEYS.FEEDBACKS, JSON.stringify(data));
}

export function getAnalyses() {
  return JSON.parse(localStorage.getItem("primeiras_analises")) || [];
}

export function saveAnalyses(data) {
  localStorage.setItem("primeiras_analises", JSON.stringify(data));
}

export function getVisitors() {
  return JSON.parse(localStorage.getItem("visitors")) || [];
}

export function saveVisitor(visitor) {
  const existing = getVisitors();
  localStorage.setItem("visitors",JSON.stringify([...existing, visitor]));
}

export function getContacts() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

export function saveContact(contact) {
  const existing = getContacts();
  localStorage.setItem("contacts",JSON.stringify([...existing, contact]));
}