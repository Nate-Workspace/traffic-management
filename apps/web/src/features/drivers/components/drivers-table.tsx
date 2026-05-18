import { DataTable, type DataTableColumn } from "@/components/tables/data-table";
import { SortHeader } from "@/components/tables/sort-header";
import { formatDateTime } from "@/lib/date";
import type { Driver } from "../types/driver";
import { DriverActions } from "./driver-actions";

export type DriverSortField = "createdAt" | "updatedAt" | "fullName";

type DriversTableProps = {
  data: Driver[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort: (field: DriverSortField, order: "asc" | "desc") => void;
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
  disableActions?: boolean;
};

export function DriversTable({
  data,
  sortBy,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
  disableActions,
}: DriversTableProps) {
  const columns: Array<DataTableColumn<Driver>> = [
    {
      key: "fullName",
      header: (
        <SortHeader
          label="Full name"
          field="fullName"
          activeField={sortBy}
          sortOrder={sortOrder}
          onChange={onSort}
        />
      ),
      cell: (row) => row.fullName,
    },
    { key: "email", header: "Email", cell: (row) => row.email },
    { key: "phoneNumber", header: "Phone number", cell: (row) => row.phoneNumber },
    { key: "nationalId", header: "National ID", cell: (row) => row.nationalId },
    { key: "plateNumber", header: "Plate number", cell: (row) => row.plateNumber },
    {
      key: "driverLicenseNumber",
      header: "Driver license",
      cell: (row) => row.driverLicenseNumber,
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
      cell: (row) => (
        <DriverActions
          driver={row}
          onEdit={onEdit}
          onDelete={onDelete}
          disabled={disableActions}
        />
      ),
      className: "text-right",
      headerClassName: "text-right",
    },
  ];

  return (
    <DataTable columns={columns} data={data} rowKey={(row) => row.id} />
  );
}
