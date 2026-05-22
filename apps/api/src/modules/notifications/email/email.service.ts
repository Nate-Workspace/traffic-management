import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer, { type Transporter } from "nodemailer";

export type SendEmailPayload = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export type SendEmailResult =
  | { success: true; messageId?: string }
  | { success: false; error: string };

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: Transporter | null = null;

  constructor(private readonly configService: ConfigService) {}

  private getConfig() {
    const email = this.configService.get<{
      host: string;
      port: number;
      secure: boolean;
      user?: string;
      pass?: string;
      fromAddress: string;
      fromName: string;
      enabled: boolean;
    }>("email", { infer: true });

    if (!email) {
      throw new Error("Email configuration is missing");
    }

    return email;
  }

  private getTransporter() {
    if (this.transporter) {
      return this.transporter;
    }

    const config = this.getConfig();

    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth:
        config.user && config.pass
          ? { user: config.user, pass: config.pass }
          : undefined,
    });

    return this.transporter;
  }

  async send(payload: SendEmailPayload): Promise<SendEmailResult> {
    const config = this.getConfig();

    if (!config.enabled) {
      this.logger.warn("Email delivery skipped — EMAIL_ENABLED is false");
      return { success: false, error: "Email delivery is disabled" };
    }

    if (!config.user || !config.pass) {
      return {
        success: false,
        error: "SMTP credentials are not configured",
      };
    }

    try {
      const result = await this.getTransporter().sendMail({
        from: `"${config.fromName}" <${config.fromAddress}>`,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
      });

      return { success: true, messageId: result.messageId };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send email";
      this.logger.error(`Email send failed: ${message}`);
      return { success: false, error: message };
    }
  }
}
