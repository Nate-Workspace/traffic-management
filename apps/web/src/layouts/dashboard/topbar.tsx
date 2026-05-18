"use client";

import { ActionIcon, TextInput } from "@mantine/core";
import { cn } from "@/lib/cn";

type TopbarProps = {
  onOpenSidebar?: () => void;
  className?: string;
};

export function Topbar({ onOpenSidebar, className }: TopbarProps) {
  return (
    <header
      className={cn(
        "flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-4",
        className,
      )}
    >
      <ActionIcon
        variant="light"
        color="gray"
        onClick={onOpenSidebar}
        className="md:hidden"
        aria-label="Open navigation"
      >
        <span className="text-lg">≡</span>
      </ActionIcon>

      <div className="flex-1">
        <TextInput
          size="sm"
          placeholder="Search across drivers and violations"
          radius="md"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right text-xs text-slate-500 sm:block">
          <p className="font-semibold text-slate-700">Operations</p>
          <p>Last sync 2m ago</p>
        </div>
        <div className="h-9 w-9 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
