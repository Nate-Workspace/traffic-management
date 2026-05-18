import { registerAs } from "@nestjs/config";
import { getEnv } from "../env";

export const databaseConfig = registerAs("database", () => ({
  url: getEnv().DATABASE_URL,
  ssl: getEnv().DB_SSL,
  poolMax: getEnv().DB_POOL_MAX,
  poolIdleMs: getEnv().DB_POOL_IDLE_MS,
}));
