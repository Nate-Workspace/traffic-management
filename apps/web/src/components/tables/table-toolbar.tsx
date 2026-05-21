import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

type TableToolbarProps = {
  title?: string;
  description?: string;
  searchSlot?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function TableToolbar({
  title,
  description,
  searchSlot,
  actions,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        surfaces.card,
        "flex flex-col gap-4 px-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {title ? (
          <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-0.5 text-[13px] leading-relaxed text-zinc-500">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-1 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
        {searchSlot ? (
          <div className="w-full min-w-0 sm:max-w-xs sm:flex-1">{searchSlot}</div>
        ) : null}
        {actions ? (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </div>
  );
}
