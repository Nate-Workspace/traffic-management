import type { ReactNode } from "react";
import { DashboardLayout } from "@/layouts/dashboard/dashboard-layout";

export default function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
