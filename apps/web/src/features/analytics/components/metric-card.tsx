import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

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
      <div className={cn(surfaces.cardElevated, "p-4", className)}>
        <div className="skeleton-shimmer h-3 w-20 rounded-full" />
        <div className="skeleton-shimmer mt-3 h-8 w-16 rounded-lg" />
        <div className="skeleton-shimmer mt-3 h-2.5 w-24 rounded-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        surfaces.cardElevated,
        "group p-4 transition-colors duration-200 hover:border-zinc-300/80",
        className,
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 tabular-nums">
        {value ?? "—"}
      </p>
      {helper ? (
        <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">{helper}</p>
      ) : null}
    </div>
  );
}
