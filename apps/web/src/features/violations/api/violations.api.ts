import { apiFetch } from "@/services/api/client";
import type { PaginatedResponse } from "@/services/api/types";
import type {
  ViolationDetail,
  ViolationListItem,
  ViolationsQueryParams,
} from "../types/violation";

export type ViolationsListResponse = PaginatedResponse<ViolationListItem>;
export type ViolationDetailResponse = ViolationDetail;

export const violationsApi = {
  list: (query: ViolationsQueryParams) =>
    apiFetch<ViolationsListResponse>("/api/v1/violations", { query }),
  getById: (id: string) =>
    apiFetch<ViolationDetailResponse>(`/api/v1/violations/${id}`),
};
