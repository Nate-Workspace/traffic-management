import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import { DataTable, type DataTableColumn } from "@/components/tables/data-table";
import { TableEmptyState } from "@/components/tables/table-empty-state";
import { formatDateTimeWithTime } from "@/lib/date";
import { getViolationTypeLabel } from "@/features/violations/constants";
import { ViolationStatusBadge } from "@/features/violations/components/violation-status-badge";
import { analyticsRecentEmptyState } from "../constants";
import type { RecentViolation } from "../types/analytics";
import { ViolationActions } from "@/features/violations/components/violation-actions";
import { ViolationListItem } from "@/features/violations/types/violation";

type RecentViolationsProps = {
  violations: RecentViolation[];
};

export function RecentViolations({ violations }: RecentViolationsProps) {
  if (violations.length === 0) {
    return (
      <TableEmptyState
        title={analyticsRecentEmptyState.title}
        description={analyticsRecentEmptyState.description}
      />
    );
  }

  const formatUnknown = (value: string | null | undefined) => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed.toLowerCase() === "unknown") {
      return "Unknown";
    }

    return trimmed;
  };

  const columns: Array<DataTableColumn<RecentViolation>> = [
    { key: "driver", header: "Driver", cell: (row) => row.driver?.fullName ?? "Unknown Driver" },
    { key: "plate", header: "Plate", cell: (row) => formatUnknown(row.plateNumber) },
    {
      key: "type",
      header: "Type",
      cell: (row) => getViolationTypeLabel(row.violationType),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <ViolationStatusBadge status={row.status} />,
    },
    {
      key: "time",
      header: "Time",
      cell: (row) => formatDateTimeWithTime(row.violationAt),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => <ViolationActions violation={row as ViolationListItem} />,
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return <DataTable columns={columns} data={violations} rowKey={(row) => row.id} />;
}
