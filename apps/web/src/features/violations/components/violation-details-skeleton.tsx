import { Skeleton } from "@mantine/core";
import { TableSkeleton } from "@/components/tables/table-skeleton";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/cn";

export function ViolationDetailsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Skeleton height={28} width={240} radius="md" />
        <Skeleton height={16} width={360} radius="md" />
      </div>

      <div className={cn(surfaces.card, "space-y-4 p-4 sm:p-5")}>
        <Skeleton height={18} width={180} radius="md" />
        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <Skeleton height={240} radius="lg" />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={110} radius="lg" />
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={56} radius="md" />
          ))}
        </div>
      </div>

      <div className={cn(surfaces.card, "space-y-4 p-4 sm:p-5")}>
        <Skeleton height={18} width={180} radius="md" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height={56} radius="md" />
          ))}
        </div>
      </div>

      <div className={cn(surfaces.card, "space-y-4 p-4 sm:p-5")}>
        <Skeleton height={18} width={200} radius="md" />
        <TableSkeleton rows={4} columns={4} />
      </div>
    </div>
  );
}
