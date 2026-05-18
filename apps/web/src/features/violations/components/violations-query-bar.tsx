import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableSearch } from "@/components/tables/table-search";
import { ActionIcon, Group, Select } from "@mantine/core";
import type { ViolationSortField } from "../types/violation";

type ViolationsQueryBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: ViolationSortField, order: "asc" | "desc") => void;
};

export function ViolationsQueryBar({
  searchValue,
  onSearchChange,
  sortBy,
  sortOrder,
  onSortChange,
}: ViolationsQueryBarProps) {
  const nextOrder = sortOrder === "asc" ? "desc" : "asc";

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
        <Group gap="sm">
          <Select
            size="xs"
            value={sortBy}
            data={[
              { value: "violationAt", label: "Violation time" },
              { value: "createdAt", label: "Created" },
              { value: "driverName", label: "Driver" },
            ]}
            onChange={(value) =>
              onSortChange(
                (value ?? "violationAt") as ViolationSortField,
                sortOrder,
              )
            }
          />
          <ActionIcon
            variant="light"
            color="gray"
            onClick={() => onSortChange(sortBy as ViolationSortField, nextOrder)}
            aria-label="Toggle sort order"
          >
            {sortOrder === "asc" ? "ASC" : "DESC"}
          </ActionIcon>
        </Group>
      }
    />
  );
}
