export const routes = {
  login: "/login",
  dashboard: "/dashboard",
  drivers: "/drivers",
  violations: "/violations",
} as const;

export const protectedRoutes = [
  routes.dashboard,
  routes.drivers,
  routes.violations,
] as const;
