import { Badge } from "@mantine/core";
import { violationStatusColors } from "../constants";
import type { ViolationStatus } from "../types/violation";

type ViolationStatusBadgeProps = {
  status: ViolationStatus;
};

const formatStatus = (status: ViolationStatus) =>
  `${status.slice(0, 1)}${status.slice(1).toLowerCase()}`;

export function ViolationStatusBadge({ status }: ViolationStatusBadgeProps) {
  return (
    <Badge color={violationStatusColors[status]} variant="light" size="sm">
      {formatStatus(status)}
    </Badge>
  );
}
