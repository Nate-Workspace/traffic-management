import { z } from "zod";

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
  DB_SSL: z.coerce.boolean().default(true),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  DB_POOL_IDLE_MS: z.coerce.number().int().positive().default(30000),
  JWT_SECRET: z
    .string()
    .min(32)
    .default("development-only-jwt-secret-min-32-chars!!"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  AUTH_COOKIE_NAME: z.string().default("tm_session"),
  AUTH_COOKIE_SECURE: z.coerce.boolean().default(false),
  AUTH_COOKIE_SAME_SITE: z.enum(["strict", "lax", "none"]).default("lax"),
  AUTH_COOKIE_MAX_AGE_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(7 * 24 * 60 * 60 * 1000),
  ADMIN_SEED_EMAIL: z.string().email().optional(),
  ADMIN_SEED_PASSWORD: z.string().min(8).optional(),
  ADMIN_SEED_FULL_NAME: z.string().min(2).optional(),
});
