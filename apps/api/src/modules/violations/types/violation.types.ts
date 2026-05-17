import type { violations } from "../schema/violations.schema";
import type {
  violationStatusValues,
  violationTypeValues,
} from "../schema/violations.schema";

export type ViolationStatus = (typeof violationStatusValues)[number];
export type ViolationType = (typeof violationTypeValues)[number];

export type Violation = typeof violations.$inferSelect;
export type NewViolation = typeof violations.$inferInsert;

export type ViolationListItem = {
  id: string;
  driverId: string;
  driverName: string;
  plateNumber: string;
  violationType: ViolationType;
  status: ViolationStatus;
  imageUrls: string[];
  violationAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AiViolationPayload = {
  plateNumber: string;
  timestamp: string;
  imageUrls: string[];
  violationType: ViolationType;
};
