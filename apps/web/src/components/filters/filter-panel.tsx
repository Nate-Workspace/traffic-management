import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { surfaces } from "@/lib/ui/surfaces";

type FilterPanelProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function FilterPanel({
  title,
  description,
  actions,
  children,
  className,
}: FilterPanelProps) {
  return (
    <div className={cn(surfaces.card, "px-4 py-3.5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold tracking-tight text-zinc-900">
            {title}
          </h3>
          {description ? (
            <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-500">
              {description}
            </p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="mt-4 border-t border-zinc-100/90 pt-4">{children}</div>
    </div>
  );
}
