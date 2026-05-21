"use client";

import { ActionIcon, Avatar, Menu, TextInput } from "@mantine/core";
import { useAuth } from "@/providers/auth-provider";
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
        "sticky top-0 z-30 flex items-center gap-3 border-b border-zinc-200/80 bg-white/85 px-4 py-3 backdrop-blur-md sm:gap-4 sm:px-6",
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
        <TextInput
          size="sm"
          placeholder="Search drivers, plates, violations…"
          radius="md"
          classNames={{
            input:
              "border-zinc-200/80 bg-zinc-50/80 transition-colors duration-150 focus:bg-white",
          }}
          leftSection={
            <span className="text-zinc-400" aria-hidden>
              ⌕
            </span>
          }
        />
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-[13px] font-medium leading-tight text-zinc-800">
            {admin?.fullName ?? "Admin"}
          </p>
          <p className="max-w-[180px] truncate text-[11px] text-zinc-500">
            {admin?.email ?? "Administrator"}
          </p>
        </div>
        <Menu position="bottom-end" withinPortal shadow="md" radius="md">
          <Menu.Target>
            <button
              type="button"
              className="rounded-full ring-2 ring-transparent transition-shadow duration-150 hover:ring-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
              aria-label="Account menu"
            >
              <Avatar radius="xl" color="dark" size="sm" variant="filled">
                {admin?.fullName?.charAt(0) ?? "A"}
              </Avatar>
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label className="text-[11px] uppercase tracking-wider text-zinc-400">
              Account
            </Menu.Label>
            <Menu.Item disabled className="text-zinc-600">
              {admin?.email}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              onClick={() => void logout()}
              className="font-medium"
            >
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
}
