import nodemailer, { type Transporter } from "nodemailer";

export type EmailTransportConfig = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
};

export type ResolvedEmailTransport = {
  transporter: Transporter;
  mode: "gmail" | "smtp" | "ethereal";
  user?: string;
};

const isGmailHost = (host: string) =>
  host === "smtp.gmail.com" || host === "gmail";

export const createSmtpTransport = (
  config: EmailTransportConfig,
): Transporter => {
  if (isGmailHost(config.host)) {
    return nodemailer.createTransport({
      service: "gmail",
      auth:
        config.user && config.pass
          ? { user: config.user, pass: config.pass }
          : undefined,
    });
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure && config.port === 587,
    auth:
      config.user && config.pass
        ? { user: config.user, pass: config.pass }
        : undefined,
  });
};

export const createEtherealTransport = async (): Promise<ResolvedEmailTransport> => {
  const account = await nodemailer.createTestAccount();

  return {
    mode: "ethereal",
    user: account.user,
    transporter: nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    }),
  };
};

export const verifyTransport = async (transporter: Transporter) => {
  await transporter.verify();
};

export const humanizeSmtpError = (error: unknown): string => {
  const message = error instanceof Error ? error.message : "Failed to send email";

  if (message.includes("535") || message.includes("BadCredentials")) {
    return [
      "Gmail rejected the SMTP login.",
      "Use a Gmail App Password (not your Google account password).",
      "Enable 2-Step Verification, then create one at:",
      "https://myaccount.google.com/apppasswords",
      "Set SMTP_PASS in apps/api/.env to the 16-character app password.",
    ].join(" ");
  }

  if (message.includes("wrong version number")) {
    return [
      "SMTP TLS mismatch.",
      "For Gmail use SMTP_PORT=587 and SMTP_SECURE=false, or SMTP_PORT=465 and SMTP_SECURE=true.",
    ].join(" ");
  }

  return message;
};
