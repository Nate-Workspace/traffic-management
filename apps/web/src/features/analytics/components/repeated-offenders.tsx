import { DataTable, type DataTableColumn } from "@/components/tables/data-table";
import { TableEmptyState } from "@/components/tables/table-empty-state";
import { analyticsOffendersEmptyState } from "../constants";
import type { RepeatedOffender } from "../types/analytics";

type RepeatedOffendersProps = {
  offenders: RepeatedOffender[];
};

export function RepeatedOffenders({ offenders }: RepeatedOffendersProps) {
  if (offenders.length === 0) {
    return (
      <TableEmptyState
        title={analyticsOffendersEmptyState.title}
        description={analyticsOffendersEmptyState.description}
      />
    );
  }

  const columns: Array<DataTableColumn<RepeatedOffender>> = [
    { key: "driver", header: "Driver", cell: (row) => row.driverName },
    { key: "plate", header: "Plate", cell: (row) => row.plateNumber },
    {
      key: "count",
      header: "Violations",
      cell: (row) => row.violationCount,
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return <DataTable columns={columns} data={offenders} rowKey={(row) => row.driverId} />;
}
