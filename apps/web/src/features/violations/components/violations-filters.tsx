"use client";

import { Button, Group, Select } from "@mantine/core";
import { DateField } from "@/components/forms/date-field";
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
          comboboxProps={{ withinPortal: true }}
          data={violationStatusOptions}
          value={filters.status ?? null}
          onChange={(value) => onFilterChange("status", value || undefined)}
          clearable
        />
        <DateField
          label="Violation from"
          placeholder="Start date"
          value={filters.violationAtFrom}
          onChange={(value) => onFilterChange("violationAtFrom", value)}
        />
        <DateField
          label="Violation to"
          placeholder="End date"
          value={filters.violationAtTo}
          onChange={(value) => onFilterChange("violationAtTo", value)}
        />
        <DateField
          label="Created from"
          placeholder="Start date"
          value={filters.createdAtFrom}
          onChange={(value) => onFilterChange("createdAtFrom", value)}
        />
        <DateField
          label="Created to"
          placeholder="End date"
          value={filters.createdAtTo}
          onChange={(value) => onFilterChange("createdAtTo", value)}
        />
      </div>
    </FilterPanel>
  );
}
