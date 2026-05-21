"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

const navIcons: Record<string, string> = {
  "/dashboard": "◫",
  "/drivers": "◎",
  "/violations": "⚑",
};

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[15.5rem] shrink-0 flex-col border-r border-zinc-200/80 bg-white/90 px-3 py-5 backdrop-blur-sm",
        className,
      )}
    >
      <div className="px-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
          Traffic Ops
        </p>
        <p className="mt-1.5 text-[15px] font-semibold tracking-tight text-zinc-900">
          Console
        </p>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-0.5 px-1">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
          Workspace
        </p>
        {primaryNav.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "bg-zinc-900 text-white shadow-sm"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs transition-colors duration-150",
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200/80 group-hover:text-zinc-700",
                )}
                aria-hidden
              >
                {navIcons[item.href] ?? "•"}
              </span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-1 rounded-lg border border-zinc-200/70 bg-zinc-50/90 px-3 py-2.5">
        <p className="text-[11px] leading-relaxed text-zinc-500">
          Operational hub for drivers, violations, and analytics.
        </p>
      </div>
    </aside>
  );
}
