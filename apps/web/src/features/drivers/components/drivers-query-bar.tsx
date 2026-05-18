import { TableToolbar } from "@/components/tables/table-toolbar";
import { TableSearch } from "@/components/tables/table-search";
import { ActionIcon, Button, Group, Select } from "@mantine/core";

type DriversQueryBarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: "createdAt" | "updatedAt" | "fullName", order: "asc" | "desc") => void;
};

export function DriversQueryBar({
  searchValue,
  onSearchChange,
  onCreate,
  sortBy,
  sortOrder,
  onSortChange,
}: DriversQueryBarProps) {
  const nextOrder = sortOrder === "asc" ? "desc" : "asc";

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
        <Group gap="sm">
          <Select
            size="xs"
            value={sortBy}
            data={[
              { value: "createdAt", label: "Created" },
              { value: "updatedAt", label: "Updated" },
              { value: "fullName", label: "Name" },
            ]}
            onChange={(value) =>
              onSortChange(
                (value ?? "createdAt") as "createdAt" | "updatedAt" | "fullName",
                sortOrder,
              )
            }
          />
          <ActionIcon
            variant="light"
            color="gray"
            onClick={() =>
              onSortChange(
                sortBy as "createdAt" | "updatedAt" | "fullName",
                nextOrder,
              )
            }
            aria-label="Toggle sort order"
          >
            {sortOrder === "asc" ? "ASC" : "DESC"}
          </ActionIcon>
          <Button size="sm" onClick={onCreate}>
            Create driver
          </Button>
        </Group>
      }
    />
  );
}
