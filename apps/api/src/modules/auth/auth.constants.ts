export const AUTH_COOKIE_NAME_FALLBACK = "tm_session";

/** Reserved for future RBAC — attach role claims without implementing permissions yet. */
export const ADMIN_ROLE = "admin" as const;

export type AdminRole = typeof ADMIN_ROLE;
