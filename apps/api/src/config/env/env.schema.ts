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
});
