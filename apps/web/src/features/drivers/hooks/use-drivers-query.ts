import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { driversApi, type DriversListResponse } from "../api/drivers.api";
import type { DriversQueryParams } from "../types/driver";
import { queryKeys } from "@/services/api/query-keys";

export const useDriversQuery = (
  query: DriversQueryParams,
): UseQueryResult<DriversListResponse> =>
  useQuery<DriversListResponse>({
    queryKey: queryKeys.drivers.list(query),
    queryFn: () => driversApi.list(query),
    placeholderData: (previous) => previous,
  });
