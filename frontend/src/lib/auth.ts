import api from "./api";

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function loginAdmin(username: string, password: string): Promise<LoginResponse> {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_token");
  }
  return null;
}

export function setToken(token: string): void {
  localStorage.setItem("admin_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("admin_token");
}

export function isAuthenticated(): boolean {
  const token = getToken();
  return !!token;
}
