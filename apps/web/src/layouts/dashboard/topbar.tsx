"use client";

import { ActionIcon, Avatar, Menu, Text, UnstyledButton } from "@mantine/core";
import { useAuth } from "@/providers/auth-provider";
import { DashboardBreadcrumbs } from "./breadcrumbs";
import { cn } from "@/lib/cn";

type TopbarProps = {
  onOpenSidebar?: () => void;
  className?: string;
};

export function Topbar({ onOpenSidebar, className }: TopbarProps) {
  const { admin, logout } = useAuth();

  return (
    <header
      className={cn(
        "z-30 flex shrink-0 items-center gap-3 border-b border-zinc-200/80 bg-white/90 px-4 py-3 backdrop-blur-md sm:gap-4 sm:px-6",
        className,
      )}
    >
      <ActionIcon
        variant="subtle"
        color="gray"
        size="md"
        onClick={onOpenSidebar}
        className="md:hidden"
        aria-label="Open navigation"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </ActionIcon>

      <div className="min-w-0 flex-1">
        <DashboardBreadcrumbs />
      </div>

      <Menu
        position="bottom-end"
        withinPortal
        shadow="md"
        radius="md"
        width={260}
        offset={8}
      >
        <Menu.Target>
          <UnstyledButton
            className="flex items-center gap-2.5 rounded-xl border border-transparent px-1.5 py-1 transition-all duration-150 hover:border-zinc-200/80 hover:bg-zinc-50"
            aria-label="Account menu"
          >
            <Avatar radius="xl" color="dark" size="sm" variant="filled">
              {admin?.fullName?.charAt(0) ?? "A"}
            </Avatar>
            <div className="hidden text-left sm:block">
              <Text size="sm" fw={600} className="leading-tight text-zinc-900">
                {admin?.fullName ?? "Admin"}
              </Text>
              <Text size="xs" c="dimmed" className="max-w-[160px] truncate">
                {admin?.email ?? "Administrator"}
              </Text>
            </div>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown className="overflow-hidden p-1">
          <div className="rounded-lg bg-zinc-50 px-3 py-2.5">
            <Text size="xs" tt="uppercase" fw={600} className="tracking-wider text-zinc-400">
              Signed in as
            </Text>
            <Text size="sm" fw={600} className="mt-1 text-zinc-900">
              {admin?.fullName ?? "Administrator"}
            </Text>
            <Text size="xs" c="dimmed" className="mt-0.5 truncate">
              {admin?.email}
            </Text>
          </div>
          <Menu.Divider my={6} />
          <Menu.Item
            color="red"
            onClick={() => void logout()}
            className="font-medium"
            leftSection={
              <span className="text-sm" aria-hidden>
                ↪
              </span>
            }
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </header>
  );
}
