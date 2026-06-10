import { surfaces } from "@/lib/ui/surfaces";
import { formatDateTimeWithTime } from "@/lib/date";
import { DetailItem } from "@/features/violations/components/detail-item";
import type { Driver, DriverStats } from "../types/driver";

type DriverActivityCardProps = {
  driver: Driver;
  stats?: DriverStats;
  isLoading?: boolean;
};

export function DriverActivityCard({
  driver,
  stats,
  isLoading,
}: DriverActivityCardProps) {
  if (isLoading) {
    return (
      <div className={surfaces.card}>
        <div className="border-b border-zinc-100/90 px-5 py-4">
          <h2 className="section-title">Activity</h2>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton-shimmer h-12 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={surfaces.card}>
      <div className="border-b border-zinc-100/90 px-5 py-4">
        <h2 className="section-title">Activity</h2>
        <p className="mt-0.5 text-[13px] text-zinc-500">
          Key timeline markers for this profile
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-3">
        <DetailItem
          label="Driver created"
          value={formatDateTimeWithTime(driver.createdAt)}
        />
        <DetailItem
          label="Last updated"
          value={formatDateTimeWithTime(driver.updatedAt)}
        />
        <DetailItem
          label="Most recent violation"
          value={
            stats?.lastViolationAt
              ? formatDateTimeWithTime(stats.lastViolationAt)
              : "No violations recorded"
          }
        />
      </div>
    </div>
  );
}
