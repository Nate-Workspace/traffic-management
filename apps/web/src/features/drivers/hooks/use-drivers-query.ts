import { useQuery } from "@tanstack/react-query";
import { driversApi } from "../api/drivers.api";
import type { DriversQueryParams } from "../types/driver";
import { queryKeys } from "@/services/api/query-keys";

export const useDriversQuery = (query: DriversQueryParams) =>
  useQuery({
    queryKey: queryKeys.drivers.list(query),
    queryFn: () => driversApi.list(query),
    keepPreviousData: true,
  });
