import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TableEmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function TableEmptyState({
  title,
  description,
  action,
  className,
}: TableEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center",
        className,
      )}
    >
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      {action}
    </div>
  );
}
