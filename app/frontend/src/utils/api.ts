const API_BASE = "/api";

export interface User {
  id: string;
  username: string;
}

export function getToken() {
  return localStorage.getItem("mlnexus_token");
}

export function setAuth(token: string, user: User) {
  localStorage.setItem("mlnexus_token", token);
  localStorage.setItem("mlnexus_user", JSON.stringify(user));
}

export function getUser(): User | null {
  const raw = localStorage.getItem("mlnexus_user");
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.removeItem("mlnexus_token");
  localStorage.removeItem("mlnexus_user");
}

export async function api(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>)
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}
