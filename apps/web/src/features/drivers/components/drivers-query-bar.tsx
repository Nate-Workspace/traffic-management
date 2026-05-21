import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableSearch } from "@/components/tables/table-search";
import { TableSortControls } from "@/components/tables/table-sort-controls";
import { Button, Group } from "@mantine/core";

type DriversQueryBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: "createdAt" | "updatedAt" | "fullName", order: "asc" | "desc") => void;
};

const sortOptions = [
  { value: "createdAt" as const, label: "Created" },
  { value: "updatedAt" as const, label: "Updated" },
  { value: "fullName" as const, label: "Name" },
];

export function DriversQueryBar({
  searchValue,
  onSearchChange,
  onCreate,
  sortBy,
  sortOrder,
  onSortChange,
}: DriversQueryBarProps) {
  return (
    <TableToolbar
      title="Driver directory"
      description="Search, sort, and manage driver records."
      searchSlot={
        <TableSearch
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search drivers"
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
          <Button size="sm" color="dark" onClick={onCreate}>
            Create driver
          </Button>
        </Group>
      }
    />
  );
}
