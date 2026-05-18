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
    <Menu shadow="md" position="bottom-end" withArrow>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" disabled={disabled} aria-label="Open actions">
          ⋮
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
