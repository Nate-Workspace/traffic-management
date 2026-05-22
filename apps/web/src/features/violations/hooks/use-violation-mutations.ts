"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { violationsApi } from "../api/violations.api";
import { queryKeys } from "@/services/api/query-keys";
import type { ManualWorkflowStatus } from "../types/violation";

export const useViolationMutations = (violationId: string) => {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.violations.detail(violationId) });
    queryClient.invalidateQueries({ queryKey: queryKeys.violations.all });
  };

  const resendNotification = useMutation({
    mutationFn: () => violationsApi.resendNotification(violationId),
    onSuccess: invalidate,
  });

  const updateWorkflowStatus = useMutation({
    mutationFn: (status: ManualWorkflowStatus) =>
      violationsApi.updateWorkflowStatus(violationId, status),
    onSuccess: invalidate,
  });

  return { resendNotification, updateWorkflowStatus };
};
