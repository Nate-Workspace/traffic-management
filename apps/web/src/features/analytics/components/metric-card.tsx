import { cn } from "@/lib/cn";

type MetricCardProps = {
  label: string;
  value?: string | number;
  helper?: string;
  isLoading?: boolean;
  className?: string;
};

export function MetricCard({
  label,
  value,
  helper,
  isLoading,
  className,
}: MetricCardProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm",
          className,
        )}
      >
        <div className="skeleton-shimmer h-3 w-24 rounded-full" />
        <div className="skeleton-shimmer mt-4 h-9 w-20 rounded-lg" />
        <div className="skeleton-shimmer mt-3 h-2.5 w-28 rounded-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-zinc-300/90 hover:shadow-md",
        className,
      )}
    >
      <div
        className="absolute inset-y-0 left-0 w-1 bg-zinc-900/80 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </p>
      <p className="mt-3 text-[1.75rem] font-semibold leading-none tracking-tight text-zinc-900 tabular-nums">
        {value ?? "—"}
      </p>
      {helper ? (
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">{helper}</p>
      ) : null}
    </div>
  );
}
