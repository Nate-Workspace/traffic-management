"use client";

import { ActionIcon } from "@mantine/core";
import { cn } from "@/lib/cn";

type TableSortProps = {
  active?: boolean;
  direction?: "asc" | "desc";
  onToggle: () => void;
};

export function TableSortButton({ active, direction, onToggle }: TableSortProps) {
  return (
    <ActionIcon
      variant="subtle"
      size="sm"
      onClick={onToggle}
      aria-label="Toggle sort"
      className={cn(active ? "text-slate-900" : "text-slate-400")}
    >
      {direction === "asc" ? "↑" : "↓"}
    </ActionIcon>
  );
}
