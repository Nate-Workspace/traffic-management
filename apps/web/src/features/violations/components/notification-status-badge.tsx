import { StatusBadge, type StatusBadgeTone } from "@/components/feedback/status-badge";
import { notificationStatusLabels, notificationStatusTones } from "../constants";
import type { NotificationDeliveryStatus } from "../types/violation";

type NotificationStatusBadgeProps = {
  status: NotificationDeliveryStatus;
};

export function NotificationStatusBadge({ status }: NotificationStatusBadgeProps) {
  return (
    <StatusBadge
      label={notificationStatusLabels[status]}
      tone={notificationStatusTones[status] as StatusBadgeTone}
    />
  );
}
