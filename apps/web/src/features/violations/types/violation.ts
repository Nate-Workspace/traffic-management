export type ViolationStatus = "PENDING" | "NOTIFIED" | "REVIEWED" | "DISMISSED";
export type ViolationType = "RED_LIGHT";
export type NotificationDeliveryStatus = "NOT_SENT" | "SENT" | "FAILED";

export type NotificationLogSummary = {
  id: string;
  deliveryStatus: NotificationDeliveryStatus;
  recipientEmail: string;
  failureReason: string | null;
  attemptCount: number;
  sentAt: string | null;
  createdAt: string;
};

export type NotificationDispatchResult = {
  violationId: string;
  deliveryStatus: NotificationDeliveryStatus;
  workflowStatus: ViolationStatus;
  recipientEmail: string | null;
  failureReason: string | null;
  sentAt: string | null;
  notificationLogId: string;
};

export type WorkflowStatusUpdate = {
  id: string;
  status: ViolationStatus;
  notificationStatus: NotificationDeliveryStatus;
  lastNotifiedAt: string | null;
  updatedAt: string;
};

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
  violationAt: string;
  createdAt: string;
  updatedAt: string;
  driver: ViolationDriverSummary | null;
};

export type RelatedViolation = {
  id: string;
  violationType: ViolationType;
  status: ViolationStatus;
  violationAt: string;
  createdAt: string;
};

export type ViolationDetail = {
  violation: {
    id: string;
    violationType: ViolationType;
    status: ViolationStatus;
    notificationStatus: NotificationDeliveryStatus;
    lastNotifiedAt: string | null;
    imageUrls: string[];
    plateNumber: string;
    violationAt: string;
    createdAt: string;
    updatedAt: string;
  };
  driver: ViolationDriverDetail | null;
  relatedViolations: RelatedViolation[];
  latestNotification: NotificationLogSummary | null;
};

export type ManualWorkflowStatus = "PENDING" | "REVIEWED" | "DISMISSED";

export type ViolationSortField = "driverName" | "violationAt" | "createdAt";

export type ViolationsQueryParams = {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: ViolationStatus;
  notificationStatus?: NotificationDeliveryStatus;
  violationAtFrom?: string;
  violationAtTo?: string;
  createdAtFrom?: string;
  createdAtTo?: string;
  driverId?: string;
};

export type DriverViolationSortField = "violationAt" | "createdAt";
