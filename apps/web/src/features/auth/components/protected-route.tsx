"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { routes } from "@/config/routes";
import { AuthLoadingShell } from "./auth-loading-shell";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized || isLoading) {
      return;
    }

    if (!isAuthenticated) {
      const redirect = encodeURIComponent(pathname);
      router.replace(`${routes.login}?redirect=${redirect}`);
    }
  }, [isAuthenticated, isInitialized, isLoading, pathname, router]);

  if (!isInitialized || isLoading) {
    return <AuthLoadingShell variant="dashboard" />;
  }

  if (!isAuthenticated) {
    return <AuthLoadingShell variant="dashboard" />;
  }

  return children;
}
