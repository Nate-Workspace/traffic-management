"use client";

import { TableSortButton } from "./table-sort";
import { cn } from "@/lib/cn";

type SortHeaderProps = {
  label: string;
  field: string;
  activeField?: string;
  sortOrder?: "asc" | "desc";
  onChange: (field: string, order: "asc" | "desc") => void;
  className?: string;
};

export function SortHeader({
  label,
  field,
  activeField,
  sortOrder,
  onChange,
  className,
}: SortHeaderProps) {
  const isActive = activeField === field;
  const direction = isActive ? sortOrder : "desc";

  const handleToggle = () => {
    const nextOrder = isActive && sortOrder === "asc" ? "desc" : "asc";
    onChange(field, nextOrder);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span>{label}</span>
      <TableSortButton active={isActive} direction={direction} onToggle={handleToggle} />
    </div>
  );
}
