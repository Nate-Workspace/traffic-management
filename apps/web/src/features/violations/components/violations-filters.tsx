"use client";

import { Button, Group, Select, TextInput } from "@mantine/core";
import { FilterPanel } from "@/components/filters/filter-panel";
import { violationStatusOptions } from "../constants";

type ViolationsFiltersProps = {
  filters: Record<string, string>;
  onFilterChange: (key: string, value?: string) => void;
  onClear: () => void;
};

export function ViolationsFilters({
  filters,
  onFilterChange,
  onClear,
}: ViolationsFiltersProps) {
  return (
    <FilterPanel
      title="Filters"
      description="Refine by status and time windows."
      actions={
        <Group gap="xs">
          <Button variant="subtle" color="gray" size="xs" onClick={onClear}>
            Clear filters
          </Button>
        </Group>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Select
          label="Status"
          placeholder="All statuses"
          size="sm"
          data={violationStatusOptions}
          value={filters.status ?? null}
          onChange={(value) => onFilterChange("status", value || undefined)}
          clearable
        />
        <TextInput
          label="Violation date from"
          type="date"
          size="sm"
          value={filters.violationAtFrom ?? ""}
          onChange={(event) =>
            onFilterChange("violationAtFrom", event.currentTarget.value || undefined)
          }
        />
        <TextInput
          label="Violation date to"
          type="date"
          size="sm"
          value={filters.violationAtTo ?? ""}
          onChange={(event) =>
            onFilterChange("violationAtTo", event.currentTarget.value || undefined)
          }
        />
        <TextInput
          label="Created from"
          type="date"
          size="sm"
          value={filters.createdAtFrom ?? ""}
          onChange={(event) =>
            onFilterChange("createdAtFrom", event.currentTarget.value || undefined)
          }
        />
        <TextInput
          label="Created to"
          type="date"
          size="sm"
          value={filters.createdAtTo ?? ""}
          onChange={(event) =>
            onFilterChange("createdAtTo", event.currentTarget.value || undefined)
          }
        />
      </div>
    </FilterPanel>
  );
}
