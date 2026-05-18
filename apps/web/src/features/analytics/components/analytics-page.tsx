"use client";

import { useMemo } from "react";
import { Text } from "@mantine/core";
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Text size="xl" fw={600} c="dark">
            Analytics dashboard
          </Text>
          <Text size="sm" c="dimmed">
            Monitor system health, incident trends, and repeated offenders.
          </Text>
        </div>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onRangeChange={setRange}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Recent violations</p>
            <p className="text-xs text-slate-500">Latest incidents across the system.</p>
          </div>
          {recentQuery.isLoading ? (
            <TableSkeleton rows={5} columns={6} />
          ) : (
            <RecentViolations violations={recent?.recentViolations ?? []} />
          )}
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">Repeated offenders</p>
            <p className="text-xs text-slate-500">Drivers with multiple incidents.</p>
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
