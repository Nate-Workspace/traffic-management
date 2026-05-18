import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { violationsApi, type ViolationsListResponse } from "../api/violations.api";
import type { ViolationsQueryParams } from "../types/violation";
import { queryKeys } from "@/services/api/query-keys";

export const useViolationsQuery = (
  query: ViolationsQueryParams,
): UseQueryResult<ViolationsListResponse> =>
  useQuery({
    queryKey: queryKeys.violations.list(query),
    queryFn: () => violationsApi.list(query),
    keepPreviousData: true,
  });
