import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { queryKeys } from "@/services/api/query-keys";
import type { LoginPayload } from "../types/auth";

export const useAuthMutations = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (admin) => {
      queryClient.setQueryData(queryKeys.auth.session, {
        authenticated: true,
        admin,
      });
    },
  });

  const logout = useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      queryClient.setQueryData(queryKeys.auth.session, {
        authenticated: false,
        admin: null,
      });
      queryClient.clear();
    },
  });

  return { login, logout };
};
