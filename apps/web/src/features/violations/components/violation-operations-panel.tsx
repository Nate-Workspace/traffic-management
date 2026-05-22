"use client";

import { Group, Select, Text } from "@mantine/core";
import { surfaces } from "@/lib/ui/surfaces";
import { LoadingButton } from "@/components/feedback/loading-button";
import { toastPromise } from "@/components/feedback/toast";
import { getApiErrorMessage } from "@/services/api/errors";
import { formatDateTimeWithTime } from "@/lib/date";
import { DetailItem } from "./detail-item";
import { NotificationStatusBadge } from "./notification-status-badge";
import { ViolationStatusBadge } from "./violation-status-badge";
import { useViolationMutations } from "../hooks/use-violation-mutations";
import type { ViolationDetail } from "../types/violation";
import { violationStatusOptions } from "../constants";

type ViolationOperationsPanelProps = {
  data: ViolationDetail;
};

const manualWorkflowOptions = violationStatusOptions.filter(
  (option) => option.value !== "NOTIFIED",
);

export function ViolationOperationsPanel({ data }: ViolationOperationsPanelProps) {
  const { violation, driver, latestNotification } = data;
  const { resendNotification, updateWorkflowStatus } = useViolationMutations(
    violation.id,
  );

  const canResend =
    violation.notificationStatus === "FAILED" ||
    violation.notificationStatus === "SENT" ||
    violation.notificationStatus === "NOT_SENT";

  const handleResend = async () => {
    await toastPromise(resendNotification.mutateAsync(), {
      loading: {
        title: "Sending notification",
        message: `Delivering notice to ${driver.email}`,
      },
      success: {
        title: "Notification sent",
        message: "The driver has been notified by email",
      },
      error: {
        title: "Notification failed",
        message: (error) => getApiErrorMessage(error, "Unable to send email"),
      },
    });
  };

  const handleWorkflowChange = async (value: string | null) => {
    if (!value || value === violation.status) {
      return;
    }

    await toastPromise(
      updateWorkflowStatus.mutateAsync(
        value as "PENDING" | "REVIEWED" | "DISMISSED",
      ),
      {
        loading: {
          title: "Updating workflow",
          message: "Saving violation status",
        },
        success: {
          title: "Workflow updated",
          message: "Violation status has been updated",
        },
        error: {
          title: "Update failed",
          message: (error) => getApiErrorMessage(error),
        },
      },
    );
  };

  return (
    <div className={surfaces.card}>
      <div className="border-b border-zinc-100/90 px-5 py-4">
        <h2 className="section-title">Operations</h2>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Notification delivery and workflow management
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Workflow status"
            value={<ViolationStatusBadge status={violation.status} />}
          />
          <DetailItem
            label="Notification"
            value={<NotificationStatusBadge status={violation.notificationStatus} />}
          />
          <DetailItem
            label="Last notified"
            value={
              violation.lastNotifiedAt
                ? formatDateTimeWithTime(violation.lastNotifiedAt)
                : "—"
            }
          />
          <DetailItem label="Recipient" value={driver.email} />
        </div>

        {latestNotification?.failureReason ? (
          <div className="rounded-lg border border-rose-200/80 bg-rose-50/60 px-4 py-3">
            <Text size="xs" fw={600} className="uppercase tracking-wide text-rose-800">
              Delivery issue
            </Text>
            <Text size="sm" className="mt-1 text-rose-900/90">
              {latestNotification.failureReason}
            </Text>
          </div>
        ) : null}

        <div className="flex flex-col gap-4 border-t border-zinc-100/90 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-xs">
            <Select
              label="Update workflow"
              description="NOTIFIED is set automatically on successful delivery"
              size="sm"
              value={violation.status}
              data={
                violation.status === "NOTIFIED"
                  ? [
                      { value: "NOTIFIED", label: "Notified", disabled: true },
                      ...manualWorkflowOptions.filter((o) => o.value !== "PENDING"),
                    ]
                  : manualWorkflowOptions
              }
              onChange={handleWorkflowChange}
              disabled={updateWorkflowStatus.isPending}
            />
          </div>

          <Group gap="sm">
            <LoadingButton
              variant="default"
              color="dark"
              size="sm"
              disabled={!canResend}
              isLoading={resendNotification.isPending}
              onClick={() => void handleResend()}
            >
              {violation.notificationStatus === "FAILED"
                ? "Retry notification"
                : "Resend notification"}
            </LoadingButton>
          </Group>
        </div>
      </div>
    </div>
  );
}
