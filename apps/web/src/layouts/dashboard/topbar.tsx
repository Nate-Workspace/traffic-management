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
        "flex items-center gap-4 border-b border-slate-200 bg-white px-6 py-4",
        className,
      )}
    >
      <ActionIcon
        variant="light"
        color="gray"
        onClick={onOpenSidebar}
        className="md:hidden"
        aria-label="Open navigation"
      >
        <span className="text-lg">≡</span>
      </ActionIcon>

      <div className="flex-1">
        <TextInput
          size="sm"
          placeholder="Search across drivers and violations"
          radius="md"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right text-xs text-slate-500 sm:block">
          <p className="font-semibold text-slate-700">{admin?.fullName ?? "Admin"}</p>
          <p>{admin?.email ?? "Administrator"}</p>
        </div>
        <Menu position="bottom-end" withinPortal>
          <Menu.Target>
            <button
              type="button"
              className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              aria-label="Account menu"
            >
              <Avatar radius="xl" color="blue" size="md">
                {admin?.fullName?.charAt(0) ?? "A"}
              </Avatar>
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item disabled>{admin?.email}</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" onClick={() => void logout()}>
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </header>
  );
}
