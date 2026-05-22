import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { analyticsApi } from "../api/analytics.api";
import { queryKeys } from "@/services/api/query-keys";
import type { AnalyticsRangeQuery, AnalyticsSummary } from "../types/analytics";

export const useAnalyticsSummary = (
  query: AnalyticsRangeQuery,
): UseQueryResult<AnalyticsSummary> =>
  useQuery<AnalyticsSummary>({
    queryKey: queryKeys.analytics.summary(query),
    queryFn: () => analyticsApi.summary(query),
    placeholderData: (previous) => previous,
  });
