import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { driversApi } from "../api/drivers.api";
import { queryKeys } from "@/services/api/query-keys";
import type { DriverStats } from "../types/driver";

export const useDriverStatsQuery = (id?: string): UseQueryResult<DriverStats> =>
  useQuery<DriverStats>({
    queryKey: id ? queryKeys.drivers.stats(id) : queryKeys.drivers.stats("missing"),
    queryFn: () => driversApi.getStats(id as string),
    enabled: Boolean(id),
  });
