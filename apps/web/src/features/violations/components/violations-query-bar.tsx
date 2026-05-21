import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableSearch } from "@/components/tables/table-search";
import { TableSortControls } from "@/components/tables/table-sort-controls";
import { Group } from "@mantine/core";
import type { ViolationSortField } from "../types/violation";

type ViolationsQueryBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: ViolationSortField, order: "asc" | "desc") => void;
};

const sortOptions = [
  { value: "violationAt" as const, label: "Violation time" },
  { value: "createdAt" as const, label: "Created" },
  { value: "driverName" as const, label: "Driver" },
];

export function ViolationsQueryBar({
  searchValue,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
}: ViolationsQueryBarProps) {
  return (
    <TableToolbar
      title="Violation monitoring"
      description="Track evidence, verify status, and analyze incidents."
      searchSlot={
        <TableSearch
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search by driver or plate"
        />
      }
      actions={
        <Group gap="sm" wrap="wrap">
          <TableSortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            options={sortOptions}
            onSortChange={onSortChange}
          />
        </Group>
      }
    />
  );
}
