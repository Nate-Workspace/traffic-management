"use client";

import { useMemo } from "react";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/cn";
import { TableSkeleton } from "@/components/tables/table-skeleton";
import { DateRangePicker } from "./date-range-picker";
import { MetricCard } from "./metric-card";
import { ViolationsOverTimeChart } from "./violations-over-time-chart";
import { ViolationsTrendChart } from "./violations-trend-chart";
import { RecentViolations } from "./recent-violations";
import { RepeatedOffenders } from "./repeated-offenders";
import { useAnalyticsDateRange } from "../hooks/use-analytics-date-range";
import { useAnalyticsSummary } from "../hooks/use-analytics-summary";
import { useRecentViolations } from "../hooks/use-recent-violations";
import { useRepeatedOffenders } from "../hooks/use-repeated-offenders";
import { useViolationsTrend } from "../hooks/use-violations-trend";

export function AnalyticsPage() {
  const { startDate, endDate, setRange } = useAnalyticsDateRange();

  const rangeQuery = useMemo(
    () => ({ startDate, endDate }),
    [startDate, endDate],
  );

  const summaryQuery = useAnalyticsSummary(rangeQuery);
  const trendQuery = useViolationsTrend(rangeQuery);
  const offendersQuery = useRepeatedOffenders(rangeQuery);
  const recentQuery = useRecentViolations();

  const summary = summaryQuery.data;
  const trendPoints = trendQuery.data?.points ?? [];
  const offenders = offendersQuery.data?.offenders ?? [];
  const recent = recentQuery.data;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="page-header">
          <h1 className="page-title">Analytics dashboard</h1>
          <p className="page-description">
            Monitor the system's health, incident trends, and repeated offenders and more.
          </p>
        </div>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onRangeChange={setRange}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <MetricCard
          label="Total drivers"
          value={recent?.totalDrivers}
          helper="All registered drivers"
          isLoading={recentQuery.isLoading}
        />
        <MetricCard
          label="Violations today"
          value={recent?.violationsToday}
          helper="Based on violation time"
          isLoading={recentQuery.isLoading}
        />
        <MetricCard
          label="Total violations"
          value={summary?.totalViolations}
          helper="Selected date range"
          isLoading={summaryQuery.isLoading}
        />
        <MetricCard
          label="Repeated offenders"
          value={summary?.repeatedOffenders}
          helper="More than one violation"
          isLoading={summaryQuery.isLoading}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ViolationsOverTimeChart data={trendPoints} isLoading={trendQuery.isLoading} />
        <ViolationsTrendChart data={trendPoints} isLoading={trendQuery.isLoading} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[2fr,1fr]">
        <div className={cn(surfaces.card, "space-y-4 p-4 sm:p-5")}>
          <div className="space-y-0.5 border-b border-zinc-100/90 pb-3">
            <p className="text-[14px] font-semibold tracking-tight text-zinc-900">
              Recent violations
            </p>
            <p className="text-[12px] text-zinc-500">Latest incidents across the system.</p>
          </div>
          {recentQuery.isLoading ? (
            <TableSkeleton rows={5} columns={6} />
          ) : (
            <RecentViolations violations={recent?.recentViolations ?? []} />
          )}
        </div>

        <div className={cn(surfaces.card, "space-y-4 p-4 sm:p-5")}>
          <div className="space-y-0.5 border-b border-zinc-100/90 pb-3">
            <p className="text-[14px] font-semibold tracking-tight text-zinc-900">
              Repeated offenders
            </p>
            <p className="text-[12px] text-zinc-500">Drivers with multiple incidents.</p>
          </div>
          {offendersQuery.isLoading ? (
            <TableSkeleton rows={5} columns={3} />
          ) : (
            <RepeatedOffenders offenders={offenders} />
          )}
        </div>
      </div>
    </div>
  );
}
