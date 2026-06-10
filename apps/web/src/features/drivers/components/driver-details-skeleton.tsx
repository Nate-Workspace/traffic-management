import { Skeleton } from "@mantine/core";
import { TableSkeleton } from "@/components/tables/table-skeleton";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/cn";

export function DriverDetailsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton height={28} width={280} radius="md" />
        <Skeleton height={16} width={360} radius="md" />
      </div>

      <div className={cn(surfaces.card, "space-y-4 p-5")}>
        <Skeleton height={18} width={140} radius="md" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={56} radius="md" />
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm"
          >
            <div className="skeleton-shimmer h-3 w-24 rounded-full" />
            <div className="skeleton-shimmer mt-4 h-9 w-20 rounded-lg" />
            <div className="skeleton-shimmer mt-3 h-2.5 w-28 rounded-full" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Skeleton height={18} width={120} radius="md" />
        <div className={cn(surfaces.card, "p-4")}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton height={72} radius="md" />
            <Skeleton height={72} radius="md" />
          </div>
        </div>
        <TableSkeleton rows={5} columns={6} />
      </div>

      <div className={cn(surfaces.card, "space-y-4 p-5")}>
        <Skeleton height={18} width={100} radius="md" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height={48} radius="md" />
          ))}
        </div>
      </div>
    </div>
  );
}
