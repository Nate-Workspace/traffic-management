import type { ReactNode } from "react";
import { ProtectedRoute } from "@/features/auth/components/protected-route";
import { DashboardLayout } from "@/layouts/dashboard/dashboard-layout";

export default function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}
