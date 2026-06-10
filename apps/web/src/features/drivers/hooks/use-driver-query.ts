import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { driversApi } from "../api/drivers.api";
import { queryKeys } from "@/services/api/query-keys";
import type { Driver } from "../types/driver";

export const useDriverQuery = (id?: string): UseQueryResult<Driver> =>
  useQuery<Driver>({
    queryKey: id ? queryKeys.drivers.detail(id) : queryKeys.drivers.detail("missing"),
    queryFn: () => driversApi.getById(id as string),
    enabled: Boolean(id),
  });
