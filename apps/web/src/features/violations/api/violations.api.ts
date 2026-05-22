import { apiFetch } from "@/services/api/client";
import type { PaginatedResponse } from "@/services/api/types";
import type {
  NotificationDispatchResult,
  ViolationDetail,
  ViolationListItem,
  ViolationsQueryParams,
  WorkflowStatusUpdate,
  ManualWorkflowStatus,
} from "../types/violation";

export type ViolationsListResponse = PaginatedResponse<ViolationListItem>;
export type ViolationDetailResponse = ViolationDetail;

export const violationsApi = {
  list: (query: ViolationsQueryParams) =>
    apiFetch<ViolationsListResponse>("/api/v1/violations", { query }),
  getById: (id: string) =>
    apiFetch<ViolationDetailResponse>(`/api/v1/violations/${id}`),

  resendNotification: (id: string) =>
    apiFetch<NotificationDispatchResult>(`/api/v1/violations/${id}/notifications/resend`, {
      method: "POST",
    }),

  updateWorkflowStatus: (id: string, status: ManualWorkflowStatus) =>
    apiFetch<WorkflowStatusUpdate>(`/api/v1/violations/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
