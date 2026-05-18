import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { analyticsApi } from "../api/analytics.api";
import { queryKeys } from "@/services/api/query-keys";
import type { AnalyticsRangeQuery, ViolationsTrendResponse } from "../types/analytics";

export const useViolationsTrend = (
  query: AnalyticsRangeQuery,
): UseQueryResult<ViolationsTrendResponse> =>
  useQuery({
    queryKey: queryKeys.analytics.trend(query),
    queryFn: () => analyticsApi.violationsTrend(query),
    keepPreviousData: true,
  });
