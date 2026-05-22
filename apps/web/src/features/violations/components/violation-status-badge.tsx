import { StatusBadge, type StatusBadgeTone } from "@/components/feedback/status-badge";
import { violationStatusLabels, violationStatusTones } from "../constants";
import type { ViolationStatus } from "../types/violation";

type ViolationStatusBadgeProps = {
  status: ViolationStatus;
};

export function ViolationStatusBadge({ status }: ViolationStatusBadgeProps) {
  return (
    <StatusBadge
      label={violationStatusLabels[status]}
      tone={violationStatusTones[status] as StatusBadgeTone}
    />
  );
}
