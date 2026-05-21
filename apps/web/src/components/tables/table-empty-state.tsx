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
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-14 text-center",
        className,
      )}
    >
      <div
        className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400"
        aria-hidden
      >
        —
      </div>
      <p className="text-[14px] font-semibold tracking-tight text-zinc-900">{title}</p>
      {description ? (
        <p className="max-w-sm text-[13px] leading-relaxed text-zinc-500">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
