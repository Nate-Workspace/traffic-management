import { apiFetch } from "@/services/api/client";
import type { PaginatedResponse } from "@/services/api/types";
import type { Driver, DriversQueryParams } from "../types/driver";
import type { DriverFormValues } from "../validation/driver.schema";

export type DriversListResponse = PaginatedResponse<Driver>;

export const driversApi = {
  list: (query: DriversQueryParams) =>
    apiFetch<DriversListResponse>("/api/v1/drivers", { query }),
  getById: (id: string) => apiFetch<Driver>(`/api/v1/drivers/${id}`),
  create: (payload: DriverFormValues) =>
    apiFetch<Driver>("/api/v1/drivers", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: Partial<DriverFormValues>) =>
    apiFetch<Driver>(`/api/v1/drivers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    apiFetch<{ id: string }>(`/api/v1/drivers/${id}`, {
      method: "DELETE",
    }),
};
