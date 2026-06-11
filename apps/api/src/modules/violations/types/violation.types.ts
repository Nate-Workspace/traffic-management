import type { violations } from "../schema/violations.schema";
import type {
  notificationDeliveryStatusValues,
  violationStatusValues,
  violationTypeValues,
} from "../schema/violations.schema";
import type { NotificationLogSummary } from "@modules/notifications/types/notification.types";
import type { NotificationDispatchResult } from "@modules/notifications/types/notification.types";

export type ViolationStatus = (typeof violationStatusValues)[number];
export type ViolationType = (typeof violationTypeValues)[number];
export type NotificationDeliveryStatus =
  (typeof notificationDeliveryStatusValues)[number];

export type Violation = typeof violations.$inferSelect;
export type NewViolation = typeof violations.$inferInsert;

export type ViolationDriverSummary = {
  id: string;
  fullName: string;
  plateNumber: string;
};

export type ViolationDriverDetail = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  plateNumber: string;
  driverLicenseNumber: string;
};

export type ViolationListItem = {
  id: string;
  violationType: ViolationType;
  status: ViolationStatus;
  notificationStatus: NotificationDeliveryStatus;
  imageUrls: string[];
  plateNumber: string;
  violationAt: Date;
  createdAt: Date;
  updatedAt: Date;
  driver: ViolationDriverSummary | null;
};

export type RelatedViolation = {
  id: string;
  violationType: ViolationType;
  status: ViolationStatus;
  violationAt: Date;
  createdAt: Date;
};

export type ViolationDetail = {
  violation: {
    id: string;
    violationType: ViolationType;
    status: ViolationStatus;
    notificationStatus: NotificationDeliveryStatus;
    lastNotifiedAt: Date | null;
    imageUrls: string[];
    plateNumber: string;
    violationAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  driver: ViolationDriverDetail | null;
  relatedViolations: RelatedViolation[];
  latestNotification: NotificationLogSummary | null;
};

export type AiViolationPayload = {
  plateNumber: string;
  timestamp: string;
  imageUrls: string[];
  violationType: ViolationType;
};

export type AiViolationResult =
  {
    status: "created";
    violation: ViolationListItem;
    driver: ViolationDriverSummary | null;
    notification: NotificationDispatchResult | null;
  };
