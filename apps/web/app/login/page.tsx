import { Suspense } from "react";
import { GuestRoute } from "@/features/auth/components/guest-route";
import { LoginPage } from "@/features/auth/components/login-page";
import { AuthLoadingShell } from "@/features/auth/components/auth-loading-shell";

export default function LoginRoutePage() {
  return (
    <Suspense fallback={<AuthLoadingShell />}>
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    </Suspense>
  );
}
