const TOKEN_KEY = "adminToken";
const USER_KEY  = "adminUsername";

export const getToken    = ()        => localStorage.getItem(TOKEN_KEY);
export const getUsername = ()        => localStorage.getItem(USER_KEY);
export const isLoggedIn  = ()        => !!getToken();
export const saveSession = (token, username) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
};
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});
