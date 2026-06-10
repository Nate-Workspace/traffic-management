import { MetricCard } from "@/features/analytics/components/metric-card";
import { formatDateTimeWithTime } from "@/lib/date";
import type { DriverStats } from "../types/driver";

type DriverStatsSectionProps = {
  stats?: DriverStats;
  isLoading?: boolean;
};

export function DriverStatsSection({ stats, isLoading }: DriverStatsSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="section-title">Violation statistics</h2>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Summary of this driver&apos;s enforcement history
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <MetricCard
          label="Total violations"
          value={stats?.totalViolations}
          helper="All logged incidents"
          isLoading={isLoading}
        />
        <MetricCard
          label="Pending violations"
          value={stats?.pendingViolations}
          helper="Awaiting review or notification"
          isLoading={isLoading}
        />
        <MetricCard
          label="Reviewed violations"
          value={stats?.reviewedViolations}
          helper="Closed after review"
          isLoading={isLoading}
        />
        <MetricCard
          label="Last violation"
          value={
            stats?.lastViolationAt
              ? formatDateTimeWithTime(stats.lastViolationAt)
              : "—"
          }
          helper="Most recent incident date"
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
