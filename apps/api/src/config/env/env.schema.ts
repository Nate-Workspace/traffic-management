import { z } from "zod";

/** Env files always provide strings; Boolean("false") is true in JS. */
const envBoolean = (defaultValue: boolean) =>
  z.preprocess((value) => {
    if (value === undefined || value === null || value === "") {
      return defaultValue;
    }
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "number") {
      return value !== 0;
    }

    const normalized = String(value).trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(normalized)) {
      return true;
    }
    if (["false", "0", "no", "off"].includes(normalized)) {
      return false;
    }

    return defaultValue;
  }, z.boolean());

const corsOriginsSchema = z
  .string()
  .default("http://localhost:3000")
  .transform((value) =>
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3002),
  API_PREFIX: z.string().default("api"),
  API_VERSION: z.string().default("1"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "log", "debug", "verbose"])
    .default("log"),
  CORS_ORIGINS: corsOriginsSchema,
  DATABASE_URL: z.string().url(),
  DB_SSL: envBoolean(true),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  DB_POOL_IDLE_MS: z.coerce.number().int().positive().default(30000),
  JWT_SECRET: z
    .string()
    .min(32)
    .default("development-only-jwt-secret-min-32-chars!!"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  AUTH_COOKIE_NAME: z.string().default("tm_session"),
  AUTH_COOKIE_SECURE: envBoolean(false),
  AUTH_COOKIE_SAME_SITE: z.enum(["strict", "lax", "none"]).default("lax"),
  AUTH_COOKIE_MAX_AGE_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(7 * 24 * 60 * 60 * 1000),
  ADMIN_SEED_EMAIL: z.string().email().optional(),
  ADMIN_SEED_PASSWORD: z.string().min(8).optional(),
  ADMIN_SEED_FULL_NAME: z.string().min(2).optional(),
  EMAIL_ENABLED: envBoolean(true),
  /** auto = try SMTP/Gmail, fall back to Ethereal in development if auth fails */
  SMTP_MODE: z.enum(["auto", "gmail", "smtp", "ethereal"]).default("auto"),
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_SECURE: envBoolean(false),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().default("noreply@traffic.local"),
  SMTP_FROM_NAME: z.string().default("Traffic Violation Management"),
});
