import type { ReactNode } from "react";
import { EmptyState } from "@/components/feedback/empty-state";
import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";
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
    <div className={cn(surfaces.card, "p-4 sm:p-5", className)}>
      <div className="space-y-0.5 border-b border-zinc-100/90 pb-3">
        <p className="text-[14px] font-semibold tracking-tight text-zinc-900">
          {title}
        </p>
        {description ? (
          <p className="text-[12px] leading-relaxed text-zinc-500">{description}</p>
        ) : null}
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="space-y-3">
            <div className="skeleton-shimmer h-4 w-32 rounded-full" />
            <div className="skeleton-shimmer h-56 w-full rounded-lg sm:h-64" />
          </div>
        ) : isEmpty ? (
          <EmptyState
            title={analyticsChartEmptyState.title}
            description={analyticsChartEmptyState.description}
            className="min-h-[200px] border-zinc-200/60 bg-transparent"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
