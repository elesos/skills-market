export const TOKEN_KEY = "admin_token";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (t: string): void => {
  localStorage.setItem(TOKEN_KEY, t);
};

export const clearToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
