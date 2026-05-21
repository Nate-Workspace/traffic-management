import { apiFetch } from "@/services/api/client";
import type { Admin, LoginPayload, SessionResponse } from "../types/auth";

export const authApi = {
  login: (payload: LoginPayload) =>
    apiFetch<Admin>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
      skipUnauthorizedHandler: true,
    }),

  logout: () =>
    apiFetch<{ success: true }>("/api/v1/auth/logout", {
      method: "POST",
    }),

  me: () => apiFetch<Admin>("/api/v1/auth/me"),

  session: () =>
    apiFetch<SessionResponse>("/api/v1/auth/session", {
      skipUnauthorizedHandler: true,
    }),
};
