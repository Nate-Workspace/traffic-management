"use client";

import { Pagination, Select, Text } from "@mantine/core";
import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

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
        surfaces.card,
        "flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <Text size="sm" c="dimmed" className="text-[13px] text-zinc-500">
        Page <span className="font-medium text-zinc-700">{page}</span> of{" "}
        <span className="font-medium text-zinc-700">{totalPages}</span>
      </Text>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Text size="xs" c="dimmed" className="text-zinc-500">
            Rows
          </Text>
          <Select
            size="xs"
            value={String(limit)}
            data={limitOptions}
            onChange={(value) => onLimitChange(Number(value))}
            classNames={{ input: "w-[72px]" }}
          />
        </div>
        <Pagination
          total={safeTotal}
          value={page}
          onChange={onPageChange}
          size="sm"
          radius="md"
          withEdges={false}
        />
      </div>
    </div>
  );
}
