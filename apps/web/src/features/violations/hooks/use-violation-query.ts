import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { violationsApi, type ViolationDetailResponse } from "../api/violations.api";
import { queryKeys } from "@/services/api/query-keys";

export const useViolationQuery = (
  id?: string,
): UseQueryResult<ViolationDetailResponse> =>
  useQuery({
    queryKey: id ? queryKeys.violations.detail(id) : queryKeys.violations.detail("missing"),
    queryFn: () => violationsApi.getById(id as string),
    enabled: Boolean(id),
  });
