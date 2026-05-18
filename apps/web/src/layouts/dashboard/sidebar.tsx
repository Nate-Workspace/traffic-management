import Link from "next/link";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export function Sidebar({ className, onNavigate }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col gap-6 border-r border-slate-200 bg-white px-5 py-6",
        className,
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          Traffic Ops
        </p>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          Management Console
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <div className="flex flex-col">
              <span>{item.label}</span>
              {item.description ? (
                <span className="text-xs text-slate-500">{item.description}</span>
              ) : null}
            </div>
          </Link>
        ))}
      </nav>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
        Configure alerts, workflows, and operational settings from one place.
      </div>
    </aside>
  );
}
