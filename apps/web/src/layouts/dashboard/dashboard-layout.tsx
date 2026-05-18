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
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar onOpenSidebar={open} />
          <main className="flex-1">
            <ContentShell>{children}</ContentShell>
          </main>
        </div>
      </div>
      <MobileSidebar opened={opened} onClose={close} />
    </div>
  );
}
