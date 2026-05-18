import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

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
        "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4",
        className,
      )}
    >
      <div>
        {title ? <h2 className="text-base font-semibold text-slate-900">{title}</h2> : null}
        {description ? (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-1 items-center justify-end gap-3">
        {searchSlot}
        {actions}
      </div>
    </div>
  );
}
