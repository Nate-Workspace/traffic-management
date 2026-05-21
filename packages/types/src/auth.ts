export type AdminRole = "admin";

export type Admin = {
  id: string;
  fullName: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
};

export type SessionResponse = {
  authenticated: boolean;
  admin: Admin | null;
};
