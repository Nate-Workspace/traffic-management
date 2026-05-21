import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type DetailItemProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        {label}
      </p>
      <div className="text-[13px] font-medium text-zinc-800">{value}</div>
    </div>
  );
}
