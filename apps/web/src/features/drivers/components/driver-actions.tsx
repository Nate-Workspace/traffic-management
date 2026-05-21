"use client";

import { ActionIcon, Menu } from "@mantine/core";
import Link from "next/link";
import type { Driver } from "../types/driver";

type DriverActionsProps = {
  driver: Driver;
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
  disabled?: boolean;
};

export function DriverActions({ driver, onEdit, onDelete, disabled }: DriverActionsProps) {
  return (
    <Menu shadow="md" position="bottom-end" radius="md" withinPortal>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          disabled={disabled}
          aria-label="Open actions"
          className="transition-colors duration-150 hover:bg-zinc-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href={`/drivers/${driver.id}`}>
          View details
        </Menu.Item>
        <Menu.Item onClick={() => onEdit(driver)}>Edit</Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" onClick={() => onDelete(driver)}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
