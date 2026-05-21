import type { ReactNode } from "react";
import { EmptyState } from "@/components/feedback/empty-state";
import { cn } from "@/lib/cn";
import { analyticsChartEmptyState } from "../constants";

type ChartCardProps = {
  title: string;
  description?: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  children: ReactNode;
  className?: string;
};

export function ChartCard({
  title,
  description,
  isLoading,
  isEmpty,
  children,
  className,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm",
        className,
      )}
    >
      <div className="border-b border-zinc-100/90 bg-zinc-50/40 px-5 py-4">
        <p className="text-[14px] font-semibold tracking-tight text-zinc-900">{title}</p>
        {description ? (
          <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-500">{description}</p>
        ) : null}
      </div>
      <div className="p-5">
        {isLoading ? (
          <div className="space-y-3">
            <div className="skeleton-shimmer h-4 w-32 rounded-full" />
            <div className="skeleton-shimmer h-56 w-full rounded-lg sm:h-64" />
          </div>
        ) : isEmpty ? (
          <EmptyState
            title={analyticsChartEmptyState.title}
            description={analyticsChartEmptyState.description}
            className="min-h-[200px] border-zinc-200/60 bg-transparent shadow-none"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
