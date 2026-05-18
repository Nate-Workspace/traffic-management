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
    <div className={cn("rounded-xl border border-slate-200 bg-white p-4", className)}>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        {description ? <p className="text-xs text-slate-500">{description}</p> : null}
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="h-72 animate-pulse rounded-xl bg-slate-100" />
        ) : isEmpty ? (
          <EmptyState
            title={analyticsChartEmptyState.title}
            description={analyticsChartEmptyState.description}
            className="min-h-[200px]"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
