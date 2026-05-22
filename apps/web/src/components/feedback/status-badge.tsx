import { Badge } from "@mantine/core";
import { cn } from "@/lib/cn";

export type StatusBadgeTone = "neutral" | "info" | "success" | "warning" | "danger";

const toneStyles: Record<StatusBadgeTone, string> = {
  neutral: "bg-zinc-100 text-zinc-700 ring-zinc-200/80",
  info: "bg-sky-50 text-sky-800 ring-sky-200/80",
  success: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
  warning: "bg-amber-50 text-amber-800 ring-amber-200/80",
  danger: "bg-rose-50 text-rose-800 ring-rose-200/80",
};

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
  className?: string;
};

export function StatusBadge({ label, tone = "neutral", className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      radius="sm"
      size="sm"
      className={cn(
        "border-0 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset",
        toneStyles[tone],
        className,
      )}
    >
      {label}
    </Badge>
  );
}
