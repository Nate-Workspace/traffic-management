import { registerAs } from "@nestjs/config";
import { env } from "../env";

export const databaseConfig = registerAs("database", () => ({
  url: env.DATABASE_URL,
  ssl: env.DB_SSL,
  poolMax: env.DB_POOL_MAX,
  poolIdleMs: env.DB_POOL_IDLE_MS,
}));
