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
      size="xs"
      radius="md"
      onClick={onToggle}
      aria-label="Toggle sort"
      className={cn(
        "transition-colors duration-150",
        active ? "bg-zinc-200/80 text-zinc-900" : "text-zinc-400 hover:text-zinc-600",
      )}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={cn(
          "transition-transform duration-150",
          direction === "asc" && "rotate-180",
        )}
      >
        <path d="M12 5v14M6 11l6-6 6 6" />
      </svg>
    </ActionIcon>
  );
}
