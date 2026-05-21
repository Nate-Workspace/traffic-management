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
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-200/90 bg-zinc-50/40 px-8 py-12 text-center",
        className,
      )}
    >
      <div
        className="mb-1 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-400 shadow-sm"
        aria-hidden
      >
        ∅
      </div>
      <p className="text-[14px] font-semibold tracking-tight text-zinc-900">{title}</p>
      {description ? (
        <p className="max-w-md text-[13px] leading-relaxed text-zinc-500">{description}</p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
