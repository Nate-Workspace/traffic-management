"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";
import { cn } from "@/lib/cn";

type Crumb = {
  label: string;
  href?: string;
};

const resolveCrumbs = (pathname: string): Crumb[] => {
  const home: Crumb = { label: "Console", href: routes.dashboard };

  if (pathname === routes.dashboard || pathname === "/") {
    return [{ label: "Overview" }];
  }

  if (pathname.startsWith(routes.drivers)) {
    const crumbs: Crumb[] = [home, { label: "Drivers", href: routes.drivers }];
    if (pathname !== routes.drivers) {
      crumbs.push({ label: "Details" });
    }
    return crumbs;
  }

  if (pathname.startsWith(routes.violations)) {
    const crumbs: Crumb[] = [home, { label: "Violations", href: routes.violations }];
    if (pathname !== routes.violations) {
      crumbs.push({ label: "Details" });
    }
    return crumbs;
  }

  return [{ label: "Dashboard" }];
};

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = resolveCrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span className="text-zinc-300" aria-hidden>
                  /
                </span>
              ) : null}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="font-medium text-zinc-500 transition-colors duration-150 hover:text-zinc-800"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "truncate",
                    isLast ? "font-semibold text-zinc-900" : "font-medium text-zinc-500",
                  )}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
