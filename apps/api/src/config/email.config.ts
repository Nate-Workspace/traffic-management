import { registerAs } from "@nestjs/config";
import { getEnv } from "./env";

export const emailConfig = registerAs("email", () => {
  const env = getEnv();

  return {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    fromAddress: env.SMTP_FROM,
    fromName: env.SMTP_FROM_NAME,
    enabled: env.EMAIL_ENABLED,
    mode: env.SMTP_MODE,
    nodeEnv: env.NODE_ENV,
  };
});
