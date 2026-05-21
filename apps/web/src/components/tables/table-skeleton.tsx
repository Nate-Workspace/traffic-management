import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
  className?: string;
};

export function TableSkeleton({ rows = 6, columns = 5, className }: TableSkeletonProps) {
  return (
    <div className={cn(surfaces.table, className)}>
      <div className="border-b border-zinc-200/80 bg-zinc-50/90 px-4 py-2.5">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={`head-${index}`}
              className="skeleton-shimmer h-2.5 w-16 rounded-full"
            />
          ))}
        </div>
      </div>
      <div className="divide-y divide-zinc-100/90 bg-white">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid gap-3 px-4 py-3.5"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((__, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn(
                  "skeleton-shimmer h-3 rounded-full",
                  colIndex === 0 ? "w-3/4" : "w-full",
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
