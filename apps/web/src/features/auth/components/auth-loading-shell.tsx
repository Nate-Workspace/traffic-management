"use client";

import { Skeleton, Stack } from "@mantine/core";

type AuthLoadingShellProps = {
  variant?: "fullscreen" | "dashboard";
};

export function AuthLoadingShell({ variant = "fullscreen" }: AuthLoadingShellProps) {
  if (variant === "dashboard") {
    return (
      <div className="h-screen overflow-hidden bg-zinc-100/80">
        <div className="flex h-screen">
          <div className="hidden h-screen w-[15.5rem] shrink-0 border-r border-zinc-200/80 bg-white/90 p-5 md:block">
            <Skeleton height={10} width="55%" radius="xl" />
            <Skeleton height={20} mt="md" width="70%" radius="md" />
            <Stack gap="sm" mt="xl">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} height={36} radius="md" />
              ))}
            </Stack>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="border-b border-zinc-200/80 bg-white/85 px-6 py-3.5 backdrop-blur-md">
              <Skeleton height={36} radius="md" />
            </div>
            <main className="min-h-0 flex-1 overflow-y-auto p-6">
              <Stack gap="md">
                <Skeleton height={28} width={220} radius="md" />
                <Skeleton height={48} radius="lg" />
                <Skeleton height={280} radius="lg" />
              </Stack>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-sm">
        <Stack gap="md">
          <Skeleton height={10} width="40%" radius="xl" />
          <Skeleton height={32} width="70%" radius="md" />
          <Skeleton height={40} radius="md" />
          <Skeleton height={40} radius="md" />
          <Skeleton height={40} radius="md" />
        </Stack>
      </div>
    </div>
  );
}
