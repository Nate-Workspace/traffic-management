import { registerAs } from "@nestjs/config";
import { getEnv } from "./env";

export const appConfig = registerAs("app", () => ({
  environment: getEnv().NODE_ENV,
  port: getEnv().PORT,
  prefix: getEnv().API_PREFIX,
  version: getEnv().API_VERSION,
  logLevel: getEnv().LOG_LEVEL,
  corsOrigins: getEnv().CORS_ORIGINS,
}));
