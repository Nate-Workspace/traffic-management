import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContentShellProps = {
  children: ReactNode;
  className?: string;
};

export function ContentShell({ children, className }: ContentShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
