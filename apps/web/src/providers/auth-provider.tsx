"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthMutations } from "@/features/auth/hooks/use-auth-mutations";
import type { Admin, LoginPayload, SessionResponse } from "@/features/auth/types/auth";
import { routes } from "@/config/routes";
import { queryKeys } from "@/services/api/query-keys";
import { setUnauthorizedHandler } from "@/services/api/client";
import { toast } from "@/components/feedback/toast";

type AuthContextValue = {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (payload: LoginPayload) => Promise<Admin>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { login: loginMutation, logout: logoutMutation } = useAuthMutations();

  const sessionQuery = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: () => authApi.session(),
    staleTime: 60_000,
    retry: false,
  });

  const handleUnauthorized = useCallback(() => {
    if (pathname === routes.login) {
      return;
    }

    sessionQuery.refetch();
    toast.error({
      title: "Session expired",
      message: "Please sign in again to continue.",
    });
    router.replace(routes.login);
  }, [pathname, router, sessionQuery]);

  useEffect(() => {
    setUnauthorizedHandler(handleUnauthorized);
    return () => setUnauthorizedHandler(null);
  }, [handleUnauthorized]);

  const session = sessionQuery.data;
  const admin = session?.authenticated ? session.admin : null;
  const isAuthenticated = Boolean(session?.authenticated && admin);
  const isLoading = sessionQuery.isLoading;
  const isInitialized = sessionQuery.isFetched;

  const login = useCallback(
    async (payload: LoginPayload) => {
      const result = await loginMutation.mutateAsync(payload);
      return result;
    },
    [loginMutation],
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success({
        title: "Signed out",
        message: "You have been logged out securely.",
      });
    } catch {
      toast.error({
        title: "Sign out failed",
        message: "Your session was cleared locally.",
      });
    } finally {
      router.replace(routes.login);
    }
  }, [logoutMutation, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin,
      isAuthenticated,
      isLoading,
      isInitialized,
      login,
      logout,
      refreshSession: async () => {
        await sessionQuery.refetch();
      },
    }),
    [
      admin,
      isAuthenticated,
      isLoading,
      isInitialized,
      login,
      logout,
      sessionQuery.refetch,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
