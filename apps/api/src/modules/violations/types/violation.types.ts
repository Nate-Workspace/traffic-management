import type { violations } from "../schema/violations.schema";
import type {
  violationStatusValues,
  violationTypeValues,
} from "../schema/violations.schema";

export type ViolationStatus = (typeof violationStatusValues)[number];
export type ViolationType = (typeof violationTypeValues)[number];

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
  imageUrls: string[];
  violationAt: Date;
  createdAt: Date;
  updatedAt: Date;
  driver: ViolationDriverSummary;
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
    imageUrls: string[];
    violationAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  driver: ViolationDriverDetail;
  relatedViolations: RelatedViolation[];
};

export type AiViolationPayload = {
  plateNumber: string;
  timestamp: string;
  imageUrls: string[];
  violationType: ViolationType;
};

export type AiViolationResult =
  | {
      status: "created";
      violation: ViolationListItem;
      driver: ViolationDriverSummary;
    }
  | {
      status: "driver_not_found";
      plateNumber: string;
    };
