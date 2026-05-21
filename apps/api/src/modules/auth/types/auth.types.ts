import type { AdminRole } from "../auth.constants";

export type JwtPayload = {
  sub: string;
  email: string;
  role: AdminRole;
};

export type AdminPublic = {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
};

export type SessionValidation = {
  authenticated: boolean;
  admin: AdminPublic | null;
};
