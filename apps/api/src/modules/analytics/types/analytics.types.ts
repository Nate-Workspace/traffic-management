import type { ViolationStatus, ViolationType } from "@modules/violations/types/violation.types";

export type AnalyticsRange = {
  startDate: string;
  endDate: string;
};

export type AnalyticsSummary = AnalyticsRange & {
  totalViolations: number;
  repeatedOffenders: number;
};

export type AnalyticsStatic = {
  totalDrivers: number;
  violationsToday: number;
};

export type RecentViolation = {
  id: string;
  violationType: ViolationType;
  status: ViolationStatus;
  violationAt: Date;
  createdAt: Date;
  driver: {
    id: string;
    fullName: string;
    plateNumber: string;
  };
};

export type RecentViolationsResponse = AnalyticsStatic & {
  recentViolations: RecentViolation[];
};

export type ViolationsTrendPoint = {
  date: string;
  total: number;
  pending: number;
  notified: number;
  reviewed: number;
  dismissed: number;
};

export type ViolationsTrendResponse = AnalyticsRange & {
  points: ViolationsTrendPoint[];
};

export type RepeatedOffender = {
  driverId: string;
  driverName: string;
  plateNumber: string;
  violationCount: number;
};

export type RepeatedOffendersResponse = AnalyticsRange & {
  offenders: RepeatedOffender[];
};
