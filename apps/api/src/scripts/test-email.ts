import "dotenv/config";
import nodemailer from "nodemailer";
import { getEnv } from "../config/env/env";
import {
  createEtherealTransport,
  createSmtpTransport,
  humanizeSmtpError,
  verifyTransport,
} from "../modules/notifications/email/email-transport.factory";

const env = getEnv();

const run = async () => {
  console.log("Email configuration:");
  console.log(`  mode: ${env.SMTP_MODE}`);
  console.log(`  host: ${env.SMTP_HOST}`);
  console.log(`  port: ${env.SMTP_PORT}`);
  console.log(`  secure: ${env.SMTP_SECURE}`);
  console.log(`  user: ${env.SMTP_USER}`);
  console.log(`  pass length: ${env.SMTP_PASS?.length ?? 0}`);
  console.log(`  enabled: ${env.EMAIL_ENABLED}`);

  let mode = "smtp";
  let transport =
    env.SMTP_MODE === "ethereal"
      ? (await createEtherealTransport()).transporter
      : createSmtpTransport({
          host: env.SMTP_MODE === "gmail" ? "smtp.gmail.com" : env.SMTP_HOST,
          port: env.SMTP_PORT,
          secure: env.SMTP_SECURE,
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        });

  if (env.SMTP_MODE === "ethereal") {
    mode = "ethereal";
  } else if (env.SMTP_HOST === "smtp.gmail.com" || env.SMTP_MODE === "gmail") {
    mode = "gmail";
  }

  try {
    console.log(`\nVerifying ${mode} transport...`);
    await verifyTransport(transport);
    console.log("Verify: OK");
  } catch (error) {
    if (env.SMTP_MODE === "auto" && env.NODE_ENV === "development") {
      console.warn("\nSMTP verify failed — falling back to Ethereal (development only):");
      console.warn(humanizeSmtpError(error));
      const ethereal = await createEtherealTransport();
      transport = ethereal.transporter;
      mode = "ethereal";
      console.log(`Ethereal user: ${ethereal.user}`);
    } else {
      console.error("\nVerify failed:");
      console.error(humanizeSmtpError(error));
      process.exit(1);
    }
  }

  try {
    const to = env.SMTP_USER ?? "test@example.com";
    const info = await transport.sendMail({
      from: `"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM}>`,
      to,
      subject: "Traffic Management — SMTP test",
      text: "If you received this, email delivery is working.",
      html: "<p>If you received this, email delivery is working.</p>",
    });

    console.log("\nSend: OK");
    console.log(`  messageId: ${info.messageId}`);

    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) {
      console.log(`  preview: ${preview}`);
    }
  } catch (error) {
    console.error("\nSend failed:");
    console.error(humanizeSmtpError(error));
    process.exit(1);
  }
};

void run();
