export type AnalyticsRange = {
  startDate: string;
  endDate: string;
};

export type AnalyticsRangeQuery = {
  startDate?: string;
  endDate?: string;
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
  violationType: "RED_LIGHT";
  status: "PENDING" | "NOTIFIED" | "REVIEWED" | "DISMISSED";
  plateNumber: string;
  violationAt: string;
  createdAt: string;
  driver:
    | {
        id: string;
        fullName: string;
        plateNumber: string;
      }
    | null;
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
