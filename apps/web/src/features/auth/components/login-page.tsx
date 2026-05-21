"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Paper, Text, Title } from "@mantine/core";
import { env } from "@/config/env";
import { routes } from "@/config/routes";
import { toastPromise } from "@/components/feedback/toast";
import { getApiErrorMessage } from "@/services/api/errors";
import { useAuth } from "@/providers/auth-provider";
import { useAuthMutations } from "../hooks/use-auth-mutations";
import { LoginForm } from "./login-form";
import type { LoginFormValues } from "../validation/login.schema";

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { login: loginMutation } = useAuthMutations();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await toastPromise(login(values), {
        loading: {
          title: "Signing in",
          message: "Verifying your credentials",
        },
        success: {
          title: "Welcome back",
          message: "Redirecting to your dashboard",
        },
        error: {
          title: "Sign in failed",
          message: (error) =>
            getApiErrorMessage(error, "Invalid email or password"),
        },
      });
    } catch {
      return;
    }

    const redirect = searchParams.get("redirect");
    const destination =
      redirect && redirect.startsWith("/") && !redirect.startsWith(routes.login)
        ? redirect
        : routes.dashboard;

    router.replace(destination);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.35),_transparent_50%)]" />
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
              Traffic Ops
            </p>
            <Title order={1} className="mt-4 max-w-lg text-4xl font-semibold text-white">
              Violation management built for operational clarity
            </Title>
            <Text className="mt-4 max-w-md text-base text-slate-300">
              Secure admin access for monitoring drivers, violations, and analytics
              from one professional control center.
            </Text>
          </div>
          <div className="relative z-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Drivers", value: "Unified records" },
              { label: "Violations", value: "Tracked lifecycle" },
              { label: "Analytics", value: "Live insights" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <Paper
            shadow="xl"
            radius="lg"
            p="xl"
            className="w-full max-w-md border border-slate-200 bg-white"
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {env.NEXT_PUBLIC_APP_NAME}
              </p>
              <Title order={2} className="mt-2 text-slate-900">
                Admin sign in
              </Title>
              <Text size="sm" c="dimmed" className="mt-2">
                Use your administrator credentials to access the dashboard.
              </Text>
            </div>
            <LoginForm onSubmit={handleSubmit} isLoading={loginMutation.isPending} />
          </Paper>
        </section>
      </div>
    </div>
  );
}
