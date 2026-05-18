import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { analyticsApi } from "../api/analytics.api";
import { queryKeys } from "@/services/api/query-keys";
import type { RecentViolationsResponse } from "../types/analytics";

export const useRecentViolations = (): UseQueryResult<RecentViolationsResponse> =>
  useQuery({
    queryKey: queryKeys.analytics.recentViolations,
    queryFn: () => analyticsApi.recentViolations(),
  });
