import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import {
  createEtherealTransport,
  createSmtpTransport,
  humanizeSmtpError,
  verifyTransport,
  type ResolvedEmailTransport,
} from "./email-transport.factory";

export type SendEmailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type SendEmailResult =
  | { success: true; messageId?: string; previewUrl?: string | null }
  | { success: false; error: string };

type EmailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  fromAddress: string;
  fromName: string;
  enabled: boolean;
  mode: "auto" | "gmail" | "smtp" | "ethereal";
  nodeEnv: string;
};

@Injectable()
export class EmailService implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);
  private transport: ResolvedEmailTransport | null = null;

  constructor(private readonly configService: ConfigService) {}

  private getConfig(): EmailConfig {
    const email = this.configService.get<EmailConfig>("email", { infer: true });

    if (!email) {
      throw new Error("Email configuration is missing");
    }

    return email;
  }

  async onModuleInit() {
    const config = this.getConfig();

    if (!config.enabled) {
      this.logger.warn("Email delivery disabled (EMAIL_ENABLED=false)");
      return;
    }

    try {
      await this.ensureTransport();
      this.logger.log(
        `Email transport ready (${this.transport?.mode ?? "unknown"}${
          this.transport?.user ? ` as ${this.transport.user}` : ""
        })`,
      );
    } catch (error) {
      const message = humanizeSmtpError(error);
      this.logger.error(`Email transport failed to initialize: ${message}`);
    }
  }

  private async ensureTransport(): Promise<ResolvedEmailTransport> {
    if (this.transport) {
      return this.transport;
    }

    const config = this.getConfig();

    if (config.mode === "ethereal") {
      this.transport = await createEtherealTransport();
      return this.transport;
    }

    if (config.mode === "gmail" || config.mode === "smtp" || config.mode === "auto") {
      const smtpTransport = createSmtpTransport({
        host: config.mode === "gmail" ? "smtp.gmail.com" : config.host,
        port: config.port,
        secure: config.secure,
        user: config.user,
        pass: config.pass,
      });

      try {
        await verifyTransport(smtpTransport);
        this.transport = {
          transporter: smtpTransport,
          mode: config.mode === "gmail" || config.host === "smtp.gmail.com" ? "gmail" : "smtp",
          user: config.user,
        };
        return this.transport;
      } catch (error) {
        if (config.mode === "auto" && config.nodeEnv === "development") {
          this.logger.warn(
            `SMTP verification failed; using Ethereal test inbox for development. ${humanizeSmtpError(error)}`,
          );
          this.transport = await createEtherealTransport();
          this.logger.log(
            `Ethereal inbox: ${this.transport.user} (preview URLs logged on each send)`,
          );
          return this.transport;
        }

        throw error;
      }
    }

    throw new Error(`Unsupported email mode: ${config.mode}`);
  }

  async send(payload: SendEmailPayload): Promise<SendEmailResult> {
    const config = this.getConfig();

    if (!config.enabled) {
      this.logger.warn("Email delivery skipped — EMAIL_ENABLED is false");
      return { success: false, error: "Email delivery is disabled" };
    }

    if (config.mode !== "ethereal" && (!config.user || !config.pass)) {
      return {
        success: false,
        error: "SMTP credentials are not configured",
      };
    }

    try {
      const resolved = await this.ensureTransport();
      const result = await resolved.transporter.sendMail({
        from: `"${config.fromName}" <${config.fromAddress}>`,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      });

      const previewUrl = nodemailer.getTestMessageUrl(result);
      const preview = typeof previewUrl === "string" ? previewUrl : null;

      if (preview) {
        this.logger.log(`Ethereal email preview: ${preview}`);
      }

      return {
        success: true,
        messageId: result.messageId,
        previewUrl: preview,
      };
    } catch (error) {
      const message = humanizeSmtpError(error);
      this.logger.error(`Email send failed: ${message}`);
      return { success: false, error: message };
    }
  }
}
