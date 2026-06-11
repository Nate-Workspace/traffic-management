import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { DRIZZLE_DB } from "@database/database.tokens";
import type { Database } from "@database/database.types";
import { drivers } from "@modules/drivers/schema/drivers.schema";
import { violations } from "@modules/violations/schema/violations.schema";
import { violationNotifications } from "./schema/violation-notifications.schema";
import { EmailService } from "./email/email.service";
import { buildViolationNoticeEmail } from "./email/templates/violation-notice.template";
import { RESEND_COOLDOWN_MS, VIOLATION_TYPE_LABELS } from "./notifications.constants";
import type {
  NotificationDeliveryStatus,
  NotificationDispatchResult,
  NotificationLogSummary,
} from "./types/notification.types";

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(DRIZZLE_DB) private readonly db: Database,
    private readonly emailService: EmailService,
  ) {}

  async dispatchViolationNotice(
    violationId: string,
    options: { manual?: boolean } = {},
  ): Promise<NotificationDispatchResult> {
    const context = await this.loadViolationContext(violationId);

    if (!context) {
      throw new NotFoundException({
        code: "violation_not_found",
        message: "Violation not found",
      });
    }

    if (options.manual) {
      await this.assertResendAllowed(violationId, context.lastNotifiedAt);
    }

    const driverName = context.driverName?.trim() || "Unknown Driver";
    const plateNumber = context.plateNumber?.trim() || "Unknown";
    const recipientEmail = context.driverEmail?.trim();

    if (!recipientEmail) {
      return this.recordFailedDelivery({
        violationId,
        recipientEmail: "missing@driver.local",
        subject: "Traffic Violation Notice",
        failureReason: "Driver email address is missing",
      });
    }

    const template = buildViolationNoticeEmail({
      driverName,
      plateNumber,
      violationType: context.violationType,
      violationTypeLabel:
        VIOLATION_TYPE_LABELS[context.violationType] ?? context.violationType,
      violationAt: context.violationAt,
    });

    const sendResult = await this.emailService.send({
      to: recipientEmail,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    if (!sendResult.success) {
      return this.recordFailedDelivery({
        violationId,
        recipientEmail,
        subject: template.subject,
        failureReason: sendResult.error,
      });
    }

    return this.recordSuccessfulDelivery({
      violationId,
      recipientEmail,
      subject: template.subject,
    });
  }

  async resendViolationNotice(
    violationId: string,
  ): Promise<NotificationDispatchResult> {
    const result = await this.dispatchViolationNotice(violationId, {
      manual: true,
    });

    if (result.deliveryStatus !== "SENT") {
      throw new BadGatewayException({
        code: "notification_delivery_failed",
        message: result.failureReason ?? "Failed to send notification email",
      });
    }

    return result;
  }

  async getLatestLog(violationId: string): Promise<NotificationLogSummary | null> {
    const [log] = await this.db
      .select()
      .from(violationNotifications)
      .where(eq(violationNotifications.violationId, violationId))
      .orderBy(desc(violationNotifications.createdAt))
      .limit(1);

    if (!log) {
      return null;
    }

    return {
      id: log.id,
      deliveryStatus: log.deliveryStatus,
      recipientEmail: log.recipientEmail,
      failureReason: log.failureReason,
      attemptCount: log.attemptCount,
      sentAt: log.sentAt?.toISOString() ?? null,
      createdAt: log.createdAt.toISOString(),
    };
  }

  private async loadViolationContext(violationId: string) {
    const [row] = await this.db
      .select({
        id: violations.id,
        violationType: violations.violationType,
        violationAt: violations.violationAt,
        status: violations.status,
        notificationStatus: violations.notificationStatus,
        lastNotifiedAt: violations.lastNotifiedAt,
        driverName: drivers.fullName,
        driverEmail: drivers.email,
        plateNumber: drivers.plateNumber,
      })
      .from(violations)
      .leftJoin(drivers, eq(violations.driverId, drivers.id))
      .where(eq(violations.id, violationId))
      .limit(1);

    return row ?? null;
  }

  private async assertResendAllowed(
    violationId: string,
    lastNotifiedAt: Date | null,
  ) {
    const latest = await this.getLatestLog(violationId);

    if (latest) {
      const elapsed = Date.now() - new Date(latest.createdAt).getTime();
      if (elapsed < RESEND_COOLDOWN_MS) {
        throw new BadRequestException({
          code: "resend_cooldown",
          message: "Please wait before resending the notification again",
        });
      }
    }

    if (lastNotifiedAt) {
      const elapsed = Date.now() - lastNotifiedAt.getTime();
      if (elapsed < RESEND_COOLDOWN_MS) {
        throw new BadRequestException({
          code: "resend_cooldown",
          message: "Please wait before resending the notification again",
        });
      }
    }
  }

  private async recordSuccessfulDelivery(input: {
    violationId: string;
    recipientEmail: string;
    subject: string;
  }): Promise<NotificationDispatchResult> {
    const sentAt = new Date();

    const [log] = await this.db
      .insert(violationNotifications)
      .values({
        violationId: input.violationId,
        channel: "EMAIL",
        deliveryStatus: "SENT",
        recipientEmail: input.recipientEmail,
        subject: input.subject,
        sentAt,
        attemptCount: 1,
      })
      .returning();

    const [updated] = await this.db
      .update(violations)
      .set({
        notificationStatus: "SENT",
        status: "NOTIFIED",
        lastNotifiedAt: sentAt,
      })
      .where(eq(violations.id, input.violationId))
      .returning({
        status: violations.status,
      });

    if (!log || !updated) {
      throw new Error("Failed to persist notification delivery");
    }

    return {
      violationId: input.violationId,
      deliveryStatus: "SENT",
      workflowStatus: updated.status,
      recipientEmail: input.recipientEmail,
      failureReason: null,
      sentAt: sentAt.toISOString(),
      notificationLogId: log.id,
    };
  }

  private async recordFailedDelivery(input: {
    violationId: string;
    recipientEmail: string;
    subject: string;
    failureReason: string;
  }): Promise<NotificationDispatchResult> {
    const [log] = await this.db
      .insert(violationNotifications)
      .values({
        violationId: input.violationId,
        channel: "EMAIL",
        deliveryStatus: "FAILED",
        recipientEmail: input.recipientEmail,
        subject: input.subject,
        failureReason: input.failureReason,
        attemptCount: 1,
      })
      .returning();

    const [updated] = await this.db
      .update(violations)
      .set({
        notificationStatus: "FAILED",
      })
      .where(eq(violations.id, input.violationId))
      .returning({
        status: violations.status,
        notificationStatus: violations.notificationStatus,
      });

    if (!log || !updated) {
      throw new Error("Failed to persist notification delivery");
    }

    return {
      violationId: input.violationId,
      deliveryStatus: "FAILED",
      workflowStatus: updated.status,
      recipientEmail:
        input.recipientEmail === "missing@driver.local"
          ? null
          : input.recipientEmail,
      failureReason: input.failureReason,
      sentAt: null,
      notificationLogId: log.id,
    };
  }
}
