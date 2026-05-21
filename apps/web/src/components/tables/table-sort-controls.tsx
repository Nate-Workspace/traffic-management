"use client";

import { Group, SegmentedControl, Select } from "@mantine/core";

type SortOption<TField extends string> = {
  value: TField;
  label: string;
};

type TableSortControlsProps<TField extends string> = {
  sortBy: string;
  sortOrder: "asc" | "desc";
  options: SortOption<TField>[];
  onSortChange: (field: TField, order: "asc" | "desc") => void;
};

export function TableSortControls<TField extends string>({
  sortBy,
  sortOrder,
  options,
  onSortChange,
}: TableSortControlsProps<TField>) {
  return (
    <Group gap="xs" wrap="nowrap">
      <Select
        size="xs"
        value={sortBy}
        data={options}
        comboboxProps={{ withinPortal: true }}
        onChange={(value) =>
          onSortChange((value ?? options[0]?.value) as TField, sortOrder)
        }
        classNames={{ input: "min-w-[120px] font-medium" }}
      />
      <SegmentedControl
        size="xs"
        value={sortOrder}
        onChange={(value) =>
          onSortChange(sortBy as TField, value as "asc" | "desc")
        }
        data={[
          { label: "Asc", value: "asc" },
          { label: "Desc", value: "desc" },
        ]}
      />
    </Group>
  );
}
