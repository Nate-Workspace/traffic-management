import { useMutation, useQueryClient } from "@tanstack/react-query";
import { driversApi } from "../api/drivers.api";
import { queryKeys } from "@/services/api/query-keys";
import type { DriverFormValues } from "../validation/driver.schema";

export const useDriverMutations = () => {
  const queryClient = useQueryClient();

  const createDriver = useMutation({
    mutationFn: (payload: DriverFormValues) => driversApi.create(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all }),
  });

  const updateDriver = useMutation({
    mutationFn: (payload: { id: string; values: Partial<DriverFormValues> }) =>
      driversApi.update(payload.id, payload.values),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.drivers.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.drivers.stats(variables.id),
      });
    },
  });

  const deleteDriver = useMutation({
    mutationFn: (id: string) => driversApi.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all }),
  });

  return {
    createDriver,
    updateDriver,
    deleteDriver,
  };
};
