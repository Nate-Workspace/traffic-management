import type { notificationDeliveryStatusValues } from "@modules/violations/schema/violations.schema";
import type { violationStatusValues } from "@modules/violations/schema/violations.schema";

export type NotificationDeliveryStatus =
  (typeof notificationDeliveryStatusValues)[number];

export type ViolationWorkflowStatus = (typeof violationStatusValues)[number];

export type NotificationDispatchResult = {
  violationId: string;
  deliveryStatus: NotificationDeliveryStatus;
  workflowStatus: ViolationWorkflowStatus;
  recipientEmail: string | null;
  failureReason: string | null;
  sentAt: string | null;
  notificationLogId: string;
};

export type NotificationLogSummary = {
  id: string;
  deliveryStatus: NotificationDeliveryStatus;
  recipientEmail: string;
  failureReason: string | null;
  attemptCount: number;
  sentAt: string | null;
  createdAt: string;
};
