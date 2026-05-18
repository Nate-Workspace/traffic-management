import { cn } from "@/lib/cn";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
  className?: string;
};

export function TableSkeleton({ rows = 6, columns = 5, className }: TableSkeletonProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-slate-200", className)}>
      <div className="divide-y divide-slate-100 bg-white">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid gap-3 px-4 py-3"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((__, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="h-3 w-full animate-pulse rounded-full bg-slate-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
