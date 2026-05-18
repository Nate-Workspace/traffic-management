import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FilterPanelProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function FilterPanel({
  title,
  description,
  actions,
  children,
  className,
}: FilterPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white px-4 py-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {description ? (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
