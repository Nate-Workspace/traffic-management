import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import { DataTable, type DataTableColumn } from "@/components/tables/data-table";
import { TableEmptyState } from "@/components/tables/table-empty-state";
import { formatDateTimeWithTime } from "@/lib/date";
import { getViolationTypeLabel, violationsRelatedEmptyState } from "../constants";
import type { RelatedViolation } from "../types/violation";
import { ViolationStatusBadge } from "./violation-status-badge";

type RelatedViolationsProps = {
  violations: RelatedViolation[];
};

export function RelatedViolations({ violations }: RelatedViolationsProps) {
  if (violations.length === 0) {
    return (
      <TableEmptyState
        title={violationsRelatedEmptyState.title}
        description={violationsRelatedEmptyState.description}
      />
    );
  }

  const columns: Array<DataTableColumn<RelatedViolation>> = [
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
      key: "time",
      header: "Violation time",
      cell: (row) => formatDateTimeWithTime(row.violationAt),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row) => (
        <ActionIcon
          component={Link}
          href={`/violations/${row.id}`}
          variant="subtle"
          color="gray"
          aria-label="View violation"
        >
          View
        </ActionIcon>
      ),
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return <DataTable columns={columns} data={violations} rowKey={(row) => row.id} />;
}
