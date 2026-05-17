import { registerAs } from "@nestjs/config";
import { env } from "./env";

export const appConfig = registerAs("app", () => ({
  environment: env.NODE_ENV,
  port: env.PORT,
  prefix: env.API_PREFIX,
  version: env.API_VERSION,
  logLevel: env.LOG_LEVEL,
  corsOrigins: env.CORS_ORIGINS,
}));
