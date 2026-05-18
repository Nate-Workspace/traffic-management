import { DataTable, type DataTableColumn } from "@/components/tables/data-table";
import { SortHeader } from "@/components/tables/sort-header";
import { formatDateTime, formatDateTimeWithTime } from "@/lib/date";
import { getViolationTypeLabel } from "../constants";
import type { ViolationListItem, ViolationSortField } from "../types/violation";
import { ViolationActions } from "./violation-actions";
import { ViolationStatusBadge } from "./violation-status-badge";

type ViolationsTableProps = {
  data: ViolationListItem[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort: (field: ViolationSortField, order: "asc" | "desc") => void;
};

export function ViolationsTable({ data, sortBy, sortOrder, onSort }: ViolationsTableProps) {
  const columns: Array<DataTableColumn<ViolationListItem>> = [
    {
      key: "driver",
      header: (
        <SortHeader
          label="Driver"
          field="driverName"
          activeField={sortBy}
          sortOrder={sortOrder}
          onChange={onSort}
        />
      ),
      cell: (row) => row.driver.fullName,
    },
    { key: "plate", header: "Plate number", cell: (row) => row.driver.plateNumber },
    {
      key: "type",
      header: "Violation type",
      cell: (row) => getViolationTypeLabel(row.violationType),
    },
    {
      key: "status",
      header: "Status",
      cell: (row) => <ViolationStatusBadge status={row.status} />,
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
          label="Created"
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
