"use client";

import { Skeleton, Stack } from "@mantine/core";

type AuthLoadingShellProps = {
  variant?: "fullscreen" | "dashboard";
};

export function AuthLoadingShell({ variant = "fullscreen" }: AuthLoadingShellProps) {
  if (variant === "dashboard") {
    return (
      <div className="min-h-screen bg-slate-100">
        <div className="flex min-h-screen">
          <div className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
            <Skeleton height={12} width="60%" radius="sm" />
            <Skeleton height={24} mt="md" width="80%" radius="sm" />
            <Stack gap="sm" mt="xl">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height={36} radius="md" />
              ))}
            </Stack>
          </div>
          <div className="flex min-h-screen flex-1 flex-col">
            <div className="border-b border-slate-200 bg-white px-6 py-4">
              <Skeleton height={36} radius="md" />
            </div>
            <main className="flex-1 p-6">
              <Stack gap="md">
                <Skeleton height={28} width={220} radius="sm" />
                <Skeleton height={120} radius="lg" />
                <Skeleton height={280} radius="lg" />
              </Stack>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <Stack gap="md">
          <Skeleton height={12} width="40%" radius="sm" />
          <Skeleton height={32} width="70%" radius="sm" />
          <Skeleton height={44} radius="md" />
          <Skeleton height={44} radius="md" />
          <Skeleton height={44} radius="md" />
        </Stack>
      </div>
    </div>
  );
}
