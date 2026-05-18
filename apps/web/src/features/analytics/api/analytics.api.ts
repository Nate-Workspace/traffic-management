import { apiFetch } from "@/services/api/client";
import type {
  AnalyticsRangeQuery,
  AnalyticsSummary,
  RecentViolationsResponse,
  RepeatedOffendersResponse,
  ViolationsTrendResponse,
} from "../types/analytics";

export const analyticsApi = {
  summary: (query: AnalyticsRangeQuery) =>
    apiFetch<AnalyticsSummary>("/api/v1/analytics/summary", { query }),
  violationsTrend: (query: AnalyticsRangeQuery) =>
    apiFetch<ViolationsTrendResponse>("/api/v1/analytics/violations-trend", { query }),
  repeatedOffenders: (query: AnalyticsRangeQuery) =>
    apiFetch<RepeatedOffendersResponse>("/api/v1/analytics/repeated-offenders", {
      query,
    }),
  recentViolations: () =>
    apiFetch<RecentViolationsResponse>("/api/v1/analytics/recent-violations"),
};
