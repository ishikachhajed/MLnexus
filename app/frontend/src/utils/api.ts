const API_BASE = "/api";

export interface User {
  id: string;
  username: string;
}

function isTokenExpired(token: string): boolean {
    const parts = token.split(".");
    if (parts.length !== 3) {
        return true;
    }
    try {
        const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = payloadBase64.padEnd(
            payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
            "=",
        );
        const payload = JSON.parse(atob(padded)) as { exp?: number };
        if (!payload.exp) {
            return true;
        }
        return payload.exp * 1000 <= Date.now();
    } catch {
        return true;
    }
}

export function getToken() {
    const token = localStorage.getItem("mlnexus_token");
    if (!token) {
        return null;
    }
    if (isTokenExpired(token)) {
        clearAuth();
        return null;
    }
    return token;
}

export function setAuth(token: string, user: User) {
  localStorage.setItem("mlnexus_token", token);
  localStorage.setItem("mlnexus_user", JSON.stringify(user));
}

export function getUser(): User | null {
    if (!getToken()) {
        return null;
    }
    const raw = localStorage.getItem("mlnexus_user");
    return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  localStorage.removeItem("mlnexus_token");
  localStorage.removeItem("mlnexus_user");
  localStorage.removeItem("mlnexus_avatar_url");
}

export async function api(path: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    const token = getToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let res: Response;
    try {
        res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    } catch {
        throw new Error("Network error. Please check the backend connection.");
    }

    let data: unknown = null;
    try {
        data = await res.json();
    } catch {
        if (!res.ok) {
            throw new Error(`Request failed (${res.status})`);
        }
        return null;
    }

    if (!res.ok) {
        const message =
            typeof (data as { error?: unknown })?.error === "string"
                ? (data as { error: string }).error
                : `Request failed (${res.status})`;
        throw new Error(message);
    }

    return data;
}
