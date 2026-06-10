"use client";

import { Button, Group, Select } from "@mantine/core";
import { FilterPanel } from "@/components/filters/filter-panel";
import {
  notificationStatusOptions,
  violationStatusOptions,
} from "@/features/violations/constants";

type DriverViolationsFiltersProps = {
  filters: Record<string, string>;
  onFilterChange: (key: string, value?: string) => void;
  onClear: () => void;
};

export function DriverViolationsFilters({
  filters,
  onFilterChange,
  onClear,
}: DriverViolationsFiltersProps) {
  return (
    <FilterPanel
      title="Filters"
      description="Refine this driver's violation history."
      actions={
        <Group gap="xs">
          <Button variant="subtle" color="gray" size="xs" onClick={onClear}>
            Clear filters
          </Button>
        </Group>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Violation status"
          placeholder="All statuses"
          size="sm"
          comboboxProps={{ withinPortal: true }}
          data={violationStatusOptions}
          value={filters.status ?? null}
          onChange={(value) => onFilterChange("status", value || undefined)}
          clearable
        />
        <Select
          label="Notification status"
          placeholder="All notifications"
          size="sm"
          comboboxProps={{ withinPortal: true }}
          data={notificationStatusOptions}
          value={filters.notificationStatus ?? null}
          onChange={(value) =>
            onFilterChange("notificationStatus", value || undefined)
          }
          clearable
        />
      </div>
    </FilterPanel>
  );
}
