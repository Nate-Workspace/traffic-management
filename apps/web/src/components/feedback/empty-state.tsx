import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white px-8 py-12 text-center",
        className,
      )}
    >
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {description ? <p className="text-sm text-slate-500">{description}</p> : null}
      {action}
    </div>
  );
}
