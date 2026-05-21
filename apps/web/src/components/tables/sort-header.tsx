"use client";

import { TableSortButton } from "./table-sort";
import { cn } from "@/lib/cn";

type SortHeaderProps<TField extends string = string> = {
  label: string;
  field: TField;
  activeField?: string;
  sortOrder?: "asc" | "desc";
  onChange: (field: TField, order: "asc" | "desc") => void;
  className?: string;
};

export function SortHeader<TField extends string = string>({
  label,
  field,
  activeField,
  sortOrder,
  onChange,
  className,
}: SortHeaderProps<TField>) {
  const isActive = activeField === field;
  const direction = isActive ? sortOrder : "desc";

  const handleToggle = () => {
    const nextOrder = isActive && sortOrder === "asc" ? "desc" : "asc";
    onChange(field, nextOrder);
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn(isActive && "text-zinc-800")}>{label}</span>
      <TableSortButton active={isActive} direction={direction} onToggle={handleToggle} />
    </div>
  );
}
