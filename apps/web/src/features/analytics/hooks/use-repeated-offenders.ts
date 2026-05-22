import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { analyticsApi } from "../api/analytics.api";
import { queryKeys } from "@/services/api/query-keys";
import type {
  AnalyticsRangeQuery,
  RepeatedOffendersResponse,
} from "../types/analytics";

export const useRepeatedOffenders = (
  query: AnalyticsRangeQuery,
): UseQueryResult<RepeatedOffendersResponse> =>
  useQuery<RepeatedOffendersResponse>({
    queryKey: queryKeys.analytics.repeatedOffenders(query),
    queryFn: () => analyticsApi.repeatedOffenders(query),
    placeholderData: (previous) => previous,
  });
