"use client";

import type { ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileSidebar } from "./mobile-sidebar";
import { ContentShell } from "./content-shell";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100/80">
      <aside className="hidden h-screen w-[15.5rem] shrink-0 border-r border-zinc-200/80 md:block">
        <Sidebar className="h-full" />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Topbar onOpenSidebar={open} />
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <ContentShell>{children}</ContentShell>
        </main>
      </div>

      <MobileSidebar opened={opened} onClose={close} />
    </div>
  );
}
