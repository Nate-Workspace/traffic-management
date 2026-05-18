import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContentShellProps = {
  children: ReactNode;
  className?: string;
};

export function ContentShell({ children, className }: ContentShellProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 py-6", className)}>
      {children}
    </div>
  );
}
