"use client";

import { Pagination, Select } from "@mantine/core";
import { cn } from "@/lib/cn";

type TablePaginationProps = {
  page: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  className?: string;
};

const limitOptions = ["10", "20", "50", "100"];

export function TablePagination({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  className,
}: TablePaginationProps) {
  const safeTotal = Math.max(1, totalPages);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3",
        className,
      )}
    >
      <p className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-3">
        <Select
          size="xs"
          value={String(limit)}
          data={limitOptions}
          onChange={(value) => onLimitChange(Number(value))}
        />
        <Pagination
          total={safeTotal}
          value={page}
          onChange={onPageChange}
          size="sm"
        />
      </div>
    </div>
  );
}
