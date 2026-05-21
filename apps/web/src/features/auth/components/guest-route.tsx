"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { routes } from "@/config/routes";
import { AuthLoadingShell } from "./auth-loading-shell";

type GuestRouteProps = {
  children: ReactNode;
};

export function GuestRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized || isLoading || !isAuthenticated) {
      return;
    }

    const redirect = searchParams.get("redirect");
    const destination =
      redirect && redirect.startsWith("/") && !redirect.startsWith(routes.login)
        ? redirect
        : routes.dashboard;

    router.replace(destination);
  }, [isAuthenticated, isInitialized, isLoading, router, searchParams]);

  if (!isInitialized || isLoading) {
    return <AuthLoadingShell />;
  }

  if (isAuthenticated) {
    return <AuthLoadingShell />;
  }

  return children;
}
