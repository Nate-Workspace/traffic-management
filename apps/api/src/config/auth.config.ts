import { registerAs } from "@nestjs/config";
import { getEnv } from "./env";

export const authConfig = registerAs("auth", () => {
  const env = getEnv();

  return {
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    cookieName: env.AUTH_COOKIE_NAME,
    cookieSecure: env.AUTH_COOKIE_SECURE,
    cookieSameSite: env.AUTH_COOKIE_SAME_SITE,
    cookieMaxAgeMs: env.AUTH_COOKIE_MAX_AGE_MS,
  };
});
