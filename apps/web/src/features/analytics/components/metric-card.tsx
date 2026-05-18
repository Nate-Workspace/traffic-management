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
      <div className={cn("rounded-xl border border-slate-200 bg-white p-4", className)}>
        <div className="h-3 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-7 w-24 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-3 w-16 animate-pulse rounded-full bg-slate-100" />
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-4", className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value ?? "--"}</p>
      {helper ? <p className="mt-2 text-xs text-slate-500">{helper}</p> : null}
    </div>
  );
}
