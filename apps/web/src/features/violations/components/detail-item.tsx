import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type DetailItemProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="text-sm text-slate-900">{value}</div>
    </div>
  );
}
