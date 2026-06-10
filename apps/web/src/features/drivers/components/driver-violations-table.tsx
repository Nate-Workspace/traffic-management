import { DataTable, type DataTableColumn } from "@/components/tables/data-table";
import { SortHeader } from "@/components/tables/sort-header";
import { formatDateTime, formatDateTimeWithTime } from "@/lib/date";
import { getViolationTypeLabel } from "@/features/violations/constants";
import type {
  DriverViolationSortField,
  ViolationListItem,
} from "@/features/violations/types/violation";
import { NotificationStatusBadge } from "@/features/violations/components/notification-status-badge";
import { ViolationActions } from "@/features/violations/components/violation-actions";
import { ViolationStatusBadge } from "@/features/violations/components/violation-status-badge";

type DriverViolationsTableProps = {
  data: ViolationListItem[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort: (field: DriverViolationSortField, order: "asc" | "desc") => void;
};

export function DriverViolationsTable({
  data,
  sortBy,
  sortOrder,
  onSort,
}: DriverViolationsTableProps) {
  const columns: Array<DataTableColumn<ViolationListItem>> = [
    {
      key: "type",
      header: "Violation type",
      cell: (row) => getViolationTypeLabel(row.violationType),
    },
    {
      key: "status",
      header: "Violation status",
      cell: (row) => <ViolationStatusBadge status={row.status} />,
    },
    {
      key: "notification",
      header: "Notification status",
      cell: (row) => <NotificationStatusBadge status={row.notificationStatus} />,
    },
    {
      key: "violationAt",
      header: (
        <SortHeader
          label="Violation time"
          field="violationAt"
          activeField={sortBy}
          sortOrder={sortOrder}
          onChange={onSort}
        />
      ),
      cell: (row) => formatDateTimeWithTime(row.violationAt),
    },
    {
      key: "createdAt",
      header: (
        <SortHeader
          label="Created at"
          field="createdAt"
          activeField={sortBy}
          sortOrder={sortOrder}
          onChange={onSort}
        />
      ),
      cell: (row) => formatDateTime(row.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => <ViolationActions violation={row} />,
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return <DataTable columns={columns} data={data} rowKey={(row) => row.id} />;
}
